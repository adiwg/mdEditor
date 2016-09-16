import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  json: DS.attr('json', {
    defaultValue() {
      const obj = {
        "dictionaryInfo": {
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
  
  title: Ember.computed('json.dictionaryInfo.citation.title', function () {
    return this.get('json.dictionaryInfo.citation.title');
  }),

  icon: 'book'
});
