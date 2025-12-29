import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('ul')
@classNames('list-group', 'md-classification')
export default class Classification extends Component {
  dragging = null;
  preview = false;
}
