import Route from '@ember/routing/route';
import HashPoll from 'mdeditor/mixins/hash-poll';

export default Route.extend(HashPoll, {

  renderTemplate() {
    this.render('contact.show.edit', {
      into: 'contact'
    });
  }
});
