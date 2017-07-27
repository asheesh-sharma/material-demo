(function (angular) {
    'use strict';
    angular
            .module('crankApp')
            .config(['$mdIconProvider', function ($mdIconProvider) {
                    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
                }])
            .controller('chartNewCtrl', function ($scope, $mdToast, $window, $timeout) {
                $scope.togglePromotinBtn = false;
                $scope.width = $window.innerWidth;
                var parentPanel = angular.element('.promotion').height();
                var parentEl = angular.element('.track-list__inner');
                $scope.AddtogglePromotinBtn = function ($event) {
                    $event.stopPropagation();
                    $scope.togglePromotinBtn = true;
                    $mdToast.hide();
                    angular.element('.promotion').height(parentPanel);
                };
                $scope.RemovetogglePromotinBtn = function ($event) {
                    $event.stopPropagation();
                    $scope.togglePromotinBtn = false;
                };
                /*--  Toast  --*/
                $scope.showCustomRowToast = function () {
                    $mdToast.show({
                        hideDelay: 9000000,
                        position: 'top right',
                        parent: (parentEl),
                        templateUrl: 'row.html'
                    });
                    $timeout(function () {
                        var toastPanel = angular.element('.toast-wrapper .md-toast-content').height();
                        if (parentPanel < toastPanel) {
                            angular.element('.promotion').height(toastPanel + 200);
                        }
                    }, 100);                   
                };
                $scope.closeToast = function () {
                    $mdToast.hide();
                };

                /*--  Initialize Perfect Scrollbar  --*/
                angular.element('.track-list, .track__details').perfectScrollbar({
                    wheelSpeed: 0.4
                });

            });

})(angular);

