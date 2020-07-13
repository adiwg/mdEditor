import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | object/md-raster/image-desc', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{object/md-raster/image-desc profilePath="foobar"}}`);

    assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(),
      '|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|', 'md-raster/image-desc renders'
    );
  });
});
