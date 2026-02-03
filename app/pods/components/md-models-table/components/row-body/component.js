import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  inject as service
} from '@ember/service';

@classic
export default class RowBodyComponent extends Component {
  classNames = ['md-row-body'];
  @service spotlight;

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.spotlight.setTarget(this.elementId, this.collapse, this);
    this.element.classList.add('fade-in-fast');
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    this.spotlight.close();
  }

  collapse() {
    this.element.classList.add('fade-out-fast');
    this.collapseRow(this.index, this.record);
  }
}
