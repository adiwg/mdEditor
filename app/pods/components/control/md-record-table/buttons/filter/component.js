import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';

/**
 * Rendered as the Actions column's filter-row cell (componentForFilterCell).
 * Shows a "Delete Selected" button whenever one or more rows are selected.
 */
export default class FilterComponent extends Component {
  @service flashMessages;

  // `selectedItems` is a live array mutated in place (pushObject/removeObject)
  // by ember-models-table, not replaced - so this must be a real computed
  // property with an explicit '.[]' dependent key. A plain getter is never
  // re-evaluated by classic (curly) components once mounted.
  @computed('selectedItems.[]')
  get showButton() {
    return this.args.selectedItems?.length >= 1;
  }

  @action
  deleteSelected() {
    const records = this.args.selectedItems;

    if (typeof this.args.deleteSelected === 'function') {
      this.args.deleteSelected(records);
      return;
    }

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
