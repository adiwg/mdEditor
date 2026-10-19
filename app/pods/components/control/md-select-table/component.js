import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Table with action on row click. Used to select objects (records).
 *
 * ```handlebars
 * <Control::MdSelectTable
 *   @data={{this.model.data}}
 *   @columns={{this.model.columns}}
 *   @select={{this.select}}
 * />
 * ```
 *
 * @class md-select-table
 */
export default class MdSelectTableComponent extends Component {
  @action
  handleDisplayDataChanged(displaySettings) {
    if (typeof this.args.select === 'function') {
      this.args.select(displaySettings.selectedItems);
    }
  }
}
