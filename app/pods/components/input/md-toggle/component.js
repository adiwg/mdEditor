import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
/**
 * @module mdeditor
 * @submodule components-input
 */

import Toggle from 'ember-toggle/components/x-toggle/component';

@classic
@classNameBindings('value:toggle-on:toggle-off')
export default class MdToggle extends Toggle {}
