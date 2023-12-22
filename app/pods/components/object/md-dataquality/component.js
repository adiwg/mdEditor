import Component from "@ember/component";
import { getWithDefault, get, set } from "@ember/object";
import { once } from "@ember/runloop";
import uuidV4 from "uuid/v4";

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let model = get(this, "model");

    console.log("md-dataquality didReceiveAttrs", model);

    once(function () {
      set(model, "scope", getWithDefault(model, "scope", {}));
      set(
        model,
        "systemIdentifier",
        getWithDefault(model, "systemIdentifier", { uid: uuidV4() })
      );
      set(model, "report", getWithDefault(model, "report", []));
    });
  },

  tagName: "form",

  actions: {
    addStandaloneQualityReport() {
      set(this.model, "standaloneQualityReport", { abstract: "" });
    },

    deleteStandaloneQualityReport() {
      set(this.model, "standaloneQualityReport", undefined);
    },
  },
});
