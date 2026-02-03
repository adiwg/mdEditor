import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class CheckComponent extends Component {
  attributeBindings = ['aria-checked:isSelected'];

  actions = {
    clickOnRow(index, record, event) {
      this.clickOnRow(index, record);
      event.stopPropagation();
    }
  }
}
