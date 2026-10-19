import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class SubbarCitationComponent extends Component {
  selectResource(){
    return this;
  }
}
