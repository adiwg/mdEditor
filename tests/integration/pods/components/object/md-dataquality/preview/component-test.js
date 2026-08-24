import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md dataquality/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('dq', {
      'scope': {
        'scopeCode': 'dataset'
      },
      'systemIdentifier': {
        'label': 'My Quality System'
      }
    });

    await render(hbs`<section>{{object/md-dataquality/preview item=this.dq index=0}}</section>`);

    assert.ok(find('section'), 'component renders');
    assert.dom('section .text-info').hasText('Data Quality #0', 'renders index heading');
    assert.ok(
      find('section').textContent.indexOf('dataset') > -1,
      'renders scope code'
    );
    assert.ok(
      find('section').textContent.indexOf('My Quality System') > -1,
      'renders system identifier label'
    );

    // Template block usage:
    await render(hbs`<section>
      <Object::MdDataquality::Preview @item={{hash}} @index={{1}}>
        template block text
      </Object::MdDataquality::Preview></section>
    `);

    assert.dom('section .text-info').hasText('Data Quality #1', 'block form renders heading');
  });
});
