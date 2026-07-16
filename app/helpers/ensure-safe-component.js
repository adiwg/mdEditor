import Helper from '@ember/component/helper';
import { ensureSafeComponent } from '@embroider/util';

// Re-export via Helper.extend so ClassicHelperManager can resolve debug names in
// Ember 4 dev builds (native class re-exports leave definition.class undefined).
export default Helper.extend({
  compute([value]) {
    return ensureSafeComponent(value, this);
  },
});
