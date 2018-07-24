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
    var prev = 0;
    var extent = map.getView().calculateExtent(map.getSize());

    var segment = 0;
    var arrows = 0;
    geometry.forEachSegment(function(start, end) {
        segment++;

        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        // arrows

        var distance = Math.sqrt((dx*dx) + (dy*dy));
        var fracStep = step / distance;
        var prevFrac = prev / distance;
        var point;

        styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(end),
            image: new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: '#0ff000'
                })
            })
        }));

        for(var frac = prevFrac; frac <= 1; frac += fracStep) {
            point = interpolate(start, end, frac);
            
            if (!ol.extent.containsCoordinate(extent, point)) {
                continue;
            }
            arrows++;            

            styles.push(new ol.style.Style({
                geometry: new ol.geom.Point(point),
                image: new ol.style.Icon({
                    src: 'arrow2.png',
                    anchor: [0.75, 0.5],
                    rotateWithView: true,
                    rotation: -rotation
                })
            }));
        }

        if (point) {
            var lastDx = end[0] - point[0];
            var lastDy = end[1] - point[1];
            var lastDistance = Math.sqrt((lastDx*lastDx) + (lastDy*lastDy));

            if (lastDistance > 0) {
                prev = step - lastDistance;
            } else {
                prev = 0;
            }
        } else {
            prev += distance - step;
        }
    });
    console.log(segment, arrows);

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