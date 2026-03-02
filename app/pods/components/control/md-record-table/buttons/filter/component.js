import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import { once } from '@ember/runloop';

@classic
export default class FilterComponent extends Component {
  @service flashMessages;

  // Use computed property to track selectedItems changes
  @computed('selectedItems.[]')
  get showButton() {
    return this.selectedItems?.length >= 1;
  }

  @action
  deleteSelected(records) {
    records.forEach((rec) => {
      rec.destroyRecord().then((rec) => {
        rec.unloadRecord();
        once(() => {
          records.removeObject(rec);
          this.flashMessages.danger(
            `Deleted ${rec.constructor.modelName} "${rec.get('title')}".`
          );
        });
      });
    });
  }
}
