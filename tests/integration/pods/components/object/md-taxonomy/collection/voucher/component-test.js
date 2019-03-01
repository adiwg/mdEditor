import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/collection/voucher', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0].voucher[0];

    await render(hbs`{{object/md-taxonomy/collection/voucher profilePath="foobar" model=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Specimen|Repository|Role|custodian|?|party|that|accepts|accountability|and|responsibility|for|the|data|and|ensures|appropriate|care|and|maintenance|of|the|resource|×|Contacts|');

    var input = findAll('input, textarea').mapBy('value').join('|');

    assert.equal(input, "Specimen|", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/collection/voucher profilePath="foobar" model=(hash repository=(hash))}}
        template block text
      {{/object/md-taxonomy/collection/voucher}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      "|Specimen|Repository|Role|Select|or|enter|a|role|This|field|can't|be|blank|Contacts|At|least|one|contact|is|required.|",
      'block');
  });
});
