'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var popularPhotos = null;
  window.popularPhotos = popularPhotos;
  var sortByPopular = function () {
    popularPhotos = window.responseData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPhoto(popularPhotos);
  };
  var sortRandom = function () {
    var shuffledArr = window.responseData.sort(function () {
      return Math.random() - 0.5;
    });
    var tenShuffledArr = [];
    var maxArrLength = 10;
    shuffledArr.forEach(function (item, i) {
      if (i < maxArrLength) {
        tenShuffledArr.push(item);
      }
    });
    window.renderPhoto(tenShuffledArr);
  };
  filterForm.addEventListener('click', function (evt) {
    var renderedPhotos = document.querySelectorAll('.picture');
    for (var index = 0; index < renderedPhotos.length; index++) {
      renderedPhotos[index].remove();
    }
    var target = evt.target;
    var filterType = target.id;
    var lastTimeOut;
    switch (filterType) {
      case 'filter-random':
        if (lastTimeOut) {
          window.clearTimeout(lastTimeOut);
        }
        lastTimeOut = window.setTimeout(function () {
          sortRandom();
        }, 500);
        break;
      case 'filter-discussed':
        if (lastTimeOut) {
          window.clearTimeout(lastTimeOut);
        }
        lastTimeOut = window.setTimeout(function () {
          sortByPopular();
        }, 500);

        break;
      default:
        if (lastTimeOut) {
          window.clearTimeout(lastTimeOut);
        }
        lastTimeOut = window.setTimeout(function () {
          window.renderPhoto(window.originData);
        }, 500);

    }
  });
})();
