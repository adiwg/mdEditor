import { hasMany, attr, belongsTo } from '@ember-data/model';
import { alias, notEmpty } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import EmberObject, { get, computed } from '@ember/object';
import { Copyable } from 'ember-copy';
import Model from 'mdeditor/models/base';
import { validator, buildValidations } from 'ember-cp-validations';
import { inject as service } from '@ember/service';
import { v4 as uuidv4 } from 'uuid';

const Validations = buildValidations({
  'json.contactId': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.name': [
    validator('format', {
      regex: /^\s+$/,
      inverse: true,
      isWarning: true,
      message: 'Name should not be only white-space.',
    }),
    validator('presence', {
      disabled: notEmpty('model.json.name'),
      presence: true,
    }),
  ],
  'json.positionName': [
    validator('format', {
      regex: /^\s+$/,
      inverse: true,
      isWarning: true,
      message: 'Position Name should not be only white-space.',
    }),
    validator('presence', {
      disabled: notEmpty('model.json.postiionName'),
      presence: true,
    }),
  ],
  'json.isOrganization': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
});

const JsonDefault = EmberObject.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      contactId: null,
      isOrganization: false,
      name: null,
      positionName: null,
      memberOfOrganization: [],
      logoGraphic: [],
      phone: [],
      address: [],
      electronicMailAddress: [],
      externalIdentifier: [],
      onlineResource: [],
      hoursOfService: [],
    });
  },
});

const Contact = Model.extend(Validations, Copyable, {
  pouchContact: belongsTo('pouch-contact', { async: false }),
  /**
   * Contact model
   *
   * @class contact
   * @constructor
   * @extends base
   * @uses Validations,Copyable
   * @mixin Ember.Copyable
   * @module mdeditor
   * @submodule data-models
   */

  contactsService: service('contacts'),
  contacts: hasMany('contact', {
    inverse: 'organizations',
  }),
  organizations: hasMany('contact', {
    inverse: 'contacts',
  }),

  /**
   * The json object for the contact. The data for the contact is stored in this
   * object.
   *
   * @attribute json
   * @type {json}
   * @required
   */
  json: attr('json', {
    defaultValue: function () {
      return JsonDefault.create();
    },
  }),

  /**
   * The timestamp for the record
   *
   * @attribute dateUpdated
   * @type {date}
   * @default new Date()
   * @required
   */
  dateUpdated: attr('date', {
    defaultValue() {
      return new Date();
    },
  }),

  name: alias('json.name'),
  contactId: alias('json.contactId'),

  /**
   * The formatted display string for the contact
   *
   * @property title
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.name, json.positionName
   */
  title: computed('json.{name,positionName,isOrganization}', function () {
    const json = this.json;

    return json.name || (json.isOrganization ? null : json.positionName);
  }),

  /**
   * The type of contact
   *
   * @property type
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.isOrganization
   */
  type: computed('json.isOrganization', function () {
    return this.get('json.isOrganization') ? 'Organization' : 'Individual';
  }),

  /**
   * The display icon for the contact
   *
   * @property icon
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.isOrganization
   */
  icon: computed('json.isOrganization', function () {
    const name = this.get('json.isOrganization');

    return name ? 'users' : 'user';
  }),

  /**
   * The URI of the default logo for the contact.
   *
   * @property defaultLogo
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.logoGraphic.firstObject.fileUri.firstObject.uri
   */
  defaultLogo: computed(
    'json.logoGraphic.firstObject.fileUri.firstObject.uri',
    'defaultOrganization',
    function () {
      let uri = this.get(
        'json.logoGraphic.firstObject.fileUri.firstObject.uri'
      );

      if (uri) {
        return uri;
      }
      let orgId = this.defaultOrganization;

      if (orgId && orgId !== this.get('json.contactId')) {
        let contacts = this.get('contactsService.organizations');
        let org = contacts.findBy('json.contactId', orgId);

        if (org) {
          return get(org, 'defaultLogo');
        }
      }

      return null;
    }
  ),

  /**
   * The id of the default organization for the contact.
   *
   * @property defaultOrganization
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.memberOfOrganization.[]
   */
  defaultOrganization: computed('json.memberOfOrganization.[]', function () {
    const json = this.json;

    let { memberOfOrganization } = json;

    return !isEmpty(memberOfOrganization)
      ? get(memberOfOrganization, '0')
      : null;
  }),

  defaultOrganizationName: computed('defaultOrganization', function () {
    let contacts = this.get('contactsService.organizations');

    let org = contacts.findBy(
      'json.contactId.identifier',
      this.defaultOrganization
    );

    return org ? get(org, 'name') : null;
  }),

  /**
   * The formatted (name or position) and organization(if any) of the contact.
   *
   * @property combinedName
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.name, json.isOrganization
   */
  combinedName: computed(
    'name',
    'json{isOrganization,positionName,memberOfOrganization[]}',
    function () {
      const json = this.json;

      let { name, positionName, isOrganization, memberOfOrganization } = json;

      let orgId = !isEmpty(memberOfOrganization)
        ? get(memberOfOrganization, '0')
        : null;
      let combinedName = name || positionName;
      let orgName;

      if (orgId) {
        let contacts = this.get('contactsService.organizations');
        let org = contacts.findBy('json.contactId', orgId);

        if (org) {
          orgName = get(org, 'name');
        }
      }

      if (orgName && !isOrganization) {
        return (orgName += ': ' + combinedName);
      }

      return combinedName;
    }
  ),

  /**
   * A list of schema errors return by the validator.
   *
   * @property schemaErrors
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires status
   */
  schemaErrors: computed('hasDirtyHash', 'customSchemas.[]', function () {
    let mdjson = this.mdjson;
    let errors = [];
    let result = mdjson.validateContact(this).errors;

    if (result) {
      errors.pushObject({
        title: 'Default Contact Validation',
        errors: result,
      });
    }

    this.customSchemas.forEach((schema) => {
      const validator = schema.validator;

      if (validator.validate(schema.rootSchema, this.cleanJson)) {
        return;
      }

      errors.pushObject({
        title: schema.title,
        errors: validator.errors,
      });
    });

    return errors;
  }),

  /**
   * Create a copy of the record in the store.
   *
   * @method copy
   * @chainable
   * @return {DS.Model}
   */
  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let { name, positionName, isOrganization } = current;
    let newUuid = uuidv4();
    let shortId = newUuid.split('-')[0];

    json.setProperties({
      isOrganization: isOrganization,
      name: name ? `Copy of ${name}` : null,
      positionName: name ? positionName : `Copy of ${positionName}`,
      contactId: newUuid,
    });

    let newContact = this.store.createRecord('contact', {
      json: json,
      id: shortId,
    });

    return newContact;
  },
});

export { Contact as default, JsonDefault };
