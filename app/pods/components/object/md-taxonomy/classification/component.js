import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdTaxonomyClassificationComponent extends Component {
  tagName = 'ul';
  classNames = ['list-group', 'md-classification'];
  dragging = null;
  preview = false;
}
