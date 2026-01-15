import Component from '@ember/component';

export default class PreviewComponent extends Component {
  classNameBindings = ['textMuted'];
  textMuted = true;

  get config() {
    return this.record?.config || this.record;
  }
}
