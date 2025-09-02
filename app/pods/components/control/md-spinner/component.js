import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('text-center', 'md-spinner')
export default class MdSpinner extends Component {}
