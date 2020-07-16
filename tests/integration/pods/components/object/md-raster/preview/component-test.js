import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { parseInput, formatContent } from 'mdeditor/tests/helpers/md-helpers';

module('Integration | Component | object/md-raster/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.model = {
      "coverageName": "coverageName",
      "coverageDescription": "coverageDescription"
    }

    let input = Object.values(this.model).join('|')

    await render(hbs`{{object/md-raster/preview profilePath="foobar" model=model}}`);
    await this.pauseTest()

    assert.equal(formatContent(this.element).trim(),
      '|Raster|Name|Raster|Description|', 'md-raster-preview component renders'
    );

    assert.equal(parseInput(this.element), input, 'md-raster-preview inputs renders');
  });
});
