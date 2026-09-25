import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { alias } from '@ember/object/computed';

@classic
export default class PreviewComponent extends Component {
  tagName = '';
  @alias('item') model;
  @alias('model.description') name;
}
