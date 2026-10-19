import Component from 'ember-tooltips/components/ember-tooltip';
import classic from 'ember-classic-decorator';

@classic
export default class EmberTooltipComponent extends Component {
  popperContainer = 'body';
}
