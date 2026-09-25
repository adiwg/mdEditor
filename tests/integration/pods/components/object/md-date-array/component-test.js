import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md date array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{object/md-date-array value=this.model profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|Add|#|Precision|Date|Date|Type|Description|Add|Date|');

    this.set('model', [{
      "date": "2016-10-12",
      "dateType": "dateType",
      description: 'description'
    }]);

    assert.equal(find('.panel').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|1|Add|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|Delete|',
      'item');

    // Template block usage:
    await render(hbs`
      <Object::MdDateArray @value={{this.model}} @profilePath="foobar">
        template block text
      </Object::MdDateArray>
    `);

    assert.equal(find('.panel').textContent.replace(/[ \n]+/g, '|').trim(),
      '|Dates|1|Add|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|template|block|text|Delete|',
      'block');
  });
});
