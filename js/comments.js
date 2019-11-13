'use strict';

(function () {
  var commentsShown = 5;
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
    window.elements.comments.appendChild(fragment);
  };
  var showAllComments = function () {
    var step = 5;
    commentsShown += step;
    window.elements.commentsShownElement.textContent = commentsShown;
    var allComments = window.elements.comments.querySelectorAll('.social__comment');
    allComments.forEach(function (item, i) {
      if (i < commentsShown) {
        item.classList.remove('visually-hidden');
      }
    });
    if (commentsShown >= window.globalVars.currentCommentsCount) {
      window.elements.commentsLoader.classList.add('visually-hidden');
      window.elements.commentsShownElement.textContent = window.globalVars.currentCommentsCount;
    }
  };
  window.setComments = setComments;
  window.showAllComments = showAllComments;
})();
