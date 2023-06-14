import { render, click, find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0];

    await render(
      hbs`{{object/md-taxonomy model=model index=0 profilePath="foobar"}}`
    );

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Collection|#0:|Integrated|Taxonomic|Information|System|(ITIS)|Edit|Collection|Delete|Collection|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|'
    );

    await click('li .icon');

    assert.equal(
      find('li')
        .textContent.replace(/[\s\n]+/g, '|')
        .trim(),
      '|Kingdom|Fungi|(555705)|Kingdom|Subkingdom|Dikarya|(936287)|Division|Basidiomycota|(623881)|'
    );

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy}}
        template block text
      {{/object/md-taxonomy}}
    `);

    assert.equal(
      this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Collection|#undefined|Edit|Collection|Delete|Collection|No|Classification|found.|',
      'block'
    );
  });
});
