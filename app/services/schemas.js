import Service, { inject as service } from '@ember/service';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import request from 'ember-ajax/request';
import { task, all, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import {
  // isAjaxError,
  isNotFoundError,
  // isForbiddenError
} from 'ember-ajax/errors';
import semver from 'semver';

export default class SchemasService extends Service {
  @service store;
  @service flashMessages;

  @tracked schemas = [];

  constructor() {
    super(...arguments);

    /**
     * Instance of JSON Schema $Ref Parser
     *
     * @method parser
     * @protected
     * @return {Object}
     */
    this.schemas = this.store.peekAll('schema');
  }

  get globalSchemas() {
    return this.schemas.filter(schema => schema.isGlobal);
  }

  fetchSchemas = task({ drop: true }, async (url) => {
    await timeout(1000);

    const parser = new $RefParser(); // Use $RefParser directly here

    return await parser.resolve(url).then($refs => {
      let paths = $refs.paths();
      let values = parser.$refs.values();

      return paths.map((path) => {
        return {
          id: path,
          schema: values[path]
        }
      });
    })
  });

  // compileSchemas(schemas) {
  //   let ajv = ajvErrors(new Ajv(options));
  //
  //
  //   ajv.addMetaSchema(draft4);
  //   ajv.addSchema(schemas);
  //
  //   return ajv;
  // },

  checkForUpdates = task({ drop: true }, async (records) => {
    await timeout(1000);

    await all(records.map(itm => {
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
  });

}
