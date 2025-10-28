/**
 * Simple replacement component for {{#liquid-if}}
 * Provides basic conditional rendering without animations for now
 * Usage: {{#simple-if condition}}content{{/simple-if}}
 */
import Component from '@glimmer/component';

export default class SimpleIfComponent extends Component {
  get shouldShow() {
    return this.args.condition;
  }
}
