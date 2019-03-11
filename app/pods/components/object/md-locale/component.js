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
import {
  copy
} from '@ember/object/internals';
import {
  isNone
} from '@ember/utils';
import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import {
  assert
} from '@ember/debug';
import {
  alias
} from '@ember/object/computed';

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

const theComp = Component.extend(Validations, {
  settings: service(),

  didReceiveAttrs() {
    this._super(...arguments);

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
  },

  language:alias('model.language'),
  characterSet:alias('model.characterSet')
});

export {
  Validations,
  theComp as
  default
};
