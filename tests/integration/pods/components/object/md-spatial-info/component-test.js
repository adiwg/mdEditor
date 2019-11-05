import { render } from '@ember/test-helpers';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md spatial info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.model = {
      spatialReferenceSystem: [{
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        {
          "referenceSystemType": "projected",
          "referenceSystemIdentifier": {
            "identifier": "Zone 10",
            "namespace": "UTM",
            "description": "Universal Transverse Mercator Zone 10 Seattle, Washington"
          }
        },
        {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemIdentifier": {
            "identifier": "4326",
            "namespace": "urn:ogc:def:crs:EPSG",
            "description": "epsg projection 4326 - wgs 84 - Latitude Longitude",
            "authority": {
              "title": "European Petroleum Survey Group"
            }
          }
        },
        {
          "referenceSystemType": "projected",
          "referenceSystemWKT": "PROJCS ['Wyoming 4901, Eastern Zone (1983, meters)', GEOGCS ['GRS 80', DATUM ['GRS 80', SPHEROID ['GRS 80', 6378137.000000, 298.257222]], PRIMEM ['Greenwich', 0.000000 ], UNIT ['Decimal Degree', 0.01745329251994330]], PROJECTION ['Transverse Mercator'], PARAMETER ['Scale_Factor', 0.999938], PARAMETER ['Central_Meridian', -105.166667], PARAMETER ['Latitude_Of_Origin', 40.500000], PARAMETER ['False_Easting', 200000.000000], UNIT ['Meter', 1.000000000000]]"
        },
        {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemParameterSet": {
            "geodetic": {
              "datumIdentifier": {
                "identifier": "identifier"
              },
              "ellipsoidIdentifier": {
                "identifier": "identifier"
              },
              "semiMajorAxis": 9.9,
              "axisUnits": "axisUnits",
              "denominatorOfFlatteningRatio": 9.9
            }
          }
        }
      ],
      spatialResolution: [{
          "scaleFactor": 99999
        },
        {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        {
          "levelOfDetail": "levelOfDetail"
        },
        {
          "geographicResolution": {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        {
          "bearingDistanceResolution": {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        },
        {
          "coordinateResolution": {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }
      ],
      spatialRepresentationType: ["vector", "stereoModel"]
    }


    await render(hbs`{{object/md-spatial-info profilePath="foobar" model=model}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Spatial|Representation|Type|×|stereoModel|?|×|vector|?|Spatial|Reference|System|5|Add|OK|#|Reference|System|Type|Identifier|0|referenceSystemType|identifier|Edit|Delete|1|projected|Zone|10|Edit|Delete|2|geodeticGeographic2D|4326|Edit|Delete|3|projected|Not|Defined|Edit|Delete|4|geodeticGeographic2D|Not|Defined|Edit|Delete|Spatial|Resolution|6|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|0|99999|Not|Defined|Not|Defined|Edit|Delete|1|Not|Defined|Not|Defined|distance|Edit|Delete|2|Not|Defined|levelOfDetail|Not|Defined|Edit|Delete|3|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|4|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|5|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|Add|Spatial|Resolution|');

    // Template block usage:
    await render(hbs`
      {{#object/md-spatial-info profilePath="foobar" model=(hash)}}
        template block text
      {{/object/md-spatial-info}}
    `);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Spatial|Representation|Type|No|Spatial|Reference|System|found.|Add|Spatial|Reference|System|No|Spatial|Resolution|found.|Add|Spatial|Resolution|template|block|text|',
      'block');
  });

  skip('test actions', async function (assert) {
    assert.expect(1);
  });
});
