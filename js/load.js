'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_SUCCESS = 200;
  var MAX_TIMEOUT = 10000;
  var responseData = null;
  window.responseData = responseData;
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var filterBlock = this.document.querySelector('.img-filters');
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        window.responseData = xhr.response;
        window.originData = xhr.response;
        onSuccess(window.responseData);
        filterBlock.classList.remove('img-filters--inactive');
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = MAX_TIMEOUT; // 10s

    xhr.send();
  };
})();
