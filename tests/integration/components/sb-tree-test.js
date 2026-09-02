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
import EmberObject from '@ember/object';
import { A } from '@ember/array';

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

    await render(hbs`{{sb-tree model=this.model labelComponent="sb-tree-label"}}`);
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

  test('handleDrop returns early without crashing when a node is dropped onto itself', function (assert) {
    const component = this.owner.factoryFor('component:sb-tree').create();

    let obj = EmberObject.create({ model: { id: 'same-id' } });
    let opts = { target: EmberObject.create({ model: { id: 'same-id' } }) };

    component.handleDrop(obj, opts);

    assert.strictEqual(obj.model.id, 'same-id', 'dragged node model is untouched');
  });

  test('handleDrop does not crash when the drop target has no model (e.g. dropped outside a valid row)', function (assert) {
    const component = this.owner.factoryFor('component:sb-tree').create();

    // The dragged node's own _record must be a real EmberObject - record.get()/
    // record.notifyPropertyChange() are called directly (unconverted, not
    // flagged by no-get) further down in handleDrop.
    let draggedRecord = EmberObject.create({
      parentIds: A([{ identifier: 'old-parent', namespace: 'gov.sciencebase.catalog' }]),
    });
    let obj = EmberObject.create({
      model: { id: 'dragged-id', _record: draggedRecord },
      nodeDepth: 1,
      path: A(),
      selected: A(),
    });
    // opts.target has no `model` at all - this is the case the optional
    // chaining added to `newParent.model?._record`/`newParent.model?.isRoot`
    // (and the `opts.target.model?.id` guard-clause check) has to survive
    // without throwing.
    let opts = { target: EmberObject.create({}) };

    component.handleDrop(obj, opts);

    assert.true(
      draggedRecord.get('_dropped'),
      'falls back to flashing the dragged node itself as dropped when the target has no resolvable _record'
    );
  });
});
