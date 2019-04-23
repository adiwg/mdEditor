import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    addKeyword(model, obj) {
      let k = obj ? obj : {};

      model.pushObject(k);
    },
    deleteKeyword(model, obj) {
      if(typeof obj === 'number') {
        model.removeAt(obj);
      } else {
        model.removeObject(obj);
      }
    },
    // hideThesaurus(el) {
    //   $(el).closest('.md-keywords-container').toggleClass('hide-thesaurus');
    // },
    toList() {
      let me = this;

      me.transitionTo(me.get('routeName'))
        .then(function() {
          me.setupController();
        });
    }
  }
});
