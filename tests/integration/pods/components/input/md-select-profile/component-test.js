import { find, render, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from 'ember-power-select/test-support/helpers';

module('Integration | Component | input/md select profile', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // test dummy for the external profile action
    this.set('updateProfile', () => {});

    await render(hbs `{{input/md-select-profile
      value="full"
      updateProfile=updateProfile
      class="testme"
    }}`);

    assert.equal(find('.testme').textContent
      .replace(/[ \n]+/g, '|'), '|Profile|full|?|');
  });

  test('should trigger external action on change', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('updateProfile', (actual) => {
      assert.equal(actual, 'basic',
        'submitted value is passed to external action');
    });

    await render(hbs `{{input/md-select-profile value=full updateProfile=(action updateProfile)}}`);

    // select a value and force an onchange
    await clickTrigger();
    await triggerEvent(find('.ember-power-select-option'),'mouseup');
  });
});
