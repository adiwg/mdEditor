import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md graphic array', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('graphic', [{
      "fileName": "fileName",
      "fileDescription": "fileDescription",
      "fileType": "fileType",
      "fileUri": [{
        "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      }]
    }, {
      "fileName": "fileName1",
      "fileDescription": "fileDescription1",
      "fileType": "fileType1",
      "fileUri": [{
        "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      }]
    }]);


    await render(hbs`{{object/md-graphic-array model=graphic}}`);

    assert.equal(find('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|');
    assert.ok(find('.md-logo-preview').complete, 'loaded image');

    // Template block usage:
    await render(hbs`
      {{#object/md-graphic-array model=graphic}}
        template block text
      {{/object/md-graphic-array}}
    `);

    assert.equal(find('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|',
      'block');
  });
});
