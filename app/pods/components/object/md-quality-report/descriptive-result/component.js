import Component from "@ember/component";
import { once } from "@ember/runloop";
import { alias } from "@ember/object/computed";
import { set, getWithDefault } from "@ember/object";

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(model, "scope", getWithDefault(model, "scope", {}));
      });
    }
  },

  name: "",

  scopeCode: alias("model.scope.scopeCode"),
});
