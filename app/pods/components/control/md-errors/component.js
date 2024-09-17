import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),
  classNames: ['md-error-list'],

  init() {
    this._super(...arguments);

    // Initialize titles and errors
    this.defaultTitle = this.errors[0]?.title || 'Validation Errors';
    this.defaultErrors = this.errors[0]?.errors || [];

    // Check if there's a second array of errors (customErrors)
    if (this.errors.length > 1) {
      this.customTitle = this.errors[1].title || 'Custom Errors';
      this.customErrors = this.errors[1].errors || [];
    }

    this.formattedErrors = [];

    if (this.defaultErrors.length > 0) {
      // Process the default errors to group related errors
      let processedDefaultErrors = this.processErrors(this.defaultErrors);

      this.formattedErrors.push({
        title: this.defaultTitle,
        errors: processedDefaultErrors.map((error) =>
          this.translateError(error)
        ),
      });
    }

    if (this.customErrors && this.customErrors.length > 0) {
      // Process the custom errors to group related errors
      let processedCustomErrors = this.processErrors(this.customErrors);

      this.formattedErrors.push({
        title: this.customTitle,
        errors: processedCustomErrors.map((error) =>
          this.translateError(error)
        ),
      });
    }
  },

  // Extract the record ID from the current URL
  recordId: computed('router.currentURL', function () {
    const url = this.router.currentURL;
    const match = url.match(/\/record\/([^\/]+)\//);
    return match ? match[1] : null;
  }),

  // Function to process errors and group anyOf related errors
  processErrors(errors) {
    let groupedErrors = [];
    let anyOfErrors = new Map(); // Map to store anyOf errors by their dataPath
    let processedErrors = new Set(); // Keep track of errors that have been processed

    errors.forEach((error) => {
      if (
        error.keyword === 'anyOf' ||
        (error.keyword === 'errorMessage' && error.params?.errors)
      ) {
        // Use dataPath as the key to group errors
        let key = error.dataPath;

        // Initialize or overwrite any existing entry for this dataPath
        anyOfErrors.set(key, {
          error: error,
          subErrors: [],
        });
      }
    });

    errors.forEach((error) => {
      if (error.keyword === 'required') {
        // Check if this required error is part of an anyOf or errorMessage error
        let parentSchemaPath = error.schemaPath.replace(/\/\d+\/required$/, '');
        let key = error.dataPath;

        if (anyOfErrors.has(key)) {
          // This error is part of an anyOf or errorMessage error
          anyOfErrors.get(key).subErrors.push(error);
          processedErrors.add(error);
        } else {
          // Not part of anyOf, include in groupedErrors
          groupedErrors.push(error);
        }
      } else if (error.keyword === 'errorMessage') {
        // Handle errorMessage keyword
        let nestedErrors = error.params.errors || [];
        nestedErrors.forEach((nestedError) => {
          // Recursively process nested errors
          nestedError.dataPath = nestedError.dataPath || error.dataPath;
          nestedError.schemaPath = nestedError.schemaPath || error.schemaPath;
          errors.push(nestedError);
        });
        processedErrors.add(error);
      } else if (error.keyword !== 'anyOf') {
        // Include other errors not part of anyOf
        if (!processedErrors.has(error)) {
          groupedErrors.push(error);
        }
      }
      // Do not include individual required errors that are part of anyOf
    });

    // Now, collect the grouped anyOf or errorMessage errors
    anyOfErrors.forEach((group) => {
      let error = group.error;
      error.subErrors = group.subErrors;
      groupedErrors.push(error);
    });

    return groupedErrors;
  },

  // Function to map data paths to endpoints
  mapDataPathToEndpoint(dataPath) {
    const recordId = this.recordId;

    // Remove leading '/' and split the data path
    let pathSegments = dataPath.startsWith('/')
      ? dataPath.slice(1).split('/')
      : dataPath.split('/');

    // Remove 'metadata' from the pathSegments if present
    if (pathSegments[0] === 'metadata') {
      pathSegments.shift();
    }

    let endpoint = 'main'; // default endpoint
    let extraPath = ''; // any extra path to append
    let index = null;

    // Now process the path segments
    if (pathSegments[0] === 'resourceInfo') {
      // Handle resourceInfo
      if (pathSegments[1]) {
        switch (pathSegments[1]) {
          case 'extent':
            endpoint = 'extent';
            // Do not include index for extent
            break;
          case 'taxonomy':
            endpoint = 'taxonomy';
            // Include index if present
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              index = pathSegments[2];
            }
            break;
          case 'keyword':
            endpoint = 'keywords';
            extraPath = 'thesaurus';
            // Include index if present
            if (pathSegments[2] && !isNaN(pathSegments[2])) {
              index = pathSegments[2];
            }
            break;
          case 'constraint':
            endpoint = 'constraint';
            // Do not include index for constraint
            break;
          default:
            // For other resourceInfo properties, stay on main
            endpoint = 'main';
            break;
        }
      } else {
        endpoint = 'main';
      }
    } else if (pathSegments[0] === 'dataQuality') {
      endpoint = 'dataquality';
      // Include index if present
      if (pathSegments[1] && !isNaN(pathSegments[1])) {
        index = pathSegments[1];
      }
    } else if (pathSegments[0] === 'associatedResource') {
      endpoint = 'associated';
      // Include index if present
      if (pathSegments[1] && !isNaN(pathSegments[1])) {
        index = pathSegments[1];
      }
    } else if (pathSegments[0] === 'funding') {
      endpoint = 'funding';
      // Include index if present
      if (pathSegments[1] && !isNaN(pathSegments[1])) {
        index = pathSegments[1];
      }
    } else {
      // Other cases, stay on main or handle as needed
      endpoint = 'main';
    }

    // Build the URL
    let url = `/record/${recordId}/edit/${endpoint}`;
    if (extraPath) {
      url += `/${extraPath}`;
    }
    if (index !== null && endpoint !== 'constraint' && endpoint !== 'extent') {
      url += `/${index}`;
    }

    return url;
  },

  // Function to translate the error object
  translateError(error) {
    const errorObj = {
      type: error.keyword,
      heading: '',
      message: '',
      path: error.dataPath || '',
      endpoint: '',
      subErrors: [], // For grouping related errors
    };

    errorObj.endpoint = this.mapDataPathToEndpoint(error.dataPath);

    // Construct the error message and other properties
    switch (error.keyword) {
      case 'required':
        // Process required errors not part of anyOf
        errorObj.heading = 'Required Field';
        const x = error.dataPath ? error.dataPath.split('/').pop() : 'Metadata';
        const y = error.params.missingProperty;
        errorObj.message = `${x} should have required property '${y}'`;
        break;
      case 'anyOf':
        errorObj.heading = 'Validation Error';
        const fieldName = error.dataPath
          ? error.dataPath.split('/').pop()
          : 'Field';
        errorObj.message = `${fieldName} requires at least one of the following properties:`;

        // Use subErrors collected during processing
        if (error.subErrors && error.subErrors.length > 0) {
          errorObj.subErrors = error.subErrors.map((subError) => {
            if (subError.keyword === 'required') {
              return { message: `- ${subError.params.missingProperty}` };
            } else {
              return { message: `- ${subError.message}` };
            }
          });
        }
        break;
      case 'errorMessage':
        // Handle custom error messages
        const nestedErrors = error.params.errors || [];
        if (nestedErrors.length > 0) {
          const nestedError = nestedErrors[0];
          // Recursively translate the nested error
          const translatedNestedError = this.translateError(nestedError);
          errorObj.heading = translatedNestedError.heading;
          errorObj.message = translatedNestedError.message;
          errorObj.subErrors = translatedNestedError.subErrors;
          errorObj.path = translatedNestedError.path;
          errorObj.endpoint = translatedNestedError.endpoint;
        } else {
          // If no nested errors, use the error message
          errorObj.heading = 'Validation Error';
          errorObj.message = error.message;
        }
        break;
      default:
        errorObj.heading = 'Validation Error';
        errorObj.message = error.message;
        break;
    }

    return errorObj;
  },

  actions: {
    navigateToEndpoint(endpoint) {
      this.router.transitionTo(endpoint);
    },
  },
});
