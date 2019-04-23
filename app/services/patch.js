import Service from '@ember/service';
import {
  get,
  getWithDefault,
  set,
  setProperties
} from '@ember/object';
import {
  isArray,
  A
} from '@ember/array';
import Schemas from 'mdjson-schemas/resources/js/schemas';

export default Service.extend({
  applyModelPatch(record) {
    let type = record.constructor.modelName;

    switch(type) {
    case 'contact':
      record.get('json.address')
        .forEach(itm => {
          let oldAdm = get(itm, 'adminstrativeArea');

          if(oldAdm) {
            set(itm, 'administrativeArea', oldAdm);
            set(itm, 'adminstrativeArea', null);
          }
        });

      record.set('json.memberOfOrganization', A(record.get(
        'json.memberOfOrganization')).uniq());
      record.save().then(function () {
        record.notifyPropertyChange('currentHash');
      });

      break;
    case 'record':
      {
        //fix lineage
        let lineage = record.get('json.metadata.resourceLineage');

        if(isArray(lineage)) {
          lineage.forEach(itm => {
            let source = get(itm, 'source');

            if(isArray(source)) {
              source.forEach(src => {
                set(src, 'description', getWithDefault(src,
                  'description', get(src, 'value')));
                set(src, 'value', null);
              });
              record.save().then(function () {
                record.notifyPropertyChange('currentHash');
              });
            }

            let step = get(itm, 'processStep');

            if(isArray(step)) {
              step.forEach(step => {
                let source = get(step, 'stepSource');

                if(isArray(source)) {
                  source.forEach(src => {
                    set(src, 'description', getWithDefault(src,
                      'description', get(src, 'value')));
                    set(src, 'value', null);
                  });
                  record.save().then(function () {
                    record.notifyPropertyChange('currentHash');
                  });
                }
              });
            }
          });
        }
        //fix taxonomy
        let taxonomy = record.get('json.metadata.resourceInfo.taxonomy');

        if(taxonomy) {
          if(!isArray(taxonomy)) {
            taxonomy = [taxonomy];
            record.set('json.metadata.resourceInfo.taxonomy', taxonomy);
          }

          taxonomy.forEach(itm => {
            let classification = get(itm, 'taxonomicClassification');

            if(classification && !isArray(classification)) {
              let fixNames = (taxon) => {
                taxon.taxonomicName = taxon.taxonomicName || taxon.latinName;
                taxon.taxonomicLevel = taxon.taxonomicLevel || taxon.taxonomicRank;

                if(isArray(taxon.subClassification)) {
                  taxon.subClassification.forEach(t => fixNames(t));
                }
              };

              fixNames(classification);
              set(itm, 'taxonomicClassification', [classification]);

              let refs = get(itm, 'identificationReference');

              if(isArray(refs)) {
                let fixedRefs = [];

                refs.forEach(ref => {
                  fixedRefs.pushObject({
                    "identifier": [ref]
                  });
                });
                set(itm, 'identificationReference', fixedRefs);
              }
            }
          });
        }

        //fix srs identifiers
        let srs = record.get(
          'json.metadata.resourceInfo.spatialReferenceSystem');

        if(srs) {
          srs.forEach(itm => {
            let projObj = get(itm,
              'referenceSystemParameterSet.projection');
            let geoObj = get(itm,
              'referenceSystemParameterSet.geodetic');
            let vertObj = get(itm,
              'referenceSystemParameterSet.verticalDatum');

            if(projObj) {
              let {
                projection,
                projectionName,
                projectionIdentifier
              } = projObj;

              if(!projectionIdentifier || projection) {
                set(projObj, 'projectionIdentifier', {
                  identifier: projection,
                  name: projectionName
                });

                setProperties(projObj, {
                  projection: null,
                  projectionName: null
                });
              }
            }

            if(geoObj && (geoObj.datumName || geoObj.ellipsoidName)) {
              if(geoObj.datumName) {
                set(geoObj,'datumIdentifier', {
                  identifier: geoObj.datumName
                });
              }

              if(geoObj.ellipsoidName) {
                set(geoObj,'ellipsoidIdentifier', {
                  identifier: geoObj.ellipsoidName
                });
              }

              setProperties(geoObj, {
                datumName: null,
                ellipsoidName: null
              });
            }

            if(vertObj && vertObj.datumName) {
              if(vertObj.datumName) {
                set(vertObj,'datumIdentifier', {
                  identifier: vertObj.datumName
                });
              }

              set(vertObj, 'datumName', null);
            }
          });
        }

        //fix transfer format edition
        let distribution = record.get(
          'json.metadata.resourceDistribution');

        if(distribution) {
          distribution.forEach(itm => {
            if(itm.distributor) {
              itm.distributor.forEach(itm => {
                if(itm.transferOption) {
                  itm.transferOption.forEach(itm => {
                    if(itm.distributionFormat) {
                      itm.distributionFormat.forEach(format => {
                        if(format.amendmentNumber && format.formatSpecification &&
                          !format.formatSpecification.edition) {
                          set(format, 'formatSpecification.edition',
                            format.amendmentNumber);
                          return;
                        }
                        if(format.amendmentNumber && !format.formatSpecification) {
                          set(format, 'formatSpecification', {
                            edition: format.amendmentNumber
                          });
                          return;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }

        //fix allocation comment
        let funding = record.get(
          'json.metadata.funding');

        if(funding) {
          funding.forEach(itm => {
            if(itm.allocation) {
              itm.allocation.forEach(itm => {
                if(itm.description && !itm.comment) {
                  set(itm, 'comment', itm.description);
                  set(itm, 'description', null);
                }
              });
            }
          });
        }

        record.set('json.schema.version', Schemas.schema.version);
        record.save().then(function () {
          record.notifyPropertyChange('currentHash');
        });

        break;
      }
    }
  }
});
