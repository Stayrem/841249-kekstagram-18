'use strict';

var MAX_LIKES = 200;
var MIN_LIKES = 15;
var MIN_AVATAR_INDEX = 1;
var MAX_AVATAR_INDEX = 6;
var NAMES = ['Артём', 'Дмитрий', 'Арина', 'Данила', 'Алексей', 'Надежда'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.', 'Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна.', ' в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни', ' Однажды одна маленькая строчка рыбного текста по имени'];
var getRandomNumber = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};
var comments = [];
for (var j = 0; j < getRandomNumber(1, 8); j++) {
  var comment = {
    avatar: '../img/avatar/' + getRandomNumber(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX) + '.svg',
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
    message: MESSAGES[getRandomNumber(0, MESSAGES.length)]
  };
  comments.push(comment);
}
var getPictures = function () {
  var photoInfo = [];
  for (var i = 1; i <= 25; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: comments
    };
    photoInfo.push(picture);
  }
  return photoInfo;
};

var pictures = getPictures();
var renderPictures = function (data) {
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
};

renderPictures(pictures);
var ESC_KEYCODE = 27;
var imageEditor = document.querySelector('.img-upload__overlay');
var imageUploadForm = document.querySelector('.img-upload__form');
var imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
var imageEditCloseBtn = imageEditor.querySelector('#upload-cancel');
var effectLevelPin = imageEditor.querySelector('.effect-level__pin');
var effectLevel = imageEditor.querySelector('.effect-level__value');
var effectRadioFieldset = imageEditor.querySelector('.img-upload__effects');
effectLevel = effectLevel.value;

var onPopupClose = function () {
  imageEditor.classList.add('hidden');
  imageUploadForm.reset();
};

imageUploadInput.addEventListener('change', function () {
  imageEditor.classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onPopupClose();
    }
  });
  imageEditCloseBtn.addEventListener('click', onPopupClose);
  hashTagValidator();
});

effectLevelPin.addEventListener('mouseup', function () {
  var effectLine = document.querySelector('.effect-level__line');
  var effectLineWidth = effectLine.offsetWidth;
  effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
});

var getValueFilter = function (max) {
  return effectLevel * 100 / max;
};

var setEffect = function () {
  var uploadImage = imageEditor.querySelector('.img-upload__preview');

  effectRadioFieldset.addEventListener('change', function (evt) {
    var effectRadioButton = evt.target;
    uploadImage.classList.add('effects__preview--' + effectRadioButton.value);
    switch (effectRadioButton) {
      case 'chrome':
        uploadImage.style.filter = 'grayscale(' + getValueFilter(1) + ')';
        break;
      case 'sepia':
        uploadImage.style.filter = 'sepia(' + getValueFilter(1) + ')';
        break;
      case 'marvin':
        uploadImage.style.filter = 'invert(' + effectLevel + '%)';
        break;
      case 'phobos':
        uploadImage.style.filter = 'blur(' + getValueFilter(1) + 'px)';
        break;
      case 'heat':
        uploadImage.style.filter = 'brightness(' + getValueFilter(1) + ')';
        break;
      case 'none':
        uploadImage.style.filter = 'brightness(' + getValueFilter(1) + ')';
        break;
    }
  });
};

var removeEmptySpaces = function (arr) {
  var cleanArray = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== ' ') {
      cleanArray.push(arr[i]);
    }
  }
  return cleanArray;
};

var setArrayToLowerCase = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].toLowerCase();
  }
  return arr;
};

var checkExcessHashTag = function (arr) {
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] === '#') {
      return true;
    }
  }
  return false;
};

var hashTagValidator = function () {
  var hashTagInput = imageEditor.querySelector('.text__hashtags');
  var hashTags = hashTagInput.value.split(' ');
  hashTags = setArrayToLowerCase(hashTags);

  hashTagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i][0] !== '#') {
        target.setCustomValidity('Хэштэг должен начинаться с \"#\"');
      } else if (hashTags[i].length < 1) {
        target.setCustomValidity('Хэштэг не может состоять только из \"#\"');
      } else if (i > 5) {
        target.setCustomValidity('Максимальное количество хэштэгов: 5');
      } else if (hashTags[i].length > 20) {
        target.setCustomValidity('Максимальная длина одного хэштэга: 20');
      } else if (checkExcessHashTag(hashTags)) {
        target.setCustomValidity('В одном хэштеге не может быть больше одного символа \"#\"');
      }
    }
  });
};

setEffect();

