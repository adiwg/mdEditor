import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class MainRoute extends Route.extend(ScrollTo) {
  model() {
    return this.settings.get('data');
  }
}