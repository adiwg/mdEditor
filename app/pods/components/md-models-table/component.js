import Table from "ember-models-table/components/models-table";
import Theme from "./themes/bootstrap3";

export default class MdModelsTable extends Table {
  constructor() {
    super(...arguments);

    this.pageSizeValues = [10, 25, 50, 500];
    this.filteringIgnoreCase = true;
  }
  themeInstance = Theme.create();
}
