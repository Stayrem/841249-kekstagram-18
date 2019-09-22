'use strict';

var MAX_LIKES = 200;
var MIN_LIKES = 15;
var MIN_AVATAR_INDEX = 1;
var MAX_AVATAR_INDEX = 6;
var NAMES = ['Артём', 'Дмитрий', 'Арина', 'Данила', 'Алексей', 'Надежда'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var randomInt = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var getPictures = function () {
  var photoInfo = [];
  for (var i = 1; i <= 25; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: randomInt(MIN_LIKES, MAX_LIKES),
      comments: [{
        avatar: '../img/avatar/' + randomInt(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX) + '.svg',
        name: NAMES[randomInt(0, NAMES.length - 1)],
        message: MESSAGES[randomInt(0, MESSAGES.length)]
      },
      {
        avatar: '../img/avatar/' + randomInt(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX) + '.svg',
        name: NAMES[randomInt(0, NAMES.length - 1)],
        message: MESSAGES[randomInt(0, MESSAGES.length)]
      },
      {
        avatar: '../img/avatar/' + randomInt(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX) + '.svg',
        name: NAMES[randomInt(0, NAMES.length - 1)],
        message: MESSAGES[randomInt(0, MESSAGES.length)]
      }
      ]
    };

    photoInfo.push(picture);
  }
  return photoInfo;
};

var pictures = getPictures();
var renderPictures = function (data) {
  var template = document.querySelector('#picture').content.querySelector('a');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var element = template.cloneNode(true);
    element.querySelector('.picture__img').setAttribute('src', data[i]['url']);
    element.querySelector('.picture__comments').textContent = data[i]['comments'].length;
    element.querySelector('.picture__likes').textContent = data[i]['likes'];
    fragment.appendChild(element);
  }
  document.querySelector('.pictures').appendChild(fragment);
};

renderPictures(pictures);

