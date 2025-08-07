import { findAll, render } from "@ember/test-helpers";
import EmberObject from "@ember/object";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import createRecord from "../../helpers/create-record";

module("Integration | Component | sb publisher", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("config", {
      name: "ScienceBase",
      route: "sciencebase",
      description:
        "ScienceBase is a collaborative scientific data and information management platform",
      icon: "globe",
      rootURI: "https://api.sciencebase.gov/sbmd-service/",
      rootItemURL: "https://www.sciencebase.gov/catalog/item/",
      defaultParent: "59ef8a34e4b0220bbd98d449",
      settingsComponent: "sb-settings",
    });

    this.set(
      "settings",
      EmberObject.create({
        data: {
          publishOptions: [],
        },
      })
    );

    this.set("records", createRecord(3));

    await render(
      hbs`{{sb-publisher config=config settings=settings records=records}}`
    );

    assert.equal(findAll(".tree-leaf").length, 4);
  });
});
