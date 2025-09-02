import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';

@classic
@attributeBindings('data-spy')
export default class MdCitationArray extends Component {
 init() {
   super.init(...arguments);

   if(!this.model) {
     this.set('model', A());
   }
 }

 /**
  * mdJSON object containing the 'citation' array.
  *
  * @property model
  * @type Object
  * @required
  */

 /**
  * List of mdJSON 'citation' object attributes to display in
  * md-object-table to aid in choosing the citation to edit or
  * delete.
  * The property is passed to md-object-table for configuration.
  *
  * @property attributes
  * @type String
  * @default 'title'
  */
 attributes = 'title';

 /**
  * Name to place on the mdEditor panel header for entry and edit of
  * 'citation' objects.
  * The property is passed to md-object-table for configuration.
  *
  * @property label
  * @type String
  * @default 'Citation'
  */
 label = 'Citation';

 /**
  * See [md-array-table](md-array-table.html#property_templateClass).
  *
  * @property templateClass
  * @type Ember.Object
  */
 templateClass = EmberObject.extend({
   init() {
     super.init(...arguments);
     //this.set('authority', {});
   }
 });
}
