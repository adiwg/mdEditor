import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getOwner, setOwner } from '@ember/application';
import Theme from 'mdeditor/pods/components/md-models-table/themes/bootstrap3';

export default class MdSelectTableComponent extends Component {
  get themeInstance() {
    if (!this._themeInstance) {
      const owner = getOwner(this);
      this._themeInstance = new Theme();
      setOwner(this._themeInstance, owner);
    }

    return this._themeInstance;
  }

  get tableData() {
    let data = this.args.records ?? this.args.data;

    if (!data) {
      return [];
    }

    return typeof data.toArray === 'function' ? data.toArray() : data;
  }

  get columns() {
    return this.args.columns ?? this.args.dataColumns ?? [];
  }

  @action
  onDisplayDataChanged(settings) {
    if (typeof this.args.select === 'function') {
      this.args.select(settings.selectedItems);
    }
  }
}
