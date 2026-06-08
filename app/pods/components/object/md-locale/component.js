import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';
import { setProperties, get } from '@ember/object';
import { copy } from 'ember-copy';
import { isNone } from '@ember/utils';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { assert } from '@ember/debug';
import { alias } from '@ember/object/computed';

const Validations = buildValidations({
  language: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  characterSet: validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
});

@classic
export default class MdLocaleComponent extends Component.extend(Validations) {
  @service settings;

  language = alias('model.language');
  characterSet = alias('model.characterSet');

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model || {};
    let settings = get(this, 'settings.data');

    assert('Model passed to md-locale must be an object', !isNone(model));

    if (Object.keys(model).length === 0) {
      once(() => {
        setProperties(model, {
          language: copy(settings.get('language')),
          characterSet: copy(settings.get('characterSet')),
          country: copy(settings.get('country')),
        });
      });
    }
  }
}

export { Validations };
