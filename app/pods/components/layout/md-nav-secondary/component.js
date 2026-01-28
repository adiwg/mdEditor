import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import EmberObject, { get, defineProperty, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ResizeAware from 'ember-resize/mixins/resize-aware';

@classic
export default class MdNavSecondaryComponent extends Component.extend(ResizeAware) {
  @service('custom-profile') customProfile;
  @service('resize') resizeService;

  resizeWidthSensitive = true;
  resizeHeightSensitive = true;

  navPadding = 5;
  navWidth = 0;

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
  more = 'More';

  get links() {
    const active = this.customProfile.getActiveProfile();
    const modelName = this.model?.constructor?.modelName;
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
  }

  get sortedLinks() {
    let sorted = this.links.sortBy('index');
    return sorted;
  }

  get hasOverflow() {
    return this.navWidth < this.linkWidth;
  }

  get linkWidth() {
    return this.links.reduce((a, b) => a + b.width, this.navPadding);
  }

  /**
   * Width to be added to linkWidth to make sure the last link will fit.
   * Calcuated as the smaller of the maximum link width or 150.
   *
   * @property offset
   * @type {Number}
   */
  get offset() {
    return Math.min(Math.max(...this.links.mapBy('width'), 1), 150);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    this._handleDebouncedResizeEvent()
  }

  debouncedDidResize(width) {
    this.navWidth = width || this.navWidth;
  }
}
