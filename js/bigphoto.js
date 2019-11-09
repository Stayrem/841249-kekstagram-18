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
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

    var setComments = function (index) {
      var commentsLength = window.globalVars.responseData[index].comments.length;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < commentsLength; i++) {
        var li = document.createElement('li');
        li.classList.add('social__comment');
        if (i > 4) {
          li.classList.add('visually-hidden');
        }
        var img = document.createElement('img');
        img.classList.add('social__picture');
        img.setAttribute('width', '35');
        img.setAttribute('height', '35');
        var p = document.createElement('p');
        p.classList.add('social__text');
        img.src = window.globalVars.responseData[index].comments[i].avatar;
        img.alt = window.globalVars.responseData[index].comments[i].name;
        p.textContent = window.globalVars.responseData[index].comments[i].message;
        li.appendChild(img);
        li.appendChild(p);
        fragment.appendChild(li);
      }
      comments.appendChild(fragment);
    };
    var showAllComments = function () {
      var allComments = comments.querySelectorAll('.social__comment');
      allComments.forEach(function (item) {

        item.classList.remove('visually-hidden');
      });
      commentsLoader.classList.add('visually-hidden');
    };
    commentsLoader.addEventListener('click', showAllComments);

    var closeBigPicture = function (evt) {
      var target = evt.target.id;
      if (evt.keyCode === window.globalVars.ESC_KEYCODE || target === 'picture-cancel') {
        bigPicture.classList.add('hidden');
      }
    };

    var openBigPicture = function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', closeBigPicture);
      bigPictureCloseBtn.addEventListener('click', closeBigPicture);
      commentsLoader.classList.remove('visually-hidden');
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
        setComments(i);
        openBigPicture();
      });

    });
  };
  window.showBigPicture = showBigPicture;
})();
