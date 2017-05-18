import Ember from 'ember';
const {
  typeOf,
  isArray,
  isBlank,
  Service,
  assign
} = Ember;

export default Service.extend({
  clean(obj, options) {
    const opt = assign({
      target: {},
      preserveArrays: true,
      //preserveObjects: true,
      preserveRootOnly: true
    }, options);

    if(isBlank(obj)) {
      if(isArray(obj) && opt.preserveArrays) {
        return [];
      }
      return;
    }

    if((/string|number|boolean/)
      .test(typeof obj)) {
      return obj;
    }

    let acc = opt.target;

    return Object.keys(obj)
      .reduce((result, key) => {
        //reject private property
        if(key.match(/^_/)){
          return result;
        }

        if(isArray(obj[key])) {
          if(opt.preserveArrays === false && obj[key].length === 0) {
            return result;
          }
          let resultArray = [];

          obj[key].forEach((itm) => {
            let type = isArray(itm) ? [] : (typeof itm === 'object' ?
              {} : null);
            let cleanItem = this.clean(itm, {
              target: type,
              preserveArrays: opt.preserveRootOnly ? false : opt.preserveArrays
            });
            if(isBlank(cleanItem) || (typeof cleanItem === 'object' &&
                Object.keys(cleanItem)
                .length === 0)) {
              return;
            }

            //console.info(cleanItem);
            resultArray.push(cleanItem);
            //resultArray[idx] = cleanItem;

          });

          if(opt.preserveArrays === false && resultArray.length < 1) {
            return result;
          }

          result[key] = resultArray;

          return result;
        }

        if(isBlank(obj[key])) {
          //if(obj[key] === undefined) {
          return result;
        }

        if(typeOf(obj[key]) === 'object' || typeOf(obj[key]) ===
          'instance') {
          let objOpt = assign(opt, {
            target: {}
          });
          const res = this.clean(obj[key], objOpt);

          if(Object.keys(res)
            .length > 0) {
            result[key] = res;
          }
        } else if(obj[key] !== '') {
          result[key] = obj[key];

        }

        return result;
      }, acc);
  }
});
