import Ember from 'ember';

const {
  Component,
  computed,
  $,
  A,
  get
} = Ember;

export default Component.extend({
  /**
   * mdEditor Component that enables scrollspy
   *
   * @class md-scroll-spy
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  classNames: ['md-scroll-spy'],

  /**
   * The height to offset from top of container.
   *
   * @property offset
   * @type {Number}
   * @default 110
   */
  offset: 110,

  /**
   * The initial scroll target wgen the comopnent is inserted.
   *
   * @property scrollInit
   * @type {String}
   */

  /**
   * The method(action) used to set the scroll target. Should accept a string with
   * the target.
   *
   * @method setScrollTo
   * @param {String} scrollTo The scroll target
   */

  /**
   * Array of data objects for the navigatoin links.
   *
   * @property links
   * @type {Array}
   * @category computed
   * @requires
   */
  links: computed(function () {
    //console.info('computed links');

    let liquid = '';

    if($('.liquid-spy').length) {
      liquid = $('.liquid-spy .liquid-child:first .liquid-container').length ?
        '.liquid-spy .liquid-child:first .liquid-container:last ' :
        '.liquid-spy ';
      liquid += '.liquid-child:first ';
    }

    let $targets = $(`${liquid}[data-spy]:visible`);
    let links = A();

    $targets.each(function (idx, link) {
      let $link = $(link);

      links.pushObject({
        id: $link.attr('id'),
        text: $link.data('spy'),
        embedded: $link.hasClass('md-embedded')
      });
    });

    return links;
  }),

  /**
   * Click handler for nav links.
   *
   * @method clickLink
   * @param {Event} e The click event.
   */
  clickLink(e) {
    let setScrollTo = this.get('setScrollTo');
    let $target = $(e.currentTarget);
    let targetId = $target.attr('href');

    e.preventDefault();
    this.scroll(targetId);

    if((typeof setScrollTo === 'function')) {
      setScrollTo($target.text().dasherize());
    }
  },

  /**
   * Setup the scrollspy on  the body element
   *
   * @method setupSpy
   */
  setupSpy() {
    $('body')
      .scrollspy({
        target: '.md-scroll-spy',
        offset: get(this, 'offset')
      });
  },

  /**
   * Call setupSpy and perform initial scroll.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);
    this.setupSpy();

    let init = this.get('scrollInit');

    if(!init || init === 'top') {
      this.scroll();
    } else {
      let link = this.get('links').find((link) => {
        return init === link.text.dasherize();
      });

      if(link) {
        this.scroll('#' + link.id);
      }
    }
  },

  /**
   * Scrolls to the target.
   *
   * @method MyMethod
   * @param {String} id elemnet id of target
   * @param {Boolean} hilite If true, set the spy nav link to active
   */
  scroll(id, hilite) {
    let $anchor = $(id);

    if($anchor.length === 0) {
      $('body').scrollTop(0 - get(this, 'offset'));
      return;
    }
    $('body').scrollTop($anchor.offset().top - get(this, 'offset'));

    if(hilite) {
      $('[href=#' + id + ']')
        .closest('li')
        .addClass('active');
    }

    $anchor.removeClass('md-flash');
    void $anchor[0].offsetWidth;
    $anchor.addClass('md-flash');

  },

  actions: {
    clickLink(e) {
      this.clickLink(e);
    }
  }
});
