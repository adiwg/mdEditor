import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { scheduleOnce } from '@ember/runloop';
import { measure } from "liquid-fire/components/liquid-measured";

@classic
export default class LinkComponent extends Component {
  tagName = 'li';

  didInsertElement() {
    super.didInsertElement(...arguments);

    scheduleOnce('afterRender', () => {
      try {
        if (!this.element) return;

        let measured = measure(this.element);
        if (!measured) return;

        let width = measured.width;

        if (width === this.link?.width || this.link?.isOverflow) return;

        let sliced = this.nav?.links?.slice(0, this.index + 1);
        if (!sliced) return;

        this.link.width = width;

        this.link.set('linkWidth', sliced.reduce((a, b) => {
          return a + (b.width || 0);
        }, this.nav?.navPadding || 0));
      } catch (e) {
        // Element measurement failed, likely due to timing issues during render
        // This is non-critical functionality for nav width calculation
      }
    });
  }
}
