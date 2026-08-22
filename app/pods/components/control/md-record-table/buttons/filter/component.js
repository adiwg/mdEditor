import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { once } from '@ember/runloop';

/**
 * Rendered as the Actions column's filter-row cell (componentForFilterCell).
 * Shows a "Delete Selected" button whenever one or more rows are selected.
 */
export default class FilterComponent extends Component {
  @service flashMessages;

  get showButton() {
    return this.args.selectedItems?.length >= 1;
  }

  @action
  deleteSelected() {
    const records = this.args.selectedItems;

    records.forEach((rec) => {
      const modelName = rec.constructor.modelName;
      const title = rec.get('title');

      rec.destroyRecord().then((rec) => {
        rec.unloadRecord();
        once(() => {
          const index = records.indexOf(rec);
          if (index > -1) {
            records.splice(index, 1);
          }
          this.flashMessages.danger(`Deleted ${modelName} "${title}".`);
        });
      });
    });
  }
}
