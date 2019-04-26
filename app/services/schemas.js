import Service from '@ember/service';
import RefParser from 'json-schema-ref-parser';
import Ajv from 'ajv';
import request from 'ember-ajax/request';
// import regex from 'mdeditor/models/schema';
import * as draft4 from 'ajv/lib/refs/json-schema-draft-04';
import { task, all, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import {
  // isAjaxError,
  isNotFoundError,
  // isForbiddenError
} from 'ember-ajax/errors';
import semver from 'semver';

const parser = new RefParser();
const options = {
  verbose: true,
  allErrors: true,
  removeAdditional: false,
  schemaId: 'auto'
};

export default Service.extend({
  init() {
    this._super(...arguments);

    /**
     * Instance of JSON Schema $Ref Parser
     *
     * @method parser
     * @protected
     * @return {Object}
     */
    this.parser = parser;

    // this.cache = new Cache();
    // this.ajv = new Ajv({
    //   loadSchema: this.loadSchema,
    //   cache:this.cache,
    //   schemaId: 'auto'
    // });
    // this.ajv.addMetaSchema(draft4);
  },
  flashMessages: service(),
  fetchSchemas: task(function* (url) {
    yield timeout(1000);

    return yield this.parser.resolve(url).then($refs => {
      let paths = $refs.paths();
      let values = parser.$refs.values();

      return paths.map((path) => {
        return {
          id: path,
          schema: values[path]
        }
      });
    })
  }).drop(),

  compileSchemas(schemas) {
    let ajv = new Ajv(options);

    ajv.addMetaSchema(draft4);
    ajv.addSchema(schemas);

    return ajv;
  },

  checkForUpdates: task(function* (records) {
    yield timeout(1000);

    yield all(records.map(itm => {
      if(itm.validations.attrs.uri.isInvalid) {
        this.flashMessages
          .warning(
            `Did not load schema for "${itm.title}". URL is Invalid.`
          );
        return;
      }

      return request(itm.uri).then(response => {
        // `response` is the data from the server
        if(semver.valid(response.version)) {
          itm.set('remoteVersion', response.version);
        } else {
          throw new Error("Invalid version");
        }

        return response;
      }).catch(error => {
        if(isNotFoundError(error)) {
          this.flashMessages
            .danger(
              `Could not load schema for "${itm.title}". Schema not found.`
            );
        } else {
          this.flashMessages
            .danger(
              `Could not load schema for "${itm.title}". Error: ${error.message}`
            );
        }
      });
    }));
  }).drop(),

  // baseURL: null,

  // loadSchema(url) {
  //   let options = {
  //     // request options
  //   };
  //   let _url = url.match(regex)? url : this.baseURL + url;
  //
  // },

  // compileSchemas(url) {
  //   //set baseURL for relative refs
  //   this.baseURL = url.substring(0,url.lastIndexOf('/')+1);
  //
  //   request(url).then(response => {
  //     console.log(response);
  //
  //     this.ajv.removeSchema();
  //     this.ajv.compileAsync(response).then(() => {
  //       return this.cache;
  //     }).catch(error => {
  //       console.log(error);
  //     });
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }

});
