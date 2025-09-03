import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import { once } from '@ember/runloop';
import { Validations } from '../md-online-resource/component';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';

@classic
@attributeBindings('data-spy')
export default class MdOnlineResourceArray extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model) {
      once(this, () => this.set('model', A()));
    }
  }

  /**
   * mdJSON object containing the 'onlineResource' array.
   *
   * @property model
   * @type Object
   * @required
   */

  /**
   * Display the image picker and preview
   *
   * @property imagePicker
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Truncate the text
   *
   * @property ellipsis
   * @type {Boolean}
   * @default true
   */
  ellipsis = true;

  /**
   * List of mdJSON 'onlineResource' object attributes to display in
   * md-object-table to aid in choosing the onlineResource to edit or
   * delete.
   * The property is passed to md-object-table for configuration.
   *
   * @property attributes
   * @type String
   * @default 'name, uri'
   */
  attributes = 'name,uri';

  /**
   * Name to place on the mdEditor panel header for entry and edit of
   * 'onlineResource' objects.
   * The property is passed to md-object-table for configuration.
   *
   * @property label
   * @type String
   * @default 'Online Resource'
   */
  label = 'Online Resource';

  /**
   * If true, a box shadow will be rendered around the card.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow = true;

  /**
   * The template to use for the preview table rows. If not overridden, will use
   * the `md-image-preview` template if `imagePicker = true`.
   *
   * @property previewTemplate
   * @type {String}
   * @readOnly
   * @category computed
   * @requires imagePicker
   */
  @computed('imagePicker')
  get previewTemplate() {
    return this.imagePicker
      ? 'object/md-online-resource-array/md-image-preview'
      : null;
  }

  /**
   * See [md-array-table](md-array-table.html#property_templateClass).
   *
   * @property templateClass
   * @type Ember.Object
   */
  templateClass =
    (
      @classic
      class MdOnlineResourceArray extends EmberObject.extend(Validations) {
        init() {
          undefined;
          //this.set('uri', null);
        }
      }
    );
}
