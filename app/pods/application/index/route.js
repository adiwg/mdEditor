import classic from "ember-classic-decorator";
import Route from "@ember/routing/route";

@classic
export default class IndexRoute extends Route {
  /** Redirect to dashboard route */
  redirect() {
    this.transitionTo("dashboard");
  }
}
