import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md srs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.srs = {
      "referenceSystemType": "projected",
      "referenceSystemIdentifier": {
        "identifier": "identifier",
        "version": "version",
        "description": "description"
      }
    };

    await render(hbs`{{object/md-srs profilePath="foobar" model=srs}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|');


    var input = findAll('input, textarea').mapBy('value').join('|');

    assert.equal(input,'identifier|version|description|', 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-srs profilePath="foobar"}}
        template block text
      {{/object/md-srs}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Reference|System|Type|Select|type|of|reference|system|used.|template|block|text|",
      'block');
  });
});
