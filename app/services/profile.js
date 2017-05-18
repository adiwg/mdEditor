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
        target: 'record.show.edit.main'

      }, {
        title: 'Metadata',
        target: 'record.show.edit.metadata'

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
        title: 'Coverage',
        target: 'record.show.edit.coverages'

      }, {
        title: 'Grid',
        target: 'record.show.edit.grid'

      }],
      components: {
        record: {
          main: {
            recordId: true,
            status: true,
            resourceType: true,
            description: true,
            abstract: true,
            shortAbstract: true,
            supplementalInfo: true,
            purpose: true,
            environmentDescription:true
          }
        }
      }
    },
    basic: {
      profile: null,
      secondaryNav: [{
        title: 'Main',
        target: 'record.show.edit.main'

      }, {
        title: 'Metadata',
        target: 'record.show.edit.metadata'

      }, {
        title: 'Keywords',
        target: 'record.show.edit.keywords'

      }, {
        title: 'Spatial',
        target: 'record.show.edit.spatial'

      }, {
        title: 'Distribution',
        target: 'record.show.edit.distribution'

      }],
      components: {
        record: {
          main: {
            supplementalInfo: false,
            purpose: false,
            environmentDescription: false
          }
        }
      }
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
