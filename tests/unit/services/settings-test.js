import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | settings', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', async function (assert) {
    let service = this.owner.lookup('service:settings');
    assert.ok(service);
    await settled();
  });

  test('setup defaults a missing repositoryDefaults to an empty array', async function (assert) {
    const service = this.owner.lookup('service:settings');
    await settled();

    assert.deepEqual(service.data.repositoryDefaults, []);
  });
});
