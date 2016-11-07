import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';

export default Ember.Component.extend(ResizeAware, {
  profile: Ember.inject.service('profile'),
  resizeService: Ember.inject.service('resize'),
  links: Ember.computed('profile.active', function () {
    const profile = this.get('profile')
      .getActiveProfile();
    this.debouncedDidResize();

    return profile.secondaryNav;
  }),

  resizeWidthSensitive: true,
  resizeHeightSensitive: true,

  /**
   * translated "more" text
   *
   * @name more
   * @type {String}
   */
  more: 'More',

  /**
   * selector for the navbar container
   *
   * @name parent
   * @type {String}
   */
  parent: '#md-navbars',

  /**
   * width that needs to be subtracted from the parent div width
   *
   * @name offset
   * @type {Number}
   */
  offset: 0,

  init() {
    this._super(...arguments);

    // jQuery plugin adapted from https://github.com/tomiford/bootstrap-overflow-navs
    Ember.$.fn.overflowNavs = function (options) {
      // Create a handle to our ul menu
      // @TODO Implement some kind of check to make sure there is only one?  If we accidentally get more than one
      // then strange things happen
      let ul = Ember.$(this);

      // This should work with all navs, not just the navbar, so you should be able to pass a parent in
      let parent = options.parent ? options.parent : ul.parents(
        '.navbar');

      // Get width of the navbar parent so we know how much room we have to work with
      let parent_width = Ember.$(parent)
        .width() - (options.offset ? parseInt(Ember.$(options.offset)
          .width()) : 0);

      // Find an already existing .overflow-nav dropdown
      let dropdown = Ember.$('li.overflow-nav', ul);

      // Create one if none exists
      if (!dropdown.length) {
        dropdown = Ember.$('<li class="overflow-nav dropdown"></li>');
        dropdown.append(Ember.$(
          '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
          options.more + '<b class="caret"></b></a>'));
        dropdown.append(Ember.$('<ul class="dropdown-menu"></ul>'));
      }

      // Get the width of the navbar, need to add together <li>s as the ul wraps in bootstrap
      let width = 100;
      // Allow for padding
      ul.children('li')
        .each(function () {
          let $this = Ember.$(this);
          width += $this.outerWidth();
        });

      // Window is shrinking
      if (width >= parent_width) {
        // Loop through each non-dropdown li in the ul menu from right to left (using .get().reverse())
        Ember.$(Ember.$('li', ul)
            .not('.dropdown')
            .not('.dropdown li')
            .get()
            .reverse())
          .each(function () {
            let $this = Ember.$(this);
            // Get the width of the navbar
            let width = 100;
            // Allow for padding
            ul.children('li')
              .each(function () {
                let $this = Ember.$(this);
                width += $this.outerWidth();
              });
            if (width >= parent_width) {
              // Remember the original width so that we can restore as the window grows
              $this
                .attr('data-original-width', $this
                  .outerWidth());
              // Move the rightmost item to top of dropdown menu if we are running out of space
              dropdown.children('ul.dropdown-menu')
                .prepend(this);
            }
            // @todo on shrinking resize some menu items are still in drop down when bootstrap mobile navigation is displaying
          });
      }
      // Window is growing
      else {
        // We used to just look at the first one, but this doesn't work when the window is maximized
        //let dropdownFirstItem = dropdown.children('ul.dropdown-menu').children().first();
        dropdown.children('ul.dropdown-menu')
          .children()
          .each(function () {
            if ((width += parseInt(Ember.$(this)
                .attr('data-original-width'))) < parent_width) {
              // Restore the topmost dropdown item to the main menu
              dropdown.before(this);
            } else {
              // If the topmost item can't be restored, don't look any further
              return false;
            }
          });
      }

      // Remove or add dropdown depending on whether or not it contains menu items
      if (!dropdown.children('ul.dropdown-menu')
        .children()
        .length) {
        dropdown.remove();
      } else {
        // Append new dropdown menu to main menu iff it doesn't already exist
        if (!ul.children('li.overflow-nav')
          .length) {
          ul.append(dropdown);
        }
      }
    };
  },

  didInsertElement: function () {
    this._super.apply(this, arguments);
    this.debouncedDidResize();
  },

  debouncedDidResize() {
    let options = {
      more: this.get('more'),
      parent: this.get('parent'),
      offset: this.get('offset')
    };

    Ember.$('#md-navbar-secondary')
      .overflowNavs(options);
  }
});
