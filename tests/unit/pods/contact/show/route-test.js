import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contact/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:contact/show');
    assert.ok(route);
  });

  test('cancelContact reverts locally when autoSave is on and a revert snapshot exists', function (assert) {
    const route = this.owner.lookup('route:contact/show');
    let reverted = false;
    let reloaded = false;
    const model = {
      title: 'My Contact',
      get(key) {
        if (key === 'title') return this.title;
        if (key === 'jsonRevert') return '{"foo":"bar"}';
        return undefined;
      },
      revertChanges() {
        reverted = true;
      },
      reload() {
        reloaded = true;
        return Promise.resolve();
      },
    };

    route.currentRouteModel = () => model;
    route.settings = { data: { autoSave: true } };
    route.flashMessages = { warning() {}, success() {} };

    route.cancelContact();

    assert.true(reverted, 'reverts locally instead of reloading');
    assert.false(
      reloaded,
      'does not reload when autoSave is on with a revert snapshot'
    );
  });

  test('cancelContact reloads from the store when autoSave is off', function (assert) {
    const route = this.owner.lookup('route:contact/show');
    let reloaded = false;
    const model = {
      title: 'My Contact',
      get(key) {
        if (key === 'title') return this.title;
        return undefined;
      },
      reload() {
        reloaded = true;
        return Promise.resolve();
      },
    };

    route.currentRouteModel = () => model;
    route.settings = { data: { autoSave: false } };
    route.flashMessages = { warning() {}, success() {} };

    route.cancelContact();

    assert.true(reloaded, 'falls back to a full reload when autoSave is off');
  });
});
