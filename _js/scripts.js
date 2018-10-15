/* global $ */

window.jQuery = window.$ = require( 'jquery' );
require( 'velocity-animate/velocity.js' );
require( 'lazysizes' );
require( 'lazysizes/plugins/unveilhooks/ls.unveilhooks.js' );

// Jquery & Velocity JS included in GULP
$( document ).ready( function() {
    toggleMobileNav();
    ShowHideNav();

    if($('#community-page').length) {
      console.log('Community Page');
      loadCommunityEvents();
    } else if ($('#Calendar').length) {
      loadAllEvents();
    } else {
      console.log('Not Community Page');
    }

} );

$( window ).resize( function() {
    $( '.header' ).removeClass( 'hide-nav' ); // Ensure nav will be shown on resize
    $( '.header__links' ).removeAttr( 'style' ); // If mobile nav was collapsed, make sure it's show on DESK
    $( '.header__overlay' ).remove(); // Remove mobile navigation overlay in case it was opened
} );

/*-------------------------------------------------------------------------*/
/* MOBILE NAVIGATION */
/* -----------------------------------------------------------------------*/

function toggleMobileNav() {
    $( '.header__toggle' ).click( function() {
      if ( !$( '.header__links' ).is( '.velocity-animating' ) ) {
        if ( $( '.header__links' ).hasClass( 'js--open' ) ) {
            hideMobileNav();
        } else {
            openMobileNav();
        }
      }
    } );

    $( 'body' ).on( 'click', function( e ) {

      if ( e.target.classList.contains( 'header__overlay' ) ) {
        hideMobileNav();
      }
    } );
}

function openMobileNav() {
    $( '.header__links' ).velocity( 'slideDown', {
        duration: 300,
        easing: 'ease-out',
        display: 'block',
        visibility: 'visible',
        begin: function() {
            $( '.header__toggle' ).addClass( '--open' );
            $( 'body' ).append( '<div class=\'header__overlay\'></div>' );
        },
        progress: function() {
            $( '.header__overlay' ).addClass( '--open' );
        },
        complete: function() {
            $( this ).addClass( 'js--open' );
        }
    } );
}

function hideMobileNav() {
    $( '.header__overlay' ).remove();
    $( '.header__links' ).velocity( 'slideUp', {
        duration: 300,
        easing: 'ease-out',
        display: 'none',
        visibility: 'hidden',
        begin: function() {
            $( '.header__toggle' ).removeClass( '--open' );
        },
        progress: function() {
            $( '.header__overlay' ).removeClass( '--open' );
        },
        complete: function() {
            $( this ).removeClass( 'js--open' );
            $( '.header__toggle, .header__overlay' ).removeClass( '--open' );
        }
    } );
}

/*-------------------------------------------------------------------------*/
/* SHOW/SCROLL NAVIGATION */
/* -----------------------------------------------------------------------*/

function ShowHideNav() {
    var previousScroll = 0, // previous scroll position
        $header = $( '.header' ), // just storing header in a variable
        navHeight = $header.outerHeight(), // nav height
        detachPoint = 576 + 60, // after scroll past this nav will be hidden
        hideShowOffset = 6; // scroll value after which nav will be shown/hidden

    $( window ).scroll( function() {
        var wW = 1024;

        // if window width is more than 1024px start show/hide nav
        if ( $( window ).width() >= wW ) {
            if ( !$header.hasClass( 'fixed' ) ) {
                var currentScroll = $( this ).scrollTop(),
                    scrollDifference = Math.abs( currentScroll - previousScroll );
                // if scrolled past nav
                if ( currentScroll > navHeight ) {
                    // if scrolled past detach point -> show nav
                    if ( currentScroll > detachPoint ) {
                        if ( !$header.hasClass( 'fix-nav' ) ) {
                            $header.addClass( 'fix-nav' );
                        }
                    }
                    if ( scrollDifference >= hideShowOffset ) {
                        if ( currentScroll > previousScroll ) {
                            // scroll down -> hide nav
                            if ( !$header.hasClass( 'hide-nav' ) ) {
                                $header.addClass( 'hide-nav' );
                              }
                        } else {
                            // scroll up -> show nav
                            if ( $header.hasClass( 'hide-nav' ) ) {
                                $( $header ).removeClass( 'hide-nav' );
                            }
                        }
                    }
                } else {
                    // at the top
                    if ( currentScroll <= 0 ) {
                        $header.removeClass( 'hide-nav show-nav' );
                        $header.addClass( 'top' );
                    }
                }
            }
            // scrolled to the bottom -> show nav
            if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {
                $header.removeClass( 'hide-nav' );
            }
            previousScroll = currentScroll;
        } else {
            $header.addClass( 'fix-nav' );
        }
    } );
}

/*-------------------------------------------------------------------------*/
/* POPULATE EVENTS CALENDAR */
/* -----------------------------------------------------------------------*/

let app = {
  communities: null,
  events: null,
  venues: null
};

function loadCommunityEvents(){
  fetch('https://our-communities-api.herokuapp.com/getData')
  .then(response => response.json())
  .then(data => {
    app.events = data.events;
    app.venues = data.venues;
    app.communities = data.organisations;
    return app;
  })
  .then(app => {
    let communityID = $( 'body' ).data( 'communityid' );
    let theseEvents = [];

    app.events.forEach(evt => {
      if (evt.organiserID.toString() === communityID.toString()){
        theseEvents.push(evt);
      }
    });
    theseEvents.sort(sortByDate);
    return theseEvents;
  })
  .then(matches => {
  let eventContainer = $('#eventContainer');
  let html = '';

  matches.forEach(evt => {
    html += `
    <div class="post-card">
      <a class="post-card__inner" href="#">
        <div class="post-card__header">
          <h2>${evt.title}</h2>
          DATE
        </div>
      </a>
    </div>`;
  });
  eventContainer.append(html);
  })
  .catch(err => {
    console.warn('Error' + err);
  });
}

function loadAllEvents(){
  fetch('https://our-communities-api.herokuapp.com/getData')
  .then(response => response.json())
  .then(data => {
    app.events = data.events;
    app.venues = data.venues;
    app.communities = data.organisations;
    return app;
  })
  .then(app => {
    let theseEvents = app.events;
    theseEvents.sort(sortByDate);
    return theseEvents;
  })
  .then(matches => {
    let eventContainer = $('#eventContainer');
    let html = '';

    matches.forEach(evt => {
      html += `
      <div class="post-card">
        <a class="post-card__inner" href="#">
          <div class="post-card__header">
            <h2>${evt.title}</h2>
            DATE
          </div>
        </a>
      </div>`;
  });
  eventContainer.append(html);
  })
  .catch(err => {
    console.warn('Error' + err);
  });
}


/**
* Sorts an array by date, with the oldest first. Use with Array.sort()
* @param {Event} a Event 1 to compare
* @param {Event} a Event 2 to compare
* @return {Integer} The order of items
*/
let sortByDate = (a, b) => {
  return new Date(a.start) - new Date(b.start);
};
