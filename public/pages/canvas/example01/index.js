window.addEventListener('load', function(){
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');

  canvas.width = 400;
  canvas.height = 711;

  var image = new Image();
  image.src = '../../../../textures/iu01.jpg';
  image.onload = function() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
});