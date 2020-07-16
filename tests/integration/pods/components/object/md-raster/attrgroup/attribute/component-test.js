import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { parseInput, formatContent, nestedValues } from 'mdeditor/tests/helpers/md-helpers';

module('Integration | Component | object/md-raster/attrgroup/attribute', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.model = {
      "attributeDescription": "attributeDescription",
      "attributeIdentifier": [{
        "identifier": "identifier",
        "namespace": "namespace"
      }],
      "bandBoundaryDefinition": ["bandBoundaryDefinition1", "bandBoundaryDefinition2"],
      "transferFunctionType": ["transferFunctionType1", "transferFunctionType2"],
      "transmittedPolarization": ["transmittedPolarization1", "transmittedPolarization2"],
      "detectedPolarization": ["detectedPolarization1", "detectedPolarization2"],
      "sequenceIdentifier": "sequenceIdentifier",
      "sequenceIdentifierType": "sequenceIdentifierType",
      "minValue": 3,
      "maxValue": 5,
      "units": "units",
      "scaleFactor": 6,
      "offset": 8,
      "meanValue": 2,
      "numberOfValues": 8,
      "standardDeviation": 6,
      "bitsPerValue": 4,
      "boundMin": 2,
      "boundMax": 8,
      "boundUnits": 9,
      "peakResponse": 2,
      "toneGradations": 2,
      "nominalSpatialResolution": 4
    };

    let input = nestedValues(this.model).join('|')

    await render(hbs`{{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}`);

    await this.pauseTest();

    assert.equal(formatContent(this.element).trim(),
      '|Attribute|Description|Attribute|Identifier|1|Add|OK|#|Identifier|Namespace|0|identifier|namespace|Edit|Delete|Band|Boundary|Definition|×|bandBoundaryDefinition1|×|bandBoundaryDefinition2|Transfer|Function|Type|×|transferFunctionType1|×|transferFunctionType2|Transmitted|Polarization|×|transmittedPolarization1|×|transmittedPolarization2|Detected|Polarization|×|detectedPolarization1|×|detectedPolarization2|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|', 'md-raster/attrgroup/attribute component renders');

    assert.equal(parseInput(this.element), input, 'md-raster/attrgroup/attribute inputs renders');
  });
});
