'use strict';
(function () {
  window.utils = {
    debounce: function (lastTimeOut, func) {
      if (lastTimeOut) {
        window.clearTimeout(lastTimeOut);
      }
      lastTimeOut = window.setTimeout(function () {
        func();
      }, 500);
    }
  };
})();
