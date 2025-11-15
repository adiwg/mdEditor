import { filterBy } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import axios from 'axios';
import { task, all, timeout } from 'ember-concurrency';
import semver from 'semver';

export default class SchemasService extends Service {
  init() {
    super.init(...arguments);

    /**
     * Instance of JSON Schema $Ref Parser
     *
     * @method parser
     * @protected
     * @return {Object}
     */
    this.schemas = this.store.peekAll('schema');
  }

  @service
  store;

  @service
  flashMessages;

  @filterBy('schemas', 'isGlobal')
  globalSchemas;

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

      return axios.get(itm.uri).then(response => {
        // `response.data` is the data from the server
        if(semver.valid(response.data.version)) {
          itm.set('remoteVersion', response.data.version);
        } else {
          throw new Error("Invalid version");
        }

        return response.data;
      }).catch(error => {
        if(error.response && error.response.status === 404) {
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
