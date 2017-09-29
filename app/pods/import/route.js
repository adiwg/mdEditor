import Ember from 'ember';
import Base from 'ember-local-storage/adapters/base';
import uuidV4 from "npm:uuid/v4";
import {
  JsonDefault as Contact
} from 'mdeditor/models/contact';

const generateIdForRecord = Base.create()
  .generateIdForRecord;

const {
  Route,
  get,
  set,
  RSVP: {
    Promise
  },
  inject,
  Object: EmObject,
  assign,
  isArray,
  $,
  A,
  merge
} = Ember;

export default Route.extend({
  flashMessages: inject.service(),
  jsonvalidator: inject.service(),
  settings: inject.service(),


  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    // Implement your custom setup after
    controller.set('importUri', this.get('settings.data.importUriBase'));
  },

  model() {
    return EmObject.create({
      files: false,
      merge: true
    });
  },

  getTitle(record) {
    let raw = record.attributes.json;
    let json = raw ? JSON.parse(raw) : null;

    switch(record.type) {
    case 'records':
      return json.metadata.resourceInfo.citation.title;
    case 'dictionaries':
      return json.dataDictionary.citation.title;
    case 'contacts':
      return json.name;
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
      attributes: {
        json: null,
        //date-updated: '2017-05-18T21:21:34.446Z'
      },
      type: null
    });

    contact.forEach((item) => {
      data.pushObject(template.create({
        attributes: {
          json: JSON.stringify(merge(Contact.create(), item))
        },
        type: 'contacts'
      }));
    });

    if(get(json,'metadata.metadataInfo.metadataIdentifier') === undefined){
        json.metadata.metadataInfo.metadataIdentifier = {
            identifier: uuidV4(),
            namespace: 'urn:uuid'
        };
    }

    data.pushObject(template.create({
      attributes: {
        json: JSON.stringify(json),
        profile: 'full'
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
      item.meta.export = true;

      map[item.type].push(item);
      return map;
    }, {});
  },

  mapEditorJSON(data) {
    let {
      file,
      json
    } = data;
    let jv = get(this, 'jsonvalidator');
    let valid = jv.validate('jsonapi', json);

    if(!valid) {
      throw new Error(`${file.name} is not a valid mdEditor file.`);
    }

    return this.mapRecords(json.data);
  },

  actions: {
    readData(file) {
      let json;

      new Promise((resolve, reject) => {
          try {
            json = JSON.parse(file.data);
          } catch(e) {
            reject(
              `Failed to parse file: ${file.name}. Is it valid JSON?`);
          }

          resolve({
            json: json,
            file: file,
            route: this
          });
        })
        .then((data) => {
          //determine file type and map
          this.mapJSON(data);

        })
        .catch((reason) => {
          //catch any errors
          get(this, 'flashMessages')
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

      set(this.controller, 'isLoading', true);

      $.ajax(uri, {
          type: 'GET',
          context: this,
          dataType: 'text',
          crossDomain: true
        })
        .then(function (response, textStatus) {

          if(response && textStatus === 'success') {
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
                  route: this
                });
              })
              .then((data) => {
                //determine file type and map
                this.mapJSON(data);

              })
              .catch((reason) => {
                //catch any errors
                get(this, 'flashMessages')
                  .danger(reason);
                return false;
              })
              .finally(() => {
                set(this.controller, 'isLoading', false);
                $('.import-file-picker input:file')
                  .val('');
              });
          } else {
            set(this.controller, 'errors', response.messages);
            get(this, 'flashMessages')
              .danger('Import error!');
          }
        }, (response) => {
          let error =
            ` Error retrieving the mdJSON: ${response.status}: ${response.statusText}`;

          set(this.controller, 'xhrError', error);
          set(this.controller, 'isLoading', false);
          get(this, 'flashMessages')
            .danger(error);
        });

    },
    importData() {
      let data = {
        data: this.currentRouteModel()
          .get('data')
          .filter((record) => {
            return record.meta.export;
          })
      };

      this.store.importData(data, {
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
    },
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
