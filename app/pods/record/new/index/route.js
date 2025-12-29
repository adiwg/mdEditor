import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  redirect() {
    let rec = this.store.createRecord('record');

    this.replaceWith('record.new.id', rec.id);
  }
}
