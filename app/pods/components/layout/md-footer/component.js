import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('footer')
@classNames('md-footer')
export default class MdFooter extends Component {
  @service
  settings;
}
