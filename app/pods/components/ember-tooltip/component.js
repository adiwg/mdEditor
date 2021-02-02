import Component from "ember-tooltips/components/ember-tooltip";
import classic from "ember-classic-decorator";

@classic
export default class EmberTooltip extends Component {
  popperContainer = "body";
}
