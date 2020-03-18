import mdCalcStorage from 'mdeditor/utils/md-calc-storage';

export function initialize(application) {


  let appDefer = () => {
    document.getElementsByClassName('md-load-indicator')[0].classList.add('hidden')
    document.getElementsByClassName('md-alert-boot')[0].classList.remove('hidden');
    application.deferReadiness()

    setTimeout(() => {
      dismissMessage()
    }, 30000);
  }

  let dismissMessage = () => {
    document.getElementsByClassName('md-load-indicator')[0].classList.remove('hidden')
    document.getElementsByClassName('md-alert-boot')[0].classList.add('hidden');
    application.advanceReadiness()
  }

  const storageSize = mdCalcStorage(window.localStorage);

  if (storageSize >= 5000) {
    appDefer()
  }
}

export default {
  name: 'storage-monitor',
  after: 'local-storage-export',
  initialize: initialize
};
