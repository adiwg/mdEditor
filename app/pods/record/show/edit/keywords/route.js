import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.A([Ember.Object.create({
      id: 0,
      name: 'Root',
      isExpanded: true,
      isSelected: false,
      isVisible: true,
      children: [{
        id: 1,
        name: 'First Child',
        isExpanded: true,
        isSelected: false,
        isVisible: true,
        children: []
      }, {
        id: 2,
        name: 'Second Child',
        isExpanded: false,
        isSelected: false,
        isVisible: true,
        children: [{
          id: 3,
          name: 'First Grand Child',
          isExpanded: true,
          isSelected: true,
          isVisible: true,
          children: []
        }]
      }]
    })]);
  }
});
