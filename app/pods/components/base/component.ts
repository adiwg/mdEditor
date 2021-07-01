import Component from '@glimmer/component';

interface BaseArgs {}

export default class Base extends Component<BaseArgs> {
  constructor(args: Record<string, unknown>) {
    super(owner, args);
  }
}
