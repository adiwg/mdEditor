import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | custom-profile', function (hooks) {
  setupTest(hooks);

  test('schemas is a real hasMany relationship to the schema model, not the nonexistent plural "schemas"', function (assert) {
    // custom-profile.js previously declared `hasMany('schemas', ...)`, but
    // only app/models/schema.js (singular) exists - store.modelFor('schemas')
    // throws "No model was found for 'schemas'". The relationship stayed
    // dormant in practice (nothing ever pushed real relationship data for
    // it), but object/md-profile/custom/component.js treats
    // `record.schemas` as a live, mutable collection
    // (.pushObject/.removeObject/.includes), which is exactly how a real
    // hasMany('schema', ...) ManyArray behaves.
    let store = this.owner.lookup('service:store');
    let schemaRecord = store.createRecord('schema', {});
    let profile = store.createRecord('custom-profile', { title: 'Test' });

    profile.schemas.push(schemaRecord);

    assert.true(profile.schemas.includes(schemaRecord));
    assert.strictEqual(profile.schemas.length, 1);

    profile.schemas.splice(profile.schemas.indexOf(schemaRecord), 1);

    assert.false(profile.schemas.includes(schemaRecord));
  });
});
