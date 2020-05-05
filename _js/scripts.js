/* global $ */

require('velocity-animate/velocity.js');

var originalCalendar = null;

// Jquery & Velocity JS included in at build time
$(document).ready(function ($) {
  toggleMobileNav();
  ShowHideNav();
  socialShare();
  iframeResize();

  // Save original calendar state
  if (originalCalendar === null) {
    originalCalendar = [];
    for (let i = 0; i < 50; i++) {
      originalCalendar[i] = $('#calendar-wrap').clone();
    }
  }

  $('#location-select').change(function () {
    locationFilter();
  });

  $('button.type-button').click(function (e) {
    typeFilter(e);
  });

  $('button#online').click(function (e) {
    onlineFilter(e);
  });
});

$(window).resize(function () {
  $('.header').removeClass('hide-nav'); // Ensure nav will be shown on resize
  $(".header__toggle").removeClass('--open');
  $(".header__links").removeClass('js--open');
  $('.header__links').removeAttr('style'); // If mobile nav was collapsed, make sure it's show on DESK
  $('.header__overlay').remove(); // Remove mobile navigation overlay in case it was opened
});

/*-------------------------------------------------------------------------*/
/* MOBILE NAVIGATION */
/* -----------------------------------------------------------------------*/

function toggleMobileNav() {
  $('.header__toggle').click(function () {
    if (!$('.header__links').is('.velocity-animating')) {
      if ($('.header__links').hasClass('js--open')) {
        hideMobileNav();
      } else {
        openMobileNav();
      }
    }
  });

  $('body').on('click', function (e) {
    if (e.target.classList.contains('header__overlay')) {
      hideMobileNav();
    }
  });
}

function openMobileNav() {
  $('.header__links').velocity('slideDown', {
    duration: 300,
    easing: 'ease-out',
    display: 'block',
    visibility: 'visible',
    begin: function () {
      $('.header__toggle').addClass('--open');
      $('body').append('<div class=\'header__overlay\'></div>');
    },
    progress: function () {
      $('.header__overlay').addClass('--open');
    },
    complete: function () {
      $(this).addClass('js--open');
    }
  });
}

function hideMobileNav() {
  $('.header__overlay').remove();
  $('.header__links').velocity('slideUp', {
    duration: 300,
    easing: 'ease-out',
    display: 'none',
    visibility: 'hidden',
    begin: function () {
      $('.header__toggle').removeClass('--open');
    },
    progress: function () {
      $('.header__overlay').removeClass('--open');
    },
    complete: function () {
      $(this).removeClass('js--open');
      $('.header__toggle, .header__overlay').removeClass('--open');
    }
  });
}

/*-------------------------------------------------------------------------*/
/* SHOW/SCROLL NAVIGATION */
/* -----------------------------------------------------------------------*/

function ShowHideNav() {
  var previousScroll = 0, // previous scroll position
    $header = $('.header'), // just storing header in a variable
    navHeight = $header.outerHeight(), // nav height
    detachPoint = 576 + 60, // after scroll past this nav will be hidden
    hideShowOffset = 6; // scroll value after which nav will be shown/hidden

  $(window).scroll(function () {
    var wW = 1024;
    // if window width is more than 1024px start show/hide nav
    if ($(window).width() >= wW) {
      if (!$header.hasClass('fixed')) {
        var currentScroll = $(this).scrollTop(),
          scrollDifference = Math.abs(currentScroll - previousScroll);
        // if scrolled past nav
        if (currentScroll > navHeight) {
          // if scrolled past detach point -> show nav
          if (currentScroll > detachPoint) {
            if (!$header.hasClass('fix-nav')) {
              $header.addClass('fix-nav');
            }
          }
          if (scrollDifference >= hideShowOffset) {
            if (currentScroll > previousScroll) {
              // scroll down -> hide nav
              if (!$header.hasClass('hide-nav')) {
                $header.addClass('hide-nav');
              }
            } else {
              // scroll up -> show nav
              if ($header.hasClass('hide-nav')) {
                $($header).removeClass('hide-nav');
              }
            }
          }
        } else {
          // at the top
          if (currentScroll <= 0) {
            $header.removeClass('hide-nav show-nav');
            $header.addClass('top');
          }
        }
      }
      // scrolled to the bottom -> show nav
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        $header.removeClass('hide-nav');
      }
      previousScroll = currentScroll;
    } else {
      $header.addClass('fix-nav');
    }
  });
}


/*-------------------------------------------------------------------------*/
/* MAP EMBED                                                               */
/* ------------------------------------------------------------------------*/

function showMapEmbed(lat, long, venue, geographic) {
  let html = document.getElementById('map-container');
  html.innerHTML = `<iframe frameborder="0" allowfullscreen class="map-embed"
  src="https://maps.google.com/maps?q=${venue},${geographic}&hl=es;z=14&amp;output=embed"></iframe>`;
}

try {
  document.getElementById('show-map').addEventListener('click', (e) => {
    if (e.target.id === 'show-map') {
      e.preventDefault();
      console.log('show map');
      showMapEmbed(e.target.getAttribute('data-lat'),
        e.target.getAttribute('data-long'),
        e.target.getAttribute('data-venue'),
        e.target.getAttribute('data-geographic'));
    }
  });
} catch (e) {}

/*-------------------------------------------------------------------------*/
/* SOCIAL SHARE                                                            */
/* ------------------------------------------------------------------------*/

