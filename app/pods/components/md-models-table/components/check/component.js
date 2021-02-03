import Component from "@ember/component";
import classic from "ember-classic-decorator";
@classic
export default class Check extends Component {
  actions = {
    clickOnRow(index, record, event) {
      this.clickOnRow(index, record);
      event.stopPropagation();
    }
  };
}
