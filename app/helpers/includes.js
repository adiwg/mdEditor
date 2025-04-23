// app/helpers/includes.js
import { helper } from '@ember/component/helper';

export function includes([array, value]) {
  return array && array.includes(value);
}

export default helper(includes);
