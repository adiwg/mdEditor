import { A } from '@ember/array';
import Service from '@ember/service';

export default class PublishService extends Service {
  // Use getter/setter pattern to avoid direct A() usage
  constructor() {
    super(...arguments);
    this._catalogs = A();
  }

  get catalogs() {
    return this._catalogs || A();
  }

  set catalogs(value) {
    this._catalogs = value;
  }
}
