import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md address/md address block', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    this.set('address', {
      "addressType": [
        "mailing",
        "physical"
      ],
      "description": "description",
      "deliveryPoint": [
        "deliveryPoint0",
        "deliveryPoint1"
      ],
      "city": "city",
      "administrativeArea": "administrativeArea",
      "postalCode": "postalCode",
      "country": "country"
    });

    await render(hbs`{{object/md-address/md-address-block item=address}}`);

    assert.equal(find('address').textContent.replace(/[ \n]+/g, '|').trim(),
      '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');

    // Template block usage:
    await render(hbs`
      {{#object/md-address/md-address-block item=address}}
        template block text
      {{/object/md-address/md-address-block}}
    `);

    assert.equal(find('address').textContent.replace(/[ \n]+/g, '|').trim(),
      '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');
  });
});
