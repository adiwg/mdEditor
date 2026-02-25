import Application from '../../app';
import config from '../../config/environment';
import { run } from '@ember/runloop';
import registerModalAssertHelpers from './modal-asserts';
import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';

registerPowerSelectHelpers();

export default function startApp(attrs) {
  let attributes = Object.assign({}, config.APP);
  attributes = Object.assign(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    registerModalAssertHelpers();
    return application;
  });
}
