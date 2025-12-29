import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class Preview extends Component {
  showMore = false;
  limit = 1;

  @computed('limit', 'showMore')
  get showLimit() {
    return this.showMore ? 100: this.limit;
  }
}
