import { helper } from '@ember/component/helper';
import { isEmpty } from 'mdeditor/utils/md-object';

export default helper(function objectIsEmpty(params /*, hash*/) {
  return isEmpty(params[0]);
});
