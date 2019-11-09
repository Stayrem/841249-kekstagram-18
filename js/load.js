'use strict';

(function () {

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var filterBlock = document.querySelector('.img-filters');
    xhr.responseType = 'json';

    xhr.open('GET', window.constants.URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.STATUS_SUCCESS) {
        window.globalVars.responseData = xhr.response;
        onSuccess(window.globalVars.responseData);
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

    xhr.timeout = window.constants.MAX_TIMEOUT; // 10s

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.STATUS_SUCCESS) {
        onLoad();
      } else {
        window.closePopup();
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = window.constants.MAX_TIMEOUT;

    xhr.open('POST', window.constants.sendURL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
