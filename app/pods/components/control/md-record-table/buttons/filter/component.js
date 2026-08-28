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

  // `selectedItems` is a live array mutated in place (pushObject/removeObject)
  // by ember-models-table, not replaced - so this must be a real computed
  // property with an explicit '.[]' dependent key. A plain getter is never
  // re-evaluated by classic (curly) components once mounted.
  //
  // This is a classic `@ember/component`, invoked via the `{{component}}`
  // helper with hash args - those land as plain properties on `this`
  // (`this.selectedItems`), not under `this.args` (a Glimmer-only concept).
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
