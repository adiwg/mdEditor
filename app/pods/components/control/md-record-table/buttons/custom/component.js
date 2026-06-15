import Component from '@glimmer/component';

export default class CustomButtonComponent extends Component {
  get buttonConfig() {
    const column = this.args.column;

    return column?.buttonConfig ?? column?.originalDefinition?.buttonConfig;
  }
}
