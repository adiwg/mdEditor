import Component from '@ember/component';
import layout from '../templates/components/sb-tree-label';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['tree-cell'],
  mouseEnter() {
    if(this.get('model._record._dropped')) {
      this.set('model._record._dropped', false);
    }
  },
  actions: {
    clicked(event) {
      event.stopPropagation();

      window.open(event.currentTarget.href, 'ScienceBaseItem');
      return false;
    }
  }
});
