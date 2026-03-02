import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { tryInvoke } from '@ember/utils';

@classic
export default class CheckComponent extends Component {
  attributeBindings = ['aria-checked:isSelected'];

  // clickOnRow is passed in from parent
  clickOnRow = null;

  @action
  doClickOnRow(index, record, event) {
    if (this.clickOnRow) {
      this.clickOnRow(index, record);
    }
    tryInvoke(event, 'stopPropagation');
    return false;
  }
}
