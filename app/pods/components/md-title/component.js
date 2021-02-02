import Breadcrumbs from "ember-crumbly/components/bread-crumbs";
import { truncate } from "ember-cli-string-helpers/helpers/truncate";
import layout from "./template";
import { computed } from "@ember/object";
import { getOwner } from "@ember/application";
import classic from "ember-classic-decorator";
import { tagName } from "@ember-decorators/component";

@tagName("")
@classic
export default class MdTitle extends Breadcrumbs {
  init() {
    super.init(...arguments);

    let applicationInstance = getOwner(this);

    this.set(
      "applicationRoute",
      applicationInstance.lookup("route:application")
    );
    this.set("classNameBindings", []);
  }

  layout = layout;

  @computed("routeHierarchy")
  get title() {
    return this.routeHierarchy.reduce((val, itm) => {
      return val + truncate([itm.title, 28, true]) + (itm.isTail ? "" : " | ");
    }, "");
  }
}
