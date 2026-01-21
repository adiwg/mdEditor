import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import $ from 'jquery';
import { A } from '@ember/array';

@classic
export default class MdScrollSpyComponent extends Component {
  /**
   * mdEditor Component that enables scrollspy
   *
   * @class md-scroll-spy
   * @module mdeditor
   * @submodule components-control
   * @constructor
   */

  @service('custom-profile') profile;
  @service('router') router;
  classNames = ['md-scroll-spy'];

  /**
   * The height to offset from top of container.
   *
   * @property offset
   * @type {Number}
   * @default 110
   */
  offset = 110;

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
  get links() {
    let liquid = '';

    if($('.liquid-spy').length) {
      liquid = $('.liquid-spy .liquid-child:first > .liquid-container').length ?
        '.liquid-spy .liquid-child:first > .liquid-container:last ' :
        '.liquid-spy ';
      liquid += '.liquid-child:first ';
    }

    let $targets = $(`${liquid}[data-spy]:visible`);
    let links = A();

    $targets.each(function (idx, link) {
      let $link = $(link);

      links.pushObject({
        id: $link.attr('id'),
        text: $link.attr('data-spy'),
        embedded: $link.hasClass('md-embedded')
      });
    });

    return links;
  }

  /**
   * Setup the scrollspy on  the body element
   *
   * @method setupSpy
   */
  setupSpy() {
    $('body')
      .scrollspy({
        target: '.md-scroll-spy',
        offset: this.offset
      });
  }

  /**
   * Call setupSpy and perform initial scroll.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    super.didInsertElement(...arguments);

    let data = $('body').data('bs.scrollspy');

    if(data) {
      set(data, 'options.offset', this.offset);
    }
    this.setupSpy();

    let init = this.scrollInit;

    if(!init || init === 'top') {
      this.scroll();
    } else {
      let link = this.links.find((link) => {
        return init === link.text.dasherize();
      });

      if(link) {
        this.scroll('#' + link.id);
      } else {
        if($('#' + init)) {
          this.scroll('#' + init);
        } else {
          this.scroll();
        }
      }
    }
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if(!this.setScrollTo) {
      this.scroll();
    }
  }

  /**
   * Scrolls to the target.
   *
   * @method MyMethod
   * @param {String} id element id of target
   * @param {Boolean} hilite If true, set the spy nav link to active
   */
  scroll(id, hilite) {
    const anchor = id ? document.querySelector(id) : null;

    if(!anchor) {
      window.scrollTo({
        top: 0 - this.offset,
        behavior: 'auto'
      });
      return;
    }

    const scrollTop = anchor.getBoundingClientRect().top + window.scrollY - this.offset;
    window.scrollTo({
      top: scrollTop,
      behavior: 'auto'
    });

    if(hilite) {
      const link = document.querySelector('[href="' + id + '"]');
      if (link) {
        const li = link.closest('li');
        if (li) {
          li.classList.add('active');
        }
      }
    }

    anchor.classList.remove('md-flash');
    void anchor.offsetWidth; // Force reflow
    anchor.classList.add('md-flash');

  }

  @action
  clickLink(e) {
    let setScrollTo = this.setScrollTo;
    let target = e.currentTarget;
    let targetId = target.getAttribute('href');

    e.preventDefault();
    this.scroll(targetId);

    if((typeof setScrollTo === 'function')) {
      setScrollTo(target.textContent.dasherize());
    }
  }
}
