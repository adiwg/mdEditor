import { find, render } from '@ember/test-helpers';
import { module, test, todo} from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | control/md import csv', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Set any properties with this.set('myProperty', 'value');
    this.set('progress', 0);
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{control/md-import-csv}}`);

    assert.equal(find('.md-import-picker').textContent.trim(), 'Click or Drop a CSV here.');

    await render(hbs`{{control/md-import-csv isProcessing=true progress=progress}}`);

    assert.equal(find('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Processing...|Stop|0%|Complete|', 'renders progressbar');

    this.set('progress', 57);

    assert.equal(find('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(),
    '|Processing...|Stop|57%|Complete|', 'updates progressbar');
  });

  todo('upload csv', async function(assert) {
      assert.ok();
  });
});
