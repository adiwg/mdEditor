import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

/**
 * The single action for a row in the "currently syncing" table - every
 * record here already lives in Pouch directly (see models/base.js's
 * syncEnabled), so there's no separate linked doc left to reconcile or
 * import; the only thing left to do is stop replicating it.
 */
export default class MdPouchRecordRemoveSyncComponent extends Component {
  @service pouch;

  @action
  async remove() {
    const { record } = this.args;

    await this.pouch.deletePouchRecord(record);
    await this.pouch.setup();
  }
}
