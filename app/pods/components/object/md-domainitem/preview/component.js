import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import {
  Validations
} from '../component';

@classic
@tagName('')
export default class Preview extends Component.extend(Validations) {
  @alias('item')
  model;

  @alias('model.name')
  name;

  @alias('model.value')
  value;

  @alias('model.definition')
  definition;
}
