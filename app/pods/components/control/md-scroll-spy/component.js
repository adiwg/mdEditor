import {
  inject as service
} from '@ember/service';
import {
  set,
  computed
} from '@ember/object';
import Component from '@ember/component';
import {
  A
} from '@ember/array';

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

    const liquidSpy = document.querySelector('.liquid-spy');
    if(liquidSpy) {
      const hasContainer = liquidSpy.querySelector('.liquid-child:first-child > .liquid-container');
      liquid = hasContainer ?
        '.liquid-spy .liquid-child:first-child > .liquid-container:last-child ' :
        '.liquid-spy ';
      liquid += '.liquid-child:first-child ';
    }

    // Find all visible elements with data-spy attribute
    const selector = `${liquid}[data-spy]`;
    const targets = Array.from(document.querySelectorAll(selector)).filter(el => {
      return el.offsetParent !== null; // Check if element is visible
    });
    let links = A();

    targets.forEach((link) => {
      links.pushObject({
        id: link.getAttribute('id'),
        text: link.getAttribute('data-spy'),
        embedded: link.classList.contains('md-embedded')
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
    let target = e.currentTarget;
    let targetId = target.getAttribute('href');

    e.preventDefault();
    this.scroll(targetId);

    if((typeof setScrollTo === 'function')) {
      setScrollTo(target.textContent.dasherize());
    }
  },

  /**
   * Setup the scrollspy on  the body element
   *
   * @method setupSpy
   */
  setupSpy() {
    // Use Bootstrap 5 Scrollspy API
    const scrollSpyElement = document.body;
    if (scrollSpyElement) {
      const scrollSpy = bootstrap.ScrollSpy.getOrCreateInstance(scrollSpyElement, {
        target: '.md-scroll-spy',
        offset: this.offset
      });
    }
  },

  /**
   * Call setupSpy and perform initial scroll.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments);

    // Get existing Bootstrap ScrollSpy instance if any
    const scrollSpyInstance = bootstrap.ScrollSpy.getInstance(document.body);
    if(scrollSpyInstance) {
      scrollSpyInstance._config.offset = this.offset;
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
        const initElement = document.getElementById(init);
        if(initElement) {
          this.scroll('#' + init);
        } else {
          this.scroll();
        }
      }
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if(!this.setScrollTo) {
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

  },

  actions: {
    clickLink(e) {
      this.clickLink(e);
    }
  }
});
