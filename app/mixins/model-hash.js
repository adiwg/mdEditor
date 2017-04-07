import Ember from 'ember';
import hash from 'npm:object-hash';

const {
  Mixin,
  set,
  inject
} = Ember;

export default Mixin.create({
  settings: inject.service(),

  afterModel(model) {
    this._super(...arguments);

    let target = model.get('json');

    this.set('modelHash', this.hashObject(target));
  },

  /**
   * The hash for the clean model.
   *
   * @property modelHash
   * @type {String}
   */

  /**
   * Whether to compare the model hash on transition.
   *
   * @property checkHash
   * @type {Boolean}
   * @default true
   */
  checkHash: true,

  /**
   * Compute and set the model hash.
   *
   * @method setModelHash
   * @param {Object} model Optional model with json property to target
   */
  setModelHash(model) {
    let target = model || this.currentModel.get('json');

    set(this, 'modelHash', this.hashObject(target));
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
   * Compare thw current hash with the cached one.
   *
   * @method compareHash
   * @returns {Boolean} Boolean value indicating if hashes are equivalent
   */
  compareHash: function() {
    let model = this.currentModel;

    let oldHash = this.get('modelHash');
    let newHash = this.hashObject(model.get(
      'json'));

    if (oldHash === newHash && !model.get('hasDirtyAttributes')) {
      return true;
    }

    return false;
  },

  actions: {
    confirmTransition() {
      let me = this;

      me.currentModel.reload();

      this.set('checkHash', false);
      this.controller.get('pausedTransition')
        .retry().then(() => {
          me.set('checkHash', true);
        });
    },
    cancelTransition() {
      this.controller
        .set('pausedTransition', null);
    },
    willTransition(transition) {
      if(this.get('settings').get('data.autoSave')){
        this.currentModel.save();
        return true;
      }
      if (!this.get('checkHash') || this.compareHash()) {
        this.controller
          .set('pausedTransition', null);
        return true;
      } else {
        transition.abort();
        this.controller.set('pausedTransition', transition);
      }
    }
  }
});
