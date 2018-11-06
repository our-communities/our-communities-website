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

var precacheConfig = [["/404.html","a7111247e2a74cb679cda3052eec5a4f"],["/assets/css/main.css","76b629302e052f2607ac57e57f0031bf"],["/assets/img/communities/cornwall-geeks_placehold.jpg","a0b0f0063ebbac831ecd55151a25925f"],["/assets/img/communities/cornwall-geeks_thumb.jpg","23bcead9bb0c6b41d4d37db2498b81a7"],["/assets/img/communities/cornwall-geeks_thumb@2x.jpg","23bcead9bb0c6b41d4d37db2498b81a7"],["/assets/img/communities/cornwall-tech-jam_placehold.jpg","b543301c5c762dc47344e9e5e64e0abf"],["/assets/img/communities/cornwall-tech-jam_thumb.jpg","823c6d48504b08e0a5171a36b0b681ec"],["/assets/img/communities/cornwall-tech-jam_thumb@2x.jpg","823c6d48504b08e0a5171a36b0b681ec"],["/assets/img/communities/digital-exeter_placehold.jpg","2deedd2bfaa184c7d51c3fa40689a6b7"],["/assets/img/communities/digital-exeter_thumb.jpg","64bc332c12f63aa4cc720845367488e6"],["/assets/img/communities/digital-exeter_thumb@2x.jpg","64bc332c12f63aa4cc720845367488e6"],["/assets/img/communities/digital-plymouth_placehold.jpg","0efe7c1717cb91992af5c8c70cd1910b"],["/assets/img/communities/digital-plymouth_thumb.jpg","e7299061798f38b88d95614d2c6e351e"],["/assets/img/communities/digital-plymouth_thumb@2x.jpg","e7299061798f38b88d95614d2c6e351e"],["/assets/img/communities/kernow-dat_placehold.jpg","39d32887ab2002f4875ed8c6c3961ead"],["/assets/img/communities/kernow-dat_thumb.jpg","27d104a108fc32b885a79d9abe5eb656"],["/assets/img/communities/kernow-dat_thumb@2x.jpg","27d104a108fc32b885a79d9abe5eb656"],["/assets/img/communities/mesh_placehold.jpg","dcb342b859eda72fea5b728ed5c2954a"],["/assets/img/communities/mesh_thumb.jpg","05c56bc7af5c5d8675b5b804abd8a33b"],["/assets/img/communities/mesh_thumb@2x.jpg","05c56bc7af5c5d8675b5b804abd8a33b"],["/assets/img/communities/plymouth-web_placehold.jpg","f5ddd6b0bcaadb39fa0607f5f1bf803d"],["/assets/img/communities/plymouth-web_thumb.jpg","6f509366806ebe81222057911638f3d3"],["/assets/img/communities/plymouth-web_thumb@2x.jpg","6f509366806ebe81222057911638f3d3"],["/assets/img/communities/software-cornwall_placehold.jpg","b18d7996f8377283b5390ded7f212266"],["/assets/img/communities/software-cornwall_thumb.jpg","40280d778dfea0bec60105e500c24602"],["/assets/img/communities/software-cornwall_thumb@2x.jpg","40280d778dfea0bec60105e500c24602"],["/assets/img/communities/tech-exeter_placehold.jpg","73d00df46f42b40c345c8fbe94884d79"],["/assets/img/communities/tech-exeter_thumb.jpg","c2e5562973c73e41817cb61b0a517fe6"],["/assets/img/communities/tech-exeter_thumb@2x.jpg","c2e5562973c73e41817cb61b0a517fe6"],["/assets/img/communities/thinqtanq_placehold.jpg","552dde571b73c69826709a9962eabb17"],["/assets/img/communities/thinqtanq_thumb.jpg","24033a274f3dba5d3ed533910f0cee94"],["/assets/img/communities/thinqtanq_thumb@2x.jpg","24033a274f3dba5d3ed533910f0cee94"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/map-placeholder.jpg","e519a89861a9e992ede99a3e6606d780"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","6726a747eb4d828bfcf999e69ff6da4e"],["/calendar/index.html","f65360801008c0044b69d9ec7411548b"],["/communities/MESH/index.html","9135fc394f848cfbcdf1564b3f620922"],["/communities/cornwall-digital/index.html","2993367e57044a3d0bbb70f32af77793"],["/communities/cornwall-geeks/index.html","b923cf0ad0ddb403f9d6a741e0a89b5d"],["/communities/cornwall-tech-jam/index.html","deb2fdaa2db5bc0659649d9d1e23edb1"],["/communities/digital-exeter/index.html","17e619b68cd971a9c7b8713cfd9bbaa8"],["/communities/digital-plymouth/index.html","68632ce3c0fe0cd0ab321e84518f1ce3"],["/communities/index.html","f082cc51b387711763858f173e873ac8"],["/communities/kernow-dat/index.html","e8f5208d37ad35c092f42e5c19e50bc5"],["/communities/plymouth-web/index.html","b4d768062c8c06dfdcdb43e155ebf4c1"],["/communities/software-cornwall/index.html","1f29287a7ea55e01763c1b48a81768d1"],["/communities/tech-exeter/index.html","c237355d20228885a77cca421778f1af"],["/communities/thinq-tanq/index.html","632dd4447f460ad11cd1d0ab3fd84d6d"],["/events/cornwall-geeks-bfbgmpyxnbhc/index.html","389cc970474e84071708b754e404f61d"],["/events/cornwall-geeks-bfbgmpyxpbmc/index.html","9699e24df46a5f0f98f546cd138d55de"],["/events/cornwall-geeks-bfbgmpyxqbkc/index.html","8bfc924f1e44da3f65364c4685403b72"],["/events/cornwall-geeks-bfbgmpyzcbpc/index.html","9a7a485bd524d8b42bb384dbd03db8c2"],["/events/cornwall-geeks-bfbgmpyzdblc/index.html","8ee909fc2323e7ce1ab63440b4d0b84a"],["/events/cornwall-geeks-bfbgmpyzfblc/index.html","2179cc2be12c0590869a5af72134b9b5"],["/events/cornwall-geeks-bfbgmpyzgbhc/index.html","bde75f3f22a16ff1ebb14f56a3aabfea"],["/events/cornwall-geeks-bfbgmpyzhbnc/index.html","17e8422d0d9709b21d12f15826066adc"],["/events/cornwall-geeks-bfbgmpyzjbkc/index.html","24b241c9cade50fe881325ea58250a15"],["/events/cornwall-geeks-bfbgmpyzkbhc/index.html","becb0234588f194952e61905aa7ebb3e"],["/events/cornwall-geeks-bfbgmpyzlbmc/index.html","28ddfc06334b4f4def406cb24f7daf4f"],["/events/cornwall-geeks-bfbgmpyzmbjc/index.html","af84a3f4b282f08dd6beeac7b2e5346e"],["/events/cornwall-shopify-meetup-254788070/index.html","695e472ffa509e881f4026c8dafd5fb3"],["/events/cornwall-tech-jam---december-253681313/index.html","47b74b13d9bc06082c83f4ca6f7c338f"],["/events/cornwall-tech-jam---november-255159331/index.html","75d718b8c8e1302819aa803da68cbd4c"],["/events/december-meetup-255475395/index.html","bf57514831e00e051c838493a759b1c0"],["/events/epic-quiz-night-43145262642/index.html","3e59bc45885f11817de8dfe811c988c3"],["/events/mesh-+-borrow-don't-buy---repair-cafe-plymouth-42236474432/index.html","2b3bd73d20786641e74d84136e5c6e4f"],["/events/mesh---a-very-merry-christmas-makefest-43503810067/index.html","06b5bbc7cf2e5a8042d1fe76cada390e"],["/events/mesh---minecraft-day-50041244710/index.html","152965bb7a8fcf18f766019d57fd0191"],["/events/nasa-space-apps-hackathon,-exeter-254684925/index.html","31108a1f885e7563006d518fb75ea3f1"],["/events/november-2018-|-meetup-255577150/index.html","4dfbec64dd6557361fe2c99da5998ea1"],["/events/open-day-at-pool-innovation-centre---software-cornwall-255190866/index.html","c78ca5c3406b57a515be08614124a7b0"],["/events/plymouth-web-october-event-255423078/index.html","708bd4ac2c700b98081914bc8807a615"],["/events/thinqtanq---freelancers-christmas-lunch-43503838151/index.html","a0067cf8aff3f1108330c79c4c862476"],["/events/watch-your-language!-gender-inclusive-text-for-small-businesses.-43503997628/index.html","4fff7f1bbd1a4456a50b5231f619828f"],["/getting-started/index.html","ed2098aae6f432d66ca66b9c20924fd3"],["/index.html","e429f6f2e5da3cd0ab364b7ca10285c9"],["/markdown-cheatsheet/index.html","98e1daad83f8d3bf7cad9ccba70c699f"],["/resources/attendee-feedback/index.html","ad7f89c338567720bd9178acd89a49e6"],["/resources/attendee-information/index.html","540c163052e293370d3465f10218a228"],["/resources/code-of-conduct/index.html","005716223044bdd3a23161c8cf85398b"],["/resources/finding-a-friendly-face/index.html","49172c3e264fd788339162aadbb77017"],["/resources/index.html","bda1e1bfcc65d4de20aeeaf4abb46e3f"],["/resources/sponsors/index.html","4f34f784dc19ff44db0a13e1aa5ddf16"],["/super-long-article/index.html","edb96367b8074613e8b25475af01c12a"],["/sw.js","3a29e069aed027a9cb3bac4fe736be56"],["/welcome-to-jekyll/index.html","786dea62b5d024117986cd18f1eb29e8"]];
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







