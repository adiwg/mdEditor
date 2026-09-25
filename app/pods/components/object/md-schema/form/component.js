import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action, set } from '@ember/object';

const typeOptions = [
  {
    name: 'Metadata',
    value: 'record',
    //tip: 'tooltip'
  },
  {
    name: 'Contact',
    value: 'contact',
    //tip: 'tooltip'
  },
  {
    name: 'Dictionary',
    value: 'dictionary',
    //tip: 'tooltip'
  },
];

@classic
export default class FormComponent extends Component {
  typeOptions = typeOptions;

  @action
  setIsGlobal(isGlobal) {
    if (!this.record) {
      return;
    }

    let nextValue =
      typeof isGlobal === 'boolean' ? isGlobal : !this.record.isGlobal;
    set(this.record, 'isGlobal', nextValue);
  }
}
