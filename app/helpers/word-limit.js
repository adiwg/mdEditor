import {
  helper
} from '@ember/component/helper';
import {
  isPresent
} from '@ember/utils';

export function wordLimit(params, hash) {
  const [value] = params;
  const {
    limit
  } = hash;

  if(isPresent(value)) {
    let arr = value.split(/(?=\s)/gi);
    let words = limit || 50;
    let stop;

    arr.every((itm, idx) => {
      stop = idx;

      if(itm.trim() === "") {
        return true;
      }

      return idx < words;
    });

    let text = arr.slice(0, stop).join('');

    if(arr.length > words) {
      text += '...';
    }

    return text;
  }

  return value;
}

export default helper(wordLimit);
