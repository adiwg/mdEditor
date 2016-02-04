import Ember from 'ember';
import DS from 'ember-data';
import UUID from "npm:node-uuid";

export default DS.Model.extend({
  json: DS.attr('json', {
    defaultValue: function () {
      var obj = {
        "contactId": UUID.v4(),
        "organizationName": null,
        "individualName": "New Contact",
        "positionName": null,
        "phoneBook": [],
        "address": {},
        "onlineResource": [],
        "contactInstructions": null
      };
      return obj;
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
    })
});
