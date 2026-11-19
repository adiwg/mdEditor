import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component, { setComponentTemplate } from '@ember/component';
import { once } from '@ember/runloop';
import layout from './template';

/**
 * Rendered as the Actions column's filter-row cell (componentForFilterCell).
 * Shows a "Delete Selected" button whenever more than one row is selected.
 */
@classic
class FilterComponent extends Component {
  @service flashMessages;

  // `selectedItems` in ember-models-table v5 is a TrackedArray mutated via
  // native .push()/.splice(). Do NOT wrap this getter in @computed('selectedItems.[]'):
  // Ember's ComputedProperty wraps its getter in untrack() and only watches the
  // classic '[]' tag, which TrackedArray never dirties. A native getter lets
  // Glimmer autotrack TrackedArray.length directly.
  get showButton() {
    return this.selectedItems?.length > 1;
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

    [...records].forEach((rec) => {
      const modelName = rec.constructor.modelName;
      const title = rec.get('title');

      rec.destroyRecord().then((destroyed) => {
        destroyed.unloadRecord();
        once(() => {
          const idx = records.indexOf(destroyed);
          if (idx !== -1) {
            records.splice(idx, 1);
          }
          this.flashMessages.danger(`Deleted ${modelName} "${title}".`);
        });
      });
    });
  }
}

export default setComponentTemplate(layout, FilterComponent);
