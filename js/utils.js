'use strict';
(function () {
  window.utils = {
    rattling: function (lastTimeOut, func) {
      if (lastTimeOut) {
        window.clearTimeout(lastTimeOut);
      }
      lastTimeOut = window.setTimeout(function () {
        func();
      }, 500);
    },
    renderPhoto: function (data) {
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
      window.utils.showBigPicture();
    },
    errorHandler: function () {

      var template = document.querySelector('#error').content.querySelector('.error');
      var erroContainer = document.querySelector('main');
      var fragment = document.createDocumentFragment();

      fragment.appendChild(template);
      erroContainer.appendChild(fragment);
      var dialog = document.querySelector('.error');
      var dialogInner = dialog.querySelector('.error__inner');

      var closeErrorDialog = function () {
        dialog.remove();
      };

      var escapePressListener = function (evt) {
        if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
          closeErrorDialog();
        }
      };
      var errorCloseEventListener = function (evt) {
        var target = evt.target;
        if (target.classList.contains('error__button')) {
          closeErrorDialog();
        } else if (!dialogInner.contains(target)) {
          closeErrorDialog();
        }
      };

      document.addEventListener('keydown', escapePressListener);

      document.addEventListener('click', errorCloseEventListener);
    },
    showBigPicture: function () {
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
      socialCommentCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');

      var setComments = function (index) {
        var commentsLength = window.globalVars.responseData[index].comments.length;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < commentsLength; i++) {
          var li = document.createElement('li');
          li.classList.add('social__comment');
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
    }
  };
})();
