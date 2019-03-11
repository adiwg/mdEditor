import Helper from '@ember/component/helper';

export function mod(params) {
  return params.reduce((a, b) => Number(a) % Number(b));
}

export default Helper.helper(mod);
