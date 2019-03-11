import { render, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md spatial resolution', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = {
      "scaleFactor": {
        scaleFactor: 99999
      },
      "measure": {
        "measure": {
          "type": "distance",
          "value": 99.9,
          "unitOfMeasure": "unitOfMeasure"
        }
      },
      "levelOfDetail": {
        levelOfDetail: "levelOfDetail"
      },
      "geographicResolution": {
        geographicResolution: {
          "latitudeResolution": 9.9,
          "longitudeResolution": 9.9,
          "unitOfMeasure": "unitOfMeasure"
        }
      },
      "bearingDistanceResolution": {
        bearingDistanceResolution: {
          "distanceResolution": 9.9,
          "distanceUnitOfMeasure": "",
          "bearingResolution": 9.9,
          "bearingUnitOfMeasure": "",
          "bearingReferenceDirection": "north",
          "bearingReferenceMeridian": "assumed"
        }
      },
      "coordinateResolution": {
        coordinateResolution: {
          "abscissaResolutionX": 9.9,
          "ordinateResolutionY": 9.9,
          "unitOfMeasure": "unitOfMeasure"
        }
      }
    };

    var empty = "Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|";

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.scaleFactor}}`);

    assert.equal(findAll('.md-input-input input')[0].value, this.model.scaleFactor.scaleFactor, 'scaleFactor');
    assert.ok(findAll('.md-input-input input')[1].disabled, 'level disabled');
    assert.ok(findAll('.md-input-input input')[2].disabled, 'measure disabled');

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.measure}}`);

    assert.equal(findAll('.md-input-input input')[2].value, this.model.measure.measure.value, 'measure');
    assert.ok(findAll('.md-input-input input')[1].disabled, 'level disabled');
    assert.ok(findAll('.md-input-input input')[0].disabled, 'scaleFactor disabled');

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.levelOfDetail}}`);

    assert.equal(findAll('.md-input-input input')[1].value, this.model.levelOfDetail.levelOfDetail, 'levelOfDetail');
    assert.ok(findAll('.md-input-input input')[2].disabled, 'measure disabled');
    assert.ok(findAll('.md-input-input input')[0].disabled, 'scaleFactor disabled');

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.geographicResolution}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'geographicResolution');

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.bearingDistanceResolution}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'bearingDistanceResolution');

    await render(hbs`{{object/md-spatial-resolution profilePath="foobar" model=model.coordinateResolution}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'coordinateResolution');

    // Template block usage:
    await render(hbs`
      {{#object/md-spatial-resolution model=(hash) profilePath="foobar"}}
        template block text
      {{/object/md-spatial-resolution}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|' + empty + 'template|block|text|', 'block');
  });
});
