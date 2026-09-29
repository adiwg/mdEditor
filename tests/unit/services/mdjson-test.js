import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Service | mdjson', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:mdjson');
    assert.ok(service);
  });

  test('injectCitations backfills citations for a matched associated record', function (assert) {
    let service = this.owner.lookup('service:mdjson');

    let matchedRecord = {
      recordId: 'rec-1',
      title: 'Matched Record',
      json: {
        metadata: {
          metadataInfo: {
            metadataContact: [{ name: 'Contact A' }],
            metadataIdentifier: { identifier: 'meta-id', namespace: 'urn:uuid' },
          },
          resourceInfo: {
            citation: { title: 'Resource Title' },
            resourceType: [{ type: 'dataset' }],
          },
        },
      },
    };

    service.store = { peekAll: () => [matchedRecord] };

    let json = {
      metadata: { associatedResource: [{ mdRecordId: 'rec-1' }] },
    };

    service.injectCitations(json);

    let ref = json.metadata.associatedResource[0];

    assert.strictEqual(ref.mdRecordId, null, 'mdRecordId is cleared after injection');
    assert.strictEqual(ref.resourceCitation.title, 'Resource Title');
    assert.strictEqual(ref.metadataCitation.title, 'Metadata for Matched Record');
    assert.deepEqual(ref.resourceType, [{ type: 'dataset' }]);
  });

  test('injectCitations does not crash when no record matches and clears mdRecordId', function (assert) {
    let service = this.owner.lookup('service:mdjson');

    service.store = { peekAll: () => [] };

    let json = {
      metadata: { associatedResource: [{ mdRecordId: 'missing-id' }] },
    };

    service.injectCitations(json);

    assert.strictEqual(json.metadata.associatedResource[0].mdRecordId, null);
  });

  test('injectCitations does not crash when the matched record has no json.metadata at all', function (assert) {
    // record.json defaults to an object via the model's transform, but a
    // still-loading or malformed record could legitimately have json without
    // a `metadata` key - the multi-level `record.json?.metadata?.
    // metadataInfo`/`.resourceInfo.citation`/`.resourceInfo.resourceType`
    // reads this test targets must fall through to their `|| {}`/`|| []`
    // defaults rather than throw.
    let service = this.owner.lookup('service:mdjson');

    let matchedRecord = { recordId: 'rec-2', title: 'Bare Record', json: {} };

    service.store = { peekAll: () => [matchedRecord] };

    let json = {
      metadata: { associatedResource: [{ mdRecordId: 'rec-2' }] },
    };

    service.injectCitations(json);

    let ref = json.metadata.associatedResource[0];

    assert.strictEqual(ref.mdRecordId, null);
    assert.deepEqual(ref.resourceType, []);
    assert.deepEqual(ref.metadataCitation.responsibleParty, []);
  });

  test('formatRecord replacer walks a contact organization chain without crashing', function (assert) {
    let service = this.owner.lookup('service:mdjson');

    // These need a real .get() method - the surrounding _replacer code calls
    // contact.get('json.memberOfOrganization') directly (a `.get()` method
    // call on a non-`this` object, which ember/no-get does not flag and this
    // pass leaves untouched), so plain objects won't work here.
    let org = EmberObject.create({
      contactId: 'org-1',
      json: { contactId: 'org-1', memberOfOrganization: [] },
    });
    let parentOrg = EmberObject.create({
      contactId: 'org-2',
      json: { contactId: 'org-2', memberOfOrganization: [] },
    });
    let person = EmberObject.create({
      contactId: 'person-1',
      json: {
        contactId: 'person-1',
        memberOfOrganization: ['org-1', 'org-2'],
      },
    });

    service.cleaner = { clean: (obj) => JSON.parse(JSON.stringify(obj)) };
    service.contacts = { get: () => [org, parentOrg, person] };
    service.store = {
      peekAll: (type) => (type === 'contact' ? [org, parentOrg, person] : []),
    };

    let mockRecord = {
      json: {
        metadata: { metadataInfo: {} },
        pointOfContact: [{ contactId: 'person-1' }],
      },
    };

    let result = service.formatRecord(mockRecord, false, false);

    let ids = result.contact.map((c) => c.contactId);

    assert.ok(ids.includes('person-1'), 'the directly-referenced contact is included');
    assert.ok(ids.includes('org-1'), 'the first-level organization is included');
    assert.ok(ids.includes('org-2'), 'the second-level (member-of-a-member) organization is included');
  });
});
