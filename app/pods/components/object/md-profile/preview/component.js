import Component from '@glimmer/component';

export default class MdProfilePreviewComponent extends Component {
  get config() {
    return this.args.record?.config || this.args.record;
  }

  get textMutedClass() {
    return this.args.textMuted !== false ? 'text-muted' : '';
  }
}
