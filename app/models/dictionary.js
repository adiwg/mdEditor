import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  json: DS.attr('json', {
    defaultValue() {
      const obj = {
        "dictionaryInfo": {
          "citation": {
            "title": "My Dictionary",
            "date": [{
              "date": new Date()
                .toISOString(),
              "dateType": "creation"
            }]
          },
          "description": "Data dictionary.",
          "resourceType": null
        },
        "domain": [],
        "entity": []
      };

      return obj;
    }
  }),
  title: Ember.computed('json.dictionaryInfo.citation.title', function () {
    return this.get('json.dictionaryInfo.citation.title');
  }),
  icon: 'book'
});
