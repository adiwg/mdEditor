import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import { classNames } from '@ember-decorators/component';

@classic
@classNames('md-models-table')
export default class MdModelsTableComponent extends Component {
  @service('emt-themes/md-bootstrap3') themeInstance;
}
