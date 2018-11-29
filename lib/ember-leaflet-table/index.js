/* eslint-env node */
'use strict';
module.exports = {
  name: 'ember-leaflet-table',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };

    this._super.included.apply(this, arguments);

    app.import('node_modules/text-encoding/lib/encoding.js');

    app.import('node_modules/leaflet-draw/dist/leaflet.draw.js');
    app.import('node_modules/leaflet-draw/dist/leaflet.draw.css');

    app.import('node_modules/Leaflet.vector-markers/dist/leaflet-vector-markers.js');
    app.import('node_modules/Leaflet.vector-markers/dist/leaflet-vector-markers.css');

    app.import('node_modules/leaflet-draw/dist/images/spritesheet.svg', {destDir: 'assets/images'});
    app.import('node_modules/leaflet-draw/dist/images/spritesheet.png', {destDir: 'assets/images'});
    app.import('node_modules/leaflet-draw/dist/images/spritesheet-2x.png', {destDir: 'assets/images'});

  }
};
