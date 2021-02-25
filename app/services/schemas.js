import classic from 'ember-classic-decorator';
import { filterBy } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import RefParser from 'json-schema-ref-parser';
import request from 'ember-ajax/request';
import { task, all, timeout } from 'ember-concurrency';
import {
  // isAjaxError,
  isNotFoundError,
  // isForbiddenError
} from 'ember-ajax/errors';
import semver from 'semver';

const parser = new RefParser();

@classic
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
    this.parser = parser;

    this.schemas = this.store.peekAll('schema');
  }

  @service
  store;

  @service
  flashMessages;

  @filterBy('schemas', 'isGlobal')
  globalSchemas;

  @(task(function* (url) {
    yield timeout(1000);

    return yield this.parser.resolve(url).then(($refs) => {
      let paths = $refs.paths();
      let values = parser.$refs.values();

      return paths.map((path) => {
        return {
          id: path,
          schema: values[path],
        };
      });
    });
  }).drop())
  fetchSchemas;

  // compileSchemas(schemas) {
  //   let ajv = ajvErrors(new Ajv(options));
  //
  //
  //   ajv.addMetaSchema(draft4);
  //   ajv.addSchema(schemas);
  //
  //   return ajv;
  // },

  @(task(function* (records) {
    yield timeout(1000);

    yield all(
      records.map((itm) => {
        if (itm.validations.attrs.uri.isInvalid) {
          this.flashMessages.warning(
            `Did not load schema for "${itm.title}". URL is Invalid.`
          );
          return;
        }

        return request(itm.uri)
          .then((response) => {
            // `response` is the data from the server
            if (semver.valid(response.version)) {
              itm.set('remoteVersion', response.version);
            } else {
              throw new Error('Invalid version');
            }

            return response;
          })
          .catch((error) => {
            if (isNotFoundError(error)) {
              this.flashMessages.danger(
                `Could not load schema for "${itm.title}". Schema not found.`
              );
            } else {
              this.flashMessages.danger(
                `Could not load schema for "${itm.title}". Error: ${error.message}`
              );
            }
          });
      })
    );
  }).drop())
  checkForUpdates;
}
