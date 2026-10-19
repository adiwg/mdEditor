import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | dictionary/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var route = this.owner.lookup('route:dictionary/show/edit');
    assert.ok(route);
  });

  test('cancelDictionary reverts locally when autoSave is on and a revert snapshot exists', function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit');
    let reverted = false;
    let reloaded = false;
    const model = {
      title: 'My Dictionary',
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
    route.doCancel = () => {};
    route.flashMessages = { warning() {}, success() {} };

    route.cancelDictionary();

    assert.true(reverted, 'reverts locally instead of reloading');
    assert.false(
      reloaded,
      'does not reload when autoSave is on with a revert snapshot'
    );
  });

  test('cancelDictionary reloads from the store when autoSave is off', function (assert) {
    const route = this.owner.lookup('route:dictionary/show/edit');
    let reloaded = false;
    const model = {
      title: 'My Dictionary',
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
    route.doCancel = () => {};
    route.flashMessages = { warning() {}, success() {} };

    route.cancelDictionary();

    assert.true(reloaded, 'falls back to a full reload when autoSave is off');
  });
});
