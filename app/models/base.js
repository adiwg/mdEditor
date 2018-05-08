import DS from 'ember-data';
import hash from 'npm:object-hash';
import {
  inject as service
} from '@ember/service';
import {
  computed,
  set,
  observer
} from '@ember/object';
import {
  once
} from '@ember/runloop';

export default DS.Model.extend({
  init() {
    this._super(...arguments);

    this.on('didUpdate', this, this.wasUpdated);
    this.on('didCreate', this, this.wasUpdated);
    this.on('didLoad', this, this.applyPatch);
    this.get('hasDirtyAttributes');
    //this.on('didLoad', this, this.wasLoaded);
  },

  settings: service(),
  patch: service(),
  clean: service('cleaner'),
  mdjson: service('mdjson'),

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

  observeReload: observer('isReloading', function () {
    let reloading = this.get('isReloading');

    if(!reloading) {
      this.wasUpdated(this);
    }
  }),

  observeAutoSave: observer('hasDirtyAttributes', 'hasDirtyHash',
    function () {
      if(this.get('isNew')) {
        return;
      }

      if(this.get('settings.data.autoSave') && (this.get('hasDirtyHash') ||
          this.get('hasDirtyAttributes'))) {
        once(this, function () {
          this.save();
        });
      }
    }),

  applyPatch() {
    once(this, function () {

      let patch = this.get('patch');

      patch.applyModelPatch(this);
    });
  },

  wasUpdated() {
    this._super(...arguments);

    //let record = model.record || this;
    let json = JSON.parse(this.serialize()
      .data.attributes.json);

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);
  },

  wasLoaded() {
    this._super(...arguments);

    let json = JSON.parse(this.serialize()
      .data.attributes.json);

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);
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
   * @return {String|undefined} The hash or undefined if an object wasn't provided.
   */
  hashObject(target, parsed) {
    let toHash = parsed ? target : JSON.parse(JSON.stringify(target));

    return typeof toHash === "object" ? hash(toHash) : undefined;
  },

  /**
   * Compare the current hash with the cached one.
   *
   * @property hasDirtyHash
   * @returns {Boolean} Boolean value indicating if hashes are equivalent
   */
  hasDirtyHash: computed('currentHash', function () {
    let newHash = this.hashObject(JSON.parse(this.serialize()
      .data.attributes
      .json), true);

    //if the currentHash is undefined, the record is either new or hasn't had the
    //hash calculated yet
    if(this.get('currentHash') === undefined) {
      this.set('currentHash', newHash);
    }

    if(this.get('currentHash') !== newHash || this.get(
        'hasDirtyAttributes')) {
      return true;
    }

    return false;
  }),

  canRevert: computed('hasDirtyHash', 'settings.data.autoSave', function () {
    let dirty = this.get('hasDirtyHash');
    let autoSave = this.get('settings.data.autoSave');

    //no autoSave so just check if dirty
    if(!autoSave && dirty) {
      return true;
    }

    let revert = this.get('jsonRevert');

    //if we have set revert object with autoSave on
    if(revert && autoSave) {
      let hash = this.hashObject(JSON.parse(revert), true) !== this.get(
        'currentHash');

      //check if changes have been made
      if(hash) {
        return true;
      }
    }

    return false;
  }),

  cleanJson: computed('json', function () {
      return this.get('clean')
        .clean(this.get('json'));
    })
    .volatile(),

  status: computed('hasDirtyHash', function () {
    let dirty = this.get('hasDirtyHash');

    if(this.get('currentHash')) {
      return dirty ? 'danger' : 'success';
    }

    return 'success';
  })
});
