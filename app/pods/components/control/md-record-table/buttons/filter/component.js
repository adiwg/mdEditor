import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { once } from '@ember/runloop';

/**
 * Rendered as the Actions column's filter-row cell (componentForFilterCell).
 * Shows a "Delete Selected" button whenever one or more rows are selected.
 */
@classic
export default class FilterComponent extends Component {
  @service flashMessages;

  // `selectedItems` is mutated in place by ember-models-table, so this needs
  // an explicit '.[]' dependent key - a plain getter won't re-evaluate. Hash
  // args on this classic component land on `this` directly, not `this.args`.
  @computed('selectedItems.[]')
  get showButton() {
    return this.selectedItems?.length >= 1;
  }

  @action
  deleteSelected() {
    const records = this.selectedItems;

    // Named onDeleteSelected (not deleteSelected) to avoid colliding with
    // this action's own name on `this`.
    if (typeof this.onDeleteSelected === 'function') {
      this.onDeleteSelected(records);
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
