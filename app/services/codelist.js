/* eslint-disable @typescript-eslint/no-this-alias */
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import codes from 'mdcodes/resources/js/mdcodes.js';

@classic
export default class CodelistService extends Service {
  /**
   * Codelist Service
   *
   * This service provides controlled value lists for use in the editor. The
   * service may be customized by modifing the object in init. The existing
   * property names should be maintained.
   *
   * @module mdeditor
   * @submodule service
   * @class codelist
   */
  init() {
    super.init(...arguments);

    let codelist = this;

    //remap codelist names to be more generic
    Object.keys(codes).forEach(function (key) {
      if (key === 'default') {
        return;
      }

      const list = codes[key];
      const name = key.replace(/^iso_|adiwg_/, '');

      codelist[name] = list;
      //remove deprecated codes
      codelist[name]['codelist'] = list.codelist.rejectBy('deprecated');
    });
  }

  /**
   * Custom Profiles service
   *
   * @property customProfiles
   */
  @service('custom-profile')
  customProfiles;

  /**
   * The profiles codelist, updates when number of Custom Profiles change.
   *
   * @property profile
   * @type {Object}
   * @category computed
   * @required customProfiles.profiles{[],@each.title}
   */
  @computed('customProfiles.profiles.{[],@each.title}')
  get profile() {
    return {
      codelist: this.customProfiles.profiles.map((itm) => {
        return {
          code: itm.id,
          codeName: itm.title,
          description: itm.description,
        };
      }),
    };
  }

  /**
   * Codelist item title overrides
   *
   * @property codeOverrides
   * @type {Object}
   * @category computed
   * @required profile
   */
  @computed('profile')
  get codeOverrides() {
    return {
      scope: {
        dataset: 'geographicDataset',
      },
    };
  }
}
