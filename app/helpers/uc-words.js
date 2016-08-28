import Ember from 'ember';

export function ucWords(params, hash) {
  var string = String(params[0]),
      force = (hash.force === true) ? true : false;
  if(force) {
    string = string.toLowerCase();
  }
  return string.replace(/(^|\s)[a-z\u00E0-\u00FC]/g, function($1) {
    return $1.toUpperCase();
  });
}

export default Ember.Helper.helper(ucWords);
