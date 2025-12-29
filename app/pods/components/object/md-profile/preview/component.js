import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { or } from '@ember/object/computed';
import Component from '@ember/component';

@classic
@classNameBindings('textMuted')
export default class Preview extends Component {
  textMuted = true;

  @or('record.config', 'record')
  config;
}
