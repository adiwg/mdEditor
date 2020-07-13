import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-raster', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{object/md-raster profilePath="foobar" model=raster}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Name|Description|Attribute|Groups|Add|Add|Attribute|Groups|Processing|Level|Code|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|More|Image|Description|Image|Quality|Code|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|', 'md-raster component render'
    );
  });
});
