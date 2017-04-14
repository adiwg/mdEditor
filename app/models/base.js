import Ember from 'ember';
import DS from 'ember-data';
import hash from 'npm:object-hash';

const {
  inject,
  set,
  computed
} = Ember;

export default DS.Model.extend({
  init() {
    this._super(...arguments);

    this.on('didUpdate', this, this.wasUpdated);
    this.get('hasDirtyAttributes');
    //this.on('didLoad', this, this.wasLoaded);
  },

  settings: inject.service(),

  /**
   * The hash for the clean record.
   *
   * @property currentHash
   * @type {String}
   */

  /**
   * The clean json object.
   *
   * @property jsonSnapshot
   * @type {String}
   */

  observeReload: Ember.observer('isReloading', function() {
    let reloading = this.get('isReloading');

    if (!reloading) {
      console.info(this.get('isReloading'));
      this.wasUpdated(this);
    }
  }),

  observeAutoSave: Ember.observer('hasDirtyAttributes', 'hasDirtyHash',
    function() {
      if (this.get('settings.data.autoSave') && (this.get('hasDirtyHash') ||
          this.get('hasDirtyAttributes'))) {
        Ember.run.once(this, function() {
          this.save();
        });
      }
    }),

  wasUpdated(model) {
    console.info(arguments);
    let record = model.record || model;
    let json = record.serialize().data.attributes.json;
    
    this.setCurrentHash(json);
    record.set('jsonSnapshot', json);
  },

  wasLoaded(model) {
    let json = model.serialize().data.attributes.json;

    this.setCurrentHash(json);
    model.set('jsonSnapshot', json);
  },


  saved() {
    this.set('dateUpdated', new Date());

    return this._super(...arguments);
  },

  /**
   * Compute and set the model hash.
   *
   * @method setCurrentHash
   * @param {Object} model Optional model with json property to target
   */
  setCurrentHash(json) {
    let target = json || this.get('json');

    set(this, 'currentHash', this.hashObject(target), true);
  },

  /**
   * Computed a hash for the target object.
   *
   * @param  {Object} target    The object to hash
   * @param  {Boolean} parsed    If true, the object will not be passed through
   *                            JSON.parse before being hashed
   * @return {String}           The hash
   */
  hashObject(target, parsed) {
    let toHash = parsed ? target : JSON.parse(JSON.stringify(target));

    return hash(toHash);
  },

  /**
   * Compare the current hash with the cached one.
   *
   * @property hasDirtyHash
   * @returns {Boolean} Boolean value indicating if hashes are equivalent
   */
  hasDirtyHash: computed('currentHash', function() {
    let oldHash = this.get('currentHash');
    let newHash = this.hashObject(this.serialize().data.attributes.json, true);

    if (oldHash !== newHash && !this.get('hasDirtyAttributes')) {
      return true;
    }

    return false;
  }),

  status: computed('hasDirtyHash', function() {
    let dirty = this.get('hasDirtyHash');

    if (this.get('currentHash')) {
      return dirty ? 'danger' : 'success';
    }

    return 'success';
  })
});
