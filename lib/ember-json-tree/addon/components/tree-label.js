import { htmlSafe } from '@ember/template';
import { isArray } from '@ember/array';
import { capitalize } from '@ember/string';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/tree-label';

export default Component.extend({
  /**
   * @class tree-label
   * @submodule tree-view
   */

  layout,
  tagName: 'span',
  classNames: ['tree-label tree-cell'],
  highlight: '',

  label: computed('model.label', 'path', function () {
    let label = this.get('model.label');
    let path = this.get('path');
    let hilite = this.get('highlight');

    if(hilite) {
      let regex = new RegExp(hilite + '|' + hilite.toUpperCase() +
        '|' + capitalize(hilite), 'g');
      let hilited = hilite ? label
        .replace(regex, `<b>${'$&'}</b>`) : this.get('model.label');

      label = `<span class="text-info">${hilited}</span>`;
    }

    if(path && path.length) {
      if(isArray(path)) {
        let pref = path.reduce(function (acc, cur, idx, path) {
          if(idx < path.length - 1) {
            acc = idx > 0 ? `${acc} &gt; ${cur.label}` : cur.label;
          }

          return acc;
        }, '');

        let fullLabel = pref ? `${pref} &gt; ${label}` : label;

        return htmlSafe(fullLabel);
      }
    }

    return htmlSafe(label);
  })
});
