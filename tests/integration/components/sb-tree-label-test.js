import {
  find,
  render,
  triggerEvent
} from '@ember/test-helpers';
import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | sb tree label', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', {
      definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
      hideCheck: false,
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
    })
    await render(hbs`{{sb-tree-label model=this.model}}`);

    assert.equal(find('.tree-cell').innerText.trim(), 'Data Management Strategy : test Parent Id: None --');
  });

  test('mouseEnter does not crash when model._record is absent', async function (assert) {
    // A real SbTreeNode (lib/mdeditor-sciencebase/addon/utils/sb-tree-node.js)
    // defaults `_record: null` until its ScienceBase XHR resolves, so
    // model._record can be null/undefined when the user hovers a still-loading
    // row - matching this plain-object model, which has no `_record` key at
    // all.
    this.set('model', {
      label: 'Loading row',
      sbId: 'test',
    });

    await render(hbs`{{sb-tree-label model=this.model}}`);
    await triggerEvent('.tree-cell', 'mouseenter');

    assert.equal(find('.tree-cell').innerText.trim(), 'Loading row : test Parent Id: None --');
  });
});
