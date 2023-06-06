import Route from '@ember/routing/route';
import axios from 'axios';

const profilesListUrl = 'https://s3.amazonaws.com/sit-cdn.xentity/mdeditor/profilesList.json';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.breadCrumb = {
      title: 'Record',
      linkable: false
    }
  },

  model() {
    return axios.get(profilesListUrl).then((profilesListResponse) => {
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
});
