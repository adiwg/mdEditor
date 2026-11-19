import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
// import {
//   Validations
// } from '../component';

@classic
export default class PreviewComponent extends Component /*Validations*/ {
  tagName = '';
  @alias('item') model;
  @alias('model.description') name;
}
