import { once } from '@ember/runloop';
import { validator, buildValidations } from 'ember-cp-validations';
import { setProperties } from '@ember/object';
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

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    let model = this.model;
    let settings = this.settings.data;

    if (!model) {
      // this.model can be undefined here even though record.js's default
      // json shape has e.g. `defaultResourceLocale: {}` - cleaner.js's
      // clean() (run on every save, via transforms/json.js) strips empty
      // nested objects from the persisted json entirely, so after a
      // save+reload the path is genuinely gone, not just empty. Assigning
      // through this.set() (this is a classic, curly-invoked component,
      // so `model=` is two-way bound) propagates the new object back onto
      // the caller's path - without it, this.model stays undefined and
      // the language/characterSet alias('model.*') setters below throw
      // "object in path 'model' could not be found" the moment either
      // field is touched.
      model = {};
      this.set('model', model);
    }

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

MdLocaleComponent.reopen({
  language: alias('model.language'),
  characterSet: alias('model.characterSet'),
});

export { Validations };
