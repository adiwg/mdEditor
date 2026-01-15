import { inject as service } from '@ember/service';
import Component from '@ember/component';
import EmberObject from '@ember/object';
import { action } from '@ember/object';

export default class MdRepositoryArrayComponent extends Component {
  @service settings;

  repositoryTemplate = EmberObject.extend({
    init() {
      this._super(...arguments);

      this.set('citation', {});
    }
  });

  @action
  lookupTitle(value) {
    let defs = this.settings.data.repositoryDefaults;
    let titles = defs.filterBy('repository', value.repository);

    if(titles.length) {
      value.citation.title = titles.objectAt(0).title;
    }
  }
}
