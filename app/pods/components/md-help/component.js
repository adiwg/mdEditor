import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('md-help-sidebar')
@tagName('section')
export default class MdHelp extends Component {}
