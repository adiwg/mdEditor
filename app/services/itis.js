import Service from '@ember/service';
import {
  inject as service
} from '@ember/service';
import {
  get,
  set,
  computed
} from '@ember/object';
import titleize from 'ember-cli-string-helpers/utils/titleize';
import {
  isAjaxError,
  isNotFoundError,
  isForbiddenError
} from 'ember-ajax/errors';
import EmberObject from '@ember/object';
//import moment from 'moment';

const console = window.console;

const proxy =
  '/itis-proxy?' +
  'wt=json' +
  '&sort=score%20desc,nameWOInd%20asc' +
  '&fl=hierarchySoFarWRanks,hierarchyTSN,kingdom,rank,vernacular,tsn,nameWOInd,usage';

const Taxa = EmberObject.extend({
  style: computed('status', function () {
    let status = this.status;
    return status === 'valid' || status === 'accepted' ? 'success' :
      'danger';
  })
});

export default Service.extend({
  init() {
    this._super(...arguments);

    this.kingdoms = {
      "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomNameList",
      "kingdomNames": [{
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "1",
        "kingdomName": "Bacteria",
        "title": "Bacteria",
        "tsn": "50"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "2",
        "kingdomName": "Protozoa",
        "title": "Protozoa",
        "tsn": "630577"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "3",
        "kingdomName": "Plantae",
        "title": "Plant",
        "tsn": "202422"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "4",
        "kingdomName": "Fungi",
        "title": "Fungal",
        "tsn": "555705"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "5",
        "kingdomName": "Animalia",
        "title": "Animal",
        "tsn": "202423"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "6",
        "kingdomName": "Chromista",
        "title": "Chromista",
        "tsn": "630578"
      }, {
        "class": "gov.usgs.itis.itis_service.metadata.SvcKingdomName",
        "kingdomId": "7",
        "kingdomName": "Archaea",
        "title": "Archaea",
        "tsn": "935939"
      }]
    }

    this.citation = EmberObject.create({
      "title": "Integrated Taxonomic Information System (ITIS)",
      "date": [
        /*{
                "date": moment().format('YYYY-MM-DD'),
                "dateType": "transmitted"
              }*/
      ],
      "presentationForm": [
        "webService",
        "webSite"
      ],
      "otherCitationDetails": [
        "Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov."
      ],
      "onlineResource": [{
        "uri": "https://www.itis.gov",
        "name": "ITIS website",
        "protocol": "HTTPS",
        "function": "information",
        "description": "ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world."
      }],
      "graphic": [{
        "fileName": "itis_logo.jpg",
        "fileType": "JPEG",
        "fileUri": [{
          "uri": "https://itis.gov/Static/images/itis_logo.jpg"
        }]
      }]
    })
  },

  settings: service(),
  ajax: service(),
  flashMessages: service(),
  isLoading: false,

  sendQuery(searchString, kingdom, limit = 50) {
    let formatted = searchString.replace(/(-| )/g, '*');
    let titleized = titleize(searchString.replace(/(-)/g, '#')).replace(/( |#)/g, '*');
    let titleized2 = titleize(searchString).replace(/( )/g, '*');

    const baseUrl = this.settings.data.get('mdTranslatorAPI').replace('/api/v3/translator', '')

    let url = baseUrl + proxy +
      `&rows=${limit}&q=` +
      `(vernacular:*${formatted}*~0.5%20OR%20vernacular:*${titleized}*~0.5%20OR%20vernacular:*${titleized2}*~0.5` +
      `%20OR%20nameWOInd:${formatted}*~0.5%20OR%20nameWOInd:*${titleized}*~0.5` +
      `%20OR%20tsn:${formatted})` +
      (kingdom ? `%20AND%20kingdom:${kingdom}&` : '');

    return this.ajax.request(
      url, {
        method: 'GET'
      }).catch(error => {
      if(isNotFoundError(error)) {
        // handle 404 errors here
        console.log(error);
        this.flashMessages
          .warning('No taxa object found.');
        return;
      }

      if(isForbiddenError(error)) {
        // handle 403 errors here
        console.log(error);
        this.flashMessages
          .danger('Access to ITIS web service was denied.');
        return;
      }

      if(isAjaxError(error)) {
        // handle all other AjaxErrors here
        console.log(error);
        this.flashMessages
          .danger('An error occured during the ITIS query request.');
        return;
      }

      // other errors are handled elsewhere
      //throw error;
      console.log(error);
      this.flashMessages
        .danger('An error occured during the ITIS query request.');
    });
  },
  parseDoc(doc) {
    let {
      hierarchySoFarWRanks: ranks,
      hierarchyTSN,
      kingdom,
      nameWOInd: name,
      rank,
      tsn,
      vernacular,
      usage: status
    } = doc;
    let taxonomy = this.parseRanks(ranks, this.parseHierarchyTSN(
      hierarchyTSN));
    let common = this.parseVernacular(vernacular);

    if(common) {
      taxonomy.forEach(i => {
        let taxa = i.findBy('tsn', tsn);

        if(taxa) {
          set(taxa, 'common', common.mapBy('name'));
        }
      });
    }

    return Taxa.create({
      kingdom: kingdom,
      name: name,
      rank: rank,
      tsn: tsn,
      taxonomy: taxonomy,
      common: common,
      status: status
    });
  },
  parseHierarchyTSN(tsn) {
    return tsn.map(t => t.slice(1, t.length - 1).split('$'));
  },
  parseVernacular(vernacular) {
    if(!vernacular) {
      return null;
    }

    return vernacular.map((obj) => {
      let v = obj.slice(1, obj.length - 1).split('$');

      return {
        name: v[0],
        language: v[1]
      };
    });
  },
  parseRanks(ranks, tsn) {
    return ranks.map((itm, i) => {
      let split = itm.split('$');
      let tsnArray = tsn[i];

      split.shift();
      split.pop();

      return split.map((obj, idx) => {
        let rank = obj.split(':');

        return {
          rank: rank[0],
          value: rank[1],
          order: idx,
          tsn: tsnArray[idx]
        };
      });
    });
  },
  getBranch(taxon, branches) {
    let branch = branches.filterBy('taxonomicLevel', taxon.rank).findBy(
      'taxonomicName', taxon.value);

    if(!branch) {
      return branches.pushObject({
        "taxonomicSystemId": taxon.tsn,
        "taxonomicLevel": taxon.rank,
        "taxonomicName": taxon.value,
        "commonName": taxon.common,
        "subClassification": [],
        "isITIS": true
      });
    }

    return branch;
  },
  mergeTaxa(taxa, tree) {
    taxa.reduce((tree, taxon) => {
      let branch = this.getBranch(taxon, tree);
      let sub = get(branch, 'subClassification');

      if(!sub) {
        set(branch, 'subClassification', []);
      }

      return get(branch, 'subClassification');
    }, tree);
  }
});
