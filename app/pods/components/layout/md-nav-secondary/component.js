import Component from '@ember/component';
import EmberObject from '@ember/object';
import { computed, get, defineProperty } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Component.extend(ResizeAware, {
  customProfile: service('custom-profile'),
  resizeService: service('resize'),

  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

  navPadding: 5,
  navWidth: 0,

  /**
  * Array of nav links. If not supplied, the links will be pulled from the
  * active profile.
  *
  * @property navLinks
  * @type {Array}
  * @default "undefined"
  * @optional
  */

  /**
   * translated "more" text
   *
   * @property more
   * @type {String}
   */
  more: 'More',

  links: computed('customProfile.active', 'model', 'navWidth', function () {
    const active = this.customProfile.getActiveProfile();
    const modelName = this.get('model.constructor.modelName');
    const nav = this;

    let links = this.navLinks || get(active, 'definition.nav.' +
        modelName) || this
      .customProfile.defaultProfile.definition.nav[modelName];

    return links.map((lnk, index) => {
      let link = EmberObject.create(lnk);

      link.setProperties({ nav: nav, index: index });
      defineProperty(link, 'navWidth', alias('nav.navWidth'));
      defineProperty(link, 'isOverflow', computed('navWidth',
        'width',
        function () {
          return this.navWidth < this.linkWidth + this.nav
            .offset;
        }));

      return link
    });
  }),

  sortedLinks: computed('links', function () {
    let sorted = this.links.sortBy('index');
    return sorted;
  }),

  hasOverflow: computed('navWidth', 'linkWidth', function () {
    return this.navWidth < this.linkWidth;
  }),
  linkWidth: computed('links.@each.width', function () {
    return this.links.reduce((a, b) => a + b.width, this.navPadding);
  }),

  /**
   * Width to be added to linkWidth to make sure the last link will fit.
   * Calcuated as the smaller of the maximum link width or 150.
   *
   * @property offset
   * @type {Number}
   */
  offset: computed('links.@each.width', function () {
    return Math.min(Math.max(...this.links.mapBy('width'), 1), 150);
  }),

  didInsertElement: function () {
    this._super.apply(this, arguments);
    this._handleDebouncedResizeEvent()
  },

  debouncedDidResize(width) {
    this.set('navWidth', width || this.navWidth);
  }
});
