import Component from '@glimmer/component';
import { set } from '@ember/object';

export default class CouchdbSettingsComponent extends Component {
  constructor() {
    super(...arguments);
    
    // Ensure the model has the required properties
    if (this.args.model) {
      if (!this.args.model['couchdb-url']) {
        set(this.args.model, 'couchdb-url', '');
      }
      if (!this.args.model['couchdb-database']) {
        set(this.args.model, 'couchdb-database', '');
      }
      if (!this.args.model['couchdb-username']) {
        set(this.args.model, 'couchdb-username', '');
      }
    }
  }
}
