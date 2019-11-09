'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var popularPhotos = null;
  var filterButtons = document.querySelectorAll('.img-filters__button');
  window.popularPhotos = popularPhotos;
  var sortByPopular = function () {
    popularPhotos = window.globalVars.responseData.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPhoto(popularPhotos);
  };

  var sortRandom = function () {
    var shuffledArr = window.globalVars.responseData.slice().sort(function () {
      return Math.random() - 0.5;
    });

    var tenShuffledArr = [];
    shuffledArr.forEach(function (item) {
      tenShuffledArr.push(item);
    });
    tenShuffledArr = tenShuffledArr.slice(10);
    window.renderPhoto(tenShuffledArr);
  };

  var setDefaultOrder = function () {
    window.renderPhoto(window.globalVars.responseData);
  };

  filterForm.addEventListener('click', function (evt) {
    filterButtons.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    var renderedPhotos = document.querySelectorAll('.picture');
    renderedPhotos.forEach(function (item) {
      item.remove();
    });

    var target = evt.target;
    var filterType = target.id;
    var currentButton = document.querySelector('#' + filterType);
    var lastTimeOut;
    currentButton.classList.add('img-filters__button--active');
    switch (filterType) {
      case 'filter-random':
        window.utils.debounce(lastTimeOut, sortRandom);
        break;
      case 'filter-discussed':
        window.utils.debounce(lastTimeOut, sortByPopular);
        break;
      default:
        window.utils.debounce(lastTimeOut, setDefaultOrder);
    }
  });

})();
