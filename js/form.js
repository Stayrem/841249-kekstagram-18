'use strict';

(function () {
  var effectLevelPin = window.imageEditor.querySelector('.effect-level__pin');
  var effectLevel = window.imageEditor.querySelector('.effect-level__value');
  var hashTagInput = window.imageEditor.querySelector('.text__hashtags');
  var uploadFormSubmit = window.imageUploadForm.querySelector('.img-upload__submit');
  var HASH_TAG_MAX_NUMBER = 5;
  var MAX_HASH_TAG_LENGTH = 20;

  effectLevelPin.addEventListener('mouseup', function () {
    var effectLine = document.querySelector('.effect-level__line');
    var effectLineWidth = effectLine.offsetWidth;
    effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
  });

  var getValueFilter = function (min, max) {
    return ((max - min) / 100) * effectLevel + min;
  };

  var uploadImage = window.imageEditor.querySelector('.img-upload__preview');
  var currentClass = null;

  var setEffect = function (evt) {
    effectLevel = 100;
    uploadImage.classList.remove('effects__preview--' + currentClass);
    var effectRadioButton = evt.target;
    uploadImage.classList.add('effects__preview--' + effectRadioButton.value);
    currentClass = effectRadioButton.value;
    switch (effectRadioButton.value) {
      case 'chrome':
        uploadImage.style.filter = 'grayscale(' + getValueFilter(0, 1) + ')';
        break;
      case 'sepia':
        uploadImage.style.filter = 'sepia(' + getValueFilter(0, 1) + ')';
        break;
      case 'marvin':
        uploadImage.style.filter = 'invert(' + effectLevel + '%)';
        break;
      case 'phobos':
        uploadImage.style.filter = 'blur(' + getValueFilter(1, 3) + 'px)';
        break;
      case 'heat':
        uploadImage.style.filter = 'brightness(' + getValueFilter(1, 3) + ')';
        break;
      case 'none':
        uploadImage.style.filter = '';
        break;
    }
  };
  window.setEffect = setEffect;
  var checkValidHashTag = function (hashtagStr) {
    hashTagInput.setCustomValidity('');
    var hashTagArray = hashtagStr.trim().toLowerCase().split(' ');
    if (hashTagArray === '') {
      return '';
    }
    var newHashTagArray = hashTagArray.map(function (element) {
      return element.trim();
    });
    var errorText = '';

    if (newHashTagArray.length > HASH_TAG_MAX_NUMBER) {
      errorText = 'Количество хэштэгов больше 5';
      return errorText;
    }

    for (var i = 0; i < newHashTagArray.length; i++) {
      var currentHash = newHashTagArray[i];
      if (currentHash[0] !== '#') {
        errorText = 'хэштэг должен начинаться с #';
      } else if (currentHash.length === 1) {
        errorText = 'в хэштеге должны быть символы кроме #';
      } else if (currentHash.length > MAX_HASH_TAG_LENGTH) {
        errorText = 'максимальная длина хэштэга:' + MAX_HASH_TAG_LENGTH + 'символов';
      } else if (newHashTagArray.indexOf(currentHash, i + 1) !== -1) {
        errorText = 'хэштеги не могут быть одинаковыми';
      }
      if (errorText) {
        break;
      }
    }
    return errorText;
  };

  uploadFormSubmit.addEventListener('click', function () {
    var textErrorHashTag = checkValidHashTag(hashTagInput.value);

    if (textErrorHashTag !== '') {
      hashTagInput.setCustomValidity(textErrorHashTag);
    } else {
      window.imageUploadForm.submit();
    }
  });

})();
