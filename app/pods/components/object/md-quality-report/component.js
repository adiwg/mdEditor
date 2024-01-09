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
          "qualityMeasure",
          getWithDefault(model, "qualityMeasure", { name: [] })
        );
        set(
          model,
          "evaluationMethod",
          getWithDefault(model, "evaluationMethod", {})
        );
        set(
          model,
          "quantitativeResult",
          getWithDefault(model, "quantitativeResult", [])
        );
        set(
          model,
          "descriptiveResult",
          getWithDefault(model, "descriptiveResult", [])
        );
        set(
          model,
          "conformanceResult",
          getWithDefault(model, "conformanceResult", [])
        );
        set(
          model,
          "coverageResult",
          getWithDefault(model, "coverageResult", [])
        );
      });
    }
  },

  qualityMeasureName: computed("model.qualityMeasure.name.[]", {
    get() {
      let nameArray = this.get("model.qualityMeasure.name");
      return nameArray && nameArray.length > 0 ? nameArray[0] : null;
    },
    set(key, value) {
      let nameArray = this.get("model.qualityMeasure.name");
      if (nameArray && nameArray.length > 0) {
        nameArray[0] = value;
      } else {
        this.set("model.qualityMeasure.name", [value]);
      }
      return value;
    },
  }),

  reportType: alias("model.type"),
  evaluationType: alias("model.evaluationMethod.type"),
});
