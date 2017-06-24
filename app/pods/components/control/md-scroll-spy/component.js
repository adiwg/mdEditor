import Ember from 'ember';

const {
  Component,
  $,
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

  setupSpy() {
    let liquid = '';

    if ($('.liquid-spy').length) {
      liquid = $('.liquid-spy .liquid-child:first .liquid-container').length ?
        '.liquid-spy .liquid-child:first .liquid-container:last ' :
        '.liquid-spy ';
      liquid += '.liquid-child:first ';
    }

    let $links = $(`${liquid}[data-spy]:visible`);
    //let $this  = this.$();
    let $ul = $('<ul class="nav nav-pills nav-stacked"></ul>');
    $links.each(function(idx, link) {
      let $link = $(link);
      let id = $link.attr('id');
      let text = $link.data('spy');

      $ul.append($(`<li><a href="#${id}">${text}</a></li>`));

    });

    this.$()
      .html($ul);

    //$('body').data('spy', 'scroll');
    $('body')
      .scrollspy({
        target: '.md-scroll-spy',
        offset: get(this, 'offset')
      });

    this.$('a')
      .on('click', (e) => {
        let targetId = $(e.currentTarget).attr('href');
        e.preventDefault();
        this.scroll(targetId);
      });

    let init = this.get('scrollInit');

    if (init) {
      this.scroll('#' + init);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupSpy();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.setupSpy();
  },

  scroll(id, hilite) {
    let $anchor = $(id);

    if ($anchor) {
      $('body')
        .scrollTop($anchor.offset()
          .top - get(this, 'offset'));

      if (hilite) {
        $('[href=#' + id + ']')
          .closest('li')
          .addClass('active');
      }

      $anchor.removeClass('md-flash');
      void $anchor[0].offsetWidth;
      $anchor.addClass('md-flash');
    }
  }
});
