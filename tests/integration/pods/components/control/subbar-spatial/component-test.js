import { click, doubleClick, find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/subbar spatial', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs `{{control/subbar-spatial class="testme"}}`);

    assert.equal(find('.testme').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|'
    );

    // Template block usage:
    await render(hbs `
      {{#control/subbar-spatial class="testme"}}
        template block text
      {{/control/subbar-spatial}}
    `);

    assert.equal(find('.testme').textContent
      .replace(/[ \n]+/g, '|')
      .trim(),
      '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|template|block|text|'
    );
  });

  test('fire actions', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    assert.expect(5);

    this.setProperties({
      test1: function () { assert.ok(true, 'called zoomAll'); },
      test2: function () { assert.ok(true, 'called uploadData'); },
      test3: function () { assert.ok(true, 'called exportGeoJSON'); },
      test4: function () {
        assert.ok(true,
          'called deleteAllFeatures');
      },
      test5: function () { assert.ok(true, 'called toList'); }
    });

    await render(hbs `{{control/subbar-spatial
      zoomAll=test1
      uploadData=test2
      exportGeoJSON=test3
      deleteAllFeatures=test4
      toList=test5
    }}`);

    findAll('button').forEach(async btn => await click(btn));
    await doubleClick('.btn-danger');
  });
});
