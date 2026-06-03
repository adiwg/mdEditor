import { get, computed } from '@ember/object';
import { bool } from '@ember/object/computed';
import classic from 'ember-classic-decorator';
import Indicator from 'mdeditor/pods/components/control/md-indicator/component';

/**
 * @module mdeditor
 * @submodule components-control
 */

/**
 * Icon that displays a popover with information on a related object.
 *
 * ```handlebars
 * {{control/md-indicator/related
 *   model=model
 *   icon="sticky-note"
 *   note="${foo} has an associated domain ${bar}"
 *   route="dictionary.show.edit.entity"
 *   values=values
 *   parent=dictionary
 *   relatedId="domainId"
 *   path="domain"
 *   title="Related Indicator Test"
 *   linkText="Go to Domain"
 *   type="warning"
 *   popperContainer="body"
 * }}
 * ```
 *
 * @class md-indicator--related
 * @extends md-indicator
 */
@classic
class MdIndicatorRelatedComponent extends Indicator {
  init() {
    super.init(...arguments);

    this.type = this.type || 'info';
    this.linkText = this.linkText || 'Open Related';
    this.classNames = ['md-indicator-related', `md-${this.type}`].concat(
      this.classNames
    );
  }
}

MdIndicatorRelatedComponent.reopen({
  isVisible: bool('related'),

  related: computed(
    'path',
    'parent',
    'model',
    'relatedId',
    'relatedIdLocal',
    function () {
      return get(this.parent, this.path).findBy(
        this.relatedId,
        get(this.model, this.relatedIdLocal || this.relatedId)
      );
    }
  ),

  relatedIndex: computed(
    'related',
    'parent',
    'path',
    function () {
      return get(this.parent, this.path).indexOf(this.related);
    }
  ),

  models: computed('routeIdPaths.[]', 'relatedIndex', 'model', function () {
    let paths = this.routeIdPaths;

    if (!paths) {
      return [];
    }

    return paths.map((p) => this.get(p));
  }),
});

export default MdIndicatorRelatedComponent;
