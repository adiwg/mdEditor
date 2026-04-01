/**
 * @module mdeditor
 * @submodule components-input
 */

import EmberObject from '@ember/object';

import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class MdSelectThesaurusComponent extends Component {
  /**
   * A select list control for displaying and selecting thesaurus entries from
   * the keyword service.
   *
   * @class md-select-thesaurus
   * @constructor
   */
  @service profile;
  @service keyword;

  /**
   * This method is called after the thesaurus selection is updated. It should be
   * overridden.
   *
   * @method selectThesaurus
   * @param  {Object} selected  The selected thesaurus from the keyword service
   * @param  {Object} thesaurus The thesaurus for the keyword record
   */
  selectThesaurus() {}

  get thesaurusList() {
    const profiles = this.profile?.profiles || [];
    const profileConfig = profiles.find((p) => {
      return p.id === this.recordProfile;
    });
    const profileThesauri = profileConfig?.thesauri || [];
    const keywordThesaurus = this.keyword?.thesaurus || [];
    const keywordManifest = this.keyword?.manifest || [];

    const list = keywordThesaurus
      .filter((k) => {
        if (profileThesauri && profileThesauri.length > 0) {
          return profileThesauri.some((v) => {
            const manifestEntry = keywordManifest.find((t) => t.url === v.url);
            if (!manifestEntry) return false;
            const thesaurusId = k?.citation?.identifier?.[0]?.identifier;
            return manifestEntry.identifier === thesaurusId;
          });
        } else {
          return k.isDefault;
        }
      })
      .map((k) => {
        return EmberObject.create({
          id: k?.citation?.identifier?.[0]?.identifier,
          label: k.label || k.citation.title || 'Keywords',
          tooltipText: k.citation.description || 'No description available.',
        });
      })
      .filter((k) => !!k.id)
      .sort((a, b) => {
        return a.label.localeCompare(b.label);
      });

    list.unshift(
      EmberObject.create({
        id: 'custom',
        label: 'Custom Thesaurus',
        tooltipText:
          'Select this option to use a custom thesaurus that you define yourself. This allows you to use your own set of keywords and categories that are specific to your project.',
      })
    );
    return list;
  }

  @action
  update(id, thesaurus) {
    let selectedId = id ?? this.value;
    let selectedThesaurus = thesaurus ?? this.thesaurus;
    let selected = this.keyword.findById(selectedId);

    this.selectThesaurus(selected, selectedThesaurus);
  }
}
