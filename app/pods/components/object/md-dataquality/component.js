import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { getWithDefault, get, set, action } from '@ember/object';
import { once } from '@ember/runloop';
import uuidV4 from 'uuid/v4';

@classic
@tagName('form')
export default class MdDataquality extends Component {
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = get(this, 'model');

    once(function () {
      set(model, 'scope', getWithDefault(model, 'scope', {}));
      set(
        model,
        'systemIdentifier',
        getWithDefault(model, 'systemIdentifier', { uid: uuidV4() })
      );
      set(model, 'report', getWithDefault(model, 'report', []));
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
