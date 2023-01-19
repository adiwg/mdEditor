import $ from 'jquery';
import QUnit from 'qunit';

export default function registerAssertHelpers() {
  const { assert } = QUnit;
  const overlaySelector = '.md-modal-overlay';
  const dialogSelector = '.ember-modal-dialog';

  assert.isPresentOnce = function(selector, message) {
    message = message || `${selector} is present in DOM once`;
    return this.equal($(selector).length, 1, message);
  };

  assert.isAbsent = function(selector, message) {
    message = message || `${selector} is absent from DOM`;
    return this.equal($(selector).length, 0, message);
  };

  assert.isVisible = function(selector, message) {
    message = message || `${selector} is not visible`;
    return this.ok($(selector).is(':visible'), message);
  };

  assert.dialogOpensAndCloses = function(options/*, message*/) {
    //message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
    const dialogContent = options.dialogText ? [dialogSelector, `:contains(${options.dialogText})`].join('') : dialogSelector;
    const self = this;
    return click(options.openSelector, options.context).then(function() {
      if (options.hasOverlay) {
        self.isPresentOnce(overlaySelector);
      }
      self.isPresentOnce(dialogContent);
      if (options.whileOpen) {
        options.whileOpen();
      }
      return click(options.closeSelector, options.context).then(function() {
        self.isAbsent(overlaySelector);
        self.isAbsent(dialogContent);
      });
    });
  };
}
