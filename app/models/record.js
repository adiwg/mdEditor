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
          "version": "1.0.0"
        },
        "contact": [],
        "metadata": {
          "metadataInfo": {
            "metadataIdentifier": {
              "identifier": UUID.v4(),
              "type": "uuid"
            }
          },
          "resourceInfo": {
            "resourceType": null,
            "citation": {
              "title": "My Record",
              "date": [{
                "date": new Date()
                  .toISOString(),
                "dateType": "creation"
              }]
            },
            "pointOfContact": [],
            "abstract": null,
            "status": null,
            "language": ["eng; USA"]
          }
        }
      });

      return obj;
    }
  }),

  title: Ember.computed('json', function () {
    return this.get('json.metadata.resourceInfo.citation.title');
  }),
  icon: Ember.computed('json.metadata.resourceInfo.resourceType', function () {
    const type = this.get('json.metadata.resourceInfo.resourceType');
    const list = Ember.getOwner(this)
      .lookup('service:icon');

    return list.get(type || 'default');
  })
});
