import { A, isArray } from '@ember/array';
import EmObject, { computed, get, getWithDefault, set } from '@ember/object';
import { or } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Base from 'ember-local-storage/adapters/base';
import jquery from 'jquery';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { JsonDefault as Contact } from 'mdeditor/models/contact';
import { Promise, allSettled } from 'rsvp';
import { v4 } from 'uuid';
import { fixLiabilityTypo } from '../../utils/fix-liability-typo';

const generateIdForRecord = Base.create().generateIdForRecord;

export default Route.extend(ScrollTo, {
  flashMessages: service(),
  jsonvalidator: service(),
  settings: service(),
  ajax: service(),

  init() {
    this._super(...arguments);

    this.icons = {
      records: 'file',
      dictionaries: 'book',
      contacts: 'users',
      settings: 'gear',
    };
  },
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set('importUri', this.get('settings.data.importUriBase'));
    controller.set('apiURL', this.apiURL);
  },

  model() {
    return EmObject.create({
      files: false,
      merge: true,
    });
  },

  apiURL: or('settings.data.mdTranslatorAPI', 'defaultAPI'),

  getTitle(record) {
    let raw = record.attributes.json;
    let json = raw ? JSON.parse(raw) : null;

    switch (record.type) {
      case 'records':
        return getWithDefault(
          json,
          'metadata.resourceInfo.citation.title',
          'NO TITLE'
        );
      case 'dictionaries':
        return getWithDefault(
          json,
          'dataDictionary.citation.title',
          'NO TITLE'
        );
      case 'contacts':
        return json.name || 'NO NAME';
      case 'schemas':
        return record.attributes.title || 'NO TITLE';
      default:
        return 'N/A';
    }
  },

  formatMdJSON(json) {
    let { contact, dataDictionary } = json;
    let data = A();
    let template = EmObject.extend({
      init() {
        this._super(...arguments);
        if (this.attributes.json) {
          const json = JSON.parse(this.attributes.json);

          switch (this.type) {
            case 'contacts':
              if (json.contactId) {
                set(this, 'id', json.contactId.substring(0, 8));
              }
              break;

            case 'dictionaries':
              if (json.dataDictionary.dictionaryId) {
                set(
                  this,
                  'id',
                  json.dataDictionary.dictionaryId.substring(0, 8)
                );
              }
              break;

            case 'records':
              if (
                json.metadata &&
                json.metadata.metadataInfo &&
                json.metadata.metadataInfo.metadataIdentifier
              ) {
                set(
                  this,
                  'id',
                  json.metadata.metadataInfo.metadataIdentifier.identifier.substring(
                    0,
                    8
                  )
                );
              }
              break;
          }
        }
      },
      attributes: computed(function () {
        return {
          json: null, //,
          //date-updated: '2017-05-18T21:21:34.446Z'
        };
      }),
      type: null,
    });

    if (contact) {
      contact.forEach((item) => {
        data.pushObject(
          template.create({
            attributes: {
              json: JSON.stringify(assign(Contact.create(), item)),
            },
            type: 'contacts',
          })
        );
      });
    }

    if (get(json, 'metadata.metadataInfo.metadataIdentifier') === undefined) {
      json.metadata.metadataInfo.metadataIdentifier = {
        identifier: uuidV4(),
        namespace: 'urn:uuid',
      };
    }

    data.pushObject(
      template.create({
        attributes: {
          json: JSON.stringify(json),
          //profile: 'full'
        },
        type: 'records',
      })
    );

    if (dataDictionary) {
      dataDictionary.forEach((item) => {
        data.pushObject(
          template.create({
            attributes: {
              json: JSON.stringify({
                dataDictionary: item,
              }),
            },
            type: 'dictionaries',
          })
        );
      });
    }

    return data;
  },

  mapJSON(data) {
    let { json, route } = data;
    let files;

    if (isArray(data.json.data)) {
      files = this.mapEditorJSON(data);
    } else {
      //assume it's raw mdJSON for now
      files = this.mapMdJSON(data);
      console.log('hello');
    }

    fixLiabilityTypo(files);

    route.currentRouteModel().set('files', files);

    route.currentRouteModel().set('data', json.data);
  },

  mapMdJSON(data) {
    let map = A();

    if (isArray(data.json)) {
      data.json.forEach((item) => {
        // Check for mdDictionary and set dictionaryId in dataDictionary
        if (item.mdDictionary && item.dataDictionary) {
          item.dataDictionary.forEach((dictionary, index) => {
            if (!dictionary.dictionaryId && item.mdDictionary[index]) {
              dictionary.dictionaryId = item.mdDictionary[index];
            }
          });
        }
        map = map.concat(this.formatMdJSON(item));
      });
    } else {
      // Check for mdDictionary and set dictionaryId in dataDictionary
      if (data.json.mdDictionary && data.json.dataDictionary) {
        data.json.dataDictionary.forEach((dictionary, index) => {
          if (!dictionary.dictionaryId && data.json.mdDictionary[index]) {
            dictionary.dictionaryId = data.json.mdDictionary[index];
          }
        });
      }
      map = map.concat(this.formatMdJSON(data.json));
    }

    set(data, 'json.data', map);

    return this.mapRecords(map);
  },

  mapRecords(records) {
    return records.reduce((map, item) => {
      if (!map[item.type]) {
        map[item.type] = [];
      }

      item.meta = {};
      item.meta.title = this.getTitle(item);
      item.meta.icon = this.icons[item.type];
      item.meta.export = true;

      map[item.type].push(EmObject.create(item));
      return map;
    }, {});
  },

  mapEditorJSON({ file, json }) {
    const validator = this.jsonvalidator.validator;
    if (!validator.validate('jsonapi', json)) {
      throw new Error(`${file.name} is not a valid mdEditor file.`);
    }

    // Ensure dictionaryId is inside dataDictionary
    json.data.forEach((record) => {
      if (record.type === 'dictionaries' && record.attributes.json) {
        let jsonData = JSON.parse(record.attributes.json);
        if (
          jsonData.dataDictionary &&
          record.attributes.dictionaryId &&
          !jsonData.dataDictionary.dictionaryId
        ) {
          set(
            jsonData.dataDictionary,
            'dictionaryId',
            record.attributes.dictionaryId
          );
          delete record.attributes.dictionaryId;
          record.attributes.json = JSON.stringify(jsonData);
        }
      }
    });

    return this.mapRecords(json.data);
  },

  //TODO: fix propertyName id for dataDictionary
  columns: computed(function () {
    let route = this;

    return [
      {
        propertyName: 'meta.title',
        title: 'Title',
      },
      {
        propertyName: 'attributes.date-updated',
        title: 'Last Updated',
      },
      {
        propertyName: 'id',
        title: 'ID',
      },
      {
        title: 'Actions',
        component: 'control/md-record-table/buttons/custom',
        disableFiltering: true,
        buttonConfig: {
          title: 'Preview JSON',
          action(model) {
            route.showPreview.call(route, model);
          },
          iconPath: 'meta.icon',
        },
      },
    ];
  }),

  showPreview(model) {
    let json = {};
    assign(json, model.attributes);

    if (model.attributes.json) {
      json.json = JSON.parse(model.attributes.json);
    }

    this.currentRouteModel().set('preview', {
      model: model,
      json: json,
    });
  },

  actions: {
    getColumns() {
      return this.columns;
    },
    getIcon(type) {
      return this.icons[type];
    },
    readData(file) {
      let json;
      let url = this.apiURL;
      let controller = this.controller;
      let cmp = this;

      new Promise((resolve, reject) => {
        if (file.type.match(/.*\/xml$/)) {
          set(controller, 'isTranslating', true);
          this.flashMessages.info(`Translation service provided by ${url}.`);

          this.ajax
            .request(url, {
              type: 'POST',
              data: {
                file: file.data,
                reader: 'fgdc',
                writer: 'mdJson',
                validate: 'normal',
                format: 'json',
              },
              context: cmp,
            })
            .then(
              function (response) {
                set(controller, 'isTranslating', false);

                if (response.success) {
                  resolve({
                    json: JSON.parse(response.writerOutput),
                    file: file,
                    route: cmp,
                  });

                  return;
                }

                reject(
                  `Failed to translate file: ${file.name}. Is it valid FGDC CSDGM XML?`
                );
              },
              (response) => {
                set(controller, 'isTranslating', false);

                reject(
                  `mdTranslator Server error: ${response.status}: ${response.statusText}. Is your file valid FGDC CSDGM XML?`
                );
              }
            );
        } else {
          try {
            json = JSON.parse(file.data);
          } catch (e) {
            reject(`Failed to parse file: ${file.name}. Is it valid JSON?`);
          }
          resolve({
            json: json,
            file: file,
            route: cmp,
          });
        }
      })
        .then((data) => {
          //determine file type and map
          cmp.mapJSON(data);
        })
        .catch((reason) => {
          //catch any errors
          get(cmp, 'flashMessages').danger(reason);
          return false;
        })
        .finally(() => {
          jquery('.import-file-picker input:file').val('');
        });
    },

    readFromUri() {
      let uri = this.controller.get('importUri');
      let controller = this.controller;
      let route = this;

      set(controller, 'isLoading', true);

      this.ajax
        .request(uri, {
          type: 'GET',
          context: this,
          dataType: 'text',
          crossDomain: true,
        })
        .then(function (response) {
          if (response) {
            let json;

            new Promise((resolve, reject) => {
              try {
                json = JSON.parse(response);
              } catch (e) {
                reject(`Failed to parse data. Is it valid JSON?`);
              }

              resolve({
                json: json,
                file: null,
                route: route,
              });
            })
              .then((data) => {
                //determine file type and map
                route.mapJSON(data);
              })
              .catch((reason) => {
                //catch any errors
                get(controller, 'flashMessages').danger(reason);
                return false;
              })
              .finally(() => {
                set(controller, 'isLoading', false);
                jquery('.md-import-picker input:file').val('');
              });
          } else {
            set(controller, 'errors', response.messages);
            get(controller, 'flashMessages').danger('Import error!');
          }
        })
        .catch((response) => {
          let error = ` Error retrieving the mdJSON: ${response.status}: ${response.statusText}`;

          set(controller, 'xhrError', error);
          set(controller, 'isLoading', false);
          get(controller, 'flashMessages').danger(error);
        });
    },
    importData() {
      let store = this.store;
      let data = {
        data: this.currentRouteModel()
          .get('data')
          .filterBy('meta.export')
          .rejectBy('type', 'settings'),
      };

      store
        .importData(data, {
          truncate: !this.currentRouteModel().get('merge'),
          json: false,
        })
        .then(() => {
          this.flashMessages.success(
            `Imported data. Records were
              ${
                this.currentRouteModel().get('merge') ? 'merged' : 'replaced'
              }.`,
            {
              extendedTimeout: 1500,
            }
          );
          this.transitionTo('dashboard');
        });

      let settingService = this.settings;
      let newSettings = this.currentRouteModel()
        .get('data')
        .filterBy('meta.export')
        .findBy('type', 'settings');

      if (newSettings) {
        let settings = {
          data: [newSettings],
        };
        let destroys = [];

        store.findAll('setting').forEach((rec) => {
          destroys.pushObject(rec.destroyRecord());
        });

        allSettled(destroys).then(() => {
          store
            .importData(settings, {
              json: false,
            })
            .then(() => {
              settingService.setup();
              this.flashMessages.success(`Imported Settings.`, {
                extendedTimeout: 1500,
              });
            });
        });
      }
    },
    closePreview() {
      this.currentRouteModel().set('preview', false);
    },
    cancelImport() {
      this.currentRouteModel().set('files', false);
    },
  },
});
