var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var source = new ol.source.Vector();

var styleFunction = function(feature) {
    var geometry = feature.getGeometry();
    var styles = [
        // linestring
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#ffffff',
                width: 2
            })
        })
    ];

    var step = getCoordinateStepFromPixel(map, 10);

    geometry.forEachSegment(function(start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        // arrows

        var fracStep = step / Math.sqrt((dx*dx) + (dy*dy));

        for(var frac = 0; frac <= 1; frac += fracStep) {
            styles.push(new ol.style.Style({
                geometry: new ol.geom.Point(interpolate(start, end, frac)),
                image: new ol.style.Icon({
                    src: 'arrow2.png',
                    anchor: [0.75, 0.5],
                    rotateWithView: true,
                    rotation: -rotation
                })
            }));
        }
    });

    // geometry.forEachSegment(function(start, end) {
    //     var dx = end[0] - start[0];
    //     var dy = end[1] - start[1];
    //     var rotation = Math.atan2(dy, dx);
    //     // arrows
    //     styles.push(new ol.style.Style({
    //         geometry: new ol.geom.Point(end),
    //         image: new ol.style.Icon({
    //             src: 'arrow2.png',
    //             anchor: [0.75, 0.5],
    //             rotateWithView: true,
    //             rotation: -rotation
    //         })
    //     }));
    // });

    return styles;
};
var vector = new ol.layer.Vector({
    source: source,
    style: styleFunction
    });

var map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
        center: [-11000000, 4600000],
        zoom: 4
    })
});

map.addInteraction(new ol.interaction.Draw({
    source: source,
    type: 'LineString'
}));

function interpolate(a, b, frac) // points A and B, frac between 0 and 1
{
    var nx = a[0]+(b[0]-a[0])*frac;
    var ny = a[1]+(b[1]-a[1])*frac;
    return [nx, ny];
}

function getCoordinateStepFromPixel(map, step) {
    return Math.abs(map.getCoordinateFromPixel([step,0])[0] - map.getCoordinateFromPixel([0,0])[0]);
}