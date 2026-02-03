import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import {
  Validations
} from '../component';

@classic
export default class PreviewComponent extends Component.extend(Validations) {
  tagName = '';
  @alias('item') model;
  @alias('model.codeName') codeName;
  @alias('model.dataType') dataType;
  @alias('model.definition') definition;
  @alias('model.allowNull') allowNull;
}
