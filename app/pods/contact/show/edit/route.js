import Ember from 'ember';
import HashPoll from 'mdeditor/mixins/hash-poll';

const {
  Route
} = Ember;

export default Route.extend(HashPoll, {

  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  }
});
