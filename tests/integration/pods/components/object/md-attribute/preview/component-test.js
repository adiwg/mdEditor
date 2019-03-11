import { find, render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md attribute/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      "allowNull": false,
      "attributeReference": {
        "title": "Producer defined"
      },
      "valueRange": [{
        "minRangeValue": "0",
        "maxRangeValue": "0.XXXXXX"
      }],
      "commonName": "20XX_pyes.tif",
      "codeName": "20XX_pyes.tif",
      "definition": "The predicted annual probability that beach mice presence is Yes in 20XX.",
      "mustBeUnique": true,
      "units": "annual probability that beach mice presence is Yes",
      "isCaseSensitive": false,
      "minValue": "0",
      "maxValue": "0.XXXXXX",
      "dataType": "float"
    });

    await render(hbs`<div class="testme">{{object/md-attribute/preview model=model profilePath="foobar"}}</div>`);

    assert.equal(find('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|float|?|×|');
    assert.equal(findAll('.testme input').length, 3, 'render inputs');
    assert.ok(find('.testme .md-select'), 'render select');
  });
});
