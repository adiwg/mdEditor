import { clean } from 'mdeditor/services/cleaner';

const isEmpty = function (obj) {
  if(obj !== null) {
    let empty = obj ? Object.keys(clean(obj, {
      preserveArrays: false
    })).length === 0 : true;

    return empty;
  }
};

export { isEmpty };
