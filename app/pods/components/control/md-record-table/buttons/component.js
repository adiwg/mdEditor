import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@classNames('md-dashboard-buttons')
export default class Buttons extends Component {
  @service
  router;

  @action
  deleteItem(item, index, isSelected, clickOnRow) {
    if(isSelected) {
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
