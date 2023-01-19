import { find, findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md bbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('model', {
      "westLongitude": -87.52179241764053,
      "eastLongitude": -85.30119385960293,
      "southLatitude": 29.640690610830635,
      "northLatitude": 30.42485959910817
    });

    await render(hbs`{{object/md-bbox profilePath="foobar" model=model}}`);

    assert.equal(find('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|');

    var inputs = findAll('input');
    assert.equal(inputs[0].value, this.model.northLatitude, 'north');
    assert.equal(inputs[1].value, this.model.eastLongitude, 'east');
    assert.equal(inputs[2].value, this.model.southLatitude, 'south');
    assert.equal(inputs[3].value, this.model.westLongitude, 'west');

    // Template block usage:
    await render(hbs`
      {{#object/md-bbox profilePath="foobar" model=model}}
        template block text
      {{/object/md-bbox}}
    `);

    assert.equal(find('.form').textContent.replace(/[ \n]+/g, '|').trim(),
      '|North|East|South|West|template|block|text|', 'block');
  });
});
