import Application from 'mdeditor/app';
import config from 'mdeditor/config/environment';
import { run } from '@ember/runloop';
import { initialize } from 'mdeditor/instance-initializers/settings-sciencebase';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import Service from '@ember/service';

module('Unit | Instance Initializer | settings sciencebase', function(hooks) {
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

  let a = [];

  // Replace this with your real tests.
  test('it works', function(assert) {
    this.appInstance.register('service:publish', Service.extend({ catalogs: a }));
    initialize(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(this.appInstance.lookup('service:publish').catalogs.findBy('route','sciencebase'));
  });
});
