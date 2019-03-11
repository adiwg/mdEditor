import { find, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md source/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.source = {
      "description": "description",
      "sourceCitation": {
        "title": "title"
      },
      "metadataCitation": [{
          "title": "title0"
        },
        {
          "title": "title1"
        }
      ],
      "spatialResolution": {
        "measure": {
          "type": "distance",
          "value": 99.9,
          "unitOfMeasure": "unitOfMeasure"
        }
      },
      "referenceSystem": {
        "referenceSystemType": "referenceSystemType",
        "referenceSystemIdentifier": {
          "identifier": "identifier"
        }
      },
      "sourceProcessStep": [{
          "description": "description0"
        },
        {
          "description": "description1"
        }
      ]
    };

    await render(hbs`{{object/md-source/preview model=source profilePath="foobar"}}`);

    assert.equal(find('textarea').value, 'description');

    // Template block usage:
    await render(hbs`
      {{#object/md-source/preview model=source profilePath="foobar"}}
        template block text
      {{/object/md-source/preview}}
    `);

    assert.equal(find('textarea').value, 'description');  });
});
