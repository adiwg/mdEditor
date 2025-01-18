import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CouchLoginComponent extends Component {
  @service couch;

  // User data
  @tracked username = null;
  @tracked password = null;
  // DB data
  @tracked remoteUrl = null;
  @tracked remoteName = null;

  @action
  login() {
    this.couch.login(this.remoteUrl, this.remoteName, this.username, this.password);
    this.username = null;
    this.password = null;
    this.remoteUrl = null;
    this.remoteName = null;
  }

  @action
  logout() {
    this.couch.logout();
  }

  @action
  push() {
    this.couch.push();
  }

  @action
  pull() {
    this.couch.pull();
  }

  @action
  sync() {
    this.couch.sync();
  }
}
