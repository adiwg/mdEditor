import { helper as buildHelper } from '@ember/component/helper';
// import marked from 'marked';
import { htmlSafe } from '@ember/string';

const marked = window.marked;

export function mdMarkdown(params /*, hash*/) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  });

  if (params[0]) {
    return htmlSafe(marked(params[0]));
  }

  return params[1] || 'No text supplied.';
}

export default buildHelper(mdMarkdown);
