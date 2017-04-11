import Ember from 'ember';
import hash from 'npm:object-hash';

const {
  Mixin,
  set,
  computed
} = Ember;

export default Mixin.create({
  init() {
    this._super(...arguments);

    this.on('didUpdate', this, this.wasUpdated);
    //this.on('didLoad', this, this.wasLoaded);
  },

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

  wasUpdated(model) {
    console.info(arguments);
    let record = model.record || model;
    let json = record.get('json');
    this.set('currentHash', this.hashObject(json));
    record.set('jsonSnapshot', json);
  },

  wasLoaded() {
  },

  /**
   * Compute and set the model hash.
   *
   * @method setCurrentHash
   * @param {Object} model Optional model with json property to target
   */
  setCurrentHash(json) {
    let target = json || this.get('json');

    set(this, 'currentHash', this.hashObject(target));
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
  hasDirtyHash: computed('currentHash',function() {
    let oldHash = this.get('currentHash');
    let newHash = this.hashObject(this.get(
      'json'));

    if (oldHash !== newHash && !this.get('hasDirtyAttributes')) {
      return true;
    }

    return false;
  })
});
