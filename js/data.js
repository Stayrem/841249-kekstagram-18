'use strict';

(function () {
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
  window.pictures = pictures;
})();
