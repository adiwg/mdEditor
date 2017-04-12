import Ember from 'ember';
import HashPoll from 'mdeditor/mixins/hash-poll';

const {
  inject,
  Route,
  get,
  copy
} = Ember;

export default Route.extend(HashPoll, {
  flashMessages: inject.service(),

  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  },

  actions: {
    saveContact: function () {
      let model = this.currentModel;

      model
        .save()
        .then(() => {
          //this.refresh();
          //this.setModelHash();
          get(this, 'flashMessages')
            .success(`Saved Contact: ${model.get('title')}`);

          //this.transitionTo('contacts');
        });
    },

    destroyContact: function () {
      let model = this.currentModel;
      model
        .destroyRecord()
        .then(() => {
          get(this, 'flashMessages')
            .success(`Deleted Contact: ${model.get('title')}`);
          this.replaceWith('contacts');
        });
    },

    cancelContact: function () {
      let model = this.currentModel;

      //this.set('checkHash', false);
      model
        .reload()
        .then(() => {
          //this.set('checkHash', true);
          //this.didUpdate(model);
          get(this, 'flashMessages')
            .warning(
              `Cancelled changes to Contact: ${model.get('title')}`);
        });
    },

    copyContact: function () {

      get(this, 'flashMessages')
        .success(`Copied Contact: ${this.currentModel.get('title')}`);
      this.transitionTo('contact.new.id', copy(this.currentModel));
    }
  }
});
