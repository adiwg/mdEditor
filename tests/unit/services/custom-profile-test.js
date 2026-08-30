import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | custom-profile', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', async function(assert) {
    let service = this.owner.lookup('service:custom-profile');
    assert.ok(service);
    await settled();
  });

  // init() kicks off an async store.findAll('custom-profile') that must be
  // allowed to settle before the store tears down, or teardown throws
  // "store instance has already been destroyed".
  test('activeComponents reads from the active profile when present', async function (assert) {
    const service = this.owner.lookup('service:custom-profile');
    service.getActiveProfile = () => ({
      definition: { components: { bar: true } },
    });
    assert.deepEqual(service.activeComponents, { bar: true });
    await settled();
  });

  test('activeComponents falls back to the default profile when there is no active one', async function (assert) {
    const service = this.owner.lookup('service:custom-profile');
    service.getActiveProfile = () => null;
    // defaultProfile is a read-only computed (mapById[defaultProfileId]) -
    // drive it through its real dependency chain instead of overriding it.
    service.customProfiles = [
      {
        id: 'org.adiwg.profile.full',
        definition: { components: { foo: true } },
      },
    ];
    assert.deepEqual(service.activeComponents, { foo: true });
    await settled();
  });

  test('activeSchemas reads schemas from the active profile', async function (assert) {
    const service = this.owner.lookup('service:custom-profile');
    service.getActiveProfile = () => ({ schemas: ['schema-a'] });
    assert.deepEqual(service.activeSchemas, ['schema-a']);
    await settled();
  });

  test('mapByAltId maps each alternate id to its profile id', async function (assert) {
    const service = this.owner.lookup('service:custom-profile');
    service.customProfiles = [
      { id: 'profile-a', definition: { alternateId: ['alt-a', 'alt-a2'] } },
      { id: 'profile-b', definition: {} },
    ];

    assert.equal(service.mapByAltId['alt-a'], 'profile-a');
    assert.equal(service.mapByAltId['alt-a2'], 'profile-a');
    await settled();
  });
});
