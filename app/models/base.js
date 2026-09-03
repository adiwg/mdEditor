import { Model } from 'ember-pouch';
import { attr } from '@ember-data/model';
import hash from 'object-hash';
import { inject as service } from '@ember/service';
import EmberObject, { computed, set, observer } from '@ember/object';
import { bool, alias } from '@ember/object/computed';
import { once, scheduleOnce } from '@ember/runloop';

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

    // Do NOT eagerly read this.hasDirtyAttributes here (as this line used
    // to). ember-data 5.x's native hasDirtyAttributes is backed by
    // @warp-drive/legacy's decorateMethodV2/@memoized machinery, which its
    // own source acknowledges breaks under classic Ember .extend()/mixin
    // merging ("lazy in prod and eager in dev" - see schema-provider's
    // `currentState` getter comment). Reading it synchronously during
    // record creation throws "memoSignal is not a function". This app's
    // own hasDirtyHash (below) is the real dirty-tracking mechanism for
    // record/dictionary/contact and doesn't touch this broken getter.
  },

  // Replace deprecated this.on('didLoad', ...) with observer on isLoaded
  observeLoaded: observer('isLoaded', function () {
    if (this.isLoaded && !this._didLoadCalled) {
      this._didLoadCalled = true;
      this.applyPatch();
      // Schedule isReady after applyPatch completes (applyPatch uses once())
      scheduleOnce('afterRender', this, this.isReady);
    }
  }),

  // Replace deprecated this.on('didUpdate/didCreate', ...) with observer on isSaving
  observeSaving: observer('isSaving', function () {
    // When isSaving transitions from true to false, the save completed
    if (!this.isSaving && this._wasSaving) {
      this.wasUpdated();
    }
    this._wasSaving = this.isSaving;
  }),

  settings: service(),
  schemas: service(),
  customProfiles: service('custom-profile'),
  patch: service(),
  clean: service('cleaner'),
  mdjson: service('mdjson'),

  /**
   * Whether this record replicates to the remote CouchDB (see
   * services/couch.js's filtered push/pull/sync). Every record already
   * lives in the local Pouch db regardless of this flag.
   *
   * @property syncEnabled
   * @type {Boolean}
   */
  syncEnabled: attr('boolean', { defaultValue: false }),

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

    if (!reloading) {
      this.wasUpdated(this);
    }
  }),

  // Watches hasDirtyHash only, not ember-data's native hasDirtyAttributes -
  // see init()'s comment above for why that one isn't safe to read. This
  // app's own hasDirtyHash (a content-hash comparison against cleanJson,
  // set up below) already captures "this record changed" independently.
  observeAutoSave: observer('hasDirtyHash', function () {
    once(this, function () {
      if (this.isNew || this.isEmpty) {
        return;
      }

      if (this.settings.data?.autoSave && this.hasDirtyHash) {
        this.save();
      }
    });
  }),

  applyPatch() {
    once(this, function () {
      let patch = this.patch;

      patch.applyModelPatch(this);
    });
  },

  isReady() {
    let cleanJson = this.cleanJson;
    let newHash = this.hashObject(cleanJson, true);

    // Always set the currentHash to ensure imported records get proper hash
    this.set('currentHash', newHash);
    this.set('jsonSnapshot', cleanJson);
  },

  wasUpdated() {
    this._super(...arguments);

    //let record = model.record || this;
    let json = this.cleanJson;

    try {
      // See init()'s comment above - native hasDirtyAttributes can throw
      // here. This is a defensive post-save cleanup; skipping it when
      // unreadable is safe, rollbackAttributes() has nothing to fix if
      // the save already succeeded.
      if (this.hasDirtyAttributes) {
        this.rollbackAttributes();
      }
    } catch (e) {
      // ignore - see comment above
    }

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);

    this.notifyPropertyChange('currentHash');
    this.notifyPropertyChange('hasDirtyHash');
  },

  updateTimestamp() {
    // Update dateUpdated to current timestamp when record is manually saved
    let current = this.dateUpdated;
    let next = new Date();

    // Ensure monotonic timestamp progression so manual saves stay dirty even in fast successive edits.
    if (current instanceof Date) {
      let currentSecond = Math.floor(current.getTime() / 1000);
      let nextSecond = Math.floor(next.getTime() / 1000);

      if (nextSecond <= currentSecond) {
        next = new Date((currentSecond + 1) * 1000);
      }
    }

    this.set('dateUpdated', next);
  },

  // TODO: Clean this up when we move to upgraded Ember
  revertChanges() {
    // Temporarily disable auto-save behavior
    let originalAutoSave = this.settings.data?.autoSave;
    this.set('settings.data.autoSave', false);

    // Store the original dateUpdated before any changes
    let originalDateUpdated = this.dateUpdatedRevert;

    // Revert JSON content
    let json = this.jsonRevert;
    if (json) {
      this.set('json', EmberObject.create(JSON.parse(json)));
    }

    // Revert dateUpdated field
    if (originalDateUpdated) {
      this.set('dateUpdated', originalDateUpdated);
    }

    // Re-enable auto-save after revert is complete
    scheduleOnce('actions', this, function () {
      this.set('settings.data.autoSave', originalAutoSave);
    });
  },

  wasLoaded() {
    this._super(...arguments);

    let json = this.cleanJson;

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

    set(this, 'currentHash', this.hashObject(target, true));
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

    return typeof toHash === 'object' ? hash(toHash) : undefined;
  },

  /**
   * Compare the current hash with the cached one.
   *
   * @property hasDirtyHash
   * @return {Boolean} Boolean value indicating if hashes are equivalent
   */
  hasDirtyHash: computed('currentHash', function () {
    let newHash = this.hashObject(this.cleanJson, true);

    //if the currentHash is undefined, the record is either new or hasn't had the
    //hash calculated yet
    // if(this.get('currentHash') === undefined) {
    //   this.set('currentHash', newHash);
    // }

    if (this.currentHash !== newHash) {
      return true;
    }

    return false;
  }),

  canRevert: computed('hasDirtyHash', 'settings.data.autoSave', function () {
    let dirty = this.hasDirtyHash;
    let autoSave = this.settings.data?.autoSave;

    //no autoSave so just check if dirty
    if (!autoSave && dirty) {
      return true;
    }

    let revert = this.jsonRevert;

    //if we have set revert object with autoSave on
    if (revert && autoSave) {
      let hash = this.hashObject(JSON.parse(revert), true) !== this.currentHash;

      //check if changes have been made
      if (hash) {
        return true;
      }
    }

    return false;
  }),

  cleanJson: alias('_cleanJson'),

  status: computed('hasDirtyHash', 'hasSchemaErrors', function () {
    let dirty = this.hasDirtyHash;
    let errors = this.hasSchemaErrors;

    if (this.currentHash) {
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
  customSchemas: computed(
    'schemas.schemas.@each.isGlobal',
    'profile',
    function () {
      return this.schemas.schemas.filter((schema) => {
        if (schema.schemaType !== this.constructor.modelName) {
          return false;
        }

        if (schema.isGlobal) {
          return true;
        }

        let profile = this.customProfiles.mapById[this.profile];

        if (!profile || !profile.schemas) {
          return false;
        }

        return profile.schemas.indexOf(schema) > -1;
      }, this);
    }
  ),
});

//Modify the prototype instead of using computed.volatile()
//see https://github.com/emberjs/ember.js/issues/17709#issuecomment-469941364

Object.defineProperty(Base.prototype, '_cleanJson', {
  get() {
    return this.clean.clean(this.json);
  },
});

export default Base;
