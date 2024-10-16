import { inject as service } from '@ember/service';
import { set, computed } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';
import { A } from '@ember/array';

export default Component.extend({
  /**
   * mdEditor Component that enables scrollspy
   *
   * @class md-scroll-spy
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  profile: service('profile'),
  router: service('router'),
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
   * The initial scroll target when the component is inserted.
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
   * Array of data objects for the navigation links.
   *
   * @property links
   * @type {Array}
   * @category computed
   * @requires refresh,profile.active
   */
  links: computed('refresh', 'profile.active', function () {
    let liquid = '';

    if ($('.liquid-spy').length) {
      liquid = $('.liquid-spy .liquid-child:first > .liquid-container').length
        ? '.liquid-spy .liquid-child:first > .liquid-container:last '
        : '.liquid-spy ';
      liquid += '.liquid-child:first ';
    }

    let $targets = $(`${liquid}[data-spy]:visible`);
    let links = A();

    $targets.each(function (idx, link) {
      let $link = $(link);

      links.pushObject({
        id: $link.attr('id'),
        text: $link.attr('data-spy'),
        embedded: $link.hasClass('md-embedded'),
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
    let setScrollTo = this.setScrollTo;
    let $target = $(e.currentTarget);
    let targetId = $target.attr('href');

    e.preventDefault();
    this.scroll(targetId);

    if (typeof setScrollTo === 'function') {
      setScrollTo($target.text().dasherize());
    }
  },

  /**
   * Setup the scrollspy on  the body element
   *
   * @method setupSpy
   */
  setupSpy() {
    $('body').scrollspy({
      target: '.md-scroll-spy',
      offset: this.offset,
    });
  },

  /**
   * Call setupSpy and perform initial scroll.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);

    let data = $('body').data('bs.scrollspy');

    if (data) {
      set(data, 'options.offset', this.offset);
    }
    this.setupSpy();

    let init = this.scrollInit;

    if (!init || init === 'top') {
      this.scroll();
    } else {
      let link = this.links.find((link) => {
        return init === link.text.dasherize();
      });

      if (link) {
        this.scroll('#' + link.id);
      } else {
        if ($('#' + init)) {
          this.scroll('#' + init);
        } else {
          this.scroll();
        }
      }
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.setScrollTo) {
      this.scroll();
    }
  },

  /**
   * Scrolls to the target.
   *
   * @method MyMethod
   * @param {String} id element id of target
   * @param {Boolean} hilite If true, set the spy nav link to active
   */
  scroll(id, hilite) {
    let $anchor = $(id);

    if ($anchor.length === 0) {
      $('html, body').scrollTop(0 - this.offset);
      return;
    }
    $('html, body').scrollTop($anchor.offset().top - this.offset);

    if (hilite) {
      $('[href="' + id + '"]')
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
    },
  },
});
