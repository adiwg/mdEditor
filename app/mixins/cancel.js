import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { once } from '@ember/runloop';

export default Mixin.create({
  doCancel() {
    let controller = this.controller;
    let same = !controller.cancelScope || getOwner(this)
      .lookup('controller:application')
      .currentPath === get(controller, 'cancelScope.routeName');

    if(controller.onCancel) {
      once(() => {
        if(same) {
          controller.onCancel.call(controller.cancelScope ||
            this);
        } else {
          controller.set('onCancel', null);
          controller.set('cancelScope', null);
        }
        this.refresh();
      });
    }
  }
});
