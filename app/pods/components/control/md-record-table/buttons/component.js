import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import { action } from '@ember/object';
import layout from './template';

class ButtonsComponent extends Component {
  @service router;

  get record() { return this.args.record; }
  get index() { return this.args.index; }
  get isSelected() { return this.args.isSelected; }
  get clickOnRow() { return this.args.clickOnRow; }
  get column() { return this.args.column; }

  @action
  deleteItem(item, index, isSelected, clickOnRow) {
    if (isSelected) {
      clickOnRow(index, item);
    }

    this._deleteItem(item);
  }

  @action
  editItem(item, evt) {
    evt.stopPropagation();
    this.router.transitionTo(`${item.constructor.modelName}.show.edit`, item);

    return false;
  }

  @action
  showSlider(rec, evt) {
    this.column.showSlider(rec, evt);
  }

  _deleteItem(item) {
    item.destroyRecord().then(() => {
      item.unloadRecord();
    });
  }
}

export default setComponentTemplate(layout, ButtonsComponent);
