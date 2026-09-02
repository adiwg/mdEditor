import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdHelpComponent extends Component {
  classNames = ['md-help-sidebar'];
  tagName = 'section';
}
