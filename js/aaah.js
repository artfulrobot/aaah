/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js-src/aaah.js":
/*!************************!*\
  !*** ./js-src/aaah.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
      this.windowResized();
    },
    windowResized: function windowResized() {
      var $body = $('body');

      if (window.matchMedia("(max-width: 767px)").matches) {
        if (!$body.hasClass('is-mobile')) {
          // Switch mobile view.
          $body.addClass('is-mobile');
          $('#site-header').append(this.$menu_button);
        }
      } else {
        if ($body.hasClass('is-mobile')) {
          // No (longer) mobile.
          $body.removeClass('is-mobile', 'show-menu');
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
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./sass/ckeditor.scss":
/*!****************************!*\
  !*** ./sass/ckeditor.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./sass/content.scss":
/*!***************************!*\
  !*** ./sass/content.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./sass/page.scss":
/*!************************!*\
  !*** ./sass/page.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************************************************!*\
  !*** multi ./js-src/aaah.js ./sass/aaah-local.scss ./sass/ckeditor.scss ./sass/content.scss ./sass/page.scss ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/drupal7/sites/dcnetwork.org/themes/aaah/js-src/aaah.js */"./js-src/aaah.js");
__webpack_require__(/*! /var/www/drupal7/sites/dcnetwork.org/themes/aaah/sass/aaah-local.scss */"./sass/aaah-local.scss");
__webpack_require__(/*! /var/www/drupal7/sites/dcnetwork.org/themes/aaah/sass/ckeditor.scss */"./sass/ckeditor.scss");
__webpack_require__(/*! /var/www/drupal7/sites/dcnetwork.org/themes/aaah/sass/content.scss */"./sass/content.scss");
module.exports = __webpack_require__(/*! /var/www/drupal7/sites/dcnetwork.org/themes/aaah/sass/page.scss */"./sass/page.scss");


/***/ })

/******/ });