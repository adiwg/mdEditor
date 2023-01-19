import { render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import createTaxonomy from 'mdeditor/tests/helpers/create-taxonomy';

module('Integration | Component | object/md taxonomy/collection/system', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = createTaxonomy()[0].taxonomicSystem[0];

    await render(hbs`{{object/md-taxonomy/collection/system model=model profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|transmitted|?|×|Delete|Edition|Presentation|Form|×|webService|?|×|webSite|?|No|Responsible|Party|found.|Add|Responsible|Party|Online|Resource|1|Add|OK|#|Name|Uri|0|ITIS|website|https://www.itis.gov|Edit|Delete|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|Other|Details|1|Add|0|Delete|Graphic|1|Add|OK|0|itis_logo.jpg:|Edit|Delete|');

    var input = findAll('form input, form textarea').mapBy('value').join('|');

    assert.equal(input, "modifications|Integrated Taxonomic Information System (ITIS)|2019-02-26|Taxa imported from ITIS||||||Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.", 'input values');

    // Template block usage:
    await render(hbs`
      {{#object/md-taxonomy/collection/system model=(hash) profilePath="foobar"}}
        template block text
      {{/object/md-taxonomy/collection/system}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Modifications|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|',
      'block');
  });
});
