'use strict';

(function () {

  var imageEditor = document.querySelector('.img-upload__overlay');
  var effectRadioFieldset = imageEditor.querySelector('.img-upload__effects');
  var imageUploadForm = document.querySelector('.img-upload__form');
  var imageEditCloseBtn = imageEditor.querySelector('#upload-cancel');
  var commentsInput = document.querySelector('.text__description');
  var photoSmallerButton = document.querySelector('.scale__control--smaller');
  var photoBiggerButton = document.querySelector('.scale__control--bigger');
  var scaleControl = document.querySelector('.scale__control--value');
  var scaleControlValue = 100;
  var image = document.querySelector('.img-upload__preview img');

  var onEnlargePictureClick = function () {
    if (scaleControlValue < window.constants.MAX_PHOTO_SCALE) {
      scaleControlValue += window.constants.MIN_PHOTO_SCALE;
      image.style.transform = 'scale(' + scaleControlValue / window.constants.NUMBER_SO_SET_DEMICAL + ')';
      scaleControl.value = scaleControlValue + '%';
    }
  };
  var onReducePictureClick = function () {
    if (scaleControlValue > window.constants.MIN_PHOTO_SCALE) {
      scaleControlValue -= window.constants.MIN_PHOTO_SCALE;
      image.style.transform = 'scale(' + scaleControlValue / window.constants.NUMBER_SO_SET_DEMICAL + ')';
      scaleControl.value = scaleControlValue;
    }
  };

  var closePopupHandler = function () {
    imageEditor.classList.add('hidden');
    image.style.transform = 'scale(1)';
    imageUploadForm.reset();
  };

  window.closePopupHandler = closePopupHandler;
  commentsInput.addEventListener('click', function () {
    document.removeEventListener('keydown', onEscCloseImageEditor);
  });

  commentsInput.addEventListener('change', function () {
    document.addEventListener('keydown', onEscCloseImageEditor);
  });

  var onEscCloseImageEditor = function (evt) {
    if (evt.keyCode === window.globalVars.ESC_KEYCODE) {
      closePopupHandler();
    }
  };

  window.elements.imageUploadInput.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    effectRadioFieldset.addEventListener('change', window.setEffect);
    window.setPhoto();
    document.addEventListener('keydown', onEscCloseImageEditor);
    imageEditCloseBtn.addEventListener('click', closePopupHandler);
    photoBiggerButton.addEventListener('click', onEnlargePictureClick);
    photoSmallerButton.addEventListener('click', onReducePictureClick);

  });

})();
