import Ember from 'ember';

/**
 * Profile service
 *
 * Service that provides profile configurations for metadata records.
 *
 * @module
 * @augments ember/Service
 */
export default Ember.Service.extend({
  /**
   * String identifying the active profile
   *
   * @type {?String}
   */
  active: null,

  /**
   * Get the active profile.
   *
   * @function
   * @returns {Object}
   */
  getActiveProfile() {
    const active = this.get('active');
    const profile = active && typeof active === 'string' ? active : 'full';
    const profiles = this.get('profiles');

    return profiles[profile];
  },

  /**
   * An object defining the available profiles
   *
   * @type {Object} profiles
   */
  profiles: {
    full: {
      profile: null,
      secondaryNav: [{
        title: 'Main',
        target: 'record.show.edit.index'

      }, {
        title: 'Keywords',
        target: 'record.show.edit.keywords'

      }, {
        title: 'Spatial',
        target: 'record.show.edit.spatial'

      }, {
        title: 'Quality',
        target: 'record.show.edit.quality'

      }, {
        title: 'Distribution',
        target: 'record.show.edit.distribution'

      }, {
        title: 'Associated',
        target: 'record.show.edit.associated'

      }, {
        title: 'Documents',
        target: 'record.show.edit.documents'

      }, {
        title: 'Dictionaries',
        target: 'record.show.edit.dictionaries'

      }, {
        title: 'Coverage',
        target: 'record.show.edit.coverages'

      }, {
        title: 'Grid',
        target: 'record.show.edit.grid'

      }]
    },
    basic: {
      profile: null,
      secondaryNav: [{
        title: 'Main',
        target: 'record.show.edit.index'

      }, {
        title: 'Keywords',
        target: 'record.show.edit.keywords'

      }, {
        title: 'Spatial',
        target: 'record.show.edit.spatial'

      }, {
        title: 'Distribution',
        target: 'record.show.edit.distribution'

      }]
    },
    dictionary: {
      secondaryNav: [{
        title: 'Main',
        target: 'dictionary.show.edit.index'

      }, {
        title: 'Domains',
        target: 'dictionary.show.edit.domains'

      }, {
        title: 'Entities',
        target: 'dictionary.show.edit.entities'

      }]
    }
  }
});
