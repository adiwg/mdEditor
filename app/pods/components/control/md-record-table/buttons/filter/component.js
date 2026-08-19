import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';

@classic
export default class FilterComponent extends Component {
  @service flashMessages;

  // `selectedItems` is a live array mutated in place (pushObject/removeObject)
  // by ember-models-table, not replaced - so this must be a real computed
  // property with an explicit '.[]' dependent key. A plain getter is never
  // re-evaluated by classic (curly) components once mounted.
  @computed('selectedItems.[]')
  get showButton() {
    return this.selectedItems?.length >= 1;
  }

  init() {
    super.init(...arguments);
    if (!this.deleteSelected) {
      this.deleteSelected = this._deleteSelected.bind(this);
    }
  }

  _deleteSelected(records) {
    records.forEach((rec) => {
      const modelName = rec.constructor.modelName;
      const title = rec.get('title');

      rec.destroyRecord().then((rec) => {
        rec.unloadRecord();
        once(() => {
          records.removeObject(rec);
          this.flashMessages.danger(`Deleted ${modelName} "${title}".`);
        });
      });
    });
  }
}
