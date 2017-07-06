import Ember from 'ember';
import DS from 'ember-data';
import Model from 'mdeditor/models/base';


export default Model.extend(Ember.Copyable, {
  json: DS.attr('json', {
    defaultValue() {
      const obj = {
        "dataDictionary": {
          "citation": {
            "title": null,
            "date": [{
              "date": new Date()
                .toISOString(),
              "dateType": "creation"
            }]
          },
          "description": null,
          "resourceType": null
        },
        "domain": [],
        "entity": []
      };

      return obj;
    }
  }),
  dateUpdated: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),

  title: Ember.computed('json.dataDictionary.citation.title', function () {
    return this.get('json.dataDictionary.citation.title');
  }),

  icon: 'book',

  copy() {
    let current = this.get('cleanJson');
    let json = Ember.Object.create(current);
    let name = current.dataDictionary.citation.title;

    json.set('dataDictionary.citation.title', `Copy of ${name}`);

    return this.store.createRecord('dictionary', {
      json: json
    });
  }
});
