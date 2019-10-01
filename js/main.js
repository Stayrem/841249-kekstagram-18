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
var hashTagInput = imageEditor.querySelector('.text__hashtags');
var uploadFormSubmit = imageUploadForm.querySelector('.img-upload__submit');
var HASH_TAG_MAX_NUMBER = 5;
var MAX_HASH_TAG_LENGTH = 20;
effectLevel = effectLevel.value;

var closePopup = function () {
  imageEditor.classList.add('hidden');
  imageUploadForm.reset();
};

imageUploadInput.addEventListener('change', function () {
  imageEditor.classList.remove('hidden');
  effectRadioFieldset.addEventListener('change', setEffect);
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  });
  imageEditCloseBtn.addEventListener('click', closePopup);
});

effectLevelPin.addEventListener('mouseup', function () {
  var effectLine = document.querySelector('.effect-level__line');
  var effectLineWidth = effectLine.offsetWidth;
  effectLevel.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
});

var getValueFilter = function (min, max) {
  return ((max - min) / 100) * effectLevel + min;
};

var uploadImage = imageEditor.querySelector('.img-upload__preview');
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
    imageUploadForm.submit();
  }
});
