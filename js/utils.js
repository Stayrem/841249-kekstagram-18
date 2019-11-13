'use strict';
(function () {
  window.utils = {
    debounce: function (func) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          func.apply(null, parameters);
        }, window.constants.DEBOUNCE_INTERVAL);
      };
    },
    putToCache: function (elem, cache) {
      if (cache.indexOf(elem) !== -1) {
        return;
      }
      var i = Math.floor(Math.random() * (cache.length + 1));
      cache.splice(i, 0, elem);
    },
    madness: function () {
      var cache = [];
      return function (a, b) {
        window.utils.putToCache(a, cache);
        window.utils.putToCache(b, cache);
        return cache.indexOf(b) - cache.indexOf(a);
      };
    },
    shuffle: function (arr) {
      var compare = window.utils.madness();
      return arr.sort(compare);
    }
  };
})();
