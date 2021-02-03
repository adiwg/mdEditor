import Component from "@ember/component";
import classic from "ember-classic-decorator";

@classic
export default class CheckAll extends Component {
  actions = {
    toggleAllSelection() {
      this.toggleAllSelection();
    }
  };
}
