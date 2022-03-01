import Indicator from 'mdeditor/pods/components/control/md-indicator/component';
import { get, computed } from '@ember/object';
import { bool, map } from '@ember/object/computed';

export default Indicator.extend({
  tagName: 'span',

  init() {
    this.type = this.type || 'info';

    this._super(...arguments);

    this.linkText = this.linkText || 'Open Related';
  },

  isVisible: bool('related'),

  /**
   * The related object.
   *
   * @property interpolated
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
