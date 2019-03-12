'use strict';

define('@ember/test-helpers/-utils', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nextTickPromise = nextTickPromise;
  exports.runDestroyablesFor = runDestroyablesFor;
  exports.isNumeric = isNumeric;
  const nextTick = exports.nextTick = setTimeout;
  const futureTick = exports.futureTick = setTimeout;

  /**
   @private
   @returns {Promise<void>} promise which resolves on the next turn of the event loop
  */
  function nextTickPromise() {
    return new Ember.RSVP.Promise(resolve => {
      nextTick(resolve);
    });
  }

  /**
   Retrieves an array of destroyables from the specified property on the object
   provided, iterates that array invoking each function, then deleting the
   property (clearing the array).
  
   @private
   @param {Object} object an object to search for the destroyable array within
   @param {string} property the property on the object that contains the destroyable array
  */
  function runDestroyablesFor(object, property) {
    let destroyables = object[property];

    if (!destroyables) {
      return;
    }

    for (let i = 0; i < destroyables.length; i++) {
      destroyables[i]();
    }

    delete object[property];
  }

  /**
   Returns whether the passed in string consists only of numeric characters.
  
   @private
   @param {string} n input string
   @returns {boolean} whether the input string consists only of numeric characters
   */
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
});
define('@ember/test-helpers/application', ['exports', '@ember/test-helpers/resolver'], function (exports, _resolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setApplication = setApplication;
  exports.getApplication = getApplication;


  var __application__;

  /**
    Stores the provided application instance so that tests being ran will be aware of the application under test.
  
    - Required by `setupApplicationContext` method.
    - Used by `setupContext` and `setupRenderingContext` when present.
  
    @public
    @param {Ember.Application} application the application that will be tested
  */
  function setApplication(application) {
    __application__ = application;

    if (!(0, _resolver.getResolver)()) {
      let Resolver = application.Resolver;
      let resolver = Resolver.create({ namespace: application });

      (0, _resolver.setResolver)(resolver);
    }
  }

  /**
    Retrieve the application instance stored by `setApplication`.
  
    @public
    @returns {Ember.Application} the previously stored application instance under test
  */
  function getApplication() {
    return __application__;
  }
});
define('@ember/test-helpers/build-owner', ['exports', 'ember-test-helpers/legacy-0-6-x/build-registry'], function (exports, _buildRegistry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = buildOwner;


  /**
    Creates an "owner" (an object that either _is_ or duck-types like an
    `Ember.ApplicationInstance`) from the provided options.
  
    If `options.application` is present (e.g. setup by an earlier call to
    `setApplication`) an `Ember.ApplicationInstance` is built via
    `application.buildInstance()`.
  
    If `options.application` is not present, we fall back to using
    `options.resolver` instead (setup via `setResolver`). This creates a mock
    "owner" by using a custom created combination of `Ember.Registry`,
    `Ember.Container`, `Ember._ContainerProxyMixin`, and
    `Ember._RegistryProxyMixin`.
  
    @private
    @param {Ember.Application} [application] the Ember.Application to build an instance from
    @param {Ember.Resolver} [resolver] the resolver to use to back a "mock owner"
    @returns {Promise<Ember.ApplicationInstance>} a promise resolving to the generated "owner"
  */
  function buildOwner(application, resolver) {
    if (application) {
      return application.boot().then(app => app.buildInstance().boot());
    }

    if (!resolver) {
      throw new Error('You must set up the ember-test-helpers environment with either `setResolver` or `setApplication` before running any tests.');
    }

    var _legacyBuildRegistry = (0, _buildRegistry.default)(resolver);

    let owner = _legacyBuildRegistry.owner;

    return Ember.RSVP.Promise.resolve(owner);
  }
});
define('@ember/test-helpers/dom/-get-element', ['exports', '@ember/test-helpers/dom/get-root-element'], function (exports, _getRootElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getElement;


  /**
    Used internally by the DOM interaction helpers to find one element.
  
    @private
    @param {string|Element} target the element or selector to retrieve
    @returns {Element} the target or selector
  */
  function getElement(target) {
    if (target.nodeType === Node.ELEMENT_NODE || target.nodeType === Node.DOCUMENT_NODE || target instanceof Window) {
      return target;
    } else if (typeof target === 'string') {
      let rootElement = (0, _getRootElement.default)();

      return rootElement.querySelector(target);
    } else {
      throw new Error('Must use an element or a selector string');
    }
  }
});
define('@ember/test-helpers/dom/-get-elements', ['exports', '@ember/test-helpers/dom/get-root-element'], function (exports, _getRootElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getElements;


  /**
    Used internally by the DOM interaction helpers to find multiple elements.
  
    @private
    @param {string} target the selector to retrieve
    @returns {NodeList} the matched elements
  */
  function getElements(target) {
    if (typeof target === 'string') {
      let rootElement = (0, _getRootElement.default)();

      return rootElement.querySelectorAll(target);
    } else {
      throw new Error('Must use a selector string');
    }
  }
});
define('@ember/test-helpers/dom/-is-focusable', ['exports', '@ember/test-helpers/dom/-is-form-control'], function (exports, _isFormControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFocusable;


  const FOCUSABLE_TAGS = ['A'];

  /**
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is focusable, `false` otherwise
  */
  function isFocusable(element) {
    if ((0, _isFormControl.default)(element) || element.isContentEditable || FOCUSABLE_TAGS.indexOf(element.tagName) > -1) {
      return true;
    }

    return element.hasAttribute('tabindex');
  }
});
define('@ember/test-helpers/dom/-is-form-control', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFormControl;
  const FORM_CONTROL_TAGS = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'];

  /**
    @private
    @param {Element} element the element to check
    @returns {boolean} `true` when the element is a form control, `false` otherwise
  */
  function isFormControl(element) {
    let tagName = element.tagName,
        type = element.type;


    if (type === 'hidden') {
      return false;
    }

    return FORM_CONTROL_TAGS.indexOf(tagName) > -1;
  }
});
define("@ember/test-helpers/dom/-to-array", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toArray;
  /**
    @private
    @param {NodeList} nodelist the nodelist to convert to an array
    @returns {Array} an array
  */
  function toArray(nodelist) {
    let array = new Array(nodelist.length);
    for (let i = 0; i < nodelist.length; i++) {
      array[i] = nodelist[i];
    }

    return array;
  }
});
define('@ember/test-helpers/dom/blur', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _isFocusable, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__blur__ = __blur__;
  exports.default = blur;


  /**
    @private
    @param {Element} element the element to trigger events on
  */
  function __blur__(element) {
    let browserIsNotFocused = document.hasFocus && !document.hasFocus();

    // makes `document.activeElement` be `body`.
    // If the browser is focused, it also fires a blur event
    element.blur();

    // Chrome/Firefox does not trigger the `blur` event if the window
    // does not have focus. If the document does not have focus then
    // fire `blur` event via native event.
    if (browserIsNotFocused) {
      (0, _fireEvent.default)(element, 'blur', { bubbles: false });
      (0, _fireEvent.default)(element, 'focusout');
    }
  }

  /**
    Unfocus the specified target.
  
    Sends a number of events intending to simulate a "real" user unfocusing an
    element.
  
    The following events are triggered (in order):
  
    - `blur`
    - `focusout`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle unfocusing a given element.
  
    @public
    @param {string|Element} [target=document.activeElement] the element or selector to unfocus
    @return {Promise<void>} resolves when settled
  */
  function blur(target = document.activeElement) {
    return (0, _utils.nextTickPromise)().then(() => {
      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`blur('${target}')\`.`);
      }

      if (!(0, _isFocusable.default)(element)) {
        throw new Error(`${target} is not focusable`);
      }

      __blur__(element);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/click', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/dom/focus', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils', '@ember/test-helpers/dom/-is-form-control'], function (exports, _getElement, _fireEvent, _focus, _settled, _isFocusable, _utils, _isFormControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__click__ = __click__;
  exports.default = click;


  /**
    @private
    @param {Element} element the element to click on
    @param {Object} options the options to be merged into the mouse events
  */
  function __click__(element, options) {
    (0, _fireEvent.default)(element, 'mousedown', options);

    if ((0, _isFocusable.default)(element)) {
      (0, _focus.__focus__)(element);
    }

    (0, _fireEvent.default)(element, 'mouseup', options);
    (0, _fireEvent.default)(element, 'click', options);
  }

  /**
    Clicks on the specified target.
  
    Sends a number of events intending to simulate a "real" user clicking on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `mousedown`
    - `mouseup`
    - `click`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle clicking a given element.
  
    Use the `options` hash to change the parameters of the MouseEvents. 
  
    @public
    @param {string|Element} target the element or selector to click on
    @param {Object} options the options to be merged into the mouse events
    @return {Promise<void>} resolves when settled
  */
  function click(target, options = {}) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `click`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`click('${target}')\`.`);
      }

      let isDisabledFormControl = (0, _isFormControl.default)(element) && element.disabled === true;

      if (!isDisabledFormControl) {
        __click__(element, options);
      }

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/double-click', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/dom/focus', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _focus, _settled, _isFocusable, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__doubleClick__ = __doubleClick__;
  exports.default = doubleClick;


  /**
    @private
    @param {Element} element the element to double-click on
    @param {Object} options the options to be merged into the mouse events
  */
  function __doubleClick__(element, options) {
    (0, _fireEvent.default)(element, 'mousedown', options);

    if ((0, _isFocusable.default)(element)) {
      (0, _focus.__focus__)(element);
    }

    (0, _fireEvent.default)(element, 'mouseup', options);
    (0, _fireEvent.default)(element, 'click', options);
    (0, _fireEvent.default)(element, 'mousedown', options);
    (0, _fireEvent.default)(element, 'mouseup', options);
    (0, _fireEvent.default)(element, 'click', options);
    (0, _fireEvent.default)(element, 'dblclick', options);
  }

  /**
    Double-clicks on the specified target.
  
    Sends a number of events intending to simulate a "real" user clicking on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `mousedown`
    - `mouseup`
    - `click`
    - `mousedown`
    - `mouseup`
    - `click`
    - `dblclick`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
    - `mousedown`
    - `mouseup`
    - `click`
    - `dblclick`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle clicking a given element.
  
    Use the `options` hash to change the parameters of the MouseEvents. 
  
    @public
    @param {string|Element} target the element or selector to double-click on
    @param {Object} options the options to be merged into the mouse events
    @return {Promise<void>} resolves when settled
  */
  function doubleClick(target, options = {}) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `doubleClick`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`doubleClick('${target}')\`.`);
      }

      __doubleClick__(element, options);
      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/fill-in', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/-is-form-control', '@ember/test-helpers/dom/focus', '@ember/test-helpers/settled', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/-utils'], function (exports, _getElement, _isFormControl, _focus, _settled, _fireEvent, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fillIn;


  /**
    Fill the provided text into the `value` property (or set `.innerHTML` when
    the target is a content editable element) then trigger `change` and `input`
    events on the specified target.
  
    @public
    @param {string|Element} target the element or selector to enter text into
    @param {string} text the text to fill into the target element
    @return {Promise<void>} resolves when the application is settled
  */
  function fillIn(target, text) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `fillIn`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`fillIn('${target}')\`.`);
      }
      let isControl = (0, _isFormControl.default)(element);
      if (!isControl && !element.isContentEditable) {
        throw new Error('`fillIn` is only usable on form controls or contenteditable elements.');
      }

      if (typeof text === 'undefined' || text === null) {
        throw new Error('Must provide `text` when calling `fillIn`.');
      }

      (0, _focus.__focus__)(element);

      if (isControl) {
        element.value = text;
      } else {
        element.innerHTML = text;
      }

      (0, _fireEvent.default)(element, 'input');
      (0, _fireEvent.default)(element, 'change');

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/find-all', ['exports', '@ember/test-helpers/dom/-get-elements', '@ember/test-helpers/dom/-to-array'], function (exports, _getElements, _toArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = find;


  /**
    Find all elements matched by the given selector. Equivalent to calling
    `querySelectorAll()` on the test root element.
  
    @public
    @param {string} selector the selector to search for
    @return {Array} array of matched elements
  */
  function find(selector) {
    if (!selector) {
      throw new Error('Must pass a selector to `findAll`.');
    }

    if (arguments.length > 1) {
      throw new Error('The `findAll` test helper only takes a single argument.');
    }

    return (0, _toArray.default)((0, _getElements.default)(selector));
  }
});
define('@ember/test-helpers/dom/find', ['exports', '@ember/test-helpers/dom/-get-element'], function (exports, _getElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = find;


  /**
    Find the first element matched by the given selector. Equivalent to calling
    `querySelector()` on the test root element.
  
    @public
    @param {string} selector the selector to search for
    @return {Element} matched element or null
  */
  function find(selector) {
    if (!selector) {
      throw new Error('Must pass a selector to `find`.');
    }

    if (arguments.length > 1) {
      throw new Error('The `find` test helper only takes a single argument.');
    }

    return (0, _getElement.default)(selector);
  }
});
define('@ember/test-helpers/dom/fire-event', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = fireEvent;


  // eslint-disable-next-line require-jsdoc
  const MOUSE_EVENT_CONSTRUCTOR = (() => {
    try {
      new MouseEvent('test');
      return true;
    } catch (e) {
      return false;
    }
  })();
  const DEFAULT_EVENT_OPTIONS = { bubbles: true, cancelable: true };
  const KEYBOARD_EVENT_TYPES = exports.KEYBOARD_EVENT_TYPES = Object.freeze(['keydown', 'keypress', 'keyup']);
  const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];
  const FILE_SELECTION_EVENT_TYPES = ['change'];

  /**
    Internal helper used to build and dispatch events throughout the other DOM helpers.
  
    @private
    @param {Element} element the element to dispatch the event to
    @param {string} eventType the type of event
    @param {Object} [options] additional properties to be set on the event
    @returns {Event} the event that was dispatched
  */
  function fireEvent(element, eventType, options = {}) {
    if (!element) {
      throw new Error('Must pass an element to `fireEvent`');
    }

    let event;
    if (KEYBOARD_EVENT_TYPES.indexOf(eventType) > -1) {
      event = buildKeyboardEvent(eventType, options);
    } else if (MOUSE_EVENT_TYPES.indexOf(eventType) > -1) {
      let rect;
      if (element instanceof Window) {
        rect = element.document.documentElement.getBoundingClientRect();
      } else if (element.nodeType === Node.DOCUMENT_NODE) {
        rect = element.documentElement.getBoundingClientRect();
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        rect = element.getBoundingClientRect();
      } else {
        return;
      }

      let x = rect.left + 1;
      let y = rect.top + 1;
      let simulatedCoordinates = {
        screenX: x + 5, // Those numbers don't really mean anything.
        screenY: y + 95, // They're just to make the screenX/Y be different of clientX/Y..
        clientX: x,
        clientY: y
      };

      event = buildMouseEvent(eventType, Ember.assign(simulatedCoordinates, options));
    } else if (FILE_SELECTION_EVENT_TYPES.indexOf(eventType) > -1 && element.files) {
      event = buildFileEvent(eventType, element, options);
    } else {
      event = buildBasicEvent(eventType, options);
    }

    element.dispatchEvent(event);
    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildBasicEvent(type, options = {}) {
    let event = document.createEvent('Events');

    let bubbles = options.bubbles !== undefined ? options.bubbles : true;
    let cancelable = options.cancelable !== undefined ? options.cancelable : true;

    delete options.bubbles;
    delete options.cancelable;

    // bubbles and cancelable are readonly, so they can be
    // set when initializing event
    event.initEvent(type, bubbles, cancelable);
    Ember.assign(event, options);
    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildMouseEvent(type, options = {}) {
    let event;
    let eventOpts = Ember.assign({ view: window }, DEFAULT_EVENT_OPTIONS, options);
    if (MOUSE_EVENT_CONSTRUCTOR) {
      event = new MouseEvent(type, eventOpts);
    } else {
      try {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent(type, eventOpts.bubbles, eventOpts.cancelable, window, eventOpts.detail, eventOpts.screenX, eventOpts.screenY, eventOpts.clientX, eventOpts.clientY, eventOpts.ctrlKey, eventOpts.altKey, eventOpts.shiftKey, eventOpts.metaKey, eventOpts.button, eventOpts.relatedTarget);
      } catch (e) {
        event = buildBasicEvent(type, options);
      }
    }

    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildKeyboardEvent(type, options = {}) {
    let eventOpts = Ember.assign({}, DEFAULT_EVENT_OPTIONS, options);
    let event, eventMethodName;

    try {
      event = new KeyboardEvent(type, eventOpts);

      // Property definitions are required for B/C for keyboard event usage
      // If this properties are not defined, when listening for key events
      // keyCode/which will be 0. Also, keyCode and which now are string
      // and if app compare it with === with integer key definitions,
      // there will be a fail.
      //
      // https://w3c.github.io/uievents/#interface-keyboardevent
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
      Object.defineProperty(event, 'keyCode', {
        get() {
          return parseInt(eventOpts.keyCode);
        }
      });

      Object.defineProperty(event, 'which', {
        get() {
          return parseInt(eventOpts.which);
        }
      });

      return event;
    } catch (e) {
      // left intentionally blank
    }

    try {
      event = document.createEvent('KeyboardEvents');
      eventMethodName = 'initKeyboardEvent';
    } catch (e) {
      // left intentionally blank
    }

    if (!event) {
      try {
        event = document.createEvent('KeyEvents');
        eventMethodName = 'initKeyEvent';
      } catch (e) {
        // left intentionally blank
      }
    }

    if (event) {
      event[eventMethodName](type, eventOpts.bubbles, eventOpts.cancelable, window, eventOpts.ctrlKey, eventOpts.altKey, eventOpts.shiftKey, eventOpts.metaKey, eventOpts.keyCode, eventOpts.charCode);
    } else {
      event = buildBasicEvent(type, options);
    }

    return event;
  }

  // eslint-disable-next-line require-jsdoc
  function buildFileEvent(type, element, files = []) {
    let event = buildBasicEvent(type);

    if (files.length > 0) {
      Object.defineProperty(files, 'item', {
        value(index) {
          return typeof index === 'number' ? this[index] : null;
        }
      });
      Object.defineProperty(element, 'files', {
        value: files,
        configurable: true
      });
    }

    Object.defineProperty(event, 'target', {
      value: element
    });

    return event;
  }
});
define('@ember/test-helpers/dom/focus', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-is-focusable', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _isFocusable, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.__focus__ = __focus__;
  exports.default = focus;


  /**
    @private
    @param {Element} element the element to trigger events on
  */
  function __focus__(element) {
    let browserIsNotFocused = document.hasFocus && !document.hasFocus();

    // makes `document.activeElement` be `element`. If the browser is focused, it also fires a focus event
    element.focus();

    // Firefox does not trigger the `focusin` event if the window
    // does not have focus. If the document does not have focus then
    // fire `focusin` event as well.
    if (browserIsNotFocused) {
      // if the browser is not focused the previous `el.focus()` didn't fire an event, so we simulate it
      (0, _fireEvent.default)(element, 'focus', {
        bubbles: false
      });

      (0, _fireEvent.default)(element, 'focusin');
    }
  }

  /**
    Focus the specified target.
  
    Sends a number of events intending to simulate a "real" user focusing an
    element.
  
    The following events are triggered (in order):
  
    - `focus`
    - `focusin`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle focusing a given element.
  
    @public
    @param {string|Element} target the element or selector to focus
    @return {Promise<void>} resolves when the application is settled
  */
  function focus(target) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `focus`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`focus('${target}')\`.`);
      }

      if (!(0, _isFocusable.default)(element)) {
        throw new Error(`${target} is not focusable`);
      }

      __focus__(element);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/get-root-element', ['exports', '@ember/test-helpers/setup-context'], function (exports, _setupContext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getRootElement;


  /**
    Get the root element of the application under test (usually `#ember-testing`)
  
    @public
    @returns {Element} the root element
  */
  function getRootElement() {
    let context = (0, _setupContext.getContext)();
    let owner = context && context.owner;

    if (!owner) {
      throw new Error('Must setup rendering context before attempting to interact with elements.');
    }

    let rootElement;
    // When the host app uses `setApplication` (instead of `setResolver`) the owner has
    // a `rootElement` set on it with the element or id to be used
    if (owner && owner._emberTestHelpersMockOwner === undefined) {
      rootElement = owner.rootElement;
    } else {
      rootElement = '#ember-testing';
    }

    if (rootElement.nodeType === Node.ELEMENT_NODE || rootElement.nodeType === Node.DOCUMENT_NODE || rootElement instanceof Window) {
      return rootElement;
    } else if (typeof rootElement === 'string') {
      return document.querySelector(rootElement);
    } else {
      throw new Error('Application.rootElement must be an element or a selector string');
    }
  }
});
define('@ember/test-helpers/dom/tap', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/dom/click', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _click, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = tap;


  /**
    Taps on the specified target.
  
    Sends a number of events intending to simulate a "real" user tapping on an
    element.
  
    For non-focusable elements the following events are triggered (in order):
  
    - `touchstart`
    - `touchend`
    - `mousedown`
    - `mouseup`
    - `click`
  
    For focusable (e.g. form control) elements the following events are triggered
    (in order):
  
    - `touchstart`
    - `touchend`
    - `mousedown`
    - `focus`
    - `focusin`
    - `mouseup`
    - `click`
  
    The exact listing of events that are triggered may change over time as needed
    to continue to emulate how actual browsers handle tapping on a given element.
  
    Use the `options` hash to change the parameters of the tap events. 
  
    @public
    @param {string|Element} target the element or selector to tap on
    @param {Object} options the options to be merged into the touch events
    @return {Promise<void>} resolves when settled
  */
  function tap(target, options = {}) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `tap`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`tap('${target}')\`.`);
      }

      let touchstartEv = (0, _fireEvent.default)(element, 'touchstart', options);
      let touchendEv = (0, _fireEvent.default)(element, 'touchend', options);

      if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
        (0, _click.__click__)(element, options);
      }

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/trigger-event', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = triggerEvent;


  /**
   * Triggers an event on the specified target.
   *
   * @public
   * @param {string|Element} target the element or selector to trigger the event on
   * @param {string} eventType the type of event to trigger
   * @param {Object} options additional properties to be set on the event
   * @return {Promise<void>} resolves when the application is settled
   *
   * @example
   * <caption>Using triggerEvent to Upload a file
   * When using triggerEvent to upload a file the `eventType` must be `change` and  you must pass an
   * array of [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) as `options`.</caption>
   *
   * triggerEvent(
   *   'input.fileUpload',
   *   'change',
   *   [new Blob(['Ember Rules!'])]
   * );
   */
  function triggerEvent(target, eventType, options) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerEvent`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`triggerEvent('${target}', ...)\`.`);
      }

      if (!eventType) {
        throw new Error(`Must provide an \`eventType\` to \`triggerEvent\``);
      }

      (0, _fireEvent.default)(element, eventType, options);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/trigger-key-event', ['exports', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/fire-event', '@ember/test-helpers/settled', '@ember/test-helpers/-utils'], function (exports, _getElement, _fireEvent, _settled, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = triggerKeyEvent;


  const DEFAULT_MODIFIERS = Object.freeze({
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false
  });

  // This is not a comprehensive list, but it is better than nothing.
  const keyFromKeyCode = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'v',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'Meta',
    93: 'Meta', // There is two keys that map to meta,
    187: '=',
    189: '-'
  };

  /**
    Calculates the value of KeyboardEvent#key given a keycode and the modifiers.
    Note that this works if the key is pressed in combination with the shift key, but it cannot
    detect if caps lock is enabled.
    @param {number} keycode The keycode of the event.
    @param {object} modifiers The modifiers of the event.
    @returns {string} The key string for the event.
   */
  function keyFromKeyCodeAndModifiers(keycode, modifiers) {
    if (keycode > 64 && keycode < 91) {
      if (modifiers.shiftKey) {
        return String.fromCharCode(keycode);
      } else {
        return String.fromCharCode(keycode).toLocaleLowerCase();
      }
    }
    let key = keyFromKeyCode[keycode];
    if (key) {
      return key;
    }
  }

  /**
   * Infers the keycode from the given key
   * @param {string} key The KeyboardEvent#key string
   * @returns {number} The keycode for the given key
   */
  function keyCodeFromKey(key) {
    let keys = Object.keys(keyFromKeyCode);
    let keyCode = keys.find(keyCode => keyFromKeyCode[keyCode] === key);
    if (!keyCode) {
      keyCode = keys.find(keyCode => keyFromKeyCode[keyCode] === key.toLowerCase());
    }
    return parseInt(keyCode);
  }

  /**
    Triggers a keyboard event of given type in the target element.
    It also requires the developer to provide either a string with the [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
    or the numeric [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) of the pressed key.
    Optionally the user can also provide a POJO with extra modifiers for the event.
  
    @public
    @param {string|Element} target the element or selector to trigger the event on
    @param {'keydown' | 'keyup' | 'keypress'} eventType the type of event to trigger
    @param {number|string} key the `keyCode`(number) or `key`(string) of the event being triggered
    @param {Object} [modifiers] the state of various modifier keys
    @param {boolean} [modifiers.ctrlKey=false] if true the generated event will indicate the control key was pressed during the key event
    @param {boolean} [modifiers.altKey=false] if true the generated event will indicate the alt key was pressed during the key event
    @param {boolean} [modifiers.shiftKey=false] if true the generated event will indicate the shift key was pressed during the key event
    @param {boolean} [modifiers.metaKey=false] if true the generated event will indicate the meta key was pressed during the key event
    @return {Promise<void>} resolves when the application is settled
  */
  function triggerKeyEvent(target, eventType, key, modifiers = DEFAULT_MODIFIERS) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `triggerKeyEvent`.');
      }

      let element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`triggerKeyEvent('${target}', ...)\`.`);
      }

      if (!eventType) {
        throw new Error(`Must provide an \`eventType\` to \`triggerKeyEvent\``);
      }

      if (_fireEvent.KEYBOARD_EVENT_TYPES.indexOf(eventType) === -1) {
        let validEventTypes = _fireEvent.KEYBOARD_EVENT_TYPES.join(', ');
        throw new Error(`Must provide an \`eventType\` of ${validEventTypes} to \`triggerKeyEvent\` but you passed \`${eventType}\`.`);
      }

      let props;
      if (typeof key === 'number') {
        props = { keyCode: key, which: key, key: keyFromKeyCodeAndModifiers(key, modifiers) };
      } else if (typeof key === 'string' && key.length !== 0) {
        let firstCharacter = key[0];
        if (firstCharacter !== firstCharacter.toUpperCase()) {
          throw new Error(`Must provide a \`key\` to \`triggerKeyEvent\` that starts with an uppercase character but you passed \`${key}\`.`);
        }

        if ((0, _utils.isNumeric)(key) && key.length > 1) {
          throw new Error(`Must provide a numeric \`keyCode\` to \`triggerKeyEvent\` but you passed \`${key}\` as a string.`);
        }

        let keyCode = keyCodeFromKey(key);
        props = { keyCode, which: keyCode, key };
      } else {
        throw new Error(`Must provide a \`key\` or \`keyCode\` to \`triggerKeyEvent\``);
      }

      let options = Ember.assign(props, modifiers);

      (0, _fireEvent.default)(element, eventType, options);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/dom/type-in', ['exports', '@ember/test-helpers/-utils', '@ember/test-helpers/settled', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/-is-form-control', '@ember/test-helpers/dom/focus', '@ember/test-helpers/dom/fire-event'], function (exports, _utils, _settled, _getElement, _isFormControl, _focus, _fireEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = typeIn;


  /**
   * Mimics character by character entry into the target `input` or `textarea` element.
   *
   * Allows for simulation of slow entry by passing an optional millisecond delay
   * between key events.
  
   * The major difference between `typeIn` and `fillIn` is that `typeIn` triggers
   * keyboard events as well as `input` and `change`.
   * Typically this looks like `focus` -> `focusin` -> `keydown` -> `keypress` -> `keyup` -> `input` -> `change`
   * per character of the passed text (this may vary on some browsers).
   *
   * @public
   * @param {string|Element} target the element or selector to enter text into
   * @param {string} text the test to fill the element with
   * @param {Object} options {delay: x} (default 50) number of milliseconds to wait per keypress
   * @return {Promise<void>} resolves when the application is settled
   */
  function typeIn(target, text, options = { delay: 50 }) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!target) {
        throw new Error('Must pass an element or selector to `typeIn`.');
      }

      const element = (0, _getElement.default)(target);
      if (!element) {
        throw new Error(`Element not found when calling \`typeIn('${target}')\``);
      }
      let isControl = (0, _isFormControl.default)(element);
      if (!isControl) {
        throw new Error('`typeIn` is only usable on form controls.');
      }

      if (typeof text === 'undefined' || text === null) {
        throw new Error('Must provide `text` when calling `typeIn`.');
      }

      (0, _focus.__focus__)(element);

      return fillOut(element, text, options.delay).then(() => (0, _fireEvent.default)(element, 'change')).then(_settled.default);
    });
  }

  // eslint-disable-next-line require-jsdoc
  function fillOut(element, text, delay) {
    const inputFunctions = text.split('').map(character => keyEntry(element, character, delay));
    return inputFunctions.reduce((currentPromise, func) => {
      return currentPromise.then(() => delayedExecute(func, delay));
    }, Ember.RSVP.Promise.resolve());
  }

  // eslint-disable-next-line require-jsdoc
  function keyEntry(element, character) {
    const charCode = character.charCodeAt();

    const eventOptions = {
      bubbles: true,
      cancellable: true,
      charCode
    };

    const keyEvents = {
      down: new KeyboardEvent('keydown', eventOptions),
      press: new KeyboardEvent('keypress', eventOptions),
      up: new KeyboardEvent('keyup', eventOptions)
    };

    return function () {
      element.dispatchEvent(keyEvents.down);
      element.dispatchEvent(keyEvents.press);
      element.value = element.value + character;
      (0, _fireEvent.default)(element, 'input');
      element.dispatchEvent(keyEvents.up);
    };
  }

  // eslint-disable-next-line require-jsdoc
  function delayedExecute(func, delay) {
    return new Ember.RSVP.Promise(resolve => {
      setTimeout(resolve, delay);
    }).then(func);
  }
});
define('@ember/test-helpers/dom/wait-for', ['exports', '@ember/test-helpers/wait-until', '@ember/test-helpers/dom/-get-element', '@ember/test-helpers/dom/-get-elements', '@ember/test-helpers/dom/-to-array', '@ember/test-helpers/-utils'], function (exports, _waitUntil, _getElement, _getElements, _toArray, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = waitFor;


  /**
    Used to wait for a particular selector to appear in the DOM. Due to the fact
    that it does not wait for general settledness, this is quite useful for testing
    interim DOM states (e.g. loading states, pending promises, etc).
  
    @param {string} selector the selector to wait for
    @param {Object} [options] the options to be used
    @param {number} [options.timeout=1000] the time to wait (in ms) for a match
    @param {number} [options.count=null] the number of elements that should match the provided selector (null means one or more)
    @return {Promise<Element|Element[]>} resolves when the element(s) appear on the page
  */
  function waitFor(selector, { timeout = 1000, count = null, timeoutMessage } = {}) {
    return (0, _utils.nextTickPromise)().then(() => {
      if (!selector) {
        throw new Error('Must pass a selector to `waitFor`.');
      }
      if (!timeoutMessage) {
        timeoutMessage = `waitFor timed out waiting for selector "${selector}"`;
      }

      let callback;
      if (count !== null) {
        callback = () => {
          let elements = (0, _getElements.default)(selector);
          if (elements.length === count) {
            return (0, _toArray.default)(elements);
          }
        };
      } else {
        callback = () => (0, _getElement.default)(selector);
      }
      return (0, _waitUntil.default)(callback, { timeout, timeoutMessage });
    });
  }
});
define('@ember/test-helpers/global', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = (() => {
    if (typeof self !== 'undefined') {
      return self;
    } else if (typeof window !== 'undefined') {
      return window;
    } else if (typeof global !== 'undefined') {
      return global;
    } else {
      return Function('return this')();
    }
  })();
});
define('@ember/test-helpers/has-ember-version', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = hasEmberVersion;


  /**
    Checks if the currently running Ember version is greater than or equal to the
    specified major and minor version numbers.
  
    @private
    @param {number} major the major version number to compare
    @param {number} minor the minor version number to compare
    @returns {boolean} true if the Ember version is >= MAJOR.MINOR specified, false otherwise
  */
  function hasEmberVersion(major, minor) {
    var numbers = Ember.VERSION.split('-')[0].split('.');
    var actualMajor = parseInt(numbers[0], 10);
    var actualMinor = parseInt(numbers[1], 10);
    return actualMajor > major || actualMajor === major && actualMinor >= minor;
  }
});
define('@ember/test-helpers/index', ['exports', '@ember/test-helpers/resolver', '@ember/test-helpers/application', '@ember/test-helpers/setup-context', '@ember/test-helpers/teardown-context', '@ember/test-helpers/setup-rendering-context', '@ember/test-helpers/teardown-rendering-context', '@ember/test-helpers/setup-application-context', '@ember/test-helpers/teardown-application-context', '@ember/test-helpers/settled', '@ember/test-helpers/wait-until', '@ember/test-helpers/validate-error-handler', '@ember/test-helpers/dom/click', '@ember/test-helpers/dom/double-click', '@ember/test-helpers/dom/tap', '@ember/test-helpers/dom/focus', '@ember/test-helpers/dom/blur', '@ember/test-helpers/dom/trigger-event', '@ember/test-helpers/dom/trigger-key-event', '@ember/test-helpers/dom/fill-in', '@ember/test-helpers/dom/wait-for', '@ember/test-helpers/dom/get-root-element', '@ember/test-helpers/dom/find', '@ember/test-helpers/dom/find-all', '@ember/test-helpers/dom/type-in'], function (exports, _resolver, _application, _setupContext, _teardownContext, _setupRenderingContext, _teardownRenderingContext, _setupApplicationContext, _teardownApplicationContext, _settled, _waitUntil, _validateErrorHandler, _click, _doubleClick, _tap, _focus, _blur, _triggerEvent, _triggerKeyEvent, _fillIn, _waitFor, _getRootElement, _find, _findAll, _typeIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'setResolver', {
    enumerable: true,
    get: function () {
      return _resolver.setResolver;
    }
  });
  Object.defineProperty(exports, 'getResolver', {
    enumerable: true,
    get: function () {
      return _resolver.getResolver;
    }
  });
  Object.defineProperty(exports, 'getApplication', {
    enumerable: true,
    get: function () {
      return _application.getApplication;
    }
  });
  Object.defineProperty(exports, 'setApplication', {
    enumerable: true,
    get: function () {
      return _application.setApplication;
    }
  });
  Object.defineProperty(exports, 'setupContext', {
    enumerable: true,
    get: function () {
      return _setupContext.default;
    }
  });
  Object.defineProperty(exports, 'getContext', {
    enumerable: true,
    get: function () {
      return _setupContext.getContext;
    }
  });
  Object.defineProperty(exports, 'setContext', {
    enumerable: true,
    get: function () {
      return _setupContext.setContext;
    }
  });
  Object.defineProperty(exports, 'unsetContext', {
    enumerable: true,
    get: function () {
      return _setupContext.unsetContext;
    }
  });
  Object.defineProperty(exports, 'pauseTest', {
    enumerable: true,
    get: function () {
      return _setupContext.pauseTest;
    }
  });
  Object.defineProperty(exports, 'resumeTest', {
    enumerable: true,
    get: function () {
      return _setupContext.resumeTest;
    }
  });
  Object.defineProperty(exports, 'teardownContext', {
    enumerable: true,
    get: function () {
      return _teardownContext.default;
    }
  });
  Object.defineProperty(exports, 'setupRenderingContext', {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.default;
    }
  });
  Object.defineProperty(exports, 'render', {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.render;
    }
  });
  Object.defineProperty(exports, 'clearRender', {
    enumerable: true,
    get: function () {
      return _setupRenderingContext.clearRender;
    }
  });
  Object.defineProperty(exports, 'teardownRenderingContext', {
    enumerable: true,
    get: function () {
      return _teardownRenderingContext.default;
    }
  });
  Object.defineProperty(exports, 'setupApplicationContext', {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.default;
    }
  });
  Object.defineProperty(exports, 'visit', {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.visit;
    }
  });
  Object.defineProperty(exports, 'currentRouteName', {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.currentRouteName;
    }
  });
  Object.defineProperty(exports, 'currentURL', {
    enumerable: true,
    get: function () {
      return _setupApplicationContext.currentURL;
    }
  });
  Object.defineProperty(exports, 'teardownApplicationContext', {
    enumerable: true,
    get: function () {
      return _teardownApplicationContext.default;
    }
  });
  Object.defineProperty(exports, 'settled', {
    enumerable: true,
    get: function () {
      return _settled.default;
    }
  });
  Object.defineProperty(exports, 'isSettled', {
    enumerable: true,
    get: function () {
      return _settled.isSettled;
    }
  });
  Object.defineProperty(exports, 'getSettledState', {
    enumerable: true,
    get: function () {
      return _settled.getSettledState;
    }
  });
  Object.defineProperty(exports, 'waitUntil', {
    enumerable: true,
    get: function () {
      return _waitUntil.default;
    }
  });
  Object.defineProperty(exports, 'validateErrorHandler', {
    enumerable: true,
    get: function () {
      return _validateErrorHandler.default;
    }
  });
  Object.defineProperty(exports, 'click', {
    enumerable: true,
    get: function () {
      return _click.default;
    }
  });
  Object.defineProperty(exports, 'doubleClick', {
    enumerable: true,
    get: function () {
      return _doubleClick.default;
    }
  });
  Object.defineProperty(exports, 'tap', {
    enumerable: true,
    get: function () {
      return _tap.default;
    }
  });
  Object.defineProperty(exports, 'focus', {
    enumerable: true,
    get: function () {
      return _focus.default;
    }
  });
  Object.defineProperty(exports, 'blur', {
    enumerable: true,
    get: function () {
      return _blur.default;
    }
  });
  Object.defineProperty(exports, 'triggerEvent', {
    enumerable: true,
    get: function () {
      return _triggerEvent.default;
    }
  });
  Object.defineProperty(exports, 'triggerKeyEvent', {
    enumerable: true,
    get: function () {
      return _triggerKeyEvent.default;
    }
  });
  Object.defineProperty(exports, 'fillIn', {
    enumerable: true,
    get: function () {
      return _fillIn.default;
    }
  });
  Object.defineProperty(exports, 'waitFor', {
    enumerable: true,
    get: function () {
      return _waitFor.default;
    }
  });
  Object.defineProperty(exports, 'getRootElement', {
    enumerable: true,
    get: function () {
      return _getRootElement.default;
    }
  });
  Object.defineProperty(exports, 'find', {
    enumerable: true,
    get: function () {
      return _find.default;
    }
  });
  Object.defineProperty(exports, 'findAll', {
    enumerable: true,
    get: function () {
      return _findAll.default;
    }
  });
  Object.defineProperty(exports, 'typeIn', {
    enumerable: true,
    get: function () {
      return _typeIn.default;
    }
  });
});
define("@ember/test-helpers/resolver", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setResolver = setResolver;
  exports.getResolver = getResolver;
  var __resolver__;

  /**
    Stores the provided resolver instance so that tests being ran can resolve
    objects in the same way as a normal application.
  
    Used by `setupContext` and `setupRenderingContext` as a fallback when `setApplication` was _not_ used.
  
    @public
    @param {Ember.Resolver} resolver the resolver to be used for testing
  */
  function setResolver(resolver) {
    __resolver__ = resolver;
  }

  /**
    Retrieve the resolver instance stored by `setResolver`.
  
    @public
    @returns {Ember.Resolver} the previously stored resolver
  */
  function getResolver() {
    return __resolver__;
  }
});
define('@ember/test-helpers/settled', ['exports', '@ember/test-helpers/-utils', '@ember/test-helpers/wait-until'], function (exports, _utils, _waitUntil) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._teardownAJAXHooks = _teardownAJAXHooks;
  exports._setupAJAXHooks = _setupAJAXHooks;
  exports.getSettledState = getSettledState;
  exports.isSettled = isSettled;
  exports.default = settled;


  // Ember internally tracks AJAX requests in the same way that we do here for
  // legacy style "acceptance" tests using the `ember-testing.js` asset provided
  // by emberjs/ember.js itself. When `@ember/test-helpers`'s `settled` utility
  // is used in a legacy acceptance test context any pending AJAX requests are
  // not properly considered during the `isSettled` check below.
  //
  // This utilizes a local utility method present in Ember since around 2.8.0 to
  // properly consider pending AJAX requests done within legacy acceptance tests.
  const _internalPendingRequests = (() => {
    if (Ember.__loader.registry['ember-testing/test/pending_requests']) {
      // Ember <= 3.1
      return Ember.__loader.require('ember-testing/test/pending_requests').pendingRequests;
    } else if (Ember.__loader.registry['ember-testing/lib/test/pending_requests']) {
      // Ember >= 3.2
      return Ember.__loader.require('ember-testing/lib/test/pending_requests').pendingRequests;
    }

    return () => 0;
  })();

  let requests;

  /**
    @private
    @returns {number} the count of pending requests
  */
  function pendingRequests() {
    let localRequestsPending = requests !== undefined ? requests.length : 0;
    let internalRequestsPending = _internalPendingRequests();

    return localRequestsPending + internalRequestsPending;
  }

  /**
    @private
    @param {Event} event (unused)
    @param {XMLHTTPRequest} xhr the XHR that has initiated a request
  */
  function incrementAjaxPendingRequests(event, xhr) {
    requests.push(xhr);
  }

  /**
    @private
    @param {Event} event (unused)
    @param {XMLHTTPRequest} xhr the XHR that has initiated a request
  */
  function decrementAjaxPendingRequests(event, xhr) {
    // In most Ember versions to date (current version is 2.16) RSVP promises are
    // configured to flush in the actions queue of the Ember run loop, however it
    // is possible that in the future this changes to use "true" micro-task
    // queues.
    //
    // The entire point here, is that _whenever_ promises are resolved will be
    // before the next run of the JS event loop. Then in the next event loop this
    // counter will decrement. In the specific case of AJAX, this means that any
    // promises chained off of `$.ajax` will properly have their `.then` called
    // _before_ this is decremented (and testing continues)
    (0, _utils.nextTick)(() => {
      for (let i = 0; i < requests.length; i++) {
        if (xhr === requests[i]) {
          requests.splice(i, 1);
        }
      }
    }, 0);
  }

  /**
    Clears listeners that were previously setup for `ajaxSend` and `ajaxComplete`.
  
    @private
  */
  function _teardownAJAXHooks() {
    // jQuery will not invoke `ajaxComplete` if
    //    1. `transport.send` throws synchronously and
    //    2. it has an `error` option which also throws synchronously

    // We can no longer handle any remaining requests
    requests = [];

    if (!Ember.$) {
      return;
    }

    Ember.$(document).off('ajaxSend', incrementAjaxPendingRequests);
    Ember.$(document).off('ajaxComplete', decrementAjaxPendingRequests);
  }

  /**
    Sets up listeners for `ajaxSend` and `ajaxComplete`.
  
    @private
  */
  function _setupAJAXHooks() {
    requests = [];

    if (!Ember.$) {
      return;
    }

    Ember.$(document).on('ajaxSend', incrementAjaxPendingRequests);
    Ember.$(document).on('ajaxComplete', decrementAjaxPendingRequests);
  }

  let _internalCheckWaiters;
  if (Ember.__loader.registry['ember-testing/test/waiters']) {
    // Ember <= 3.1
    _internalCheckWaiters = Ember.__loader.require('ember-testing/test/waiters').checkWaiters;
  } else if (Ember.__loader.registry['ember-testing/lib/test/waiters']) {
    // Ember >= 3.2
    _internalCheckWaiters = Ember.__loader.require('ember-testing/lib/test/waiters').checkWaiters;
  }

  /**
    @private
    @returns {boolean} true if waiters are still pending
  */
  function checkWaiters() {
    if (_internalCheckWaiters) {
      return _internalCheckWaiters();
    } else if (Ember.Test.waiters) {
      if (Ember.Test.waiters.any(([context, callback]) => !callback.call(context))) {
        return true;
      }
    }

    return false;
  }

  /**
    Check various settledness metrics, and return an object with the following properties:
  
    - `hasRunLoop` - Checks if a run-loop has been started. If it has, this will
      be `true` otherwise it will be `false`.
    - `hasPendingTimers` - Checks if there are scheduled timers in the run-loop.
      These pending timers are primarily registered by `Ember.run.schedule`. If
      there are pending timers, this will be `true`, otherwise `false`.
    - `hasPendingWaiters` - Checks if any registered test waiters are still
      pending (e.g. the waiter returns `true`). If there are pending waiters,
      this will be `true`, otherwise `false`.
    - `hasPendingRequests` - Checks if there are pending AJAX requests (based on
      `ajaxSend` / `ajaxComplete` events triggered by `jQuery.ajax`). If there
      are pending requests, this will be `true`, otherwise `false`.
    - `pendingRequestCount` - The count of pending AJAX requests.
  
    @public
    @returns {Object} object with properties for each of the metrics used to determine settledness
  */
  function getSettledState() {
    let pendingRequestCount = pendingRequests();

    return {
      hasPendingTimers: Boolean(Ember.run.hasScheduledTimers()),
      hasRunLoop: Boolean(Ember.run.currentRunLoop),
      hasPendingWaiters: checkWaiters(),
      hasPendingRequests: pendingRequestCount > 0,
      pendingRequestCount
    };
  }

  /**
    Checks various settledness metrics (via `getSettledState()`) to determine if things are settled or not.
  
    Settled generally means that there are no pending timers, no pending waiters,
    no pending AJAX requests, and no current run loop. However, new settledness
    metrics may be added and used as they become available.
  
    @public
    @returns {boolean} `true` if settled, `false` otherwise
  */
  function isSettled() {
    var _getSettledState = getSettledState();

    let hasPendingTimers = _getSettledState.hasPendingTimers,
        hasRunLoop = _getSettledState.hasRunLoop,
        hasPendingRequests = _getSettledState.hasPendingRequests,
        hasPendingWaiters = _getSettledState.hasPendingWaiters;


    if (hasPendingTimers || hasRunLoop || hasPendingRequests || hasPendingWaiters) {
      return false;
    }

    return true;
  }

  /**
    Returns a promise that resolves when in a settled state (see `isSettled` for
    a definition of "settled state").
  
    @public
    @returns {Promise<void>} resolves when settled
  */
  function settled() {
    return (0, _waitUntil.default)(isSettled, { timeout: Infinity });
  }
});
define('@ember/test-helpers/setup-application-context', ['exports', '@ember/test-helpers/-utils', '@ember/test-helpers/setup-context', '@ember/test-helpers/has-ember-version', '@ember/test-helpers/settled'], function (exports, _utils, _setupContext, _hasEmberVersion, _settled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.visit = visit;
  exports.currentRouteName = currentRouteName;
  exports.currentURL = currentURL;
  exports.default = setupApplicationContext;


  /**
    Navigate the application to the provided URL.
  
    @public
    @returns {Promise<void>} resolves when settled
  */
  function visit() {
    let context = (0, _setupContext.getContext)();
    let owner = context.owner;


    return (0, _utils.nextTickPromise)().then(() => {
      return owner.visit(...arguments);
    }).then(() => {
      if (EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false) {
        context.element = document.querySelector('#ember-testing > .ember-view');
      } else {
        context.element = document.querySelector('#ember-testing');
      }
    }).then(_settled.default);
  }

  /**
    @public
    @returns {string} the currently active route name
  */
  function currentRouteName() {
    var _getContext = (0, _setupContext.getContext)();

    let owner = _getContext.owner;

    let router = owner.lookup('router:main');
    return Ember.get(router, 'currentRouteName');
  }

  const HAS_CURRENT_URL_ON_ROUTER = (0, _hasEmberVersion.default)(2, 13);

  /**
    @public
    @returns {string} the applications current url
  */
  function currentURL() {
    var _getContext2 = (0, _setupContext.getContext)();

    let owner = _getContext2.owner;

    let router = owner.lookup('router:main');

    if (HAS_CURRENT_URL_ON_ROUTER) {
      return Ember.get(router, 'currentURL');
    } else {
      return Ember.get(router, 'location').getURL();
    }
  }

  /**
    Used by test framework addons to setup the provided context for working with
    an application (e.g. routing).
  
    `setupContext` must have been run on the provided context prior to calling
    `setupApplicationContext`.
  
    Sets up the basic framework used by application tests.
  
    @public
    @param {Object} context the context to setup
    @returns {Promise<Object>} resolves with the context that was setup
  */
  function setupApplicationContext() {
    return (0, _utils.nextTickPromise)();
  }
});
define('@ember/test-helpers/setup-context', ['exports', '@ember/test-helpers/build-owner', '@ember/test-helpers/settled', '@ember/test-helpers/global', '@ember/test-helpers/resolver', '@ember/test-helpers/application', '@ember/test-helpers/-utils'], function (exports, _buildOwner, _settled, _global, _resolver, _application, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CLEANUP = undefined;
  exports.setContext = setContext;
  exports.getContext = getContext;
  exports.unsetContext = unsetContext;
  exports.pauseTest = pauseTest;
  exports.resumeTest = resumeTest;

  exports.default = function (context, options = {}) {
    Ember.testing = true;
    setContext(context);

    let contextGuid = Ember.guidFor(context);
    CLEANUP[contextGuid] = [];

    return (0, _utils.nextTickPromise)().then(() => {
      let application = (0, _application.getApplication)();
      if (application) {
        return application.boot();
      }
    }).then(() => {
      let testElementContainer = document.getElementById('ember-testing-container');
      let fixtureResetValue = testElementContainer.innerHTML;

      // push this into the final cleanup bucket, to be ran _after_ the owner
      // is destroyed and settled (e.g. flushed run loops, etc)
      CLEANUP[contextGuid].push(() => {
        testElementContainer.innerHTML = fixtureResetValue;
      });

      let resolver = options.resolver;

      // This handles precendence, specifying a specific option of
      // resolver always trumps whatever is auto-detected, then we fallback to
      // the suite-wide registrations
      //
      // At some later time this can be extended to support specifying a custom
      // engine or application...

      if (resolver) {
        return (0, _buildOwner.default)(null, resolver);
      }

      return (0, _buildOwner.default)((0, _application.getApplication)(), (0, _resolver.getResolver)());
    }).then(owner => {
      Object.defineProperty(context, 'owner', {
        configurable: true,
        enumerable: true,
        value: owner,
        writable: false
      });

      Object.defineProperty(context, 'set', {
        configurable: true,
        enumerable: true,
        value(key, value) {
          let ret = Ember.run(function () {
            return Ember.set(context, key, value);
          });

          return ret;
        },
        writable: false
      });

      Object.defineProperty(context, 'setProperties', {
        configurable: true,
        enumerable: true,
        value(hash) {
          let ret = Ember.run(function () {
            return Ember.setProperties(context, hash);
          });

          return ret;
        },
        writable: false
      });

      Object.defineProperty(context, 'get', {
        configurable: true,
        enumerable: true,
        value(key) {
          return Ember.get(context, key);
        },
        writable: false
      });

      Object.defineProperty(context, 'getProperties', {
        configurable: true,
        enumerable: true,
        value(...args) {
          return Ember.getProperties(context, args);
        },
        writable: false
      });

      let resume;
      context.resumeTest = function resumeTest() {
        (true && !(resume) && Ember.assert('Testing has not been paused. There is nothing to resume.', resume));

        resume();
        _global.default.resumeTest = resume = undefined;
      };

      context.pauseTest = function pauseTest() {
        console.info('Testing paused. Use `resumeTest()` to continue.'); // eslint-disable-line no-console

        return new Ember.RSVP.Promise(resolve => {
          resume = resolve;
          _global.default.resumeTest = resumeTest;
        }, 'TestAdapter paused promise');
      };

      (0, _settled._setupAJAXHooks)();

      return context;
    });
  };

  let __test_context__;

  /**
    Stores the provided context as the "global testing context".
  
    Generally setup automatically by `setupContext`.
  
    @public
    @param {Object} context the context to use
  */
  function setContext(context) {
    __test_context__ = context;
  }

  /**
    Retrive the "global testing context" as stored by `setContext`.
  
    @public
    @returns {Object} the previously stored testing context
  */
  function getContext() {
    return __test_context__;
  }

  /**
    Clear the "global testing context".
  
    Generally invoked from `teardownContext`.
  
    @public
  */
  function unsetContext() {
    __test_context__ = undefined;
  }

  /**
   * Returns a promise to be used to pauses the current test (due to being
   * returned from the test itself).  This is useful for debugging while testing
   * or for test-driving.  It allows you to inspect the state of your application
   * at any point.
   *
   * The test framework wrapper (e.g. `ember-qunit` or `ember-mocha`) should
   * ensure that when `pauseTest()` is used, any framework specific test timeouts
   * are disabled.
   *
   * @public
   * @returns {Promise<void>} resolves _only_ when `resumeTest()` is invoked
   * @example <caption>Usage via ember-qunit</caption>
   *
   * import { setupRenderingTest } from 'ember-qunit';
   * import { render, click, pauseTest } from '@ember/test-helpers';
   *
   *
   * module('awesome-sauce', function(hooks) {
   *   setupRenderingTest(hooks);
   *
   *   test('does something awesome', async function(assert) {
   *     await render(hbs`{{awesome-sauce}}`);
   *
   *     // added here to visualize / interact with the DOM prior
   *     // to the interaction below
   *     await pauseTest();
   *
   *     click('.some-selector');
   *
   *     assert.equal(this.element.textContent, 'this sauce is awesome!');
   *   });
   * });
   */
  function pauseTest() {
    let context = getContext();

    if (!context || typeof context.pauseTest !== 'function') {
      throw new Error('Cannot call `pauseTest` without having first called `setupTest` or `setupRenderingTest`.');
    }

    return context.pauseTest();
  }

  /**
    Resumes a test previously paused by `await pauseTest()`.
  
    @public
  */
  function resumeTest() {
    let context = getContext();

    if (!context || typeof context.resumeTest !== 'function') {
      throw new Error('Cannot call `resumeTest` without having first called `setupTest` or `setupRenderingTest`.');
    }

    context.resumeTest();
  }

  const CLEANUP = exports.CLEANUP = Object.create(null);

  /**
    Used by test framework addons to setup the provided context for testing.
  
    Responsible for:
  
    - sets the "global testing context" to the provided context (`setContext`)
    - create an owner object and set it on the provided context (e.g. `this.owner`)
    - setup `this.set`, `this.setProperties`, `this.get`, and `this.getProperties` to the provided context
    - setting up AJAX listeners
    - setting up `pauseTest` (also available as `this.pauseTest()`) and `resumeTest` helpers
  
    @public
    @param {Object} context the context to setup
    @param {Object} [options] options used to override defaults
    @param {Resolver} [options.resolver] a resolver to use for customizing normal resolution
    @returns {Promise<Object>} resolves with the context that was setup
  */
});
define('@ember/test-helpers/setup-rendering-context', ['exports', '@ember/test-helpers/global', '@ember/test-helpers/setup-context', '@ember/test-helpers/-utils', '@ember/test-helpers/settled', '@ember/test-helpers/dom/get-root-element'], function (exports, _global, _setupContext, _utils, _settled, _getRootElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RENDERING_CLEANUP = undefined;
  exports.render = render;
  exports.clearRender = clearRender;
  exports.default = setupRenderingContext;
  const RENDERING_CLEANUP = exports.RENDERING_CLEANUP = Object.create(null);
  const OUTLET_TEMPLATE = Ember.HTMLBars.template({
    "id": "em3WhaQV",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {}
  });
  const EMPTY_TEMPLATE = Ember.HTMLBars.template({
    "id": "xOcW61lH",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {}
  });

  /**
    @private
    @param {Ember.ApplicationInstance} owner the current owner instance
    @returns {Template} a template representing {{outlet}}
  */
  function lookupOutletTemplate(owner) {
    let OutletTemplate = owner.lookup('template:-outlet');
    if (!OutletTemplate) {
      owner.register('template:-outlet', OUTLET_TEMPLATE);
      OutletTemplate = owner.lookup('template:-outlet');
    }

    return OutletTemplate;
  }

  /**
    @private
    @param {string} [selector] the selector to search for relative to element
    @returns {jQuery} a jQuery object representing the selector (or element itself if no selector)
  */
  function jQuerySelector(selector) {
    var _getContext = (0, _setupContext.getContext)();

    let element = _getContext.element;


    // emulates Ember internal behavor of `this.$` in a component
    // https://github.com/emberjs/ember.js/blob/v2.5.1/packages/ember-views/lib/views/states/has_element.js#L18
    return selector ? _global.default.jQuery(selector, element) : _global.default.jQuery(element);
  }

  let templateId = 0;
  /**
    Renders the provided template and appends it to the DOM.
  
    @public
    @param {CompiledTemplate} template the template to render
    @returns {Promise<void>} resolves when settled
  */
  function render(template) {
    let context = (0, _setupContext.getContext)();

    if (!template) {
      throw new Error('you must pass a template to `render()`');
    }

    return (0, _utils.nextTickPromise)().then(() => {
      let owner = context.owner;


      let toplevelView = owner.lookup('-top-level-view:main');
      let OutletTemplate = lookupOutletTemplate(owner);
      templateId += 1;
      let templateFullName = `template:-undertest-${templateId}`;
      owner.register(templateFullName, template);

      let outletState = {
        render: {
          owner,
          into: undefined,
          outlet: 'main',
          name: 'application',
          controller: undefined,
          ViewClass: undefined,
          template: OutletTemplate
        },

        outlets: {
          main: {
            render: {
              owner,
              into: undefined,
              outlet: 'main',
              name: 'index',
              controller: context,
              ViewClass: undefined,
              template: owner.lookup(templateFullName),
              outlets: {}
            },
            outlets: {}
          }
        }
      };
      toplevelView.setOutletState(outletState);

      // returning settled here because the actual rendering does not happen until
      // the renderer detects it is dirty (which happens on backburner's end
      // hook), see the following implementation details:
      //
      // * [view:outlet](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/views/outlet.js#L129-L145) manually dirties its own tag upon `setOutletState`
      // * [backburner's custom end hook](https://github.com/emberjs/ember.js/blob/f94a4b6aef5b41b96ef2e481f35e07608df01440/packages/ember-glimmer/lib/renderer.js#L145-L159) detects that the current revision of the root is no longer the latest, and triggers a new rendering transaction
      return (0, _settled.default)();
    });
  }

  /**
    Clears any templates previously rendered. This is commonly used for
    confirming behavior that is triggered by teardown (e.g.
    `willDestroyElement`).
  
    @public
    @returns {Promise<void>} resolves when settled
  */
  function clearRender() {
    let context = (0, _setupContext.getContext)();

    if (!context || typeof context.clearRender !== 'function') {
      throw new Error('Cannot call `clearRender` without having first called `setupRenderingContext`.');
    }

    return render(EMPTY_TEMPLATE);
  }

  /**
    Used by test framework addons to setup the provided context for rendering.
  
    `setupContext` must have been ran on the provided context
    prior to calling `setupRenderingContext`.
  
    Responsible for:
  
    - Setup the basic framework used for rendering by the
      `render` helper.
    - Ensuring the event dispatcher is properly setup.
    - Setting `this.element` to the root element of the testing
      container (things rendered via `render` will go _into_ this
      element).
  
    @public
    @param {Object} context the context to setup for rendering
    @returns {Promise<Object>} resolves with the context that was setup
  */
  function setupRenderingContext(context) {
    let contextGuid = Ember.guidFor(context);
    RENDERING_CLEANUP[contextGuid] = [];

    return (0, _utils.nextTickPromise)().then(() => {
      let owner = context.owner;


      // these methods being placed on the context itself will be deprecated in
      // a future version (no giant rush) to remove some confusion about which
      // is the "right" way to things...
      Object.defineProperty(context, 'render', {
        configurable: true,
        enumerable: true,
        value: render,
        writable: false
      });
      Object.defineProperty(context, 'clearRender', {
        configurable: true,
        enumerable: true,
        value: clearRender,
        writable: false
      });

      if (_global.default.jQuery) {
        Object.defineProperty(context, '$', {
          configurable: true,
          enumerable: true,
          value: jQuerySelector,
          writable: false
        });
      }

      // When the host app uses `setApplication` (instead of `setResolver`) the event dispatcher has
      // already been setup via `applicationInstance.boot()` in `./build-owner`. If using
      // `setResolver` (instead of `setApplication`) a "mock owner" is created by extending
      // `Ember._ContainerProxyMixin` and `Ember._RegistryProxyMixin` in this scenario we need to
      // manually start the event dispatcher.
      if (owner._emberTestHelpersMockOwner) {
        let dispatcher = owner.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
        dispatcher.setup({}, '#ember-testing');
      }

      let OutletView = owner.factoryFor ? owner.factoryFor('view:-outlet') : owner._lookupFactory('view:-outlet');
      let toplevelView = OutletView.create();

      owner.register('-top-level-view:main', {
        create() {
          return toplevelView;
        }
      });

      // initially render a simple empty template
      return render(EMPTY_TEMPLATE).then(() => {
        Ember.run(toplevelView, 'appendTo', (0, _getRootElement.default)());

        return (0, _settled.default)();
      });
    }).then(() => {
      Object.defineProperty(context, 'element', {
        configurable: true,
        enumerable: true,
        // ensure the element is based on the wrapping toplevel view
        // Ember still wraps the main application template with a
        // normal tagged view
        //
        // In older Ember versions (2.4) the element itself is not stable,
        // and therefore we cannot update the `this.element` until after the
        // rendering is completed
        value: EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false ? (0, _getRootElement.default)().querySelector('.ember-view') : (0, _getRootElement.default)(),

        writable: false
      });

      return context;
    });
  }
});
define('@ember/test-helpers/teardown-application-context', ['exports', '@ember/test-helpers/settled'], function (exports, _settled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    return (0, _settled.default)();
  };
});
define('@ember/test-helpers/teardown-context', ['exports', '@ember/test-helpers/settled', '@ember/test-helpers/setup-context', '@ember/test-helpers/-utils'], function (exports, _settled, _setupContext, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = teardownContext;


  /**
    Used by test framework addons to tear down the provided context after testing is completed.
  
    Responsible for:
  
    - un-setting the "global testing context" (`unsetContext`)
    - destroy the contexts owner object
    - remove AJAX listeners
  
    @public
    @param {Object} context the context to setup
    @returns {Promise<void>} resolves when settled
  */
  function teardownContext(context) {
    return (0, _utils.nextTickPromise)().then(() => {
      let owner = context.owner;


      (0, _settled._teardownAJAXHooks)();

      Ember.run(owner, 'destroy');
      Ember.testing = false;

      (0, _setupContext.unsetContext)();

      return (0, _settled.default)();
    }).finally(() => {
      let contextGuid = Ember.guidFor(context);

      (0, _utils.runDestroyablesFor)(_setupContext.CLEANUP, contextGuid);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/teardown-rendering-context', ['exports', '@ember/test-helpers/setup-rendering-context', '@ember/test-helpers/-utils', '@ember/test-helpers/settled'], function (exports, _setupRenderingContext, _utils, _settled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = teardownRenderingContext;


  /**
    Used by test framework addons to tear down the provided context after testing is completed.
  
    Responsible for:
  
    - resetting the `ember-testing-container` to its original state (the value
      when `setupRenderingContext` was called).
  
    @public
    @param {Object} context the context to setup
    @returns {Promise<void>} resolves when settled
  */
  function teardownRenderingContext(context) {
    return (0, _utils.nextTickPromise)().then(() => {
      let contextGuid = Ember.guidFor(context);

      (0, _utils.runDestroyablesFor)(_setupRenderingContext.RENDERING_CLEANUP, contextGuid);

      return (0, _settled.default)();
    });
  }
});
define('@ember/test-helpers/validate-error-handler', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateErrorHandler;

  const VALID = Object.freeze({ isValid: true, message: null });
  const INVALID = Object.freeze({
    isValid: false,
    message: 'error handler should have re-thrown the provided error'
  });

  /**
   * Validate the provided error handler to confirm that it properly re-throws
   * errors when `Ember.testing` is true.
   *
   * This is intended to be used by test framework hosts (or other libraries) to
   * ensure that `Ember.onerror` is properly configured. Without a check like
   * this, `Ember.onerror` could _easily_ swallow all errors and make it _seem_
   * like everything is just fine (and have green tests) when in reality
   * everything is on fire...
   *
   * @public
   * @param {Function} [callback=Ember.onerror] the callback to validate
   * @returns {Object} object with `isValid` and `message`
   *
   * @example <caption>Example implementation for `ember-qunit`</caption>
   *
   * import { validateErrorHandler } from '@ember/test-helpers';
   *
   * test('Ember.onerror is functioning properly', function(assert) {
   *   let result = validateErrorHandler();
   *   assert.ok(result.isValid, result.message);
   * });
   */
  function validateErrorHandler(callback = Ember.onerror) {
    if (callback === undefined || callback === null) {
      return VALID;
    }

    let error = new Error('Error handler validation error!');

    let originalEmberTesting = Ember.testing;
    Ember.testing = true;
    try {
      callback(error);
    } catch (e) {
      if (e === error) {
        return VALID;
      }
    } finally {
      Ember.testing = originalEmberTesting;
    }

    return INVALID;
  }
});
define('@ember/test-helpers/wait-until', ['exports', '@ember/test-helpers/-utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = waitUntil;


  const TIMEOUTS = [0, 1, 2, 5, 7];
  const MAX_TIMEOUT = 10;

  /**
    Wait for the provided callback to return a truthy value.
  
    This does not leverage `settled()`, and as such can be used to manage async
    while _not_ settled (e.g. "loading" or "pending" states).
  
    @public
    @param {Function} callback the callback to use for testing when waiting should stop
    @param {Object} [options] options used to override defaults
    @param {number} [options.timeout=1000] the maximum amount of time to wait
    @param {string} [options.timeoutMessage='waitUntil timed out'] the message to use in the reject on timeout
    @returns {Promise} resolves with the callback value when it returns a truthy value
  */
  function waitUntil(callback, options = {}) {
    let timeout = 'timeout' in options ? options.timeout : 1000;
    let timeoutMessage = 'timeoutMessage' in options ? options.timeoutMessage : 'waitUntil timed out';

    // creating this error eagerly so it has the proper invocation stack
    let waitUntilTimedOut = new Error(timeoutMessage);

    return new Ember.RSVP.Promise(function (resolve, reject) {
      let time = 0;

      // eslint-disable-next-line require-jsdoc
      function scheduleCheck(timeoutsIndex) {
        let interval = TIMEOUTS[timeoutsIndex];
        if (interval === undefined) {
          interval = MAX_TIMEOUT;
        }

        (0, _utils.futureTick)(function () {
          time += interval;

          let value;
          try {
            value = callback();
          } catch (error) {
            reject(error);
          }

          if (value) {
            resolve(value);
          } else if (time < timeout) {
            scheduleCheck(timeoutsIndex + 1);
          } else {
            reject(waitUntilTimedOut);
          }
        }, interval);
      }

      scheduleCheck(0);
    });
  }
});
define('mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/components/md breadcrumb', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('visiting /record/new', async function (assert) {
      assert.expect(4);

      await (0, _testHelpers.visit)('/record/new');

      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));

      const listItems = (0, _testHelpers.findAll)('ol.breadcrumb li');
      const linkItems = (0, _testHelpers.findAll)('ol.breadcrumb li a');

      const hasRecordInallList = listItems[0].textContent.indexOf('Record') >= 0;
      const hasNewTextInallList = listItems[1].textContent.indexOf('New') >= 0;

      // const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
      // const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.equal(linkItems.length, 0, 'no links rendered');
      // assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
      // assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define('mdeditor/tests/acceptance/pods/contact/copy-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_qunit, _testHelpers, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/contact copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);

      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var contact = store.createRecord('contact', (0, _createContact.default)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/contact/' + contact.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/contact/' + contact.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Copy of Contact0', 'created copy');

      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define('mdeditor/tests/acceptance/pods/contact/new-test', ['qunit', '@ember/test-helpers', 'ember-qunit'], function (_qunit, _testHelpers, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/contact/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('visiting /pods/contact/new', async function (assert) {
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.currentURL)().match(/contact\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new contact initial page conditions', async function (assert) {
      assert.expect(5);
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-off'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new contact individual', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[2], '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new contact organization', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.click)('.x-toggle-btn');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Organization Name');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-on'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, "Organization Name");
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new contact missing contact ID', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], '');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define('mdeditor/tests/acceptance/pods/contacts/contacts-test', ['qunit', '@ember/test-helpers', 'ember-qunit'], function (_qunit, _testHelpers, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/contacts', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('visiting /contacts', async function (assert) {
      await (0, _testHelpers.visit)('/contacts');

      assert.equal((0, _testHelpers.currentURL)(), '/contacts');
    });

    (0, _qunit.test)('delete should display a confirm', async function (assert) {
      assert.expect(1);

      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      store.createRecord('contact');
      await (0, _testHelpers.visit)('/contacts');
      await (0, _testHelpers.click)('button.md-button-confirm.btn-danger');
      assert.equal((0, _testHelpers.find)('button.md-button-confirm.btn-danger').innerText.trim(), 'Confirm');
    });
  });
});
define('mdeditor/tests/acceptance/pods/dictionary/copy-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'mdeditor/tests/helpers/create-dictionary'], function (_qunit, _testHelpers, _emberQunit, _createDictionary) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/dictionary copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);

      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var dictionary = store.createRecord('dictionary', (0, _createDictionary.default)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/dictionary/' + dictionary.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/dictionary/' + dictionary.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Dictionary0', 'created copy');

      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define('mdeditor/tests/acceptance/pods/dictionary/new-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-power-select/test-support'], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/dictionary/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('visiting /pods/dictionary/new', async function (assert) {
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.ok((0, _testHelpers.currentURL)().match(/dictionary\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new dictionary initial page conditions', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText, '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 2);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new dictionary completed form', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, 'Dictionary Name');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'aggregate');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 0);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new dictionary missing dictionary name', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testSupport.selectChoose)('div.md-select', 'aggregate');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new dictionary missing data resource type', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define('mdeditor/tests/acceptance/pods/record/copy-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'mdeditor/tests/helpers/create-record'], function (_qunit, _testHelpers, _emberQunit, _createRecord) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/record copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);

      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var record = store.createRecord('record', (0, _createRecord.default)(1)[0]);
      //await visit('/records/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/record/' + record.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/record/' + record.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Record0', 'created copy');

      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define('mdeditor/tests/acceptance/pods/record/new-test', ['qunit', '@ember/test-helpers', 'ember-qunit', 'ember-power-select/test-support'], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  'use strict';

  (0, _qunit.module)('Acceptance | pods/record/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);

    (0, _qunit.test)('visiting /pods/record/new', async function (assert) {
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
    });

    (0, _qunit.test)('test new metadata record initial page conditions', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText.trim(), 'Choose type of resource');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new metadata record completed form', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], 'Record Title');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Record Title');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new metadata record missing record title', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });

    (0, _qunit.test)('test new metadata record missing data record type (scope)', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Record Title');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("ember-basic-dropdown/test-support/helpers", ["exports", "@ember/test-helpers"], function (_exports, _testHelpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.nativeTap = nativeTap;
  _exports.clickTrigger = clickTrigger;
  _exports.tapTrigger = tapTrigger;
  _exports.fireKeydown = fireKeydown;
  _exports.default = _default;

  function nativeTap(selector, options = {}) {
    let touchStartEvent = new window.Event('touchstart', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    Object.keys(options).forEach(key => touchStartEvent[key] = options[key]);
    Ember.run(() => document.querySelector(selector).dispatchEvent(touchStartEvent));
    let touchEndEvent = new window.Event('touchend', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    Object.keys(options).forEach(key => touchEndEvent[key] = options[key]);
    Ember.run(() => document.querySelector(selector).dispatchEvent(touchEndEvent));
  }

  function clickTrigger(scope, options = {}) {
    let selector = '.ember-basic-dropdown-trigger';

    if (scope) {
      let element = document.querySelector(scope);

      if (element.classList.contains('ember-basic-dropdown-trigger')) {
        selector = scope;
      } else {
        selector = scope + ' ' + selector;
      }
    }

    (0, _testHelpers.click)(selector, options);
    return (0, _testHelpers.settled)();
  }

  function tapTrigger(scope, options = {}) {
    let selector = '.ember-basic-dropdown-trigger';

    if (scope) {
      selector = scope + ' ' + selector;
    }

    nativeTap(selector, options);
  }

  function fireKeydown(selector, k) {
    let oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    Ember.merge(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    Ember.run(() => document.querySelector(selector).dispatchEvent(oEvent));
  } // acceptance helpers


  function _default() {
    Ember.Test.registerAsyncHelper('clickDropdown', function (app, cssPath, options = {}) {
      (true && !(false) && Ember.deprecate('Using the global `clickDropdown` acceptance helper from ember-basic-dropdown is deprecated. Please, explicitly import the `clickTrigger` or just use `click` helper from `@ember/test-helpers`.', false, {
        until: '1.0.0',
        id: 'ember-basic-dropdown-click-dropdown'
      }));
      clickTrigger(cssPath, options);
    });
    Ember.Test.registerAsyncHelper('tapDropdown', function (app, cssPath, options = {}) {
      (true && !(false) && Ember.deprecate('Using the global `tapDropdown` acceptance helper from ember-basic-dropdown is deprecated. Please, explicitly import the `tapTrigger` or just use `tap` helper from `@ember/test-helpers`.', false, {
        until: '1.0.0',
        id: 'ember-basic-dropdown-click-dropdown'
      }));
      tapTrigger(cssPath, options);
    });
  }
});
define('ember-cli-test-loader/test-support/index', ['exports'], function (exports) {
  /* globals requirejs, require */
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.addModuleIncludeMatcher = addModuleIncludeMatcher;
  exports.addModuleExcludeMatcher = addModuleExcludeMatcher;
  let moduleIncludeMatchers = [];
  let moduleExcludeMatchers = [];

  function addModuleIncludeMatcher(fn) {
    moduleIncludeMatchers.push(fn);
  }

  function addModuleExcludeMatcher(fn) {
    moduleExcludeMatchers.push(fn);
  }

  function checkMatchers(matchers, moduleName) {
    return matchers.some(matcher => matcher(moduleName));
  }

  class TestLoader {
    static load() {
      new TestLoader().loadModules();
    }

    constructor() {
      this._didLogMissingUnsee = false;
    }

    shouldLoadModule(moduleName) {
      return moduleName.match(/[-_]test$/);
    }

    listModules() {
      return Object.keys(requirejs.entries);
    }

    listTestModules() {
      let moduleNames = this.listModules();
      let testModules = [];
      let moduleName;

      for (let i = 0; i < moduleNames.length; i++) {
        moduleName = moduleNames[i];

        if (checkMatchers(moduleExcludeMatchers, moduleName)) {
          continue;
        }

        if (checkMatchers(moduleIncludeMatchers, moduleName) || this.shouldLoadModule(moduleName)) {
          testModules.push(moduleName);
        }
      }

      return testModules;
    }

    loadModules() {
      let testModules = this.listTestModules();
      let testModule;

      for (let i = 0; i < testModules.length; i++) {
        testModule = testModules[i];
        this.require(testModule);
        this.unsee(testModule);
      }
    }

    require(moduleName) {
      try {
        require(moduleName);
      } catch (e) {
        this.moduleLoadFailure(moduleName, e);
      }
    }

    unsee(moduleName) {
      if (typeof require.unsee === 'function') {
        require.unsee(moduleName);
      } else if (!this._didLogMissingUnsee) {
        this._didLogMissingUnsee = true;
        if (typeof console !== 'undefined') {
          console.warn('unable to require.unsee, please upgrade loader.js to >= v3.3.0');
        }
      }
    }

    moduleLoadFailure(moduleName, error) {
      console.error('Error loading: ' + moduleName, error.stack);
    }
  }exports.default = TestLoader;
  ;
});
define('ember-local-storage/test-support/reset-storage', ['exports', 'ember-local-storage/helpers/storage'], function (exports, _storage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _storage._resetStorages;
});
define('ember-macro-helpers/test-support/compute', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function ({
    assert,
    baseClass = Ember.Component,
    computed,
    properties,
    strictEqual,
    deepEqual,
    assertion,
    assertReadOnly
  }) {
    let MyComponent = baseClass.extend({
      computed
    });
    let subject;
    try {
      subject = MyComponent.create({
        renderer: {}
      });
    } catch (err) {
      // this is for ember < 2.10
      // can remove once only support 2.12
      subject = MyComponent.create();
    }

    // compute initial value
    // to test recomputes
    Ember.get(subject, 'computed');

    Ember.setProperties(subject, properties);

    let result = Ember.get(subject, 'computed');

    function doAssertion(result) {
      if (assertion) {
        assert.ok(assertion(result));
      } else if (deepEqual) {
        assert.deepEqual(result, deepEqual);
      } else if (assertReadOnly) {
        let func = () => Ember.set(subject, 'computed', 'assert read only');
        assert.throws(func, /Cannot set read-only property/);
      } else if (assert) {
        assert.strictEqual(result, strictEqual);
      }
    }

    let promise;
    if (result && typeof result === 'object' && typeof result.then === 'function') {
      promise = result.then(doAssertion);
    } else {
      doAssertion(result);
    }

    return {
      subject,
      result,
      promise
    };
  };
});
define('ember-macro-helpers/test-support/expect-imports', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (assert, obj) {
    assert.expect(Object.getOwnPropertyNames(obj).filter(p => exclude.indexOf(p) === -1).length);
  };

  const exclude = ['__esModule', 'default'];

  // helps prevent forgetting to test a new import
});
define('ember-macro-helpers/test-support/index', ['exports', 'ember-macro-helpers/test-support/compute'], function (exports, _compute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'compute', {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
});
define("ember-power-select/test-support/helpers", ["exports", "@ember/test-helpers", "ember-power-select/test-support/index"], function (_exports, _testHelpers, _index) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.findContains = findContains;
  _exports.nativeMouseDown = nativeMouseDown;
  _exports.nativeMouseUp = nativeMouseUp;
  _exports.triggerKeydown = triggerKeydown;
  _exports.typeInSearch = typeInSearch;
  _exports.clickTrigger = clickTrigger;
  _exports.nativeTouch = nativeTouch;
  _exports.touchTrigger = touchTrigger;
  _exports.selectChoose = selectChoose;
  _exports.selectSearch = selectSearch;
  _exports.removeMultipleOption = removeMultipleOption;
  _exports.clearSelected = clearSelected;
  _exports.default = _default;

  /**
   * @private
   * @param {String} selector CSS3 selector of the elements to check the content
   * @param {String} text Substring that the selected element must contain
   * @returns HTMLElement The first element that maches the given selector and contains the
   *                      given text
   */
  function findContains(selector, text) {
    return [].slice.apply(document.querySelectorAll(selector)).filter(e => {
      return e.textContent.trim().indexOf(text) > -1;
    })[0];
  }

  async function nativeMouseDown(selectorOrDomElement, options) {
    return (0, _testHelpers.triggerEvent)(selectorOrDomElement, 'mousedown', options);
  }

  async function nativeMouseUp(selectorOrDomElement, options) {
    return (0, _testHelpers.triggerEvent)(selectorOrDomElement, 'mouseup', options);
  }

  async function triggerKeydown(domElement, k) {
    return (0, _testHelpers.triggerKeyEvent)(domElement, 'keydown', k);
  }

  function typeInSearch(scopeOrText, text) {
    let scope = '';

    if (typeof text === 'undefined') {
      text = scopeOrText;
    } else {
      scope = scopeOrText;
    }

    let selectors = ['.ember-power-select-search-input', '.ember-power-select-search input', '.ember-power-select-trigger-multiple-input', 'input[type="search"]'].map(selector => `${scope} ${selector}`).join(', ');
    return (0, _testHelpers.fillIn)(selectors, text);
  }

  async function clickTrigger(scope, options = {}) {
    let selector = '.ember-power-select-trigger';

    if (scope) {
      selector = `${scope} ${selector}`;
    }

    return (0, _testHelpers.click)(selector, options);
  }

  async function nativeTouch(selectorOrDomElement) {
    (0, _testHelpers.triggerEvent)(selectorOrDomElement, 'touchstart');
    return (0, _testHelpers.triggerEvent)(selectorOrDomElement, 'touchend');
  }

  async function touchTrigger() {
    return nativeTouch('.ember-power-select-trigger');
  }

  async function selectChoose(cssPathOrTrigger, valueOrSelector, optionIndex) {
    return (0, _index.selectChoose)(cssPathOrTrigger, valueOrSelector, optionIndex);
  }

  async function selectSearch(cssPathOrTrigger, value) {
    return (0, _index.selectSearch)(cssPathOrTrigger, value);
  }

  async function removeMultipleOption(cssPath, value) {
    return (0, _index.removeMultipleOption)(cssPath, value);
  }

  async function clearSelected(cssPath) {
    return (0, _index.clearSelected)(cssPath);
  } // Helpers for acceptance tests


  function _default() {
    Ember.Test.registerAsyncHelper('selectChoose', function (_, cssPathOrTrigger, valueOrSelector, optionIndex) {
      (true && !(true) && Ember.deprecate('Using the implicit global async helper `selectChoose` is deprecated. Please, import it explicitly with `import { selectChoose } from "ember-power-select/test-support"`', true, {
        id: 'ember-power-select-global-select-choose',
        until: '2.0.0'
      }));
      return (0, _index.selectChoose)(cssPathOrTrigger, valueOrSelector, optionIndex);
    });
    Ember.Test.registerAsyncHelper('selectSearch', async function (app, cssPathOrTrigger, value) {
      (true && !(true) && Ember.deprecate('Using the implicit global async helper `selectSearch` is deprecated. Please, import it explicitly with `import { selectSearch } from "ember-power-select/test-support"`', true, {
        id: 'ember-power-select-global-select-search',
        until: '2.0.0'
      }));
      return (0, _index.selectSearch)(cssPathOrTrigger, value);
    });
    Ember.Test.registerAsyncHelper('removeMultipleOption', async function (app, cssPath, value) {
      (true && !(true) && Ember.deprecate('Using the implicit global async helper `removeMultipleOption` is deprecated. Please, import it explicitly with `import { removeMultipleOption } from "ember-power-select/test-support"`', true, {
        id: 'ember-power-select-global-remove-multiple-option',
        until: '2.0.0'
      }));
      return (0, _index.removeMultipleOption)(cssPath, value);
    });
    Ember.Test.registerAsyncHelper('clearSelected', async function (app, cssPath) {
      (true && !(true) && Ember.deprecate('Using the implicit global async helper `clearSelected` is deprecated. Please, import it explicitly with `import { clearSelected } from "ember-power-select/test-support"`', true, {
        id: 'ember-power-select-global-clear-selected',
        until: '2.0.0'
      }));
      return (0, _index.clearSelected)(cssPath);
    });
  }
});
define("ember-power-select/test-support/index", ["exports", "@ember/test-helpers"], function (_exports, _testHelpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.selectChoose = selectChoose;
  _exports.selectSearch = selectSearch;
  _exports.removeMultipleOption = removeMultipleOption;
  _exports.clearSelected = clearSelected;

  async function openIfClosedAndGetContentId(trigger) {
    let contentId = trigger.attributes['aria-owns'] && `${trigger.attributes['aria-owns'].value}`;
    let content = contentId ? document.querySelector(`#${contentId}`) : undefined; // If the dropdown is closed, open it

    if (!content || content.classList.contains('ember-basic-dropdown-content-placeholder')) {
      await (0, _testHelpers.click)(trigger);
      await (0, _testHelpers.settled)();
      contentId = `${trigger.attributes['aria-owns'].value}`;
    }

    return contentId;
  }

  async function selectChoose(cssPathOrTrigger, valueOrSelector, optionIndex) {
    let trigger, target;

    if (cssPathOrTrigger instanceof HTMLElement) {
      if (cssPathOrTrigger.classList.contains('ember-power-select-trigger')) {
        trigger = cssPathOrTrigger;
      } else {
        trigger = cssPathOrTrigger.querySelector('.ember-power-select-trigger');
      }
    } else {
      trigger = document.querySelector(`${cssPathOrTrigger} .ember-power-select-trigger`);

      if (!trigger) {
        trigger = document.querySelector(cssPathOrTrigger);
      }

      if (!trigger) {
        throw new Error(`You called "selectChoose('${cssPathOrTrigger}', '${valueOrSelector}')" but no select was found using selector "${cssPathOrTrigger}"`);
      }
    }

    if (trigger.scrollIntoView) {
      trigger.scrollIntoView();
    }

    let contentId = await openIfClosedAndGetContentId(trigger); // Select the option with the given text

    let options = document.querySelectorAll(`#${contentId} .ember-power-select-option`);
    let potentialTargets = [].slice.apply(options).filter(opt => opt.textContent.indexOf(valueOrSelector) > -1);

    if (potentialTargets.length === 0) {
      potentialTargets = document.querySelectorAll(`#${contentId} ${valueOrSelector}`);
    }

    if (potentialTargets.length > 1) {
      let filteredTargets = [].slice.apply(potentialTargets).filter(t => t.textContent.trim() === valueOrSelector);

      if (optionIndex === undefined) {
        target = filteredTargets[0] || potentialTargets[0];
      } else {
        target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
      }
    } else {
      target = potentialTargets[0];
    }

    if (!target) {
      throw new Error(`You called "selectChoose('${cssPathOrTrigger}', '${valueOrSelector}')" but "${valueOrSelector}" didn't match any option`);
    }

    await (0, _testHelpers.click)(target);
    return (0, _testHelpers.settled)();
  }

  async function selectSearch(cssPathOrTrigger, value) {
    let trigger;

    if (cssPathOrTrigger instanceof HTMLElement) {
      trigger = cssPathOrTrigger;
    } else {
      let triggerPath = `${cssPathOrTrigger} .ember-power-select-trigger`;
      trigger = document.querySelector(triggerPath);

      if (!trigger) {
        triggerPath = cssPathOrTrigger;
        trigger = document.querySelector(triggerPath);
      }

      if (!trigger) {
        throw new Error(`You called "selectSearch('${cssPathOrTrigger}', '${value}')" but no select was found using selector "${cssPathOrTrigger}"`);
      }
    }

    if (trigger.scrollIntoView) {
      trigger.scrollIntoView();
    }

    let isMultipleSelect = !!trigger.querySelector('.ember-power-select-trigger-multiple-input');
    let contentId = await openIfClosedAndGetContentId(trigger);
    let isDefaultSingleSelect = !!document.querySelector('.ember-power-select-search-input');

    if (isMultipleSelect) {
      await (0, _testHelpers.fillIn)(trigger.querySelector('.ember-power-select-trigger-multiple-input'), value);
    } else if (isDefaultSingleSelect) {
      await (0, _testHelpers.fillIn)('.ember-power-select-search-input', value);
    } else {
      // It's probably a customized version
      let inputIsInTrigger = !!trigger.querySelector('.ember-power-select-trigger input[type=search]');

      if (inputIsInTrigger) {
        await (0, _testHelpers.fillIn)(trigger.querySelector('input[type=search]'), value);
      } else {
        await (0, _testHelpers.fillIn)(`#${contentId} .ember-power-select-search-input[type=search]`, 'input');
      }
    }

    return (0, _testHelpers.settled)();
  }

  async function removeMultipleOption(cssPath, value) {
    let elem;
    let items = document.querySelectorAll(`${cssPath} .ember-power-select-multiple-options > li`);
    let item = [].slice.apply(items).find(el => el.textContent.indexOf(value) > -1);

    if (item) {
      elem = item.querySelector('.ember-power-select-multiple-remove-btn');
    }

    try {
      await (0, _testHelpers.click)(elem);
      return (0, _testHelpers.settled)();
    } catch (e) {
      (true && Ember.warn('css path to remove btn not found'));
      throw e;
    }
  }

  async function clearSelected(cssPath) {
    let elem = document.querySelector(`${cssPath} .ember-power-select-clear-btn`);

    try {
      await (0, _testHelpers.click)(elem);
      return (0, _testHelpers.settled)();
    } catch (e) {
      (true && Ember.warn('css path to clear btn not found'));
      throw e;
    }
  }
});
define('ember-qunit/adapter', ['exports', 'qunit', '@ember/test-helpers/has-ember-version'], function (exports, _qunit, _hasEmberVersion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function unhandledRejectionAssertion(current, error) {
    let message, source;

    if (typeof error === 'object' && error !== null) {
      message = error.message;
      source = error.stack;
    } else if (typeof error === 'string') {
      message = error;
      source = 'unknown source';
    } else {
      message = 'unhandledRejection occured, but it had no message';
      source = 'unknown source';
    }

    current.assert.pushResult({
      result: false,
      actual: false,
      expected: true,
      message: message,
      source: source
    });
  }

  let Adapter = Ember.Test.Adapter.extend({
    init() {
      this.doneCallbacks = [];
    },

    asyncStart() {
      this.doneCallbacks.push(_qunit.default.config.current ? _qunit.default.config.current.assert.async() : null);
    },

    asyncEnd() {
      let done = this.doneCallbacks.pop();
      // This can be null if asyncStart() was called outside of a test
      if (done) {
        done();
      }
    },

    // clobber default implementation of `exception` will be added back for Ember
    // < 2.17 just below...
    exception: null
  });

  // Ember 2.17 and higher do not require the test adapter to have an `exception`
  // method When `exception` is not present, the unhandled rejection is
  // automatically re-thrown and will therefore hit QUnit's own global error
  // handler (therefore appropriately causing test failure)
  if (!(0, _hasEmberVersion.default)(2, 17)) {
    Adapter = Adapter.extend({
      exception(error) {
        unhandledRejectionAssertion(_qunit.default.config.current, error);
      }
    });
  }

  exports.default = Adapter;
});
define('ember-qunit/index', ['exports', 'ember-qunit/legacy-2-x/module-for', 'ember-qunit/legacy-2-x/module-for-component', 'ember-qunit/legacy-2-x/module-for-model', 'ember-qunit/adapter', 'qunit', 'ember-qunit/test-loader', '@ember/test-helpers', 'ember-qunit/test-isolation-validation'], function (exports, _moduleFor, _moduleForComponent, _moduleForModel, _adapter, _qunit, _testLoader, _testHelpers, _testIsolationValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.loadTests = exports.todo = exports.only = exports.skip = exports.test = exports.module = exports.QUnitAdapter = exports.moduleForModel = exports.moduleForComponent = exports.moduleFor = undefined;
  Object.defineProperty(exports, 'moduleFor', {
    enumerable: true,
    get: function () {
      return _moduleFor.default;
    }
  });
  Object.defineProperty(exports, 'moduleForComponent', {
    enumerable: true,
    get: function () {
      return _moduleForComponent.default;
    }
  });
  Object.defineProperty(exports, 'moduleForModel', {
    enumerable: true,
    get: function () {
      return _moduleForModel.default;
    }
  });
  Object.defineProperty(exports, 'QUnitAdapter', {
    enumerable: true,
    get: function () {
      return _adapter.default;
    }
  });
  Object.defineProperty(exports, 'module', {
    enumerable: true,
    get: function () {
      return _qunit.module;
    }
  });
  Object.defineProperty(exports, 'test', {
    enumerable: true,
    get: function () {
      return _qunit.test;
    }
  });
  Object.defineProperty(exports, 'skip', {
    enumerable: true,
    get: function () {
      return _qunit.skip;
    }
  });
  Object.defineProperty(exports, 'only', {
    enumerable: true,
    get: function () {
      return _qunit.only;
    }
  });
  Object.defineProperty(exports, 'todo', {
    enumerable: true,
    get: function () {
      return _qunit.todo;
    }
  });
  Object.defineProperty(exports, 'loadTests', {
    enumerable: true,
    get: function () {
      return _testLoader.loadTests;
    }
  });
  exports.setResolver = setResolver;
  exports.render = render;
  exports.clearRender = clearRender;
  exports.settled = settled;
  exports.pauseTest = pauseTest;
  exports.resumeTest = resumeTest;
  exports.setupTest = setupTest;
  exports.setupRenderingTest = setupRenderingTest;
  exports.setupApplicationTest = setupApplicationTest;
  exports.setupTestContainer = setupTestContainer;
  exports.startTests = startTests;
  exports.setupTestAdapter = setupTestAdapter;
  exports.setupEmberTesting = setupEmberTesting;
  exports.setupEmberOnerrorValidation = setupEmberOnerrorValidation;
  exports.setupTestIsolationValidation = setupTestIsolationValidation;
  exports.start = start;
  function setResolver() {
    (true && !(false) && Ember.deprecate('`setResolver` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.setResolver',
      until: '4.0.0'
    }));


    return (0, _testHelpers.setResolver)(...arguments);
  }

  function render() {
    (true && !(false) && Ember.deprecate('`render` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.render',
      until: '4.0.0'
    }));


    return (0, _testHelpers.render)(...arguments);
  }

  function clearRender() {
    (true && !(false) && Ember.deprecate('`clearRender` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.clearRender',
      until: '4.0.0'
    }));


    return (0, _testHelpers.clearRender)(...arguments);
  }

  function settled() {
    (true && !(false) && Ember.deprecate('`settled` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.settled',
      until: '4.0.0'
    }));


    return (0, _testHelpers.settled)(...arguments);
  }

  function pauseTest() {
    (true && !(false) && Ember.deprecate('`pauseTest` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.pauseTest',
      until: '4.0.0'
    }));


    return (0, _testHelpers.pauseTest)(...arguments);
  }

  function resumeTest() {
    (true && !(false) && Ember.deprecate('`resumeTest` should be imported from `@ember/test-helpers`, but was imported from `ember-qunit`', false, {
      id: 'ember-qunit.deprecated-reexports.resumeTest',
      until: '4.0.0'
    }));


    return (0, _testHelpers.resumeTest)(...arguments);
  }

  function setupTest(hooks, options) {
    hooks.beforeEach(function (assert) {
      return (0, _testHelpers.setupContext)(this, options).then(() => {
        let originalPauseTest = this.pauseTest;
        this.pauseTest = function QUnit_pauseTest() {
          assert.timeout(-1); // prevent the test from timing out

          return originalPauseTest.call(this);
        };
      });
    });

    hooks.afterEach(function () {
      return (0, _testHelpers.teardownContext)(this);
    });
  }

  function setupRenderingTest(hooks, options) {
    setupTest(hooks, options);

    hooks.beforeEach(function () {
      return (0, _testHelpers.setupRenderingContext)(this);
    });

    hooks.afterEach(function () {
      return (0, _testHelpers.teardownRenderingContext)(this);
    });
  }

  function setupApplicationTest(hooks, options) {
    setupTest(hooks, options);

    hooks.beforeEach(function () {
      return (0, _testHelpers.setupApplicationContext)(this);
    });

    hooks.afterEach(function () {
      return (0, _testHelpers.teardownApplicationContext)(this);
    });
  }

  /**
     Uses current URL configuration to setup the test container.
  
     * If `?nocontainer` is set, the test container will be hidden.
     * If `?dockcontainer` or `?devmode` are set the test container will be
       absolutely positioned.
     * If `?devmode` is set, the test container will be made full screen.
  
     @method setupTestContainer
   */
  function setupTestContainer() {
    let testContainer = document.getElementById('ember-testing-container');
    if (!testContainer) {
      return;
    }

    let params = _qunit.default.urlParams;

    let containerVisibility = params.nocontainer ? 'hidden' : 'visible';
    let containerPosition = params.dockcontainer || params.devmode ? 'fixed' : 'relative';

    if (params.devmode) {
      testContainer.className = ' full-screen';
    }

    testContainer.style.visibility = containerVisibility;
    testContainer.style.position = containerPosition;

    let qunitContainer = document.getElementById('qunit');
    if (params.dockcontainer) {
      qunitContainer.style.marginBottom = window.getComputedStyle(testContainer).height;
    }
  }

  /**
     Instruct QUnit to start the tests.
     @method startTests
   */
  function startTests() {
    _qunit.default.start();
  }

  /**
     Sets up the `Ember.Test` adapter for usage with QUnit 2.x.
  
     @method setupTestAdapter
   */
  function setupTestAdapter() {
    Ember.Test.adapter = _adapter.default.create();
  }

  /**
    Ensures that `Ember.testing` is set to `true` before each test begins
    (including `before` / `beforeEach`), and reset to `false` after each test is
    completed. This is done via `QUnit.testStart` and `QUnit.testDone`.
  
   */
  function setupEmberTesting() {
    _qunit.default.testStart(() => {
      Ember.testing = true;
    });

    _qunit.default.testDone(() => {
      Ember.testing = false;
    });
  }

  /**
    Ensures that `Ember.onerror` (if present) is properly configured to re-throw
    errors that occur while `Ember.testing` is `true`.
  */
  function setupEmberOnerrorValidation() {
    _qunit.default.module('ember-qunit: Ember.onerror validation', function () {
      _qunit.default.test('Ember.onerror is functioning properly', function (assert) {
        assert.expect(1);
        let result = (0, _testHelpers.validateErrorHandler)();
        assert.ok(result.isValid, `Ember.onerror handler with invalid testing behavior detected. An Ember.onerror handler _must_ rethrow exceptions when \`Ember.testing\` is \`true\` or the test suite is unreliable. See https://git.io/vbine for more details.`);
      });
    });
  }

  function setupTestIsolationValidation() {
    _qunit.default.testDone(_testIsolationValidation.detectIfTestNotIsolated);
    _qunit.default.done(_testIsolationValidation.reportIfTestNotIsolated);
  }

  /**
     @method start
     @param {Object} [options] Options to be used for enabling/disabling behaviors
     @param {Boolean} [options.loadTests] If `false` tests will not be loaded automatically.
     @param {Boolean} [options.setupTestContainer] If `false` the test container will not
     be setup based on `devmode`, `dockcontainer`, or `nocontainer` URL params.
     @param {Boolean} [options.startTests] If `false` tests will not be automatically started
     (you must run `QUnit.start()` to kick them off).
     @param {Boolean} [options.setupTestAdapter] If `false` the default Ember.Test adapter will
     not be updated.
     @param {Boolean} [options.setupEmberTesting] `false` opts out of the
     default behavior of setting `Ember.testing` to `true` before all tests and
     back to `false` after each test will.
     @param {Boolean} [options.setupEmberOnerrorValidation] If `false` validation
     of `Ember.onerror` will be disabled.
     @param {Boolean} [options.setupTestIsolationValidation] If `false` test isolation validation
     will be disabled.
   */
  function start(options = {}) {
    if (options.loadTests !== false) {
      (0, _testLoader.loadTests)();
    }

    if (options.setupTestContainer !== false) {
      setupTestContainer();
    }

    if (options.setupTestAdapter !== false) {
      setupTestAdapter();
    }

    if (options.setupEmberTesting !== false) {
      setupEmberTesting();
    }

    if (options.setupEmberOnerrorValidation !== false) {
      setupEmberOnerrorValidation();
    }

    if (typeof options.setupTestIsolationValidation !== 'undefined' && options.setupTestIsolationValidation !== false) {
      setupTestIsolationValidation();
    }

    if (options.startTests !== false) {
      startTests();
    }
  }
});
define('ember-qunit/legacy-2-x/module-for-component', ['exports', 'ember-qunit/legacy-2-x/qunit-module', 'ember-test-helpers'], function (exports, _qunitModule, _emberTestHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = moduleForComponent;
  function moduleForComponent(name, description, callbacks) {
    (0, _qunitModule.createModule)(_emberTestHelpers.TestModuleForComponent, name, description, callbacks);
  }
});
define('ember-qunit/legacy-2-x/module-for-model', ['exports', 'ember-qunit/legacy-2-x/qunit-module', 'ember-test-helpers'], function (exports, _qunitModule, _emberTestHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = moduleForModel;
  function moduleForModel(name, description, callbacks) {
    (0, _qunitModule.createModule)(_emberTestHelpers.TestModuleForModel, name, description, callbacks);
  }
});
define('ember-qunit/legacy-2-x/module-for', ['exports', 'ember-qunit/legacy-2-x/qunit-module', 'ember-test-helpers'], function (exports, _qunitModule, _emberTestHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = moduleFor;
  function moduleFor(name, description, callbacks) {
    (0, _qunitModule.createModule)(_emberTestHelpers.TestModule, name, description, callbacks);
  }
});
define('ember-qunit/legacy-2-x/qunit-module', ['exports', 'qunit'], function (exports, _qunit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createModule = createModule;


  function noop() {}

  function callbackFor(name, callbacks) {
    if (typeof callbacks !== 'object') {
      return noop;
    }
    if (!callbacks) {
      return noop;
    }

    var callback = noop;

    if (callbacks[name]) {
      callback = callbacks[name];
      delete callbacks[name];
    }

    return callback;
  }

  function createModule(Constructor, name, description, callbacks) {
    if (!callbacks && typeof description === 'object') {
      callbacks = description;
      description = name;
    }

    var before = callbackFor('before', callbacks);
    var beforeEach = callbackFor('beforeEach', callbacks);
    var afterEach = callbackFor('afterEach', callbacks);
    var after = callbackFor('after', callbacks);

    var module;
    var moduleName = typeof description === 'string' ? description : name;

    (0, _qunit.module)(moduleName, {
      before() {
        // storing this in closure scope to avoid exposing these
        // private internals to the test context
        module = new Constructor(name, description, callbacks);
        return before.apply(this, arguments);
      },

      beforeEach() {
        // provide the test context to the underlying module
        module.setContext(this);

        return module.setup(...arguments).then(() => {
          return beforeEach.apply(this, arguments);
        });
      },

      afterEach() {
        let result = afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(result).then(() => module.teardown(...arguments));
      },

      after() {
        try {
          return after.apply(this, arguments);
        } finally {
          after = afterEach = before = beforeEach = callbacks = module = null;
        }
      }
    });
  }
});
define('ember-qunit/test-isolation-validation', ['exports', '@ember/test-helpers'], function (exports, _testHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.detectIfTestNotIsolated = detectIfTestNotIsolated;
  exports.reportIfTestNotIsolated = reportIfTestNotIsolated;
  exports.getMessage = getMessage;


  const TESTS_NOT_ISOLATED = [];

  /**
   * Detects if a specific test isn't isolated. A test is considered
   * not isolated if it:
   *
   * - has pending timers
   * - is in a runloop
   * - has pending AJAX requests
   * - has pending test waiters
   *
   * @function detectIfTestNotIsolated
   * @param {Object} testInfo
   * @param {string} testInfo.module The name of the test module
   * @param {string} testInfo.name The test name
   */
  function detectIfTestNotIsolated({ module, name }) {
    if (!(0, _testHelpers.isSettled)()) {
      TESTS_NOT_ISOLATED.push(`${module}: ${name}`);
      Ember.run.cancelTimers();
    }
  }

  /**
   * Reports if a test isn't isolated. Please see above for what
   * constitutes a test being isolated.
   *
   * @function reportIfTestNotIsolated
   * @throws Error if tests are not isolated
   */
  function reportIfTestNotIsolated() {
    if (TESTS_NOT_ISOLATED.length > 0) {
      let leakyTests = TESTS_NOT_ISOLATED.slice();
      TESTS_NOT_ISOLATED.length = 0;

      throw new Error(getMessage(leakyTests.length, leakyTests.join('\n')));
    }
  }

  function getMessage(testCount, testsToReport) {
    return `TESTS ARE NOT ISOLATED
    The following (${testCount}) tests have one or more of pending timers, pending AJAX requests, pending test waiters, or are still in a runloop: \n
    ${testsToReport}
  `;
  }
});
define('ember-qunit/test-loader', ['exports', 'qunit', 'ember-cli-test-loader/test-support/index'], function (exports, _qunit, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TestLoader = undefined;
  exports.loadTests = loadTests;


  (0, _index.addModuleExcludeMatcher)(function (moduleName) {
    return _qunit.default.urlParams.nolint && moduleName.match(/\.(jshint|lint-test)$/);
  });

  (0, _index.addModuleIncludeMatcher)(function (moduleName) {
    return moduleName.match(/\.jshint$/);
  });

  let moduleLoadFailures = [];

  _qunit.default.done(function () {
    let length = moduleLoadFailures.length;

    try {
      if (length === 0) {
        // do nothing
      } else if (length === 1) {
        throw moduleLoadFailures[0];
      } else {
        throw new Error('\n' + moduleLoadFailures.join('\n'));
      }
    } finally {
      // ensure we release previously captured errors.
      moduleLoadFailures = [];
    }
  });

  class TestLoader extends _index.default {
    moduleLoadFailure(moduleName, error) {
      moduleLoadFailures.push(error);

      _qunit.default.module('TestLoader Failures');
      _qunit.default.test(moduleName + ': could not be loaded', function () {
        throw error;
      });
    }
  }

  exports.TestLoader = TestLoader;
  /**
     Load tests following the default patterns:
  
     * The module name ends with `-test`
     * The module name ends with `.jshint`
  
     Excludes tests that match the following
     patterns when `?nolint` URL param is set:
  
     * The module name ends with `.jshint`
     * The module name ends with `-lint-test`
  
     @method loadTests
   */
  function loadTests() {
    new TestLoader().loadModules();
  }
});
define('ember-test-helpers/has-ember-version', ['exports', '@ember/test-helpers/has-ember-version'], function (exports, _hasEmberVersion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasEmberVersion.default;
    }
  });
});
define('ember-test-helpers/index', ['exports', '@ember/test-helpers', 'ember-test-helpers/legacy-0-6-x/test-module', 'ember-test-helpers/legacy-0-6-x/test-module-for-acceptance', 'ember-test-helpers/legacy-0-6-x/test-module-for-component', 'ember-test-helpers/legacy-0-6-x/test-module-for-model'], function (exports, _testHelpers, _testModule, _testModuleForAcceptance, _testModuleForComponent, _testModuleForModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_testHelpers).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _testHelpers[key];
      }
    });
  });
  Object.defineProperty(exports, 'TestModule', {
    enumerable: true,
    get: function () {
      return _testModule.default;
    }
  });
  Object.defineProperty(exports, 'TestModuleForAcceptance', {
    enumerable: true,
    get: function () {
      return _testModuleForAcceptance.default;
    }
  });
  Object.defineProperty(exports, 'TestModuleForComponent', {
    enumerable: true,
    get: function () {
      return _testModuleForComponent.default;
    }
  });
  Object.defineProperty(exports, 'TestModuleForModel', {
    enumerable: true,
    get: function () {
      return _testModuleForModel.default;
    }
  });
});
define('ember-test-helpers/legacy-0-6-x/-legacy-overrides', ['exports', 'ember-test-helpers/has-ember-version'], function (exports, _hasEmberVersion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.preGlimmerSetupIntegrationForComponent = preGlimmerSetupIntegrationForComponent;
  function preGlimmerSetupIntegrationForComponent() {
    var module = this;
    var context = this.context;

    this.actionHooks = {};

    context.dispatcher = this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');
    context.actions = module.actionHooks;

    (this.registry || this.container).register('component:-test-holder', Ember.Component.extend());

    context.render = function (template) {
      // in case `this.render` is called twice, make sure to teardown the first invocation
      module.teardownComponent();

      if (!template) {
        throw new Error('in a component integration test you must pass a template to `render()`');
      }
      if (Ember.isArray(template)) {
        template = template.join('');
      }
      if (typeof template === 'string') {
        template = Ember.Handlebars.compile(template);
      }
      module.component = module.container.lookupFactory('component:-test-holder').create({
        layout: template
      });

      module.component.set('context', context);
      module.component.set('controller', context);

      Ember.run(function () {
        module.component.appendTo('#ember-testing');
      });

      context._element = module.component.element;
    };

    context.$ = function () {
      return module.component.$.apply(module.component, arguments);
    };

    context.set = function (key, value) {
      var ret = Ember.run(function () {
        return Ember.set(context, key, value);
      });

      if ((0, _hasEmberVersion.default)(2, 0)) {
        return ret;
      }
    };

    context.setProperties = function (hash) {
      var ret = Ember.run(function () {
        return Ember.setProperties(context, hash);
      });

      if ((0, _hasEmberVersion.default)(2, 0)) {
        return ret;
      }
    };

    context.get = function (key) {
      return Ember.get(context, key);
    };

    context.getProperties = function () {
      var args = Array.prototype.slice.call(arguments);
      return Ember.getProperties(context, args);
    };

    context.on = function (actionName, handler) {
      module.actionHooks[actionName] = handler;
    };

    context.send = function (actionName) {
      var hook = module.actionHooks[actionName];
      if (!hook) {
        throw new Error('integration testing template received unexpected action ' + actionName);
      }
      hook.apply(module, Array.prototype.slice.call(arguments, 1));
    };

    context.clearRender = function () {
      module.teardownComponent();
    };
  }
});
define('ember-test-helpers/legacy-0-6-x/abstract-test-module', ['exports', 'ember-test-helpers/legacy-0-6-x/ext/rsvp', '@ember/test-helpers/settled', '@ember/test-helpers'], function (exports, _rsvp, _settled, _testHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = class {
    constructor(name, options) {
      this.context = undefined;
      this.name = name;
      this.callbacks = options || {};

      this.initSetupSteps();
      this.initTeardownSteps();
    }

    setup(assert) {
      Ember.testing = true;
      return this.invokeSteps(this.setupSteps, this, assert).then(() => {
        this.contextualizeCallbacks();
        return this.invokeSteps(this.contextualizedSetupSteps, this.context, assert);
      });
    }

    teardown(assert) {
      return this.invokeSteps(this.contextualizedTeardownSteps, this.context, assert).then(() => {
        return this.invokeSteps(this.teardownSteps, this, assert);
      }).then(() => {
        this.cache = null;
        this.cachedCalls = null;
      }).finally(function () {
        Ember.testing = false;
      });
    }

    initSetupSteps() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push(this.callbacks.beforeSetup);
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);
      this.setupSteps.push(this.setupAJAXListeners);
      this.setupSteps.push(this.setupPromiseListeners);

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push(this.callbacks.setup);
        delete this.callbacks.setup;
      }
    }

    invokeSteps(steps, context, assert) {
      steps = steps.slice();

      function nextStep() {
        var step = steps.shift();
        if (step) {
          // guard against exceptions, for example missing components referenced from needs.
          return new Ember.RSVP.Promise(resolve => {
            resolve(step.call(context, assert));
          }).then(nextStep);
        } else {
          return Ember.RSVP.resolve();
        }
      }
      return nextStep();
    }

    contextualizeCallbacks() {}

    initTeardownSteps() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push(this.callbacks.teardown);
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownTestElements);
      this.teardownSteps.push(this.teardownAJAXListeners);
      this.teardownSteps.push(this.teardownPromiseListeners);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push(this.callbacks.afterTeardown);
        delete this.callbacks.afterTeardown;
      }
    }

    setupTestElements() {
      let testElementContainer = document.querySelector('#ember-testing-container');
      if (!testElementContainer) {
        testElementContainer = document.createElement('div');
        testElementContainer.setAttribute('id', 'ember-testing-container');
        document.body.appendChild(testElementContainer);
      }

      let testEl = document.querySelector('#ember-testing');
      if (!testEl) {
        let element = document.createElement('div');
        element.setAttribute('id', 'ember-testing');

        testElementContainer.appendChild(element);
        this.fixtureResetValue = '';
      } else {
        this.fixtureResetValue = testElementContainer.innerHTML;
      }
    }

    setupContext(options) {
      let context = this.getContext();

      Ember.assign(context, {
        dispatcher: null,
        inject: {}
      }, options);

      this.setToString();
      (0, _testHelpers.setContext)(context);
      this.context = context;
    }

    setContext(context) {
      this.context = context;
    }

    getContext() {
      if (this.context) {
        return this.context;
      }

      return this.context = (0, _testHelpers.getContext)() || {};
    }

    setToString() {
      this.context.toString = () => {
        if (this.subjectName) {
          return `test context for: ${this.subjectName}`;
        }

        if (this.name) {
          return `test context for: ${this.name}`;
        }
      };
    }

    setupAJAXListeners() {
      (0, _settled._setupAJAXHooks)();
    }

    teardownAJAXListeners() {
      (0, _settled._teardownAJAXHooks)();
    }

    setupPromiseListeners() {
      (0, _rsvp._setupPromiseListeners)();
    }

    teardownPromiseListeners() {
      (0, _rsvp._teardownPromiseListeners)();
    }

    teardownTestElements() {
      document.getElementById('ember-testing-container').innerHTML = this.fixtureResetValue;

      // Ember 2.0.0 removed Ember.View as public API, so only do this when
      // Ember.View is present
      if (Ember.View && Ember.View.views) {
        Ember.View.views = {};
      }
    }

    teardownContext() {
      var context = this.context;
      this.context = undefined;
      (0, _testHelpers.unsetContext)();

      if (context && context.dispatcher && !context.dispatcher.isDestroyed) {
        Ember.run(function () {
          context.dispatcher.destroy();
        });
      }
    }
  };
});
define('ember-test-helpers/legacy-0-6-x/build-registry', ['exports', 'require'], function (exports, _require2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (resolver) {
    var fallbackRegistry, registry, container;
    var namespace = Ember.Object.create({
      Resolver: {
        create() {
          return resolver;
        }
      }
    });

    function register(name, factory) {
      var thingToRegisterWith = registry || container;

      if (!(container.factoryFor ? container.factoryFor(name) : container.lookupFactory(name))) {
        thingToRegisterWith.register(name, factory);
      }
    }

    if (Ember.Application.buildRegistry) {
      fallbackRegistry = Ember.Application.buildRegistry(namespace);
      fallbackRegistry.register('component-lookup:main', Ember.ComponentLookup);

      registry = new Ember.Registry({
        fallback: fallbackRegistry
      });

      if (Ember.ApplicationInstance && Ember.ApplicationInstance.setupRegistry) {
        Ember.ApplicationInstance.setupRegistry(registry);
      }

      // these properties are set on the fallback registry by `buildRegistry`
      // and on the primary registry within the ApplicationInstance constructor
      // but we need to manually recreate them since ApplicationInstance's are not
      // exposed externally
      registry.normalizeFullName = fallbackRegistry.normalizeFullName;
      registry.makeToString = fallbackRegistry.makeToString;
      registry.describe = fallbackRegistry.describe;

      var owner = Owner.create({
        __registry__: registry,
        __container__: null
      });

      container = registry.container({ owner: owner });
      owner.__container__ = container;

      exposeRegistryMethodsWithoutDeprecations(container);
    } else {
      container = Ember.Application.buildContainer(namespace);
      container.register('component-lookup:main', Ember.ComponentLookup);
    }

    // Ember 1.10.0 did not properly add `view:toplevel` or `view:default`
    // to the registry in Ember.Application.buildRegistry :(
    //
    // Ember 2.0.0 removed Ember.View as public API, so only do this when
    // Ember.View is present
    if (Ember.View) {
      register('view:toplevel', Ember.View.extend());
    }

    // Ember 2.0.0 removed Ember._MetamorphView from the Ember global, so only
    // do this when present
    if (Ember._MetamorphView) {
      register('view:default', Ember._MetamorphView);
    }

    var globalContext = typeof global === 'object' && global || self;
    if (requirejs.entries['ember-data/setup-container']) {
      // ember-data is a proper ember-cli addon since 2.3; if no 'import
      // 'ember-data'' is present somewhere in the tests, there is also no `DS`
      // available on the globalContext and hence ember-data wouldn't be setup
      // correctly for the tests; that's why we import and call setupContainer
      // here; also see https://github.com/emberjs/data/issues/4071 for context
      var setupContainer = (0, _require2.default)('ember-data/setup-container')['default'];
      setupContainer(registry || container);
    } else if (globalContext.DS) {
      var DS = globalContext.DS;
      if (DS._setupContainer) {
        DS._setupContainer(registry || container);
      } else {
        register('transform:boolean', DS.BooleanTransform);
        register('transform:date', DS.DateTransform);
        register('transform:number', DS.NumberTransform);
        register('transform:string', DS.StringTransform);
        register('serializer:-default', DS.JSONSerializer);
        register('serializer:-rest', DS.RESTSerializer);
        register('adapter:-rest', DS.RESTAdapter);
      }
    }

    return {
      registry,
      container,
      owner
    };
  };

  function exposeRegistryMethodsWithoutDeprecations(container) {
    var methods = ['register', 'unregister', 'resolve', 'normalize', 'typeInjection', 'injection', 'factoryInjection', 'factoryTypeInjection', 'has', 'options', 'optionsForType'];

    function exposeRegistryMethod(container, method) {
      if (method in container) {
        container[method] = function () {
          return container._registry[method].apply(container._registry, arguments);
        };
      }
    }

    for (var i = 0, l = methods.length; i < l; i++) {
      exposeRegistryMethod(container, methods[i]);
    }
  }

  var Owner = function () {
    if (Ember._RegistryProxyMixin && Ember._ContainerProxyMixin) {
      return Ember.Object.extend(Ember._RegistryProxyMixin, Ember._ContainerProxyMixin, {
        _emberTestHelpersMockOwner: true
      });
    }

    return Ember.Object.extend({
      _emberTestHelpersMockOwner: true
    });
  }();
});
define('ember-test-helpers/legacy-0-6-x/ext/rsvp', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._setupPromiseListeners = _setupPromiseListeners;
  exports._teardownPromiseListeners = _teardownPromiseListeners;


  let originalAsync;

  /**
    Configures `RSVP` to resolve promises on the run-loop's action queue. This is
    done by Ember internally since Ember 1.7 and it is only needed to
    provide a consistent testing experience for users of Ember < 1.7.
  
    @private
  */
  function _setupPromiseListeners() {
    originalAsync = Ember.RSVP.configure('async');

    Ember.RSVP.configure('async', function (callback, promise) {
      Ember.run.backburner.schedule('actions', () => {
        callback(promise);
      });
    });
  }

  /**
    Resets `RSVP`'s `async` to its prior value.
  
    @private
  */
  function _teardownPromiseListeners() {
    Ember.RSVP.configure('async', originalAsync);
  }
});
define('ember-test-helpers/legacy-0-6-x/test-module-for-acceptance', ['exports', 'ember-test-helpers/legacy-0-6-x/abstract-test-module', '@ember/test-helpers'], function (exports, _abstractTestModule, _testHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = class extends _abstractTestModule.default {
    setupContext() {
      super.setupContext({ application: this.createApplication() });
    }

    teardownContext() {
      Ember.run(() => {
        (0, _testHelpers.getContext)().application.destroy();
      });

      super.teardownContext();
    }

    createApplication() {
      var _callbacks = this.callbacks;
      let Application = _callbacks.Application,
          config = _callbacks.config;

      let application;

      Ember.run(() => {
        application = Application.create(config);
        application.setupForTesting();
        application.injectTestHelpers();
      });

      return application;
    }
  };
});
define('ember-test-helpers/legacy-0-6-x/test-module-for-component', ['exports', 'ember-test-helpers/legacy-0-6-x/test-module', 'ember-test-helpers/has-ember-version', 'ember-test-helpers/legacy-0-6-x/-legacy-overrides'], function (exports, _testModule, _hasEmberVersion, _legacyOverrides) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setupComponentIntegrationTest = setupComponentIntegrationTest;


  let ACTION_KEY;
  if ((0, _hasEmberVersion.default)(2, 0)) {
    ACTION_KEY = 'actions';
  } else {
    ACTION_KEY = '_actions';
  }

  const isPreGlimmer = !(0, _hasEmberVersion.default)(1, 13);

  exports.default = class extends _testModule.default {
    constructor(componentName, description, callbacks) {
      // Allow `description` to be omitted
      if (!callbacks && typeof description === 'object') {
        callbacks = description;
        description = null;
      } else if (!callbacks) {
        callbacks = {};
      }

      let integrationOption = callbacks.integration;
      let hasNeeds = Array.isArray(callbacks.needs);

      super('component:' + componentName, description, callbacks);

      this.componentName = componentName;

      if (hasNeeds || callbacks.unit || integrationOption === false) {
        this.isUnitTest = true;
      } else if (integrationOption) {
        this.isUnitTest = false;
      } else {
        Ember.deprecate('the component:' + componentName + ' test module is implicitly running in unit test mode, ' + 'which will change to integration test mode by default in an upcoming version of ' + 'ember-test-helpers. Add `unit: true` or a `needs:[]` list to explicitly opt in to unit ' + 'test mode.', false, {
          id: 'ember-test-helpers.test-module-for-component.test-type',
          until: '0.6.0'
        });
        this.isUnitTest = true;
      }

      if (!this.isUnitTest && !this.isLegacy) {
        callbacks.integration = true;
      }

      if (this.isUnitTest || this.isLegacy) {
        this.setupSteps.push(this.setupComponentUnitTest);
      } else {
        this.callbacks.subject = function () {
          throw new Error("component integration tests do not support `subject()`. Instead, render the component as if it were HTML: `this.render('<my-component foo=true>');`. For more information, read: http://guides.emberjs.com/current/testing/testing-components/");
        };
        this.setupSteps.push(this.setupComponentIntegrationTest);
        this.teardownSteps.unshift(this.teardownComponent);
      }

      if (Ember.View && Ember.View.views) {
        this.setupSteps.push(this._aliasViewRegistry);
        this.teardownSteps.unshift(this._resetViewRegistry);
      }
    }

    initIntegration(options) {
      this.isLegacy = options.integration === 'legacy';
      this.isIntegration = options.integration !== 'legacy';
    }

    _aliasViewRegistry() {
      this._originalGlobalViewRegistry = Ember.View.views;
      var viewRegistry = this.container.lookup('-view-registry:main');

      if (viewRegistry) {
        Ember.View.views = viewRegistry;
      }
    }

    _resetViewRegistry() {
      Ember.View.views = this._originalGlobalViewRegistry;
    }

    setupComponentUnitTest() {
      var _this = this;
      var resolver = this.resolver;
      var context = this.context;

      var layoutName = 'template:components/' + this.componentName;

      var layout = resolver.resolve(layoutName);

      var thingToRegisterWith = this.registry || this.container;
      if (layout) {
        thingToRegisterWith.register(layoutName, layout);
        thingToRegisterWith.injection(this.subjectName, 'layout', layoutName);
      }
      var eventDispatcher = resolver.resolve('event_dispatcher:main');
      if (eventDispatcher) {
        thingToRegisterWith.register('event_dispatcher:main', eventDispatcher);
      }

      context.dispatcher = this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
      context.dispatcher.setup({}, '#ember-testing');

      context._element = null;

      this.callbacks.render = function () {
        var subject;

        Ember.run(function () {
          subject = context.subject();
          subject.appendTo('#ember-testing');
        });

        context._element = subject.element;

        _this.teardownSteps.unshift(function () {
          Ember.run(function () {
            Ember.tryInvoke(subject, 'destroy');
          });
        });
      };

      this.callbacks.append = function () {
        Ember.deprecate('this.append() is deprecated. Please use this.render() or this.$() instead.', false, {
          id: 'ember-test-helpers.test-module-for-component.append',
          until: '0.6.0'
        });
        return context.$();
      };

      context.$ = function () {
        this.render();
        var subject = this.subject();

        return subject.$.apply(subject, arguments);
      };
    }

    setupComponentIntegrationTest() {
      if (isPreGlimmer) {
        return _legacyOverrides.preGlimmerSetupIntegrationForComponent.apply(this, arguments);
      } else {
        return setupComponentIntegrationTest.apply(this, arguments);
      }
    }

    setupContext() {
      super.setupContext();

      // only setup the injection if we are running against a version
      // of Ember that has `-view-registry:main` (Ember >= 1.12)
      if (this.container.factoryFor ? this.container.factoryFor('-view-registry:main') : this.container.lookupFactory('-view-registry:main')) {
        (this.registry || this.container).injection('component', '_viewRegistry', '-view-registry:main');
      }

      if (!this.isUnitTest && !this.isLegacy) {
        this.context.factory = function () {};
      }
    }

    teardownComponent() {
      var component = this.component;
      if (component) {
        Ember.run(component, 'destroy');
        this.component = null;
      }
    }
  };
  function setupComponentIntegrationTest() {
    var module = this;
    var context = this.context;

    this.actionHooks = context[ACTION_KEY] = {};
    context.dispatcher = this.container.lookup('event_dispatcher:main') || Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');

    var hasRendered = false;
    var OutletView = module.container.factoryFor ? module.container.factoryFor('view:-outlet') : module.container.lookupFactory('view:-outlet');
    var OutletTemplate = module.container.lookup('template:-outlet');
    var toplevelView = module.component = OutletView.create();
    var hasOutletTemplate = !!OutletTemplate;
    var outletState = {
      render: {
        owner: Ember.getOwner ? Ember.getOwner(module.container) : undefined,
        into: undefined,
        outlet: 'main',
        name: 'application',
        controller: module.context,
        ViewClass: undefined,
        template: OutletTemplate
      },

      outlets: {}
    };

    var element = document.getElementById('ember-testing');
    var templateId = 0;

    if (hasOutletTemplate) {
      Ember.run(() => {
        toplevelView.setOutletState(outletState);
      });
    }

    context.render = function (template) {
      if (!template) {
        throw new Error('in a component integration test you must pass a template to `render()`');
      }
      if (Ember.isArray(template)) {
        template = template.join('');
      }
      if (typeof template === 'string') {
        template = Ember.Handlebars.compile(template);
      }

      var templateFullName = 'template:-undertest-' + ++templateId;
      this.registry.register(templateFullName, template);
      var stateToRender = {
        owner: Ember.getOwner ? Ember.getOwner(module.container) : undefined,
        into: undefined,
        outlet: 'main',
        name: 'index',
        controller: module.context,
        ViewClass: undefined,
        template: module.container.lookup(templateFullName),
        outlets: {}
      };

      if (hasOutletTemplate) {
        stateToRender.name = 'index';
        outletState.outlets.main = { render: stateToRender, outlets: {} };
      } else {
        stateToRender.name = 'application';
        outletState = { render: stateToRender, outlets: {} };
      }

      Ember.run(() => {
        toplevelView.setOutletState(outletState);
      });

      if (!hasRendered) {
        Ember.run(module.component, 'appendTo', '#ember-testing');
        hasRendered = true;
      }

      if (EmberENV._APPLICATION_TEMPLATE_WRAPPER !== false) {
        // ensure the element is based on the wrapping toplevel view
        // Ember still wraps the main application template with a
        // normal tagged view
        context._element = element = document.querySelector('#ember-testing > .ember-view');
      } else {
        context._element = element = document.querySelector('#ember-testing');
      }
    };

    context.$ = function (selector) {
      // emulates Ember internal behavor of `this.$` in a component
      // https://github.com/emberjs/ember.js/blob/v2.5.1/packages/ember-views/lib/views/states/has_element.js#L18
      return selector ? Ember.$(selector, element) : Ember.$(element);
    };

    context.set = function (key, value) {
      var ret = Ember.run(function () {
        return Ember.set(context, key, value);
      });

      if ((0, _hasEmberVersion.default)(2, 0)) {
        return ret;
      }
    };

    context.setProperties = function (hash) {
      var ret = Ember.run(function () {
        return Ember.setProperties(context, hash);
      });

      if ((0, _hasEmberVersion.default)(2, 0)) {
        return ret;
      }
    };

    context.get = function (key) {
      return Ember.get(context, key);
    };

    context.getProperties = function () {
      var args = Array.prototype.slice.call(arguments);
      return Ember.getProperties(context, args);
    };

    context.on = function (actionName, handler) {
      module.actionHooks[actionName] = handler;
    };

    context.send = function (actionName) {
      var hook = module.actionHooks[actionName];
      if (!hook) {
        throw new Error('integration testing template received unexpected action ' + actionName);
      }
      hook.apply(module.context, Array.prototype.slice.call(arguments, 1));
    };

    context.clearRender = function () {
      Ember.run(function () {
        toplevelView.setOutletState({
          render: {
            owner: module.container,
            into: undefined,
            outlet: 'main',
            name: 'application',
            controller: module.context,
            ViewClass: undefined,
            template: undefined
          },
          outlets: {}
        });
      });
    };
  }
});
define('ember-test-helpers/legacy-0-6-x/test-module-for-model', ['exports', 'require', 'ember-test-helpers/legacy-0-6-x/test-module'], function (exports, _require2, _testModule) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = class extends _testModule.default {
    constructor(modelName, description, callbacks) {
      super('model:' + modelName, description, callbacks);

      this.modelName = modelName;

      this.setupSteps.push(this.setupModel);
    }

    setupModel() {
      var container = this.container;
      var defaultSubject = this.defaultSubject;
      var callbacks = this.callbacks;
      var modelName = this.modelName;

      var adapterFactory = container.factoryFor ? container.factoryFor('adapter:application') : container.lookupFactory('adapter:application');
      if (!adapterFactory) {
        if (requirejs.entries['ember-data/adapters/json-api']) {
          adapterFactory = (0, _require2.default)('ember-data/adapters/json-api')['default'];
        }

        // when ember-data/adapters/json-api is provided via ember-cli shims
        // using Ember Data 1.x the actual JSONAPIAdapter isn't found, but the
        // above require statement returns a bizzaro object with only a `default`
        // property (circular reference actually)
        if (!adapterFactory || !adapterFactory.create) {
          adapterFactory = DS.JSONAPIAdapter || DS.FixtureAdapter;
        }

        var thingToRegisterWith = this.registry || this.container;
        thingToRegisterWith.register('adapter:application', adapterFactory);
      }

      callbacks.store = function () {
        var container = this.container;
        return container.lookup('service:store') || container.lookup('store:main');
      };

      if (callbacks.subject === defaultSubject) {
        callbacks.subject = function (options) {
          var container = this.container;

          return Ember.run(function () {
            var store = container.lookup('service:store') || container.lookup('store:main');
            return store.createRecord(modelName, options);
          });
        };
      }
    }
  };
});
define('ember-test-helpers/legacy-0-6-x/test-module', ['exports', 'ember-test-helpers/legacy-0-6-x/abstract-test-module', '@ember/test-helpers', 'ember-test-helpers/legacy-0-6-x/build-registry', '@ember/test-helpers/has-ember-version'], function (exports, _abstractTestModule, _testHelpers, _buildRegistry, _hasEmberVersion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = class extends _abstractTestModule.default {
    constructor(subjectName, description, callbacks) {
      // Allow `description` to be omitted, in which case it should
      // default to `subjectName`
      if (!callbacks && typeof description === 'object') {
        callbacks = description;
        description = subjectName;
      }

      super(description || subjectName, callbacks);

      this.subjectName = subjectName;
      this.description = description || subjectName;
      this.resolver = this.callbacks.resolver || (0, _testHelpers.getResolver)();

      if (this.callbacks.integration && this.callbacks.needs) {
        throw new Error("cannot declare 'integration: true' and 'needs' in the same module");
      }

      if (this.callbacks.integration) {
        this.initIntegration(callbacks);
        delete callbacks.integration;
      }

      this.initSubject();
      this.initNeeds();
    }

    initIntegration(options) {
      if (options.integration === 'legacy') {
        throw new Error("`integration: 'legacy'` is only valid for component tests.");
      }
      this.isIntegration = true;
    }

    initSubject() {
      this.callbacks.subject = this.callbacks.subject || this.defaultSubject;
    }

    initNeeds() {
      this.needs = [this.subjectName];
      if (this.callbacks.needs) {
        this.needs = this.needs.concat(this.callbacks.needs);
        delete this.callbacks.needs;
      }
    }

    initSetupSteps() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push(this.callbacks.beforeSetup);
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContainer);
      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);
      this.setupSteps.push(this.setupAJAXListeners);
      this.setupSteps.push(this.setupPromiseListeners);

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push(this.callbacks.setup);
        delete this.callbacks.setup;
      }
    }

    initTeardownSteps() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push(this.callbacks.teardown);
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownSubject);
      this.teardownSteps.push(this.teardownContainer);
      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownTestElements);
      this.teardownSteps.push(this.teardownAJAXListeners);
      this.teardownSteps.push(this.teardownPromiseListeners);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push(this.callbacks.afterTeardown);
        delete this.callbacks.afterTeardown;
      }
    }

    setupContainer() {
      if (this.isIntegration || this.isLegacy) {
        this._setupIntegratedContainer();
      } else {
        this._setupIsolatedContainer();
      }
    }

    setupContext() {
      var subjectName = this.subjectName;
      var container = this.container;

      var factory = function factory() {
        return container.factoryFor ? container.factoryFor(subjectName) : container.lookupFactory(subjectName);
      };

      super.setupContext({
        container: this.container,
        registry: this.registry,
        factory: factory,
        register() {
          var target = this.registry || this.container;
          return target.register.apply(target, arguments);
        }
      });

      if (Ember.setOwner) {
        Ember.setOwner(this.context, this.container.owner);
      }

      this.setupInject();
    }

    setupInject() {
      var module = this;
      var context = this.context;

      if (Ember.inject) {
        var keys = (Object.keys || keys)(Ember.inject);

        keys.forEach(function (typeName) {
          context.inject[typeName] = function (name, opts) {
            var alias = opts && opts.as || name;
            Ember.run(function () {
              Ember.set(context, alias, module.container.lookup(typeName + ':' + name));
            });
          };
        });
      }
    }

    teardownSubject() {
      var subject = this.cache.subject;

      if (subject) {
        Ember.run(function () {
          Ember.tryInvoke(subject, 'destroy');
        });
      }
    }

    teardownContainer() {
      var container = this.container;
      Ember.run(function () {
        container.destroy();
      });
    }

    defaultSubject(options, factory) {
      return factory.create(options);
    }

    // allow arbitrary named factories, like rspec let
    contextualizeCallbacks() {
      var callbacks = this.callbacks;
      var context = this.context;

      this.cache = this.cache || {};
      this.cachedCalls = this.cachedCalls || {};

      var keys = (Object.keys || keys)(callbacks);
      var keysLength = keys.length;

      if (keysLength) {
        var deprecatedContext = this._buildDeprecatedContext(this, context);
        for (var i = 0; i < keysLength; i++) {
          this._contextualizeCallback(context, keys[i], deprecatedContext);
        }
      }
    }

    _contextualizeCallback(context, key, callbackContext) {
      var _this = this;
      var callbacks = this.callbacks;
      var factory = context.factory;

      context[key] = function (options) {
        if (_this.cachedCalls[key]) {
          return _this.cache[key];
        }

        var result = callbacks[key].call(callbackContext, options, factory());

        _this.cache[key] = result;
        _this.cachedCalls[key] = true;

        return result;
      };
    }

    /*
      Builds a version of the passed in context that contains deprecation warnings
      for accessing properties that exist on the module.
    */
    _buildDeprecatedContext(module, context) {
      var deprecatedContext = Object.create(context);

      var keysForDeprecation = Object.keys(module);

      for (var i = 0, l = keysForDeprecation.length; i < l; i++) {
        this._proxyDeprecation(module, deprecatedContext, keysForDeprecation[i]);
      }

      return deprecatedContext;
    }

    /*
      Defines a key on an object to act as a proxy for deprecating the original.
    */
    _proxyDeprecation(obj, proxy, key) {
      if (typeof proxy[key] === 'undefined') {
        Object.defineProperty(proxy, key, {
          get() {
            Ember.deprecate('Accessing the test module property "' + key + '" from a callback is deprecated.', false, {
              id: 'ember-test-helpers.test-module.callback-context',
              until: '0.6.0'
            });
            return obj[key];
          }
        });
      }
    }

    _setupContainer(isolated) {
      var resolver = this.resolver;

      var items = (0, _buildRegistry.default)(!isolated ? resolver : Object.create(resolver, {
        resolve: {
          value() {}
        }
      }));

      this.container = items.container;
      this.registry = items.registry;

      if ((0, _hasEmberVersion.default)(1, 13)) {
        var thingToRegisterWith = this.registry || this.container;
        var router = resolver.resolve('router:main');
        router = router || Ember.Router.extend();
        thingToRegisterWith.register('router:main', router);
      }
    }

    _setupIsolatedContainer() {
      var resolver = this.resolver;
      this._setupContainer(true);

      var thingToRegisterWith = this.registry || this.container;

      for (var i = this.needs.length; i > 0; i--) {
        var fullName = this.needs[i - 1];
        var normalizedFullName = resolver.normalize(fullName);
        thingToRegisterWith.register(fullName, resolver.resolve(normalizedFullName));
      }

      if (!this.registry) {
        this.container.resolver = function () {};
      }
    }

    _setupIntegratedContainer() {
      this._setupContainer();
    }
  };
});
define('ember-test-helpers/wait', ['exports', '@ember/test-helpers/settled', '@ember/test-helpers'], function (exports, _settled, _testHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._teardownPromiseListeners = exports._teardownAJAXHooks = exports._setupPromiseListeners = exports._setupAJAXHooks = undefined;
  Object.defineProperty(exports, '_setupAJAXHooks', {
    enumerable: true,
    get: function () {
      return _settled._setupAJAXHooks;
    }
  });
  Object.defineProperty(exports, '_setupPromiseListeners', {
    enumerable: true,
    get: function () {
      return _settled._setupPromiseListeners;
    }
  });
  Object.defineProperty(exports, '_teardownAJAXHooks', {
    enumerable: true,
    get: function () {
      return _settled._teardownAJAXHooks;
    }
  });
  Object.defineProperty(exports, '_teardownPromiseListeners', {
    enumerable: true,
    get: function () {
      return _settled._teardownPromiseListeners;
    }
  });
  exports.default = wait;


  /**
    Returns a promise that resolves when in a settled state (see `isSettled` for
    a definition of "settled state").
  
    @private
    @deprecated
    @param {Object} [options={}] the options to be used for waiting
    @param {boolean} [options.waitForTimers=true] should timers be waited upon
    @param {boolean} [options.waitForAjax=true] should $.ajax requests be waited upon
    @param {boolean} [options.waitForWaiters=true] should test waiters be waited upon
    @returns {Promise<void>} resolves when settled
  */
  function wait(options = {}) {
    if (typeof options !== 'object' || options === null) {
      options = {};
    }

    return (0, _testHelpers.waitUntil)(() => {
      let waitForTimers = 'waitForTimers' in options ? options.waitForTimers : true;
      let waitForAJAX = 'waitForAJAX' in options ? options.waitForAJAX : true;
      let waitForWaiters = 'waitForWaiters' in options ? options.waitForWaiters : true;

      var _getSettledState = (0, _testHelpers.getSettledState)();

      let hasPendingTimers = _getSettledState.hasPendingTimers,
          hasRunLoop = _getSettledState.hasRunLoop,
          hasPendingRequests = _getSettledState.hasPendingRequests,
          hasPendingWaiters = _getSettledState.hasPendingWaiters;


      if (waitForTimers && (hasPendingTimers || hasRunLoop)) {
        return false;
      }

      if (waitForAJAX && hasPendingRequests) {
        return false;
      }

      if (waitForWaiters && hasPendingWaiters) {
        return false;
      }

      return true;
    }, { timeout: Infinity });
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-content', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipContent;
  function assertTooltipContent(assert, options = {}) {
    const contentString = options.contentString,
          selector = options.selector;


    if (Ember.isNone(contentString)) {
      (true && !(false) && Ember.emberAssert('You must specify a contentString property in the options parameter'));
    }

    const $tooltip = (0, _testSupport.findTooltip)(selector);
    const tooltipContent = $tooltip.text().trim();

    assert.equal(tooltipContent, contentString, `Content of tooltip (${tooltipContent}) matched expected (${contentString})`);
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-not-rendered', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipNotRendered;
  function assertTooltipNotRendered(assert, options = {}) {
    const selector = options.selector;

    const $tooltip = (0, _testSupport.findTooltip)(selector);

    assert.equal($tooltip.length, 0, 'assertTooltipNotRendered(): the ember-tooltip should not be rendered');
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-not-visible', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipNotVisible;
  function assertTooltipNotVisible(assert, options = {}) {
    const selector = options.selector;

    const $tooltip = (0, _testSupport.findTooltip)(selector);
    const ariaHidden = $tooltip.attr('aria-hidden');

    assert.ok(ariaHidden === 'true', `assertTooltipNotVisible(): the ember-tooltip shouldn't be visible:
      aria-hidden = ${ariaHidden}`);
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-rendered', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipRendered;
  function assertTooltipRendered(assert, options = {}) {
    const selector = options.selector;

    const $tooltip = (0, _testSupport.findTooltip)(selector);

    assert.equal($tooltip.length, 1, 'assertTooltipRendered(): the ember-tooltip should be rendered');
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-side', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipSide;
  function assertTooltipSide(assert, options = {}) {
    const side = options.side;


    (0, _testSupport.validateSide)(side);

    var _getPositionDifferenc = (0, _testSupport.getPositionDifferences)(options);

    const expectedGreaterDistance = _getPositionDifferenc.expectedGreaterDistance,
          expectedLesserDistance = _getPositionDifferenc.expectedLesserDistance;


    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    assert.ok(expectedGreaterDistance > expectedLesserDistance, `Tooltip should be on the ${side} side of the target`);
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-spacing', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipSpacing;
  function assertTooltipSpacing(assert, options) {
    const side = options.side,
          spacing = options.spacing;


    (0, _testSupport.validateSide)(side, 'assertTooltipSpacing');

    if (typeof spacing !== 'number') {
      (true && !(false) && Ember.emberAssert(`You must pass spacing as a number like assertTooltipSpacing(assert, { side: 'top', spacing: 10 });`));
    }

    var _getPositionDifferenc = (0, _testSupport.getPositionDifferences)(options);

    const expectedGreaterDistance = _getPositionDifferenc.expectedGreaterDistance,
          expectedLesserDistance = _getPositionDifferenc.expectedLesserDistance;

    const actualSpacing = Math.round(expectedGreaterDistance - expectedLesserDistance);

    /* When the side is top or left, the greater number
    is the target's position. Thus, we check that the
    target's position is greater than the tooltip's
    position. */

    const isSideCorrect = expectedGreaterDistance > expectedLesserDistance;
    const isSpacingCorrect = actualSpacing === spacing;

    assert.ok(isSideCorrect && isSpacingCorrect, `assertTooltipSpacing(): the tooltip should be in the correct position:
        - Tooltip should be on the ${side} side of the target: ${isSideCorrect}.
        - On the ${side} side of the target, the tooltip should be ${spacing}px from the target but it was ${actualSpacing}px`);
  }
});
define('ember-tooltips/test-support/assertions/assert-tooltip-visible', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = assertTooltipVisible;
  function assertTooltipVisible(assert, options = {}) {
    const selector = options.selector;

    const $tooltip = (0, _testSupport.findTooltip)(selector);
    const ariaHidden = $tooltip.attr('aria-hidden');

    assert.ok(ariaHidden === 'false', `assertTooltipVisible(): the ember-tooltip should be visible:
      aria-hidden = ${ariaHidden}`);
  }
});
define('ember-tooltips/test-support/index', ['exports', 'ember-tooltips/test-support/assertions/assert-tooltip-content', 'ember-tooltips/test-support/assertions/assert-tooltip-not-rendered', 'ember-tooltips/test-support/assertions/assert-tooltip-not-visible', 'ember-tooltips/test-support/assertions/assert-tooltip-rendered', 'ember-tooltips/test-support/assertions/assert-tooltip-side', 'ember-tooltips/test-support/assertions/assert-tooltip-spacing', 'ember-tooltips/test-support/assertions/assert-tooltip-visible', 'ember-tooltips/test-support/utils/find-tooltip-target', 'ember-tooltips/test-support/utils/find-tooltip', 'ember-tooltips/test-support/utils/get-opposite-side', 'ember-tooltips/test-support/utils/get-position-differences', 'ember-tooltips/test-support/utils/validate-side'], function (exports, _assertTooltipContent, _assertTooltipNotRendered, _assertTooltipNotVisible, _assertTooltipRendered, _assertTooltipSide, _assertTooltipSpacing, _assertTooltipVisible, _findTooltipTarget, _findTooltip, _getOppositeSide, _getPositionDifferences, _validateSide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'assertTooltipContent', {
    enumerable: true,
    get: function () {
      return _assertTooltipContent.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipNotRendered', {
    enumerable: true,
    get: function () {
      return _assertTooltipNotRendered.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipNotVisible', {
    enumerable: true,
    get: function () {
      return _assertTooltipNotVisible.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipRendered', {
    enumerable: true,
    get: function () {
      return _assertTooltipRendered.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipSide', {
    enumerable: true,
    get: function () {
      return _assertTooltipSide.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipSpacing', {
    enumerable: true,
    get: function () {
      return _assertTooltipSpacing.default;
    }
  });
  Object.defineProperty(exports, 'assertTooltipVisible', {
    enumerable: true,
    get: function () {
      return _assertTooltipVisible.default;
    }
  });
  Object.defineProperty(exports, 'findTooltipTarget', {
    enumerable: true,
    get: function () {
      return _findTooltipTarget.default;
    }
  });
  Object.defineProperty(exports, 'findTooltip', {
    enumerable: true,
    get: function () {
      return _findTooltip.default;
    }
  });
  Object.defineProperty(exports, 'getOppositeSide', {
    enumerable: true,
    get: function () {
      return _getOppositeSide.default;
    }
  });
  Object.defineProperty(exports, 'getPositionDifferences', {
    enumerable: true,
    get: function () {
      return _getPositionDifferences.default;
    }
  });
  Object.defineProperty(exports, 'validateSide', {
    enumerable: true,
    get: function () {
      return _validateSide.default;
    }
  });
});
define('ember-tooltips/test-support/utils/find-tooltip-target', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findTooltipTarget;
  function findTooltipTarget(selector) {

    if (!selector) {
      // In case of passing null, undefined, etc
      selector = '.ember-tooltip-target, .ember-popover-target';
    }

    const $body = Ember.$(document.body);
    const $tooltipTarget = $body.find(selector);

    if ($tooltipTarget.length === 0) {
      throw Error('getTooltipTargetFromBody(): No tooltip targets were found.');
    } else if ($tooltipTarget.length > 1) {
      throw Error('getTooltipTargetFromBody(): Multiple tooltip targets were found. Please provide an {option.targetSelector = ".specific-tooltip-target-class"}');
    }

    return $tooltipTarget;
  }
});
define('ember-tooltips/test-support/utils/find-tooltip', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findTooltip;
  function findTooltip(selector) {

    if (!selector) {
      // In case of passing null, undefined, etc
      selector = '.ember-tooltip, .ember-popover';
    }

    /* We .find() tooltips from $body instead of using ember-test-helper's
    find() method because tooltips and popovers are often rendered as
    children of <body> instead of children of the $targetElement */

    const $body = Ember.$(document.body);
    let $tooltip = $body.find(selector);

    if ($tooltip.length && $tooltip.hasClass('ember-tooltip-base')) {
      /* If what we find is the actually the tooltip component's element, we can
       * look up the intended tooltip by the element referenced by its target
       * element's aria-describedby attribute.
       */
      const $target = $tooltip.parents('.ember-tooltip-target, .ember-popover-target');
      $tooltip = $body.find(`#${$target.attr('aria-describedby')}`);
    }

    if ($tooltip.length && !$tooltip.hasClass('ember-tooltip') && !$tooltip.hasClass('ember-popover')) {
      throw Error(`getTooltipFromBody(): returned an element that is not a tooltip`);
    } else if ($tooltip.length > 1) {
      console.warn(`getTooltipFromBody(): Multiple tooltips were found. Consider passing { selector: '.specific-tooltip-class' }`);
    }

    return $tooltip;
  }
});
define('ember-tooltips/test-support/utils/get-opposite-side', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getOppositeSide;
  function getOppositeSide(side) {
    switch (side) {
      case 'top':
        return 'bottom';
      case 'right':
        return 'left';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
    }
  }
});
define('ember-tooltips/test-support/utils/get-position-differences', ['exports', 'ember-tooltips/test-support'], function (exports, _testSupport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getPositionDifferences;
  exports.getTooltipAndTargetPosition = getTooltipAndTargetPosition;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /**
  @method getPositionDifferences
  @param String side The side the tooltip should be on relative to the target
  
  Given a side, which represents the side of the target that
  the tooltip should render, this method identifies whether
  the tooltip or the target should be further away from the
  top left of the window.
  
  For example, if the side is 'top' then the target should
  be further away from the top left of the window than the
  tooltip because the tooltip should render above the target.
  
  If the side is 'right' then the tooltip should be further
  away from the top left of the window than the target
  because the tooltip should render to the right of the
  target.
  
  This method then returns an object with two numbers:
  
  - `expectedGreaterDistance` (expected greater number given the side)
  - `expectedLesserDistance` (expected lesser number given the side)
  
  These numbers can be used for calculations like determining
  whether a tooltip is on the correct side of the target or
  determining whether a tooltip is the correct distance from
  the target on the given side.
  */

  function getPositionDifferences(options = {}) {
    var _getTooltipAndTargetP = getTooltipAndTargetPosition(options);

    const targetPosition = _getTooltipAndTargetP.targetPosition,
          tooltipPosition = _getTooltipAndTargetP.tooltipPosition;
    const side = options.side;


    const distanceToTarget = targetPosition[side];
    const distanceToTooltip = tooltipPosition[(0, _testSupport.getOppositeSide)(side)];
    const shouldTooltipBeCloserThanTarget = side === 'top' || side === 'left';
    const expectedGreaterDistance = shouldTooltipBeCloserThanTarget ? distanceToTarget : distanceToTooltip;
    const expectedLesserDistance = shouldTooltipBeCloserThanTarget ? distanceToTooltip : distanceToTarget;

    return { expectedGreaterDistance, expectedLesserDistance };
  }

  function getTooltipAndTargetPosition(options = {}) {
    const selector = options.selector,
          targetSelector = options.targetSelector;

    var _findTooltipTarget = (0, _testSupport.findTooltipTarget)(targetSelector),
        _findTooltipTarget2 = _slicedToArray(_findTooltipTarget, 1);

    const target = _findTooltipTarget2[0];

    var _findTooltip = (0, _testSupport.findTooltip)(selector),
        _findTooltip2 = _slicedToArray(_findTooltip, 1);

    const tooltip = _findTooltip2[0];


    const targetPosition = target.getBoundingClientRect();
    const tooltipPosition = tooltip.getBoundingClientRect();

    return {
      targetPosition,
      tooltipPosition
    };
  }
});
define('ember-tooltips/test-support/utils/validate-side', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateSide;
  function validateSide(side, testHelper = 'assertTooltipSide') {
    const sideIsValid = side === 'top' || side === 'right' || side === 'bottom' || side === 'left';

    /* We make sure the side being tested is valid. We
    use Ember.assert because assert is passed in from QUnit */

    if (!sideIsValid) {
      (true && !(false) && Ember.emberAssert(`You must pass side like ${testHelper}(assert, { side: 'top' }); Valid options for side are top, right, bottom, and left.`));
    }
  }
});
define("mdeditor/tests/helpers/create-citation", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createCitation;
  function createCitation(total) {

    const citations = [];

    for (let i = 0; i < total; i++) {

      const citation = Ember.Object.create({
        "title": "title" + i,
        "alternateTitle": ["alternateTitle0", "alternateTitle1"],
        "date": [{
          "date": "2016-10-13",
          "dateType": "dateType"
        }, {
          "date": "2016-10-22",
          "dateType": "dateType"
        }],
        "edition": "edition",
        "responsibleParty": [{
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }],
        "presentationForm": ["presentationForm0", "presentationForm1"],
        "identifier": [{
          "identifier": "identifier" + i,
          "authority": {
            "title": "title"
          }
        }, {
          "identifier": "identifier-" + i
        }],
        "series": {
          "seriesName": "seriesName"
        },
        "otherCitationDetails": ["otherCitationDetails0", "otherCitationDetails1"],
        "onlineResource": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://mdeditor.org"
        }],
        "graphic": [{
          "fileName": "fileName"
        }, {
          "fileName": "fileName"
        }]
      });

      citations.push(citation);
    }

    return citations;
  }
});
define("mdeditor/tests/helpers/create-contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createContact;
  function createContact(total) {

    const contacts = [];

    for (let i = 0; i < total; i++) {

      const contact = Ember.Object.create({

        json: {
          "contactId": i,
          "isOrganization": false,
          "name": "Contact" + i,
          "positionName": null,
          "phoneBook": [],
          "address": {},
          "onlineResource": [],
          "contactInstructions": null
        },
        title: 'Contact' + i,
        icon: 'user',
        contactId: i
      });

      contacts.push(contact);
    }

    return contacts;
  }
});
define("mdeditor/tests/helpers/create-dictionary", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createDictionary;
  function createDictionary(total) {

    const dictionaries = [];

    for (let i = 0; i < total; i++) {

      const dictionary = Ember.Object.create({

        json: {
          "dataDictionary": {
            "citation": {
              "title": "My Dictionary",
              "date": [{
                "date": new Date().toISOString(),
                "dateType": "creation"
              }]
            },
            "description": "Data dictionary.",
            subject: [],
            responsibleParty: {},
            domain: [],
            entity: []
          }
        },
        title: 'My Dictionary' + i,
        icon: 'book'
      });

      dictionaries.push(dictionary);
    }

    return dictionaries;
  }
});
define("mdeditor/tests/helpers/create-identifier", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createIdentifier;
  function createIdentifier(total) {

    const identifiers = [];

    for (let i = 0; i < total; i++) {

      const identifier = Ember.Object.create({
        "identifier": "identifier" + i,
        "namespace": "namespace" + i,
        "version": "version" + i,
        "description": "description" + i,
        "authority": {
          "title": "title" + i
        }
      });

      identifiers.push(identifier);
    }

    return identifiers;
  }
});
define('mdeditor/tests/helpers/create-map-layer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createMapLayer;
  function createMapLayer(total) {

    const layers = {
      type: 'FeatureCollection',
      features: []
    };

    for (let i = 1; i < total + 1; i++) {

      const layer = Ember.Object.create({
        type: 'Feature',
        id: i,
        geometry: {
          type: 'Point',
          coordinates: [-104.99404, 39.75621 + i]
        },
        properties: {
          name: `Feature ` + i
        }
      });

      layers.features.push(layer);
    }

    return layers;
  }
});
define('mdeditor/tests/helpers/create-record', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createRecord;
  function createRecord(total) {

    const records = [];

    for (let i = 0; i < total; i++) {

      const record = Ember.Object.create({

        json: {
          schema: {
            name: 'mdJson',
            version: '2.6.0'
          },
          contact: [],
          "metadata": {
            "metadataInfo": {
              "metadataIdentifier": {
                "identifier": 'r' + i,
                "type": "uuid"
              }
            },
            "resourceInfo": {
              "resourceType": [{
                "type": "project"
              }],
              "citation": {
                "title": "My Record" + i,
                "date": [{
                  "date": new Date().toISOString(),
                  "dateType": "creation"
                }]
              },
              "pointOfrecord": [],
              "abstract": "An abstract.",
              "status": ["completed"],
              "language": ["eng; USA"]
            }
          }
        },
        title: 'My Record' + i,
        icon: 'project'
      });

      records.push(record);
    }

    return records;
  }
});
define("mdeditor/tests/helpers/create-taxonomy", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createTaxonomy;
  function createTaxonomy() {

    const taxonomies = [{
      "taxonomicClassification": [{
        "taxonomicSystemId": "555705",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Fungi",
        "subClassification": [{
          "taxonomicSystemId": "936287",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Dikarya",
          "subClassification": [{
            "taxonomicSystemId": "623881",
            "taxonomicLevel": "Division",
            "taxonomicName": "Basidiomycota",
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true,
        "commonName": ["Kingdom"]
      }, {
        "taxonomicSystemId": "202423",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Animalia",
        "subClassification": [{
          "taxonomicSystemId": "914153",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Radiata",
          "subClassification": [{
            "taxonomicSystemId": "48738",
            "taxonomicLevel": "Phylum",
            "taxonomicName": "Cnidaria",
            "subClassification": [{
              "taxonomicSystemId": "718920",
              "taxonomicLevel": "Subphylum",
              "taxonomicName": "Medusozoa",
              "subClassification": [{
                "taxonomicSystemId": "51483",
                "taxonomicLevel": "Class",
                "taxonomicName": "Scyphozoa",
                "subClassification": [{
                  "taxonomicSystemId": "718923",
                  "taxonomicLevel": "Subclass",
                  "taxonomicName": "Discomedusae",
                  "subClassification": [{
                    "taxonomicSystemId": "51756",
                    "taxonomicLevel": "Order",
                    "taxonomicName": "Rhizostomeae",
                    "subClassification": [{
                      "taxonomicSystemId": "51911",
                      "taxonomicLevel": "Family",
                      "taxonomicName": "Rhizostomatidae",
                      "subClassification": [{
                        "taxonomicSystemId": "51919",
                        "taxonomicLevel": "Genus",
                        "taxonomicName": "Rhopilema",
                        "subClassification": [{
                          "taxonomicSystemId": "51920",
                          "taxonomicLevel": "Species",
                          "taxonomicName": "Rhopilema verrilli",
                          "commonName": ["mushroom jellyfish"],
                          "isITIS": true
                        }],
                        "isITIS": true
                      }],
                      "isITIS": true
                    }],
                    "isITIS": true
                  }],
                  "isITIS": true
                }],
                "isITIS": true
              }],
              "isITIS": true
            }],
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true
      }],
      "taxonomicSystem": [{
        "citation": {
          "title": "Integrated Taxonomic Information System (ITIS)",
          "date": [{
            "date": "2019-02-26",
            "dateType": "transmitted",
            "description": "Taxa imported from ITIS"
          }],
          "presentationForm": ["webService", "webSite"],
          "otherCitationDetails": ["Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov."],
          "onlineResource": [{
            "uri": "https://www.itis.gov",
            "name": "ITIS website",
            "protocol": "HTTPS",
            "function": "information",
            "description": "ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world."
          }],
          "graphic": [{
            "fileName": "itis_logo.jpg",
            "fileType": "JPEG",
            "fileUri": [{
              "uri": "https://itis.gov/Static/images/itis_logo.jpg"
            }]
          }]
        },
        modifications: "modifications"
      }],
      "observer": [{
        "party": [{
          "contactId": "CID003"
        }],
        "role": "pointOfContact"
      }],
      "voucher": [{
        "repository": {
          "party": [{
            "contactId": "CID003"
          }],
          "role": "custodian"
        },
        "specimen": "Specimen"
      }],
      "generalScope": "Scope",
      "identificationProcedure": "Id Procedure",
      "identificationCompleteness": "Id Completeness"
    }, {
      "taxonomicSystem": [{
        "citation": {
          "title": "ITIS - Integrated Taxonomic Information System",
          "alternateTitle": ["Citation for ITIS"],
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        },
        "modifications": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }, {
        "citation": {
          "title": "Some OTHER Taxonomic System",
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        }
      }],
      "generalScope": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationReference": [{
        "title": "citation",
        "identifier": [{
          "identifier": "identifier0",
          "namespace": "namespace0",
          "version": "version0",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title0",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }, {
        "title": "citation1",
        "identifier": [{
          "identifier": "identifier1",
          "namespace": "namespace1",
          "version": "version1",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title1",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }],
      "observer": [{
        "party": [{
          "contactId": "CID006"
        }, {
          "contactId": "CID004"
        }],
        "role": "coPrincipalInvestigator"
      }, {
        "party": [{
          "contactId": "CID001"
        }],
        "role": "editor"
      }],
      "identificationProcedure": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationCompleteness": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "voucher": [{
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "bear claw"
      }, {
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "moose tooth"
      }],
      "taxonomicClassification": [{
        "taxonomicLevel": "taxonomicLevel0",
        "taxonomicName": "taxonomicName",
        "commonName": ["commonName0", "commonName1"],
        "subClassification": [{
          "taxonomicSystemId": "taxonomicSystemId00",
          "taxonomicLevel": "taxonomicLevel00",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel000",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"],
            "subClassification": [{
              "taxonomicSystemId": "taxonomicSystemId0000.1",
              "taxonomicLevel": "taxonomicLevel0000.1",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }, {
              "taxonomicSystemId": "taxonomicSystemId0000.2",
              "taxonomicLevel": "taxonomicLevel0000.2",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }]
          }]
        }, {
          "taxonomicLevel": "taxonomicLevel01",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel010",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"]
          }]
        }]
      }, {
        "taxonomicLevel": "taxonomicLevel0201",
        "taxonomicName": "taxonomicName"
      }]
    }];

    return taxonomies;
  }
});
define('mdeditor/tests/helpers/data-transfer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var c = Ember.Object.extend({
    getData: function getData() {
      return this.get('payload');
    },

    setData: function setData(dataType, payload) {
      this.set("data", { dataType: dataType, payload: payload });
    }
  });

  c.reopenClass({
    makeMockEvent: function makeMockEvent(payload) {
      var transfer = this.create({ payload: payload });
      var res = { dataTransfer: transfer };
      res.preventDefault = function () {
        console.log('prevent default');
      };
      res.stopPropagation = function () {
        console.log('stop propagation');
      };
      return res;
    },

    createDomEvent: function createDomEvent(type) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function setData(type, val) {
          this.data[type] = val;
        },
        getData: function getData(type) {
          return this.data[type];
        }
      };
      return event;
    }
  });

  exports.default = c;
});
define('mdeditor/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    var store = application.__container__.lookup('service:store');

    if (store) {
      Ember.run(function () {
        store.unloadAll();
        application.destroy();
      });
    } else {
      Ember.run(application, 'destroy');
    }
  }
});
define('mdeditor/tests/helpers/drag-drop', ['exports', 'ember-native-dom-helpers', 'mdeditor/tests/helpers/mock-event'], function (exports, _emberNativeDomHelpers, _mockEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.drag = drag;


  async function dragOver(dropSelector, moves) {
    moves = moves || [[{ clientX: 1, clientY: 1 }, dropSelector]];
    return moves.forEach(async ([position, selector]) => {
      let event = new _mockEvent.default(position);
      await (0, _emberNativeDomHelpers.triggerEvent)(selector || dropSelector, 'dragover', event);
    });
  }

  async function drop(dragSelector, dragEvent, options) {
    let dropSelector = options.drop,
        dropEndOptions = options.dropEndOptions,
        dragOverMoves = options.dragOverMoves;


    let dropElement = await (0, _emberNativeDomHelpers.find)(dropSelector);
    if (!dropElement) {
      throw `There are no drop targets by the given selector: '${dropSelector}'`;
    }

    await dragOver(dropSelector, dragOverMoves);

    if (options.beforeDrop) {
      await options.beforeDrop.call();
    }

    let event = new _mockEvent.default().useDataTransferData(dragEvent);
    await (0, _emberNativeDomHelpers.triggerEvent)(dropSelector, 'drop', event);

    return await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragend', dropEndOptions);
  }

  async function drag(dragSelector, options = {}) {
    let dragEvent = new _mockEvent.default(options.dragStartOptions);

    await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'mouseover');

    await (0, _emberNativeDomHelpers.triggerEvent)(dragSelector, 'dragstart', dragEvent);

    if (options.afterDrag) {
      await options.afterDrag.call();
    }

    if (options.drop) {
      await drop(dragSelector, dragEvent, options);
    }
  }
});
define('mdeditor/tests/helpers/ember-cli-file-picker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function createFile(content = ['test'], options = {}) {
    const name = options.name,
          type = options.type,
          lastModifiedDate = options.lastModifiedDate;


    const file = new Blob(content, { type: type ? type : 'text/plain' });
    file.name = name ? name : 'test.txt';

    return file;
  }

  const uploadFileHelper = function uploadFileHelper(content, options) {
    const file = createFile(content, options);

    const event = jQuery.Event('change');
    event.target = {
      files: [file]
    };

    jQuery('.file-picker__input').trigger(event);
  };

  const uploadFile = Ember.Test.registerAsyncHelper('uploadFile', function (app, content, options) {
    uploadFileHelper(content, options);

    return wait();
  });

  exports.uploadFile = uploadFile;
  exports.uploadFileHelper = uploadFileHelper;
});
define('mdeditor/tests/helpers/ember-drag-drop', ['exports', 'mdeditor/tests/helpers/data-transfer'], function (exports, _dataTransfer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.drag = drag;


  function drop($dragHandle, dropCssPath, dragEvent) {
    let $dropTarget = Ember.$(dropCssPath);

    if ($dropTarget.length === 0) {
      throw `There are no drop targets by the given selector: '${dropCssPath}'`;
    }

    Ember.run(() => {
      triggerEvent($dropTarget, 'dragover', _dataTransfer.default.makeMockEvent());
    });

    Ember.run(() => {
      triggerEvent($dropTarget, 'drop', _dataTransfer.default.makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });

    Ember.run(() => {
      triggerEvent($dragHandle, 'dragend', _dataTransfer.default.makeMockEvent());
    });
  }

  function drag(cssPath, options = {}) {
    let dragEvent = _dataTransfer.default.makeMockEvent();
    let $dragHandle = Ember.$(cssPath);

    Ember.run(() => {
      triggerEvent($dragHandle, 'mouseover');
    });

    Ember.run(() => {
      triggerEvent($dragHandle, 'dragstart', dragEvent);
    });

    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });

    andThen(function () {
      if (options.drop) {
        drop($dragHandle, options.drop, dragEvent);
      }
    });
  }
});
define('mdeditor/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function (...args) {
      (true && !(false) && Ember.deprecate(`DEPRECATED \`import { ${name} } from '../../tests/helpers/ember-power-select';\` is deprecated. Please, replace it with \`import { ${name} } from 'ember-power-select/test-support/helpers';\``, false, { until: '1.11.0', id: `ember-power-select-test-support-${name}` }));

      return fn(...args);
    };
  }

  let findContains = deprecateHelper(_helpers.findContains, 'findContains');
  let nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  let nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  let triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  let typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  let clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  let nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  let touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  let selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('mdeditor/tests/helpers/flash-message', ['ember-cli-flash/flash/object'], function (_object) {
  'use strict';

  _object.default.reopen({
    init() {
      return this;
    }
  });
});
define('mdeditor/tests/helpers/mock-event', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createDomEvent = createDomEvent;
  class DataTransfer {
    constructor() {
      this.data = {};
    }

    setData(type, value) {
      this.data[type] = value;
      return this;
    }

    getData(type = "Text") {
      return this.data[type];
    }

    setDragImage() {}
  }

  class MockEvent {
    constructor(options = {}) {
      this.dataTransfer = new DataTransfer();
      this.dataTransfer.setData('Text', options.dataTransferData);
      this.setProperties(options);
    }

    useDataTransferData(otherEvent) {
      this.dataTransfer.setData('Text', otherEvent.dataTransfer.getData());
      return this;
    }

    setProperties(props) {
      for (let prop in props) {
        this[prop] = props[prop];
      }
      return this;
    }

    preventDefault() {}

    stopPropagation() {}
  }

  exports.default = MockEvent;
  function createDomEvent(type) {
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, null);
    event.dataTransfer = new DataTransfer();
    return event;
  }
});
define('mdeditor/tests/helpers/modal-asserts', ['exports', 'qunit'], function (exports, _qunit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = registerAssertHelpers;
  function registerAssertHelpers() {
    const assert = _qunit.default.assert;

    const overlaySelector = '.md-modal-overlay';
    const dialogSelector = '.ember-modal-dialog';

    assert.isPresentOnce = function (selector, message) {
      message = message || `${selector} is present in DOM once`;
      return this.equal(Ember.$(selector).length, 1, message);
    };

    assert.isAbsent = function (selector, message) {
      message = message || `${selector} is absent from DOM`;
      return this.equal(Ember.$(selector).length, 0, message);
    };

    assert.isVisible = function (selector, message) {
      message = message || `${selector} is not visible`;
      return this.ok(Ember.$(selector).is(':visible'), message);
    };

    assert.dialogOpensAndCloses = function (options /*, message*/) {
      //message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
      const dialogContent = options.dialogText ? [dialogSelector, `:contains(${options.dialogText})`].join('') : dialogSelector;
      const self = this;
      return click(options.openSelector, options.context).then(function () {
        if (options.hasOverlay) {
          self.isPresentOnce(overlaySelector);
        }
        self.isPresentOnce(dialogContent);
        if (options.whileOpen) {
          options.whileOpen();
        }
        return click(options.closeSelector, options.context).then(function () {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      });
    };
  }
});
define('mdeditor/tests/helpers/start-app', ['exports', 'mdeditor/app', 'mdeditor/config/environment', 'mdeditor/tests/helpers/modal-asserts', 'mdeditor/tests/helpers/ember-power-select'], function (exports, _app, _environment, _modalAsserts, _emberPowerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;


  (0, _emberPowerSelect.default)();

  function startApp(attrs) {
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(() => {
      let application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      (0, _modalAsserts.default)();
      return application;
    });
  }
});
define('mdeditor/tests/integration/components/feature-form-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | feature form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        id: 'foo',
        properties: {
          name: 'bar',
          description: 'foobar'
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qEcOr5fF",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"feature-form\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/WF8be2Q",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"feature-form\",null,[[\"model\"],[[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/components/feature-group-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  'use strict';

  (0, _qunit.module)('Integration | Component | feature group', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kAuv74Ns",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[27,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[23,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[23,[\"layers\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"geojson-layer\",null,[[\"geoJSON\",\"draw\"],[[22,1,[]],true]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[21,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|Draw a circlemarker|3000 km|2000 mi|Leaflet');
    });
  });
});
define('mdeditor/tests/integration/components/feature-table-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  'use strict';

  (0, _qunit.module)('Integration | Component | feature table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('data', (0, _createMapLayer.default)(2));
      this.set('showForm', function () {
        return false;
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "e+01Nbja",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"feature-table\",null,[[\"data\",\"showForm\"],[[23,[\"data\",\"features\"]],[23,[\"showForm\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s, \t]/g, '\n').trim().replace(/[ +\n]+/g, '|'), 'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50|500');
    });
  });
});
define('mdeditor/tests/integration/components/geojson-layer-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  'use strict';

  (0, _qunit.module)('Integration | Component | geojson layer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "R7IPMiQb",
        "block": "{\"symbols\":[\"l\"],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[27,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[23,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"feature-group\",null,[[\"name\",\"default\"],[\"Extents\",true]],{\"statements\":[[4,\"each\",[[23,[\"layers\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"geojson-layer\",null,[[\"geoJSON\",\"draw\",\"editLayers\"],[[22,1,[]],true,[23,[\"layers\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[21,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|Draw a circlemarker|3000 km|2000 mi|Leaflet');
    });
  });
});
define('mdeditor/tests/integration/components/leaflet-draw-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  'use strict';

  (0, _qunit.module)('Integration | Component | leaflet draw', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "q8w1TiDo",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"leaflet-draw\",null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],{\"statements\":[[4,\"layer-group\",null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],{\"statements\":[[0,\"          \"],[1,[27,\"tile-layer\",null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[23,[\"mapAttribution\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n        \"],[1,[21,\"layer-control\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|−|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|Draw a circlemarker|3000 km|2000 mi|Leaflet');
    });
  });
});
define('mdeditor/tests/integration/components/leaflet-table-row-actions-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | leaflet table row actions', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "NYVTEOJs",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"leaflet-table-row-actions\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.findAll)('button').length, 3);
    });
  });
});
define('mdeditor/tests/integration/components/leaflet-table-row-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | leaflet table row', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "npe/Qb6g",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"leaflet-table-row\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('tr').length, 1);
    });
  });
});
define('mdeditor/tests/integration/components/leaflet-table-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-map-layer'], function (_testHelpers, _qunit, _emberQunit, _createMapLayer) {
  'use strict';

  (0, _qunit.module)('Integration | Component | leaflet table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uYtTnVoE",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"leaflet-table\",null,[[\"layers\",\"resizeDebouncedEventsEnabled\"],[[23,[\"layers\",\"features\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|10|25|50|500');
    });
  });
});
define('mdeditor/tests/integration/components/sb-publisher-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-record'], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  'use strict';

  (0, _qunit.module)('Integration | Component | sb publisher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('config', {
        name: 'ScienceBase',
        route: 'sciencebase',
        description: 'ScienceBase is a collaborative scientific data and information management platform',
        //image: 'https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/content_list_thumbnail/public/thumbnails/image/ScienceBase-DescImage.jpg'
        icon: 'globe',
        rootURI: 'https://api.sciencebase.gov/sbmd-service/',
        jossoURL: 'https://www.sciencebase.gov/catalog/jossoHelper/sessionInfo?includeJossoSessionId=true',
        rootItemURL: 'https://www.sciencebase.gov/catalog/item/',
        defaultParent: '59ef8a34e4b0220bbd98d449',
        settingsComponent: 'sb-settings'
      });

      this.set('settings', Ember.Object.create({
        data: {
          publishOptions: {}
        }
      }));

      this.set('records', (0, _createRecord.default)(3));

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "NXD418Q+",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"sb-publisher\",null,[[\"config\",\"settings\",\"records\"],[[23,[\"config\"]],[23,[\"settings\"]],[23,[\"records\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 4);
    });
  });
});
define('mdeditor/tests/integration/components/sb-settings-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | sb settings', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Jfrq92Ku",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"sb-settings\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('input').length, 3);
    });
  });
});
define('mdeditor/tests/integration/components/sb-tree-label-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | sb tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LmImgfOn",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"sb-tree-label\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-cell').innerText.trim(), 'Data Management Strategy : test Parent Id: None --');
    });
  });
});
define('mdeditor/tests/integration/components/sb-tree-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | sb tree', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [{
        children: [{
          definition: 'Child 1.',
          hideCheck: false,
          icon: 'globe',
          id: '4ebb8fe5-f88f-49a4-9964-1',
          identifier: '4ebb8fe5-f88f-49a4-9964-1',
          isSelected: false,
          label: 'Child 1',
          nodeClass: 'tree-node-rooted',
          notSelectable: false,
          sbDate: null,
          sbId: 'test1',
          sbParentId: null,
          sbParentIdObj: undefined,
          sortOrder: 0,
          type: 'map',
          uuid: '4ebb8fe5-f88f-49a4-9964-1'
        }],
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        isExpanded: true,
        isRoot: true,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xRjcR9vm",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"sb-tree\",null,[[\"model\",\"labelComponent\"],[[23,[\"model\"]],\"sb-tree-label\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Data|Management|Strategy|:|test|?|Child|1|:|test1|Parent|Id:|None|--|?');

      assert.equal((0, _testHelpers.findAll)('.tree-branch')[1].innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Child|1|:|test1|Parent|Id:|None|--|?');
    });
  });
});
define('mdeditor/tests/integration/components/tree-branch-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree branch', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });

      this.set('selected', [{
        identifier: 'bar1'
      }]);

      this.set('path', [{ label: 'fiz', identifier: 1 }, { label: 'faz', identifier: 10 }, { label: 'foz', identifier: 100 }]);

      this.set('select', function () {
        assert.ok(true, 'called select');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "cxZUehGS",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[23,[\"model\"]],[23,[\"select\"]],[23,[\"selected\"]],3,[23,[\"path\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.expect(3);

      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OPZaCxHc",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-branch\",null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[23,[\"model\"]],[23,[\"select\"]],[23,[\"selected\"]],3,[23,[\"path\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('.tree-leaf .toggle-icon');

      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.replace(/[\s\n]+/g, '|'), '|foo1label|foo2label');

      assert.equal((0, _testHelpers.findAll)('.tree-leaf')[1].querySelectorAll('.tree-indent').length, 3, 'proper indentation');
    });
  });
});
define('mdeditor/tests/integration/components/tree-label-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "VnyKZKFx",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"tree-label\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hbQek/T9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-label\",null,[[\"model\"],[[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');
    });
  });
});
define('mdeditor/tests/integration/components/tree-leaf-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree leaf', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });

      this.set('selected', [{
        identifier: 'foo1'
      }]);

      this.set('nodePath', [{ label: 'fiz', identifier: 1 }, { label: 'faz', identifier: 10 }, { label: 'foz', identifier: 100 }]);

      this.set('select', function () {
        assert.ok(true, 'called select');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iGcO+su3",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\",\"nodeDepth\",\"nodePath\"],[[23,[\"model\"]],true,[23,[\"select\"]],[23,[\"selected\"]],3,[23,[\"nodePath\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('.toggle-icon');

      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XlYydst+",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-leaf\",null,[[\"model\",\"inTree\",\"select\",\"selected\"],[[23,[\"model\"]],false,[23,[\"select\"]],[23,[\"selected\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');

      assert.equal((0, _testHelpers.findAll)('.tree-indent').length, 0, 'not in tree');
    });
  });
});
define('mdeditor/tests/integration/components/tree-search-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree search', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'barfoo0',
        children: [],
        label: 'barfoo1label',
        uuid: 'barfoo1'
      }]);

      this.set('selected', [{
        identifier: 'bar1'
      }]);

      this.set('select', function () {
        assert.ok(true, 'called select');
      });

      this.set('searchString', 'foo');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mcld/5H4",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"tree-search\",null,[[\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"],[[23,[\"model\"]],[23,[\"selected\"]],[23,[\"select\"]],[23,[\"searchString\"]],[23,[\"exactMatch\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|3|matches|found.|barfoo1label|foo1label|foo2label', 'search OK');

      this.set('exactMatch', true);

      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo2label', 'exact match');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tE1oyFos",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-search\",null,[[\"model\",\"selected\",\"select\"],[[23,[\"model\"]],[23,[\"selected\"]],[23,[\"select\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|template|block|text', 'block');
    });
  });
});
define('mdeditor/tests/integration/components/tree-view-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | tree view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders and expands', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'bar0',
        children: [],
        label: 'bar1label',
        uuid: 'bar1'
      }]);

      this.set('selected', [{
        identifier: 'bar1'
      }]);

      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      // Handle any actions with this.on('myAction', function(val) { ... });
      assert.expect(7);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ri3jPvBY",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"tree-view\",null,[[\"model\",\"selected\"],[[23,[\"model\"]],[23,[\"selected\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label');

      assert.ok((0, _testHelpers.find)('.tree-leaf').classList.contains('tree-highlight'), 'selected leaf highlighted');

      assert.equal((0, _testHelpers.findAll)('.tree-leaf .expand-icon').length, 1, 'node expand icon rendered');

      await (0, _testHelpers.click)((0, _testHelpers.find)('.expand-icon'));

      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 3, 'node expanded');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IJ/p8Qft",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"tree-view\",null,[[\"model\",\"select\"],[[23,[\"model\"]],[23,[\"select\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label|foo2label');

      await (0, _testHelpers.click)((0, _testHelpers.findAll)('.tree-leaf')[1]);

      assert.equal((0, _testHelpers.findAll)('.tree-leaf.tree-highlight').length, 2, 'node selected');
    });
  });
});
define('mdeditor/tests/integration/helpers/present-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('helper:present', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "CNyNqMhT",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"present\",[[23,[\"inputValue\"]]],null],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'true');
    });
  });
});
define('mdeditor/tests/integration/helpers/word-limit-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('helper:word-limit', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, neque
      nec sagittis maximus, lacus lectus placerat libero, finibus varius arcu enim
      eget ante. Duis.`);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LWbUfjXH",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"word-limit\",[[23,[\"inputValue\"]]],[[\"limit\",\"wordLength\"],[20,10]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.trim(), `Lorem ipsum dolor sit amet, consectetur... adipiscing... elit. Etiam rutrum, neque
      nec sagittis maximus, lacus...`);
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-button-confirm/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md button confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RbKFzYnf",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-button-confirm\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RGc0SS/2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'template block text');
    });

    (0, _qunit.test)('shows and cancels confirm', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RWpJk9mb",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"a\"],[11,\"href\",\"#\"],[9],[0,\"Test\"],[10],[0,\"\\n\"],[4,\"control/md-button-confirm\",null,null,{\"statements\":[[0,\"        Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'renders button');

      await (0, _testHelpers.click)('button');

      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Confirm', 'renders confirm');

      await (0, _testHelpers.triggerEvent)('button', 'blur');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'cancels confirm');
    });

    (0, _qunit.test)('performs confirm action', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "epPIihg9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-confirm\",null,[[\"onConfirm\"],[[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"onConfirm\"],null]]],{\"statements\":[[0,\"        Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button');
      await (0, _testHelpers.click)('button');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-button-modal/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/modal-asserts'], function (_testHelpers, _qunit, _emberQunit, _modalAsserts) {
  'use strict';

  (0, _modalAsserts.default)();

  (0, _qunit.module)('Integration | Component | control/md button modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "NHTtyPFC",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-button-modal\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "F6rZnLP/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-button-modal\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), 'template block text', 'block');
    });

    (0, _qunit.test)('shows modal and performs actions', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // let modalDialogService = this.owner.lookup('service:modal-dialog');
      // modalDialogService.destinationElementId = 'test-div';

      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nSMSfE27",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\"],[11,\"id\",\"test-div\"],[9],[10],[0,\"\\n      \"],[4,\"control/md-button-modal\",null,[[\"message\",\"onConfirm\",\"onCancel\"],[\"Hello\",[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"confirm\"],null],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"cancel\"],null]]],{\"statements\":[[0,\" Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      // click the button
      await (0, _testHelpers.click)('.md-button-modal');

      assert.isPresentOnce('.md-modal-overlay');

      await (0, _testHelpers.clearRender)();

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "v/aKxY/u",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[7,\"div\"],[11,\"id\",\"test-div\"],[9],[10],[0,\"\\n      \"],[4,\"control/md-button-modal\",null,[[\"renderInPlace\",\"message\",\"onConfirm\",\"onCancel\"],[true,\"Hello\",[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"confirm\"],null],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"cancel\"],null]]],{\"statements\":[[0,\" Test\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      // click the button
      await (0, _testHelpers.click)('.md-button-modal');

      await (0, _testHelpers.click)('.md-button-modal');

      assert.isAbsent('.md-modal-overlay');

      // click the modal buttons
      await (0, _testHelpers.click)('.md-button-modal');

      let num = (0, _testHelpers.findAll)('.md-modal-buttons button').length;
      let i = 0;

      while (i < num) {
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.md-modal-buttons button')[i]);
        i++;
      }
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-contact-link/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md contact link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      var store = this.owner.lookup('service:store');

      this.set('contacts', this.owner.lookup('service:contacts'));

      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ej6EDdJk",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-contact-link\",null,[[\"contacts\",\"contactId\"],[[23,[\"contacts\"]],0]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('a').innerText.trim(), 'Contact0', 'renders link');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Ynq5M1Bz",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-contact-link\",null,[[\"contacts\",\"contactId\",\"block\"],[[23,[\"contacts\"]],0,true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'renders as block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-contact-title/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md contact title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var store = this.owner.lookup('service:store');

      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iU9YsrTL",
        "block": "{\"symbols\":[],\"statements\":[[7,\"span\"],[9],[1,[27,\"control/md-contact-title\",null,[[\"contactId\"],[0]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('span').textContent.trim(), 'Contact0');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "p94edw58",
        "block": "{\"symbols\":[\"c\"],\"statements\":[[7,\"div\"],[11,\"class\",\"test1\"],[9],[0,\"\\n\"],[4,\"control/md-contact-title\",null,[[\"contactId\"],[0]],{\"statements\":[[0,\"        template block text \"],[1,[22,1,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.test1').textContent.trim(), 'template block text Contact0');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-crud-buttons/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md crud buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yDDx1O1a",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-crud-buttons\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.triggerEvent)('.md-crud-buttons', 'mouseenter');

      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Copy|Delete|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rkTZxo9o",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-crud-buttons\",null,[[\"doSave\"],[true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|Delete|template|block|text|', 'block, doSave');

      assert.equal((0, _testHelpers.find)('.md-crud-buttons .btn-success').disabled, true, 'save disabled');
    });

    (0, _qunit.test)('should trigger external action', async function (assert) {
      assert.expect(4);

      // test double for the external action
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      //enable save and delet
      this.set('model', {
        hasDirtyHash: true,
        canRevert: true
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1kj3Tkwl",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-crud-buttons\",null,[[\"model\",\"doSave\",\"doCancel\",\"doCopy\",\"doDelete\"],[[23,[\"model\"]],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"doSave\"],null],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"doCancel\"],null],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"doCopy\"],null],[27,\"action\",[[22,0,[]],[23,[\"externalAction\"]],\"doDelete\"],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // click the buttons
      await (0, _testHelpers.click)('.md-crud-buttons .btn-success');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-warning');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      //we have to click delete twice to confirm
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-definition/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md definition', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "aYnSFLZD",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-definition\",null,[[\"title\",\"text\"],[\"foobar\",\"bizbaz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|bizbaz|');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xSivjecv",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-definition\",null,[[\"title\"],[\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|Not|Defined|', 'no text');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "86A/wYHV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-definition\",null,[[\"title\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|foobar|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-errors/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md errors', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('errors', [{
        dataPath: '/foo/biz',
        message: 'message1'
      }, {
        message: 'message2'
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xNlicEFz",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-errors\",null,[[\"errors\"],[[23,[\"errors\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|0|message1|/foo/biz|1|message2|');

      assert.ok((0, _testHelpers.findAll)('.md-error-list .label')[1].classList.contains('label-danger'), 'class applied');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "W9NYbq8Q",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-errors\",null,[[\"errors\"],[[23,[\"errors\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|0|message1|/foo/biz|1|message2|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-fiscalyear/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support', 'ember-power-select/test-support/helpers', 'moment'], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers, _moment) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md fiscalyear', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "I/oETfRj",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-fiscalyear\",null,[[\"context\"],[[22,0,[]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g, '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year');
    });

    (0, _qunit.test)('select a year', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('end', null);
      this.set('start', null);
      this.set('settings', {
        data: {
          fiscalStartMonth: 1
        }
      });
      // Handle any actions with this.on('myAction', function(val) { ... });
      var year = new Date().getFullYear();

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "obZ/XGKt",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-datetime\",null,[[\"class\",\"valuePath\",\"model\",\"label\",\"placeholder\"],[\"start\",\"start\",[22,0,[]],\"Start Date\",\"Enter start dateTime\"]]],false],[0,\"\\n      \"],[1,[27,\"input/md-datetime\",null,[[\"class\",\"valuePath\",\"model\",\"label\"],[\"end\",\"end\",[22,0,[]],\"End Date\"]]],false],[0,\"\\n      \"],[1,[27,\"control/md-fiscalyear\",null,[[\"context\",\"settings\"],[[22,0,[]],[23,[\"settings\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _helpers.clickTrigger)('.md-fiscalyear');
      await (0, _testSupport.selectChoose)('.md-fiscalyear', year);

      assert.equal(this.end, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth + 10).endOf('month').toISOString(), 'end set');
      assert.equal(this.start, (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth - 1).startOf('month').toISOString(), 'start set');

      this.set('settings.data.fiscalStartMonth', null);

      assert.equal((0, _testHelpers.find)('.md-fiscalyear .ember-power-select-trigger').getAttribute('aria-disabled'), 'true', 'disabled if fiscalStartMonth empty');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-import-csv/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md import csv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('progress', 0);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "35q4QYPp",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-import-csv\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-import-picker').textContent.trim(), 'Click or Drop a CSV here.');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "PZHZiXSL",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-import-csv\",null,[[\"isProcessing\",\"progress\"],[true,[23,[\"progress\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|0%|Complete|', 'renders progressbar');

      this.set('progress', 57);

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|57%|Complete|', 'updates progressbar');
    });

    (0, _qunit.skip)('upload csv', async function (assert) {
      assert.ok();
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-itis/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md itis', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('taxonomy', {
        taxonomicClassification: []
      });
      this.set('taxa', [Ember.Object.create({
        "kingdom": "Animalia",
        "name": "Calotes rouxii",
        "rank": "Species",
        "tsn": "1055525",
        "taxonomy": [[{
          "rank": "Kingdom",
          "value": "Animalia",
          "order": 0,
          "tsn": "202423"
        }, {
          "rank": "Subkingdom",
          "value": "Bilateria",
          "order": 1,
          "tsn": "914154"
        }, {
          "rank": "Genus",
          "value": "Calotes",
          "order": 12,
          "tsn": "209043"
        }, {
          "rank": "Species",
          "value": "Calotes rouxii",
          "order": 13,
          "tsn": "1055525",
          "common": ["Roux's Forest Lizard", "Forest Blood Sucker"]
        }]],
        "common": [{
          "name": "Roux's Forest Lizard",
          "language": "English"
        }, {
          "name": "Forest Blood Sucker",
          "language": "English"
        }],
        "status": "valid"
      })]);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "FUgW4QW/",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-itis\",null,[[\"taxonomy\"],[[23,[\"taxonomy\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-itis').textContent.replace(/[ \n]+/g, '|').trim(), '|Search|Value|Kingdom|(optional)|Select|a|kingdom.|Search|');

      // await fillIn('.md-input-input input.ember-text-field', 'shark');
      // await click('button[type=submit]');
      // await settled();

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "3cfcjjrX",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-itis\",null,[[\"taxonomy\",\"searchResult\",\"found\"],[[23,[\"taxonomy\"]],[23,[\"taxa\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('.md-itis-taxalist'), 'renders search result');

      await (0, _testHelpers.click)('.md-itis-taxalist .list-group-item .btn-success');

      assert.ok((0, _testHelpers.find)('.md-itis-selectedlist .list-group-item'), 'renders selected item');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-json-button/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md json button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nGgtrkgT",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-json-button\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'Preview JSON');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hEVqRZ6K",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-json-button\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'template block text');
    });

    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "y7xU+/bL",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-json-button\",null,[[\"json\",\"preview\"],[[23,[\"json\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button.btn');

      assert.equal(document.querySelector('.md-jsmodal-container').textContent.trim(), '{"foo": "bar"}');
    });

    (0, _qunit.test)('render json slider', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mbbVketU",
        "block": "{\"symbols\":[\"slider\"],\"statements\":[[1,[27,\"control/md-json-button\",null,[[\"json\",\"title\"],[[23,[\"json\"]],\"foobar\"]]],false],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"slider\"],[9],[0,\"\\n\"],[4,\"from-elsewhere\",null,[[\"name\"],[\"md-slider-json\"]],{\"statements\":[[0,\"          \"],[7,\"h3\"],[11,\"class\",\"text-info\"],[9],[1,[22,1,[\"title\"]],false],[10],[0,\"\\n          \"],[7,\"hr\"],[9],[10],[0,\"\\n          \"],[1,[27,\"component\",[[22,1,[\"body\"]]],null],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button.btn');

      assert.equal((0, _testHelpers.find)('.slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Viewing|JSON|for:|foobar|{"foo":|"bar"}|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-json-viewer/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md json viewer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XfXDLDVo",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-json-viewer\",null,[[\"json\"],[[23,[\"json\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(Ember.$('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
    });

    (0, _qunit.test)('render json viewer', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jCk9FnYL",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-json-viewer\",null,[[\"json\",\"modal\"],[[23,[\"json\"]],false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-json-viewer').textContent.trim(), '{"foo": "bar"}');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-modal/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "MQZvyBts",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-modal\",null,[[\"isShowing\"],[true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok(document.querySelector('.md-modal-container'));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "f3JPqgHv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-modal\",null,[[\"isShowing\"],[true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(document.querySelector('.md-modal-container').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md record table/buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: true
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yVjzSW3K",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-record-table/buttons\",null,[[\"record\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|');
      assert.dom('.md-status-icon .btn-danger').isVisible();
      assert.dom('.md-status-icon .btn-warning').isVisible();
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EZ0t44CS",
        "block": "{\"symbols\":[],\"statements\":[[4,\"control/md-record-table/buttons\",null,null,{\"statements\":[[0,\"          template block text\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/custom/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      this.set('rec', {
        biz: 'baz'
      });

      this.set('column', {
        buttonConfig: {
          title: 'foobar',
          style: 'warning',
          action: function action(rec) {
            assert.equal(rec.biz, 'baz', 'action fired');
          }
        }
      });

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mk0eLNg4",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-record-table/buttons/custom\",null,[[\"column\",\"record\"],[[23,[\"column\"]],[23,[\"rec\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button.btn-warning').textContent.trim(), 'foobar');

      (0, _testHelpers.click)('button.btn-warning');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/filter/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      var items = ['foo', 'bar'];
      // Set any properties with this.set('myProperty', 'value');
      this.set('selectedItems', items);
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('deleteSelected', function (selectedItems) {
        assert.equal(selectedItems, items, 'fires action');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "UZAsqQfc",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-record-table/buttons/filter\",null,[[\"deleteSelected\",\"selectedItems\"],[[23,[\"deleteSelected\"]],[23,[\"selectedItems\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button.btn-danger').textContent.trim(), 'Delete Selected');

      (0, _testHelpers.doubleClick)('button.btn-danger');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/buttons/show/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md record table/buttons/show', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lbVpebuM",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-record-table/buttons/show\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.btn-info').textContent.trim(), 'Show');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-record-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md record table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);

      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kzsxYrAd",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-record-table\",null,[[\"dataColumns\",\"data\"],[[23,[\"columns\"]],[23,[\"data\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|10|25|50|500|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ItmwVm3E",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-record-table\",null,[[\"dataColumns\",\"data\"],[[23,[\"columns\"]],[23,[\"data\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-repo-link/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/config/environment'], function (_testHelpers, _qunit, _emberQunit, _environment) {
  'use strict';

  var _config$APP = _environment.default.APP;
  const repository = _config$APP.repository,
        version = _config$APP.version;


  (0, _qunit.module)('Integration | Component | control/md repo link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9aHX8qs+",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/md-repo-link\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('a').textContent.trim(), version);
      assert.equal((0, _testHelpers.find)('a').getAttribute('href'), `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`, 'link ok');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "J/VwpCTq",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-repo-link\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-scroll-spy/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md scroll spy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('setScrollTo', function (target) {
        assert.equal(target, 'foo', 'calls action');
      });

      // this.set('clickLink', function(){
      // });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2rPHQXHy",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"data-spy\",\"Foo\"],[11,\"id\",\"foo1\"],[9],[0,\"Foo\"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"data-spy\",\"Bar\"],[11,\"id\",\"bar1\"],[9],[0,\"Bar\"],[10],[0,\"\\n      \"],[1,[27,\"control/md-scroll-spy\",null,[[\"setScrollTo\"],[[23,[\"setScrollTo\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Foo|Bar|');

      await (0, _testHelpers.click)('ul a');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1EhcJXCy",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-scroll-spy\",null,[[\"setScrollTo\"],[[23,[\"setScrollTo\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('ul').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-select-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md select table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);

      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

      this.set('select', function (selected) {
        assert.equal(selected[0].title, 'foo', 'calls action');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LnTjV67N",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-select-table\",null,[[\"columns\",\"data\",\"select\"],[[23,[\"columns\"]],[23,[\"data\"]],[23,[\"select\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|10|25|50|500|');

      (0, _testHelpers.click)('.md-select-table tbody tr');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LI4m+FX9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-select-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|template|block|text|', 'block ok');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-spinner/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md spinner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "GPusi2of",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-spinner\",null,[[\"text\",\"size\"],[\"foobar\",\"5\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'foobar');
      assert.ok((0, _testHelpers.find)('.md-spinner .md-spinner-text').classList.contains('size-5'), 'adds class');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "NJovIzPH",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-spinner\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-spotlight/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md spotlight', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var spotlight = this.owner.lookup('service:spotlight');
      var scope = {
        foo: 'bar'
      };
      var close = function close() {
        assert.equal(this.foo, 'bar', 'calls close action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/4E9iJ2w",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"id\",\"foo\"],[9],[0,\"foobar\"],[10],[0,\"\\n      \"],[1,[21,\"control/md-spotlight\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      spotlight.setTarget('foo', close, scope);

      assert.ok(document.querySelector('.md-modal-overlay'), 'render overlay');
      assert.equal((0, _testHelpers.find)('#foo').textContent.trim(), 'foobar', 'render target');
      assert.ok((0, _testHelpers.find)('#foo').classList.contains('md-spotlight-target'), 'adds class');

      spotlight.setTarget('foo');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/md-status/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/md status', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: false
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "I2ckXAbt",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/md-status\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('.md-status-icon .md-error').isVisible();

      this.set('model.hasDirtyHash', false);
      this.set('model.hasSchemaErrors', true);

      assert.dom('.md-status-icon .md-error').isNotVisible();
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ZkYxinz+",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/md-status\",null,[[\"model\"],[[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.dom('.md-status-icon .md-warning').isVisible();
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-citation/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+TW5LBRK",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-citation\",null,[[\"text\"],[\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|foobar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "dySsOj+Q",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-citation\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-extent/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar extent', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ay34BRP0",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/subbar-extent\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.btn-success').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Geographic|Extent');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tfS9gvEp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-extent\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Geographic|Extent|template|block|text|');
    });

    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(1);

      var FakeRoute = Ember.Route.extend({
        actions: {
          addExtent: function addExtent() {
            assert.ok(true, 'calls addExtent action');
          }
        }
      });

      this.set('context', function () {
        return new FakeRoute();
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bq8WoVwy",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-extent\",null,[[\"context\"],[[23,[\"context\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-importcsv/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar importcsv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      var Target = Ember.Route.extend({
        actions: {
          doImport() {
            assert.ok(true, 'calls target action');
          }
        }
      });

      this.set('foo', new Target());

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qb0nzluq",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-importcsv\",null,[[\"class\",\"actionContext\"],[\"importcsv\",[23,[\"foo\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|');

      (0, _testHelpers.click)('.importcsv .btn-info');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mNt7Tqm/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-importcsv\",null,[[\"class\"],[\"importcsv\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-keywords/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar keywords', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bSo3Zbkv",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/subbar-keywords\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Thesaurus');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KG3R6F8F",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-keywords\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Thesaurus|template|block|text|');
    });

    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(1);

      var FakeRoute = Ember.Route.extend({
        actions: {
          addThesaurus: function addThesaurus() {
            assert.ok(true, 'calls addThesaurus action');
            return false;
          }
        }
      });

      this.set('context', function () {
        return new FakeRoute();
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sg86LZnR",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-keywords\",null,[[\"context\"],[[23,[\"context\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-link/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('test', function () {
        assert.ok(true, 'called action');
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "y1ZuKbD8",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-link\",null,[[\"text\",\"click\"],[\"foo\",[23,[\"test\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'foo');

      await (0, _testHelpers.click)('button');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hTH9OrlZ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-link\",null,[[\"text\",\"click\"],[\"foo\",[23,[\"test\"]]]],{\"statements\":[[0,\"        \"],[7,\"section\"],[9],[0,\"template block text\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-spatial/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ay34BRP0",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/subbar-extent\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Geographic|Extent');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EXzIM6UU",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-extent\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|Geographic|Extent|template|block|text|');
    });

    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(1);

      var FakeRoute = Ember.Route.extend({
        actions: {
          addExtent: function addExtent() {
            assert.ok(true, 'calls addExtent action');
          }
        }
      });

      this.set('context', function () {
        return new FakeRoute();
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bq8WoVwy",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-extent\",null,[[\"context\"],[[23,[\"context\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button');
    });
  });
});
define('mdeditor/tests/integration/pods/components/control/subbar-thesaurus/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | control/subbar thesaurus', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "QNQ+BwwN",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"control/subbar-thesaurus\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('button').textContent.replace(/[ \n]+/g, '|'), '|Back|to|List');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "p3xMoKv9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"control/subbar-thesaurus\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|'), '|Back|to|List|template|block|text|', 'block');
    });

    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(1);

      var FakeRoute = Ember.Route.extend({
        actions: {
          toList: function toList() {
            assert.ok(true, 'calls toList action');
          }
        }
      });

      this.set('context', function () {
        return new FakeRoute();
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bX+wuGGd",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"control/subbar-thesaurus\",null,[[\"context\"],[[23,[\"context\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('button');
    });
  });
});
define('mdeditor/tests/integration/pods/components/ember-tooltip/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers', 'ember-tooltips/test-support'], function (_qunit, _emberQunit, _testHelpers, _testSupport) {
  'use strict';

  (0, _qunit.module)('Integration | Component | ember-tooltip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YNHMyPoP",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"ember-tooltip\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "6nHpSXF3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"ember-tooltip\",null,[[\"isShown\"],[\"true\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      (0, _testSupport.assertTooltipContent)(assert, {
        contentString: 'template block text'
      });
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-boolean/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md boolean', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XhgZmwh+",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[false,\"Foo Bar\",\"Baz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "X0tl7Ihh",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-boolean\",null,[[\"value\",\"text\",\"label\"],[true,\"Foo Bar\",\"Baz\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');

      assert.ok((0, _testHelpers.find)('input').checked);
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support/helpers'], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  'use strict';

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };

  const codelist = Ember.Service.extend({
    foobar: foobar
  });

  (0, _qunit.module)('Integration | Component | input/md codelist multi', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    hooks.beforeEach(function () {
      this.actions = {};
      this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    });

    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('fooVal', ['foo', 'bar']);

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yPmFbAp2",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-codelist-multi\",null,[[\"mdCodeName\",\"value\"],[\"foobar\",[23,[\"fooVal\"]]]],{\"statements\":[[0,\"        \"],[7,\"p\"],[9],[0,\"template block text\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'renders block with array value');
    });

    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);

      //this.set('fooVal', ['foo']);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "7C0wBB9z",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[false,[23,[\"value\"]],\"foobar\",[27,\"action\",[[22,0,[]],\"update\",[23,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|bar|foo|', 'value updated');
    });

    (0, _qunit.test)('create option', async function (assert) {

      assert.expect(3);

      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yxQJR7Tg",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-codelist-multi\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[23,[\"value\"]],\"foobar\",[27,\"action\",[[22,0,[]],\"update\",[23,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|foo|×|biz|bar|foo|biz|', 'value updated');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-codelist/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support', 'ember-power-select/test-support/helpers'], function (_testHelpers, _qunit, _emberQunit, _testSupport, _helpers) {
  'use strict';

  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };

  const codelist = Ember.Service.extend({
    foobar: foobar
  });

  (0, _qunit.module)('Integration | Component | input/md-codelist', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    hooks.beforeEach(function () {
      this.actions = {};
      this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    });

    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "UMuOCUJp",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\"],[\"foo\",\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|×|');
    });

    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);

      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rEggpVkd",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-codelist\",null,[[\"value\",\"mdCodeName\",\"change\"],[[23,[\"value\"]],\"foobar\",[27,\"action\",[[22,0,[]],\"update\",[23,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testSupport.selectChoose)('.md-select', 'bar');

      // return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|bar|×|', 'value updated');
      // });
    });

    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(2);

      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.get('value'), 'submitted value is passed to external action');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nol4iyKd",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-codelist\",null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[23,[\"value\"]],\"foobar\",[27,\"action\",[[22,0,[]],\"update\",[23,[\"value\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      //return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|×|', 'value updated');
      //});
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-date-range/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md date range', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('start', new Date('2016-01-01'));
      this.set('end', new Date('2017-01-01'));
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "dAei0dBc",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-date-range\",null,[[\"class\",\"startDateTime\",\"endDateTime\"],[\"testme\",[23,[\"start\"]],[23,[\"end\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|');

      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[0].value).toISOString(), this.start.toISOString(), 'set start');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[1].value).toISOString(), this.end.toISOString(), 'set end');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "R0A1B3D6",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-date-range\",null,[[\"class\",\"startDateTime\",\"endDateTime\"],[\"testme\",[23,[\"start\"]],[23,[\"end\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-datetime/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md datetime', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('renders and binds', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      this.set('mydate', '1999-12-31T23:59:59.999+0900');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "BNWnJlnO",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-datetime\",null,[[\"date\",\"format\",\"placeholder\"],[[23,[\"mydate\"]],\"YYYY-MM-DD\",\"Enter date\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('input').value, '1999-12-31', 'binding works');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input-confirm/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md input confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RwuJZiH5",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"input/md-input-confirm\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Edit');
      assert.ok((0, _testHelpers.find)('.md-input input[disabled]'), 'input disabled');

      await (0, _testHelpers.click)('.btn-warning');

      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Confirm', 'confirm ok');

      await (0, _testHelpers.click)('.btn-warning');

      assert.ok((0, _testHelpers.find)('.md-input input:not([disabled])'), 'input enabled');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "eL0jDQk3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input-confirm\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-input').textContent.replace(/[ \n]+/g, '|').trim(), '|Edit|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-input/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "u5HcnuF8",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-input\",null,[[\"label\",\"value\",\"maxlength\",\"required\",\"inputClass\",\"placeholder\"],[\"Foo\",\"Bar\",100,\"true\",\"test\",\"Enter FooBar\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('label').textContent, 'Foo', 'labeled OK');

      const input = this.$('input');
      const props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
      assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Xqqv1psP",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-input\",null,null,{\"statements\":[[0,\"        \"],[7,\"p\"],[11,\"class\",\"help-block\"],[9],[0,\"help text\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.help-block').textContent, 'help text', 'block renders');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-markdown-area/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md markdown area', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qvbmXWkT",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-markdown-area\",null,[[\"required\"],[true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0');
      assert.ok((0, _testHelpers.find)('.md-markdown-editor .length.md-error'), 'required ok');

      this.set('markdownValue', 'This is foobar.');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nBtzRBsE",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-markdown-area\",null,[[\"value\",\"maxlength\",\"required\"],[[23,[\"markdownValue\"]],10,false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-markdown-editor .length.md-error').textContent, 'length: 15', 'maxlength ok');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Ltu4oWFp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-markdown-area\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0templateblocktext', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-month/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md month', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WQ5rEqqW",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-month\",null,[[\"date\"],[\"10\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('input').value, 'October');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "atqTYxDI",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-month\",null,[[\"class\",\"date\"],[\"testme\",\"10\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '', 'no block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-contact/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md select contact', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      var contacts = (0, _createContact.default)(3);
      var cs = this.owner.lookup('service:contacts');

      cs.set('contacts', contacts);

      this.set('contacts', contacts);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uAqL+6dx",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-select-contact\",null,[[\"value\"],[1]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.replace(/[ \n]+/g, '|').trim(), '|Contact1|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "B/VACfLw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-contact\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.trim(), 'Select one option');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-contacts/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact', 'ember-power-select/test-support'], function (_testHelpers, _qunit, _emberQunit, _createContact, _testSupport) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md select contacts', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RrPrpNfp",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"input/md-select-contacts\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('.md-select-contact'));
    });

    (0, _qunit.test)('contact selected', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      //make sure there's at least one record visible
      //var store = this.owner.lookup('service:store');
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');

      cs.set('contacts', contacts);
      //store.createRecord('contact', contacts[0]);
      //store.createRecord('contact', contacts[1]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RrPrpNfp",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"input/md-select-contacts\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact0');
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact1');

      assert.equal((0, _testHelpers.find)('.md-select-contact').innerText.replace(/[\s\n]+/g, '|').trim(), '×|Contact0|×|Contact1', 'select multiple contacts');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-profile/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support/helpers'], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md select profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // test dummy for the external profile action
      this.set('updateProfile', () => {});

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xagWIKsv",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\",\"class\"],[\"full\",[23,[\"updateProfile\"]],\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|'), '|Profile|full|?|');
    });

    (0, _qunit.test)('should trigger external action on change', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('updateProfile', actual => {
        assert.equal(actual, 'basic', 'submitted value is passed to external action');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rI8uOOUU",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-select-profile\",null,[[\"value\",\"updateProfile\"],[[23,[\"full\"]],[27,\"action\",[[22,0,[]],[23,[\"updateProfile\"]]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select-thesaurus/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support/helpers'], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md select thesaurus', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nWIsGH4D",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"input/md-select-thesaurus\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ThFIe8O9",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-select-thesaurus\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
    });

    (0, _qunit.test)('should trigger external action on change', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('selectThesaurus', id => {
        assert.equal(id.citation.identifier[0].identifier, '1eb0ea0a-312c-4d74-8d42-6f1ad758f999', 'submitted value is passed to external action');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WSr3a0wz",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-select-thesaurus\",null,[[\"selectThesaurus\"],[[23,[\"selectThesaurus\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-select/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'ember-power-select/test-support/helpers'], function (_testHelpers, _qunit, _emberQunit, _helpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md select', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      })]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0NT7RPM5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\",\"tooltipPath\",\"placeholder\"],[1,[23,[\"objArray\"]],\"id\",\"name\",\"tip\",\"Select one\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
    });

    (0, _qunit.test)('set value', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), Ember.Object.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);

      this.set('value', 1);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "FBvu+vvV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-select\",null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\"],[[23,[\"value\"]],[23,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');

      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');

      assert.equal(this.get('value'), 2, 'value is updated');
    });

    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [Ember.Object.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), Ember.Object.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);

      this.set('value', 1);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1IDUbuyl",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-select\",null,[[\"value\",\"create\",\"objectArray\",\"valuePath\",\"namePath\"],[[23,[\"value\"]],true,[23,[\"objArray\"]],\"id\",\"name\"]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');

      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');

      assert.equal(this.get('value'), 'biz', 'value is updated');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-textarea/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md textarea', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Dl07+8VD",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[1,[27,\"input/md-textarea\",null,[[\"value\",\"label\",\"placeholder\",\"rows\"],[\"Foo bar baz\",\"FooBar\",\"placeholder\",10]]],false],[0,\"\\n      \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('textarea').value, 'Foo bar baz');

      assert.equal((0, _testHelpers.find)('label').textContent, 'FooBar', 'label renders');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OrJLXcDT",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-textarea\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text', 'block renders');
    });
  });
});
define('mdeditor/tests/integration/pods/components/input/md-toggle/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | input/md toggle', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "X27gandU",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"input/md-toggle\",null,[[\"value\",\"onToggle\"],[[22,0,[\"value\"]],[27,\"action\",[[22,0,[]],[27,\"mut\",[[22,0,[\"value\"]]],null]],null]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.x-toggle-component').textContent.replace(/[ \n]+/g, '|').trim(), '|Off|On|');

      await (0, _testHelpers.click)('.x-toggle-btn');

      assert.ok((0, _testHelpers.find)('.toggle-on'), 'toggle on');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "AxyKbbVw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"input/md-toggle\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-card/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | layout/md card', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ODsd3huS",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"layout/md-card\",null,[[\"title\"],[\"foo\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'foo');

      // await render(hbs`{{layout/md-card title="foo" collasped="true"}}`);

      // assert.equal(find('.md-card').textContent.trim(), 'foo');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "M+5H0+hm",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-card\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'template block text', 'block');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "pGMgp3ey",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-card\",null,[[\"title\",\"collapsed\",\"collapsible\"],[\"foo\",true,true]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').innerText.trim(), 'foo', 'collapsed');
      assert.ok((0, _testHelpers.find)('.md-card .card-block:not(.in)'), 'class ok');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-footer/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | layout/md footer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('settings', {
        data: {
          autoSave: true
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "zWjcMwg1",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-footer\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|Off|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IJkRisAH",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-footer\",null,[[\"settings\"],[[23,[\"settings\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|On|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md nav main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "2gxFzFux",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-nav-main\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|Settings');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vTbqEBbv",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-main\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|template|block|text|Settings');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  //Stub profile service
  const profiles = {
    full: {
      profile: null,
      secondaryNav: [{
        title: 'Foo',
        target: 'record.show.edit.index'

      }, {
        title: 'Bar',
        target: 'record.show.edit.metadata'

      }]
    },
    basic: {
      profile: null,
      secondaryNav: [{
        title: 'FooBar',
        target: 'record.show.edit.index'

      }, {
        title: 'BarFoo',
        target: 'record.show.edit.metadata'

      }]
    }
  };

  const profileStub = Ember.Service.extend({
    getActiveProfile() {
      const active = this.get('active');
      const profile = active && typeof active === 'string' ? active : 'full';
      const profiles = this.get('profiles');

      return profiles[profile];
    },
    profiles: profiles
  });

  (0, _qunit.module)('Integration | Component | md nav secondary', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    hooks.beforeEach(function () {
      this.owner.register('service:profile', profileStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "profileService" within each test
      this.profileService = this.owner.lookup('service:profile');
    });

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JcLETuLV",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-nav-secondary\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';

      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "oQC+3+mm",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-nav-secondary\",null,null,{\"statements\":[[0,\"        \"],[7,\"li\"],[9],[0,\"template block text\"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';

      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|template|block|text|');
    });

    (0, _qunit.test)('render after setting profile', async function (assert) {
      assert.expect(1);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('profileService.active', 'basic');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JcLETuLV",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-nav-secondary\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';

      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact', 'mdeditor/tests/helpers/create-record', 'mdeditor/tests/helpers/create-dictionary'], function (_testHelpers, _qunit, _emberQunit, _createContact, _createRecord, _createDictionary) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md nav sidebar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);

      const contacts = (0, _createContact.default)(2);
      contacts.meta = {
        type: 'contact',
        list: 'contacts',
        title: 'Contacts'
      };

      const records = (0, _createRecord.default)(2);
      records.meta = {
        type: 'record',
        list: 'records',
        title: 'Records'
      };

      const dicts = (0, _createDictionary.default)(2);
      dicts.meta = {
        type: 'dictionary',
        list: 'dictionaries',
        title: 'Dictionaries'
      };

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [records, contacts, dicts]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jYhemvXw",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"layout/md-nav-sidebar\",null,[[\"items\",\"version\"],[[23,[\"model\"]],\"test\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.sidebar-nav').textContent.replace(/[ \n]+/g, '|'), '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
    });

    (0, _qunit.test)('toggle help action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ope9jQTL",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-nav-sidebar\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.md-btn-help');
      assert.ok((0, _testHelpers.find)('.md-sidebar-wrapper').classList.contains('help'));
    });

    (0, _qunit.test)('toggle sidebar action', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "U0sdyuoh",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"id\",\"md-wrapper\"],[9],[1,[21,\"layout/md-nav-sidebar\"],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.click)('.sidebar-brand-link');
      assert.ok((0, _testHelpers.find)('#md-wrapper').classList.contains('toggled'));
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-slider/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | layout/md slider', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "MipDI7x+",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"layout/md-slider\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-slider').textContent.trim(), 'Close');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "SCOuMgVN",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-slider\",null,[[\"fromName\"],[\"slider\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"      \"],[1,[27,\"to-elsewhere\",null,[[\"named\",\"send\"],[\"slider\",[27,\"hash\",null,[[\"title\",\"body\"],[\"biz\",[27,\"component\",[\"layout/md-card\"],[[\"title\"],[\"foobar\"]]]]]]]]],false],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Close|biz|foobar|template|block|text|');
      assert.ok((0, _testHelpers.find)('.md-card'), 'rendered slider content');
    });
  });
});
define('mdeditor/tests/integration/pods/components/layout/md-wrap/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | layout/md wrap', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KMHF3iJy",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"layout/md-wrap\",null,[[\"class\"],[\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fJoC4aqA",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"layout/md-wrap\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-help/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md help', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9J9RmSFW",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"md-help\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('*').textContent.indexOf('Lorem ipsum' > 0));

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mDCBuwo3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-help\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('*').textContent.trim().indexOf('template block text' > 0));
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md models table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);

      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4pjC89/T",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"md-models-table\",null,[[\"data\",\"columns\"],[[23,[\"data\"]],[23,[\"columns\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|10|25|50|500|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "HFawtjvi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/components/check-all/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md models table/components/check all', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.data = {
        themeInstance: {
          'select-all-rows': 'select',
          'deselect-all-rows': 'deselect'
        },
        selectedItems: {
          length: 0
        },
        length: 1
      };

      this.toggleAllSelection = function () {
        assert.ok(true, 'toggleAll action');

        this.set('selectedItems.length', 1);
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8nV3BIyp",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"md-models-table/components/check-all\",null,[[\"data\",\"selectedItems\",\"themeInstance\",\"toggleAllSelection\"],[[23,[\"data\"]],[23,[\"data\",\"selectedItems\"]],[23,[\"data\",\"themeInstance\"]],[23,[\"toggleAllSelection\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('span').classList.contains('deselect'), 'add class');

      await (0, _testHelpers.click)('span');

      // await render(hbs`{{md-models-table/components/check-all data=data themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

      assert.ok((0, _testHelpers.find)('span').classList.contains('select'), 'deselect');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xwLd9HXZ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check-all\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-models-table/components/check/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md models table/components/check', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.themeInstance = {
        'select-row': 'select',
        'deselect-row': 'deselect'
      };

      this.set('isSelected', false);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "T8N8/Hyk",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"md-models-table/components/check\",null,[[\"isSelected\",\"themeInstance\"],[[23,[\"isSelected\"]],[23,[\"themeInstance\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.ok((0, _testHelpers.find)('span').classList.contains('deselect'), 'add class');

      this.set('isSelected', true);

      assert.ok((0, _testHelpers.find)('span').classList.contains('select'), 'update class');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vzjRZrkF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-models-table/components/check\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-title/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WJNb6P52",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"md-title\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "i7KE7rEm",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-title\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/md-translate/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-record'], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  'use strict';

  (0, _qunit.module)('Integration | Component | md translate', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createRecord.default)(1)[0];
      this.isLoading = false;
      this.messages = null;
      this.result = null;
      this.writer = {
        type: 'json'
      };

      window.saveAs = function (blob, title) {
        assert.ok(title, 'save title');
        assert.equal(blob.constructor.name, 'Blob', 'save blob');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "LvKB8aly",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"md-translate\",null,[[\"model\",\"isLoading\",\"messages\",\"result\",\"errorLevel\",\"isJson\",\"writeObj\"],[[23,[\"model\"]],[23,[\"isLoading\"]],[23,[\"messages\"]],[23,[\"result\"]],2,true,[23,[\"writer\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|');

      this.set('isLoading', true);

      assert.ok((0, _testHelpers.find)('.md-spinner'), 'loading');

      this.set('messages', [["WARNING", " FGDC writer", " citation originator role is missing", " CONTEXT is lineage method"], ["WARNING", " FGDC writer", " citation publication date is missing", " CONTEXT is lineage method"]]);

      assert.equal((0, _testHelpers.find)('.md-translator-error').textContent.replace(/[\s\n]+/g, '|').trim(), '|Translation|Warning|Warning|ocurred|during|translation.|WARNING|citation|originator|role|is|missing|FGDC|writer|context|is|lineage|method|WARNING|citation|publication|date|is|missing|FGDC|writer|context|is|lineage|method|', 'messages');

      this.set('result', '{"foo":"bar"}');

      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning').textContent.replace(/[\s\n]+/g, '|').trim(), '|Result|Preview|JSON|Format|Save|Result|', 'result');

      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning textarea').value, '{"foo":"bar"}', 'textarea value set');

      (0, _testHelpers.click)('.md-translator-preview.warning .btn-success');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1qFgffnw",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"md-translate\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-address/md-address-block/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md address/md address block', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('address', {
        "addressType": ["mailing", "physical"],
        "description": "description",
        "deliveryPoint": ["deliveryPoint0", "deliveryPoint1"],
        "city": "city",
        "administrativeArea": "administrativeArea",
        "postalCode": "postalCode",
        "country": "country"
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ez0kLafK",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-address/md-address-block\",null,[[\"item\"],[[23,[\"address\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "dcHcR3qd",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-address/md-address-block\",null,[[\"item\"],[[23,[\"address\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-allocation/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md allocation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('allocation', {
        'amount': 9.9,
        'currency': 'currency',
        'sourceId': 'source',
        'recipientId': 'recipient',
        'matching': true,
        'comment': 'comment',
        sourceAllocationId: 'sourceAllocationId'
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KlpezfmS",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-allocation\",null,[[\"profilePath\",\"model\"],[\"test\",[23,[\"allocation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|Other|Contacts|0|Add|#|Role|Contacts|Add|Other|Contacts|Matching|Matching|funds|or|in-kind|services|Description|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "BMckC9sq",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-allocation\",null,[[\"profilePath\",\"model\",\"class\"],[\"test\",[23,[\"allocation\"]],\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|Other|Contacts|0|Add|#|Role|Contacts|Add|Other|Contacts|Matching|Matching|funds|or|in-kind|services|Description|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|template|block|text|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-array-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        biz: 'biz1',
        baz: 'baz1'
      }, {
        biz: 'biz2',
        baz: 'baz2'
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "bA/Vf+ll",
        "block": "{\"symbols\":[\"f\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-array-table\",null,[[\"columns\",\"value\",\"title\",\"data-spy\"],[\"biz,baz\",[23,[\"data\"]],\"FooBar\",\"FooBar\"]],{\"statements\":[[0,\"        \"],[7,\"td\"],[9],[0,\"\\n          \"],[1,[22,1,[\"item\",\"biz\"]],false],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"td\"],[9],[0,\"\\n          \"],[1,[22,1,[\"item\",\"baz\"]],false],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"      \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|biz1|baz1|Delete|1|biz2|baz2|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tXffYcZL",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-array-table\",null,[[\"columns\",\"value\",\"title\"],[\"biz,baz\",[23,[\"data\"]],\"FooBar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|template|block|text|Delete|1|template|block|text|Delete|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-associated/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md associated', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T04:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xSMDRxYD",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-associated\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|Metadata|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "L0IsDrdQ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|publication|?|×|Delete|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|Metadata|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|Identifier|1|Add|OK|#|Identifier|Namespace|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Edit|Delete|OK|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-associated/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md associated/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T04:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rLmOYmUN",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-associated/preview\",null,[[\"item\",\"class\"],[[23,[\"model\"]],\"testme\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|29th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sNyJawLO",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-associated/preview\",null,[[\"item\",\"class\"],[[23,[\"model\"]],\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|September|29th|2015|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-attribute/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "allowNull": false,
        "attributeReference": {
          "title": "Producer defined"
        },
        "valueRange": [{
          "minRangeValue": "0",
          "maxRangeValue": "0.XXXXXX"
        }],
        "commonName": "20XX_pyes.tif",
        "codeName": "20XX_pyes.tif",
        "definition": "The predicted annual probability that beach mice presence is Yes in 20XX.",
        "mustBeUnique": true,
        "units": "annual probability that beach mice presence is Yes",
        "isCaseSensitive": false,
        "minValue": "0",
        "maxValue": "0.XXXXXX",
        "dataType": "float"
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "TOlAkYET",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-attribute\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|float|?|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|0|Add|Alias|Add|Alias|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nci0GXXs",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-attribute\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Data|Type|float|?|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|0|Add|Alias|Add|Alias|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-attribute/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md attribute/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "allowNull": false,
        "attributeReference": {
          "title": "Producer defined"
        },
        "valueRange": [{
          "minRangeValue": "0",
          "maxRangeValue": "0.XXXXXX"
        }],
        "commonName": "20XX_pyes.tif",
        "codeName": "20XX_pyes.tif",
        "definition": "The predicted annual probability that beach mice presence is Yes in 20XX.",
        "mustBeUnique": true,
        "units": "annual probability that beach mice presence is Yes",
        "isCaseSensitive": false,
        "minValue": "0",
        "maxValue": "0.XXXXXX",
        "dataType": "float"
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1i4Uea4E",
        "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"testme\"],[9],[1,[27,\"object/md-attribute/preview\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|float|?|×|');
      assert.equal((0, _testHelpers.findAll)('.testme input').length, 3, 'render inputs');
      assert.ok((0, _testHelpers.find)('.testme .md-select'), 'render select');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-bbox/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md bbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "westLongitude": -87.52179241764053,
        "eastLongitude": -85.30119385960293,
        "southLatitude": 29.640690610830635,
        "northLatitude": 30.42485959910817
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sbvOx++R",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-bbox\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|');

      var inputs = (0, _testHelpers.findAll)('input');
      assert.equal(inputs[0].value, this.model.northLatitude, 'north');
      assert.equal(inputs[1].value, this.model.eastLongitude, 'east');
      assert.equal(inputs[2].value, this.model.southLatitude, 'south');
      assert.equal(inputs[3].value, this.model.westLongitude, 'west');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "D/PdYyoV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-bbox\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md citation array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(3));

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "WzA5D9Qy",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"object/md-citation-array\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "BthDjgu6",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-citation-array\",null,[[\"model\"],[[23,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|3|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|2|title2|More...|Delete|OK|', 'renders rows');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8LMMQcD1",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "7vDrdTEt",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-citation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "eOi54CPK",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/preview/body/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md citation/preview/body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "SOqK9Xz/",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-citation/preview/body\",null,[[\"citation\"],[[23,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sUcR8ZyH",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview/body\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-citation/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md citation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);

      this.set('editCitation', function (v) {
        assert.ok(v, 'Called external action');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "0r+adoXx",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-citation/preview\",null,[[\"editCitation\",\"citation\"],[[23,[\"editCitation\"]],[23,[\"citation\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|Edit|Citation|');

      await (0, _testHelpers.click)('.btn-success');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ejmbIe0S",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-citation/preview\",null,[[\"editCitation\"],[[23,[\"editCitation\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|Edit|Citation|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-constraint/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md constraint', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {});

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1Rkmj7Vf",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-constraint\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|Use|Limitations|0|Add|Add|Use|Limitations|Legal|Access|Constraints|Use|Constraints|Other|Constraints|0|Add|Other|Constraint|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Graphic|or|Logo|0|Add|OK|Add|Graphic|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5xG/qi02",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-constraint\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), "|Constraint|Type|The|type|of|constraint.|Use|Limitations|0|Add|Add|Use|Limitations|Legal|Access|Constraints|Use|Constraints|Other|Constraints|0|Add|Other|Constraint|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Handling|Description|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Graphic|or|Logo|0|Add|OK|Add|Graphic|OK|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-date-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md date array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IMRTjB1D",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-date-array\",null,[[\"value\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|0|Add|#|Date|Date|Type|Description|Add|Date|');

      this.set('model', [{
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      }]);

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|Delete|', 'item');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "TZRnO3XP",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-date-array\",null,[[\"value\"],[[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Date|Date|Type|Description|0|dateType|×|template|block|text|Delete|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-date/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md date', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mS3zKLDY",
        "block": "{\"symbols\":[],\"statements\":[[7,\"table\"],[9],[7,\"tr\"],[9],[1,[27,\"object/md-date\",null,[[\"model\"],[[23,[\"model\"]]]]],false],[10],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|");

      this.set('model', {
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      });

      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|dateType|×|");

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "we8wBTra",
        "block": "{\"symbols\":[],\"statements\":[[7,\"table\"],[9],[7,\"tr\"],[9],[0,\"\\n\"],[4,\"object/md-date\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Choose|date|type|template|block|text|");
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distribution/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-record'], function (_testHelpers, _qunit, _emberQunit, _createRecord) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md distribution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('record', (0, _createRecord.default)(1)[0]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "269abYv9",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-distribution\",null,[[\"model\",\"profilePath\"],[[23,[\"record\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|distribution|sections|found.|Add|Distribution|Section|');

      this.record.json.metadata.resourceDistribution.push({
        "description": "description",
        "liabilityStatement": "liabilityStatement",
        "distributor": [{
          "contact": {
            "role": "role",
            "roleExtent": [{
              "temporalExtent": [{
                "timePeriod": {
                  "startDateTime": "2016-10-24T11:10:15.2-10:00"
                }
              }]
            }],
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }, {
          "contact": {
            "role": "role",
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }]
      });

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yjHKdiku",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distribution\",null,[[\"model\",\"profilePath\"],[[23,[\"record\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|Section|#0|Edit|Distributors|Delete|Section|Distributors|role|(|)|role|(|)|Description|', 'block and list');
    });

    (0, _qunit.skip)('call actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distributor/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md distributor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+VFT3Lvz",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-distributor\",null,[[\"model\",\"profilePath\"],[[23,[\"distributor\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|Transfer|Size|(MB)|Distribution|units|Online|Option|0|Add|OK|#|Name|Uri|Add|Resource|OK|Offline|Option|0|Add|OK|#|Title|Add|Offline|Option|OK|Distribution|Formats|0|Add|#|Format|Name|Version|Compression|Method|URL|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rfNVApJZ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor\",null,[[\"model\",\"profilePath\"],[[23,[\"distributor\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|Transfer|Size|(MB)|Distribution|units|Online|Option|0|Add|OK|#|Name|Uri|Add|Resource|OK|Offline|Option|0|Add|OK|#|Title|Add|Offline|Option|OK|Distribution|Formats|0|Add|#|Format|Name|Version|Compression|Method|URL|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|Order|Process|Fees|Planned|Availability|Ordering|Instructions|Turnaround|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-distributor/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md distributor/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "kB2L9Few",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"object/md-distributor/preview\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Jrf07kbD",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-distributor/preview\",null,[[\"class\"],[\"testme\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-documentation/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md documentation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lh1lGz48",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-documentation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"doc\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "xX31bCqi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"doc\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Date|Date|Type|Description|0|dateType|×|Delete|1|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Edit|Delete|OK|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|OK|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-documentation/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md documentation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "catHAT3z",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-documentation/preview\",null,[[\"item\"],[[23,[\"doc\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.text-muted').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1LVbYvKn",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-documentation/preview\",null,[[\"class\",\"item\"],[\"testme\",[23,[\"doc\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|October|13th|2016|(dateType)|October|22nd|2016|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|)|role|(|)|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domain/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md domain', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('domain', {
        "domainId": "domainId0",
        "commonName": "commonName",
        "codeName": "codeName",
        "description": "description",
        "domainItem": [{
          "name": "name0",
          "value": "value0",
          "definition": "definition0"
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rnP/nBHT",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-domain\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"domain\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Name|Value|Definition|0|More...|Delete|OK|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "jopVpDw3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domain\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"domain\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Domain|Items|1|Add|OK|#|Name|Value|Definition|0|More...|Delete|OK|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domainitem/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md domainitem', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "CN2V0RzJ",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-domainitem\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"item\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yJqI8XBF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Name|Value|Definition|Item|Reference|Content|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-domainitem/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md domainitem/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "HwjaAqyU",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-domainitem/preview\",null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[23,[\"item\"]],\"table\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('input').length, 3);
      assert.equal((0, _testHelpers.findAll)('input')[0].value, 'name0', 'name');
      assert.equal((0, _testHelpers.findAll)('input')[1].value, 'value0', 'value');
      assert.equal((0, _testHelpers.findAll)('input')[2].value, 'definition0', 'definition');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Q55DPmm1",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-domainitem/preview\",null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[23,[\"item\"]],\"table\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[\s\n]+/g, '|').trim(), '|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-entity/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-dictionary'], function (_testHelpers, _qunit, _emberQunit, _createDictionary) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md entity', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('dictionary', (0, _createDictionary.default)(1)[0]);
      this.set('entity', {
        "entityId": "entityId",
        "commonName": "commonName",
        "codeName": "codeName",
        "alias": ["alias0", "alias1"],
        "definition": "definition",
        "primaryKeyAttributeCodeName": ["primaryKeyAttributeCodeName0", "primaryKeyAttributeCodeName1"],
        "index": [],
        "attribute": [],
        "foreignKey": []
      }, {
        "entityId": "",
        "commonName": "",
        "codeName": "",
        "alias": [""],
        "definition": "",
        "entityReference": [{
          "title": "entityReference"
        }],
        "primaryKeyAttributeCodeName": [""],
        "index": [{
          "codeName": "",
          "allowDuplicates": false,
          "attributeCodeName": [""]
        }],
        "attribute": [{
          "commonName": "",
          "codeName": "",
          "alias": [""],
          "definition": "",
          "dataType": "",
          "allowNull": true,
          "units": "",
          "domainId": "",
          "minValue": "",
          "maxValue": ""
        }],
        "foreignKey": [{
          "localAttributeCodeName": [""],
          "referencedEntityCodeName": "",
          "referencedAttributeCodeName": [""]
        }],
        "fieldSeparatorCharacter": ",",
        "numberOfHeaderLines": 9,
        "quoteCharacter": "\""
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "M++r2pc7",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-entity\",null,[[\"dictionary\",\"profilePath\",\"model\"],[[23,[\"dictionary\"]],\"foobar\",[23,[\"entity\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0|×|primaryKeyAttributeCodeName1|Foreign|Key|Attributes|0|Add|Foreign|Key|Attributes|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|Add|Foreign|Key|Attributes|Entity|Indices|0|Add|#|Name|Attributes|Duplicates?|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "MIuWCMAS",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-entity\",null,[[\"dictionary\",\"profilePath\",\"model\"],[[27,\"hash\",null,null],\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Common|Name|Aliases|0|Add|Alias|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|Foreign|Key|Attributes|0|Add|Foreign|Key|Attributes|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|Add|Foreign|Key|Attributes|Entity|Indices|0|Add|#|Name|Attributes|Duplicates?|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-funding/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md funding', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency"
        }]
      }, {
        "timePeriod": {
          "endDateTime": "2016-12-31"
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EnVAsS+X",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-funding\",null,[[\"model\"],[[23,[\"funding\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Allocation|1|Add|OK|#|Amount|Currency|Matching|0|9.9|currency|Not|Defined|Edit|Delete|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|");

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "pg3cWmTB",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-funding\",null,[[\"model\"],[[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Allocation|0|Add|OK|#|Amount|Currency|Matching|Add|Allocation|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-funding/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md funding/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency"
        }],
        "timePeriod": {
          "endDateTime": "2016-12-31"
        }
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "L1eA1Ue8",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"object/md-funding/preview\",null,[[\"item\"],[[23,[\"funding\"]]]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Allocation|#|Start|Date:|Not|defined|End|Date:|12-31-2016|Amount|Currency|Source|Recipient|Match?|9.9|currency|--|--|--|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "wVNRvCOH",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-funding/preview\",null,[[\"item\"],[[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Allocation|#|Start|Date:|Not|defined|End|Date:|Not|defined|Amount|Currency|Source|Recipient|Match?|No|allocations|found.|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-graphic-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md graphic array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('graphic', [{
        "fileName": "fileName",
        "fileDescription": "fileDescription",
        "fileType": "fileType",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }, {
        "fileName": "fileName1",
        "fileDescription": "fileDescription1",
        "fileType": "fileType1",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rk+U+LK4",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-graphic-array\",null,[[\"model\"],[[23,[\"graphic\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|OK|');
      assert.ok((0, _testHelpers.find)('.md-logo-preview').complete, 'loaded image');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tDghbOzo",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-graphic-array\",null,[[\"model\"],[[23,[\"graphic\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md identifier array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);

      // Set any properties with this.set('myProperty', 'value');
      this.set('id', [{
        "identifier": "identifier",
        "authority": {
          "title": "title"
        }
      }, {
        "identifier": "identifier1",
        "authority": {
          "title": "title1"
        }
      }]);

      this.set('edit', function (id) {
        assert.ok(id, 'called edit');
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "4FqF5HOF",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-identifier-array\",null,[[\"model\",\"editItem\"],[[23,[\"id\"]],[23,[\"edit\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier|Not|Defined|Not|Defined|More...|Delete|1|identifier1|Not|Defined|Not|Defined|More...|Delete|OK|');

      await (0, _testHelpers.click)('.btn-info');

      assert.equal(this.id.length, 3, 'add item');

      await (0, _testHelpers.doubleClick)('.btn-danger');

      assert.equal(this.id.length, 2), 'delete item';

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "eH2JXx2I",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-identifier-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier-object-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-identifier'], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md identifier object table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(2));

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5JyxNwZP",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-identifier-object-table\",null,[[\"model\"],[[23,[\"id\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|1|identifier1|namespace1|Edit|Delete|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "e+6pAH/T",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier-object-table\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-identifier/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-identifier'], function (_testHelpers, _qunit, _emberQunit, _createIdentifier) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md identifier', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(1)[0]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+LtExbm8",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-identifier\",null,[[\"model\",\"profilePath\"],[[23,[\"id\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), 'Identifier|Namespace|namespace0|×|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|');

      assert.equal((0, _testHelpers.find)('input').value, 'identifier0', 'assign value');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mWXveBKX",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-identifier\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim(), "Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-keyword-citation/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-citation'], function (_testHelpers, _qunit, _emberQunit, _createCitation) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md keyword citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('keyword', {
        keywordType: 'theme',
        thesaurus: (0, _createCitation.default)(1)[0]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "A5fYHTki",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-keyword-citation\",null,[[\"model\"],[[23,[\"keyword\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Title|Date|Date|Type|Choose|date|type|Type|theme|?|Edition|URL|');

      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');

      assert.equal(input, "title0|2016-10-13|edition|http://adiwg.org", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qGb0jwev",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-keyword-citation\",null,[[\"model\"],[[27,\"hash\",null,[[\"thesaurus\"],[[27,\"hash\",null,null]]]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Title|Date|Date|Type|Choose|date|type|Type|Choose|keyword|type|Edition|URL|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-keyword-list/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md keyword list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        'keyword': [{
          'identifier': 'id1',
          'keyword': 'foo1',
          'path': ['foo1']
        }, {
          'identifier': 'id2',
          'keyword': 'bar1',
          'path': ['foo1', 'bar1']
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "n9qz6j5D",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-keyword-list\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n]+/g, '|').trim(), '|Delete|foo1|Delete|bar1|');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "pTiBYqsO",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-keyword-list\",null,[[\"model\",\"readOnly\"],[[23,[\"model\"]],false]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('tr').length, 4, 'Check number of rows.');
      assert.equal((0, _testHelpers.findAll)('input').length, 4, 'Check number of input el.');
      assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
      assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|Toggle|Thesaurus|', 'readOnly = false.');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OWhHG9kH",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-keyword-list\",null,null,{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-lineage/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md lineage', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qxK0NO6P",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"object/md-lineage\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"lineage\"]]]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|Source|2|Add|OK|#|Description|0|More...|Delete|1|More...|Delete|OK|Citation|2|Add|OK|#|Title|0|title|More...|Delete|1|title|More...|Delete|OK|Scope|scopeCode|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "h3Z1/+t9",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-lineage\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|No|Process|Step|found.|Add|Process|Step|No|Source|found.|Add|Source|No|Citation|found.|Add|Citation|Scope|Select|type|of|resource.|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-lineage/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md lineage/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "YNiO3xgB",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"object/md-lineage/preview\",null,[[\"item\"],[[23,[\"lineage\"]]]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|statement|Process|Step|No|proces|steps|assigned.|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/FhDHpFf",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-lineage/preview\",null,null,{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|Not|Defined|Process|Step|No|proces|steps|assigned.|', 'template block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-locale-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md locale array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('locales', [{
        language: "eng",
        characterSet: "UTF-8",
        country: "USA"
      }, {
        language: "spa",
        characterSet: "UTF-32",
        country: "BDI"
      }]);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RzoCClzv",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-locale-array\",null,[[\"value\"],[[23,[\"locales\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Language|Character|Set|Country|0|eng|?|×|UTF-8|?|×|USA|?|×|Delete|1|spa|?|×|UTF-32|?|×|BDI|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RpEtvD8W",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-locale-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Language|Character|Set|Country|Add|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-locale/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md locale', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('settings', Ember.Object.create({
        data: Ember.Object.create({
          language: "eng",
          characterSet: "UTF-8",
          country: "USA"
        })
      }));

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "eS4kzYb8",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[1,[27,\"object/md-locale\",null,[[\"settings\",\"model\"],[[23,[\"settings\"]],[27,\"hash\",null,null]]]],false],[10]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "nNpKSXzD",
        "block": "{\"symbols\":[],\"statements\":[[7,\"section\"],[9],[0,\"\\n\"],[4,\"object/md-locale\",null,[[\"settings\",\"model\"],[[23,[\"settings\"]],[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n      \"]],\"parameters\":[]},null],[10],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|template|block|text|', 'template block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-maintenance/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md maintenance', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "frequency": "frequency",
        "date": [{
          "date": "2016-10-12",
          "dateType": "creation"
        }, {
          "date": "2016-10-12",
          "dateType": "publication"
        }],
        "scope": [{
          "scopeCode": "scopeCode0"
        }, {
          "scopeCode": "scopeCode1"
        }],
        "note": ["note0", "note1"],
        "contact": [{
          "role": "author",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "publisher",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId1"
          }]
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JhySdLAw",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-maintenance\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|frequency|×|Dates|2|Add|Date|#|Date|Date|Type|Description|0|creation|?|×|Delete|1|publication|?|×|Delete|Contacts|2|Add|Contact|#|Role|Contacts|0|author|?|×|Delete|1|publisher|?|×|Delete|Notes|2|Add|Notes|0|Delete|1|Delete|Scope|×|scopeCode0|×|scopeCode1|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "n3hfZH+Z",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-maintenance\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|Choose|a|value.|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Contacts|0|Add|Contact|#|Role|Contacts|Add|Contact|Notes|0|Add|Notes|Add|Notes|Scope|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-medium/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md medium', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "mediumSpecification": {
          "title": "title"
        },
        "density": 9.9,
        "units": "units",
        "numberOfVolumes": 9,
        "mediumFormat": ["mediumFormat0", "mediumFormat1"],
        "note": "note",
        "identifier": {
          "identifier": "identifier"
        }
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "t3+d591W",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-medium\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), 'Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|×|mediumFormat0|×|mediumFormat1|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+FuXFMjx",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-medium\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Note|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-object-table/component-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md-object-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "G/u4v6iH",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-object-table\",null,[[\"attributes\"],[\"biz,baz\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|0|Add|OK|#|Biz|Baz|Add|OK|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Nf+apZFy",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-object-table\",null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[23,[\"model\"]],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],{\"statements\":[[0,\"        \"],[7,\"span\"],[9],[0,\"Biz:\"],[1,[22,1,[\"biz\"]],false],[10],[0,\"\\n        \"],[7,\"span\"],[9],[0,\"Baz:\"],[1,[22,1,[\"baz\"]],false],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|Edit|Delete|1|biz1|baz1|Edit|Delete|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-objectroute-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md objectroute table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "GS7E+RtM",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-objectroute-table\",null,[[\"attributes\",\"header\"],[\"biz,baz\",\"FooBar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|FooBar|found.|Add|FooBar|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "fQRRTiEV",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-objectroute-table\",null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[23,[\"model\"]],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],{\"statements\":[[0,\"        \"],[7,\"span\"],[9],[0,\"Biz:\"],[1,[22,1,[\"biz\"]],false],[10],[0,\"\\n        \"],[7,\"span\"],[9],[0,\"Baz:\"],[1,[22,1,[\"baz\"]],false],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|More...|Delete|1|biz1|baz1|More...|Delete|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-online-resource/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md online resource', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "uri": "http://URI.example.com",
        "protocol": "protocol",
        "name": "name",
        "description": "description",
        "function": "download"
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "XA75Tr8w",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-online-resource\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'Name|URI|Protocol|Description|Function|download|?|×|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "wIgi8dEu",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-online-resource\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Function|download|?|×|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-party-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md party array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.party = [{
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      }, {
        "role": "publisher",
        "party": [{
          "contactId": 1
        }]
      }];

      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');

      cs.set('contacts', contacts);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/oclFM/2",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-party-array\",null,[[\"value\"],[[23,[\"party\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Role|Contacts|0|author|?|×|×|Contact0|Delete|1|publisher|?|×|×|Contact1|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "60oKzv50",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party-array\",null,[[\"model\"],[[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Role|Contacts|Add|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-party/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md party', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.party = {
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      };

      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');

      cs.set('contacts', contacts);

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "zSESlwFo",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-party\",null,[[\"model\"],[[23,[\"party\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Role|author|?|×|Contacts|×|Contact0|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JiboxtLf",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-party\",null,[[\"model\"],[[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-process-step/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-contact'], function (_testHelpers, _qunit, _emberQunit, _createContact) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md process step', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');

      cs.set('contacts', contacts);
      //
      this.step = {
        "stepId": "stepId",
        "description": "description",
        "rationale": "rationale",
        "timePeriod": {
          "startDateTime": "2016-10-15"
        },
        "processor": [{
          "role": "role",
          "party": [{
            "contactId": "0"
          }]
        }, {
          "role": "role",
          "party": [{
            "contactId": "1"
          }]
        }],
        "stepSource": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "stepProduct": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "reference": [{
          "title": "title0"
        }, {
          "title": "title1"
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Nsn9mgBm",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-process-step\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"step\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|");

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "mxjFonHb",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-process-step\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"step\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|OK|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-repository-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md repository array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.repo = [{
        "citation": {
          "title": "Arctic LCC data.gov"
        },
        "repository": "data.gov"
      }, {
        "citation": {
          "title": "Something"
        },
        "repository": "data.gov"
      }];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "PO/BkJxi",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-repository-array\",null,[[\"value\"],[[23,[\"repo\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|×|Delete|1|data.gov|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "dxowweel",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-repository-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-resource-type-array/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md resource type array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.rt = [{
        "type": "project",
        "name": "foobar"
      }, {
        "type": "map"
      }];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "KqYM6iI5",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-resource-type-array\",null,[[\"value\"],[[23,[\"rt\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|2|Add|#|Type|Name|0|project|?|×|Delete|1|map|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "v2xI7RL7",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-resource-type-array\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|Add|#|Type|Name|Add|Resource|Type|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-simple-array-table/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md simple array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.model = ['biz', 'baz'];
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "6OSQ6Ux5",
        "block": "{\"symbols\":[],\"statements\":[[1,[21,\"object/md-simple-array-table\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Items|0|Add|Add|Item|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "JESvK570",
        "block": "{\"symbols\":[\"foo\"],\"statements\":[[0,\"\\n\"],[4,\"object/md-simple-array-table\",null,[[\"title\",\"required\",\"plain\",\"value\"],[\"FooBar\",false,true,[23,[\"model\"]]]],{\"statements\":[[0,\"        \"],[7,\"td\"],[9],[0,\"\\n            \"],[1,[22,1,[\"item\",\"value\"]],false],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBars|2|Add|FooBar|0|biz|Delete|1|baz|Delete|');

      await (0, _testHelpers.click)('.btn-info');

      assert.equal((0, _testHelpers.findAll)('.table tr').length, 3, 'addItem');

      await (0, _testHelpers.doubleClick)('.btn-danger');

      assert.equal(this.model.length, 1, 'deleteItem');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-source/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md source', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sGHSiB8m",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-source\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"source\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Metadata|Citation|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|OK|Spatial|Reference|System|Reference|System|Type|referenceSystemType|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|distance|Value|Units|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "j1FGio71",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Source|ID|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Metadata|Citation|0|Add|OK|#|Title|Add|Citation|OK|Spatial|Reference|System|Reference|System|Type|Select|type|of|reference|system|used.|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-source/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md source/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "IdLU9ExD",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-source/preview\",null,[[\"model\",\"profilePath\"],[[23,[\"source\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('textarea').value, 'description');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "VzuJmV1d",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-source/preview\",null,[[\"model\",\"profilePath\"],[[23,[\"source\"]],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.find)('textarea').value, 'description');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-extent/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md spatial extent', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.deleteExtent = function (val) {
        assert.equal(val, 9, 'call delete');
      };
      this.editExtent = function (val) {
        assert.equal(val, 9, 'call edit');
      };

      this.extent = {
        "geographicExtent": [{
          // "boundingBox": {
          //   "northLatitude": 34.741612,
          //   "southLatitude": 32.472695,
          //   "eastLongitude": -116.542054,
          //   "westLongitude": -117.729264
          // },
          "geographicElement": [{
            "type": "Feature",
            "id": "3843b29f-bec7-418d-919a-4f794ce749cf",
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[-116.542054, 32.472695], [-117.596742, 34.741612], [-117.596742, 34.741612], [-117.729264, 32.805745], [-117.729264, 32.805745], [-116.542054, 32.472695]]]
            },
            "properties": {
              "name": "New Feature"
            }
          }]
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vM1y3Ce9",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-extent\",null,[[\"extent\",\"index\",\"deleteExtent\",\"editExtent\"],[[23,[\"extent\"]],9,[23,[\"deleteExtent\"]],[23,[\"editExtent\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|#9|Edit|Extent|Features|Delete|Extent|Bounding|Box|North|East|South|West|Calculate|Description|+−|Terrain|FeaturesLeaflet|');

      await (0, _testHelpers.click)('.btn-primary');

      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');

      await (0, _testHelpers.click)('.btn-success');
      await (0, _testHelpers.doubleClick)('.btn-danger');

      this.empty = { geographicExtent: [{}] };
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9kSaHRo3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-extent\",null,[[\"extent\"],[[23,[\"empty\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|#|Edit|Extent|Features|Delete|Extent|Bounding|Box|North|East|South|West|Description|No|Features|to|display.|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-info/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md spatial info', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        spatialReferenceSystem: [{
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemIdentifier": {
            "identifier": "Zone 10",
            "namespace": "UTM",
            "description": "Universal Transverse Mercator Zone 10 Seattle, Washington"
          }
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemIdentifier": {
            "identifier": "4326",
            "namespace": "urn:ogc:def:crs:EPSG",
            "description": "epsg projection 4326 - wgs 84 - Latitude Longitude",
            "authority": {
              "title": "European Petroleum Survey Group"
            }
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemWKT": "PROJCS ['Wyoming 4901, Eastern Zone (1983, meters)', GEOGCS ['GRS 80', DATUM ['GRS 80', SPHEROID ['GRS 80', 6378137.000000, 298.257222]], PRIMEM ['Greenwich', 0.000000 ], UNIT ['Decimal Degree', 0.01745329251994330]], PROJECTION ['Transverse Mercator'], PARAMETER ['Scale_Factor', 0.999938], PARAMETER ['Central_Meridian', -105.166667], PARAMETER ['Latitude_Of_Origin', 40.500000], PARAMETER ['False_Easting', 200000.000000], UNIT ['Meter', 1.000000000000]]"
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemParameterSet": {
            "geodetic": {
              "datumIdentifier": {
                "identifier": "identifier"
              },
              "ellipsoidIdentifier": {
                "identifier": "identifier"
              },
              "semiMajorAxis": 9.9,
              "axisUnits": "axisUnits",
              "denominatorOfFlatteningRatio": 9.9
            }
          }
        }],
        spatialResolution: [{
          "scaleFactor": 99999
        }, {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "levelOfDetail": "levelOfDetail"
        }, {
          "geographicResolution": {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "bearingDistanceResolution": {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        }, {
          "coordinateResolution": {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }],
        spatialRepresentationType: ["vector", "stereoModel"]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "j66y6Tf6",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-info\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|×|stereoModel|?|×|vector|?|Spatial|Reference|System|5|Add|OK|#|Reference|System|Type|Identifier|0|referenceSystemType|identifier|Edit|Delete|1|projected|Zone|10|Edit|Delete|2|geodeticGeographic2D|4326|Edit|Delete|3|projected|Not|Defined|Edit|Delete|4|geodeticGeographic2D|Not|Defined|Edit|Delete|OK|Spatial|Resolution|6|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|0|99999|Not|Defined|Not|Defined|Edit|Delete|1|Not|Defined|Not|Defined|distance|Edit|Delete|2|Not|Defined|levelOfDetail|Not|Defined|Edit|Delete|3|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|4|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|5|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|OK|Add|Spatial|Resolution|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "l1mM0SJr",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-info\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|Spatial|Reference|System|0|Add|OK|#|Reference|System|Type|Identifier|Add|Reference|System|OK|Spatial|Resolution|0|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|Add|Spatial|Resolution|OK|template|block|text|', 'block');
    });

    (0, _qunit.skip)('test actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-spatial-resolution/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md spatial resolution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "scaleFactor": {
          scaleFactor: 99999
        },
        "measure": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "levelOfDetail": {
          levelOfDetail: "levelOfDetail"
        },
        "geographicResolution": {
          geographicResolution: {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "bearingDistanceResolution": {
          bearingDistanceResolution: {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        },
        "coordinateResolution": {
          coordinateResolution: {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }
      };

      var empty = "Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|";

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tTscHVxZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"scaleFactor\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, this.model.scaleFactor.scaleFactor, 'scaleFactor');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "x4WbMadH",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"measure\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, this.model.measure.measure.value, 'measure');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "24JlzbnS",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"levelOfDetail\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, this.model.levelOfDetail.levelOfDetail, 'levelOfDetail');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "MdRpj4yB",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"geographicResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'geographicResolution');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sCekfBRh",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"bearingDistanceResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'bearingDistanceResolution');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "6TSBmhgY",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-spatial-resolution\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"coordinateResolution\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), empty, 'coordinateResolution');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "zWDUlqpF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-spatial-resolution\",null,[[\"model\",\"profilePath\"],[[27,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|' + empty + 'template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-srs/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md srs', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.srs = {
        "referenceSystemType": "projected",
        "referenceSystemIdentifier": {
          "identifier": "identifier",
          "version": "version",
          "description": "description"
        }
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "DO8NJ6aE",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-srs\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"srs\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Authority|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|');

      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');

      assert.equal(input, 'identifier|version|description|', 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "8sDbB5EM",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-srs\",null,[[\"profilePath\"],[\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Reference|System|Type|Select|type|of|reference|system|used.|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification;

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/Ise4VKA",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/classification\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|Kingdom|Animalia|(202423)|Edit|Delete|Subkingdom|Radiata|(914153)|Edit|Delete|Phylum|Cnidaria|(48738)|Edit|Delete|Subphylum|Medusozoa|(718920)|Edit|Delete|Class|Scyphozoa|(51483)|Edit|Delete|Subclass|Discomedusae|(718923)|Edit|Delete|Order|Rhizostomeae|(51756)|Edit|Delete|Family|Rhizostomatidae|(51911)|Edit|Delete|Genus|Rhopilema|(51919)|Edit|Delete|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hzr84rWL",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/classification\",null,[[\"model\",\"preview\"],[[23,[\"model\"]],true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lguY3oHx",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Classification|found.|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/taxon/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification/taxon', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification[0];

      this.delete = function (taxa) {
        assert.ok(taxa, 'called delete');
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RK0K33ht",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/classification/taxon\",null,[[\"model\"],[[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|');

      await (0, _testHelpers.click)('.btn-success');

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|', 'edit');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qFFun9r4",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/classification/taxon\",null,[[\"model\",\"deleteTaxa\"],[[23,[\"model\"]],[23,[\"delete\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      await (0, _testHelpers.click)('.btn-danger');
      await (0, _testHelpers.click)('.btn-danger');

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+GWYjKtF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/classification/taxon\",null,[[\"model\"],[[23,[\"model\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "5/fKo5J5",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/collection\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Taxonomic|System|1|Add|OK|#|Title|Modifications|0|More...|Delete|OK|Classification|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Subkingdom|Dikarya|(936287)|Edit|Delete|Division|Basidiomycota|(623881)|Edit|Delete|Kingdom|Animalia|(202423)|Edit|Delete|Subkingdom|Radiata|(914153)|Edit|Delete|Phylum|Cnidaria|(48738)|Edit|Delete|Subphylum|Medusozoa|(718920)|Edit|Delete|Class|Scyphozoa|(51483)|Edit|Delete|Subclass|Discomedusae|(718923)|Edit|Delete|Order|Rhizostomeae|(51756)|Edit|Delete|Family|Rhizostomatidae|(51911)|Edit|Delete|Genus|Rhopilema|(51919)|Edit|Delete|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Observers|1|Add|#|Role|Contacts|0|pointOfContact|?|×|Delete|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|1|Add|OK|#|Specimen|0|Specimen|Edit|Delete|OK|');

      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');

      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications||Scope|Id Procedure|Id Completeness", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "S8CyIoTd",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Taxonomic|System|found.|Add|Taxonomic|System|Classification|No|Classification|found.|Observers|0|Add|#|Role|Contacts|Add|Observer|General|Scope|Identification|Procedure|Identification|Completeness|Voucher|0|Add|OK|#|Specimen|Add|Voucher|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "rqKuwkIp",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/collection/system\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|1|Add|Date|#|Date|Date|Type|Description|0|transmitted|?|×|Delete|Edition|Presentation|Form|×|webService|?|×|webSite|?|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|1|Add|OK|#|Name|Uri|0|ITIS|website|https://www.itis.gov|Edit|Delete|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Series|Name|Issue|Page|Other|Details|1|Add|0|Delete|Graphic|1|Add|OK|0|itis_logo.jpg:|Edit|Delete|OK|');

      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');

      assert.equal(input, "modifications|Integrated Taxonomic Information System (ITIS)|2019-02-26|Taxa imported from ITIS||||||Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "17zS1/th",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system\",null,[[\"model\",\"profilePath\"],[[27,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Modifications|Basic|Information|Title|Alternate|Titles|0|Add|Alternate|Title|Add|Alternate|Title|Dates|0|Add|Date|#|Date|Date|Type|Description|Add|Date|Edition|Presentation|Form|Responsible|Parties|0|Add|#|Role|Contacts|Add|Responsible|Party|Online|Resource|0|Add|OK|#|Name|Uri|Add|Resource|OK|No|Identifier|found.|Add|Identifier|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Identifier|0|Add|OK|#|Identifier|Namespace|Add|Identifier|OK|Series|Name|Issue|Page|Other|Details|0|Add|Add|Other|Details|Graphic|0|Add|OK|Add|Graphic|OK|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/preview/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "sWtInHbk",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/collection/system/preview\",null,[[\"model\",\"profilePath\"],[[23,[\"model\"]],\"foobar\"]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');

      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|modifications", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+ebEUGzg",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/system/preview\",null,[[\"model\",\"profilePath\"],[[27,\"hash\",null,null],\"foobar\"]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|");
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/voucher/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/voucher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].voucher[0];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "HCKPW5rT",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy/collection/voucher\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Specimen|Repository|Role|custodian|?|×|Contacts|');

      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');

      assert.equal(input, "Specimen|", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "RtQFNZJ5",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy/collection/voucher\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,[[\"repository\"],[[27,\"hash\",null,null]]]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Specimen|Repository|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-taxonomy/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'mdeditor/tests/helpers/create-taxonomy'], function (_testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md taxonomy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "3a21iXSt",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-taxonomy\",null,[[\"model\",\"index\"],[[23,[\"model\"]],0]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#0:|Integrated|Taxonomic|Information|System|(ITIS)|Edit|Collection|Delete|Collection|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');

      await (0, _testHelpers.click)('li .icon');

      assert.equal((0, _testHelpers.find)('li').textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Subkingdom|Dikarya|(936287)|Division|Basidiomycota|(623881)|');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "HDyTEyIi",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-taxonomy\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#undefined|Edit|Collection|Delete|Collection|No|Classification|found.|', 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-time-period/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit', 'moment'], function (_testHelpers, _qunit, _emberQunit, _moment) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md time period', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var date = new Date("2016-10-14T13:10:15-0800");

      this.model = [{
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startDateTime": date,
        "endDateTime": "2016-12-31",
        "timeInterval": {
          "interval": 9,
          "units": "year"
        },
        "duration": {
          "years": 1,
          "months": 1,
          "days": 1,
          "hours": 1,
          "minutes": 1,
          "seconds": 1
        }
      }, {
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        },
        "endGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        }
      }];

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "1T7nGgfZ",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"firstObject\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');

      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');

      assert.equal(input, (0, _moment.default)(date).format('YYYY-MM-DD HH:mm:ss') + '|2016-12-31 00:00:00|id|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "UH4t66ob",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\",\"lastObject\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      var input1 = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');

      assert.equal(input1, "||id|description|periodName0|periodName1|||||||", 'geologic input values');

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|", 'geologic age');
      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "NXJfvpA3",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-time-period\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Time|Period|Dates|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Time|Period|Names|0|Add|Time|Period|Name|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|", 'block');
    });
  });
});
define('mdeditor/tests/integration/pods/components/object/md-transfer/component-test', ['@ember/test-helpers', 'qunit', 'ember-qunit'], function (_testHelpers, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Integration | Component | object/md transfer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "40oDYvKG",
        "block": "{\"symbols\":[],\"statements\":[[1,[27,\"object/md-transfer\",null,[[\"profilePath\",\"model\"],[\"foobar\",[23,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|Online|Option|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://adiwg.org/|Edit|Delete|OK|Offline|Option|2|Add|OK|#|Title|0|Not|Defined|Edit|Delete|1|Not|Defined|Edit|Delete|OK|Distribution|Formats|2|Add|#|Format|Name|Version|Compression|Method|URL|0|Delete|1|Delete|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|');

      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');

      assert.equal(input, "9.9|unitsOfDistribution|title0||||title1|||||9||||", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "K4SrFmdQ",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"object/md-transfer\",null,[[\"profilePath\",\"model\"],[\"foobar\",[27,\"hash\",null,null]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|Online|Option|0|Add|OK|#|Name|Uri|Add|Resource|OK|Offline|Option|0|Add|OK|#|Title|Add|Offline|Option|OK|Distribution|Formats|0|Add|#|Format|Name|Version|Compression|Method|URL|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define('mdeditor/tests/lint/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('formats.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'formats.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/add-em.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/add-em.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/bbox-to-poly.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/bbox-to-poly.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/get-dash.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-dash.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/get-property.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/get-property.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/md-markdown.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/md-markdown.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/mod.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/mod.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/present.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/present.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/uc-words.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/uc-words.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/word-limit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/word-limit.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/leaflet.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/leaflet.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/local-storage-export.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/local-storage-export.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/profile.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/route-publish.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/route-publish.js should pass ESLint\n\n');
  });

  QUnit.test('instance-initializers/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'instance-initializers/settings.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/hash-poll.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/hash-poll.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/object-template.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/object-template.js should pass ESLint\n\n');
  });

  QUnit.test('mixins/scroll-to.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/scroll-to.js should pass ESLint\n\n');
  });

  QUnit.test('models/base.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/base.js should pass ESLint\n\n46:18 - Don\'t use observers if possible (ember/no-observers)\n54:20 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('models/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contact.js should pass ESLint\n\n');
  });

  QUnit.test('models/dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/dictionary.js should pass ESLint\n\n');
  });

  QUnit.test('models/record.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/record.js should pass ESLint\n\n');
  });

  QUnit.test('models/setting.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/setting.js should pass ESLint\n\n71:19 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('pods/components/control/md-button-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-button-confirm/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-button-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-button-modal/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-contact-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-contact-link/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-contact-title/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-contact-title/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-crud-buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-crud-buttons/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-definition/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-definition/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-errors/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-errors/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-fiscalyear/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-fiscalyear/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-import-csv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-import-csv/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-itis/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-itis/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-json-button/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-json-button/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-json-viewer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-json-viewer/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-modal/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-modal/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-record-table/buttons/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/custom/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-record-table/buttons/custom/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/filter/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-record-table/buttons/filter/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-record-table/buttons/show/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-record-table/buttons/show/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-record-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-record-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-repo-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-repo-link/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-scroll-spy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-scroll-spy/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-select-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-select-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-spinner/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-spinner/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-spotlight/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-spotlight/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/md-status/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/md-status/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-citation/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-extent/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-extent/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-importcsv/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-importcsv/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-keywords/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-keywords/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-link/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-link/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-spatial/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-spatial/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/control/subbar-thesaurus/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/control/subbar-thesaurus/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/ember-tooltip/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/ember-tooltip/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-boolean/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-boolean/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-codelist-multi/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-codelist-multi/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-codelist/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-codelist/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-date-range/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-date-range/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-datetime/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-datetime/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-input-confirm/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-input-confirm/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-input/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-input/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-markdown-area/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-markdown-area/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-month/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-month/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-select-contact/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-contact/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-select-contacts/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-contacts/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-select-profile/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-profile/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-select-thesaurus/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select-thesaurus/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-select/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-select/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-textarea/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-textarea/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/input/md-toggle/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/input/md-toggle/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-breadcrumb/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-breadcrumb/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-card/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-card/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-footer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-footer/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-nav-main/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-main/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-nav-secondary/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-secondary/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-nav-sidebar/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-nav-sidebar/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-slider/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-slider/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/layout/md-wrap/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/layout/md-wrap/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-help/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-help/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/components/check-all/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/components/check-all/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/components/check/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/components/check/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-models-table/themes/bootstrap3.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-models-table/themes/bootstrap3.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-title/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-title/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/md-translate/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/md-translate/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-address/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-address/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-address/md-address-block/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-address/md-address-block/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-allocation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-allocation/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-array-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-associated/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-associated/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-associated/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-associated/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-attribute/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-attribute/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-attribute/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-attribute/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-bbox/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-bbox/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-citation-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-citation-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-citation/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-citation/preview/body/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-citation/preview/body/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-citation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-citation/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-constraint/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-constraint/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-date-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-date-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-date/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-date/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-distribution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-distribution/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-distributor/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-distributor/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-distributor/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-distributor/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-documentation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-documentation/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-documentation/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-documentation/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-domain/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domain/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-domainitem/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domainitem/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-domainitem/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-domainitem/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-entity/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-entity/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-funding/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-funding/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-funding/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-funding/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-graphic-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-graphic-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-identifier-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-identifier-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-identifier-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-identifier-object-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-identifier/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-identifier/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-keyword-citation/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-keyword-citation/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-keyword-list/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-keyword-list/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-lineage/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-lineage/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-lineage/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-lineage/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-locale-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-locale-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-locale/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-locale/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-maintenance/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-maintenance/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-medium/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-medium/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-object-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-object-table/component.js should pass ESLint\n\n324:19 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('pods/components/object/md-objectroute-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-objectroute-table/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-online-resource-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-online-resource-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-online-resource/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-online-resource/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-party-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-party-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-party/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-party/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-phone-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-phone-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-process-step/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-process-step/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-repository-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-repository-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-resource-type-array/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-resource-type-array/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-simple-array-table/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-simple-array-table/component.js should pass ESLint\n\n73:19 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('pods/components/object/md-source/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-source/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-source/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-source/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-spatial-extent/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-spatial-extent/component.js should pass ESLint\n\n50:21 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('pods/components/object/md-spatial-info/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-spatial-info/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-spatial-resolution/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-spatial-resolution/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-srs/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-srs/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/classification/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/classification/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/classification/taxon/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/classification/taxon/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/system/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/system/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/system/preview/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/system/preview/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/collection/voucher/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/collection/voucher/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-taxonomy/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-taxonomy/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-time-period/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-time-period/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/components/object/md-transfer/component.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/components/object/md-transfer/component.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/new/id/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/new/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contact/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contact/show/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/contacts/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/contacts/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dashboard/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dashboard/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionaries/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionaries/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/new/id/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/new/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/item/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/item/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/domain/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/domain/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/attribute/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/attribute/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/attribute/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/import/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/entity/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/entity/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/dictionary/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/dictionary/show/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/error/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/error/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/export/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/export/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/help/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/help/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/import/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/import/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/not-found/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/not-found/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/publish/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/publish/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/publish/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/publish/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/new/id/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/new/id/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/new/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/new/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/new/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/new/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/associated/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/associated/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/associated/resource/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/associated/resource/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/associated/resource/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/associated/resource/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/associated/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/associated/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/constraint/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/constraint/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/constraint/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/constraint/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/coverages/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/coverages/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/dictionary/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/dictionary/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/distribution/distributor/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/distribution/distributor/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/distribution/distributor/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/distribution/distributor/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/distribution/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/distribution/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/distribution/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/distribution/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/documents/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/documents/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/documents/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/documents/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/documents/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/documents/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/documents/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/documents/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/extent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/extent/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/extent/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/extent/spatial/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/funding/allocation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/funding/allocation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/funding/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/funding/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/funding/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/funding/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/grid/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/grid/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/keywords/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/keywords/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/keywords/thesaurus/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/keywords/thesaurus/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/source/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/source/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/source/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/step/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/step/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/lineageobject/step/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/lineageobject/step/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/lineage/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/lineage/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/main/citation/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/main/citation/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/main/citation/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/main/citation/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/main/citation/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/main/citation/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/main/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/main/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/main/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/main/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/alternate/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/alternate/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/alternate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/alternate/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/identifier/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/parent/identifier/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/parent/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/parent/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/parent/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/metadata/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/metadata/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/spatial/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/spatial/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/spatial/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/spatial/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/itis/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/itis/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/system/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/system/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/collection/system/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/collection/system/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/edit/taxonomy/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/edit/taxonomy/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/record/show/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/record/show/translate/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/records/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/records/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/save/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/save/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/settings/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/settings/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/translate/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/translate/route.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('services/cleaner.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/cleaner.js should pass ESLint\n\n');
  });

  QUnit.test('services/codelist.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/codelist.js should pass ESLint\n\n');
  });

  QUnit.test('services/contacts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/contacts.js should pass ESLint\n\n');
  });

  QUnit.test('services/icon.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/icon.js should pass ESLint\n\n');
  });

  QUnit.test('services/itis.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/itis.js should pass ESLint\n\n');
  });

  QUnit.test('services/jsonvalidator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/jsonvalidator.js should pass ESLint\n\n');
  });

  QUnit.test('services/keyword.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/keyword.js should pass ESLint\n\n');
  });

  QUnit.test('services/mdjson.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/mdjson.js should pass ESLint\n\n');
  });

  QUnit.test('services/patch.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/patch.js should pass ESLint\n\n');
  });

  QUnit.test('services/profile.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/profile.js should pass ESLint\n\n');
  });

  QUnit.test('services/publish.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/publish.js should pass ESLint\n\n');
  });

  QUnit.test('services/settings.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/settings.js should pass ESLint\n\n');
  });

  QUnit.test('services/slider.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/slider.js should pass ESLint\n\n21:18 - Don\'t use observers if possible (ember/no-observers)');
  });

  QUnit.test('services/spotlight.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/spotlight.js should pass ESLint\n\n');
  });

  QUnit.test('transforms/json.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transforms/json.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });

  QUnit.test('validators/array-required.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/array-required.js should pass ESLint\n\n');
  });

  QUnit.test('validators/array-valid.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'validators/array-valid.js should pass ESLint\n\n');
  });
});
define('mdeditor/tests/lint/templates.template.lint-test', [], function () {
  'use strict';

  QUnit.module('TemplateLint');

  QUnit.test('mdeditor/pods/components/control/md-button-confirm/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-button-confirm/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-button-modal/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-button-modal/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-contact-title/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-contact-title/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-crud-buttons/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-crud-buttons/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-definition/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-definition/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-errors/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-errors/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-import-csv/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-import-csv/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-itis/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-itis/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-json-button/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-json-button/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-json-viewer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-json-viewer/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-modal/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-modal/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/custom/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/custom/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/filter/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/filter/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/show/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-record-table/buttons/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-record-table/buttons/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-repo-link/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-repo-link/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-scroll-spy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-scroll-spy/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-spinner/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-spinner/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/md-status/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/md-status/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-extent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-extent/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-importcsv/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-importcsv/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-keywords/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-keywords/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-link/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-link/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-spatial/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/control/subbar-thesaurus/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/control/subbar-thesaurus/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-boolean/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-boolean/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-date-range/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-date-range/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-datetime/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-datetime/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-input-confirm/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-input-confirm/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-input/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-input/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-markdown-area/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-markdown-area/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-select-profile/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select-profile/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-select-thesaurus/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select-thesaurus/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-select/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-select/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/input/md-textarea/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/input/md-textarea/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-breadcrumb/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-breadcrumb/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-card/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-card/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-footer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-footer/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-nav-main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-main/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-nav-secondary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-secondary/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-nav-sidebar/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-nav-sidebar/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-slider/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-slider/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/layout/md-wrap/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/layout/md-wrap/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/md-help/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-help/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/md-models-table/components/check-all/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/check-all/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/md-models-table/components/check/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-models-table/components/check/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/md-title/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-title/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/md-translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/md-translate/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-address/md-address-block/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-address/md-address-block/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-address/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-address/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-allocation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-allocation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-array-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-array-table/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-associated/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-associated/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-associated/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-associated/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-attribute/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-attribute/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-attribute/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-bbox/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-bbox/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-citation-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-citation/preview/body/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/preview/body/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-citation/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-constraint/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-constraint/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-date-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-date-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-date/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-date/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-distribution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distribution/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-distributor/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distributor/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-distributor/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-distributor/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-documentation/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-documentation/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-documentation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-documentation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-domain/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domain/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-domainitem/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domainitem/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-domainitem/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-domainitem/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-entity/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-entity/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-funding/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-funding/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-funding/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-funding/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-graphic-array/md-graphic-preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-graphic-array/md-graphic-preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-graphic-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-graphic-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-identifier-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-identifier-object-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier-object-table/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-keyword-citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-keyword-citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-keyword-list/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-keyword-list/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-lineage/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-lineage/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-lineage/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-lineage/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-locale-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-locale-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-locale/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-locale/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-maintenance/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-maintenance/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-medium/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-medium/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-object-table/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-object-table/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-online-resource-array/md-image-preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource-array/md-image-preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-online-resource-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-online-resource/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-online-resource/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-party-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-party-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-party/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-party/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-phone-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-phone-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-process-step/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-process-step/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-repository-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-repository-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-resource-type-array/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-resource-type-array/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-source/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-source/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-source/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-source/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-spatial-extent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-spatial-extent/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-spatial-info/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-spatial-info/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-spatial-resolution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-spatial-resolution/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-srs/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-srs/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/classification/taxon/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/classification/taxon/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/classification/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/classification/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/system/preview/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/system/preview/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/system/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/system/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/collection/voucher/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/collection/voucher/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-taxonomy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-taxonomy/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-time-period/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-time-period/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/components/object/md-transfer/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/components/object/md-transfer/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/new/id/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/new/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/edit/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/show/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contact/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contact/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/contacts/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/contacts/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dashboard/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dashboard/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionaries/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionaries/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/new/id/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/new/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/item/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/item/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/edit/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/domain/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/domain/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/attribute/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/attribute/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/attribute/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/attribute/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/edit/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/import/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/import/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/entity/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/entity/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/edit/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/show/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/dictionary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/dictionary/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/error/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/error/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/export/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/export/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/help/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/help/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/import/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/import/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/not-found/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/not-found/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/publish/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/publish/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/publish/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/publish/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/nav/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/new/id/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/new/id/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/new/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/new/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/associated/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/associated/resource/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/resource/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/associated/resource/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/resource/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/associated/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/associated/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/constraint/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/constraint/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/constraint/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/constraint/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/coverages/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/coverages/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/dictionary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/dictionary/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/distribution/distributor/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/distributor/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/distribution/distributor/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/distributor/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/distribution/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/distribution/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/distribution/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/documents/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/documents/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/documents/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/documents/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/documents/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/extent/spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/extent/spatial/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/extent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/extent/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/funding/allocation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/allocation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/funding/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/funding/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/funding/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/grid/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/grid/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/keywords/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/keywords/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/keywords/thesaurus/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/keywords/thesaurus/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/source/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/source/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/source/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/source/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/step/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/step/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/lineageobject/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/lineageobject/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/lineage/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/lineage/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/main/citation/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/main/citation/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/main/citation/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/citation/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/main/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/main/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/main/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/alternate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/alternate/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/identifier/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/identifier/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/parent/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/parent/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/metadata/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/metadata/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/nav-secondary/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/nav-secondary/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/nav/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/spatial/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/spatial/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/spatial/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/itis/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/itis/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/system/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/system/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/system/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/system/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/collection/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/collection/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/taxonomy/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/taxonomy/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/edit/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/edit/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/index/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/index/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/nav/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/show/translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/show/translate/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/record/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/record/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/records/nav/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/records/nav/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/records/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/records/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/save/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/save/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/settings/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/settings/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/pods/translate/template.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/pods/translate/template.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/application.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/templates/head.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/head.hbs should pass TemplateLint.\n\n');
  });

  QUnit.test('mdeditor/templates/nav-secondary.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mdeditor/templates/nav-secondary.hbs should pass TemplateLint.\n\n');
  });
});
define('mdeditor/tests/lint/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/pods/components/layout/md-breadcrumb-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/components/layout/md-breadcrumb-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/contact/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/copy-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/contact/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contact/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/contacts/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/contacts/contacts-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/dictionary/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/copy-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/dictionary/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/dictionary/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/record/copy-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/copy-test.js should pass ESLint\n\n');
  });

  QUnit.test('acceptance/pods/record/new-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/pods/record/new-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-citation.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-citation.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-contact.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-dictionary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-dictionary.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-identifier.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-identifier.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-map-layer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-map-layer.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-record.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-record.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/create-taxonomy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/create-taxonomy.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/flash-message.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/flash-message.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/modal-asserts.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/modal-asserts.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/feature-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-group-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/feature-group-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/feature-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/feature-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/geojson-layer-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/geojson-layer-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-draw-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-draw-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-row-actions-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-table-row-actions-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-row-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-table-row-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/leaflet-table-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/leaflet-table-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-publisher-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-publisher-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-tree-label-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-tree-label-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/sb-tree-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/sb-tree-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-branch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-branch-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-label-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-label-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-leaf-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-leaf-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-search-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-search-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/tree-view-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/tree-view-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/present-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/present-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/word-limit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/word-limit-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-button-confirm/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button-confirm/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-button-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-button-modal/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-contact-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-contact-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-contact-title/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-contact-title/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-crud-buttons/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-crud-buttons/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-definition/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-definition/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-errors/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-errors/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-fiscalyear/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-fiscalyear/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-import-csv/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-import-csv/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-itis/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-itis/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-json-button/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-json-button/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-json-viewer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-json-viewer/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-modal/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-modal/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/custom/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/custom/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/filter/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/filter/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/buttons/show/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/buttons/show/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-record-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-record-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-repo-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-repo-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-scroll-spy/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-scroll-spy/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-select-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-select-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-spinner/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-spinner/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-spotlight/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-spotlight/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/md-status/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/md-status/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-extent/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-extent/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-importcsv/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-importcsv/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-keywords/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-keywords/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-link/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-link/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-spatial/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-spatial/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/control/subbar-thesaurus/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/control/subbar-thesaurus/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/ember-tooltip/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/ember-tooltip/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-boolean/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-boolean/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-codelist-multi/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-codelist-multi/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-codelist/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-codelist/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-date-range/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-date-range/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-datetime/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-datetime/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-input-confirm/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-input-confirm/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-input/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-input/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-markdown-area/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-markdown-area/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-month/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-month/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-contact/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-contact/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-contacts/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-contacts/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-profile/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-profile/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select-thesaurus/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select-thesaurus/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-select/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-select/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-textarea/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-textarea/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/input/md-toggle/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/input/md-toggle/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-card/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-card/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-footer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-footer/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-nav-main/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-main/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-nav-secondary/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-secondary/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-nav-sidebar/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-nav-sidebar/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-slider/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-slider/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/layout/md-wrap/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/layout/md-wrap/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-help/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-help/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/components/check-all/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/check-all/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-models-table/components/check/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-models-table/components/check/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-title/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-title/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/md-translate/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/md-translate/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-address/md-address-block/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-address/md-address-block/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-allocation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-allocation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-array-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-array-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-associated/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-associated/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-associated/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-associated/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-attribute/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-attribute/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-attribute/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-attribute/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-bbox/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-bbox/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/preview/body/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/preview/body/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-citation/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-citation/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-constraint/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-constraint/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-date-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-date-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-date/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-date/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distribution/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distribution/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distributor/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distributor/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-distributor/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-distributor/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-documentation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-documentation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-documentation/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-documentation/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domain/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domain/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domainitem/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domainitem/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-domainitem/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-domainitem/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-entity/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-entity/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-funding/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-funding/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-funding/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-funding/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-graphic-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-graphic-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier-object-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier-object-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-identifier/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-identifier/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-keyword-citation/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-keyword-citation/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-keyword-list/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-keyword-list/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-lineage/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-lineage/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-lineage/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-lineage/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-locale-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-locale-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-locale/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-locale/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-maintenance/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-maintenance/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-medium/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-medium/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-object-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-object-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-objectroute-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-objectroute-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-online-resource/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-online-resource/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-party-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-party-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-party/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-party/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-process-step/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-process-step/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-repository-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-repository-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-resource-type-array/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-resource-type-array/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-simple-array-table/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-simple-array-table/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-source/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-source/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-source/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-source/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-extent/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-extent/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-info/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-info/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-spatial-resolution/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-spatial-resolution/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-srs/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-srs/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/classification/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/classification/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/classification/taxon/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/classification/taxon/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/system/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/system/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/system/preview/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/system/preview/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/collection/voucher/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/collection/voucher/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-taxonomy/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-taxonomy/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-time-period/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-time-period/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/pods/components/object/md-transfer/component-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/pods/components/object/md-transfer/component-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/bbox-to-poly-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/bbox-to-poly-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/get-dash-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/get-dash-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/make-range-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/make-range-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/md-markdown-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/md-markdown-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/helpers/mod-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/mod-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/leaflet-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/leaflet-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/local-storage-export-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/local-storage-export-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/instance-initializers/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/instance-initializers/route-publish-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/route-publish-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/instance-initializers/settings-sciencebase-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/settings-sciencebase-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/instance-initializers/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/instance-initializers/settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/hash-poll-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/hash-poll-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/object-template-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/object-template-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/mixins/scroll-to-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/scroll-to-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/base-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/base-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/contact-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/dictionary-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/dictionary-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/record-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/record-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/setting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/setting-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contact/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contact/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/contacts/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/contacts/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dashboard/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dashboard/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionaries/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionaries/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/item/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/item/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/domain/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/domain/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/attribute/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/attribute/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/import/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/import/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/entity/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/entity/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/dictionary/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/dictionary/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/error/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/error/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/export/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/export/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/help/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/help/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/import/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/import/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/not-found/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/not-found/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/publish/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/publish/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/publish/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/publish/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/new/id/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/new/id/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/new/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/new/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/resource/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/resource/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/resource/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/resource/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/associated/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/associated/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/constraint/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/constraint/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/constraint/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/constraint/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/coverages/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/coverages/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/dictionary/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/dictionary/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/distributor/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/distributor/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/distributor/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/distributor/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/distribution/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/distribution/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/documents/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/documents/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/allocation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/allocation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/funding/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/funding/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/grid/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/grid/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/keywords/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/keywords/thesaurus/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/keywords/thesaurus/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/source/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/source/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/lineage/lineageobject/step/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/lineage/lineageobject/step/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/citation/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/citation/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/main/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/main/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/alternate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/alternate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/identifier/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/identifier/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/parent/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/parent/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/metadata/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/metadata/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/extent/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/extent/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/spatial/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/spatial/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/itis/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/itis/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/system/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/system/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/collection/system/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/collection/system/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/edit/taxonomy/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/edit/taxonomy/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/record/show/translate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/record/show/translate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/records/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/records/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/settings/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/settings/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/translate/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/translate/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/publish/sciencebase-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/publish/sciencebase-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/cleaner-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/cleaner-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/codelist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/codelist-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/contacts-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/contacts-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/icon-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/icon-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/itis-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/itis-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/jsonvalidator-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/jsonvalidator-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/keyword-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/keyword-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/mdjson-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/mdjson-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/patch-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/patch-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/profile-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/profile-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/publish-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/publish-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/settings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/settings-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/slider-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/slider-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/spotlight-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/spotlight-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/transforms/json-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/json-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/config-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/config-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/utils/sb-tree-node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/utils/sb-tree-node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/validators/array-required-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/array-required-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/validators/array-valid-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/validators/array-valid-test.js should pass ESLint\n\n');
  });
});
define("qunit/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* globals QUnit */

  var _module = QUnit.module;
  exports.module = _module;
  var test = exports.test = QUnit.test;
  var skip = exports.skip = QUnit.skip;
  var only = exports.only = QUnit.only;
  var todo = exports.todo = QUnit.todo;

  exports.default = QUnit;
});
define('mdeditor/tests/test-helper', ['mdeditor/app', 'mdeditor/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('mdeditor/tests/unit/adapters/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });

    (0, _qunit.test)('it has a importData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.importData === 'function');
    });

    (0, _qunit.test)('it has a exportData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.exportData === 'function');
    });
  });
});
define('mdeditor/tests/unit/helpers/bbox-to-poly-test', ['mdeditor/helpers/bbox-to-poly', 'qunit'], function (_bboxToPoly, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | bbox to poly', function () {
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _bboxToPoly.bboxToPoly)([{
        southLatitude: 1,
        northLatitude: 2,
        westLongitude: 3,
        eastLongitude: 4
      }]);
      assert.equal("[[1,3],[2,3],[2,4],[1,4]]", JSON.stringify(result));
    });
  });
});
define('mdeditor/tests/unit/helpers/get-dash-test', ['mdeditor/helpers/get-dash', 'qunit'], function (_getDash, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | get dash', function () {
    (0, _qunit.test)('it works', function (assert) {
      let obj = { foo: 'bar' };
      let result = (0, _getDash.getDash)([obj, 'foo']);

      assert.equal(result, 'bar', 'value');

      result = (0, _getDash.getDash)([obj, 'biz']);

      assert.equal(result, '--', 'dash');
    });
  });
});
define('mdeditor/tests/unit/helpers/make-range-test', ['mdeditor/helpers/make-range', 'qunit'], function (_makeRange, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | make range', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _makeRange.makeRange)([42]);
      assert.ok(result);
    });
  });
});
define('mdeditor/tests/unit/helpers/md-markdown-test', ['mdeditor/helpers/md-markdown', 'qunit'], function (_mdMarkdown, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | md markdown', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mdMarkdown.mdMarkdown)('# Test');
      assert.equal(result.string.trim(), '<p>#</p>');
    });
  });
});
define('mdeditor/tests/unit/helpers/mod-test', ['mdeditor/helpers/mod', 'qunit'], function (_mod, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Helper | mod', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mod.mod)([42]);
      assert.ok(result);
    });
  });
});
define('mdeditor/tests/unit/initializers/leaflet-test', ['mdeditor/initializers/leaflet', 'qunit'], function (_leaflet, _qunit) {
  'use strict';

  let application;

  (0, _qunit.module)('Unit | Initializer | leaflet', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(function () {
        application = Ember.Application.create();
        application.deferReadiness();
      });
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      _leaflet.default.initialize(application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define('mdeditor/tests/unit/initializers/local-storage-export-test', ['mdeditor/initializers/local-storage-export', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_localStorageExport, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Initializer | local storage export', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.application.deferReadiness();
      });
    });

    hooks.afterEach(function () {
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _localStorageExport.initialize)(this.application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define('mdeditor/tests/unit/instance-initializers/profile-test', ['mdeditor/instance-initializers/profile', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_profile, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | profile', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });

    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _profile.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define('mdeditor/tests/unit/instance-initializers/route-publish-test', ['mdeditor/instance-initializers/route-publish', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_routePublish, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | route publish', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });

    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    (0, _qunit.test)('it works', function (assert) {
      let a = [{ route: 'test' }];

      this.appInstance.register('service:publish', Ember.Service.extend({ catalogs: a }));
      (0, _routePublish.initialize)(this.appInstance);

      assert.ok(true);
    });
  });
});
define('mdeditor/tests/unit/instance-initializers/settings-sciencebase-test', ['mdeditor/instance-initializers/settings-sciencebase', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_settingsSciencebase, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | settings sciencebase', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });

    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    let a = [];

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      this.appInstance.register('service:publish', Ember.Service.extend({ catalogs: a }));
      (0, _settingsSciencebase.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(this.appInstance.lookup('service:publish').catalogs.findBy('route', 'sciencebase'));
    });
  });
});
define('mdeditor/tests/unit/instance-initializers/settings-test', ['mdeditor/instance-initializers/settings', 'qunit', 'mdeditor/tests/helpers/destroy-app'], function (_settings, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Instance Initializer | settings', function (hooks) {
    hooks.beforeEach(function () {
      Ember.run(() => {
        this.application = Ember.Application.create();
        this.appInstance = this.application.buildInstance();
      });
    });

    hooks.afterEach(function () {
      Ember.run(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _settings.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define('mdeditor/tests/unit/mixins/hash-poll-test', ['mdeditor/mixins/hash-poll', 'qunit'], function (_hashPoll, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | hash poll', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let HashPollObject = Ember.Object.extend(_hashPoll.default);
      let subject = HashPollObject.create();
      assert.ok(subject);
    });
  });
});
define('mdeditor/tests/unit/mixins/object-template-test', ['mdeditor/mixins/object-template', 'qunit'], function (_objectTemplate, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | object template', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ObjectTemplateObject = Ember.Object.extend(_objectTemplate.default);
      let subject = ObjectTemplateObject.create();
      assert.ok(subject);
    });
  });
});
define('mdeditor/tests/unit/mixins/scroll-to-test', ['mdeditor/mixins/scroll-to', 'qunit'], function (_scrollTo, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Mixin | scroll to', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ScrollToObject = Ember.Object.extend(_scrollTo.default);
      let subject = ScrollToObject.create();
      assert.ok(subject);
    });
  });
});
define('mdeditor/tests/unit/models/base-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | base', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').modelFor('base'));
      // let store = this.store();
      assert.equal(model.modelName, 'base');
    });
  });
});
define('mdeditor/tests/unit/models/contact-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));
      // var store = this.store();
      assert.ok(!!model);
    });

    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));

      assert.expect(3);
      me.set('json.name', 'bar');
      me.set('json.positionName', 'foo');
      assert.equal(me.get('title'), 'bar');
      me.set('json.name', null);
      me.set('json.isOrganization', false);
      assert.equal(me.get('title'), 'foo');
      me.set('json.isOrganization', true);
      assert.equal(me.get('title'), null);
    });

    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('contact'));

      assert.expect(2);
      me.set('json.isOrganization', true);
      assert.equal(me.get('icon'), 'users');
      me.set('json.isOrganization', false);
      assert.equal(me.get('icon'), 'user');
    });
  });
});
define('mdeditor/tests/unit/models/dictionary-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary'));
      // var store = this.store();
      assert.ok(!!model);
    });

    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('dictionary'));

      assert.expect(1);
      me.set('json.dataDictionary.citation.title', 'bar');
      assert.equal(me.get('title'), 'bar');
    });
  });
});
define('mdeditor/tests/unit/models/record-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | record', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var model = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      // var store = this.store();
      assert.ok(!!model);
    });

    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));

      assert.expect(1);
      me.set('json.metadata.resourceInfo.citation.title', 'foo');
      assert.equal(me.get('title'), 'foo');
    });

    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = Ember.run(() => this.owner.lookup('service:store').createRecord('record'));
      const list = this.owner.lookup('service:icon');

      assert.expect(1);
      me.set('json.metadata.resourceInfo.resourceType.firstObject.type', 'project');
      assert.equal(me.get('icon'), list.get('project'));
    });
  });
});
define('mdeditor/tests/unit/models/setting-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | setting', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('setting'));
      // let store = this.store();
      assert.ok(!!model);
    });
  });
});
define('mdeditor/tests/unit/pods/contact/new/id/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/id');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/contact/new/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/contact/show/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show/edit');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/contact/show/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/show/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/contact/show/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contact/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/contacts/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contacts');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dashboard/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dashboard', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dashboard');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionaries/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionaries', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionaries');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/id/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/id');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/new/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/item/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/item', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/item');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/domain/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/import/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/import');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/entity/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/dictionary/show/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | dictionary/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/error/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | error', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:error');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/export/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | save', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:save');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/help/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | help', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:help');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/import/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:import');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/not-found/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | not found', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:not-found');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/publish/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | publish/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/publish/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:publish');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/new/id/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/id');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/new/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/resource/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/resource/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/associated/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/associated', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/associated');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/constraint/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/constraint/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/constraint', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/coverages/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/coverages', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/coverages');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/dictionary/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/dictionary');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/distribution/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/distribution', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/distribution');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/documents/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/documents/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/documents', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/documents');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/allocation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/allocation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/allocation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/funding/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/funding/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/funding', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/grid/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/grid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/grid');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit/keywords', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/keywords');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/keywords/thesaurus/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/thesaurus', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/thesaurus');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/citation/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/main/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/main/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/identifier/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/identifier');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/parent/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/metadata/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/metadata', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/extent/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/extent/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/spatial');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/spatial/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/itis/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/itis');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/edit/taxonomy/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/index/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/record/show/translate/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | record/show/translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/translate');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/records/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | records', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:records');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/settings/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:settings');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/pods/translate/route-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:translate');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/routes/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/routes/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/routes/publish/sciencebase-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | publish/sciencebase', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/sciencebase');
      assert.ok(route);
    });
  });
});
define('mdeditor/tests/unit/serializers/application-test', ['ember-data', 'qunit', 'ember-qunit'], function (_emberData, _qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it serializes records', function (assert) {
      assert.expect(2);

      let serializer = this.owner.lookup('serializer:application');
      let store = this.owner.lookup('service:store');
      let record;
      const expected = {
        "data": {
          "attributes": {
            "name": "foo",
            "skill": "bar",
            "games-played": "[100,200]"
          },
          "type": "tests"
        }
      };
      const data = {
        id: 1,
        name: 'foo',
        skill: 'bar',
        gamesPlayed: [100, 200]
      };
      let model = _emberData.default.Model.extend({
        name: _emberData.default.attr(),
        skill: _emberData.default.attr(),
        gamesPlayed: _emberData.default.attr('json')
      });

      this.owner.register('model:test', model);

      Ember.run(function () {
        record = store.createRecord('test', data);
      });

      assert.deepEqual(record.serialize(), expected, 'record serialized OK');
      assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
    });
  });
});
define('mdeditor/tests/unit/services/cleaner-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | cleaner', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:cleaner');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/codelist-test', ['qunit', 'ember-qunit', 'mdcodes/resources/js/mdcodes.js'], function (_qunit, _emberQunit, _mdcodes) {
  'use strict';

  (0, _qunit.module)('Unit | Service | codelist', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('all codelists are present', function (assert) {
      var service = this.owner.lookup('service:codelist');

      Object.keys(_mdcodes.default).forEach(function (key) {
        if (key === 'default') return;

        const name = key.replace(/^(iso_|adiwg_)/, '');

        assert.ok(service.get(name), name + ' is present.');
      });
    });
  });
});
define('mdeditor/tests/unit/services/contacts-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:contacts');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/icon-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | icon', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:icon');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/itis-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:itis');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/jsonvalidator-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | jsonvalidator', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('test jsonapi validation', function (assert) {
      var service = this.owner.lookup('service:jsonvalidator');
      var obj = {
        "data": [{
          "id": "8ke11eu1",
          "attributes": {
            "profile": "full",
            "json": "{}",
            "date-updated": "2016-09-16T22:08:04.425Z"
          },
          "type": "records",
          "meta": {
            "title": "ytr",
            "export": true
          }
        }, {
          "id": "spt9cadc",
          "attributes": {
            "json": "{}",
            "date-updated": "2016-09-16T22:08:11.080Z"
          },
          "type": "contacts",
          "meta": {
            "title": "ewrrrrrrrrrrrrrr",
            "export": true
          }
        }]
      };

      assert.ok(service.validator.validate('jsonapi', obj));
    });
  });
});
define('mdeditor/tests/unit/services/keyword-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | keyword', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:keyword');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/mdjson-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | mdjson', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:mdjson');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/patch-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | patch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:patch');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/profile-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:profile');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/publish-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:publish');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/settings-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:settings');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/slider-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | slider', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:slider');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/services/spotlight-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | spotlight', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:spotlight');
      assert.ok(service);
    });
  });
});
define('mdeditor/tests/unit/transforms/json-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Transform | json', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it deserialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      let obj = transform.deserialize('{"foo":"bar"}');

      assert.equal(obj.get('foo'), "bar");
      assert.equal(Object.keys(obj)[0], 'foo');
      assert.equal(Object.keys(obj).length, 1);
    });

    (0, _qunit.test)('it serialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      assert.equal(transform.serialize({
        foo: 'bar'
      }), '{"foo":"bar"}');
    });
  });
});
define('mdeditor/tests/unit/utils/config-test', ['mdeditor/utils/config', 'qunit'], function (_config, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | config', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = _config.default.name;
      assert.equal(result, 'ScienceBase');
    });
  });
});
define('mdeditor/tests/unit/utils/sb-tree-node-test', ['mdeditor/utils/sb-tree-node', 'qunit'], function (_sbTreeNode, _qunit) {
  'use strict';

  (0, _qunit.module)('Unit | Utility | sb tree node', function () {
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);

      let result = _sbTreeNode.default.create({
        _record: {
          recordId: 'theid'
        }
        //config: this.get('config')
      });

      assert.equal(result.uuid, 'theid');
      assert.equal(result.uuid, result.identifier, 'set ids');
    });
  });
});
define('mdeditor/tests/unit/validators/array-required-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Validator | array-required', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-required');
      assert.ok(validator);
    });
  });
});
define('mdeditor/tests/unit/validators/array-valid-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Validator | array-valid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-valid');
      assert.ok(validator);
    });
  });
});
define('mdeditor/config/environment', [], function() {
  var prefix = 'mdeditor';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
