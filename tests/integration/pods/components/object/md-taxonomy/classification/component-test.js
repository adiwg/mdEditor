import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/classification', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0].taxonomicClassification;

    await render(hbs`{{object/md-taxonomy/classification model=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|Kingdom|Animalia|(202423)|Edit|Delete|Subkingdom|Radiata|(914153)|Edit|Delete|Phylum|Cnidaria|(48738)|Edit|Delete|Subphylum|Medusozoa|(718920)|Edit|Delete|Class|Scyphozoa|(51483)|Edit|Delete|Subclass|Discomedusae|(718923)|Edit|Delete|Order|Rhizostomeae|(51756)|Edit|Delete|Family|Rhizostomatidae|(51911)|Edit|Delete|Genus|Rhopilema|(51919)|Edit|Delete|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|');

    await render(hbs`{{object/md-taxonomy/classification model=model preview=true}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/classification}}
        template block text
      {{/object/md-taxonomy/classification}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|No|Classification|found.|',
      'block');
  });
});
