(function (angular) {
    'use strict';

    angular
            .module('demoApp')
            .controller('DashboardCtrl', ['$scope', function ($scope) {

                    $scope.tileContentExpanded = false;

                    /*--  Setting The Counter Value  --*/
                    $scope.countVal = '2';
                    $scope.countVal = parseInt($scope.countVal);
                    $scope.max = 30;
                    $scope.min = 2;

                    /*--  Setting The Counter Value  --*/
                    $scope.goToCount = function (count) {
                        $scope.countVal = count;
                    };

                    /*--  Setting The Counter Incremented Value  --*/
                    $scope.goToIncrement = function () {
                        $scope.countVal = parseInt($scope.countVal);
                        if ($scope.countVal >= $scope.max) {
                            return;
                        }
                        $scope.countVal = $scope.countVal + 2;
                    };

                    /*--  Setting The Counter Decremented Value  --*/
                    $scope.goToDecrement = function () {
                        $scope.countVal = parseInt($scope.countVal);
                        if ($scope.countVal <= $scope.min) {
                            return;
                        }
                        $scope.countVal = $scope.countVal - 2;
                    };
                                     
                }]);
})(angular);