import Indicator from 'mdeditor/pods/components/control/md-indicator/component';
import { get, computed } from '@ember/object';
import { bool, map } from '@ember/object/computed';

export default Indicator.extend({
  tagName: 'span',

  init() {
    this.type = this.type || 'info';

    this._super(...arguments);

    this.linkText = this.linkText || 'Open Related';

    this.classNames = ['md-indicator-related', `md-${this.type}`].concat(this
      .classNames);
  },

  isVisible: bool('related'),
  /**
   * The string value of the "link-to" route argument.
   *
   * @property route
   * @type {String}
   * @required
   */

  /**
   * The string value that provide options on how the user will interact with tooltip
   *
   * @property event
   * @type {String}
   */

   /**
    * The object to use as the data model for the entity.
    *
    * @property model
    * @type {Object}
    * @required
    */

    /**
    * The string value used to render text to tooltip button.
    *
    * @property linkText
    * @type {String}
    * @required
    */

  /**
   * The parent dictionary object for this attribute used to lookup references.
   *
   * @property parent
   * @type {Object}
   * @required
   */

  /**
   * The string value property used in the related computed property.
   *
   * @property path
   * @type {String}
   * @required
   */

   /**
   * The numeric value in milliseconds before the tooltip wil lhide after user hovers away from
   * tooltip.
   *
   * @property popoverHideDelay
   * @type {String}
   */

   /**
   * The string value that tells the tooltip to append to a specific element. Default is set to
   * body of page.
   *
   * @property popperContainer
   * @type {String}
   * @default "body"
   */

  /**
   * The string value property used in the related computed property
   * @property relatedId
   * @type {String}
   * @required
   */
  /**
   * The related object.
   *
   * @property related
   * @type {Object}
   * @category computed
   * @requires path,parent
   */
  related: computed('path', 'parent', function () {
    return get(this.parent, this.path).findBy(this.relatedId, get(this
      .model, this.relatedIdLocal || this.relatedId));
  }),

  /**
   * The index of the related object.
   *
   * @property relatedIndex
   * @type {Number}
   * @category computed
   * @requires related
   */
  relatedIndex: computed('related', function () {
    return get(this.parent, this.path).indexOf(this.related);
  }),

  /**
   * The models for the link-to.
   *
   * @property models
   * @type {Array}
   * @category computed
   * @requires routeIdPaths
   */
  models: map('routeIdPaths', function (p) {
    return this.get(p);
  })
});
