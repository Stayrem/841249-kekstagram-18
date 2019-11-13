'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var popularPhotos = null;
  var filterButtons = document.querySelectorAll('.img-filters__button');
  window.popularPhotos = popularPhotos;
  var sortByPopular = window.utils.debounce(function () {
    popularPhotos = window.globalVars.responseData.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPhoto(popularPhotos);
  });

  var sortRandom = window.utils.debounce(function () {
    var shuffledArr = window.utils.shuffle(window.globalVars.responseData);
    var tenShuffledArr = [];
    shuffledArr.forEach(function (item) {
      tenShuffledArr.push(item);
    });
    tenShuffledArr = tenShuffledArr.slice(window.constants.NUMBER_OF_SHUFFLED_PICTURES);
    window.renderPhoto(tenShuffledArr);
  });

  var setDefaultOrder = window.utils.debounce(function () {
    window.renderPhoto(window.globalVars.responseData);
  });

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
    currentButton.classList.add('img-filters__button--active');
    switch (filterType) {
      case 'filter-random':
        sortRandom();
        break;
      case 'filter-discussed':
        sortByPopular();
        break;
      default:
        setDefaultOrder();
    }
  });

})();
