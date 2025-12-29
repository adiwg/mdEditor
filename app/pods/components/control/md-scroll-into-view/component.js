import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import scrollIntoView from 'scroll-into-view-if-needed';
// import InViewportMixin from 'ember-in-viewport';

@classic
@classNames('md-scroll-into-view')
export default class MdScrollIntoView extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);

    let el = document.getElementById(this.elementId);
    let boundary = document.querySelector(`#${this.elementId}`).closest(
      `.md-scroll-into-view:not(#${this.elementId})`);

    scrollIntoView(el, {
      block: boundary ? 'center': 'nearest',
      behavior: 'smooth',
      //boundary: boundary
    });
  }
}
