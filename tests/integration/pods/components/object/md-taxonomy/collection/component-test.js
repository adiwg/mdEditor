import { render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/collection', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0];

    await render(hbs`{{object/md-taxonomy/collection model=model profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Taxonomic|System|1|Add|OK|#|Title|Modifications|0|More...|Delete|OK|Classification|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|Observers|1|Add|#|Role|Contacts|0|pointOfContact|?|×|Delete|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|1|Add|OK|#|Specimen|0|Specimen|Edit|Delete|OK|'
  );

    var input = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications||Scope|Id Procedure|Id Completeness", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/collection profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-taxonomy/collection}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Taxonomic|System|found.|Add|Taxonomic|System|Classification|No|Classification|found.|Observers|0|Add|#|Role|Contacts|Add|Observer|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|0|Add|OK|#|Specimen|Add|Voucher|OK|',
      'block');
  });
});
