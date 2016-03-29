import Ember from 'ember';
import DS from 'ember-data';
import UUID from "npm:node-uuid";

export default DS.Model.extend({
  profile: DS.attr('string', {
    defaultValue: 'full'
  }),
  json: DS.attr('json', {
    defaultValue() {
      const obj = Ember.Object.create({
        "version": {
          "name": "mdJson",
          "version": "1.1.0"
        },
        "contact": [],
        "metadata": {
          "metadataInfo": {
            "metadataIdentifier": {
              "identifier": UUID.v4(),
              "type": ""
            }
          },
          "resourceInfo": {
            "resourceType": null,
            "citation": {
              "title": "New Record",
              "date": []
            },
            "pointOfContact": [],
            "abstract": null,
            "status": null,
            "language": ["eng; USA"]
          }
        },
        "dataDictionary": []
      });

      return obj;
    }
  }),

  title: Ember.computed('json.metadata.resourceInfo.citation.title', function () {
    return this.get('json.metadata.resourceInfo.citation.title');
  }),

  icon: Ember.computed('json.metadata.resourceInfo.resourceType', function () {
    const type = this.get('json.metadata.resourceInfo.resourceType');
    const list = Ember.getOwner(this)
      .lookup('service:icon');

    return type ? list.get(type) || list.get('default') : list.get('defaultFile');
  })
});
