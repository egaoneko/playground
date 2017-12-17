window.addEventListener('load', function(){
  var offsetWidth = 200;
  var offsetHeight = 100;
  var scrollBox = document.getElementById('scroll-box');
  var imageBox = document.getElementById('image-box');
  var imageSet = getRandomColorImages(300);
  var lazyLoadImageSet= [];

  loadImagesBlock(imageSet);
  scrollBox.scrollTop = 1000;
  scrollBox.scrollLeft = 1500;
  lazyLoadImageSet = Array.from(document.querySelectorAll('.image-block > img'));

  scrollBox.addEventListener('scroll', function(){
    loadImages(lazyLoadImageSet);
  });

  function loadImagesBlock(images) {
    var frag = document.createDocumentFragment();
    images.forEach(function(src) {
      frag.appendChild(getImages(src));
    });
    imageBox.appendChild(frag);
  }

  function loadImages(images) {
    var scrollRect = {
      top: scrollBox.scrollTop - offsetHeight,
      left: scrollBox.scrollLeft - offsetWidth,
      right: scrollBox.scrollLeft + scrollBox.offsetWidth + offsetWidth,
      bottom: scrollBox.scrollTop + scrollBox.offsetHeight + offsetHeight      
    };

    images.slice().forEach(function(image) {
      var imageRect = {
        top: image.offsetTop,
        left: image.offsetLeft,
        right: image.offsetLeft + image.clientWidth,
        bottom: image.offsetTop + image.clientHeight    
      };
      
      if (!collisionCheck(scrollRect, imageRect)) {
        return;
      }

      if (image.src) {
        return;
      }

      loadImage(image);
      images.splice(images.indexOf(image), 1);
    });
  }

  function collisionCheck(scrollRect, imageRect) {
    return(
      imageRect.top > scrollRect.top &&
      imageRect.left > scrollRect.left &&
      imageRect.right < scrollRect.right &&
      imageRect.bottom < scrollRect.bottom
    );
  }

  function loadImage(image) {
    image.src = image.getAttribute('data-src');
  }

  function getImages(src) {
    var image = new Image();
    image.setAttribute('data-src', src);

    var div = document.createElement('div');
    div.className = 'image-block';
    div.appendChild(image);
    return div;
  }

  function getRandomColorImages(size) {
    var baseUrl = "https://dummyimage.com/200x100/";
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
});