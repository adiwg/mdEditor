import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@classNames('md-row-body')
export default class RowBody extends Component {
  @service
  spotlight;

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