function socialShare() {

  // Can we use web share?
  if (navigator.share) {

    // get page information
    const description = document.getElementsByName('description');
    const pageInfo = {
      url: location.href,
      title: document.title || '',
      text: window.shareDescription ? window.shareDescription : description[0].content
    };

    const shareButton = document.querySelector('.share');

    if (shareButton) {
      shareButton.innerHTML = 'Share this';

      shareButton.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.share(pageInfo);
      });
    }
  }
};

/*-------------------------------------------------------------------------*/
/* LOCATION FILTER                                                         */
/* ------------------------------------------------------------------------*/

function locationFilter() {
  // reset active indicator
  $('#all-types-button').removeClass('active');

  // insert original dom state incase this isn't the first filter
  $('#calendar-wrap').replaceWith(originalCalendar[0]);
  originalCalendar.shift();

  // get location value
  let selectedLocation = $('#location-select').val();

  // Update visual state
  if (selectedLocation === 'Online event') {
    $('#online').addClass('active');
  } else {
    $('#online').removeClass('active');
    $('#all-types-button').addClass('active');
  }

  // Handle show all
  if (selectedLocation === 'all') {
    $('#all-types-button').addClass('active');
    return;
  }

  $('.month-block').each(function (i, block) {
    block = $(block);
    let month = block.data('month');
    let items = block.find('.event-card');
    let matches = [];

    // Filter out the matched
    items.each(function (j, item) {
      if ($(item).data('location') === selectedLocation) {
        matches.push(item);
      }
    });

    // Add matches into the DOM
    block.empty();
    matches.forEach(function (match) {
      block.append(match);
    });

    // Tweak the text based upon number of events and location
    $('.num-remaining-' + month).html(matches.length);
    if (matches.length === 1) {
      $('.num-remaining-plural-' + month).html('');
      $('.are-is-' + month).html('is');
    } else {
      $('.num-remaining-plural-' + month).html('s');
      $('.are-is-' + month).html('are');
    }

    // Add the location if applicable
    if (selectedLocation === 'Online event') {
      $('.num-remaining-location-' + month).html(' which are hosted online');
    } else {
      $('.num-remaining-location-' + month).html(' in ' + selectedLocation);
    }

  });
}

/*-------------------------------------------------------------------------*/
/* TYPE FILTER                                                          */
/* ------------------------------------------------------------------------*/

function typeFilter(e) {
  console.log('type filter hit');

  // reset active indicator
  $('.type-button').removeClass('active');

  // insert original dom state incase this isn't the first filter
  $('#calendar-wrap').replaceWith(originalCalendar[0]);
  originalCalendar.shift();

  let selectedType = e.target.getAttribute('data-type');
  console.log(selectedType);

  if (selectedType === 'all') {
    $('#location-select :nth-child(1)').prop('selected', true).trigger('change');
    return;
  }

  $('.month-block').each(function (i, block) {
    block = $(block);
    let month = block.data('month');
    let items = block.find('.event-card');
    let matches = [];

    // Filter out the matched
    items.each(function (j, item) {
      console.log($(item).data('type'));
      if ($(item).data('type') === selectedType) {
        matches.push(item);
      }
    });

    // Add matches into the DOM
    block.empty();
    matches.forEach(function (match) {
      block.append(match);
    });

    // Tweak the text based upon number of events and location
    $('.num-remaining-' + month).html(matches.length);
    if (matches.length === 1) {
      $('.num-remaining-plural-' + month).html('');
      $('.are-is-' + month).html('is');
    } else {
      $('.num-remaining-plural-' + month).html('s');
      $('.are-is-' + month).html('are');
    }

    // Remove the location
    $('.num-remaining-location-' + month).html('');

    // Add type
    if (selectedType !== 'all') {
      $('.type-text-' + month).html(' in the ' + selectedType + ' category');
    }
  });
}

/*-------------------------------------------------------------------------*/
/* ONLINE FILTER                                                           */
/* ------------------------------------------------------------------------*/

function onlineFilter() {
  // insert original dom state incase this isn't the first filter
  $('#calendar-wrap').replaceWith(originalCalendar[0]);
  originalCalendar.shift();

  $('.month-block').each(function (i, block) {
    block = $(block);
    let month = block.data('month');
    let items = block.find('.event-card');
    let matches = [];

    // Filter out the matched
    items.each(function (j, item) {
      if ($(item).data('location') === 'Online event') {
        matches.push(item);
      }
    });

    // Add matches into the DOM
    block.empty();
    matches.forEach(function (match) {
      block.append(match);
    });

    // Tweak the text based upon number of events and location
    $('.num-remaining-' + month).html(matches.length);
    if (matches.length === 1) {
      $('.num-remaining-plural-' + month).html('');
      $('.are-is-' + month).html('is');
    } else {
      $('.num-remaining-plural-' + month).html('s');
      $('.are-is-' + month).html('are');
    }

    // Add the location if applicable
    $('.num-remaining-location-' + month).html(' which are hosted online');
  });
}

/*-------------------------------------------------------------------------*/
/* IFRAME RESIZE                                                           */
/* ------------------------------------------------------------------------*/

function iframeResize() {
    $('iframe').each(function() {
        let height = Math.floor($(this).width() / (16/9));
        $(this).height(height);
    });
}
