import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-raster/attrgroup/attribute', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    this.attribute = {
      "sequenceIdentifier": "foo",
      "sequenceIdentifierType": "bar",
      "attributeDescription": "foo bar baz"
    };

    await render(hbs`{{object/md-raster/attrgroup/attribute profilePath="foobar" model=attribute}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
    '|Attribute|Description|No|Attribute|Identifier|found.|Add|Attribute|Identifier|Band|Boundary|Definition|Transfer|Function|Type|Transmitted|Polarization|Detected|Polarization|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|', 'md-raster/attrgroup/attribute component renders');
  });
});
