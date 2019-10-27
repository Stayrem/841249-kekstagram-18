'use strict';

(function () {
  var effectLevelPin = window.elements.imageEditor.querySelector('.effect-level__pin');
  var effectLevel = window.elements.imageEditor.querySelector('.effect-level__value');
  var hashTagInput = window.elements.imageEditor.querySelector('.text__hashtags');
  var uploadFormSubmit = window.elements.imageUploadForm.querySelector('.img-upload__submit');
  var HASH_TAG_MAX_NUMBER = 5;
  var MAX_HASH_TAG_LENGTH = 20;
  var uploadImage = window.elements.imageEditor.querySelector('.img-upload__preview');
  var effectRadioButtonValue = 'none';
  effectLevelPin.addEventListener('mouseup', function () {
    var effectLine = document.querySelector('.effect-level__line');
    var effectLineWidth = effectLine.offsetWidth;
    effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
    setFilter(effectRadioButtonValue);
  });

  var getValueFilter = function (min, max) {
    return (max + min) / 100 * effectLevel.value;
  };

  var currentClass = null;

  var setEffect = function (evt) {
    effectRadioButtonValue = evt.target.value;
    effectLevel.value = 100;
    uploadImage.classList.remove(currentClass);
    currentClass = 'effects__preview--' + effectRadioButtonValue;
    uploadImage.classList.add(currentClass);
    setFilter(effectRadioButtonValue);
  };

  var setFilter = function (filterType) {
    switch (filterType) {
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
      default:
        uploadImage.style.filter = '';
        break;
    }
  };

  window.setEffect = setEffect;
  var checkValidHashTag = function (hashtagStr) {
    hashTagInput.setCustomValidity('');
    if (hashtagStr.trim() === '') {
      return '';
    }
    var hashTagArray = hashtagStr.trim().toLowerCase().split(' ');

    var newHashTagArray = hashTagArray.filter(function (element) {
      return element;
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
      window.elemrnts.imageUploadForm.submit();
    }
  });

})();
