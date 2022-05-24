import {
  inject as service
} from '@ember/service';
import {
  or
} from '@ember/object/computed';
import Route from '@ember/routing/route';
import $ from 'jquery';
import {
  A,
  isArray
} from '@ember/array';
import {
  assign
} from '@ember/polyfills';
import EmObject, {
  computed,
  set,
  get,
  getWithDefault
} from '@ember/object';
import Base from 'ember-local-storage/adapters/base';
import uuidV4 from "uuid/v4";
import ScrollTo from 'mdeditor/mixins/scroll-to';
import {
  JsonDefault as Contact
} from 'mdeditor/models/contact';
import {
  allSettled,
  Promise
} from 'rsvp';

const generateIdForRecord = Base.create()
  .generateIdForRecord;

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
      settings: 'gear'
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
      merge: true
    });
  },

  apiURL: or('settings.data.mdTranslatorAPI', 'defaultAPI'),

  getTitle(record) {
    let raw = record.attributes.json;
    let json = raw ? JSON.parse(raw) : null;

    switch(record.type) {
    case 'records':
      return getWithDefault(json, 'metadata.resourceInfo.citation.title', 'NO TITLE');
    case 'dictionaries':
      return getWithDefault(json, 'dataDictionary.citation.title', 'NO TITLE');
    case 'contacts':
      return json.name || 'NO NAME';
    case 'schemas':
      return record.attributes.title || 'NO TITLE';
    default:
      return 'N/A';
    }
  },

  formatMdJSON(json) {
    let {
      contact,
      dataDictionary
    } = json;
    let data = A();
    let template = EmObject.extend({
      init() {
        this._super(...arguments);

        set(this, 'id', generateIdForRecord());
      },
      attributes: computed(function () {
        return {
          json: null //,
          //date-updated: '2017-05-18T21:21:34.446Z'
        }
      }),
      type: null
    });

    if(contact){
      contact.forEach((item) => {
        data.pushObject(template.create({
          attributes: {
            json: JSON.stringify(assign(Contact.create(), item))
          },
          type: 'contacts'
        }));
      });
    }

    if(get(json, 'metadata.metadataInfo.metadataIdentifier') === undefined) {
      json.metadata.metadataInfo.metadataIdentifier = {
        identifier: uuidV4(),
        namespace: 'urn:uuid'
      };
    }

    data.pushObject(template.create({
      attributes: {
        json: JSON.stringify(json),
        //profile: 'full'
      },
      type: 'records'
    }));

    if(dataDictionary) {
      dataDictionary.forEach((item) => {
        data.pushObject(template.create({
          attributes: {
            json: JSON.stringify({
              dataDictionary: item
            })
          },
          type: 'dictionaries'
        }));
      });
    }

    return data;
  },

  mapJSON(data) {
    let {
      json,
      route
    } = data;
    let files;

    if(isArray(data.json.data)) {
      files = this.mapEditorJSON(data);
    } else {
      //assume it's raw mdJSON for now
      files = this.mapMdJSON(data);
    }

    route.currentRouteModel()
      .set('files', files);

    route.currentRouteModel()
      .set('data', json.data);
  },

  mapMdJSON(data) {
    let map = A();

    if(isArray(data.json)) {
      data.json.forEach((item) => {
        map = map.concat(this.formatMdJSON(item));
      });
    } else {
      map = map.concat(this.formatMdJSON(data.json));
    }

    set(data, 'json.data', map);

    return this.mapRecords(map);
  },

  mapRecords(records) {
    return records.reduce((map, item) => {

      if(!map[item.type]) {
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

  mapEditorJSON(data) {
    let {
      file,
      json
    } = data;
    let jv = get(this, 'jsonvalidator.validator');
    let valid = jv.validate('jsonapi', json);

    if(!valid) {
      throw new Error(`${file.name} is not a valid mdEditor file.`);
    }

    return this.mapRecords(json.data);
  },

  columns: computed(function () {
    let route = this;

    return [{
      propertyName: 'meta.title',
      title: 'Title'
    }, {
      propertyName: 'attributes.date-updated',
      title: 'Last Updated'
    }, {
      propertyName: 'id',
      title: 'ID'
    }, {
      title: 'Actions',
      component: 'control/md-record-table/buttons/custom',
      disableFiltering: true,
      buttonConfig: {
        title: 'Preview JSON',
        action(model) {
          route.showPreview.call(route, model);
        },
        iconPath: 'meta.icon'
      }
    }];
  }),

  showPreview(model) {
    let json = {};
    assign(json, model.attributes);

    if(model.attributes.json) {
      json.json = JSON.parse(model.attributes.json);
    }

    this.currentRouteModel()
      .set('preview', {
        model: model,
        json: json
      });
  },

  actions: {
    getColumns() {
      return get(this, 'columns');
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
          if(file.type.match(/.*\/xml$/)) {
            set(controller, 'isTranslating', true);
            get(this, 'flashMessages')
              .info(`Translation service provided by ${url}.`);

            this.ajax.request(url, {
                type: 'POST',
                data: {
                  //file: JSON.stringify(cleaner.clean(json)),
                  file: file.data,
                  reader: 'fgdc',
                  writer: 'mdJson',
                  validate: 'normal',
                  format: 'json'
                },
                context: cmp
              })
              .then(function (response) {
                set(controller, 'isTranslating', false);

                if(response.success) {
                  resolve({
                    json: JSON.parse(response.writerOutput),
                    file: file,
                    route: cmp
                  });

                  return;
                }

                reject(
                  `Failed to translate file: ${file.name}. Is it valid FGDC CSDGM XML?`
                );

              }, (response) => {
                set(controller, 'isTranslating', false);

                reject(
                  `mdTranslator Server error: ${response.status}: ${response.statusText}. Is your file valid FGDC CSDGM XML?`
                );
              });
          } else {

            try {
              json = JSON.parse(file.data);
            } catch(e) {
              reject(
                `Failed to parse file: ${file.name}. Is it valid JSON?`
              );
            }
            resolve({
              json: json,
              file: file,
              route: cmp
            });
          }
        })
        .then((data) => {
          //determine file type and map
          cmp.mapJSON(data);

        })
        .catch((reason) => {
          //catch any errors
          get(cmp, 'flashMessages')
            .danger(reason);
          return false;
        })
        .finally(() => {
          $('.import-file-picker input:file')
            .val('');
        });

    },

    readFromUri() {
      let uri = this.controller.get('importUri');
      let controller = this.controller;
      let route = this;

      set(controller, 'isLoading', true);

      this.ajax.request(uri, {
          type: 'GET',
          context: this,
          dataType: 'text',
          crossDomain: true
        })
        .then(function (response) {

          if(response) {
            let json;

            new Promise((resolve, reject) => {
                try {
                  json = JSON.parse(response);
                } catch(e) {
                  reject(
                    `Failed to parse data. Is it valid JSON?`);
                }

                resolve({
                  json: json,
                  file: null,
                  route: route
                });
              })
              .then((data) => {
                //determine file type and map
                route.mapJSON(data);

              })
              .catch((reason) => {
                //catch any errors
                get(controller, 'flashMessages')
                  .danger(reason);
                return false;
              })
              .finally(() => {
                set(controller, 'isLoading', false);
                $('.md-import-picker input:file')
                  .val('');
              });
          } else {
            set(controller, 'errors', response.messages);
            get(controller, 'flashMessages')
              .danger('Import error!');
          }
        }).catch((response) => {
          let error =
            ` Error retrieving the mdJSON: ${response.status}: ${response.statusText}`;

          set(controller, 'xhrError', error);
          set(controller, 'isLoading', false);
          get(controller, 'flashMessages')
            .danger(error);
        });

    },
    importData() {
      let store = this.store;
      let data = {
        data: this.currentRouteModel()
          .get('data')
          .filterBy('meta.export').rejectBy('type', 'settings')
      };

      store.importData(data, {
          truncate: !this.currentRouteModel()
            .get('merge'),
          json: false
        })
        .then(() => {
          get(this, 'flashMessages')
            .success(
              `Imported data. Records were
              ${this.currentRouteModel().get('merge') ? 'merged' : 'replaced'}.`, {
                extendedTimeout: 1500
              });
          //this.transitionTo('dashboard');
        });

      let settingService = this.settings;
      let newSettings = this.currentRouteModel().get('data').filterBy(
        'meta.export').findBy('type', 'settings');

      if(newSettings) {
        let settings = {
          data: [newSettings]
        };
        let destroys = [];

        store.findAll('setting').forEach(rec => {
          destroys.pushObject(rec.destroyRecord());
        });

        allSettled(destroys).then(() => {
          store.importData(settings, {
              json: false
            })
            .then(() => {
              settingService.setup();
              get(this, 'flashMessages')
                .success(
                  `Imported Settings.`, {
                    extendedTimeout: 1500
                  });
            });
        });
      }
    },
    closePreview() {
      this.currentRouteModel()
        .set('preview', false);
    },
    cancelImport() {
      this.currentRouteModel()
        .set('files', false);
    }
  }
});
