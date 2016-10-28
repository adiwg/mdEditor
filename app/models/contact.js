import Ember from 'ember';
import DS from 'ember-data';
import UUID from 'npm:node-uuid';
import Validator from 'npm:validator';

export default DS.Model.extend(Ember.Copyable, {
  json: DS.attr('json', {
    defaultValue: function () {
      let obj = Ember.Object.create({
        'contactId': UUID.v4(),
        'organizationName': null,
        'individualName': null,
        'positionName': null,
        'phoneBook': [],
        'address': {},
        'onlineResource': [],
        'contactInstructions': null
      });

      return obj;
    }
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  title: Ember.computed('json.individualName', 'json.organizationName',
    function () {
      const json = this.get('json');

      return json.individualName || json.organizationName;
    }),

  icon: Ember.computed('json.individualName', 'json.organizationName',
    function () {
      const name = this.get('json.individualName');

      return name ? 'user' : 'users';
    }),

  combinedName: Ember.computed('json.individualName',
    'json.organizationName',
    function () {
      const json = this.get('json');

      let indName = json.individualName;
      let orgName = json.organizationName;
      let combinedName = orgName;

      if(indName && orgName) {
        return combinedName += ": " + indName;
      }

      if(indName) {
        return combinedName = indName;
      }

      return combinedName;
    }),

  shortId: Ember.computed('json.contactId', function () {
    const contactId = this.get('json.contactId');
    if(contactId && Validator.isUUID(contactId)) {
      return contactId.substring(0, 7) + '...';
    }

    return contactId;
  }),

  copy() {
    let current = this.get('json');
    let json = Ember.Object.create(JSON.parse(JSON.stringify(current)));
    let indName = current.individualName;
    let orgName = current.organizationName;

    json.setProperties({
      organizationName: indName ? orgName : `Copy of ${orgName}`,
      individualName: indName ? `Copy of ${indName}` : null,
      contactId: UUID.v4()
    });

    return this.store.createRecord('contact', {
      json: json
    });
  }
});
