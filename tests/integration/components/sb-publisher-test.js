import { click, findAll, render } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { createRecord } from '../../helpers/create-record';
import $ from 'jquery';

// $.ajax's real caller passes `context: this` so jQuery binds the success/
// error callback's `this` to the sbTreeNode instance being published (see
// sb-tree-node.js's publish()) - the stub must replicate that via
// .call(options.context, ...), matching the pattern in sb-tree-node-test.js.
// The `.then()` here must return a *real* Promise (not just invoke the
// callback and return an inert object) so a throw inside the callback
// (sb-tree-node.js's error handler always throws) correctly propagates as a
// rejected promise - that rejection is exactly what sb-publisher.js's
// allSettled() needs to see to distinguish success from failure.
function stubAjax(shouldSucceed) {
  return (url, options) => ({
    then: (onSuccess, onError) =>
      new Promise((resolve, reject) => {
        try {
          resolve(
            shouldSucceed
              ? onSuccess.call(options.context, {
                  id: 'new-sb-id',
                  parentId: 'parent-1',
                })
              : onError.call(options.context, {
                  status: 500,
                  statusText: 'Server Error',
                })
          );
        } catch (e) {
          reject(e);
        }
      }),
  });
}

module('Integration | Component | sb publisher', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('config', {
      name: 'ScienceBase',
      route: 'sciencebase',
      description:
        'ScienceBase is a collaborative scientific data and information management platform',
      icon: 'globe',
      rootURI: 'https://api.sciencebase.gov/sbmd-service/',
      rootItemURL: 'https://www.sciencebase.gov/catalog/item/',
      defaultParent: '59ef8a34e4b0220bbd98d449',
      settingsComponent: 'sb-settings',
    });

    this.set(
      'settings',
      EmberObject.create({
        data: {
          publishOptions: [],
        },
      })
    );

    this.set('records', createRecord(3));

    await render(
      hbs`{{sb-publisher config=this.config settings=this.settings records=this.records}}`
    );

    assert.equal(findAll('.tree-leaf').length, 4);
  });

  test('renders without crashing when settings.data has not loaded yet (still null)', async function (assert) {
    // app/services/settings.js defaults `data: null` until its async load
    // resolves; init()/createNode() read settings.data.publishOptions, so a
    // publisher rendered before that resolves must not crash.
    this.set('config', {
      name: 'ScienceBase',
      route: 'sciencebase',
      defaultParent: '59ef8a34e4b0220bbd98d449',
    });

    this.set('settings', EmberObject.create({ data: null }));
    this.set('records', createRecord(3));

    await render(
      hbs`{{sb-publisher config=this.config settings=this.settings records=this.records}}`
    );

    assert.equal(findAll('.tree-leaf').length, 4);
  });

  test('publish flashes a danger message when a record fails to publish', async function (assert) {
    this.set('config', {
      name: 'ScienceBase',
      route: 'sciencebase',
      defaultParent: '59ef8a34e4b0220bbd98d449',
      rootURI: 'https://api.sciencebase.gov/sbmd-service/',
    });
    this.set('settings', EmberObject.create({ data: { publishOptions: [] } }));
    let records = createRecord(1);
    records.forEach((record) => (record.save = () => Promise.resolve()));
    this.set('records', records);

    let tokenService = this.owner.lookup('service:token');
    tokenService.token = 'fake-token';

    let flashMessages = this.owner.lookup('service:flash-messages');
    let danger = null;
    flashMessages.danger = (msg) => (danger = msg);

    await render(
      hbs`{{sb-publisher config=this.config settings=this.settings records=this.records}}`
    );

    // Select the one rendered record so `publishable`/`canPublish` allow the
    // Publish button to be enabled, matching how a real user drives this UI.
    await click(findAll('.tree-leaf')[1]);

    const originalAjax = $.ajax;
    $.ajax = stubAjax(false);

    try {
      await click('button.btn-primary:not(.add-token-button)');
    } finally {
      $.ajax = originalAjax;
    }

    assert.strictEqual(danger, 'Publishing error!');
  });

  test('publish does not flash a danger message when every record publishes successfully', async function (assert) {
    this.set('config', {
      name: 'ScienceBase',
      route: 'sciencebase',
      defaultParent: '59ef8a34e4b0220bbd98d449',
      rootURI: 'https://api.sciencebase.gov/sbmd-service/',
    });
    this.set('settings', EmberObject.create({ data: { publishOptions: [] } }));
    let records = createRecord(1);
    records.forEach((record) => (record.save = () => Promise.resolve()));
    this.set('records', records);

    let tokenService = this.owner.lookup('service:token');
    tokenService.token = 'fake-token';

    let flashMessages = this.owner.lookup('service:flash-messages');
    let danger = null;
    flashMessages.danger = (msg) => (danger = msg);

    await render(
      hbs`{{sb-publisher config=this.config settings=this.settings records=this.records}}`
    );

    await click(findAll('.tree-leaf')[1]);

    const originalAjax = $.ajax;
    $.ajax = stubAjax(true);

    try {
      await click('button.btn-primary:not(.add-token-button)');
    } finally {
      $.ajax = originalAjax;
    }

    assert.strictEqual(danger, null);
  });
});
