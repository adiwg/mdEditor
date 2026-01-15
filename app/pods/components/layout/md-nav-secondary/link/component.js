import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { scheduleOnce } from '@ember/runloop';
import { measure } from "liquid-fire/components/liquid-measured";

@classic
export default class LinkComponent extends Component {
  tagName = 'li';

  didInsertElement() {
    super.didInsertElement(...arguments);
    let width = measure(this.element).width;

    if(width === this.link.width || this.link.isOverflow) return;

    scheduleOnce('afterRender', () => {
      //next(this, () => {
      let sliced = this.nav.links.slice(0, this.index + 1);
      this.link.width = width;

      this.link.set('linkWidth', sliced.reduce((a, b) => {
        return a + b.width;
      }, this.nav.navPadding));
      //});
    });
  }
}
