import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from 'mdeditor/config/environment';

module('Integration | Component | layout/nav/record/nav-main', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.foo = function () {};
    this.profileId = config.APP.defaultProfileId;

    await render(hbs `{{layout/nav/record/nav-main}}
    {{to-elsewhere named="record-nav" send=(component "input/md-select-profile" value=profileId updateProfile=this.foo)}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Translate|Profile|Full|?|');

    // Template block usage:
    await render(hbs `
      {{#layout/nav/record/nav-main}}
        template block text
      {{/layout/nav/record/nav-main}}
    `);

    assert.equal(this.element.textContent.trim(), 'Translate');
  });
});
