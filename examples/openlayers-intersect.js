const stroke = new ol.style.Stroke({color: 'black', width: 2});
const fill = new ol.style.Fill({color: 'red'});

const styles = {
  'square': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      angle: Math.PI / 4
    })
  }),
  'triangle': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 3,
      radius: 10,
      rotation: Math.PI / 4,
      angle: 0
    })
  }),
  'star': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 5,
      radius: 10,
      radius2: 4,
      angle: 0
    })
  }),
  'cross': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      radius2: 0,
      angle: 0
    })
  }),
  'x': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      radius2: 0,
      angle: Math.PI / 4
    })
  })
};

const styleKeys = ['x', 'cross', 'star', 'triangle', 'square'];
const count = 250;
const features = new Array(count);
const e = 4500000;
for (let i = 0; i < count; ++i) {
  const styleKey = styleKeys[Math.floor(Math.random() * 5)];
  const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new ol.Feature(new ol.geom.Point(coordinates));
  features[i].setStyle(styles[styleKey]);
  features[i].setProperties({
    key: styleKey,
  });
}

const source = new ol.source.Vector({
  features: features
});

const vectorLayer = new ol.layer.Vector({
  source: source
});

const map = new ol.Map({
  layers: [
    vectorLayer
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

map.on('postcompose', () => {
  const container = document.querySelector('#container');
  const {boxRect} = getBoxInfo(container);

  const sw = map.getCoordinateFromPixel([boxRect.left, boxRect.bottom]);
  const ne = map.getCoordinateFromPixel([boxRect.right, boxRect.top]);
  const extent = ol.extent.boundingExtent([sw, ne]);
  const features = source
    .getFeatures()
    .filter((feature) => {
      return ol.extent.intersects(extent, feature.getGeometry().getExtent());
    });

  const totalCount = features.length;
  const keyCount = new Map();

  features.forEach((feature) => {
    const properties = feature.getProperties();
    const key = properties['key'];

    if (!keyCount.has(key)) {
      keyCount.set(key, 1);
      return;
    }

    keyCount.set(key, keyCount.get(key) + 1);
  });

  const keyCountText = [];
  const entries = keyCount.entries();
  let next = entries.next();

  while (!next.done) {
    const entry = next.value;
    keyCountText.push(`${entry[0]}: ${entry[1]}`);
    next = entries.next();
  }

  const info = document.getElementById('info');
  info.innerHTML = `Total: ${totalCount}` + (keyCountText.length > 0 ? ', ' + keyCountText.join(', ') : '');
});

function drawFeatureBox() {
  const container = document.querySelector('#container');
  const prevFeatureBox = document.querySelector('#feature-box');

  if (prevFeatureBox) {
    container.removeChild(prevFeatureBox);
  }

  const frag = document.createDocumentFragment();
  const {topRect, leftRect, bottomRect, rightRect} = getBoxInfo(container);

  const box = document.createElement('DIV');
  box.id = 'feature-box';
  box.className = 'feature-box';
  frag.appendChild(box);

  const top = document.createElement('DIV');

  top.style.cssText = `
      position: absolute;
      top: ${topRect.top}px;
      left: ${topRect.left}px;
      right: ${topRect.right}px;
      bottom: ${topRect.bottom}px;
    `;
  top.className = 'feature-box-edge';
  box.appendChild(top);

  const left = document.createElement('DIV');
  left.style.cssText = `
      position: absolute;
      top: ${leftRect.top}px;
      left: ${leftRect.left}px;
      right: ${leftRect.right}px;
      bottom: ${leftRect.bottom}px;
    `;
  left.className = 'feature-box-edge';
  box.appendChild(left);

  const bottom = document.createElement('DIV');
  bottom.style.cssText = `
      position: absolute;
      top: ${bottomRect.top}px;
      left: ${bottomRect.left}px;
      right: ${bottomRect.right}px;
      bottom: ${bottomRect.bottom}px;
    `;
  bottom.className = 'feature-box-edge';
  box.appendChild(bottom);

  const right = document.createElement('DIV');
  right.style.cssText = `
      position: absolute;
      top: ${rightRect.top}px;
      left: ${rightRect.left}px;
      right: ${rightRect.right}px;
      bottom: ${rightRect.bottom}px;
    `;
  right.className = 'feature-box-edge';
  box.appendChild(right);

  container.appendChild(frag);
}

function getBoxInfo(container) {
  const containerRect = container.getBoundingClientRect();
  const x = containerRect.width * 0.5;
  const y = containerRect.height * 0.5;
  const width = 200;
  const height = 200;

  const boxRect = {
    top: y - height * 0.5,
    left: x - width * 0.5,
    bottom: y + height * 0.5,
    right: x + width * 0.5,
  };
  const border = 2;

  const topRect = {
    top: boxRect.top,
    left: boxRect.left,
    bottom: containerRect.height - boxRect.top - border,
    right: containerRect.width - boxRect.right,
  };

  const leftRect = {
    top: boxRect.top,
    left: boxRect.left,
    bottom: containerRect.height - boxRect.bottom,
    right: containerRect.width - boxRect.left - border,
  };

  const bottomRect = {
    top: boxRect.bottom - border,
    left: boxRect.left,
    bottom: containerRect.height - boxRect.bottom,
    right: containerRect.width - boxRect.right,
  };

  const rightRect = {
    top: boxRect.top,
    left: boxRect.right - border,
    bottom: containerRect.height - boxRect.bottom,
    right: containerRect.width - boxRect.right,
  };

  return {
    boxRect,
    topRect,
    leftRect,
    rightRect,
    bottomRect
  }
}

drawFeatureBox();

window.addEventListener('resize', () => {
  drawFeatureBox();
});
