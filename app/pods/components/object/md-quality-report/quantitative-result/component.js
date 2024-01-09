import Component from "@ember/component";
import { computed } from "@ember/object";
import { once } from "@ember/runloop";
import { alias } from "@ember/object/computed";
import { set, getWithDefault } from "@ember/object";

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    if (model) {
      once(this, function () {
        set(
          model,
          "scope",
          getWithDefault(model, "scope", { scopeDescription: [] })
        );
        set(model, "value", getWithDefault(model, "value", []));
      });
    }
  },

  name: "",

  quantitativeValue: computed("model.value.[]", {
    get() {
      const valueArray = this.get("model.value");
      return valueArray && valueArray.length > 0 ? valueArray[0] : null;
    },
    set(key, value) {
      const valueArray = this.get("model.value");
      if (valueArray && valueArray.length > 0) {
        valueArray[0] = parseInt(value);
      } else {
        this.set("model.value", [parseInt(value)]);
      }
      return value;
    },
  }),

  units: alias("model.valueUnits"),
  scopeCode: alias("model.scope.scopeCode"),
});
