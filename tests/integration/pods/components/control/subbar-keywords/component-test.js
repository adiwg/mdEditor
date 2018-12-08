import { click, find, render } from '@ember/test-helpers';
import Route from '@ember/routing/route';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar keywords', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{control/subbar-keywords}}`);

    assert.equal(find('button').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Add|Thesaurus');

    // Template block usage:
    await render(hbs `
      {{#control/subbar-keywords}}
        template block text
      {{/control/subbar-keywords}}
    `);

    assert.equal(find('.ember-view').textContent
      .replace(/[ \n]+/g, '|')
      .trim(), '|Add|Thesaurus|template|block|text|');
  });

  test('fire actions', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Route.extend({
      actions: {
        addThesaurus: function () {
          assert.ok(true, 'calls addThesaurus action');
          return false;
        }
      }
    });

    this.actions.getContext = function () {
      return new FakeRoute();
    };

    await render(hbs `{{control/subbar-keywords context=(action "getContext")}}`);

    await click('button');
  });
});
