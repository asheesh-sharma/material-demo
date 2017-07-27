
app.controller('myMapCtrl', function ($scope) {
    angular.extend($scope, {
        centerProperty: {
            lat: 45,
            lng: -73
        },
        zoomProperty: 8,
        markersProperty: [{
                latitude: 45,
                longitude: -74
            }],
        clickedLatitudeProperty: null,
        clickedLongitudeProperty: null,
    });
});