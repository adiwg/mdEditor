import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';
import {
  Validations
} from '../component';

@classic
export default class PreviewComponent extends Component.extend(Validations) {
  tagName = '';
}

PreviewComponent.reopen({
  model: alias('item'),
  codeName: alias('model.codeName'),
  dataType: alias('model.dataType'),
  definition: alias('model.definition'),
  allowNull: alias('model.allowNull'),
});
