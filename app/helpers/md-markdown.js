import Ember from 'ember';
import marked from 'npm:marked';

const {
  String: EmString
} = Ember;

export function mdMarkdown(params /*, hash*/ ) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

  if(params[0]) {
    return EmString.htmlSafe(marked(params[0]));
  }

  return params[1] || 'No text supplied.';
}

export default Ember.Helper.helper(mdMarkdown);
