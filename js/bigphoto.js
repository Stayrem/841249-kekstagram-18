'use strict';
(function () {
  var showBigPicture = function () {
    var pictures = document.querySelectorAll('.picture');
    var bigPicture = document.querySelector('.big-picture');
    var image = bigPicture.querySelector('.big-picture__img img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var socialCaption = bigPicture.querySelector('.social__caption');
    var comments = bigPicture.querySelector('.social__comments');
    var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

    window.elements.commentsLoader.addEventListener('click', window.showAllComments);

    var bigPictureCloseHandler = function (evt) {
      var target = evt.target.id;
      if (evt.keyCode === window.globalVars.ESC_KEYCODE || target === 'picture-cancel') {
        bigPicture.classList.add('hidden');
      }
      window.globalVars.commentsShown = 5;
    };

    var openBigPicture = function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', bigPictureCloseHandler);
      bigPictureCloseBtn.addEventListener('click', bigPictureCloseHandler);
      window.elements.commentsLoader.classList.remove('visually-hidden');
    };

    pictures.forEach(function (item, i) {
      var singlePicture = item;
      singlePicture.addEventListener('click', function (evt) {
        evt.preventDefault();
        image.src = window.globalVars.responseData[i].url;
        likesCount.textContent = window.globalVars.responseData[i].likes;
        commentsCount.textContent = window.globalVars.responseData[i].comments.length;
        socialCaption.textContent = window.globalVars.responseData[i].description;
        comments.innerHTML = '';
        window.globalVars.currentCommentsCount = window.globalVars.responseData[i].comments.length;
        window.elements.commentsShownElement.textContent = window.constants.START_COMMENTS_COUNT;
        window.setComments(i);
        openBigPicture();
      });

    });
  };
  window.showBigPicture = showBigPicture;
})();
