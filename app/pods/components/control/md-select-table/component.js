import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

@classic
export default class MdSelectTableComponent extends Component {
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Table with action on row click. Used to select objects(records).
   *
   *```handlebars
   * \{{control/md-select-table
   *   data=model.data
   *   columns=model.columns
   *   select=callback
   * }}
   * ```
   *
   * @class md-select-table
   * @extends Component
   */

  @service('emt-themes/md-bootstrap3') themeInstance;

  classNames = ['md-select-table'];

  filteringIgnoreCase = true;

  /**
   * Callback on row selection.
   *
   * @method select
   * @param {Array} selected Selected items.
   * @return {Array}
   */
  select(selected) {
    return selected;
  }

  @action
  handleDisplayDataChanged(settings) {
    let sel = settings.selectedItems || [];
    this.select(sel);
  }
}
