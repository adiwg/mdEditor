import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { once } from '@ember/runloop';
// import { decamelize } from '@ember/string';
// import { ucWords } from 'mdeditor/helpers/uc-words';
import { set, getWithDefault, get } from '@ember/object';
// import ImageDescription from 'mdjson-schemas/resources/js/imageDescription';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  'imgQualCodeIdentifier': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    })
  ]
});

// const params = {
//   illuminationElevationAngle: 'number',
//   illuminationAzimuthAngle: 'number',
//   imagingCondition: 'string',
//   cloudCoverPercent: 'number',
//   compressionQuantity: 'number',
//   triangulationIndicator: 'boolean',
//   radiometricCalibrationAvailable: 'boolean',
//   cameraCalibrationAvailable: 'boolean',
//   filmDistortionAvailable: 'boolean',
//   lensDistortionAvailable: 'boolean'
// }

@classic
export default class ImageDesc extends Component.extend(Validations) {
  //Todo: work on fix for this with Josh
  // init() {
  //   this.params = Object.keys(params).map(p => {
  //     return {
  //       property: p,
  //       label: ucWords([decamelize(p).replace(/_/g,' ')], { force: false }),
  //       type: params[p],
  //       description: get(ImageDescription, `properties.${p}.description`)
  //     }
  //   });

  //   this._super(...arguments);
  // },

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // let model = getWithDefault(this, 'model', {}) || {};
    let model = this.model

    if (model) {
      once(this, function () {
        set(model, 'imageQualityCode', getWithDefault(model, 'imageQualityCode', {}));
      })
    }
  }

  /**
   * The string representing the path in the profile object for the resource.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the resource.
   *
   * @property model
   * @type {Object}
   * @required
   */

  @alias('model.imageQualityCode.identifier')
  imgQualCodeIdentifier;
}
