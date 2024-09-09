import classic from "ember-classic-decorator";
import { inject as service } from "@ember/service";
import Route from "@ember/routing/route";
import Setting from "mdeditor/models/setting";
import { get, action } from "@ember/object";

@classic
export default class SettingsRoute extends Route {
  @service
  settings;

  @service
  publish;

  /**
   * The profile service
   *
   * @return {Ember.Service} profile
   */
  @service
  profile;

  setupController(controller, model) {
    super.setupController(controller, model);

    const links = [
      {
        title: "Main",
        target: "settings.main",
        tip: "Main application settings",
      },
      {
        title: "Profiles",
        target: "settings.profile",
        tip: "Custom profile settings",
      },
      {
        title: "Validation",
        target: "settings.validation",
        tip: "Custom validation settings",
      },
      {
        title: "Thesaurus",
        target: "settings.thesaurus",
        tip: "Custom thesaurus settings",
      },
    ];
    controller.set("links", links);
  }

  @action
  clearLocalStorage() {
    let data = this.settings.data.serialize({ includeId: true });

    window.localStorage.clear();

    if (this.settings.data.keepSettings) {
      window.localStorage.setItem(
        "index-settings",
        `["settings-${data.data.id}"]`
      );
      this.store.pushPayload("setting", data);

      let rec = this.store.peekRecord("setting", data.data.id);
      rec.save().then(() => window.location.reload());
    }

    window.location.reload();
    //this.transitionTo('application');
  }

  @action
  save() {
    this.settings.data.save();
  }

  @action
  catalogs() {
    return this.get("publish.catalogs");
  }

  @action
  resetMdTranslatorAPI() {
    let url = get(Setting, "attributes").get("mdTranslatorAPI").options
      .defaultValue;
    let model = this.modelFor("settings.main");

    model.set("mdTranslatorAPI", url);
  }
}
