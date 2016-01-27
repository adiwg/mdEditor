import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('save');
  this.route('import');
  this.route('translate');
  this.route('publish');
  this.route('help');
  //records
  this.route('records');
  this.route('records.new', {
    path: 'records/new'
  });
  this.route('show', {
    path: 'records/:record_id'
  });

  this.route('edit', {
    path: 'records/:record_id/edit'
  }, function() {
    this.route('keywords', {
      path: 'records/:record_id/keywords'
    });

    this.route('spatial', {
      path: 'records/:record_id/spatial'
    });

    this.route('quality', {
      path: 'records/:record_id/quality'
    });

    this.route('distribution', {
      path: 'records/:record_id/distribution'
    });

    this.route('associated', {
      path: 'records/:record_id/associated'
    });

    this.route('documents', {
      path: 'records/:record_id/documents'
    });

    this.route('dictionaries', {
      path: 'records/:record_id/dictionaries'
    });

    this.route('coverages', {
      path: 'records/:record_id/coverages'
    });

    this.route('grid', {
      path: 'records/:record_id/grid'
    });
  });
  //contacts
  this.route('contacts', function() {
    this.route('new');

    this.route('show', {
      path: 'contacts/:contact_id/show'
    });

    this.route('edit', {
      path: 'contacts/:contact_id/edit'
    });
  });
  //dictionaries
  this.route('dictionaries', function() {
    this.route('new');

    this.route('show', {
      path: 'dictionaries/:dictionary_id/show'
    });

    this.route('edit', {
      path: 'dictionaries/:dictionary_id/edit'
    });

    this.route('domains', {
      path: 'dictionaries/:dictionary_id/domains'
    });

    this.route('entities', {
      path: 'dictionaries/:dictionary_id/entities'
    });
  });
});

export default Router;
