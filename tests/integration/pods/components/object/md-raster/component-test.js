import { module, todo } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { parseInput, formatContent } from 'mdeditor/tests/helpers/md-helpers';

module('Integration | Component | object/md-raster', function (hooks) {
  setupRenderingTest(hooks);

  /*
    The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
  */
  todo('it renders', async function (assert) {
    this.model = {
      coverageName: 'coverageName',
      coverageDescription: 'coverageDescription',
      attributeGroup: [
        {
          attributeContentType: [
            'attributeContentType1',
            'attributeContentType2',
          ],
          attribute: [
            {
              attributeDescription: 'attributeDescription',
            },
          ],
        },
      ],
      processingLevelCode: {
        identifier: 'identifier1',
        namespace: 'namespace1',
      },
      imageDescription: {
        imageQualityCode: {
          identifier: 'identifier2',
          namespace: 'namespace2',
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
      },
    };

    let nestedValues = (obj) =>
      typeof obj === 'object'
        ? Object.values(obj).map(nestedValues).flat()
        : [obj];
    let input = nestedValues(this.model).join('|');

    await render(hbs`{{object/md-raster profilePath="foobar" model=model}}`);

    assert.equal(
      formatContent(this.element).trim(),
      '|Name|Description|Attribute|Groups|1|Add|Attribute|Group|#0|Attribute|Content|Type|×|attributeContentType1|×|attributeContentType2|Attribute|1|Add|OK|#|Attribute|Description|0|More...|Delete|Processing|Level|Code|Identifier|Namespace|namespace1|×|More|Image|Description|Image|Quality|Code|Identifier|Namespace|namespace2|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|'
    );

    assert.equal(parseInput(this.element), input, 'input renders');
  });
});
