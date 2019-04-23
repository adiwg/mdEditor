import Service from '@ember/service';
import RefParser from 'json-schema-ref-parser';
import Ajv from 'ajv';
// import Cache from 'ajv/lib/cache';
// import request from 'ember-ajax/request';
// import regex from 'mdeditor/models/schema';
import * as draft4 from 'ajv/lib/refs/json-schema-draft-04';
import { task, timeout } from 'ember-concurrency';

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

fetchSchemas: task(function * (url) {
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
  }
  // baseURL: null,

  // loadSchema(url) {
  //   let options = {
  //     // request options
  //   };
  //   let _url = url.match(regex)? url : this.baseURL + url;
  //
  //   return request(_url, options).then(response => {
  //     // `response` is the data from the server
  //     return response;
  //   });
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
