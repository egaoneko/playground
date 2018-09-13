const raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

const container = document.querySelector('#map');

class CustomFocus extends ol.interaction.Pointer {

  constructor() {
    super({
      handleDownEvent: handleDownEvent,
    });
  }

}

function handleDownEvent() {
  container.focus();
}

const map = new ol.Map({
  interactions: ol.interaction.defaults({
    doubleClickZoom: false,
    dragAndDrop: false,
    dragPan: false,
    keyboardPan: false,
    keyboardZoom: false,
    mouseWheelZoom: false,
    pointer: false,
    select: false
  }).extend([
    new CustomFocus({
      condition: () => true
    }),
    new ol.interaction.DragPan({
      kinetic: new ol.Kinetic(-0.02, 3 / 150, 100),
      condition: () => true
    }),
    new ol.interaction.KeyboardPan({
      condition: () => true
    })
  ]),
  layers: [raster],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 4
  }),
  keyboardEventTarget: container
});
