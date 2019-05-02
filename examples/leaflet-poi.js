const map = L.map('map').setView([37.49229399862877, -96.94335937500001], 4);
const tileLayer = L.tileLayer('//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  subdomains: 'abcd',
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
  minZoom: 4,
  maxZoom: 18
});
map.attributionControl.setPosition('bottomleft');
map.zoomControl.setPosition('bottomright');

map.addLayer(tileLayer);

tileLayer.on('load', () => {
  Array.from(document.getElementsByClassName('leaflet-tile')).forEach((tile) => {
    tile.style.height = (tile.clientHeight + 1) + 'px';
    tile.style.width = (tile.clientWidth + 1) + 'px';
  });
});

const getJSON = function(url, successHandler, errorHandler) {
  const xhr = typeof XMLHttpRequest != 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('get', url, true);
  xhr.onreadystatechange = function() {
    let status;
    let data;
    if (xhr.readyState === 4) {
      status = xhr.status;
      if (status === 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  xhr.send();
};

const loader = new PIXI.loaders.Loader();
loader
  .add('plane', 'data/img/leaflet/plane.png')
  .add('focusPlane', 'data/img/leaflet/focus-plane.png')
  .add('circle', 'data/img/leaflet/circle.png')
  .add('focusCircle', 'data/img/leaflet/focus-circle.png')
  .add('bicycle', 'data/img/leaflet/bicycle.png')
  .add('focusBicycle', 'data/img/leaflet/focus-bicycle.png');
document.addEventListener("DOMContentLoaded", function () {
  loader.load(load);
});

function load(loader, resources) {
  const textures = [resources.plane.texture, resources.circle.texture, resources.bicycle.texture];
  const focusTextures = [resources.focusPlane.texture, resources.focusCircle.texture, resources.focusBicycle.texture];
  getJSON('data/json/cities.json', function(markers) {

    const legend = document.querySelector('div.legend.geometry');
    const legendContent = legend.querySelector('.content');
    const pixiLayer = (() => {
      let firstDraw = true;
      let prevZoom;
      let markerSprites = [];
      let colorScale = d3.scaleLinear()
        .domain([0, 50, 100])
        .range(["#c6233c", "#ffd300", "#008000"]);
      let frame = null;
      let focus = null;
      const pixiContainer = new PIXI.Container();
      let doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      return L.pixiOverlay(function(utils) {
        const zoom = utils.getMap().getZoom();
        if (frame) {
          cancelAnimationFrame(frame);
          frame = null;
        }
        const container = utils.getContainer();
        const renderer = utils.getRenderer();
        const project = utils.latLngToLayerPoint;
        const scale = utils.getScale();
        const invScale = 1 / scale;
        if (firstDraw) {
          prevZoom = zoom;
          markers.forEach((marker) => {
            const coords = project([marker.latitude, marker.longitude]);
            const index = Math.floor(Math.random() * textures.length);
            const markerSprite = new PIXI.Sprite(textures[index]);
            markerSprite.textureIndex = index;
            markerSprite.x0 = coords.x;
            markerSprite.y0 = coords.y;
            markerSprite.anchor.set(0.5, 0.5);
            const tint = d3.color(colorScale(marker.avancement || Math.random() * 100)).rgb();
            markerSprite.tint = 256 * (tint.r * 256 + tint.g) + tint.b;
            container.addChild(markerSprite);
            markerSprites.push(markerSprite);
            markerSprite.legend = marker.city || marker.label;
          });
          const quadTrees = {};
          for (let z = map.getMinZoom(); z <= map.getMaxZoom(); z++) {
            const rInit = ((z <= 7) ? 16 : 24) / utils.getScale(z);
            quadTrees[z] = solveCollision(markerSprites, {r0: rInit, zoom: z});
          }
          map.on('click', (e) => {
            let redraw = false;
            if (focus) {
              focus.texture = textures[focus.textureIndex];
              focus = null;
              L.DomUtil.addClass(legend, 'hide');
              legendContent.innerHTML = '';
              redraw = true;
            }
            const marker = findMarker(e.latlng, project, quadTrees, utils);
            if (marker) {
              marker.texture = focusTextures[marker.textureIndex];
              focus = marker;
              legendContent.innerHTML = marker.legend;
              L.DomUtil.removeClass(legend, 'hide');
              redraw = true;
            }
            if (redraw) utils.getRenderer().render(container);
          });
          let self = this;
          map.on('mousemove', L.Util.throttle((e) => {
            const marker = findMarker(e.latlng, project, quadTrees, utils);
            if (marker) {
              L.DomUtil.addClass(self._container, 'leaflet-interactive');
            } else {
              L.DomUtil.removeClass(self._container, 'leaflet-interactive');
            }
          }, 32));
        }
        if (firstDraw || prevZoom !== zoom) {
          markerSprites.forEach((markerSprite) => {
            const position = markerSprite.cache[zoom];
            if (firstDraw) {
              markerSprite.x = position.x;
              markerSprite.y = position.y;
              markerSprite.scale.set((position.r * scale < 16) ? position.r / 16 : invScale);
            } else {
              markerSprite.currentX = markerSprite.x;
              markerSprite.currentY = markerSprite.y;
              markerSprite.targetX = position.x;
              markerSprite.targetY = position.y;
              markerSprite.currentScale = markerSprite.scale.x;
              markerSprite.targetScale = (position.r * scale < 16) ? position.r / 16 : invScale;
            }
          });
        }
        function findMarker(ll, project, quadTrees, utils) {
          const layerPoint = project(ll);
          const quadTree = quadTrees[utils.getMap().getZoom()];
          let marker;
          let rMax = quadTree.rMax;
          let found = false;
          quadTree.visit((quad, x1, y1, x2, y2) => {
            if (!quad.length) {
              const dx = quad.data.x - layerPoint.x;
              const dy = quad.data.y - layerPoint.y;
              const r = quad.data.scale.x * 16;
              if (dx * dx + dy * dy <= r * r) {
                marker = quad.data;
                found = true;
              }
            }
            return found || x1 > layerPoint.x + rMax || x2 + rMax < layerPoint.x || y1 > layerPoint.y + rMax || y2 + rMax < layerPoint.y;
          });
          return marker;
        }

        let start = null;
        const delta = 250;
        function animate(timestamp) {
          var progress;
          if (start === null) start = timestamp;
          progress = timestamp - start;
          var lambda = progress / delta;
          if (lambda > 1) lambda = 1;
          lambda = lambda * (0.4 + lambda * (2.2 + lambda * -1.6));
          markerSprites.forEach(function(markerSprite) {
            markerSprite.x = markerSprite.currentX + lambda * (markerSprite.targetX - markerSprite.currentX);
            markerSprite.y = markerSprite.currentY + lambda * (markerSprite.targetY - markerSprite.currentY);
            markerSprite.scale.set(markerSprite.currentScale + lambda * (markerSprite.targetScale - markerSprite.currentScale));
          });
          renderer.render(container);
          if (progress < delta) {
            frame = requestAnimationFrame(animate);
          }
        }
        if (!firstDraw && prevZoom !== zoom) {
          frame = requestAnimationFrame(animate);
        }
        firstDraw = false;
        prevZoom = zoom;
        renderer.render(container);
      }, pixiContainer, {
        doubleBuffering: doubleBuffering,
        destroyInteractionManager: true
      });
    })();
    pixiLayer.addTo(map);
  });
}

function solveCollision(circles, opts) {
  opts = opts || {};
  var tree = d3.quadtree()
    .x(function(d) {return d.xp;})
    .y(function(d) {return d.yp;});
  if (opts.extent !== undefined) tree.extent(opts.extent);
  var rMax = 0;
  circles.forEach(function(circle) {
    circle.xp = circle.x0;
    circle.yp = circle.y0;
    if (opts.r0 !== undefined) circle.r0 = opts.r0;
    circle.r = circle.r0;
    circle.xMin = circle.x0 - circle.r0;
    circle.xMax = circle.x0 + circle.r0;
    circle.yMin = circle.y0 - circle.r0;
    circle.yMax = circle.y0 + circle.r0;

    function collide(d) {
      function fixCollision(node) {
        var x = d.xp - node.xp;
        var y = d.yp - node.yp;
        var l = x * x + y * y;
        var r = d.r + node.r;
        if (l < r * r) {
          var c1, c2, lambda1, lambda2, u1, u2;
          var delta = Math.sqrt(l);
          if (d.r < node.r) {
            c1 = node; c2 = d;
          } else {
            c1 = d; c2 = node;
          }
          var r1 = c1.r;
          var r2 = c2.r;
          var alpha = (r1 + r2 + delta) / 4;
          if (l > 0) {
            u1 = (c2.xp - c1.xp) / delta;
            u2 = (c2.yp - c1.yp) / delta;
          } else {
            var theta = 2 * Math.PI * Math.random();
            u1 = Math.cos(theta);
            u2 = Math.sin(theta);
          }

          if (r2 >= alpha) {
            lambda1 = alpha / r1;
            lambda2 = alpha / r2;
          } else {
            lambda1 = (r1 - r2 + delta) / (2 * r1);
            if (lambda1 > 1) console.log(lambda1);
            lambda2 = 1;
          }
          c1.r *= lambda1;
          c2.r *= lambda2;
          c1.xp += (lambda1 - 1) * r1 * u1;
          c1.yp += (lambda1 - 1) * r1 * u2;
          c2.xp += (1 - lambda2) * r2 * u1;
          c2.yp += (1 - lambda2) * r2 * u2;
          c1.xMin = c1.xp - c1.r;
          c1.xMax = c1.xp + c1.r;
          c1.yMin = c1.yp - c1.r;
          c1.yMax = c1.yp + c1.r;
          c2.xMin = c2.xp - c2.r;
          c2.xMax = c2.xp + c2.r;
          c2.yMin = c2.yp - c2.r;
          c2.yMax = c2.yp + c2.r;
        }
      }
      return function(quad, x1, y1, x2, y2) {
        if (!quad.length) {
          do {
            if (quad.data != d && d.xMax > quad.data.xMin && d.xMin < quad.data.xMax && d.yMax > quad.data.yMin && d.yMin < quad.data.yMax) {
              fixCollision(quad.data);
            }
          } while (quad = quad.next)
        }
        return x1 > d.xMax + rMax || x2 + rMax < d.xMin || y1 > d.yMax + rMax || y2 + rMax < d.yMin;
      };
    }
    tree.visit(collide(circle));
    rMax = Math.max(rMax, circle.r);
    tree.add(circle);
  });
  if (opts.zoom !== undefined) {
    circles.forEach(function(circle) {
      circle.cache = circle.cache || {};
      circle.cache[opts.zoom] = {
        x: circle.xp,
        y: circle.yp,
        r: circle.r
      };
    });
  }
  var ret = d3.quadtree()
    .x(function(d) {return d.xp;})
    .y(function(d) {return d.yp;});
  var rMax2 = 0;
  circles.forEach(function(circle) {
    ret.add(circle);
    rMax2 = Math.max(rMax2, circle.r);
  })
  ret.rMax = rMax2;
  return ret;
}
