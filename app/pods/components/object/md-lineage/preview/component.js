import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class PreviewComponent extends Component {
  showMore = false;
  limit = 1;

  get showLimit() {
    return this.showMore ? 100: this.limit;
  }
}
