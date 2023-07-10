import Service, { inject as service } from '@ember/service';
import RefParser from "json-schema-ref-parser";
import JsonRefs from 'json-refs';
import request from 'ember-ajax/request';
import { task, all, timeout } from 'ember-concurrency';
import {
  // isAjaxError,
  isNotFoundError,
  // isForbiddenError
} from 'ember-ajax/errors';
import semver from 'semver';
import classic from 'ember-classic-decorator';

let parser = new RefParser();
@classic
export default class SchemaService extends Service {
  constructor() {
    super(...arguments);

    this.schemas = this.store.peekAll('schema');
  }

  @service store;
  @service flashMessages;

  get globalSchemas() {
    return this.schemas.filterBy('isGlobal');
  }

  @task({ drop: true })
  * fetchSchemas(url) {
    yield timeout(1000);

    return yield RefParser.resolve(url)
    .then(($refs) => {
      let paths = $refs.paths();
      let values = RefParser.$refs.values();

      return paths.map((path) => {
        return {
          id: path,
          schema: values[path],
        };
      });
    });
  }

  @task({ drop: true })
  * checkForUpdates(records) {
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
  }
}
