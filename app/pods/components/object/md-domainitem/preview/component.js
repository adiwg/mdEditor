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
  name: alias('model.name'),
  value: alias('model.value'),
  definition: alias('model.definition'),
});
