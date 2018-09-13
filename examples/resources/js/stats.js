window.addEventListener('load', function() {
  const container = document.getElementById('container');
  let stats;

  if (!container) {
    return;
  }

  load();

  function load() {
    const script = document.createElement('script');
    document.head.appendChild(script);

    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js';
    script.onload =  function() {
      if (!window.Stats) {
        return;
      }

      stats = new window['Stats']();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0';
      stats.domElement.style.top = '0';
      container.appendChild(stats.domElement);

      update();
    };
  }

  function update() {
    requestAnimationFrame(update);
    stats.update();
  }
});

