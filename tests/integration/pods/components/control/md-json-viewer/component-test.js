import { find, render } from '@ember/test-helpers';
/* global $ */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md json viewer', function (hooks) {
  setupRenderingTest(hooks);

  test('render json modal', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar',
    });

    await render(hbs`{{control/md-json-viewer json=json}}`);

    assert.equal($('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
  });

  test('render json viewer', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar',
    });

    await render(hbs`{{control/md-json-viewer json=json modal=false}}`);

    assert.equal(find('.md-json-viewer').textContent.trim(), '{"foo": "bar"}');
  });
});
