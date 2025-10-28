import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import classic from 'ember-classic-decorator';
import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import layout from './template';

/* global $ */

export default Component.extend({
  /**
   * Component that renders a Bootstrap card.
   *
   * ```handlebars
   * \{{#layout/md-card
   *   title="title"
   *   collapsible=true
   *   collapsed=false
   *   profilePath="card"
   *   data-spy="Card"
   *   shadow=true
   * }}
   *   Content
   * {{/layout/md-card}}
   * ```
   * @module mdeditor
   * @submodule components-layout
   * @class md-card
   * @constructor
   */

  // init() {
  //   this._super(...arguments);
  //
  //   let content = this.get('content');
  //
  //   if(content !== null) {
  //     let empty = content ? Object.keys(this.get('cleaner').clean(content, {
  //         preserveArrays: false
  //       })).length ===
  //       0 : true;
  //
  //     this.set('collapsed', empty);
  //   }
  // },

  spotlight: service(),
  cleaner: service(),

  classNames: ['md-card', 'card'],
  classNameBindings: [
    'shadow:box-shadow--4dp',
    'scroll:scroll-card',
    'maximizable',
    'fullScreen',
    'required',
    'muted',
    'borderColor',
  ],
  attributeBindings: ['data-spy'],

  content: null,
  /**
   * The card element id.
   *
   * @property cardId
   * @type {String}
   * @readOnly
   * @category computed
   * @requires elementId
   */
  cardId: computed('elementId', function () {
    return 'card-' + this.elementId;
  }).readOnly(),

  /**
   * The card title.
   *
   * @property title
   * @type {String}
   * @required
   */

  /**
   * The card title icon.
   *
   * @property titleIcon
   * @type {String}
   */

  /**
   * If true, the "row" the card body will be initally collapsed.
   *
   * @property collapsed
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the spotlight button will be inserted into the toolbar.
   *
   * @property spotlightEnabled
   * @type {Boolean}
   * @default true
   */
  spotlightEnabled: true,

  /**
   * If true, the scroll-card class will be applied to the card.
   *
   * @property scroll
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the maximize control will be avialable on the card.
   *
   * @property maximizable
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, a box shadow will be rendered around the card.
   *
   * @property shadow
   * @type {Boolean}
   * @default true
   */
  shadow: true,

  /**
   * If true, the card header will have a white background.
   *
   * @property plain
   * @type {Boolean}
   * @default false
   */
  plain: false,

  /**
   * If true, the card-block class will be added.
   *
   * @property block
   * @type {Boolean}
   * @default true
   */
  block: true,

  /**
   * If true, the card-flex class will be added.
   *
   * @property flex
   * @type {Boolean}
   * @default false
   */
  flex: false,

  /**
   * If true, the card-block text color will be muted.
   *
   * @property muted
   * @type {Boolean}
   * @default false
   */
  muted: false,

  /**
   * If true, the collapse control will be added to the card header.
   *
   * @property collapsible
   * @type {Boolean}
   * @default undefined
   */

  /**
   * If true, the "row" class will be added to the card body.
   *
   * @property bodyIsRow
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Bootstrap button class to apply to header buttton
   *
   * @property btnClass
   * @type {String}
   * @default 'primary'
   */
  btnClass: 'primary',

  /**
   * Icon to display in header button
   *
   * @property btnIcon
   * @type {String}
   * @default undefined
   */

  /**
   * Border color
   *
   * @property border
   * @type {String}
   * @default undefined
   */

  /**
   * The text to display in the header button.
   * @property btnText
   * @type {String}
   * @default undefined
   */

  /**
   * The action to perform whrn the header button is clicked.
   * @property btnAction
   * @type {Function}
   * @default undefined
   */

  /**
   * The action to perform when delete button is clicked.
   * @property deleteAction
   * @type {Function}
   * @default undefined
   */

  /**
   * The height to offset from top of container when scrolling.
   *
   * @property offset
   * @type {Number}
   * @default 130
   */
  offset: 130,

  /**
   * The data-spy text. Defaults to the title.
   *
   * @property data-spy
   * @type {String}
   * @default "this.title"
   * @category computed
   */
  'data-spy': oneWay('title'),

  borderColor: computed('border', function () {
    return this.border ? 'border-' + this.border : null;
  }),

  windowIcon: computed('fullScreen', function () {
    return this.fullScreen ? 'compress' : 'expand';
  }),

  isCollapsible: computed('fullScreen', 'collapsible', function () {
    return !this.fullScreen && this.collapsible;
  }),

  didInsertElement() {
    this._super(...arguments);

    if (this.collapsible) {
      let card = this.element;
      let body = card.querySelector('.card-collapse');
      let offset = this.offset || 0;

      if (body) {
        body.addEventListener('shown.bs.collapse', (e) => {
          e.stopPropagation();

          // Smooth scroll to card position with offset
          const cardTop = card.getBoundingClientRect().top + window.pageYOffset;
          const targetPosition = cardTop - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        });
      }
    }

    let content = this.content;

    if (content !== null) {
      let empty = content
        ? Object.keys(
            this.cleaner.clean(content, {
              preserveArrays: false,
            })
          ).length === 0
        : true;

      this.set('collapsed', empty);
    }
  },

  actions: {
    toggleFullScreen() {
      let val = this.toggleProperty('fullScreen');

      // Toggle full-screen class on parent elements
      let parent = this.element.closest(
        '.liquid-child, .liquid-container, .md-card'
      );
      if (parent) {
        parent.classList.toggle('full-screen', val);
      }

      // Toggle slider class on body
      document.body.classList.toggle('slider', val);
    },
    spotlight(id) {
      this.spotlight.setTarget(id);
    },
  },
});
