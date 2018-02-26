window.addEventListener('load', function(){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = 400;
  canvas.height = 711;

  var loader = new Utils.ImageLoader();

  var image = loader.load(
    '../../../textures/iu01.jpg',
    function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  );
});