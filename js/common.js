$(document).ready(function () {
  var dataDetails = [
    {
      station: '',
      img: 'img/station-1.png',
      data: {
        datasets: [
          {
            data: [300, 450],
            backgroundColor: [
              "#9CD4E0",
              "#221F1F",
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
              "#221F1F",
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
              "#221F1F",
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
              "#221F1F",
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
              "#221F1F",
            ]
          }
        ]
      }
    }
  ];

  var sortGroup = null;
  var sideLinks = $('.js-sort-links .promotion__link');

  var promotion = $('.promotion');
  var promotionTitle = $('.promotion__title', promotion);

  var trackDetails = $('.track__details-inner');
  
  function hideTrackDetails() {
    $('.track-list__row').show();
    trackDetails.hide();
  }

  sideLinks.on('click', function (e) {
    e.preventDefault();
    sideLinks.removeClass('promotion__link--active');
    $(this).addClass('promotion__link--active');
    hideTrackDetails();

    var sortValue = $(this).attr('data-sort-value');
    sortGroup.isotope({sortBy: sortValue});

    promotionTitle.html(this.dataset.title);

    if ($(window).width() >= 960) {
      promotionTitle.css('width', 0);

      $(promotionTitle).stop().animate({
        width: '100%'
      }, 700);
    }
  });

  sortGroup = $('.track-list').isotope({
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

  promotion.on('click', function () {
    $(this).addClass('promotion--active');
  });

  promotion.on('click', '.promotion__control-btn--underscore', function (e) {
    e.stopPropagation();
    promotion.removeClass('promotion--active');
  });

  $('.track-list, .track__details').perfectScrollbar({
    wheelSpeed: 0.4
  });

  function createTrackDetails(data) {
    var station =
      $('<div class="track__details-item">' +
        '<img class="track__station" src="' + data.img + '">' +
        '<a href="#" class="track__chart-wrap">' +
        '<canvas class="track__chart"></canvas>' +
        '</a>' +
        '</div>');
    return station;
  }

  function showDetailsText(img) {
    var newImg = img.clone();
    trackDetails.show();

    var trackDetailsItem = $('.track__details-item', trackDetails);
    trackDetailsItem.hide();

    var wrap = $(
      '<div class="track__details-text">' +
      '</div>'
    );

    var table = $('<table class="track__table">' +
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

    wrap.append(newImg);
    wrap.append(table);
    trackDetails.append(wrap);

    newImg.on('click', function () {
      wrap.hide();
      trackDetailsItem.show();
      $('.track__details').perfectScrollbar('update');
    });
  }

  function createCharts() {
    trackDetails.empty().show();

    $('.track-list').addClass('track-list--charts');

    var tracks = $('.track__chart');

    if (tracks.length === 0) {
      var documentFragment = $(document.createDocumentFragment());
      dataDetails.forEach(function (data) {
        documentFragment.append(createTrackDetails(data));
      });

      trackDetails.append(documentFragment);

      trackChart = $('.track__chart');

      dataDetails.forEach(function (data, i) {
        new Chart(trackChart[i], {
          type: 'pie',
          data: data.data
        });
      });

      $('.track__chart-wrap').on('click', function (e) {
        e.preventDefault();
        showDetailsText($(this).closest('.track__details-item').find('.track__station'));
        $('.track__details').perfectScrollbar('update');
      });
    }
  }

  function filterTracks(track) {
    var artist = $('.track__artist', track).text();
    $('.track-list__row').filter(function (_, track) {
      return $('.track__artist', track).text() !== artist;
    }).hide();

    $('.track:visible').each(function (i, el) {
      $(this).css({
        top: $(this).height() * i
      });
    });

    createCharts();
  
    $('.track__details').perfectScrollbar('update');
  }

  var tracks = $('.track');
  tracks.on('click', function () {
    if ($(this).hasClass('track--active')) {
      sideLinks.removeClass('promotion__link--active');
      $('.ps-container').scrollTop(0);
      filterTracks(this);
    } else {
      tracks.removeClass('track--active');
      $(this).addClass('track--active');
    }
  });
});