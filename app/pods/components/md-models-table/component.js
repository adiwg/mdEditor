import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

/**
 * Thin wrapper around ember-models-table's <ModelsTable>, supplying our
 * Font Awesome theme by default. ember-models-table@5 moved theming to an
 * injectable service rather than a manually-created class instance, and
 * requires @themeInstance to be passed in explicitly.
 */
export default class MdModelsTableComponent extends Component {
  @service('emt-themes/mdeditor-bootstrap3') themeInstance;
}
