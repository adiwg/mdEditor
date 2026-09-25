import Application from 'mdeditor/app';
import config from 'mdeditor/config/environment';
import { run } from '@ember/runloop';
import { initialize } from 'mdeditor/instance-initializers/settings';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | settings', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create(config.APP);
      this.appInstance = this.application.buildInstance();
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    initialize(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
