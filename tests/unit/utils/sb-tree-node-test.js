import sbTreeNode from 'mdeditor/utils/sb-tree-node';
import { module, test } from 'qunit';
import $ from 'jquery';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

// $.ajax's real caller passes `context: this` so jQuery binds the success/
// error callback's `this` to the sbTreeNode instance - publish()'s success
// handler relies on that (`set(this, 'result', response)`), so the stub
// must replicate it via .call(options.context, ...).
function stubAjaxResolving(response) {
  return (url, options) => ({
    then: (onSuccess) => {
      onSuccess.call(options.context, response);
      return { catch: () => {} };
    },
  });
}

module('Unit | Utility | sb tree node', function() {
  test('it works', function(assert) {
    assert.expect(2);

    let result = sbTreeNode.create({
      _record: {
        recordId: 'theid'
      },
      //config: this.get('config')
    });

    assert.equal(result.uuid, 'theid');
    assert.equal(result.uuid, result.identifier, 'set ids');
  });

  test('definition does not crash when the record has not loaded yet (_record still null)', function (assert) {
    // _record defaults to null until the ScienceBase XHR resolves (see
    // sb-tree.js/sb-tree-label.js notes on the same default), and even the
    // original get()-based version already threw synchronously if `abstract`
    // was ever missing (get() only protects missing intermediates, not the
    // leaf) - this now returns '' instead of crashing either way.
    let node = sbTreeNode.create({});

    assert.strictEqual(node.definition, '');
  });

  test('definition does not crash when _record is present but abstract is missing', function (assert) {
    let node = sbTreeNode.create({
      _record: { json: { metadata: { resourceInfo: {} } } },
    });

    assert.strictEqual(node.definition, '');
  });

  test('sortOrder/nodeClass do not crash when config is undefined', function (assert) {
    // config is only assigned for the root nodes created in
    // sb-publisher.js's createNode(); addChildren() passes it along, but
    // config itself can be undefined if sb-publisher's own `config` getter
    // doesn't find a 'ScienceBase' catalog entry.
    let node = sbTreeNode.create({ _record: { recordId: 'child' } });

    assert.strictEqual(node.sortOrder, 0);
    assert.strictEqual(node.nodeClass, 'tree-node-rooted');
  });

  test('publish resolves rootURI from config when the node has no settings (a child node)', function (assert) {
    // addChildren() creates child nodes via `this.constructor.create({
    // _record: rec, config: this.config })` - it never passes `settings`, so
    // a child node's `record.get('settings')` (unconverted, still get())
    // resolves to undefined, and the flagged get()s this test targets
    // (publishOptions?.publisherEndpoint / publishOptions?.['sb-publishEndpoint'])
    // must fall through to config.rootURI without throwing.
    let node = sbTreeNode.create({
      // findSbIdObject() calls record.get(...) as an instance method, so
      // _record must be a real EmberObject here (matching production data),
      // not a plain object like the definition/sortOrder tests above use.
      _record: EmberObject.create({
        recordId: 'child',
        json: { metadata: { metadataInfo: {} } },
      }),
      config: { rootURI: 'https://api.sciencebase.gov/sbmd-service/' },
    });

    const originalAjax = $.ajax;
    let capturedUrl;
    $.ajax = (url) => {
      capturedUrl = url;
      return { then: () => {} };
    };

    try {
      node.publish('refresh-token');
    } finally {
      $.ajax = originalAjax;
    }

    assert.strictEqual(
      capturedUrl,
      'https://api.sciencebase.gov/sbmd-service/product'
    );
  });

  test('publish does not crash when a citation identifier has no existing authority.date array', function (assert) {
    // publish()'s success handler defaults a missing authority to
    // `{ date: A(), title: 'ScienceBase' }` and then calls
    // `idObj.authority.date.pushObject(...)` - this is exactly the
    // "first time this record is published to ScienceBase" case, where the
    // matched citation identifier has no authority info yet at all.
    let citationIdentifier = {
      identifier: 'existing-sb-id',
      namespace: 'gov.sciencebase.catalog',
    };
    let node = sbTreeNode.create({
      _record: EmberObject.create({
        recordId: 'r1',
        json: {
          metadata: {
            metadataInfo: {},
            resourceInfo: {
              citation: { identifier: [citationIdentifier] },
            },
          },
        },
        save() {
          return Promise.resolve();
        },
      }),
      config: { rootURI: 'https://api.sciencebase.gov/sbmd-service/' },
      children: A(),
    });

    const originalAjax = $.ajax;
    $.ajax = stubAjaxResolving({ id: 'existing-sb-id', parentId: 'parent-1' });

    try {
      node.publish('refresh-token');
    } finally {
      $.ajax = originalAjax;
    }

    assert.ok(
      citationIdentifier.authority.date.pushObject,
      'authority.date ends up as a real Ember array (supports pushObject), not a plain []'
    );
    assert.strictEqual(citationIdentifier.authority.date.length, 1);
    assert.strictEqual(citationIdentifier.authority.title, 'ScienceBase');
  });

  test('publish does not crash when a citation identifier already has a plain-array authority.date (loaded from real JSON)', function (assert) {
    // Even pre-existing citation data loaded from parsed mdJSON has a plain
    // array for authority.date (JSON.parse never produces Ember arrays) -
    // pushObject() must work on that path too, not just the freshly
    // defaulted one above.
    let citationIdentifier = {
      identifier: 'existing-sb-id',
      namespace: 'gov.sciencebase.catalog',
      authority: {
        title: 'ScienceBase',
        date: [
          { date: '2020-01-01T00:00:00.000Z', dateType: 'published' },
        ],
      },
    };
    let node = sbTreeNode.create({
      _record: EmberObject.create({
        recordId: 'r1',
        json: {
          metadata: {
            metadataInfo: {},
            resourceInfo: {
              citation: { identifier: [citationIdentifier] },
            },
          },
        },
        save() {
          return Promise.resolve();
        },
      }),
      config: { rootURI: 'https://api.sciencebase.gov/sbmd-service/' },
      children: A(),
    });

    const originalAjax = $.ajax;
    $.ajax = stubAjaxResolving({ id: 'existing-sb-id', parentId: 'parent-1' });

    try {
      node.publish('refresh-token');
    } finally {
      $.ajax = originalAjax;
    }

    assert.strictEqual(citationIdentifier.authority.date.length, 2);
  });
});
