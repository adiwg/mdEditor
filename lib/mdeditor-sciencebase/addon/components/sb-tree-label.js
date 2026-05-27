import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/sb-tree-label';

@classic
export default class SbTreeLabelComponent extends Component {
  layout = layout;
  tagName = 'span';
  classNames = ['tree-cell'];

  mouseEnter() {
    if (this.get('model._record._dropped')) {
      this.set('model._record._dropped', false);
    }
  }

  @action
  clicked(event) {
    event.stopPropagation();
    window.open(event.currentTarget.href, 'ScienceBaseItem');
    return false;
  }
}
