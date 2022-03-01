  let interpolate = function (str, obj) {
    let parts = str.split(/\$\{(?!\d)[^0-9][a-zA-Z0-9.]+\}/);
    let args = parseArgs(str);
    let parameters = args.map(argument => obj[argument] || (obj[argument] ===
      undefined ? "" : obj[argument]));

    return String.raw({ raw: parts }, ...parameters);
  };

  let parseArgs = function (str) {
    let args = str.match(/[^{}]+(?=})/g) || [];
    return args;
  };

  export { interpolate, parseArgs };
