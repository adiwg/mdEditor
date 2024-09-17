import Component from '@ember/component';

export default Component.extend({
  classNames: ['md-error-list'],

  /**
   *  Error objects to render grouped by validation schema or profile. The group
   *  object must have a `title` and `errors` property. Error objects iwthin the
   *  group must have a `message` property. `dataPath` is optional.
   *
   * @property errors
   * @type {Array}
   * @required
   */

  init() {
    this._super(...arguments);

    console.log('errors', this.errors);

    this.defaultTitle = this.errors[0].title;
    this.defaultErrors = this.errors[0].errors;

    if (this.errors.length > 1) {
      this.customTitle = this.errors[1].title;
      this.customErrors = this.errors[1].errors;
    }

    this.formattedErrors = [];

    if (this.defaultErrors.length > 0) {
      this.formattedErrors.push({
        title: this.defaultTitle,
        errors: this.defaultErrors.map(this.translateError),
      });
    }

    if (this.customErrors?.length > 0) {
      this.formattedErrors.push({
        title: this.customTitle,
        errors: this.customErrors.map(this.translateError),
      });
    }

    console.log(this.formattedErrors);
  },

  translateError(error) {
    const errorObj = {
      type: error.keyword,
      heading: '',
      message: '',
      path: '',
    };
    switch (error.keyword) {
      case 'required':
        errorObj.heading = 'Required Field';
        errorObj.message = `A required field is missing: ${error.params.missingProperty}: ${error.message}`;
        errorObj.path = error.dataPath;
        break;
      case 'minItems':
        errorObj.heading = 'Minimum Items';
        errorObj.message = `Minimum number of items not met: ${error.message}`;
        errorObj.path = error.dataPath;
        break;
      case 'maxItems':
        errorObj.heading = 'Maximum Items';
        errorObj.message = `Maximum number of items exceeded: ${error.message}`;
        errorObj.path = error.dataPath;
        break;
      case 'anyOf':
        errorObj.heading = 'Any Of';
        errorObj.message = `Any of the following fields must be included: ${error.message}`;
        errorObj.path = error.dataPath;
        break;
      case 'errorMessage':
        const { keyword, message, dataPath, params } = error.params.errors[0];
        if (keyword === 'required') {
          errorObj.heading = 'Required Field';
          errorObj.message = `A required field is missing: ${params.missingProperty}: ${message}`;
          errorObj.path = dataPath;
        } else {
          errorObj.heading = 'Validation Error';
          errorObj.message = error.message;
          errorObj.path = error.dataPath;
        }
        break;
      default:
        errorObj.heading = 'Validation Error';
        errorObj.message = error.message;
        errorObj.path = error.dataPath;
        break;
    }
    return errorObj;
  },
});
