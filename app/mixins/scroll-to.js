import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    scrollTo: true
  },
  setScrollTo(scrollTo) {
    this.controller.set('scrollTo', scrollTo || '');
  },
  actions: {
    setScrollTo(scrollTo) {
      this.setScrollTo(scrollTo);
    }
  }
});
