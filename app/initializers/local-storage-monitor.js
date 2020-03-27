// import { mdObjectSize } from 'mdeditor/utils/md-object-size';

export function initialize(/*application*/ ) {
  // const localStorageSize = mdObjectSize(window.localStorage)

  // let appReady = () => {
  //   application.advanceReadiness();
  //   document.getElementsByClassName('md-alert-boot')[0].classList.add('hidden');
  //   document.getElementsByClassName('md-load-indicator')[0].classList.remove('hidden');
  // }

  // let appDefer = () => {
  //   application.deferReadiness();
  //   document.getElementsByClassName('md-load-indicator')[0].classList.add('hidden');
  //   document.getElementsByClassName('md-alert-boot')[0].classList.remove('hidden');
  // }


  // if (localStorageSize < 0) {
  //   appReady()
  // } else {
  //   appDefer()
  //   setTimeout(() => {
  //     appReady()
  //   }, 15000);
  // }
}

export default {
  name: "local-storage-monitor",
  after: "local-storage-export",
  initialize
};
