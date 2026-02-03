import { inject as service } from '@ember/service';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class MdFooterComponent extends Component {
  tagName = 'footer';
  classNames = ['md-footer'];

  @service settings;
}
