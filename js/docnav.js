'use strict';

function DocNav(outputElement, headings) {
  this.disableWaypoints = true;
  this.outputElement = outputElement;
  this.headings = headings;
  var last = 0;
  var l = this.headings.length;
  var baseLevel = parseInt(this.headings[0].tagName[1]);
  var currentLevel = 0;
  var map = { title: 'No title', children: [], e: null, parent: null };
  var currentParent = map;
  var flatMap = {};
  for (var i = 0; i < l; i++) {
    var e = this.headings.eq(i);
    e.before('<span class="docnav__fakeanchor"/>');
    var headingDepth = e[0].tagName[1] - baseLevel;
    if (!e[0].id) {
      e[0].id = 'docnav' + i;
    }

    // Find the appropriate parent for this new thing, store it in currentParent.
    if (headingDepth > currentLevel) {
      // Deal with skipped headers, h2...h4
      while (headingDepth > currentLevel) {
        // Add empty child.
        var newChild = { title: 'No title', children: [], e: null, parent: currentParent };
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
    }

    // Got current Parent, create the element now and set that as the currentParent.
    var newChild = { title: e.text(), children: [], e: e, parent: currentParent };
    //console.log(e[0].tagName, "currentParent: ", currentParent);
    currentParent.children.push(newChild);
    currentLevel++;
    currentParent = newChild;
    flatMap[e[0].id] = newChild;
  }
  this.map = map;
  //console.log("map ", map, "output ele", this.outputElement);
  // Create Vue app.
  this.selected = [map.children[0]];
  var thisDocNav = this;
  var docnavVue = new Vue({
    el: this.outputElement[0],
    data: { theMap: map, selected: this.selected, docNav: thisDocNav },
    template: '<div class="docnav-wrapper"><docnav\n      :doc-nav="docNav"\n      :item="theMap"\n      :selected="selected"\n      depth="0" /></div>'
  });

  for (var i = 0; i < l; i++) {
    var e = this.headings.eq(i);
    var li = flatMap[e[0].id];
    // Set up a waypoint for this element.
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
  this.selected.splice(0, this.selected.length, li);
  //console.log("NEW SELECTION1:", this.selected.map(x => { return x.title; }));
  var ptr = li.parent;
  while (ptr.parent) {
    this.selected.push(ptr);
    ptr = ptr.parent;
  }
};

if (window.Vue) {
  Vue.component('docnav', {
    props: ['item', 'depth', 'selected', 'docNav'],
    template: '<ul :class="\'docnav depth-\' + depth">\n    <li v-for="li in item.children"\n      :class="getClasses(li)"\n      >\n      <a v-if="li.e" href @click="focus(li, $event)" >{{li.title}}</a>\n      <docnav\n        :selected="selected"\n        :item="li"\n        :doc-nav="docNav"\n        :depth="parseInt(depth) + 1"\n        v-if="li.children.length>0"\n        />\n    </li></ul>',
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
    }

    // xxx move this

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
//# sourceMappingURL=docnav.js.map
