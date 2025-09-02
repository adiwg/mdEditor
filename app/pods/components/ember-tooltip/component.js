import classic from 'ember-classic-decorator';
import Component from 'ember-tooltips/components/ember-tooltip';

@classic
export default class EmberTooltip extends Component {
  popperContainer = 'body';
}
