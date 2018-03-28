import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function present(params) {
  return isPresent(params[0]);
}

export default helper(present);
