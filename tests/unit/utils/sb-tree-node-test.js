import sbTreeNode from 'mdeditor/utils/sb-tree-node';
import { module, test } from 'qunit';
import $ from 'jquery';
import EmberObject from '@ember/object';

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
});
