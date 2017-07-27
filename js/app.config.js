/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//app.config(function ($routeProvider) {
//            $routeProvider
//            .when('/', {
//                templateUrl: 'chart.html',
//                controller: 'chartCtrl'
//            })
//            .when('/chart', {
//                templateUrl: 'chart.html',
//                controller: 'chartCtrl'
//            })
//            .when('/map', {
//                templateUrl: 'map.html',
//                controller: 'mapController'
//            });
//});

app.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);