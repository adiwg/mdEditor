import Route from '@ember/routing/route';
import config from '../../utils/config';

export default Route.extend({
  breadCrumb: {
    title: 'ScienceBase'
  },

  model: function() {
    return config;
  }
});
