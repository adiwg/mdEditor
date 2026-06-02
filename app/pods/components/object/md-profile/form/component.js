import Component from '@glimmer/component';

export default class MdProfileFormComponent extends Component {
  get record() {
    return this.args.record;
  }
}
