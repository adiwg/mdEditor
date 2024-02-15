import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class ProfileService extends Service {
  @service store;

  async loadDefaultProfiles() {}

  async fetchProfiles() {
    return this.store.findAll('profile');
  }

  async fetchProfileById(profileId) {
    return this.store.findRecord('profile', profileId);
  }

  async createProfile(profileData) {
    let newProfile = this.store.createRecord('profile', profileData);
    await newProfile.save();
    return newProfile;
  }

  async updateProfile(profileId, updatedData) {
    let profile = await this.store.findRecord('profile', profileId);
    Object.keys(updatedData).forEach((key) => {
      profile.set(key, updatedData[key]);
    });
    await profile.save();
    return profile;
  }

  async deleteProfile(profileId) {
    let profile = await this.store.findRecord('profile', profileId, {
      backgroundReload: false,
    });
    await profile.destroyRecord();
  }
}
