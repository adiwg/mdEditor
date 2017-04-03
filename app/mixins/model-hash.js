import Ember from 'ember';
import hash from 'npm:object-hash';

const {
  Mixin
} = Ember;

export default Mixin.create({
  /**
   * The hash for the clean model.
   *
   * @property modelHash
   * @type {String}
   */

  afterModel(model) {
    this._super(...arguments);

    let target = model.get('json');

    this.set('modelHash', this.hashObject(target));
  },

  /**
   * Computed a hash for the target object.
   *
   * @param  {Object} target    The object to hash
   * @param  {Boolean} parse If true, the object will be passed through
   *                              JSON.parse before being hashed
   * @return {String}            The hash
   */
  hashObject(target, parse) {
    let toHash = parse ? JSON.parse(target) : target;

    return hash(toHash);
  },

  compareHash: function () {
    let oldHash = this.get('modelHash');
    let newHash = this.hashObject(JSON.stringify(this.currentModel.get(
      'json')), true);

    return oldHash === newHash;

  },

  actions: {
    confirmTransition() {
      this.controller.get('pausedTransition')
        .retry();
    },
    cancelTransition() {
      this.controller
        .set('pausedTransition', false);
    },
    willTransition(transition) {
      if(this.routeName === transition.targetName || this.compareHash()) {
        return true;
      } else {
        transition.abort();
        this.controller.set('pausedTransition', transition);
      }
    }
  }
});
