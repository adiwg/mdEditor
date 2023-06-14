import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  parseInput,
  formatContent,
  nestedValues,
} from 'mdeditor/tests/helpers/md-helpers';

module(
  'Integration | Component | object/md-raster/image-desc',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      this.model = {
        imageQualityCode: {
          identifier: 'identifier',
          namespace: 'namespace',
        },
        illuminationElevationAngle: 45,
        illuminationAzimuthAngle: 90,
        imagingCondition: 'imageCondition',
        cloudCoverPercent: 88,
        compressionQuantity: 23,
        triangulationIndicator: 'true',
        radiometricCalibrationAvailable: 'true',
        cameraCalibrationAvailable: 'false',
        filmDistortionAvailable: 'false',
        lensDistortionAvailable: 'true',
      };

      let input = nestedValues(this.model).join('|');

      await render(
        hbs`{{object/md-raster/image-desc profilePath="foobar" model=model}}`
      );

      assert.equal(
        formatContent(this.element).trim(),
        '|Image|Quality|Code|Identifier|Namespace|namespace|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|',
        'md-raster/image-desc component renders'
      );

      assert.equal(
        parseInput(this.element),
        input,
        'md-raster/image-desc inputs render'
      );
    });
  }
);
