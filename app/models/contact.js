import Ember from 'ember';
import DS from 'ember-data';
import uuidV4 from 'npm:uuid/v4';
import Validator from 'npm:validator';

export default DS.Model.extend(Ember.Copyable, {
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

  /**
   * The json object for the contact. The data for the contact is stored in this
   * object.
   *
   * @attribute json
   * @type {json}
   * @required
   */
  json: DS.attr('json', {
    defaultValue: function () {
      let obj = Ember.Object.create({
        'contactId': uuidV4(),
        'isOrganization': false,
        'name': null,
        'positionName': null,
        'memberOfOrganization': [],
        'logoGraphic': [],
        'phone': [],
        'address': [],
        'electronicMailAddress': [],
        'onlineResource': [],
        'hoursOfService': [],
        'contactInstructions': null,
        'contactType': null
      });

      return obj;
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

  /**
   * The formatted display string for the contact
   *
   * @property title
   * @type {String}
   * @readOnly
   * @category computed
   * @requires json.name, json.positionName
   */
  title: Ember.computed('json.name', 'json.positionName',
    function () {
      const json = this.get('json');

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
  type: Ember.computed('json.isOrganization',
    function () {
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
  icon: Ember.computed('json.isOrganization',
    function () {
      const name = this.get('json.isOrganization');

      return name ? 'users' : 'user';
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
  combinedName: Ember.computed('json.name', 'json.isOrganization',
    'json.positionName',
    function () {
      const json = this.get('json');

      let {
        name,
        positionName,
        isOrganization,
        memberOfOrganization
      } = json;

      let orgId = memberOfOrganization.length ? memberOfOrganization[0] :
        null;
      let combinedName = name || positionName;
      let orgName;

      if(orgId) {
        this.get('store')
          .findRecord('contact', orgId)
          .then(function (org) {
            orgName = org.name;
          });
      }

      if(orgName && !isOrganization) {
        return combinedName += ": " + combinedName;
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
  shortId: Ember.computed('json.contactId', function () {
    const contactId = this.get('json.contactId');
    if(contactId && Validator.isUUID(contactId)) {
      return contactId.substring(0, 7) + '...';
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
    let current = this.get('json');
    let json = Ember.Object.create(JSON.parse(JSON.stringify(current)));
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
