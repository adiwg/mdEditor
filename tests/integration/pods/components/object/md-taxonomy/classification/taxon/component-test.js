import { render, click, waitFor } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/classification/taxon', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(7);
    this.model = createTaxonomy()[0].taxonomicClassification[0];

    this.delete = function(taxa){
        assert.ok(taxa, 'called delete');
    };

    await render(hbs`{{object/md-taxonomy/classification/taxon model=this.model deleteTaxa=this.delete top=this.top profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|');
      // await click('.btn-info');

    await click('.btn-success');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|',
      'edit'
    );

    await click('.md-taxon-form footer .btn-info');

    await click('.btn-danger');
    await click('.btn-danger');

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|');

    await click('.md-taxon .md-taxon .btn-info');

    await waitFor('.md-taxon-form', { timeout: 2000, count: 1 });

    assert.dom('.md-taxon-body').isVisible({count:4});
    assert.dom('.md-taxon-body.md-spotlight-target').isVisible();

    await click('.md-taxon-form footer .btn-info');

    // Template block usage — use fresh model to avoid mutation state from above
    this.freshModel = createTaxonomy()[0].taxonomicClassification[0];
    await render(hbs`
      <Object::MdTaxonomy::Classification::Taxon @model={{this.freshModel}} @profilePath="foobar">
        template block text
      </Object::MdTaxonomy::Classification::Taxon>
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|',
      'block');
  });
});
