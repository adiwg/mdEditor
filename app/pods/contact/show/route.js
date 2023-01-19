import Route from '@ember/routing/route';
import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  flashMessages: service(),

  model: function(params) {
    let rec= this.store.peekRecord('contact', params.contact_id);
    return rec;
  },

  actions: {
    saveContact: function() {
      let model = this.currentRouteModel();

      model
        .save()
        .then(() => {
          //this.refresh();
          //this.setModelHash();
          this.flashMessages
            .success(`Saved Contact: ${model.get('title')}`);

          //this.transitionTo('contacts');
        });
    },

    destroyContact: function() {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          this.flashMessages
            .success(`Deleted Contact: ${model.get('title')}`);
          this.replaceWith('contacts');
        });
    },

    cancelContact: function() {
      let model = this.currentRouteModel();
      let message = `Cancelled changes to Contact: ${model.get('title')}`;

      if (this.get('settings.data.autoSave')) {
        let json = model.get('jsonRevert');

        if (json) {
          model.set('json', JSON.parse(json));
          this.flashMessages.warning(message);
        }

        return;
      }

      model
        .reload()
        .then(() => {
          this.flashMessages.warning(message);
        });
    },

    copyContact: function() {

      this.flashMessages
        .success(`Copied Contact: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('contact.new.id', copy(this.currentRouteModel()));
    }
  }
});
