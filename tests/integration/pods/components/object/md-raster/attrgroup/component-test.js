import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-raster/attrgroup', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{object/md-raster/attrgroup }}`);


    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Item|found.|Add|Item|', 'attrgroup component renders'
    );
  });
});
