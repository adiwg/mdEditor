import mdCalcStorage from 'mdeditor/utils/md-calc-storage';

export function initialize(application) {
  const storageSize = mdCalcStorage(window.localStorage);

  let appDefer = () => {
    document.getElementsByClassName('md-load-indicator')[0].classList.add('hidden')
    document.getElementsByClassName('md-alert-boot')[0].classList.remove('hidden');
    application.deferReadiness()
  }

  let dismissMessage = () => {
    document.getElementsByClassName('md-load-indicator')[0].classList.remove('hidden')
    document.getElementsByClassName('md-alert-boot')[0].classList.add('hidden');
    application.advanceReadiness()
  }

  if (storageSize >= 5000) {
    appDefer()
  }


  document.getElementsByClassName('md-alert-dismiss')[0].addEventListener('click', dismissMessage)
}

export default {
  initialize
};
