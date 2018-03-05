var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/egaoneko/cjee9xi2e3rqk2snprvd1lqid'
});

map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['chicago-parks'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
});