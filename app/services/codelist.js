import Ember from 'ember';
import codes from 'npm:mdcodes/resources/js/mdcodes.js';
/**
 * Codelist Service
 *
 * This service provides controlled value lists for use in the editor. The
 * service may be customized by modifing the object passed to
 * Ember.Service.extend. The existing property names should be maintained.
 *
 * @module
 */

//create a new object
const codelist = {};

//remap codelist names to be more generic
Object.keys(codes)
  .forEach(function (key) {
    const list = codes[key];
    const name = key.replace(/^iso_/, '');

    codelist[name] = list;
  });

codelist.profile = {
  codelist: [{
    code: '001',
    codeName: 'full',
    description: 'This profile includes all metadata properties.'
  }, {
    code: '002',
    codeName: 'basic',
    description: 'This profile includes metadata properties required for a minimal metadata record.'
  }]
};

export default Ember.Service.extend(codelist);
