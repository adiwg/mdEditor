import Ember from 'ember';

const {
  Helper,
  get
} = Ember;

export function getDash(params /*, hash*/ ) {
  let obj = params[0];
  let prop = params[1].trim();
  let val = null;

  if(obj) {
    val = get(obj, prop) || obj[prop];
  }
  return val || "--";
}

export default Helper.helper(getDash);
