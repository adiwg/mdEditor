import { click, doubleClick, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md spatial extent', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.deleteExtent = function (val) {
      assert.equal(val, 9, 'call delete');
    };
    this.editExtent = function (val) {
      assert.equal(val, 9, 'call edit');
    };

    this.extent = {
      "geographicExtent": [{
        // "boundingBox": {
        //   "northLatitude": 34.741612,
        //   "southLatitude": 32.472695,
        //   "eastLongitude": -116.542054,
        //   "westLongitude": -117.729264
        // },
        "geographicElement": [{
          "type": "Feature",
          "id": "3843b29f-bec7-418d-919a-4f794ce749cf",
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -116.542054, 32.472695
                ],
                [
                  -117.596742, 34.741612
                ],
                [
                  -117.596742, 34.741612
                ],
                [
                  -117.729264, 32.805745
                ],
                [
                  -117.729264, 32.805745
                ],
                [
                  -116.542054, 32.472695
                ]
              ]
            ]
          },
          "properties": {
            "name": "New Feature"
          }
        }]
      }]
    };

    await render(hbs`{{object/md-spatial-extent
      extent=extent
      index=9
      deleteExtent=deleteExtent
      editExtent=editExtent
    }}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Geographic|Extent|#9|Edit|Extent|Features|Delete|Extent|Bounding|Box|North|East|South|West|Calculate|Description|+−|Terrain|FeaturesLeaflet|');

    await click('.btn-primary');

    assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox),
      JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');

      await click('.btn-success');
      await doubleClick('.btn-danger');

    this.empty = {geographicExtent:[{}]};
    // Template block usage:
    await render(hbs`
      {{#object/md-spatial-extent extent=empty}}
        template block text
      {{/object/md-spatial-extent}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Geographic|Extent|#|Edit|Extent|Features|Delete|Extent|Bounding|Box|North|East|South|West|Description|No|Features|to|display.|',
      'block');
  });
});
