import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/collection/system/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0].taxonomicSystem[0];

    await render(hbs`{{object/md-taxonomy/collection/system/preview model=model profilePath="foobar"}}`);

    var input = findAll('input, textarea').mapBy('value').join('|');

    assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/collection/system/preview model=(hash) profilePath="foobar"}}
        template block text
      {{/object/md-taxonomy/collection/system/preview}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|");
  });
});
