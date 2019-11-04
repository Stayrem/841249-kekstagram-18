'use strict';

(function () {

  var imageEditor = document.querySelector('.img-upload__overlay');
  var effectRadioFieldset = imageEditor.querySelector('.img-upload__effects');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
  var imageEditCloseBtn = imageEditor.querySelector('#upload-cancel');
  var commentsInput = document.querySelector('.text__description');

  var closePopup = function () {
    imageEditor.classList.add('hidden');
    imageUploadForm.reset();
  };

  commentsInput.addEventListener('click', function () {
    document.removeEventListener('keydown', closeImageEditorOnEsc);
  });

  commentsInput.addEventListener('change', function () {
    document.addEventListener('keydown', closeImageEditorOnEsc);
  });

  var closeImageEditorOnEsc = function (evt) {
    if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
      closePopup();
    }
  };

  imageUploadInput.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    effectRadioFieldset.addEventListener('change', window.setEffect);
    document.addEventListener('keydown', closeImageEditorOnEsc);
    imageEditCloseBtn.addEventListener('click', closePopup);
  });

})();
