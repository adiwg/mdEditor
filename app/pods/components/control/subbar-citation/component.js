import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class SubbarCitation extends Component {
  selectResource() {
    return this;
  }
}
