import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { set } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { measure } from "liquid-fire/utils/animate";

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

        set(this.link, 'width', width);

        this.link.set('linkWidth', sliced.reduce((a, b) => {
          return a + (b.width || 0);
        }, this.nav?.navPadding || 0));
      } catch (e) {
        // Non-critical: nav width measurement can fail on render timing.
      }
    });
  }
}
