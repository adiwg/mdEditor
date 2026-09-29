import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action, set } from '@ember/object';
import { once } from '@ember/runloop';
import { v4 as uuidV4 } from 'uuid';

@classic
export default class MdDataqualityComponent extends Component {
  tagName = 'form';

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;

    once(function () {
      set(model, 'scope', model.scope ?? {});
      set(model, 'systemIdentifier', model.systemIdentifier ?? { uid: uuidV4() });
      set(model, 'report', model.report ?? []);
    });
  }

  @action
  addStandaloneQualityReport() {
    set(this.model, 'standaloneQualityReport', { abstract: '' });
  }

  @action
  deleteStandaloneQualityReport() {
    set(this.model, 'standaloneQualityReport', undefined);
  }
}
