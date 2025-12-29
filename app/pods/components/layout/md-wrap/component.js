import classic from 'ember-classic-decorator';
import { attributeBindings } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@attributeBindings('data-spy')
export default class MdWrap extends Component {}
