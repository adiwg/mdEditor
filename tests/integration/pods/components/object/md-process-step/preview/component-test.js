import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-process-step/preview', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

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

    await render(hbs`{{object/md-process-step/preview model=source profilePath="foobar"}}`);

    assert.dom('textarea').hasValue('description');

    // Template block usage:
    await render(hbs`
      {{#object/md-process-step/preview model=source profilePath="foobar"}}
        template block text
      {{/object/md-process-step/preview}}
    `);

    assert.dom('textarea').hasValue('description');
  });
});
