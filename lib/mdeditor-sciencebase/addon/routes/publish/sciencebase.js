import Route from '@ember/routing/route';
import config from '../../utils/config';

export default class SciencebaseRoute extends Route {
  breadCrumb = {
    title: 'ScienceBase'
  };

  model() {
    return config;
  }
}
