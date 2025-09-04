import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import {
  once
} from '@ember/runloop';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';
import {
  setProperties,
  get
} from '@ember/object';
import { copy } from 'mdeditor/utils/copy';
import {
  isNone
} from '@ember/utils';
import Component from '@ember/component';
import {
  assert
} from '@ember/debug';

const Validations = buildValidations({
  'language': validator('presence', {
    presence: true,
    ignoreBlank: true
  }),
  'characterSet': validator('presence', {
    presence: true,
    ignoreBlank: true
  })
});

@classic
class theComp extends Component.extend(Validations) {
  @service
  settings;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model || {};
    let settings = get(this, 'settings.data');

    assert('Model passed to md-locale must be an object', !isNone(model));

    if(Object.keys(model).length === 0) {
      once(() => {
        setProperties(model, {
          language: copy(settings.get('language')),
          characterSet: copy(settings.get('characterSet')),
          country: copy(settings.get('country'))
        });
      });
    }
  }

  @alias('model.language')
  language;

  @alias('model.characterSet')
  characterSet;
}

export {
  Validations,
  theComp as
  default
};
