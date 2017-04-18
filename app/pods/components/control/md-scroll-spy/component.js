import Ember from 'ember';

const {
  Component,
  $
} = Ember;

export default Component.extend({
  classNames: ['md-scroll-spy'],

  didInsertElement() {
    let $links = $('[data-spy]');
    //let $this  = this.$();
    let $ul = $('<ul class="nav nav-pills nav-stacked"></ul>');
    $links.each(function(idx, link) {
      let $link = $(link);
      let id = $link.attr('id');
      let text = $link.data('spy');

      $ul.append($(`<li><a href="#${id}">${text}</a></li>`));

    });

    this.$().append($ul);

    //$('body').data('spy', 'scroll');
    $('body').scrollspy({
      target: '.md-scroll-spy',
      offset: 110
    });

    this.$('a').on('click', (e) => {
      e.preventDefault();
      this.scroll(e.currentTarget);
    });
  },

  scroll: function(anchor, hilite) {
    let $anchor = $($(anchor).attr('href'));

    if ($anchor) {
      $('body').scrollTop($anchor.offset().top - 100);

      if (hilite) {
        $('[href=#' + anchor + ']').closest('li').addClass('active');
      }
    }
  }
});
