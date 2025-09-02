import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import EmberObject, { set, get, action } from '@ember/object';

@classic
export default class MdRepositoryArray extends Component {
  @service
  settings;

  repositoryTemplate = EmberObject.extend({
    init() {
      undefined;

      this.set('citation', {});
    }
  });

  @action
  lookupTitle(value) {
    let defs = this.get('settings.data.repositoryDefaults');
    let titles = defs.filterBy('repository', value.repository);

    if(get(titles, 'length')) {

      set(value, 'citation.title', get(titles.objectAt(0), 'title'));
    }
  }
}
