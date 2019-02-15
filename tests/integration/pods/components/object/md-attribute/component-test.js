import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md attribute', function(hooks) {
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

    await render(hbs`{{object/md-attribute model=model profilePath="foobar"}}`);

    assert.equal(find('.md-card').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Attribute|Information|Code|Name|Definition|Data|Type|float|?|floating|point|numbers|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|0|Add|Alias|Add|Alias|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|');

    // Template block usage:
    await render(hbs`
      {{#object/md-attribute model=model profilePath="foobar"}}
        template block text
      {{/object/md-attribute}}
    `);

    assert.equal(find('.md-card').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Attribute|Information|Code|Name|Definition|Data|Type|float|?|floating|point|numbers|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|0|Add|Alias|Add|Alias|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|',
      'block'
    );
  });
});
