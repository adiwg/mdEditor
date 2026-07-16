import { helper } from '@ember/component/helper';
import { createReadOnlyRef } from '@glimmer/reference';
import { valueForRef } from '@glimmer/validator';

// Ember 4 removed the built-in `readonly` helper. ember-power-select bundles
// ember-basic-dropdown v7 templates that pass read-only values into `(component ...)`.
export default helper(function readonly([value]) {
  return createReadOnlyRef(() => valueForRef(value));
});
