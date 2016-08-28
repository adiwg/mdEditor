import Ember from 'ember';

export default Ember.Helper.extend({
  compute(params) {
    let obj = params[0],
        prop = params[1].trim();
    return obj[prop] || Ember.String.htmlSafe("<em>Not Defined</em>");
  }
});
