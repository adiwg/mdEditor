/* eslint-disable ember/no-classic-classes */
import Model, { attr } from "@ember-data/model";
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  citation: validator("presence", {
    presence: true,
    ignoreBlank: true,
    message: "The definition has not been downloaded.",
  }),
  onlineResource: validator("presence", {
    presence: true,
    ignoreBlank: true,
  }),
});

export default Model.extend(Validations, {
  /**
   * Thesaurus model
   *
   * @class thesaurus
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    this._super(...arguments);
    // this.updateSettings; // this might not be necessary
  },

  citation: attr("json"),
  description: attr("string"),
  title: attr("string"),
  edition: attr("string"),
  onlineResource: attr("json"),
  identifier: attr("json"),
});
