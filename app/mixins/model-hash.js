import Ember from 'ember';
import hash from 'npm:object-hash';

const {
  Mixin, set
} = Ember;

export default Mixin.create({
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

  setModelHash(model) {
    let target = model || this.currentModel.get('json');

    set(this, 'modelHash', this.hashObject(target));
  },

  /**
   * Computed a hash for the target object.
   *
   * @param  {Object} target    The object to hash
   * @param  {Boolean} parse    If true, the object will be passed through
   *                            JSON.parse before being hashed
   * @return {String}           The hash
   */
  hashObject(target, parse) {
    let toHash = parse ? JSON.parse(target) : target;

    return hash(toHash);
  },

  compareHash: function() {
    if (this.currentModel.get('hasDirtyAttributes')) {
      return false;
    }

    let oldHash = this.get('modelHash');
    let newHash = this.hashObject(JSON.stringify(this.currentModel.get(
      'json')), true);

    if (oldHash === newHash && !this.currentModel.get('hasDirtyAttributes')) {
      return true;
    }

    this.currentModel.send('becomeDirty');
    return false;
  },

  actions: {
    confirmTransition() {
      let me = this;

      this.toggleProperty('checkHash');
      this.controller.get('pausedTransition')
        .retry().then(() => {
          me.toggleProperty('checkHash');
        });
    },
    cancelTransition() {
      this.controller
        .set('pausedTransition', null);
    },
    willTransition(transition) {
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
