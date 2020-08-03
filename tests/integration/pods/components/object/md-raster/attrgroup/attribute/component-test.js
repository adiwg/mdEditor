import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import createAttribute from 'mdeditor/tests/helpers/create-attribute';
import { parseInput, formatContent, nestedValues } from 'mdeditor/tests/helpers/md-helpers';

module('Integration | Component | object/md-raster/attrgroup/attribute', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.set('attribute', createAttribute(1)[0].json.attribute)
    this.set('model', this.attribute[0])
    let input = nestedValues(this.attribute).join('|')

    await render(hbs`{{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}`);

    assert.equal(formatContent(this.element).trim(),
      "|Attribute|Description|No|Attribute|Identifier|found.|Add|Attribute|Identifier|Band|Boundary|Definition|×|bandBoundaryDefinition0|Transfer|Function|Type|×|transferFunctionType0|Transmitted|Polarization|×|transmittedPolarization0|Detected|Polarization|×|detectedPolarization0|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|", 'md-raster/attrgroup/attribute component renders');

    assert.equal(parseInput(this.element), input, 'md-raster/attrgroup/attribute inputs renders');
  });
});
