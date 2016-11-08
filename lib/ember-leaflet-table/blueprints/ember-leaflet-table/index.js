module.exports = {
  description: 'add leaflet addon bower packages',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function () {
    return this.addBowerPackageToProject([{
      name: 'leaflet-draw',
      target: 'chugcup/Leaflet.draw#master'
    }, {
      name: 'Leaflet.vector-markers',
      target: 'hiasinho/Leaflet.vector-markers#master'
    }, {
      name:'text-encoding',
      target:'0.6'
    }]);
  }
};
