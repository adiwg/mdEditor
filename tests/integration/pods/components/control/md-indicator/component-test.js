import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1)
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    // this.set('icon', 'sticky-note')

    await render(hbs`{{control/md-indicator
      icon="sticky-note"
      title="Hello"
      note="This is a warning"
      type="danger"}}
      `);


    assert.equal(this.element.textContent.trim(), '');

    //!Need help with the selector for the mdIndicator to test the triggerEvent
    //!What assertions need to be represented
    // await triggerEvent('myIcon', 'mouseEnter')

  });
});
