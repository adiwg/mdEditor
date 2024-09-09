/* eslint-disable ember/no-actions-hash */
/* eslint-disable ember/no-classic-classes */
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  keyword: service(),

  columns: [
    {
      propertyName: "title",
      title: "Title",
    },
    {
      propertyName: "description",
      title: "Description",
      truncate: true,
      isHidden: false,
    },
  ],

  actions: {
    addThesaurus() {
      console.log("addThesaurus");
      // this.set("thesaurus", this.store.createRecord("thesaurus"));
    },
    editThesaurus(index, record) {
      console.log("editThesaurus");
      // this.set("thesaurus", record);
    },
    saveThesaurus() {
      console.log("saveThesaurus");
      // let thesaurus = this.thesaurus;

      // return thesaurus.save();
    },
    cancelEdit() {
      console.log("cancelEdit");
      // let record = this.thesaurus;

      // this.set("thesaurus", null);
      // record.rollbackAttributes();
    },
  },
});
