window.addEventListener('load', function(){
  var imageBox = document.getElementById('image-box');
  var imageBoxIndex = 0;
  var imageSet1 = getRandomColorImages(10);
  imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);

  addClickEvent('image-box-prev-btn', function(){
    if(imageBoxIndex < 1) {
      return;
    }
    imageBoxIndex -= 1;
    imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);
  });

  addClickEvent('image-box-next-btn', function(){
    if(imageBoxIndex >= imageSet1.length - 1) {
      return;
    }
    imageBoxIndex += 1;
    imageBox.style.backgroundImage = getBackgroundImage(imageSet1[imageBoxIndex]);
  });

  var preloadImageBox = document.getElementById('preload-image-box');
  var preloadImageBoxIndex = 0;
  var imageSet2 = [
    "https://dummyimage.com/600x400/52ACEEBE5D21",
    "https://dummyimage.com/600x400/FD8F265C45CF",
    "https://dummyimage.com/600x400/768D21AD6511",
    "https://dummyimage.com/600x400/5A686067C23F",
    "https://dummyimage.com/600x400/0E070CEAB80B",
    "https://dummyimage.com/600x400/C13FC82B1BE7",
    "https://dummyimage.com/600x400/B0663BC483CB",
    "https://dummyimage.com/600x400/0244D9F1BA6F",
    "https://dummyimage.com/600x400/3311445D45EF",
    "https://dummyimage.com/600x400/075247DAAB1C"
  ];
  preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
  // preloadImages(imageSet2);

  addClickEvent('preload-image-box-prev-btn', function(){
    if(preloadImageBoxIndex < 1) {
      return;
    }
    preloadImageBoxIndex -= 1;
    preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
  });

  addClickEvent('preload-image-box-next-btn', function(){
    if(preloadImageBoxIndex >= imageSet2.length - 1) {
      return;
    }
    preloadImageBoxIndex += 1;
    preloadImageBox.style.backgroundImage = getBackgroundImage(imageSet2[preloadImageBoxIndex]);
  });

  function preloadImages(images) {
    images.forEach(function(src) {
      setTimeout(() => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          img = null;
        };
      });
    });
  }

  function getBackgroundImage(src) {
    return 'url(' + src + ')';
  }

  function getRandomColorImages(size) {
    var baseUrl = "https://dummyimage.com/600x400/";
    var images = [];
    for(var i=0; i<size; i++) {
      images.push(baseUrl + getRandomColor() + getRandomColor());
    }
    return images;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function addClickEvent(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
  }
});
