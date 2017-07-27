(function (angular) {
    'use strict';
    angular
            .module('crankApp')
            .controller('homeCtrl', function ($scope, $mdSidenav) {
//                $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
                $scope.slide = false;
                $scope.pageClass = 'page-home';
                $scope.toggleLeft = buildToggler('left');
                $scope.toggleRight = buildToggler('right');
                function buildToggler(componentId) {
                    return function () {
                        $mdSidenav(componentId).toggle();
                    };
                }
            })
            .controller('adminController', function ($scope) {
                $scope.pageClass = 'page-admin';
            })
            .controller('mapController', function ($scope) {
                $scope.pageClass = 'page-map';
            });
            
})(angular);

/**
 * Created by Kupletsky Sergey on 05.11.14.
 *
 * Material Design Responsive Table
 * Tested on Win8.1 with browsers: Chrome 37, Firefox 32, Opera 25, IE 11, Safari 5.1.7
 * You can use this table in Bootstrap (v3) projects. Material Design Responsive Table CSS-style will override basic bootstrap style.
 * JS used only for table constructor: you don't need it in your project
 */

$(document).ready(function () {

    var table = $('#table');

    // Table bordered
    $('#table-bordered').change(function () {
        var value = $(this).val();
        table.removeClass('table-bordered').addClass(value);
    });

    // Table striped
    $('#table-striped').change(function () {
        var value = $(this).val();
        table.removeClass('table-striped').addClass(value);
    });

    // Table hover
    $('#table-hover').change(function () {
        var value = $(this).val();
        table.removeClass('table-hover').addClass(value);
    });

    // Table color
    $('#table-color').change(function () {
        var value = $(this).val();
        table.removeClass(/^table-mc-/).addClass(value);
    });
});

// jQuery’s hasClass and removeClass on steroids
// by Nikita Vasilyev
// https://github.com/NV/jquery-regexp-classes
(function (removeClass) {

    jQuery.fn.removeClass = function (value) {
        if (value && typeof value.test === "function") {
            for (var i = 0, l = this.length; i < l; i++) {
                var elem = this[i];
                if (elem.nodeType === 1 && elem.className) {
                    var classNames = elem.className.split(/\s+/);

                    for (var n = classNames.length; n--; ) {
                        if (value.test(classNames[n])) {
                            classNames.splice(n, 1);
                        }
                    }
                    elem.className = jQuery.trim(classNames.join(" "));
                }
            }
        } else {
            removeClass.call(this, value);
        }
        return this;
    }

})(jQuery.fn.removeClass);