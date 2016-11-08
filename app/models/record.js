import Ember from 'ember';
import DS from 'ember-data';
import UUID from "npm:node-uuid";

export default DS.Model.extend(Ember.Copyable, {
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
              "title": null,
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
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
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
  }),

  copy() {
    let current = this.get('json');
    let json = Ember.Object.create(JSON.parse(JSON.stringify(current)));
    let name = current.metadata.resourceInfo.citation.title;

    json.set('metadata.resourceInfo.citation.title', `Copy of ${name}`);

    return this.store.createRecord('record', {
      json: json
    });
  }
});
