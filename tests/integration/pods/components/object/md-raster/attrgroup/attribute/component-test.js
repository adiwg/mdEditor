import { module, /*test,*/ todo } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { createAttribute } from 'mdeditor/tests/helpers/create-record';
import { parseInput, formatContent, nestedValues } from 'mdeditor/tests/helpers/md-helpers';

module('Integration | Component | object/md-raster/attrgroup/attribute', function(hooks) {
  setupRenderingTest(hooks);


  /*
    The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
  */
  todo('it renders', async function(assert) {
    let attribute = createAttribute(1);

    this.set('model', attribute[0]);

    let input = nestedValues(attribute[0]).join('|');

    await render(hbs`{{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}`);

    assert.equal(formatContent(this.element).trim(),
      "|Attribute|Description|Attribute|Identifier|1|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|Band|Boundary|Definition|×|bandBoundaryDefinition0|Transfer|Function|Type|×|transferFunctionType0|Transmitted|Polarization|×|transmittedPolarization0|Detected|Polarization|×|detectedPolarization0|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|");

    assert.equal(parseInput(this.element), input);
  });
});
