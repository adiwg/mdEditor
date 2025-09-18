import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { inject as service } from '@ember/service';
import { alias, bool } from '@ember/object/computed';
import { Model } from 'ember-pouch';
import hash from 'object-hash';
import { set, computed } from '@ember/object';
import EmberObject from '@ember/object';
import { once, scheduleOnce } from '@ember/runloop';

@classic
class Base extends Model {
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
    super.init(...arguments);

    this.on('didUpdate', this, this.wasUpdated);
    this.on('didCreate', this, this.wasUpdated);
    this.on('ready', this, this.isReady);
    this.hasDirtyAttributes;
    //this.on('didLoad', this, this.wasLoaded);
  }

  didLoad() {
    this.applyPatch();
  }

  @service
  settings;

  @service
  schemas;

  @service('custom-profile')
  customProfiles;

  @service
  patch;

  @service('cleaner')
  clean;

  @service('mdjson')
  mdjson;

  @service
  pouch;

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

  @observes('isReloading')
  observeReload() {
    let reloading = this.isReloading;

    if (!reloading) {
      this.wasUpdated(this);
    }
  }

  @observes('hasDirtyAttributes', 'hasDirtyHash')
  observeAutoSave() {
    if (this.isNew || this.isEmpty) {
      return;
    }

    if (
      this.get('settings.data.autoSave') &&
      (this.hasDirtyHash || this.hasDirtyAttributes)
    ) {
      once(this, function () {
        this.save();
      });
    }
  }

  applyPatch() {
    once(this, function () {
      let patch = this.patch;

      patch.applyModelPatch(this);
    });
  }

  isReady() {
    let newHash = this.hashObject(
      JSON.parse(this.serialize().data.attributes.json),
      true
    );

    // if the currentHash is undefined, the record is either new or hasn't had the
    // hash calculated yet
    if (this.currentHash === undefined) {
      this.set('currentHash', newHash);
    }
  }

  wasUpdated() {
    //let record = model.record || this;
    let json = JSON.parse(this.serialize().data.attributes.json);

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);

    // Pouch handling
    this.pouch.updatePouchRecord(this);
  }

  updateTimestamp() {
    // Update dateUpdated to current timestamp when record is manually saved
    this.set('dateUpdated', new Date());
  }

  // TODO: Clean this up when we move to upgraded Ember
  revertChanges() {
    // Temporarily disable auto-save behavior
    let originalAutoSave = this.get('settings.data.autoSave');
    this.set('settings.data.autoSave', false);

    // Store the original dateUpdated before any changes
    let originalDateUpdated = this.get('dateUpdatedRevert');

    // Revert JSON content
    let json = this.get('jsonRevert');
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
  }

  wasLoaded() {
    super.wasLoaded(...arguments);

    let json = JSON.parse(this.serialize().data.attributes.json);

    this.setCurrentHash(json);
    this.set('jsonSnapshot', json);
  }

  saved() {
    this.set('dateUpdated', new Date());

    return super.saved(...arguments);
  }

  /**
   * Compute and set the model hash.
   *
   * @method setCurrentHash
   * @param {Object} model Optional model with json property to target
   */
  setCurrentHash(json) {
    let target = json || this.json;

    set(this, 'currentHash', this.hashObject(target), true);
  }

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
  }

  /**
   * Compare the current hash with the cached one.
   *
   * @property hasDirtyHash
   * @return {Boolean} Boolean value indicating if hashes are equivalent
   */
  @computed('currentHash')
  get hasDirtyHash() {
    let newHash = this.hashObject(
      JSON.parse(this.serialize().data.attributes.json),
      true
    );

    //if the currentHash is undefined, the record is either new or hasn't had the
    //hash calculated yet
    // if(this.get('currentHash') === undefined) {
    //   this.set('currentHash', newHash);
    // }

    if (this.currentHash !== newHash || this.hasDirtyAttributes) {
      return true;
    }

    return false;
  }

  @computed('hasDirtyHash', 'settings.data.autoSave')
  get canRevert() {
    let dirty = this.hasDirtyHash;
    let autoSave = this.get('settings.data.autoSave');

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
  }

  @alias('_cleanJson')
  cleanJson;

  @computed('hasDirtyHash', 'hasSchemaErrors')
  get status() {
    let dirty = this.hasDirtyHash;
    let errors = this.hasSchemaErrors;

    if (this.currentHash) {
      return dirty ? 'danger' : errors ? 'warning' : 'success';
    }

    return 'success';
  }

  /**
   * Indicates whether errors are present.
   *
   * @property hasSchemaErrors
   * @type {Boolean}
   * @readOnly
   * @category computed
   * @requires schemaErrors
   */
  @bool('schemaErrors.length')
  hasSchemaErrors;

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
  @computed('schemas.schemas.@each.isGlobal', 'profile')
  get customSchemas() {
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
}

//Modify the prototype instead of using computed.volatile()
//see https://github.com/emberjs/ember.js/issues/17709#issuecomment-469941364

Object.defineProperty(Base.prototype, '_cleanJson', {
  get() {
    return this.clean.clean(this.json);
  },
});

export default Base;
