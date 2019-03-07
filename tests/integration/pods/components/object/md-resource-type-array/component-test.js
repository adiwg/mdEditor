import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md resource type array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.rt = [{
      "type": "project",
      "name": "foobar"
    }, {
      "type": "map"
    }];

    await render(hbs`{{object/md-resource-type-array value=rt}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Resource|Types|2|Add|#|Type|Name|0|project|?|×|Delete|1|map|?|×|Delete|');

    // Template block usage:
    await render(hbs`
      {{#object/md-resource-type-array}}
        template block text
      {{/object/md-resource-type-array}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Resource|Types|Add|#|Type|Name|Add|Resource|Type|',
      'block');
  });
});
