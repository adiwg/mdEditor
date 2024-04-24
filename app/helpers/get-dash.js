import Helper from '@ember/component/helper';
import { get } from '@ember/object';

export function getDash(params /*, hash*/) {
  let obj = params[0];
  let prop = params[1].trim();
  let val = null;

  if (obj) {
    val = get(obj, prop);
  }
  return val || '--';
}

export default Helper.helper(getDash);
