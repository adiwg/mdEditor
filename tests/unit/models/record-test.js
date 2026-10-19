import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | record', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    var model = run(() => this.owner.lookup('service:store').createRecord('record'));
    // var store = this.store();
    assert.ok(!!model);
  });

  test('should correctly compute title', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('record'));

    assert.expect(1);
    me.set('json.metadata.resourceInfo.citation.title', 'foo');
    assert.equal(me.get('title'), 'foo');
  });

  test('should correctly compute icon', function(assert) {
    const me = run(() => this.owner.lookup('service:store').createRecord('record'));
    const list = this.owner
      .lookup('service:icon');

    assert.expect(1);
    me.set('json.metadata.resourceInfo.resourceType.firstObject.type', 'project');
    assert.equal(me.get('icon'), list.get('project'));
  });

  test('hasParent and defaultParent resolve a linked record', function (assert) {
    const store = this.owner.lookup('service:store');

    const parent = run(() =>
      store.push({
        data: {
          id: 'parent-record',
          type: 'record',
          attributes: {
            json: {
              metadata: {
                metadataInfo: {
                  metadataIdentifier: {
                    identifier: 'parent-id',
                    namespace: 'urn:uuid',
                  },
                },
                resourceInfo: { citation: { title: 'Parent' } },
              },
            },
          },
        },
      })
    );
    const child = run(() =>
      store.push({
        data: {
          id: 'child-record',
          type: 'record',
          attributes: {
            json: {
              metadata: {
                metadataInfo: {
                  metadataIdentifier: {
                    identifier: 'child-id',
                    namespace: 'urn:uuid',
                  },
                  parentMetadata: {
                    identifier: [{ identifier: 'parent-id' }],
                  },
                },
                resourceInfo: { citation: { title: 'Child' } },
              },
            },
          },
        },
      })
    );

    // hasSchemaErrors (a read-only bool() macro) runs the real mdjson/ajv
    // validator, which these minimal fixtures won't satisfy. Stub the
    // mdjson service dependency instead so hasParent's own ID-matching
    // logic - not full schema validity - is what's under test.
    const noErrors = { validateRecord: () => ({ errors: null }) };
    parent.mdjson = noErrors;
    child.mdjson = noErrors;

    assert.ok(child.hasParent, 'child resolves hasParent');
    assert.equal(
      child.defaultParent,
      parent,
      'defaultParent resolves the linked record'
    );
    assert.notOk(parent.hasParent, 'parent has no hasParent');
  });

  test('copy() defaults resourceType when missing', function (assert) {
    const store = this.owner.lookup('service:store');
    const me = run(() => store.createRecord('record'));

    me.set('json.metadata.resourceInfo.citation.title', 'Original');
    me.set('json.metadata.resourceInfo.resourceType', null);

    const copied = run(() => me.copy());

    assert.equal(
      copied.json.metadata.resourceInfo.citation.title,
      'Copy of Original'
    );
    assert.deepEqual(
      copied.json.metadata.resourceInfo.resourceType,
      [{}],
      'defaults resourceType to [{}] when the source had none'
    );
  });
});
