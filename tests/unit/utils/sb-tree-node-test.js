import sbTreeNode from 'mdeditor/utils/sb-tree-node';
import { module, test } from 'qunit';

module('Unit | Utility | sb tree node', function () {
  test('it works', function (assert) {
    assert.expect(2);

    let result = sbTreeNode.create({
      _record: {
        recordId: 'theid',
      },
      //config: this.get('config')
    });

    assert.equal(result.uuid, 'theid');
    assert.equal(result.uuid, result.identifier, 'set ids');
  });
});
