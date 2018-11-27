import { click, find, render } from '@ember/test-helpers';
import Route from '@ember/routing/route';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar thesaurus', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{control/subbar-thesaurus}}`);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'), '|Back|to|List|');

    // Template block usage:
    await render(hbs `
      {{#control/subbar-thesaurus}}
        template block text
      {{/control/subbar-thesaurus}}
    `);

    assert.equal(find('*').textContent
      .replace(/[ \n]+/g, '|'),
      '|Back|to|List|template|block|text|template|block|text|');
  });

  test('fire actions', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(1);

    var FakeRoute = Route.extend({
      actions: {
        toList: function () {
          assert.ok(true, 'calls toList action');
        }
      }
    });

    this.actions.getContext = function () {
      return new FakeRoute();
    };

    await render(hbs `{{control/subbar-thesaurus context=(action "getContext")}}`);

    await click('button');
  });
});
