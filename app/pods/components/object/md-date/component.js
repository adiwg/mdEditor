/* eslint-disable ember/no-classic-components */
/* eslint-disable ember/no-actions-hash */
/* eslint-disable ember/no-get */
/* eslint-disable ember/no-classic-classes */
import { alias } from "@ember/object/computed";
import Component from "@ember/component";
import { validator, buildValidations } from "ember-cp-validations";
import { observer } from "@ember/object";
import dayjs from "dayjs";

const Validations = buildValidations({
  date: validator("presence", {
    presence: true,
    ignoreBlank: true,
  }),
  dateType: validator("presence", {
    presence: true,
    ignoreBlank: true,
  }),
});

export default Component.extend(Validations, {
  init() {
    this._super(...arguments);

    this.set("precisionOptions", [
      { value: "Year", name: "Year" },
      { value: "Month", name: "Month" },
      { value: "Day", name: "Day" },
      { value: "Time", name: "Time" },
    ]);

    this.setPrecisionBasedOnDate();
  },

  selectedPrecision: null,

  tagName: "",
  date: alias("model.date"),
  dateType: alias("model.dateType"),

  selectedPrecisionChanged: observer("selectedPrecision", function () {
    const date = this.get("model.date");
    if (!date) return;

    const parsedDate = dayjs(date);
    let newDate;

    switch (this.get("selectedPrecision")) {
      case "Time":
        newDate = parsedDate.format("YYYY-MM-DD HH:mm:ss");
        break;
      case "Day":
        newDate = parsedDate.format("YYYY-MM-DD");
        break;
      case "Month":
        newDate = parsedDate.format("YYYY-MM");
        break;
      case "Year":
        newDate = parsedDate.format("YYYY");
        break;
      default:
        newDate = parsedDate.format("YYYY-MM-DD HH:mm:ss");
        break;
    }

    if (newDate !== date) {
      this.set("model.date", newDate);
    }
  }),

  setPrecisionBasedOnDate() {
    const date = this.get("model.date");
    if (!date) {
      this.set("selectedPrecision", "Year");
      return;
    }
    if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(date)) {
      this.set("selectedPrecision", "Time");
    } else if (/\d{4}-\d{2}-\d{2}/.test(date)) {
      this.set("selectedPrecision", "Day");
    } else if (/\d{4}-\d{2}/.test(date)) {
      this.set("selectedPrecision", "Month");
    } else if (/\d{4}/.test(date)) {
      this.set("selectedPrecision", "Year");
    } else {
      this.set("selectedPrecision", "Time");
    }
  },
});
