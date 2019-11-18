'use strict';

(function () {
  var setPhoto = function () {
    var uploadImage = document.querySelector('.img-upload__preview img');

    var file = window.elements.imageUploadInput.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = window.constants.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        uploadImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  window.setPhoto = setPhoto;
})();
