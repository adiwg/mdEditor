import classic from 'ember-classic-decorator';
import Messages from 'ember-cp-validations/validators/messages';

@classic
export default class _Messages extends Messages {
  arrayRequired = 'At least one {item} is required.';
}
