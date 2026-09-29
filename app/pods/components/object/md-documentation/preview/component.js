import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class PreviewComponent extends Component {
  classNameBindings = ['muted:text-muted'];

  /**
   * Whether to render the text muted.
   *
   * @property muted
   * @type {Boolean}
   * @default "true"
   */
  muted = true;
}
