import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { measure } from 'mdeditor/utils/measure';

@classic
@tagName('li')
export default class Link extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    let width = measure(this.element).width;

    if (width === this.link.width || this.link.isOverflow) return;

    scheduleOnce('afterRender', () => {
      //next(this, () => {
      let sliced = this.nav.links.slice(0, this.index + 1);
      this.set('link.width', width);

      this.link.set(
        'linkWidth',
        sliced.reduce((a, b) => {
          return a + b.width;
        }, this.nav.navPadding)
      );
      //});
    });
  }
}
