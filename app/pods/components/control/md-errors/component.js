// component.js

import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  router: service(),
  slider: service(),
  classNames: ['md-error-list'],

  init() {
    this._super(...arguments);

    console.log('Errors:', this.errors);

    this.formattedErrors = [];

    // Process each error group (default and custom)
    this.errors.forEach((errorGroup) => {
      let title = errorGroup.title || 'Validation Errors';
      let errors = errorGroup.errors || [];

      // Preprocess and transform errors
      let transformedErrors = this.transformErrors(errors);

      this.formattedErrors.push({
        title: title,
        errors: transformedErrors,
      });
    });
  },

  // Extract the record ID from the current URL
  recordId: computed('router.currentURL', function () {
    const url = this.router.currentURL;
    const match = url.match(/\/record\/([^\/]+)\//);
    return match ? match[1] : null;
  }),

  // Function to preprocess and transform errors
  transformErrors(errors) {
    // First, group compound errors (anyOf, oneOf, etc.) with their related errors
    let groupedErrors = this.groupCompoundErrors(errors);

    // Transform each error into a consistent format
    return groupedErrors.map((error) => this.handleError(error));
  },

  // Group compound errors (anyOf, oneOf, etc.) with their related errors
  groupCompoundErrors(errors) {
    let groupedErrors = [];
    let processedErrors = new Set();

    for (let i = 0; i < errors.length; i++) {
      let error = errors[i];

      if (processedErrors.has(error)) {
        continue;
      }

      if (error.keyword === 'anyOf' || error.keyword === 'oneOf') {
        let relatedErrors = [];

        // Get the schemaPath of the anyOf/oneOf error
        let schemaPath = error.schemaPath;

        // Look back at preceding errors
        for (let j = i - 1; j >= 0; j--) {
          let prevError = errors[j];

          if (processedErrors.has(prevError)) {
            continue;
          }

          // Check if the previous error's schemaPath starts with the anyOf/oneOf schemaPath
          if (prevError.schemaPath.startsWith(schemaPath + '/')) {
            relatedErrors.unshift(prevError); // Use unshift to maintain order
            processedErrors.add(prevError);
          } else {
            // Stop if we reach an error that is not related
            break;
          }
        }

        error.relatedErrors = relatedErrors;
        groupedErrors.push(error);
        processedErrors.add(error);
      } else {
        if (!processedErrors.has(error)) {
          groupedErrors.push(error);
          processedErrors.add(error);
        }
      }
    }

    return groupedErrors;
  },

  // Main error handling function
  handleError(error) {
    // If the error is an 'errorMessage', extract the actual error
    if (error.keyword === 'errorMessage') {
      return this.handleErrorMessageError(error);
    }

    // Use the appropriate handler based on the keyword
    let handler = this.errorHandlers[error.keyword] || this.handleUnknownError;
    return handler.call(this, error);
  },

  // Handler for 'errorMessage' errors
  handleErrorMessageError(error) {
    let actualError = error.params.errors[0];
    // Use the actual keyword for the type
    actualError.dataPath = actualError.dataPath || error.dataPath;

    let transformedError = this.handleError(actualError);

    // Use the message from the original 'errorMessage' error
    transformedError.messages = [error.message || transformedError.message];

    return transformedError;
  },

  // Handlers for different error types
  errorHandlers: {
    required(error) {
      let missingProperty = error.params.missingProperty;
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'required',
        header: `Required Field: ${missingProperty}`,
        messages: [
          `The '${missingProperty}' field is required in ${propertyName}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    minItems(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let limit = error.params.limit;

      return {
        type: 'minItems',
        header: `Minimum Items Required for ${propertyName}`,
        messages: [
          `Should not have fewer than ${limit} items in ${propertyName}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    contains(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'contains',
        header: `Contains Error in ${propertyName}`,
        messages: [error.message],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    const(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'const',
        header: `Constant Value Mismatch in ${propertyName}`,
        messages: [error.message],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    anyOf(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let messages = [];

      if (error.relatedErrors && error.relatedErrors.length > 0) {
        // Transform related errors
        messages = error.relatedErrors.map((e) => {
          let transformed = this.handleError(e);
          return transformed.messages[0];
        });
      } else {
        messages.push(error.message);
      }

      return {
        type: 'anyOf',
        header: `One of Multiple Fields Required in ${propertyName}`,
        messages: messages,
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'type' keyword
    type(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let expectedType = error.params.type;

      return {
        type: 'type',
        header: `Invalid Type in ${propertyName}`,
        messages: [`Expected type '${expectedType}' in ${propertyName}.`],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'oneOf' keyword
    oneOf(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let messages = [];

      if (error.relatedErrors && error.relatedErrors.length > 0) {
        // Transform related errors
        messages = error.relatedErrors.map((e) => {
          let transformed = this.handleError(e);
          return transformed.messages[0];
        });
      } else {
        messages.push(error.message);
      }

      return {
        type: 'oneOf',
        header: `One of Multiple Schemas Must Be Valid in ${propertyName}`,
        messages: messages,
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'not' keyword
    not(error) {
      let propertyName = this.getPropertyName(error.dataPath);

      return {
        type: 'not',
        header: `Invalid Value in ${propertyName}`,
        messages: [
          error.message,
          'Details are limited for this error. Resolving related errors might fix this issue.',
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },

    // Handler for 'enum' keyword
    enum(error) {
      let propertyName = this.getPropertyName(error.dataPath);
      let allowedValues = error.params.allowedValues.join(', ');

      return {
        type: 'enum',
        header: `Invalid Value in ${propertyName}`,
        messages: [
          `Value should be one of the allowed values: ${allowedValues}.`,
        ],
        path: error.dataPath,
        url: this.mapDataPathToEndpoint(error.dataPath),
      };
    },
  },

  // Handler for unknown error types
  handleUnknownError(error) {
    let propertyName = this.getPropertyName(error.dataPath);

    return {
      type: error.keyword,
      header: `Validation Error in ${propertyName}`,
      messages: [error.message],
      path: error.dataPath,
      url: this.mapDataPathToEndpoint(error.dataPath),
    };
  },

  // Helper function to extract a human-readable property name from the dataPath
  getPropertyName(dataPath) {
    if (!dataPath) {
      return 'the record';
    }

    // Convert dataPath to a human-readable form
    let pathSegments = dataPath.split('/').filter((segment) => segment);

    // Map known segments to friendly names
    let friendlyNames = {
      metadata: 'Metadata',
      metadataInfo: 'Metadata',
      resourceInfo: 'Main',
      contact: 'Contacts',
      keyword: 'Keywords',
      extent: 'Extent',
      taxonomy: 'Taxonomy',
      constraint: 'Constraints',
      associatedResource: 'Associated Resources',
      citation: 'Citation',
      abstract: 'Abstract',
      timePeriod: 'Time Period',
      status: 'Status',
      pointOfContact: 'Point of Contact',
      type: 'Type',
      dataQuality: 'Data Quality',
      report: 'Report',
      // Add more mappings as needed
    };

    let propertyName = pathSegments
      .map((segment) => friendlyNames[segment] || segment)
      .join(' > ');

    if (propertyName.startsWith('Metadata > ')) {
      propertyName = propertyName.replace('Metadata > ', '');
    }

    return propertyName;
  },

  // Map data paths to endpoints for the 'Go To Error' button
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
            } else {
              // When index is missing, default to index 0
              index = '0';
            }
            break;
          case 'constraint':
            endpoint = 'constraint';
            // Do not include index for constraint
            break;
          case 'citation':
          case 'abstract':
          case 'timePeriod':
          case 'status':
          case 'pointOfContact':
            endpoint = 'main';
            break;
          default:
            endpoint = 'main';
            break;
        }
      } else {
        endpoint = 'main';
      }
    } else if (pathSegments[0] === 'contact') {
      // Special case for contacts
      return '/contacts';
    } else if (pathSegments[0] === 'dataQuality') {
      endpoint = 'dataquality';
      // Include index if present
      if (pathSegments[1] && !isNaN(pathSegments[1])) {
        index = pathSegments[1];
      } else {
        index = '0'; // Default to the first data quality item
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
    if (index !== null && endpoint !== 'extent') {
      url += `/${index}`;
    }

    return url;
  },

  closeSlider() {
    this.slider.set('fromName', 'md-slider-error');
    this.slider.toggleSlider(false);
  },

  actions: {
    navigateToEndpoint(url) {
      this.closeSlider();
      this.router.transitionTo(url);
    },
  },
});
