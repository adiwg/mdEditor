import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * A simple replacement for liquid-if that uses CSS transitions
 * Usage: {{#animated-if condition}}content{{/animated-if}}
 */
export default class AnimatedIfComponent extends Component {
  @tracked isVisible = false;
  @tracked shouldRender = false;

  constructor() {
    super(...arguments);
    this.isVisible = this.args.condition;
    this.shouldRender = this.args.condition;
  }

  @action
  updateVisibility() {
    if (this.args.condition !== this.isVisible) {
      if (this.args.condition) {
        // Show: render first, then make visible
        this.shouldRender = true;
        requestAnimationFrame(() => {
          this.isVisible = true;
        });
      } else {
        // Hide: make invisible first, then stop rendering after transition
        this.isVisible = false;
        setTimeout(() => {
          if (!this.isVisible) {
            this.shouldRender = false;
          }
        }, 300); // Match CSS transition duration
      }
    }
  }

  get shouldShow() {
    this.updateVisibility();
    return this.shouldRender;
  }

  get visibilityClass() {
    return this.isVisible ? 'animated-if--visible' : 'animated-if--hidden';
  }
}
