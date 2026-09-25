import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import scrollIntoView from 'scroll-into-view-if-needed';
// import InViewportMixin from 'ember-in-viewport';

@classic
export default class MdScrollIntoViewComponent extends Component {
  classNames = ['md-scroll-into-view'];

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
