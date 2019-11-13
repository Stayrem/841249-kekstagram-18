'use strict';

(function () {

  var imageEditor = document.querySelector('.img-upload__overlay');
  var effectRadioFieldset = imageEditor.querySelector('.img-upload__effects');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
  var imageEditCloseBtn = imageEditor.querySelector('#upload-cancel');
  var commentsInput = document.querySelector('.text__description');
  var photoSmallerButton = document.querySelector('.scale__control--smaller');
  var photoBiggerButton = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');
  var scaleControlValue = 100;
  var image = document.querySelector('.img-upload__preview img');

  var enlargePicture = function () {
    if (scaleControlValue < window.constants.MAX_PHOTO_SCALE) {
      scaleControlValue += window.constants.MIN_PHOTO_SCALE;
      image.style.transform = 'scale(' + scaleControlValue / window.constants.NUMBER_SO_SET_DEMICAL + ')';
      scaleControl.value = scaleControlValue + '%';
    }
  };
  var reducePicture = function () {
    if (scaleControlValue > window.constants.MIN_PHOTO_SCALE) {
      scaleControlValue -= window.constants.MIN_PHOTO_SCALE;
      image.style.transform = 'scale(' + scaleControlValue / window.constants.NUMBER_SO_SET_DEMICAL + ')';
      scaleControl.value = scaleControlValue;
    }
  };

  var closePopup = function () {
    imageEditor.classList.add('hidden');
    image.style.transform = 'scale(1)';
    imageUploadForm.reset();
  };

  window.closePopup = closePopup;
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
    photoBiggerButton.addEventListener('click', enlargePicture);
    photoSmallerButton.addEventListener('click', reducePicture);

  });

})();
