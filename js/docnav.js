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

/***/ "./js-src/docnav.js":
/*!**************************!*\
  !*** ./js-src/docnav.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function DocNav(outputElement, headings) {
  this.disableWaypoints = true;
  this.outputElement = outputElement;
  this.headings = headings;
  var last = 0;
  var l = this.headings.length;
  var baseLevel = parseInt(this.headings[0].tagName[1]);
  var currentLevel = 0;
  var map = {
    title: 'No title',
    children: [],
    e: null,
    parent: null
  };
  var currentParent = map;
  var flatMap = {};

  for (var i = 0; i < l; i++) {
    var e = this.headings.eq(i);
    e.before('<span class="docnav__fakeanchor"/>');
    var headingDepth = e[0].tagName[1] - baseLevel;

    if (!e[0].id) {
      e[0].id = 'docnav' + i;
    } // Find the appropriate parent for this new thing, store it in currentParent.


    if (headingDepth > currentLevel) {
      // Deal with skipped headers, h2...h4
      while (headingDepth > currentLevel) {
        // Add empty child.
        var newChild = {
          title: 'No title',
          children: [],
          e: null,
          parent: currentParent
        };
        currentParent.children.push(newChild);
        currentLevel++;
        currentParent = newChild;
      }
    } else if (headingDepth < currentLevel) {
      while (headingDepth < currentLevel && currentLevel > 0) {
        // This is an ancestor.
        currentParent = currentParent.parent;
        currentLevel--;
      }
    } // Got current Parent, create the element now and set that as the currentParent.


    var newChild = {
      title: e.text(),
      children: [],
      e: e,
      parent: currentParent
    }; //console.log(e[0].tagName, "currentParent: ", currentParent);

    currentParent.children.push(newChild);
    currentLevel++;
    currentParent = newChild;
    flatMap[e[0].id] = newChild;
  }

  this.map = map; //console.log("map ", map, "output ele", this.outputElement);
  // Create Vue app.

  this.selected = [map.children[0]];
  var thisDocNav = this;
  var docnavVue = new Vue({
    el: this.outputElement[0],
    data: {
      theMap: map,
      selected: this.selected,
      docNav: thisDocNav
    },
    template: "<div class=\"docnav-wrapper\"><docnav\n      :doc-nav=\"docNav\"\n      :item=\"theMap\"\n      :selected=\"selected\"\n      depth=\"0\" /></div>"
  });

  for (var i = 0; i < l; i++) {
    var e = this.headings.eq(i);
    var li = flatMap[e[0].id]; // Set up a waypoint for this element.

    (function (li) {
      li.e.docnavWaypoint = new Waypoint({
        element: li.e[0],
        offset: '60%',
        handler: function handler(direction) {
          if (!thisDocNav.disableWaypoints && direction == 'down') {
            console.log(direction, "bottom in view ", li.e[0]);
            thisDocNav.selectItem(li);
          }
        }
      });
      li.e.docnavWaypoint = new Waypoint({
        element: li.e[0],
        offset: '20%',
        handler: function handler(direction) {
          if (!thisDocNav.disableWaypoints && direction == 'up') {
            console.log(direction, "top in view ", li.e[0]);
            thisDocNav.selectItem(li);
          }
        }
      });
    })(li);
  }

  this.disableWaypoints = false;
}

DocNav.prototype.selectItem = function (li) {
  this.selected.splice(0, this.selected.length, li); //console.log("NEW SELECTION1:", this.selected.map(x => { return x.title; }));

  var ptr = li.parent;

  while (ptr.parent) {
    this.selected.push(ptr);
    ptr = ptr.parent;
  }
};

if (window.Vue) {
  Vue.component('docnav', {
    props: ['item', 'depth', 'selected', 'docNav'],
    template: "<ul :class=\"'docnav depth-' + depth\">\n    <li v-for=\"li in item.children\"\n      :class=\"getClasses(li)\"\n      >\n      <a v-if=\"li.e\" href @click=\"focus(li, $event)\" >{{li.title}}</a>\n      <docnav\n        :selected=\"selected\"\n        :item=\"li\"\n        :doc-nav=\"docNav\"\n        :depth=\"parseInt(depth) + 1\"\n        v-if=\"li.children.length>0\"\n        />\n    </li></ul>",
    methods: {
      focus: function focus(li, e) {
        // console.log("focus", li, e);
        if (e) e.preventDefault();
        this.docNav.disableWaypoints = true;
        li.e.addClass('attention').prev()[0].scrollIntoView();
        this.docNav.selectItem(li);
        window.setTimeout(function () {
          li.e.removeClass('attention');
        }, 1000);
        var docNav = this.docNav;
        window.setTimeout(function () {
          docNav.disableWaypoints = false;
        }, 300);
      },
      getClasses: function getClasses(li) {
        //console.log("getClasses selected:", this.selected, " this li: ", li);
        var c = {
          selected: li.e == this.selected[0].e
        };
        c['depth-' + this.depth] = true;
        var l = this.selected.length;

        for (var i = 1; i < l; i++) {
          if (this.selected[i].e == li.e) {
            c['selected-route'] = true;
          }
        }

        if (li.e === null) {
          // Inaccessible empty layers show as open.
          c['selected-route'] = true;
        }

        return c;
      }
    }
  });
}

(function ($) {
  console.log("dollar ", $);
  $(function () {
    var i = $('.field-name-body .field-item').find('h1, h2, h3, h4, h5').not('aside h1, aside h2');
    var o = $('<div/>');

    if (i.length > 0 && o.length > 0) {
      $('aside.sidebar .menu-block-1 li.active').append(o);
      o.docNav = new DocNav(o, i);
    } // xxx move this


    var $sidebarContainer = $('#main.has-sidebar');
    $('#sidebar-toggle').on('click', function (e) {
      if ($sidebarContainer.hasClass('sidebar-closed')) {
        // show sidebar.
        var yesterday = new Date().toUTCString();
        document.cookie = 'hideSidebar=; expires=' + yesterday;
      } else {
        // hide sidebar now.
        var ages_away = new Date();
        ages_away.setFullYear(new Date().getFullYear() + 1);
        ages_away = ages_away.toUTCString();
        document.cookie = 'hideSidebar=true; expires=' + ages_away;
      }

      $sidebarContainer.toggleClass('sidebar-closed');
    });

    if (document.cookie.replace(/(?:(?:^|.*;\s*)hideSidebar\s*\=\s*([^;]*).*$)|^.*$/, "$1") === 'true') {
      $sidebarContainer.addClass('sidebar-closed');
    }
  });
})('CRM' in window ? CRM.$ : jQuery);

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
/*!*****************************************************************************************************************!*\
  !*** multi ./js-src/docnav.js ./sass/aaah-local.scss ./sass/ckeditor.scss ./sass/content.scss ./sass/page.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/records.climateoutreach.org.uk/sites/all/themes/aaah/js-src/docnav.js */"./js-src/docnav.js");
__webpack_require__(/*! /var/www/records.climateoutreach.org.uk/sites/all/themes/aaah/sass/aaah-local.scss */"./sass/aaah-local.scss");
__webpack_require__(/*! /var/www/records.climateoutreach.org.uk/sites/all/themes/aaah/sass/ckeditor.scss */"./sass/ckeditor.scss");
__webpack_require__(/*! /var/www/records.climateoutreach.org.uk/sites/all/themes/aaah/sass/content.scss */"./sass/content.scss");
module.exports = __webpack_require__(/*! /var/www/records.climateoutreach.org.uk/sites/all/themes/aaah/sass/page.scss */"./sass/page.scss");


/***/ })

/******/ });