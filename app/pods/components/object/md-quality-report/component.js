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
        set(
          model,
          "qualityMeasure",
          getWithDefault(model, "qualityMeasure", {})
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

  type: alias("model.type"),
});
