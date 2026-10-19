import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get as emberGet, set as emberSet } from '@ember/object';

// applyModelPatch() calls record.get(path)/record.set(path, value) as
// instance methods (unconverted - these are `.get()` calls on `record`, not
// `this`, so ember/no-get doesn't flag them), so a fake record needs real
// get/set methods, not just a plain object with the right shape.
function makeFakeRecord(modelName, json) {
  return {
    constructor: { modelName },
    json,
    get(path) {
      return emberGet(this, path);
    },
    set(path, value) {
      return emberSet(this, path, value);
    },
    save() {
      return Promise.resolve();
    },
    notifyPropertyChange() {},
  };
}

module('Unit | Service | patch', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:patch');
    assert.ok(service);
  });

  test('applyModelPatch (contact) fixes the adminstrativeArea typo, dedupes memberOfOrganization, and defaults externalIdentifier', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('contact', {
      address: [{ adminstrativeArea: 'Alaska' }],
      memberOfOrganization: ['org-1', 'org-1', 'org-2'],
    });

    service.applyModelPatch(record);

    assert.strictEqual(record.json.address[0].administrativeArea, 'Alaska');
    assert.strictEqual(record.json.address[0].adminstrativeArea, null);
    assert.deepEqual(record.json.memberOfOrganization.slice(), ['org-1', 'org-2']);
    assert.deepEqual(record.json.externalIdentifier.slice(), []);
  });

  test('applyModelPatch (record) defaults lineage source description from value', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadata: {
        resourceLineage: [{ source: [{ value: 'Old Value' }] }],
      },
      schema: {},
    });

    service.applyModelPatch(record);

    let src = record.json.metadata.resourceLineage[0].source[0];

    assert.strictEqual(src.description, 'Old Value');
    assert.strictEqual(src.value, null);
  });

  test('applyModelPatch (record) defaults processStep source description from value', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadata: {
        resourceLineage: [
          {
            processStep: [
              { stepSource: [{ value: 'Step Value' }] },
            ],
          },
        ],
      },
      schema: {},
    });

    service.applyModelPatch(record);

    let src =
      record.json.metadata.resourceLineage[0].processStep[0].stepSource[0];

    assert.strictEqual(src.description, 'Step Value');
    assert.strictEqual(src.value, null);
  });

  test('applyModelPatch (record) wraps a single taxonomicClassification in an array and fixes legacy name/level fields', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadata: {
        resourceInfo: {
          taxonomy: {
            taxonomicClassification: {
              latinName: 'Lynx canadensis',
              taxonomicRank: 'species',
            },
            identificationReference: ['ref-1'],
          },
        },
      },
      schema: {},
    });

    service.applyModelPatch(record);

    let taxonomy = record.json.metadata.resourceInfo.taxonomy;

    assert.true(Array.isArray(taxonomy), 'taxonomy is wrapped in an array');

    let classification = taxonomy[0].taxonomicClassification[0];

    assert.strictEqual(classification.taxonomicName, 'Lynx canadensis');
    assert.strictEqual(classification.taxonomicLevel, 'species');
    assert.deepEqual(taxonomy[0].identificationReference, [
      { identifier: ['ref-1'] },
    ]);
  });

  test('applyModelPatch (record) hoists legacy projection/datum/ellipsoid fields into identifier objects', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadata: {
        resourceInfo: {
          spatialReferenceSystem: [
            {
              referenceSystemParameterSet: {
                projection: { projection: 'UTM', projectionName: 'UTM Zone 5N' },
                geodetic: { datumName: 'NAD83', ellipsoidName: 'GRS80' },
                verticalDatum: { datumName: 'NAVD88' },
              },
            },
          ],
        },
      },
      schema: {},
    });

    service.applyModelPatch(record);

    let paramSet =
      record.json.metadata.resourceInfo.spatialReferenceSystem[0]
        .referenceSystemParameterSet;

    assert.strictEqual(paramSet.projection.projectionIdentifier.identifier, 'UTM');
    assert.strictEqual(paramSet.projection.projection, null);
    assert.strictEqual(paramSet.geodetic.datumIdentifier.identifier, 'NAD83');
    assert.strictEqual(paramSet.geodetic.ellipsoidIdentifier.identifier, 'GRS80');
    assert.strictEqual(paramSet.verticalDatum.datumIdentifier.identifier, 'NAVD88');
  });

  test('applyModelPatch (record) does not crash when a spatialReferenceSystem entry has no referenceSystemParameterSet', function (assert) {
    // Targets the optional chaining added to itm.referenceSystemParameterSet?.
    // {projection,geodetic,verticalDatum} - a legacy/partial srs entry with no
    // referenceSystemParameterSet key at all must not throw.
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadata: {
        resourceInfo: {
          spatialReferenceSystem: [{}],
        },
      },
      schema: {},
    });

    service.applyModelPatch(record);

    assert.ok(true, 'applyModelPatch completed without throwing');
  });

  test('applyModelPatch (record) copies metadataRepository citation.titles into citation.title and clears titles', function (assert) {
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadataRepository: [{ citation: { titles: 'Old Title Field' } }],
      schema: {},
    });

    service.applyModelPatch(record);

    let itm = record.json.metadataRepository[0];

    assert.strictEqual(itm.citation.title, 'Old Title Field');
    assert.strictEqual(itm.citation.titles, null);
  });

  test('applyModelPatch (record) does not crash when a metadataRepository entry has no citation', function (assert) {
    // Targets the optional chaining added to itm.citation?.titles.
    let service = this.owner.lookup('service:patch');
    let record = makeFakeRecord('record', {
      metadataRepository: [{}],
      schema: {},
    });

    service.applyModelPatch(record);

    assert.ok(true, 'applyModelPatch completed without throwing');
  });
});
