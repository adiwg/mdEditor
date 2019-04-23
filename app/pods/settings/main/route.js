import Route from '@ember/routing/route';
import ScrollTo from 'mdeditor/mixins/scroll-to';

export default Route.extend(ScrollTo, {
  model() {
    // this.get('store').findAll('settings').then(function(settings) {
    //   return settings.get("firstObject");
    // });
    return this.settings.get('data');
  }
});
