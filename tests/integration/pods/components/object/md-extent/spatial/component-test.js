import { click, doubleClick, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md extent/spatial', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(6);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.deleteFeatures = function () {
      assert.ok(true, 'call delete');
    };
    this.editFeatures = function (val) {
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

    await render(hbs`{{object/md-extent/spatial
      extent=this.extent
      index=9
      deleteFeatures=this.deleteFeatures
      editFeatures=this.editFeatures
      profilePath="foobar"
    }}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+-|Terrain|FeaturesLeaflet|'
    );

    await click('.btn-primary');

    assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox),
      JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');

    await doubleClick('.btn-danger');

    assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox),
      JSON.stringify({
        "northLatitude": null,
        "southLatitude": null,
        "eastLongitude": null,
        "westLongitude": null,
        "minimumAltitude": null,
        "maximumAltitude": null,
        "unitsOfAltitude": null
      }), 'clearBox');

    await click('.btn-toolbar .btn-success');
    await doubleClick('.btn-toolbar .btn-danger');

    this.empty = { geographicExtent: [{}] };
    // Template block usage:
    await render(hbs`
      {{#object/md-extent/spatial extent=this.empty profilePath="foobar"
}}
        template block text
      {{/object/md-extent/spatial}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|',
      'block');
  });
});
