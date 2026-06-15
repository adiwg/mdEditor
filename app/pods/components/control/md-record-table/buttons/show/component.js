import Component from '@glimmer/component';

export default class ShowComponent extends Component {
  get record() {
    return this.args.record;
  }

  get routeName() {
    const record = this.record;
    const modelName = record?.constructor?.modelName;

    return modelName ? `${modelName}.show` : null;
  }
}
