window.addEventListener('load', function(){
  var scrollBox = document.getElementById('scroll-box');
  var imageBox = document.getElementById('image-box');
  var imageSet = getRandomColorImages(300);
  var lazyLoadImageSet= [];
  var io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        var target = entry.target;

        loadImage(target);
        observer.unobserve(target);
    });
  });

  loadImagesBlock(imageSet);
  scrollBox.scrollTop = 1000;
  scrollBox.scrollLeft = 1500;
  lazyLoadImageSet = Array.from(document.querySelectorAll('.image-block > img'));

  lazyLoadImageSet.forEach(el => {
    io.observe(el);
  });

  function loadImagesBlock(images) {
    var frag = document.createDocumentFragment();
    images.forEach(function(src) {
      frag.appendChild(getImages(src));
    });
    imageBox.appendChild(frag);
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