'use strict';

(function () {
  var effectLevelPin = window.elements.imageEditor.querySelector('.effect-level__pin');
  var effectLevel = window.elements.imageEditor.querySelector('.effect-level__value');
  var hashTagInput = window.elements.imageEditor.querySelector('.text__hashtags');
  var uploadFormSubmit = window.elements.imageUploadForm.querySelector('.img-upload__submit');
  var effectRadioButtonValue = 'none';
  var effectLevelContainer = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      var effectLine = document.querySelector('.effect-level__line');
      var effectLineWidth = effectLine.offsetWidth;
      effectLevel.value = Math.floor(effectLevelPin.offsetLeft * window.constants.MAX_PERCENT / effectLineWidth);
      setFilter(effectRadioButtonValue);
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX
      };

      startCoords = {
        x: evtMove.clientX
      };
      var pinCurrentPosition = effectLevelPin.offsetLeft - shift.x;
      if (pinCurrentPosition >= window.constants.PIN_MIN_POSITION && pinCurrentPosition <= window.constants.PIN_MAX_POSITION) {
        effectLevelPin.style.left = (pinCurrentPosition) + 'px';
        effectLevelLine.style.width = (pinCurrentPosition) + 'px';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var getValueFilter = function (min, max) {
    return (max + min) / window.constants.MAX_PERCENT * effectLevel.value;
  };

  var currentClass = null;

  var setEffect = function (evt) {
    effectLevelLine.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectRadioButtonValue = evt.target.value;
    effectLevel.value = 100;
    window.elements.uploadPreview.classList.remove(currentClass);
    currentClass = 'effects__preview--' + effectRadioButtonValue;
    window.elements.uploadPreview.classList.add(currentClass);
    setFilter(effectRadioButtonValue);
  };

  var setFilter = function (filterType) {
    switch (filterType) {
      case 'chrome':
        window.elements.uploadPreview.style.filter = 'grayscale(' + getValueFilter(0, 1) + ')';
        effectLevelContainer.classList.remove('hidden');
        break;
      case 'sepia':
        window.elements.uploadPreview.style.filter = 'sepia(' + getValueFilter(0, 1) + ')';
        effectLevelContainer.classList.remove('hidden');
        break;
      case 'marvin':
        window.elements.uploadPreview.style.filter = 'invert(' + effectLevel + '%)';
        effectLevelContainer.classList.remove('hidden');
        break;
      case 'phobos':
        window.elements.uploadPreview.style.filter = 'blur(' + getValueFilter(1, 3) + 'px)';
        break;
      case 'heat':
        window.elements.uploadPreview.style.filter = 'brightness(' + getValueFilter(1, 3) + ')';
        effectLevelContainer.classList.remove('hidden');
        break;
      default:
        window.elements.uploadPreview.style.filter = '';
        effectLevelContainer.classList.add('hidden');
        break;
    }
  };

  var setInputError = function (input) {
    input.style.boxShadow = '0px 0px 0px 4px red';
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

    if (newHashTagArray.length > window.constants.HASH_TAG_MAX_NUMBER) {
      errorText = 'Количество хэштэгов больше 5';
      setInputError(hashTagInput);
      return errorText;
    }
    newHashTagArray.some(function (currentHash, i) {
      if (currentHash[0] !== '#') {
        errorText = 'хэштэг должен начинаться с #';
        setInputError(hashTagInput);
      } else if (currentHash.length === 1) {
        errorText = 'в хэштеге должны быть символы кроме #';
        setInputError(hashTagInput);
      } else if (currentHash.length > window.constants.MAX_HASH_TAG_LENGTH) {
        errorText = 'максимальная длина хэштэга:' + window.constants.MAX_HASH_TAG_LENGTH + 'символов';
        setInputError(hashTagInput);
      } else if (newHashTagArray.indexOf(currentHash, i + 1) !== -1) {
        errorText = 'хэштеги не могут быть одинаковыми';
        setInputError(hashTagInput);
      }
      if (errorText) {
        return;
      }
    });
    return errorText;
  };

  uploadFormSubmit.addEventListener('click', function (evt) {
    var textErrorHashTag = checkValidHashTag(hashTagInput.value);

    if (textErrorHashTag !== '') {
      hashTagInput.setCustomValidity(textErrorHashTag);
    } else {
      evt.preventDefault();
      var formData = new FormData(window.elements.imageUploadForm);
      window.backend.save(formData, window.successFormSend, window.errorHandler);
    }
  });

})();
