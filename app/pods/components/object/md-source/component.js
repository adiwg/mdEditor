import Component from "@ember/component";
import { set, getWithDefault, get } from "@ember/object";
import { alias } from "@ember/object/computed";
import { once } from "@ember/runloop";
import { validator, buildValidations } from "ember-cp-validations";
import { v4 as uuidV4 } from "uuid";

const Validations = buildValidations({
  description: [
    validator("presence", {
      presence: true,
      ignoreBlank: true,
    }),
  ],
});

export default Component.extend(Validations, {
  didReceiveAttrs() {
    this._super(...arguments);

    let model = this.model;

    once(this, function () {
      set(model, "sourceId", getWithDefault(model, "sourceId", uuidV4()));
      set(model, "sourceCitation", getWithDefault(model, "sourceCitation", {}));
      set(
        model,
        "metadataCitation",
        getWithDefault(model, "metadataCitation", [])
      );
      set(
        model,
        "spatialResolution",
        getWithDefault(model, "spatialResolution", {})
      );
      set(
        model,
        "referenceSystem",
        getWithDefault(model, "referenceSystem", {})
      );
      set(
        model,
        "referenceSystem.referenceSystemIdentifier",
        getWithDefault(model, "referenceSystem.referenceSystemIdentifier", {})
      );
      set(
        model,
        "sourceProcessStep",
        getWithDefault(model, "sourceProcessStep", [])
      );
      set(model, "scope", getWithDefault(model, "scope", {}));
    });
  },

  /**
   * The string representing the path in the profile object for the domain.
   *
   * @property profilePath
   * @type {String}
   * @default 'false'
   * @required
   */

  /**
   * The object to use as the data model for the domain.
   *
   * @property model
   * @type {Object}
   * @required
   */

  tagName: "form",
  domainId: alias("model.domainId"),
  codeName: alias("model.codeName"),
  description: alias("model.description"),
});
