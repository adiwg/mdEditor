import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | import', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    var route = this.owner.lookup('route:import');
    assert.ok(route);
  });

  test('setupController reads importUri from settings', function (assert) {
    const route = this.owner.lookup('route:import');
    const controller = {
      set(key, value) {
        this[key] = value;
      },
    };

    route.settings = { data: { importUriBase: 'https://example.com/import' } };

    route.setupController(controller, {});

    assert.strictEqual(controller.importUri, 'https://example.com/import');
  });

  test('setupController does not throw when settings.data has not loaded yet', function (assert) {
    const route = this.owner.lookup('route:import');
    const controller = {
      set(key, value) {
        this[key] = value;
      },
    };

    // settings.data defaults to null until the settings service's async
    // load resolves (see app/services/settings.js) - setupController can
    // run before that, e.g. on a fresh page load of /import.
    route.settings = { data: null };

    route.setupController(controller, {});

    assert.strictEqual(controller.importUri, undefined);
  });

  test('getTitle extracts a title per record type with sensible fallbacks', function (assert) {
    const route = this.owner.lookup('route:import');
    const makeRecord = (type, json) => ({
      type,
      attributes: { json: JSON.stringify(json) },
    });

    assert.strictEqual(
      route.getTitle(
        makeRecord('records', {
          metadata: { resourceInfo: { citation: { title: 'Rec Title' } } },
        })
      ),
      'Rec Title'
    );
    assert.strictEqual(route.getTitle(makeRecord('records', {})), 'NO TITLE');

    assert.strictEqual(
      route.getTitle(
        makeRecord('dictionaries', {
          dataDictionary: { citation: { title: 'Dict Title' } },
        })
      ),
      'Dict Title'
    );
    assert.strictEqual(
      route.getTitle(
        makeRecord('dictionaries', { citation: { title: 'Fallback Title' } })
      ),
      'Fallback Title'
    );
    assert.strictEqual(
      route.getTitle(makeRecord('dictionaries', {})),
      'NO TITLE'
    );

    assert.strictEqual(
      route.getTitle(makeRecord('contacts', { name: 'Jane' })),
      'Jane'
    );
    assert.strictEqual(route.getTitle(makeRecord('contacts', {})), 'NO NAME');

    assert.strictEqual(
      route.getTitle({
        type: 'schemas',
        attributes: { title: 'Schema Title', json: null },
      }),
      'Schema Title'
    );
    assert.strictEqual(
      route.getTitle({ type: 'unknown-type', attributes: { json: null } }),
      'N/A'
    );
  });

  test('readData flashes a danger message when the file cannot be parsed as JSON', async function (assert) {
    const route = this.owner.lookup('route:import');
    let danger = null;

    route.controller = {};
    route.flashMessages = {
      danger(msg) {
        danger = msg;
      },
      info() {},
    };

    route.readData({
      type: 'application/json',
      name: 'bad.json',
      data: 'not valid json',
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.strictEqual(
      danger,
      'Failed to parse file: bad.json. Is it valid JSON?'
    );
  });

  test('readFromUri flashes a danger message when the response body is not valid JSON', async function (assert) {
    const route = this.owner.lookup('route:import');
    let danger = null;

    route.controller = { importUri: 'https://example.com/data.json' };
    route.flashMessages = {
      danger(msg) {
        danger = msg;
      },
    };
    route.ajax = { request: () => Promise.resolve('not valid json') };

    route.readFromUri();

    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.strictEqual(danger, 'Failed to parse data. Is it valid JSON?');
  });

  test('readFromUri flashes "Import error!" when the response is empty', async function (assert) {
    const route = this.owner.lookup('route:import');
    let danger = null;

    route.controller = { importUri: 'https://example.com/data.json' };
    route.flashMessages = {
      danger(msg) {
        danger = msg;
      },
    };
    route.ajax = { request: () => Promise.resolve('') };

    route.readFromUri();

    await new Promise((resolve) => setTimeout(resolve, 0));

    assert.strictEqual(danger, 'Import error!');
  });

  test('readFromUri flashes a danger message when the ajax request itself fails', async function (assert) {
    const route = this.owner.lookup('route:import');
    let danger = null;
    let ajaxPromise;

    route.controller = { importUri: 'https://example.com/data.json' };
    route.flashMessages = {
      danger(msg) {
        danger = msg;
      },
    };
    route.ajax = {
      request: () => {
        ajaxPromise = Promise.reject({
          status: 500,
          statusText: 'Server Error',
        });
        return ajaxPromise;
      },
    };

    route.readFromUri();

    await ajaxPromise.catch(() => {});

    assert.strictEqual(
      danger,
      ' Error retrieving the mdJSON: 500: Server Error'
    );
  });
});
