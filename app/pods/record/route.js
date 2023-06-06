import Route from '@ember/routing/route';

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
