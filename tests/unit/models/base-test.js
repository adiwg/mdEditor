import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

import { run } from '@ember/runloop';

module('Unit | Model | base', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() => this.owner.lookup('service:store').modelFor('base'));
    // let store = this.store();
    assert.equal(model.modelName, 'base');
  });

  test('clears dirty hash across repeated save cycles', async function (assert) {
    const store = this.owner.lookup('service:store');

    const model = run(() =>
      store.push({
        data: {
          id: 'contact-base-regression',
          type: 'contact',
          attributes: {
            json: {
              contactId: 'contact-base-regression',
              isOrganization: false,
              name: 'Initial Name',
              positionName: null,
              memberOfOrganization: [],
              logoGraphic: [],
              phone: [],
              address: [],
              electronicMailAddress: [],
              externalIdentifier: [],
              onlineResource: [],
              hoursOfService: [],
            },
            dateUpdated: new Date().toISOString(),
          },
        },
      })
    );

    // Avoid async side effects from pouch updates in unit scope.
    model.pouch = { updatePouchRecord() {} };

    run(() => {
      model.isReady();
    });
    assert.false(model.hasDirtyHash, 'starts clean');

    run(() => {
      model.set('json.name', 'First Edit');
      model.notifyPropertyChange('currentHash');
    });
    assert.true(model.hasDirtyHash, 'becomes dirty after first edit');

    run(() => {
      model.updateTimestamp();
      model.wasUpdated();
    });
    assert.false(model.hasDirtyHash, 'clears after first save cycle');

    run(() => {
      model.set('json.name', 'Second Edit');
      model.notifyPropertyChange('currentHash');
    });
    assert.true(model.hasDirtyHash, 'becomes dirty after second edit');

    run(() => {
      model.updateTimestamp();
      model.wasUpdated();
    });
    assert.false(model.hasDirtyHash, 'clears after second save cycle');

    await settled();
  });

  test('canRevert reflects hasDirtyHash and settings.data.autoSave', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = run(() =>
      store.push({
        data: {
          id: 'contact-canrevert',
          type: 'contact',
          attributes: {
            json: { contactId: 'contact-canrevert', name: 'Initial Name' },
            dateUpdated: new Date().toISOString(),
          },
        },
      })
    );

    model.pouch = { updatePouchRecord() {} };
    model.settings = { data: { autoSave: false } };

    run(() => {
      model.isReady();
    });
    assert.false(model.canRevert, 'not dirty yet, cannot revert');

    run(() => {
      model.set('json.name', 'Edited');
      model.notifyPropertyChange('currentHash');
    });
    assert.true(
      model.canRevert,
      'dirty with autoSave off means it can revert'
    );
  });

  test('revertChanges restores the previous json snapshot', async function (assert) {
    const store = this.owner.lookup('service:store');
    const model = run(() =>
      store.push({
        data: {
          id: 'contact-revertchanges',
          type: 'contact',
          attributes: {
            json: { contactId: 'contact-revertchanges', name: 'Initial Name' },
            dateUpdated: new Date().toISOString(),
          },
        },
      })
    );

    model.pouch = { updatePouchRecord() {} };
    // autoSave off avoids a real save() firing off of observeAutoSave while
    // this test edits json directly.
    model.settings = { data: { autoSave: false } };

    const originalJson = JSON.stringify(model.json);
    model.set('jsonRevert', originalJson);

    run(() => {
      model.set('json.name', 'Changed Name');
    });
    assert.equal(model.json.name, 'Changed Name');

    run(() => {
      model.revertChanges();
    });

    assert.equal(
      model.json.name,
      'Initial Name',
      'json reverted to the stored snapshot'
    );

    await settled();
  });
});
