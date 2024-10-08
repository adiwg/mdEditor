import { helper } from '@ember/component/helper';

export default helper(function objectEach([obj]) {
  let result = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push({ key, value: obj[key] });
    }
  }
  return result;
});
