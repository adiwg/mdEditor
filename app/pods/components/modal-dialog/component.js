import classic from 'ember-classic-decorator';
import ModalDialog from 'ember-modal-dialog/components/modal-dialog';

/**
 * Override of ember-modal-dialog to fix tag-less component with classNameBindings issue
 */
@classic
export default class ModalDialogComponent extends ModalDialog {
  // Set a tag name to allow classNameBindings to work
  tagName = 'div';
}
