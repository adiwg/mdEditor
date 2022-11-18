import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('dashboard');
  this.route('export');
  this.route('import');
  this.route('translate');
  //this.route('publish', function() {});
  this.route('help');
  this.route('settings', function() {
    this.route('validation');
    this.route('profile', function() {
      this.route('manage');
    });
    this.route('main');
  });

  //records
  this.route('records');
  //record
  this.route('record', function () {
    this.route('new', function () {
      this.route('id', {
        path: '/:record_id'
      });
    });
    this.route('show', {
        path: ':record_id'
      },
      function () {
        this.route('edit', function () {
          this.route('metadata', function () {
            this.route('identifier');
            this.route('parent', function () {
              this.route('identifier', {
                path: 'identifier/:identifier_id'
              });
            });

            this.route('alternate', {
              path: 'alternate/:citation_id'
            }, function () {
              // this.route('index', {
              //   path: 'alternate/:citation_id'
              // });
              this.route('identifier', {
                path: 'identifier/:identifier_id'
              });
            });
          });
          this.route('keywords', function () {
            this.route('thesaurus', {
              path: 'thesaurus/:thesaurus_id'
            });
          });
          this.route('extent', function () {
            this.route('spatial', {
              path: 'spatial/:extent_id'
            });
          });
          this.route('lineage', function () {
            this.route('lineageobject', {
              path: ':lineage_id'
            }, function () {
              this.route('citation', {
                path: 'citation/:citation_id'
              }, function () {
                this.route('identifier', {
                  path: 'identifier/:identifier_id'
                });
              });
              this.route('step', {
                path: 'step/:step_id'
              }, function () {
                this.route('citation', {
                  path: 'citation/:citation_id'
                });
              });
              this.route('source', {
                path: 'source/:source_id'
              }, function () {});
            });
          });
          this.route('distribution', function () {
            this.route('distributor', {
              path: ':distribution_id/distributor/:distributor_id'
            }, function () {
              this.route('transfer', {
                path: 'transfer/:transfer_id'
              });
            });
          });
          this.route('associated', function () {
            this.route('resource', {
              path: ':resource_id'
            }, function () {});
          });
          this.route('documents', function () {
            this.route('citation', {
              path: 'documents/:citation_id'
            }, function () {});
          });
          this.route('dataquality', function () {
            this.route('edit', {
              path: ':data_quality_id'
            }, function () {});
          });
          this.route('coverages');
          this.route('grid');
          this.route('main', function () {
            this.route('citation', function () {
              this.route('identifier', {
                path: 'identifier/:identifier_id'
              });
            });
          });
          this.route('funding', function () {
            this.route('allocation', {
              path: ':allocation_id'
            });
          });
          this.route('dictionary');
          this.route('spatial', function () {
            this.route('raster', {
              path: 'raster/:raster_id'
            }, function () {
              this.route('attribute', {
                path: ':attrgroup_id/attribute/:attribute_id'
              });
            })
          });
          this.route('constraint', function () {});
          this.route('taxonomy', function () {
            this.route('collection', {
              path: ':collection_id'
            }, function () {
              this.route('itis');
              this.route('system', {
                path: 'system/:system_id'
              }, function () {});
            });
          });
        });
        this.route('translate');
      }
    );
  });
  //contacts
  this.route('contacts');
  //contact
  this.route('contact', function () {
    this.route('new', function () {
      this.route('id', {
        path: '/:contact_id'
      });
    });

    this.route('show', {
      path: ':contact_id'
    }, function () {
      this.route('edit');
    });

  });
  //dictionary
  this.route('dictionaries');
  //dictionary
  this.route('dictionary', function () {
    this.route('new', function () {
      this.route('id', {
        path: '/:dictionary_id'
      });
    });
    this.route('show', {
      path: ':dictionary_id'
    }, function () {
      this.route('edit', function () {
        this.route('citation', function () {
          this.route('identifier', {
            path: 'identifier/:identifier_id'
          });
        });
        this.route('domain', function () {
          this.route('edit', {
            path: ':domain_id'
          }, function () {
            this.route('citation', function () {
              this.route('identifier', {
                path: 'identifier/:identifier_id'
              });
            });
            this.route('item', {
              path: 'item/:item_id'
            });
          });
        });
        this.route('entity', function () {
          this.route('edit', {
            path: ':entity_id'
          }, function () {
            this.route('citation', {
              path: 'citation/:citation_id'
            }, function () {
              this.route('identifier', {
                path: 'identifier/:identifier_id'
              });
            });
            this.route('attribute', {
              path: 'attribute/:attribute_id'
            }, function () {});
          });
          this.route('import');
        });
      });
    });
  });

  this.route('not-found', {
    path: '/*path'
  });
  this.route('error');
});

export default Router;
