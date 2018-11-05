import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  tagName: 'footer',
  classNames: ['md-footer'],

  settings: inject.service()
});
