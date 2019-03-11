import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | md help', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{md-help}}`);

    assert.ok(find('*').textContent
      .indexOf('Lorem ipsum' > 0));

    // Template block usage:
    await render(hbs `
      {{#md-help}}
        template block text
      {{/md-help}}
    `);

    assert.ok(find('*').textContent
      .trim()
      .indexOf('template block text' > 0));
  });
});
