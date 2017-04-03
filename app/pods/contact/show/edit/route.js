import Ember from 'ember';
import ModelHash from 'mdeditor/mixins/model-hash';

const {
  inject,
  Route,
  get,
  set,
  copy
} = Ember;

export default Route.extend( {
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
          let target = model.get('json');

          set(this, 'modelHash', this.hashObject(target));
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
      model
        .reload()
        .then(() => {
          this.refresh();
          get(this, 'flashMessages')
            .warning(
              `Cancelled changes to Contact: ${model.get('title')}`);
          //this.transitionTo('contacts');
        });
    },

    copyContact: function () {

      get(this, 'flashMessages')
        .success(`Copied Contact: ${this.currentModel.get('title')}`);
      this.transitionTo('contact.new.id', copy(this.currentModel));
    }

    // updateRelations(contact, value) {
    //   console.info(arguments);
    //   let organizations = contact.get('organizations')
    //     .clear();
    //   let store = this.get('store');
    //
    //   if(isArray(value)) {
    //     value.forEach(function (id) {
    //       store.queryRecord('contact', {
    //         contactId: id
    //       }).then(function(rec){
    //         organizations.pushObject(rec);
    //       });
    //     });
    //   }
    // }
  }
});
