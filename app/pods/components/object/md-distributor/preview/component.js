import Component from '@ember/component';
import classic from 'ember-classic-decorator';

@classic
export default class PreviewComponent extends Component {
  classNames = ['property'];

  constructor() {
    super(...arguments);

    this.tagName = this.isTable ? 'td' : 'div';
  }
}
