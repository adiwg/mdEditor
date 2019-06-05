import { get, computed } from '@ember/object';
import Service from '@ember/service';
import codes from 'mdcodes/resources/js/mdcodes.js';
import { inject as service } from '@ember/service';
// import Profile from './profile';

/**
 * Codelist Service
 *
 * This service provides controlled value lists for use in the editor. The
 * service may be customized by modifing the object in init. The existing
 * property names should be maintained.
 *
 * @module
 */
//
// const profile = Profile.create();

// //create a new object
// const codelist = {};
//
// //remap codelist names to be more generic
// Object.keys(codes)
//   .forEach(function(key) {
//     if(key === 'default') {
//       return;
//     }
//
//     const list = codes[key];
//     const name = key.replace(/^iso_|adiwg_/, '');
//
//     codelist[name] = list;
//     //remove deprecated codes
//     codelist[name]['codelist'] = list.codelist.rejectBy('deprecated');
//   });
//
// let recordProfiles = Object.keys(profile.profiles).without('dictionary');
//
// codelist.profile = {
//   codelist: recordProfiles.map((itm) => {
//     return {
//       code: itm,
//       codeName: itm,
//       description: get(profile, 'profiles.' + itm + '.description')
//     };
//   })
// };

// export default Service.extend(codelist);
export default Service.extend({
  init() {
    this._super(...arguments);

    let codelist = this;

    //remap codelist names to be more generic
    Object.keys(codes)
      .forEach(function(key) {
        if(key === 'default') {
          return;
        }

        const list = codes[key];
        const name = key.replace(/^iso_|adiwg_/, '');

        codelist[name] = list;
        //remove deprecated codes
        codelist[name]['codelist'] = list.codelist.rejectBy('deprecated');
      });

      //let recordProfiles = Object.keys(this.profiles.profiles).without('dictionary');
      //let recordProfiles = Object.keys(this.profiles.profiles).without('dictionary');
  },
  customProfiles: service('custom-profile'),
  profile: computed('customProfiles.profiles.[]', function() {
    return {
      codelist: this.customProfiles.profiles.map((itm) => {
        return {
          code: itm.id,
          codeName: itm.title,
          description: itm.description
        };
      })
    };
})
});
