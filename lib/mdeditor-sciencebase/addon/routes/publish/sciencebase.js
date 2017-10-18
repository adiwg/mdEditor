import Ember from 'ember';
import config from '../../utils/config';

const {
  Route
} = Ember;

export default Route.extend({
  breadCrumb: {
    title: 'ScienceBase'
  },

  model: function() {
    return config;
  }
});
