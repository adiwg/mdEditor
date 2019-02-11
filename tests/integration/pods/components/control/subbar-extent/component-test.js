import { click, find, render } from '@ember/test-helpers';
import Route from '@ember/routing/route';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar extent', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{control/subbar-extent}}`);

    assert.equal(find('.btn-success').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Add|Geographic|Extent');

    // Template block usage:
    await render(hbs `
      {{#control/subbar-extent}}
        template block text
      {{/control/subbar-extent}}
    `);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Add|Geographic|Extent|template|block|text|'
    );
  });

  test('fire actions', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Route.extend({
      actions: {
        addExtent: function () {
          assert.ok(true, 'calls addExtent action');
        }
      }
    });

    this.set('context', function () {
      return new FakeRoute();
    });

    await render(hbs `{{control/subbar-extent context=context}}`);

    await click('button');
  });
});
