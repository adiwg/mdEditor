/**
 * The parseInput helper will query for any input, textarea, or instance of
 * md-select and return the value(s) as a delimited string. Set delimiter to
 * `false` to return an array of values.
 *
 * @method parseInput
 * @param {Element} e The element to parse
 * @param {String|false} delimiter The delimiter to use, Defaults to `|`. Set to `false` to
 * return `[values]`
 * @static
 * @return {String|Array}
 */
function parseInput(e, delimiter = '|') {
  // TODO: Support md-toggle
  let text = Array.from(e.querySelectorAll(
      'input,textarea,.md-select'))
    .map(i => (i.type === 'checkbox' ? i.checked.toString() : false) ||
      i.value ||
      Array.from(i.querySelectorAll('.select-value'))
      .map(n => n.textContent).join('|'));

  return delimiter ? text.join(delimiter) : text;
}

function formatContent(t) {
  return t.textContent.replace(/[\s\n]+/g, '|').trim();
}

let nestedValues = (obj) => typeof obj === 'object'
  ? Object.values(obj).map(nestedValues).flat()
  : [obj]

export { parseInput, formatContent, nestedValues };
