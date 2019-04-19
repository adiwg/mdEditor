import {
  helper
} from '@ember/component/helper';
import {
  isPresent
} from '@ember/utils';

export function wordLimit(params, {
  limit,
  wordLength
}) {
  const [value] = params;

  if(isPresent(value)) {
    let arr = value.replace(/[ \s\n]+/g, ' |').split('|');
    let words = limit || 50;
    let stop;

    arr.every((itm, idx) => {
      stop = idx;

      if(itm.trim() === "") {
        return true;
      }

      if(wordLength && itm.length > wordLength) {
        arr[idx] = ' ' + itm.trim().slice(0, wordLength) + '...';
      }

      return idx < words;
    });

    let text = arr.slice(0, stop > 0 ? stop : stop + 1).join('');

    if(arr.length > words) {
      text += '...';
    }

    return text;
  }

  return value;
}

export default helper(wordLimit);
