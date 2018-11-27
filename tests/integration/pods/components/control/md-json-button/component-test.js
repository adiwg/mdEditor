import { click, find, render } from '@ember/test-helpers';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md json button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    await render(hbs `{{control/md-json-button}}`);

    assert.equal(find('*').textContent
      .trim(), 'Preview JSON');

    // Template block usage:
    await render(hbs `
      {{#control/md-json-button}}
        template block text
      {{/control/md-json-button}}
    `);

    assert.equal(find('*').textContent
      .trim(), 'template block text');
  });

  test('render json modal', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    await render(hbs `{{control/md-json-button json=json}}`);

  await click('button');

    assert.equal($('.md-jsmodal-container')
      .text()
      .trim(), '{"foo": "bar"}');
  });
});
