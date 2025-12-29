import {
  helper
} from '@ember/component/helper';
import {
  htmlSafe
} from '@ember/template';
import {
  get
} from '@ember/object';

export function getProperty([obj, prop]) {
  let val = null;

  if(obj) {
    val = get(obj, prop.trim());
  }
  return val || htmlSafe("<em>Not Defined</em>");
}

export default helper(getProperty);
