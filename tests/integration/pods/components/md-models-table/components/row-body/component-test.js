import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md-models-table/components/row-body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('myAction', function() {
      assert.ok(true, 'call collapseRow');
    });

    await render(hbs`{{md-models-table/components/row-body collapseRow=this.myAction}}`);
  });

  test('collapse() does not crash when collapseRow was never provided', function (assert) {
    // In production this fires when spotlight.js's closeTask runs against
    // whichever row-body last registered itself as the (singleton) spotlight
    // target - see spotlight.js's setTarget(): every row-body's
    // didInsertElement overwrites the same onClose/scope slot (row-body/
    // template.hbs's liquid-if guard that would limit this to only the
    // expanded row is commented out), so willDestroyElement -> close() can
    // end up invoking collapse() against a row-body whose own collapseRow
    // was never wired up the way the one being destroyed expects.
    // Reproducing the exact async timing that triggers this via spotlight's
    // ember-concurrency task proved unreliable in tests (its `{drop: true}`
    // task scheduling didn't surface the crash synchronously even across
    // several attempts), so this calls the guarded method directly instead -
    // the observed production error ("this.collapseRow is not a function")
    // is exactly what an unguarded call throws with collapseRow unset.
    const component = this.owner
      .factoryFor('component:md-models-table/components/row-body')
      .create();

    // `element` is a getter-only property on classic components, so it
    // can't be passed via `.create({...})` - override it directly.
    Object.defineProperty(component, 'element', {
      value: { classList: { add() {} } },
    });

    component.collapse();

    assert.ok(true, 'collapse() completed without throwing');
  });
});
