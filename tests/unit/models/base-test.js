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
});
