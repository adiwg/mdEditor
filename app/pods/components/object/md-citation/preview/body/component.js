import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class Body extends Component {
  init() {
    super.init(...arguments);

    this.profilePath = this.profilePath || 'preview';
  }
}
