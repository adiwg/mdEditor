import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CouchLoginComponent extends Component {
  @service couch;

  // User data
  username = null;
  password = null;
  // DB data
  remoteUrl = null;
  remoteName = null;

  @action
  login() {
    this.couch.login(this.remoteUrl, this.remoteName, this.username, this.password);
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
