import Ember from 'ember';
const {
  Route,
  get,
  inject
} = Ember;

export default Route.extend({
  clean: inject.service('cleaner'),

  actions: {
    translate() {
      let model = this.currentRouteModel();
      let json = JSON.parse(JSON.stringify(this.get('clean').clean(model.get('json'))));
      let contacts = this.store.peekAll('contact').mapBy('json');

      json.contact = contacts;

      console.info(JSON.stringify(json));

      Ember.$.ajax("http://mdtranslator.adiwg.org/api/v2/translator", {
        type: 'POST',
        data: {
          file: JSON.stringify(json),
          reader: 'mdJson',
          writer: 'iso19115_2',
          showAllTags: false,
          validate: 'normal',
          format: 'json'
        },
        context: this
      }).then(function(response) {
        //this.sendAction("select", response);
        console.info(response);
        if (response.success) {
          Ember.$('.md-translator-preview textarea').val(response.data);
        } else {
          get(this, 'flashMessages').danger('Translation error!');
        }
      });

    }
  }
});
