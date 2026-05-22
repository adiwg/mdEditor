import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import EmberObject, { get, set, defineProperty, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ResizeAware from 'ember-resize/mixins/resize-aware';
import { A } from '@ember/array';

@classic
export default class MdNavSecondaryComponent extends Component.extend(
  ResizeAware
) {
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

  @computed(
    'customProfile.active',
    'customProfile.mapById',
    'customProfile.defaultProfile',
    'navLinks',
    'navLinks.[]',
    'model'
  )
  get links() {
    const profileService = this.customProfile;
    const activeProfileId = profileService.active;
    const mapById = profileService.mapById || {};
    const mapByAltId = profileService.mapByAltId || {};
    const defaultProfile = profileService.defaultProfile;
    const active =
      mapById[activeProfileId] ||
      mapById[mapByAltId[activeProfileId]] ||
      defaultProfile;
    const modelName = this.model?.constructor?.modelName;
    const nav = this;

    let links = this.navLinks;

    if (!links && active && modelName) {
      links = get(active, `definition.nav.${modelName}`);
    }

    if (!links && defaultProfile && modelName) {
      links = get(defaultProfile, `definition.nav.${modelName}`);
    }

    if (!Array.isArray(links)) {
      return A([]);
    }

    return A(links.map((lnk, index) => {
      let link = EmberObject.create(lnk);

      link.setProperties({ nav: nav, index: index });
      defineProperty(link, 'navWidth', alias('nav.navWidth'));
      defineProperty(
        link,
        'isOverflow',
        computed('navWidth', 'width', function () {
          return this.navWidth < this.linkWidth + this.nav.offset;
        })
      );

      return link;
    }));
  }

  get sortedLinks() {
    return [...this.links].sort((a, b) => a.index - b.index);
  }

  @computed('navWidth', 'links.@each.width')
  get hasOverflow() {
    return this.navWidth < this.linkWidth;
  }

  @computed('links.@each.width', 'navPadding')
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
    this._handleDebouncedResizeEvent();
  }

  debouncedDidResize(width) {
    set(this, 'navWidth', width || this.navWidth);
  }
}
