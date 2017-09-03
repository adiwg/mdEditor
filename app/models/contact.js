import Ember from 'ember';
import DS from 'ember-data';
import uuidV4 from 'npm:uuid/v4';
import Validator from 'npm:validator';
import Model from 'mdeditor/models/base';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const {
  Copyable,
  computed,
  isEmpty,
  get
} = Ember;

const Validations = buildValidations({
  'json.contactId': validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  'json.name': [
    validator('format', {
      regex: /^\s+$/,
      inverse: true,
      isWarning: true,
      message: "Name should not be only white-space."
    }),
    validator('presence', {
      disabled: computed.notEmpty('model.json.positionName'),
      presence: true
    })
  ],
  'json.positionName': [
    validator('format', {
      regex: /^\s+$/,
      inverse: true,
      isWarning: true,
      message: "Position Name should not be only white-space."
    }),
    validator('presence', {
      disabled: computed.notEmpty('model.json.name'),
      presence: true
    })
  ],
  'json.isOrganization': validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

const JsonDefault = Ember.Object.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      'contactId': uuidV4(),
      'isOrganization': false,
      'name': null,
      //'positionName': null,
      'memberOfOrganization': [],
      'logoGraphic': [],
      'phone': [],
      'address': [],
      'electronicMailAddress': [],
      'onlineResource': [],
      'hoursOfService': []
      //'contactInstructions': null,
      //'contactType': null;
    });
  }
});

const Contact = Model.extend(Validations, Copyable, {
  /**
   * Contact model
   *
   * @class contact
   * @constructor
   * @extends DS.Model
   * @mixin Ember.Copyable
   * @module mdeditor
   * @submodule data-models
   */

  contacts: DS.hasMany('contact', {
    inverse: 'organizations'
  }),
  organizations: DS.hasMany('contact', {
    inverse: 'contacts'
  }),

  /**
   * The json object for the contact. The data for the contact is stored in this
   * object.
   *
   * @attribute json
   * @type {json}
   * @required
   */
  json: DS.attr('json', {
    defaultValue: function() {
      return JsonDefault.create();
    }
  }),

  /**
   * The timestamp for the record
   *
   * @attribute dateUpdated
   * @type {date}
   * @default new Date()
   * @required
   */
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  name: computed.alias('json.name'),
  contactId: Ember.computed.alias('json.contactId'),

  /**
   * The formatted display string for the contact
   *
   * @property title
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.name, json.positionName
   */
  title: computed('json.name', 'json.positionName',
    function() {
      const json = this.get('json');

      return json.name || (json.isOrganization ? null : json.positionName);
    }),

  // /**
  //  * The formatted display string for the contact
  //  *
  //  * @property title
  //  * @type {String}
  //  * @readOnly
  //  * @category computed
  //  * @requires json.name, json.positionName
  //  */
  // updateMembers: Ember.observer('json.memberOfOrganization.[]',
  //   function () {
  //     //const me = this;
  //     const json = this.get('json');
  //     const value = json.memberOfOrganization;
  //
  //     let store = this.get('store');
  //     let contacts = store.peekAll('contact');
  //     let organizations = this.get('organizations')
  //       .clear();
  //
  //     value.forEach(function (id) {
  //       let rec = contacts.findBy('json.contactId', id);
  //
  //       if(rec) {
  //         organizations.pushObject(rec);
  //       }
  //       //rec.get('contacts').pushObject(me);
  //     });
  //
  //   }),

  /**
   * The type of contact
   *
   * @property type
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.isOrganization
   */
  type: computed('json.isOrganization',
    function() {
      return this.get('json.isOrganization') ? 'Organization' :
        'Individual';
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
  icon: computed('json.isOrganization',
    function() {
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
    function() {
      let uri = this.get(
        'json.logoGraphic.firstObject.fileUri.firstObject.uri');

      if(uri) {
        return uri;
      }
      let orgId = get(this, 'defaultOrganization');

      if(orgId) {
        let contacts = this.get('store').peekAll('contact');
        let org = contacts.findBy('json.contactId', orgId);

        if(org) {
          return get(org, 'defaultLogo');
        }
      }

      return null;
    }),

  /**
   * The id of the default organization for the contact.
   *
   * @property defaultOrganization
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.memberOfOrganization.[]
   */
  defaultOrganization: computed('json.memberOfOrganization.[]',
    function() {
      const json = this.get('json');

      let {
        memberOfOrganization
      } = json;

      return !isEmpty(memberOfOrganization) ?
        memberOfOrganization[0] :
        null;
    }),

  defaultOrganizationName: computed('defaultOrganization',
    function() {
      let contacts = this.get('store').peekAll('contact');

      let org = contacts.findBy('json.contactId', get(this,
        'defaultOrganization'));

      return get(org, 'name');

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
  combinedName: computed('name', 'json.isOrganization',
    'json.positionName', 'json.memberOfOrganization[]',
    function() {
      const json = this.get('json');

      let {
        name,
        positionName,
        isOrganization,
        memberOfOrganization
      } = json;

      let orgId = !isEmpty(memberOfOrganization) ?
        memberOfOrganization[0] :
        null;
      let combinedName = name || positionName;
      let orgName;

      if(orgId) {
        let contacts = this.get('store').peekAll('contact');
        let org = contacts.findBy('json.contactId', orgId);

        if(org) {
          orgName = get(org, 'name');
        }
      }

      if(orgName && !isOrganization) {
        return orgName += ": " + combinedName;
      }

      return combinedName;
    }),

  /**
   * The trimmed varsion of the contactId.
   *
   * @property shortId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.contactId
   */
  shortId: Ember.computed('json.contactId', function() {
    const contactId = this.get('json.contactId');
    if(contactId && Validator.isUUID(contactId)) {
      let index = contactId.indexOf('-');

      return contactId.substring(0, index);
    }

    return contactId;
  }),

  /**
   * Create a copy of the record in the store.
   *
   * @method copy
   * @chainable
   * @return {DS.Model}
   */
  copy() {
    let current = this.get('cleanJson');
    let json = Ember.Object.create(current);
    let {
      name,
      positionName,
      isOrganization
    } = current;

    json.setProperties({
      isOrganization: isOrganization,
      name: name ? `Copy of ${name}` : null,
      positionName: name ? positionName : `Copy of ${positionName}`,
      contactId: uuidV4()
    });

    return this.store.createRecord('contact', {
      json: json
    });
  }
});

export {
  Contact as
  default,
  JsonDefault
};
