import Component from '@ember/component';
import classic from 'ember-classic-decorator';

/**
 * Component used as a wrapper, data-spy enabled.
 *
 * ```handlebars
 * \{{#layout/md-wrap
 *   data-spy="Wrap"
 *   shadow=true
 * }}
 *   Content
 * {{/layout/md-wrap}}
 * ```
 * @module mdeditor
 * @submodule components-layout
 * @class md-wrap
 * @constructor
 */
@classic
export default class MdWrap extends Component {}
