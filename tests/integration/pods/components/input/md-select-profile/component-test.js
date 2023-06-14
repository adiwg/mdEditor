import { find, findAll, render, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from 'ember-power-select/test-support/helpers';
import config from 'mdeditor/config/environment';

module('Integration | Component | input/md select profile', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // test dummy for the external profile action
    this.set('updateProfile', () => {});
    this.set('profileId', config.APP.defaultProfileId);

    await render(hbs`{{input/md-select-profile
      value=profileId
      updateProfile=updateProfile
      class="testme"
    }}`);

    assert.equal(
      find('.testme').textContent.replace(/[ \n]+/g, '|'),
      '|Profile|Full|?|'
    );
  });

  test('should trigger external action on change', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

    // test dummy for the external profile action
    this.set('updateProfile', (actual) => {
      assert.equal(
        actual,
        config.APP.defaultProfileId,
        'submitted value is passed to external action'
      );
    });

    await render(
      hbs`{{input/md-select-profile value=null updateProfile=(action updateProfile)}}`
    );

    // select a value and force an onchange
    await clickTrigger();
    await triggerEvent(
      findAll('.ember-power-select-option .select-value').findBy(
        'innerText',
        'Full'
      ),
      'mouseup'
    );
  });
});
