import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from 'mdeditor/instance-initializers/route-publish';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import Service from '@ember/service';

module('Unit | Instance Initializer | route publish', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  test('it works', function(assert) {
    let a =[{route:'test'}];

    this.appInstance.register('service:publish', Service.extend({ catalogs: a }));
    initialize(this.appInstance);

    assert.ok(true);
  });
});
