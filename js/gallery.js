'use strict';

(function () {
  var successHandler = function (data) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var element = template.cloneNode(true);
      element.querySelector('.picture__img').src = data[i].url;
      element.querySelector('.picture__comments').textContent = data[i].comments.length;
      element.querySelector('.picture__likes').textContent = data[i].likes;
      fragment.appendChild(element);
    }
    picturesContainer.appendChild(fragment);
  };
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
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.esc) {
        closeErrorDialog();
      }
    });

    document.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('error__button')) {
        closeErrorDialog();
      } else if (!dialogInner.contains(target)) {
        closeErrorDialog();

      }
    });
  };

  window.load(successHandler, errorHandler);
})();
