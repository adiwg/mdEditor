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
   * translated "more" text
   *
   * @name more
   * @type {String}
   */
  more: 'More',

  links: computed('customProfile.active', 'model', 'navWidth', function () {
    const active = this.customProfile.getActiveProfile();
    const modelName = this.model.constructor.modelName;
    const nav = this;

    let links = get(active, 'definition.nav.' + modelName) || this
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
   * width that needs to be a from the parent div width
   *
   * @name offset
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
