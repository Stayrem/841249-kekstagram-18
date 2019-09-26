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
var effectLevelValue = imageEditor.querySelector('.effect-level__value').value;

var closeImageEditor = function () {
  imageEditor.classList.add('hidden');
  imageUploadForm.reset();
};

imageUploadInput.addEventListener('change', function () {
  imageEditor.classList.remove('hidden');
});

imageUploadForm.addEventListener('submit', hashTagValidator);

document.addEventListener('keydown', function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    closeImageEditor();
  }
});

imageEditCloseBtn.addEventListener('click', closeImageEditor);

effectLevelPin.addEventListener('mouseup', function () {
  var effectLine = document.querySelector('.effect-level__line');
  var effectLineWidth = effectLine.offsetWidth;
  effectLevelValue.value = Math.floor(effectLevelPin.offsetLeft * 100 / effectLineWidth);
});

var setEffect = function () {
  var imagePreview = imageEditor.querySelector('.img-upload__preview img');
  var effectItem = imageEditor.querySelectorAll('.effects__item');

  for (var i = 0; i < effectItem.length; i++) {
    effectItem[i].addEventListener('click', function () {
      imageUploadForm.reset();
      var effectInput = this.querySelector('.effects__radio');
      if (effectInput.value === 'none') {
        imagePreview.setAttribute('style', 'filter: unset;');
      } else if (effectInput.value === 'chrome') {
        imagePreview.setAttribute('style', 'filter: grayscale(' + effectLevelValue + ');');
      } else if (effectInput.value === 'sepia') {
        imagePreview.setAttribute('style', 'filter: sepia(' + effectLevelValue + ');');
      } else if (effectInput.value === 'marvin') {
        imagePreview.setAttribute('style', 'filter: invert(' + effectLevelValue + '%);');
      } else if (effectInput.value === 'phobos') {
        imagePreview.setAttribute('style', 'filter: blur(' + effectLevelValue + 'px);');
      } else if (effectInput.value === 'heat') {
        imagePreview.setAttribute('style', 'filter: brightness(' + effectLevelValue + ');');
      }
    });
  }
};

var hashTagValidator = function () {
  var hashTagInput = imageEditor.querySelector('.text__hashtags');
  var checkSameValue = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var index = 1; index < arr.length; index++) {
        if (arr[i] === arr[index]) {
          return true;
        }
      }
    }
    return false;
  };

  var checkDoubleHash = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var index = 1; index < arr.length; index++) {
        if (arr[i][index] === '#') {
          return true;
        }
      }
    }
    return false;
  };
  hashTagInput.addEventListener('input', function (e) {
    var hashTags = hashTagInput.value.split(' ');
    var target = e.target;
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i][0] !== '#') {
        console.log(hashTags[i][0])
        target.setCustomValidity('Хэштэг должен начинаться с \"#\"');
      } else if (hashTags[i].length < 1) {
        target.setCustomValidity('Хэштэг не может состоять только из \"#\"');
      } else if (i > 5) {
        target.setCustomValidity('Максимальное количество хэштэгов: 5');
      } else if (hashTags[i].length > 20) {
        target.setCustomValidity('Максимальная длина одного хэштэга: 20');
      } else if (checkSameValue(hashTags)) {
        target.setCustomValidity('не должно быть одинаковых Хэштэгов');
      } else if (checkDoubleHash(hashTags)) {
        target.setCustomValidity('не должно быть больше двух символов \"#\" в Хэштеге');
      }
    }
  });
};

setEffect();
hashTagValidator();
