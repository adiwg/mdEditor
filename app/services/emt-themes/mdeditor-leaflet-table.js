import { ensureSafeComponent } from '@embroider/util';
import LeafletTableRow from 'ember-leaflet-table/components/leaflet-table-row';
import MdeditorBootstrap3Theme from './mdeditor-bootstrap3';

/**
 * Theme used by the leaflet feature table: same look as the app's default
 * bootstrap3 theme, but rows are highlighted on hover (and support
 * double-click-to-edit) via LeafletTableRow.
 */
export default class MdeditorLeafletTableTheme extends MdeditorBootstrap3Theme {
  get rowComponent() {
    return ensureSafeComponent(LeafletTableRow, this);
  }
}
