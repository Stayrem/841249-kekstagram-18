'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var popularPhotos = null;
  window.popularPhotos = popularPhotos;
  var sortByPopular = function () {
    popularPhotos = window.globalVars.responseData.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.utils.renderPhoto(popularPhotos);
  };

  var sortRandom = function () {
    var shuffledArr = window.globalVars.responseData.slice().sort(function () {
      return Math.random() - 0.5;
    });

    var tenShuffledArr = [];
    var maxArrLength = 10;
    shuffledArr.forEach(function (item, i) {
      if (i < maxArrLength) {
        tenShuffledArr.push(item);
      }
    });
    window.utils.renderPhoto(tenShuffledArr);
  };

  var setDefaultOrder = function () {
    window.utils.renderPhoto(window.globalVars.responseData);
  };

  filterForm.addEventListener('click', function (evt) {
    var renderedPhotos = document.querySelectorAll('.picture');
    renderedPhotos.forEach(function (item) {
      item.remove();
    });

    var target = evt.target;
    var filterType = target.id;
    var lastTimeOut;
    switch (filterType) {
      case 'filter-random':
        window.utils.rattling(lastTimeOut, sortRandom);
        break;
      case 'filter-discussed':
        window.utils.rattling(lastTimeOut, sortByPopular);
        break;
      default:
        window.utils.rattling(lastTimeOut, setDefaultOrder);
    }
  });

})();
