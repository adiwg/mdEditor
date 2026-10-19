import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Component | object/md-domainitem', function (hooks) {
  setupTest(hooks);

  test('didReceiveAttrs defaults a missing model.reference to an empty object', async function (assert) {
    const model = { name: 'name0', value: 'value0', definition: 'definition0' };
    const component = this.owner
      .factoryFor('component:object/md-domainitem')
      .create({ model });

    component.trigger('didReceiveAttrs');
    await settled();

    assert.deepEqual(model.reference, {});
  });
});
