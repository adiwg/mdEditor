import Component from '@ember/component';

import { set } from '@ember/object'

export default Component.extend({
  actions: {
    deleteReport(index) {
      set(this, 'model', this.model.slice(index));
    },
    addReport() {
      if (this.model == null) {
        set(this, 'model', [{}]);
      } else {
        set(this, 'model', [...this.model, {}])
      }
    },

    addToReport(objectKey, index) {
      set(this, 'model', this.model.map((item, i) =>
        i === index ? {
          ...item,
          [objectKey]: [
            ...(item[objectKey] || []),
            {}
          ]
        } : item
      ));
    },

    removeFromReport(objectKey, reportIndex, objectIndex) {
      set(this, 'model', this.model.map((item, i) =>
        i === reportIndex ? {
          ...item,
          [objectKey]: item[objectKey].filter((item, i) => i !== objectIndex)
        } : item
      ));
    },

    addQualityMeasureToReport(index) {
      set(this, 'model', this.model.map((item, i) =>
        i === index ? {
          ...item,
          qualityMeasure: {}
        } : item
      ));
    },

    removeQualityMeasureFromReport(index) {
      set(this, 'model', this.model.map((item, i) =>
        i === index ? {
          ...item,
          qualityMeasure: undefined
        } : item
      ));
    }
  }
})
