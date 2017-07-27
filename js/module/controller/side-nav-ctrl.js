(function (angular) {
    'use strict';
    angular
            .module('demoApp')
            .controller('sideNavCtrl', function ($scope, $mdSidenav) {
                $scope.toggleLeft = buildToggler('left');
                $scope.toggleRight = buildToggler('right');
                function buildToggler(componentId) {
                    return function () {
                        $mdSidenav(componentId).toggle();
                    };
                }
            });
})(angular);