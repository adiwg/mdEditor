/*jshint node:true*/
module.exports = {
  name: 'ember-leaflet-table',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    this._super.included(target);

    app.import(app.bowerDirectory + '/text-encoding/lib/encoding.js');

    app.import(app.bowerDirectory + '/leaflet-draw/dist/leaflet.draw.js');
    app.import(app.bowerDirectory + '/leaflet-draw/dist/leaflet.draw.css');

    app.import(app.bowerDirectory + '/Leaflet.vector-markers/dist/leaflet-vector-markers.js');
    app.import(app.bowerDirectory + '/Leaflet.vector-markers/dist/leaflet-vector-markers.css');

    app.import(app.bowerDirectory + '/leaflet-draw/dist/images/spritesheet.svg', {destDir: 'assets/images'});
    app.import(app.bowerDirectory + '/leaflet-draw/dist/images/spritesheet.png', {destDir: 'assets/images'});
    app.import(app.bowerDirectory + '/leaflet-draw/dist/images/spritesheet-2x.png', {destDir: 'assets/images'});
  }
};
