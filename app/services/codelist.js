import Ember from 'ember';
import codes from 'npm:mdcodes/resources/js/mdcodes.js';
import Profile from './profile';

const {
  get,
  Service
} = Ember;
/**
 * Codelist Service
 *
 * This service provides controlled value lists for use in the editor. The
 * service may be customized by modifing the object passed to
 * Ember.Service.extend. The existing property names should be maintained.
 *
 * @module
 */

const profile = Profile.create();

//create a new object
const codelist = {};

//remap codelist names to be more generic
Object.keys(codes)
  .forEach(function(key) {
    const list = codes[key];
    const name = key.replace(/^iso_|adiwg_/, '');

    codelist[name] = list;
    //remove deprecated codes
    codelist[name]['codelist'] = list.codelist.rejectBy('deprecated');
  });

let recordProfiles = Object.keys(profile.profiles).without('dictionary');

codelist.profile = {
  codelist: recordProfiles.map((itm) => {
    return {
      code: itm,
      codeName: itm,
      description: get(profile, 'profiles.' + itm + '.description')
    };
  })
};

export default Service.extend(codelist);
