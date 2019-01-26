/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","a8eb6704b84769235fb5321c6ab3f697"],["/assets/css/main.css","f5c253c55e606b72b974d0ee0da2a800"],["/assets/img/communities/cornwall-geeks_placehold.jpg","a0b0f0063ebbac831ecd55151a25925f"],["/assets/img/communities/cornwall-geeks_thumb.jpg","23bcead9bb0c6b41d4d37db2498b81a7"],["/assets/img/communities/cornwall-geeks_thumb@2x.jpg","23bcead9bb0c6b41d4d37db2498b81a7"],["/assets/img/communities/cornwall-tech-jam_placehold.jpg","b543301c5c762dc47344e9e5e64e0abf"],["/assets/img/communities/cornwall-tech-jam_thumb.jpg","823c6d48504b08e0a5171a36b0b681ec"],["/assets/img/communities/cornwall-tech-jam_thumb@2x.jpg","823c6d48504b08e0a5171a36b0b681ec"],["/assets/img/communities/digital-exeter_placehold.jpg","2deedd2bfaa184c7d51c3fa40689a6b7"],["/assets/img/communities/digital-exeter_thumb.jpg","64bc332c12f63aa4cc720845367488e6"],["/assets/img/communities/digital-exeter_thumb@2x.jpg","64bc332c12f63aa4cc720845367488e6"],["/assets/img/communities/digital-plymouth_placehold.jpg","0efe7c1717cb91992af5c8c70cd1910b"],["/assets/img/communities/digital-plymouth_thumb.jpg","e7299061798f38b88d95614d2c6e351e"],["/assets/img/communities/digital-plymouth_thumb@2x.jpg","e7299061798f38b88d95614d2c6e351e"],["/assets/img/communities/kernow-dat_placehold.jpg","39d32887ab2002f4875ed8c6c3961ead"],["/assets/img/communities/kernow-dat_thumb.jpg","27d104a108fc32b885a79d9abe5eb656"],["/assets/img/communities/kernow-dat_thumb@2x.jpg","27d104a108fc32b885a79d9abe5eb656"],["/assets/img/communities/mesh_placehold.jpg","dcb342b859eda72fea5b728ed5c2954a"],["/assets/img/communities/mesh_thumb.jpg","05c56bc7af5c5d8675b5b804abd8a33b"],["/assets/img/communities/mesh_thumb@2x.jpg","05c56bc7af5c5d8675b5b804abd8a33b"],["/assets/img/communities/plymouth-web_placehold.jpg","f5ddd6b0bcaadb39fa0607f5f1bf803d"],["/assets/img/communities/plymouth-web_thumb.jpg","6f509366806ebe81222057911638f3d3"],["/assets/img/communities/plymouth-web_thumb@2x.jpg","6f509366806ebe81222057911638f3d3"],["/assets/img/communities/software-cornwall_placehold.jpg","b18d7996f8377283b5390ded7f212266"],["/assets/img/communities/software-cornwall_thumb.jpg","40280d778dfea0bec60105e500c24602"],["/assets/img/communities/software-cornwall_thumb@2x.jpg","40280d778dfea0bec60105e500c24602"],["/assets/img/communities/tech-exeter_placehold.jpg","73d00df46f42b40c345c8fbe94884d79"],["/assets/img/communities/tech-exeter_thumb.jpg","c2e5562973c73e41817cb61b0a517fe6"],["/assets/img/communities/tech-exeter_thumb@2x.jpg","c2e5562973c73e41817cb61b0a517fe6"],["/assets/img/communities/thinqtanq_placehold.jpg","552dde571b73c69826709a9962eabb17"],["/assets/img/communities/thinqtanq_thumb.jpg","24033a274f3dba5d3ed533910f0cee94"],["/assets/img/communities/thinqtanq_thumb@2x.jpg","24033a274f3dba5d3ed533910f0cee94"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/map-placeholder.jpg","e519a89861a9e992ede99a3e6606d780"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","6726a747eb4d828bfcf999e69ff6da4e"],["/calendar/index.html","057f8d9651882b15cf99047c6395fcc3"],["/communities/MESH/index.html","603f923536b7932e895e1a0de83eec2c"],["/communities/cornwall-digital/index.html","ffc4fd2c18eb01f6dc1598e677dce646"],["/communities/cornwall-geeks/index.html","f5e71bd74eb1cf486fa4da6cd4b0293e"],["/communities/cornwall-tech-jam/index.html","6881333c49ab7fb74022f3f7456d746a"],["/communities/digital-exeter/index.html","8d602595e19c6520a32dba7b9164eaf9"],["/communities/digital-plymouth/index.html","6cf78e8c0401fb80e311dff2b3bedf8b"],["/communities/future-sync/index.html","4e74e5ed1fa633078760b9b414163233"],["/communities/index.html","36794d4daae60d6cde0df30dda37f295"],["/communities/kernow-dat/index.html","c2694730cdd0c1ee5a5d8efb46056f36"],["/communities/plymouth-web/index.html","ca5c355ebcc1b89a01a07ba28cb83b58"],["/communities/software-cornwall/index.html","0226cedcabf52e44469bd4777bc827c2"],["/communities/tech-exeter/index.html","7df98a690330dcbeb22d3320c22e3625"],["/communities/thinq-tanq/index.html","7bd15070e9ab3516b562b17a4a0c6903"],["/events/borrow-don't-buy's-repair-cafe-and-b-day!--50643370685/index.html","fdba772912ec7e557d8361a6a212bb06"],["/events/cornwall-geeks-bfbgmpyzcbpc/index.html","affec12da4c018b5f02569e7a21e531a"],["/events/cornwall-geeks-bfbgmpyzdblc/index.html","34e236ef2f3657f62c4fc798bd5c5063"],["/events/cornwall-geeks-bfbgmpyzfblc/index.html","19b6b45e60bacb76cb6477009c730f14"],["/events/cornwall-geeks-bfbgmpyzgbhc/index.html","a73c4e16a8119158924130563c4d3778"],["/events/cornwall-geeks-bfbgmpyzhbnc/index.html","aadef03f66950df7f281d47633dbd447"],["/events/cornwall-geeks-bfbgmpyzjbkc/index.html","84cb4bb4502030170f5eeb6b7e65a57d"],["/events/cornwall-geeks-bfbgmpyzkbhc/index.html","d8b57cdd1b96243dd66bea52961daaf0"],["/events/cornwall-geeks-bfbgmpyzlbmc/index.html","ee9ae79e8c4decb978d30e0579fee757"],["/events/cornwall-geeks-bfbgmpyzmbjc/index.html","1004d09572bbfe57d48e798925d6bde0"],["/events/cornwall-geeks-bfbgmpyznbpc/index.html","90d8c9e0f4cc4b5ed92c4df9499af234"],["/events/cornwall-geeks-bfbgmpyzpblc/index.html","58ef950a443172cb9f6a2485a9284603"],["/events/cornwall-geeks-bfbgmpyzqbjc/index.html","318e38e3a7affa8af32a288fb32c96d2"],["/events/cornwall-tech-jam---february-255689395/index.html","cdb67dffaf21c31934622d25501c0882"],["/events/cpd---stem-ambassador-and-people-like-me-training---software-cornwall-256744622/index.html","a69f65ba0566c07a13ee7d0a6fd892fd"],["/events/crowd-fun-ding-meetup-53394766183/index.html","2b439e3173a4bfb539719ac8491f74d3"],["/events/crowd-fun-ding-meetup-53395001888/index.html","cbf78c42ea819af61cd607cf478bfdc2"],["/events/crowd-fun-ding-meetup-53395061065/index.html","c4599a07161cf98796ae798145217b76"],["/events/crowd-fun-ding-meetup-53428630472/index.html","720a67a882972bcd921252512f42d83b"],["/events/digital-plymouth-meetup-53539065787/index.html","1ef3048af0f790dac466ddd24435e6df"],["/events/digital-plymouth-meetup-53543066754/index.html","8f74fef03d0e9d3eabfdd7b648df8cd7"],["/events/digital-plymouth-meetup-53543155018/index.html","820fde7c620157caed9e62fa95761f62"],["/events/digital-plymouth-meetup-53543387714/index.html","f68814366ddc82fbad7d9f9d4b481a7c"],["/events/fab-february-meetup-258090605/index.html","53cfc03090b92f8be5a64fe216f00a19"],["/events/future-sync-2019-52979990578/index.html","de7f2b1c2910d354d14264e80f1b4c86"],["/events/game>play-258352041/index.html","cb934c62364292e1b90cb43642fba7a2"],["/events/march-2018-|-meetup-258155129/index.html","4274a33e5ae88ce9f9075ac80e985373"],["/events/repair-café-+-big-lunch-53391965807/index.html","901eb1ea21fae865ae73810782de0599"],["/events/repair-café---international-repair-day!-53394101194/index.html","3b07e399087f7340c155dc3ab84d1446"],["/events/repair-café---makefest-53394297782/index.html","4fb02f015063d22d7ef31bfef33f7be8"],["/events/repair-café--53388587703/index.html","a48bfcd848af208a1e07c3e4ec79d4a7"],["/events/repair-café--53394049038/index.html","a78a0aa0cd441b57457e80296e33df9a"],["/events/tech-connect---meetup---software-cornwall-257006600/index.html","2d0cc60935fc7489c003f87ed7b59b29"],["/events/tech-connect---save-the-date---software-cornwall-256977091/index.html","b9e3c10604a166dfd6e3ef364dce2e30"],["/events/watch-your-language!-gender-inclusive-text-for-small-businesses.-53687090533/index.html","7eaa21ea2d6c7d2cf8a011d2e750d64d"],["/events/watch-your-language!-gender-inclusive-text-for-small-businesses.-53687192839/index.html","5794adeb073ffbb5b7a6584e48cb1e75"],["/events/watch-your-language!-gender-inclusive-text-for-small-businesses.-53687219920/index.html","d8efab038cb318052d5a20910d0dec15"],["/events/watch-your-language!-gender-inclusive-text-for-small-businesses.-53687420520/index.html","21b7d79105144410f0398e4da588aa83"],["/index.html","e0c888011e414a708af3fa0a4d516c7d"],["/resources/attendee-feedback/index.html","9141a0f8aa0bef312ee9734e3eac6f4f"],["/resources/attendee-information/index.html","3713c9fb6b2477020ad64e70cbd2b59f"],["/resources/code-of-conduct/index.html","69cf0f8cd07c7014781de81942461e4f"],["/resources/finding-a-friendly-face/index.html","9a57b561a385157734c81bd384cfd22c"],["/resources/index.html","d21cb7e391a4962e84af1342f7d8cd73"],["/resources/sponsors/index.html","2e794974d6404d1103ff558fc50abb5d"],["/sw.js","e5a5c1ba3459a3f60c83f238865c976b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







