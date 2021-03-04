import { A } from '@ember/array';
import Service from '@ember/service';
import classic from 'ember-classic-decorator';

@classic
export default class PublishService extends Service {
  catalogs = A();
}
