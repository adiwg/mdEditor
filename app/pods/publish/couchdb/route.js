import Route from '@ember/routing/route';
import config from '../../../utils/couchdb-config';

export default class PublishCouchdbRoute extends Route {
  breadCrumb = {
    title: 'CouchDB'
  };

  model() {
    return config;
  }
}
