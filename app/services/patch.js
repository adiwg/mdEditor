import Service from '@ember/service';
import {
  get,
  set
} from '@ember/object';

export default Service.extend({
  applyModelPatch(record) {
    let type = record.constructor.modelName;

    switch(type) {
    case 'contact':
      record.get('json.address')
        .forEach(itm => {
          let oldAdm = get(itm, 'adminstrativeArea');

          if(oldAdm) {
            set(itm, 'administrativeArea', oldAdm);
            set(itm, 'adminstrativeArea', null);

            record.save();
          }
        });

      break;
    }
  }
});
