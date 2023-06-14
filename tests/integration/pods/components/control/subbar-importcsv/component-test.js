import { find, render, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Route from '@ember/routing/route';

module('Integration | Component | control/subbar importcsv', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);
    // Set any properties with this.set('myProperty', 'value');
    var Target = Route.extend({
      actions: {
        doImport() {
          assert.ok(true, 'calls target action');
        },
      },
    });

    this.set('foo', Target.create({}));

    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(
      hbs`{{control/subbar-importcsv class="importcsv" actionContext=foo}}`
    );

    assert.equal(
      find('.importcsv')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Do|Import|Cancel|Import|'
    );

    click('.importcsv .btn-info');

    // Template block usage:
    await render(hbs`
      {{#control/subbar-importcsv class="importcsv"}}
        template block text
      {{/control/subbar-importcsv}}
    `);

    assert.equal(
      find('.importcsv')
        .textContent.replace(/[ \n]+/g, '|')
        .trim(),
      '|Do|Import|Cancel|Import|template|block|text|',
      'block'
    );
  });
});
