'use strict';

(function () {
  var renderPictures = function (data) {
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

  renderPictures(window.pictures);
})();
