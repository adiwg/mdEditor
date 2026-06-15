import Component from '@glimmer/component';
import { getOwner, setOwner } from '@ember/application';
import Theme from './themes/bootstrap3';

/**
 * Wrapper around ember-models-table 5.x {@link ModelsTable}.
 * Must pass @themeInstance into ModelsTable — the addon template reads it from
 * args, not from a component getter.
 */
export default class MdModelsTableComponent extends Component {
  get themeInstance() {
    if (this.args.themeInstance) {
      return this.args.themeInstance;
    }

    if (!this._themeInstance) {
      const owner = getOwner(this);
      this._themeInstance = new Theme();
      setOwner(this._themeInstance, owner);
    }

    return this._themeInstance;
  }

  get tableData() {
    let data = this.args.data ?? this.args.records;

    if (!data) {
      return [];
    }

    return typeof data.toArray === 'function' ? data.toArray() : data;
  }
}
