import Ember from 'ember';

export const pollInterval = 750; // time in milliseconds

const {
  Mixin,
  //computed,
  inject,
  on
} = Ember;

export default Mixin.create({
  settings: inject.service(),

  // autoSave: computed('settings.data.autoSave', function () {
  //   return this.get('settings')
  //     .get('data.autoSave');
  // }),

  afterModel(model) {
    this._super(...arguments);

    // if(this.get('autoSave')) {
    //   return;
    // }
    if(!model.get('currentHash')) {
      model.wasUpdated(model);
    }

    let hashPoller = this.get('hashPoller');

    // Make sure we only create one poller instance.
    if(!hashPoller) {
      hashPoller = this.get('pollboy')
        .add(this, this.onPoll, pollInterval);
      this.set('hashPoller', hashPoller);
    }
  },

  deactivatePoll: on('deactivate', function () {
    // if(this.get('autoSave')) {
    //   return;
    // }

    const hashPoller = this.get('hashPoller');

    this.get('pollboy')
      .remove(hashPoller);
    this.set('hashPoller', null);
  }),

  onPoll() {
    const model = this.currentModel;

    return new Ember.RSVP.Promise(function (resolve) {
      model.notifyPropertyChange('currentHash');
      resolve(true);
    });
  }

  // /**
  //  * Whether to compare the model hash on transition.
  //  *
  //  * @property checkHash
  //  * @type {Boolean}
  //  * @default true
  //  */
  // checkHash: true,
  //
  //
  //
  //
  //
  // /**
  //  * Compare thw current hash with the cached one.
  //  *
  //  * @method compareHash
  //  * @returns {Boolean} Boolean value indicating if hashes are equivalent
  //  */
  // compareHash: function() {
  //   let model = this.currentModel;
  //
  //   let oldHash = this.get('modelHash');
  //   let newHash = this.hashObject(model.get(
  //     'json'));
  //
  //   if (oldHash === newHash && !model.get('hasDirtyAttributes')) {
  //     return true;
  //   }
  //
  //   return false;
  // },
  //
  // actions: {
  //   confirmTransition() {
  //     let me = this;
  //
  //     me.currentModel.reload();
  //
  //     this.set('checkHash', false);
  //     this.controller.get('pausedTransition')
  //       .retry().then(() => {
  //         me.set('checkHash', true);
  //       });
  //   },
  //   cancelTransition() {
  //     this.controller
  //       .set('pausedTransition', null);
  //   },
  //   willTransition(transition) {
  //     if (this.get('settings').get('data.autoSave')) {
  //       this.currentModel.save();
  //       return true;
  //     }
  //     if (!this.get('checkHash') || this.compareHash()) {
  //       this.controller
  //         .set('pausedTransition', null);
  //       return true;
  //     } else {
  //       transition.abort();
  //       this.controller.set('pausedTransition', transition);
  //     }
  //   }
  // }
});
