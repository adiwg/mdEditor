import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
// import {
//   Validations
// } from '../component';

@classic
@tagName('')
export default class Preview extends Component {
  @alias('item')
  model;

  @alias('model.description')
  name;
}
