import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class ProfileDefinitionService extends Service {
  @service store;

  // Fetch all profile definitions
  async fetchProfileDefinitions() {
    return this.store.findAll('profile-definition');
  }

  // Fetch a single profile definition by ID
  async fetchProfileDefinitionById(definitionId) {
    return this.store.findRecord('profile-definition', definitionId);
  }

  // Create a new profile definition
  async createProfileDefinition(definitionData) {
    let newDefinition = this.store.createRecord(
      'profile-definition',
      definitionData
    );
    await newDefinition.save();
    return newDefinition;
  }

  // Update an existing profile definition
  async updateProfileDefinition(definitionId, updatedData) {
    let definition = await this.store.findRecord(
      'profile-definition',
      definitionId
    );
    Object.keys(updatedData).forEach((key) => {
      definition.set(key, updatedData[key]);
    });
    await definition.save();
    return definition;
  }
}
