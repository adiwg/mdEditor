import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { isNone } from '@ember/utils';
import { get, action } from '@ember/object';
import ScrollTo from 'mdeditor/mixins/scroll-to';

@classic
export default class IndexRoute extends Route.extend(ScrollTo) {
  afterModel(model) {
    super.afterModel(...arguments);

    if (isNone(get(model, 'json.metadata.metadataInfo.parentMetadata'))) {
      this.flashMessages.warning(
        'No Parent Citation found! Re-directing to Metadata...'
      );
      this.replaceWith('record.show.edit.metadata', {
        queryParams: {
          scrollTo: 'parent-metadata',
        },
      });
    }

    return model;
  }

  @action
  editIdentifier(index) {
    this.transitionTo(
      'record.show.edit.metadata.parent.identifier',
      index
    ).then(
      function () {
        this.setScrollTo('identifier');
      }.bind(this)
    );
  }
}