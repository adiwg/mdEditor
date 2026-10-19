import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | export', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:export');
    assert.ok(route);
  });

  test('model exposes the settings data alongside the application model', function (assert) {
    const route = this.owner.lookup('route:export');
    const records = [{ id: 1 }];
    const settingsData = { autoSave: true };

    route.modelFor = () => records;
    route.settings = { data: settingsData };

    const model = route.model();

    assert.strictEqual(model.records, records);
    assert.strictEqual(model.settings, settingsData);
  });

  test('setupController defines hasSelected as true when any peekAll type has a selected item', function (assert) {
    const route = this.owner.lookup('route:export');
    const controller = {};

    route.store = {
      peekAll(type) {
        return type === 'contact' ? [{ _selected: true }] : [{ _selected: false }];
      },
    };
    route.controller = controller;

    route.setupController(controller, {});

    assert.true(controller.hasSelected);
  });

  test('setupController defines hasSelected as false when nothing is selected', function (assert) {
    const route = this.owner.lookup('route:export');
    const controller = {};

    route.store = {
      peekAll: () => [{ _selected: false }],
    };
    route.controller = controller;

    route.setupController(controller, {});

    assert.false(controller.hasSelected);
  });

  test('setupController defines hasSelectedRecords based only on the record type', function (assert) {
    const route = this.owner.lookup('route:export');
    const controller = {};

    route.store = {
      peekAll(type) {
        return type === 'record' ? [{ _selected: true }] : [{ _selected: true }];
      },
    };
    route.controller = controller;

    route.setupController(controller, {});

    assert.true(controller.hasSelectedRecords);
  });

  const makeRecord = (props) => ({
    ...props,
    get(key) {
      return this[key];
    },
  });

  test('exportSelectedData(true) formats and saves only the selected records', async function (assert) {
    const route = this.owner.lookup('route:export');
    const formatted = [];
    const selectedRecord = makeRecord({ id: 'a', _selected: true });
    const unselectedRecord = makeRecord({ id: 'b', _selected: false });
    let saved = null;

    route.store = {
      peekAll: (type) => (type === 'record' ? [selectedRecord, unselectedRecord] : []),
    };
    route.mdjson = {
      formatRecord: (item) => {
        formatted.push(item);
        return item;
      },
    };

    const originalSaveAs = window.saveAs;
    window.saveAs = (blob) => {
      saved = blob;
    };

    try {
      route.exportSelectedData(true);
      await new Promise((resolve) => setTimeout(resolve, 0));

      assert.deepEqual(formatted, [selectedRecord]);
      assert.ok(saved, 'saveAs was called');
    } finally {
      window.saveAs = originalSaveAs;
    }
  });

  test('exportSelectedData(false) builds filterIds from only the selected items per type', async function (assert) {
    const route = this.owner.lookup('route:export');
    let capturedFilterIds = null;

    route.store = {
      peekAll: (type) =>
        type === 'record'
          ? [makeRecord({ id: 'r1', _selected: true }), makeRecord({ id: 'r2', _selected: false })]
          : [],
      exportSelectedData: (types, options) => {
        capturedFilterIds = options.filterIds;
        return { _result: '{"data":[]}' };
      },
    };

    const originalSaveAs = window.saveAs;
    window.saveAs = () => {};

    try {
      route.exportSelectedData(false);
      await new Promise((resolve) => setTimeout(resolve, 0));

      assert.deepEqual(capturedFilterIds.record, ['r1']);
    } finally {
      window.saveAs = originalSaveAs;
    }
  });
});
