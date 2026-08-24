import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import config from 'mdeditor/config/environment';
import Service from '@ember/service';
import { A } from '@ember/array';

module('Integration | Component | layout/nav/record/nav-main', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.foo = function () {};
    this.profileId = config.APP.defaultProfileId;

    // Provide the "Full" profile so the select shows the correct value
    this.owner.register('service:custom-profile', Service.extend({
      profiles: A([{
        id: config.APP.defaultProfileId,
        title: 'Full',
        description: 'The full metadata profile'
      }]),
      active: null,
      getActiveProfile() { return null; }
    }));

    await render(hbs`{{layout/nav/record/nav-main}}
    {{to-elsewhere named="record-nav" send=(component "input/md-select-profile" value=this.profileId updateProfile=this.foo)}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Translate|Profile|Full|?|');

    // Template block usage:
    await render(hbs`
      {{#layout/nav/record/nav-main}}
        template block text
      {{/layout/nav/record/nav-main}}
    `);

    assert.equal(this.element.textContent.trim(), 'Translate');
  });
});
