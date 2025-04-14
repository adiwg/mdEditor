import { Model } from 'ember-pouch';
import hash from 'object-hash';
import { inject as service } from '@ember/service';
import { computed, set, observer } from '@ember/object';
import { bool, alias } from '@ember/object/computed';
import { once } from '@ember/runloop';

const Base = Model.extend({
  /**
   * Base model
   *
   * @class base
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    this._super(...arguments);

    this.on('didUpdate', this, this.wasUpdated);
    this.on('didCreate', this, this.wasUpdated);
    this.on('didLoad', this, this.applyPatch);
    this.on('ready', this, this.isReady);
    this.hasDirtyAttributes;
    //this.on('didLoad', this, this.wasLoaded);
  },

  settings: service(),
  schemas: service(),
  customProfiles: service('custom-profile'),
  patch: service(),
  clean: service('cleaner'),
  mdjson: service('mdjson'),
  pouch: service(),

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
    let reloading = this.isReloading;

    if(!reloading) {
      this.wasUpdated(this);
    }
  }),

  observeAutoSave: observer('hasDirtyHash',
    function () {
      if(this.isNew || this.isEmpty) {
        return;
      }

      if(this.get('settings.data.autoSave') && this.hasDirtyHash) {
        once(this, async function () {
          await this.save();
        });
      }
    }
  ),

  applyPatch() {
    once(this, function () {

      let patch = this.patch;

      patch.applyModelPatch(this);
    });
  },

  isReady() {
    let newHash = this.hashObject(JSON.parse(this.serialize().data.attributes.json), true);

    // if the currentHash is undefined, the record is either new or hasn't had the
    // hash calculated yet
    if(this.currentHash === undefined) {
      this.set('currentHash', newHash);
    }
  },

  wasUpdated() {
    this._super(...arguments);

    //let record = model.record || this;
    let json = JSON.parse(this.serialize().data.attributes.json);

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);

    // Pouch handling
    this.pouch.updatePouchRecord(this);
  },

  wasLoaded() {
    this._super(...arguments);

    let json = JSON.parse(this.serialize().data.attributes.json);

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
    let target = json || this.json;

    set(this, 'currentHash', this.hashObject(target), true);
  },

  /**
   * Computed a hash for the target object.
   *
   * @property hashObject
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
   * @return {Boolean} Boolean value indicating if hashes are equivalent
   */
  hasDirtyHash: computed('currentHash', function () {
    let newHash = this.hashObject(JSON.parse(this.serialize().data.attributes.json), true);

    //if the currentHash is undefined, the record is either new or hasn't had the
    //hash calculated yet
    // if(this.get('currentHash') === undefined) {
    //   this.set('currentHash', newHash);
    // }

    if((this.currentHash !== newHash) || this.hasDirtyAttributes) {
      return true;
    }

    return false;
  }),

  canRevert: computed('hasDirtyHash', 'settings.data.autoSave', function () {
    let dirty = this.hasDirtyHash;
    let autoSave = this.get('settings.data.autoSave');

    //no autoSave so just check if dirty
    if(!autoSave && dirty) {
      return true;
    }

    let revert = this.jsonRevert;

    //if we have set revert object with autoSave on
    if(revert && autoSave) {
      let hash = this.hashObject(JSON.parse(revert), true) !== this.currentHash;

      //check if changes have been made
      if(hash) {
        return true;
      }
    }

    return false;
  }),

  cleanJson: alias('_cleanJson'),

  status: computed('hasDirtyHash', 'hasSchemaErrors', function () {
    let dirty = this.hasDirtyHash;
    let errors = this.hasSchemaErrors;

    if(this.currentHash) {
      return dirty ? 'danger' : errors ? 'warning' : 'success';
    }

    return 'success';
  }),

  /**
   * Indicates whether errors are present.
   *
   * @property hasSchemaErrors
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires schemaErrors
   */
  hasSchemaErrors: bool('schemaErrors.length'),

  /**
   * Array of custom schemas that are associated with this model
   *
   * @property customSchemas
   * @type {Array}
   * @default "[]"
   * @readOnly
   * @category computed
   * @requires
   */
  customSchemas: computed('schemas.schemas.@each.isGlobal', 'profile', function () {
    return this.schemas.schemas.filter((schema) => {
      if(schema.schemaType !== this.constructor.modelName) {
        return false;
      }

      if(schema.isGlobal) {
        return true;
      }

      let profile=this.customProfiles.mapById[this.profile];

      if(!profile || !profile.schemas){
        return false;
      }

      return profile.schemas.indexOf(
        schema) > -1;
    }, this);
  })
});

//Modify the prototype instead of using computed.volatile()
//see https://github.com/emberjs/ember.js/issues/17709#issuecomment-469941364

Object.defineProperty(Base.prototype, '_cleanJson', {
  get() {
    return this.clean.clean(this.json);
  }
});

export default Base;
