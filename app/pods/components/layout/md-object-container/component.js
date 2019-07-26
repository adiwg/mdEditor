import Component from '@ember/component';
import { computed } from '@ember/object';
import { and } from '@ember/object/computed';

export default Component.extend({
  classNames: ['md-object-container'],
  classNameBindings: ['even'],
  attributeBindings: ['data-spy'],
  collapsible:true,
  collapseProperty:true,

  isCollapsible: and('collapsible', 'collapseProperty'),
  'data-spy': computed('title', function () {
    return `${this.title} ${this.index}`;
  }),

  even: computed('index', function() {
    return !!(this.index % 2);
  }),
});
