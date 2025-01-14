'use strict';
(function () {
  var errorHandler = function () {
    var template = document.querySelector('#error').content.querySelector('.error');
    var erroContainer = document.querySelector('main');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(template);
    erroContainer.appendChild(fragment);
    var dialog = document.querySelector('.error');
    var dialogInner = dialog.querySelector('.error__inner');

    var closeErrorDialog = function () {
      dialog.remove();
    };

    var closeErrorOnEscape = function (evt) {
      if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
        closeErrorDialog();
      }
    };
    var closeErrorOnClick = function (evt) {
      var target = evt.target;
      if (target.classList.contains('error__button')) {
        closeErrorDialog();
      } else if (!dialogInner.contains(target)) {
        closeErrorDialog();
      }
    };

    document.addEventListener('keydown', closeErrorOnEscape);

    document.addEventListener('click', closeErrorOnClick);
  };
  window.errorHandler = errorHandler;
})();
