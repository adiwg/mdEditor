import { click, find, render } from '@ember/test-helpers';
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

    assert.equal(find('button').textContent
      .trim(), 'Preview JSON');

    // Template block usage:
    await render(hbs `
      {{#control/md-json-button}}
        template block text
      {{/control/md-json-button}}
    `);

    assert.equal(find('button').textContent
      .trim(), 'template block text');
  });

  test('render json modal', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    await render(hbs `{{control/md-json-button json=json preview=true}}`);

    await click('button.btn');

    assert.equal(document.querySelector('.md-jsmodal-container')
      .textContent
      .trim(), '{"foo": "bar"}');
  });

  test('render json slider', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('json', {
      foo: 'bar'
    });

    await render(hbs `{{control/md-json-button json=json title="foobar"}}
      <div class="slider">
        {{#from-elsewhere name="md-slider-json" as |slider|}}
          <h3 class="text-info">{{slider.title}}</h3>
          <hr>
          {{component slider.body}}
        {{/from-elsewhere}}
      </div>`);

    await click('button.btn');

    assert.equal(find('.slider').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Viewing|JSON|for:|foobar|{"foo":|"bar"}|');
  });
});
