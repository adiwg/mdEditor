import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('property')
export default class Preview extends Component {
  init() {
    super.init(...arguments);

    this.tagName = this.isTable ? 'td' : 'div';
  }
}
