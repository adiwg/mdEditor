import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import {
  Template
} from '../md-party/component';

@classic
@attributeBindings('data-spy')
export default class MdPartyArray extends Component {
  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass = Template;
}
