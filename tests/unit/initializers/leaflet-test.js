import Application from 'mdeditor/app';
import config from 'mdeditor/config/environment';
import { run } from '@ember/runloop';
import LeafletInitializer from 'mdeditor/initializers/leaflet';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | leaflet', function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      application = Application.create(config.APP);
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    LeafletInitializer.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
