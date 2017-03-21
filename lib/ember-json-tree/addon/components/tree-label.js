import Ember from 'ember';
import layout from '../templates/components/tree-label';

const {
  Component
} = Ember;

export default Component.extend({
  /**
   * @class tree-label
   * @submodule tree-view
   */

  layout,
  tagName: 'span',
  classNames: ['tree-label'],
  highlight: '',

  label: Ember.computed('model.label', 'path', function () {
    let label = this.get('model.label');
    let path = this.get('path');
    let hilite = this.get('highlight');

    if(hilite) {
      let regex = new RegExp(hilite + '|' + hilite.toUpperCase() +
        '|' + Ember.String.capitalize(hilite), 'g');
      let hilited = hilite ? label
        .replace(regex, `<b>${'$&'}</b>`) : this.get('model.label');

      label = `<span class="text-info">${hilited}</span>`;
    }

    if(path && path.length) {
      if(Ember.isArray(path)) {
        let pref = path.reduce(function (acc, cur, idx, path) {
          if(idx < path.length - 1) {
            acc = idx > 0 ? `${acc} &gt; ${cur.label}` : cur.label;
          }

          return acc;
        }, '');

        return Ember.String.htmlSafe(pref + ' &gt; ' + label);
      }
    }

    return Ember.String.htmlSafe(label);
  })
});
