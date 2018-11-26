import { helper as buildHelper } from '@ember/component/helper';

export function addEm(params) {
  return params.reduce((a, b) => Number(a) + Number(b));
}

export default buildHelper(addEm);
