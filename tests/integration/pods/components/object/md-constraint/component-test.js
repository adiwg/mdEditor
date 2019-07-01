import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md constraint', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('model',{});

    await render(hbs`{{object/md-constraint profilePath="foobar" model=model}}`);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Constraint|Type|The|type|of|constraint.|Use|Limitations|0|Add|Add|Use|Limitations|Legal|Access|Constraints|Use|Constraints|Other|Constraints|0|Add|Other|Constraint|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Graphic|or|Logo|0|Add|OK|Add|Graphic|');

    // Template block usage:
    await render(hbs`
      {{#object/md-constraint profilePath="foobar" model=model}}
        template block text
      {{/object/md-constraint}}
    `);

    assert.equal(find('form').textContent.replace(/[ \n]+/g, '|').trim(),
      "|Constraint|Type|The|type|of|constraint.|Use|Limitations|0|Add|Add|Use|Limitations|Legal|Access|Constraints|Use|Constraints|Other|Constraints|0|Add|Other|Constraint|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Graphic|or|Logo|0|Add|OK|Add|Graphic|template|block|text|",
      'block');
  });
});
