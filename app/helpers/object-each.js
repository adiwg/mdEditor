import { helper } from '@ember/component/helper';

export default helper(function objectEach([obj]) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result = [];
  // eslint-disable-next-line no-unused-vars -- false positive: babel-eslint@8 mis-scopes for-in bindings
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push({ key, value: obj[key] });
    }
  }
  return result;
});
