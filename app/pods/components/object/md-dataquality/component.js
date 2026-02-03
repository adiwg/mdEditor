import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { once } from '@ember/runloop';
import { v4 as uuidV4 } from 'uuid';

@classic
export default class MdDataqualityComponent extends Component {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function () {
      model.scope = model.scope ?? {};
      model.systemIdentifier = model.systemIdentifier ?? { uid: uuidV4() };
      model.report = model.report ?? [];
    });
  }

  @action
  addStandaloneQualityReport() {
    this.model.standaloneQualityReport = { abstract: '' };
  }

  @action
  deleteStandaloneQualityReport() {
    this.model.standaloneQualityReport = undefined;
  }
}
