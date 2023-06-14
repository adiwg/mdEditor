import Indicator from 'mdeditor/pods/components/control/md-indicator/component';
import { get, computed } from '@ember/object';
import { bool, map } from '@ember/object/computed';

export default Indicator.extend({
  /**
   * @module mdeditor
   * @submodule components-control
   */

  /**
   * Icon that display a popover with information on a related object.
   *
   * ```handlebars
   * \{{control/md-indicator/related
   *   model=model
   *   route=true
   *   icon="sticky-note"
   *   note="${foo} has an associated domain ${bar}"
   *   route="dictionary.show.edit.entity"
   *   values=values
   *   parent=dictionary
   *   relatedId="domainId"
   *   relatedIdLocal="domainId"
   *   path="domain"
   *   title="Related Indicator Test"
   *   linkText="Go to Domain"
   *   type="warning"
   *   popperContainer="body"
   * }}
   * ```
   *
   * @class md-indicator--related
   * @extends md-indicator
   * @constructor
   */

  init() {
    this.type = this.type || 'info';

    this._super(...arguments);

    this.linkText = this.linkText || 'Open Related';

    this.classNames = ['md-indicator-related', `md-${this.type}`].concat(
      this.classNames
    );
  },

  isVisible: bool('related'),
  /**
   * The string value of the "link-to" route argument.
   *
   * @property route
   * @type {String}
   */

  /**
   * The object to use as the data model for the "local" object.
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
   * The name of the property used to lookup the related object. This property will
   * be used for both the local and related objects if relatedIdLocal is not
   * specified.
   *
   * @property relatedId
   * @type {String}
   * @required
   */

  /**
   * The string value property used in the "local" object to find the related
   * object.
   *
   * @property relatedIdLocal
   * @type {String}
   * @required
   */

  /**
   * An array of strings passed to this.get to lookup model id values for the <a href="#property_route">
   *
   * @property routeIdPaths
   * @type {Array}
   */

  /**
   * The related object.
   *
   * @property related
   * @type {Object}
   * @routeIdPathscategory computed
   * @requires path,parent
   */
  related: computed('path', 'parent', function () {
    return get(this.parent, this.path).findBy(
      this.relatedId,
      get(this.model, this.relatedIdLocal || this.relatedId)
    );
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
   * An array of property names that correspond to model.ids for the link-to.
   *
   * @property models
   * @type {Array}
   * @category computed
   * @requires routeIdPaths
   */
  models: map('routeIdPaths', function (p) {
    return this.get(p);
  }),
});
