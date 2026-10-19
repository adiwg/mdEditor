import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  Template
} from '../md-locale/component';

@classic
export default class MdLocaleArrayComponent extends Component {
  attributeBindings = ['data-spy'];

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass = Template;
}
