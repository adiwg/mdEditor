import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md domainitem', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('item', {
      "name": "name0",
      "value": "value0",
      "definition": "definition0",
      "reference": {
        "title": "domainReference"
      }
    });

    await render(hbs `{{object/md-domainitem profilePath="foobar" model=item}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|'
    );

    // Template block usage:
    await render(hbs `
      {{#object/md-domainitem profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-domainitem}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|',
      'block');
  });
});
