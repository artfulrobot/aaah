/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js-src/aaah.js":
/*!************************!*\
  !*** ./js-src/aaah.js ***!
  \************************/
/***/ (() => {

(function ($, Drupal, window, document, undefined) {
  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.aaah = {
    attach: function attach(context, settings) {
      this.$context = $(context);

      if (context === document) {
        // Stuff to init on page load
        $(window).on('resize', this.windowResized.bind(this));
        this.menuBoot();
        this.cardABoot();
      }
    },
    cardABoot: function cardABoot() {
      this.$context.find('article.card-a').on('click', function (e) {
        window.location.href = $(this).find('h1 a')[0].href;
      }).css({
        cursor: 'pointer'
      });
    },
    menuBoot: function menuBoot() {
      var $body = $('body');
      this.$menu_button = $('<a id="header__menu-toggle">Menu</a>').on('click', function () {
        $body.toggleClass('menu--show');
      }); // The class is on the <body> originally to stop mobile rendering being a mess.

      $('body').removeClass('is-mobile');
      this.topLinks = document.querySelector('ul.top-links');
      this.menuBlock = document.querySelector('#block-menu-menu-main-menu-2021>div.content');
      this.windowResized();
    },
    windowResized: function windowResized() {
      var $body = $('body');

      if (window.matchMedia("(max-width: 767px)").matches) {
        if (!$body.hasClass('is-mobile')) {
          // Switch mobile view.
          $body.addClass('is-mobile'); // Move the top links into the menu thing.

          this.menuBlock.insertAdjacentElement('afterbegin', this.topLinks);
          $('#site-header').append(this.$menu_button);
        }
      } else {
        if ($body.hasClass('is-mobile')) {
          // No (longer) mobile.
          $body.removeClass('is-mobile', 'show-menu'); // Put the top links back.

          document.querySelector('.header-logo-div').insertAdjacentElement('afterend', this.topLinks);
          this.$menu_button.detach();
        }
      }
    }
  };
})(jQuery, Drupal, window, window.document);

/***/ }),

/***/ "./sass/aaah-local.scss":
/*!******************************!*\
  !*** ./sass/aaah-local.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./sass/ckeditor.scss":
/*!****************************!*\
  !*** ./sass/ckeditor.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./sass/content.scss":
/*!***************************!*\
  !*** ./sass/content.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./sass/page.scss":
/*!************************!*\
  !*** ./sass/page.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/aaah": 0,
/******/ 			"css/page": 0,
/******/ 			"css/content": 0,
/******/ 			"css/ckeditor": 0,
/******/ 			"css/aaah-local": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			__webpack_require__.O();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkaaah"] = self["webpackChunkaaah"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/page","css/content","css/ckeditor","css/aaah-local"], () => (__webpack_require__("./js-src/aaah.js")))
/******/ 	__webpack_require__.O(undefined, ["css/page","css/content","css/ckeditor","css/aaah-local"], () => (__webpack_require__("./sass/aaah-local.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/page","css/content","css/ckeditor","css/aaah-local"], () => (__webpack_require__("./sass/ckeditor.scss")))
/******/ 	__webpack_require__.O(undefined, ["css/page","css/content","css/ckeditor","css/aaah-local"], () => (__webpack_require__("./sass/content.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/page","css/content","css/ckeditor","css/aaah-local"], () => (__webpack_require__("./sass/page.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;