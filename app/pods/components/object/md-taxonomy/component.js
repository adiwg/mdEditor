import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  title: computed('model.taxonomicSystem.0.citation.title', function() {
    let title = this.get('model.taxonomicSystem.0.citation.title');
    let index = this.get('index');

    return `Collection #${index}` + (title ? `: ${title}`: '');
  }),
});
