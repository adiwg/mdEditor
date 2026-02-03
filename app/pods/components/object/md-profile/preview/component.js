import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class PreviewComponent extends Component {
  classNameBindings = ['textMuted'];
  textMuted = true;

  get config() {
    return this.record?.config || this.record;
  }
}
