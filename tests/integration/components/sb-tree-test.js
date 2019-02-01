import {
  find,
  findAll,
  render
} from '@ember/test-helpers';
import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sb tree', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', [{
      children: [{
        definition: 'Child 1.',
        hideCheck: false,
        icon: 'globe',
        id: '4ebb8fe5-f88f-49a4-9964-1',
        identifier: '4ebb8fe5-f88f-49a4-9964-1',
        isSelected: false,
        label: 'Child 1',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test1',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'map',
        uuid: '4ebb8fe5-f88f-49a4-9964-1'
      }],
      definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
      hideCheck: false,
      isExpanded: true,
      isRoot: true,
      icon: 'android',
      id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
      identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
      isSelected: false,
      label: 'Data Management Strategy',
      nodeClass: 'tree-node-rooted',
      notSelectable: false,
      sbDate: null,
      sbId: 'test',
      sbParentId: null,
      sbParentIdObj: undefined,
      sortOrder: 0,
      type: 'application',
      uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
    }])

    await render(hbs `{{sb-tree model=model labelComponent="sb-tree-label"}}`);
    assert.equal(find('.tree-trunk').innerText
      .replace(/[\s\t]/g, '\n')
      .trim()
      .replace(/[ \n]+/g, '|'),
      'Data|Management|Strategy|:|test|?|Child|1|:|test1|Parent|Id:|None|--|?');

    assert.equal(findAll('.tree-branch')[1].innerText
      .replace(/[\s\t]/g, '\n')
      .trim()
      .replace(/[ \n]+/g, '|'),
      'Child|1|:|test1|Parent|Id:|None|--|?');
  });
});
