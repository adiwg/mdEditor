import classic from 'ember-classic-decorator';
import Service from '@ember/service';

@classic
export default class IconService extends Service {
  dataset = 'globe';
  series = 'list-ol';
  nonGeographicDataset = 'bar-chart';
  feature = 'map-marker';
  software = 'desktop';
  service = 'exchange';
  model = 'cubes';
  tile = 'th-large';
  metadata = 'file-code-o';
  initiative = 'checklist';
  sample = 'flask';
  document = 'file';
  repository = 'database';
  aggregate = 'sitemap';
  collection = 'files-o';
  coverage = 'th';
  application = 'android';
  sciencePaper = 'flask';
  userGuide = 'life-saver';
  dataDictionary = 'book';
  website = 'chrome';
  publication = 'file-text-o';
  report = 'file-text-o';
  awardInfo = 'copy';
  collectionSite = 'map-marker';
  project = 'wrench';
  factSheet = 'copy';
  tabularDataset = 'table';
  map = 'map-o';
  drawing = 'picture-o';
  photographicImage = 'camera';
  presentation = 'file-powerpoint-o';
  defaultFile = 'copy';
  defaultList = 'caret-right';
  individuals = 'user';
  organizations = 'users';
}
