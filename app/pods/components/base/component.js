import Component from "@glimmer/component";
import { isNone } from "@ember/utils";
import { assert } from "@ember/debug";
import { defineProperty, computed } from "@ember/object";

export default class BaseComponent extends Component {
  constructor() {
    super(...arguments);

    this.profile;
    this.path = this.profilePath;
    this.visibility;
    this.isVisible = isNone(this.visibility) ? true : this.visibility;

    if (this.path !== undefined) {
      assert(
        `${this.path}  is not a profile path!`,
        this.path.charAt(0) !== "."
      );

      defineProperty(
        this,
        "isVisible",
        computed(
          "isVisible",
          "path",
          "profile.{active,activeComponents}",
          function () {
            if (!this.profile.activeComponents) {
              return this.isVisible;
            }

            return this.profile.activeComponents || this.path || this.isVisible;
          }
        )
      );
    }
  }
}
