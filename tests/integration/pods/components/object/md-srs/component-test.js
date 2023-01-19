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
      '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');


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
