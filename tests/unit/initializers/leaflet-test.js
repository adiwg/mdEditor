import Application from '@ember/application';
import { run } from '@ember/runloop';
import LeafletInitializer from 'mdeditor/initializers/leaflet';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | leaflet', {
  beforeEach() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  LeafletInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
