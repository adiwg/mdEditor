import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md spotlight', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    var spotlight = this.owner.lookup('service:spotlight');
    var scope = {
      foo: 'bar'
    };
    var close = function () {
      assert.equal(this.foo, 'bar', 'calls close action');
    };

    await render(hbs`<div id="foo">foobar</div>
      {{control/md-spotlight}}`);

    spotlight.setTarget('foo', close, scope);

    assert.ok(document.querySelector('.md-modal-overlay'), 'render overlay');
    assert.dom('#foo').hasText('foobar', 'render target');
    assert.dom('#foo').hasClass('md-spotlight-target', 'adds class');

    spotlight.setTarget('foo');
  });
});
