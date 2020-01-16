import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md domain', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    this.set('domain', {
      "domainId": "domainId0",
      "commonName": "commonName",
      "codeName": "codeName",
      "description": "description",
      "domainItem": [{
        "name": "name0",
        "value": "value0",
        "definition": "definition0"
      }]
    });


    await render(hbs`{{object/md-domain profilePath="foobar" model=domain}}`);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|');

    // Template block usage:
    await render(hbs`
      {{#object/md-domain profilePath="foobar" model=domain}}
        template block text
      {{/object/md-domain}}
    `);

    assert.equal(find('form').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|',
      'block');
  });
});
