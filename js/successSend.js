'use strict';

(function () {
  var successFormSend = function () {
    window.closePopup();
    var template = document.querySelector('#success').content.querySelector('.success');
    var successContainer = document.querySelector('main');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(template);
    successContainer.appendChild(fragment);
    var dialog = document.querySelector('.success');
    var dialogInner = dialog.querySelector('.success__inner');

    var closeSuccessDialog = function () {
      dialog.remove();
    };

    var escapePressListener = function (evt) {
      if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
        closeSuccessDialog();
      }
    };
    var errorCloseEventListener = function (evt) {
      var target = evt.target;
      if (target.classList.contains('success__button')) {
        closeSuccessDialog();
      } else if (!dialogInner.contains(target)) {
        closeSuccessDialog();
      }
    };

    document.addEventListener('keydown', escapePressListener);

    document.addEventListener('click', errorCloseEventListener);
  };
  window.successFormSend = successFormSend;
})();
