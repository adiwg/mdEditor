import Ember from 'ember';

const {
  Helper,
  get,
  String: EmberString
} = Ember;

export default Helper.helper(
  function (params) {
    let obj = params[0];
    let prop = params[1].trim();
    let val = null;

    if(obj) {
      val = get(obj, prop);
    }
    return val || EmberString.htmlSafe("<em>Not Defined</em>");
  }
);
