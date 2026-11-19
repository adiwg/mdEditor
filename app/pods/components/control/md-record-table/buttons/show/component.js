import Component, { setComponentTemplate } from '@ember/component';
import classic from 'ember-classic-decorator';
import layout from './template';

@classic
class ShowComponent extends Component {
  tagName = '';
}

export default setComponentTemplate(layout, ShowComponent);
