(function (angular) {
    'use strict';


    angular
            .module('demoApp')
            .controller('chartCtrl', function ($scope, $window, $mdToast, $mdDialog) {

                $scope.isDlgOpen;

                /*--  Toast  --*/
                $scope.showCustomToast = function () {
                    $mdToast.show({
                        hideDelay: 29000,
                        position: 'top right',
//                        controller: 'ToastCtrl',
                        templateUrl: 'template-toast.html'
                    });
                };
                $scope.closeToast = function () {
                    if (isDlgOpen)
                        return;

                    $mdToast
                            .hide()
                            .then(function () {
                                isDlgOpen = false;
                            });
                };

                $scope.openMoreInfo = function (e) {
                    if (isDlgOpen)
                        return;
                    isDlgOpen = true;

                    $mdDialog
                            .show($mdDialog
                                    .alert()
                                    .title('More info goes here.')
                                    .textContent('Something witty.')
                                    .ariaLabel('More info')
                                    .ok('Got it')
                                    .targetEvent(e)
                                    )
                            .then(function () {
                                isDlgOpen = false;
                            });
                };


                $scope.togglePromotinBtn = false;
                $scope.AddtogglePromotinBtn = function () {
                    $scope.togglePromotinBtn = true;
                    console.log($scope.togglePromotinBtn);
                };
                $scope.RemovetogglePromotinBtn = function () {
                    $scope.togglePromotinBtn = false;
                    console.log($scope.togglePromotinBtn);
                };
                /*--  Setting Header Nav Link Active  --*/
//                $scope.nav = 'home';
//                $scope.goToTab = function (tab) {
//                    $scope.nav = tab;
//                };
                $scope.dataDetails = [
                    {
                        station: '',
                        img: 'img/station-1.png',
                        data: {
                            datasets: [
                                {
                                    data: [300, 450],
                                    backgroundColor: [
                                        "#9CD4E0",
                                        "#221F1F"
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        station: '',
                        img: 'img/station-2.png',
                        data: {
                            datasets: [
                                {
                                    data: [200, 270],
                                    backgroundColor: [
                                        "#718B52",
                                        "#221F1F"
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        station: '',
                        img: 'img/station-3.png',
                        data: {
                            datasets: [
                                {
                                    data: [30, 90],
                                    backgroundColor: [
                                        "#8B73A0",
                                        "#221F1F"
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        station: '',
                        img: 'img/station-4.png',
                        data: {
                            datasets: [
                                {
                                    data: [430, 40],
                                    backgroundColor: [
                                        "#388D9D",
                                        "#221F1F"
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        station: '',
                        img: 'img/station-5.png',
                        data: {
                            datasets: [
                                {
                                    data: [430, 100],
                                    backgroundColor: [
                                        "#656C4A",
                                        "#221F1F"
                                    ]
                                }
                            ]
                        }
                    }
                ];

                $scope.sortGroup = null;
                $scope.sideLinks = angular.element('.js-sort-links .promotion__link');
                $scope.promotion = angular.element('.promotion');
                $scope.promotionTitle = angular.element('.promotion__title', $scope.promotion);
                $scope.trackDetails = angular.element('.track__details-inner');

                /*--  Hide Track Details  --*/
                $scope.hideTrackDetails = function () {
                    angular.element('.track-list__row').show();
                    $scope.trackDetails.hide();
                };

                /*--  On click Send Link  --*/
                $scope.sideLinkClicked = function (e) {
                    e.preventDefault();
                    $scope.sideLinks.removeClass('promotion__link--active');
                    angular.element(this).addClass('promotion__link--active');
                    $scope.hideTrackDetails();

                    $scope.sortValue = angular.element(this).attr('data-sort-value');
                    $scope.sortGroup.isotope({sortBy: $scope.sortValue});
//                    $scope.promotionTitle.html(this.dataset.title);
                    $scope.width = $window.innerWidth;
                    if ($scope.width >= 960) {
                        $scope.promotionTitle.css('width', 0);

                        $($scope.promotionTitle).stop().animate({
                            width: '100%'
                        }, 700);
                    }
                };

                $scope.sortGroup = angular.element('.track-list').isotope({
                    itemSelector: '.track',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.7s',
                    getSortData: {
                        global: '[data-global-rank]',
                        continent: '[data-continent-rank]',
                        region: '[data-region-rank]',
                        local: '[data-local-rank]'
                    }
                });

                angular.element('.track-list, .track__details').perfectScrollbar({
                    wheelSpeed: 0.4
                });

                $scope.createTrackDetails = function (data) {
                    $scope.station =
                            angular.element('<div class="track__details-item">' +
                                    '<img class="track__station" src="' + data.img + '">' +
                                    '<a href="#" class="track__chart-wrap">' +
                                    '<canvas class="track__chart"></canvas>' +
                                    '</a>' +
                                    '</div>');
                    return station;
                };

                $scope.showDetailsText = function (img) {
                    $scope.newImg = img.clone();
                    $scope.trackDetails.show();

                    $scope.trackDetailsItem = angular.element('.track__details-item', trackDetails);
                    $scope.trackDetailsItem.hide();

                    $scope.wrap = angular.element(
                            '<div class="track__details-text">' +
                            '</div>'
                            );

                    $scope.table = angular.element('<table class="track__table">' +
                            '<tr>' +
                            '<td></td>' +
                            '<td>First Played</td>' +
                            '<td>Spins</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>to Date</td>' +
                            '<td>Aud. /Mill</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>WZNF-FM</td>' +
                            '<td>Biloxi</td>' +
                            '<td>Top 40</td>' +
                            '<td>08/06/2016</td>' +
                            '<td>1311</td>' +
                            '<td>1.604</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>---</td>' +
                            '<td>ovn</td>' +
                            '<td>amd</td>' +
                            '<td>mid</td>' +
                            '<td>pmd</td>' +
                            '<td>eve</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>Total Spins:</td>' +
                            '<td>273</td>' +
                            '<td>195</td>' +
                            '<td>269</td>' +
                            '<td>229</td>' +
                            '<td>345</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>Aud. In Millions:</td>' +
                            '<td>0.055</td>' +
                            '<td>0.332</td>' +
                            '<td>0.484</td>' +
                            '<td>0.458</td>' +
                            '<td>0.276</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>% of Overall Spin:</td>' +
                            '<td>21%</td>' +
                            '<td>15%</td>' +
                            '<td>21%</td>' +
                            '<td>17%</td>' +
                            '<td>26%</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>First Played:</td>' +
                            '<td>08/07/2016</td>' +
                            '<td>08/07/2016</td>' +
                            '<td>08/06/2016</td>' +
                            '<td>08/06/2016</td>' +
                            '</tr>' +
                            '<tr>' +
                            '<td>Last Played:</td>' +
                            '<td>11/09/2016</td>' +
                            '<td>11/09/2016</td>' +
                            '<td>11/09/2016</td>' +
                            '<td>11/09/2016</td>' +
                            '</tr>' +
                            '</table>'
                            );

                    $scope.wrap.append($scope.newImg);
                    $scope.wrap.append(table);
                    $scope.trackDetails.append($scope.wrap);

                    /*--  New Img Clicked  --*/
                    $scope.newImgClicked = function () {
                        $scope.wrap.hide();
                        $scope.trackDetailsItem.show();
                        angular.element('.track__details').perfectScrollbar('update');
                    };
                };

                $scope.createCharts = function () {
                    $scope.trackDetails.empty().show();
                    angular.element('.track-list').addClass('track-list--charts');
                    $scope.tracks = angular.element('.track__chart');

                    if ($scope.tracks.length === 0) {
                        $scope.documentFragment = $(document.createDocumentFragment());
                        $scope.dataDetails.forEach(function (data) {
                            documentFragment.append(createTrackDetails(data));
                        });

                        $scope.trackDetails.append(documentFragment);
                        $scope.trackChart = angular.element('.track__chart');

                        $scope.dataDetails.forEach(function (data, i) {
                            new Chart(trackChart[i], {
                                type: 'pie',
                                data: data.data
                            });
                        });

                        /*--  Track Chart Clicked  --*/
                        $scope.trackChartClicked = function (e) {
                            e.preventDefault();
                            showDetailsText(angular.element(this).closest('.track__details-item').find('.track__station'));
                            angular.element('.track__details').perfectScrollbar('update');
                        };
                    }
                };

                $scope.filterTracks = function (track) {
                    $scope.artist = angular.element('.track__artist', track).text();
                    angular.element('.track-list__row').filter(function (_, track) {
                        return angular.element('.track__artist', track).text() !== artist;
                    }).hide();

                    angular.element('.track:visible').each(function (i, el) {
                        angular.element(this).css({
                            top: angular.element(this).height() * i
                        });
                    });

                    createCharts();

                    angular.element('.track__details').perfectScrollbar('update');
                };

                $scope.tracks = angular.element('.track');

                /*--  Tracks Clicked  --*/
                $scope.tracksClicked = function () {
                    if (angular.element(this).hasClass('track--active')) {
                        $scope.sideLinks.removeClass('promotion__link--active');
                        angular.element('.ps-container').scrollTop(0);
                        filterTracks(this);
                    } else {
                        $scope.tracks.removeClass('track--active');
                        angular.element(this).addClass('track--active');
                    }
                };
            });

})(angular);

