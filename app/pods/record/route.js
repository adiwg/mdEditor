import Route from '@ember/routing/route';
import axios from 'axios';
import ENV from 'mdeditor/config/environment';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  },

  model() {
    console.log(ENV);
    if (ENV.profilesListUrl) {
      return axios.get(ENV.profilesListUrl).then((profilesListResponse) => {
        const profilesList = profilesListResponse.data;
        const promiseArray = [];
        profilesList.forEach((profileItem) => {
          promiseArray.push(axios.get(profileItem.url));
        });
        return Promise.all(promiseArray).then((responseArray) => {
          for (const response of responseArray) {
              this.store.createRecord('profile', response.data);
          }
        });
      });
    }
  }
});
