;;

function DocNav(outputElement, inputElements) {
  this.outputElement = outputElement;
  this.inputElements = inputElements;
  this.headings = this.inputElements.find('h1, h2, h3, h4, h5, h6');
  var last = 0;
  var l = this.headings.length;
  var baseLevel = parseInt(this.headings[0].tagName[1]);
  var currentLevel = 0;
  var map = [];
  var currentParent = map;
  var stack = [];
  var flatMap = [];
  for (var i = 0; i < l; i++) {
    var e = this.headings.eq(i);
    var headingDepth = e[0].tagName[1] - baseLevel;
    if (!e[0].id) {
      e[0].id = 'docnav' + i;
    }

    // Find the appropriate parent for this new thing, store it in currentParent.
    if (headingDepth > currentLevel) {
      // Deal with skipped headers, h2...h4
      while (headingDepth > currentLevel) {
        // Add empty child.
        var newChild = { title: 'No title', children: [], e: null };
        currentParent.push(newChild);
        currentLevel++;
        stack.push(currentParent);
        currentParent = newChild.children;
      }
    } else if (headingDepth < currentLevel) {
      while (headingDepth < currentLevel && currentLevel > 0) {
        // This is an ancestor.
        currentParent = stack.pop();
        currentLevel--;
      }
    }

    // Got current Parent, create the element now and set that as the currentParent.
    var newChild = { title: e.text(), children: [], e: e };
    currentParent.push(newChild);
    // Save the current parent as we'll need to go back to it.
    stack.push(currentParent);
    currentLevel++;
    currentParent = newChild.children;
    flatMap[e[0].id] = newChild;
  }
  this.map = map;
  console.log("map ", map, "output ele", this.outputElement);
  // Create Vue app.
  new Vue({
    el: this.outputElement[0],
    data: { theMap: map, flatMap: flatMap, selected: [map[0]] },
    template: '<docnav v-bind:items="theMap" :flatMap="flatMap" :selected="selected" v-on:itemclicked="setSelected" depth="0" />',
    methods: {
      setSelected: function setSelected(obj) {
        console.log("setSelected", obj);
        this.selected = obj;
      }
    }
  });
}

Vue.component('docnav', {
  props: ['items', 'depth', 'selected'],
  template: '<ul :class="\'depth-\' + depth">\n    <li v-for="li in items" :selected="selected" :class="getClasses(li)">\n      <a v-if="li.e" href @click="focus(li, $event)" >{{li.title}}</a>\n      <docnav\n        :selected="selected"\n        v-bind:items="li.children" v-bind:depth="parseInt(depth) + 1"\n        v-on:itemclicked="bubbleclick(li, $event)"\n        v-if="li.children.length>0" />\n    </li></ul>',
  methods: {
    focus: function focus(li, e) {
      console.log("focus", li, e);
      if (e) e.preventDefault();
      li.e.addClass('attention')[0].scrollIntoView();
      this.$emit('itemclicked', [li]);
    },
    bubbleclick: function bubbleclick(li, obj) {
      console.log("bubbleclick ", obj, li);
      obj.push(li);
      this.$emit('itemclicked', obj);
    },
    getClasses: function getClasses(li) {
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

jQuery(function () {
  // Sort out the wrapper stuff.
  var i = jQuery('.field-name-body .field-item');
  var o = jQuery('<div/>');
  i = i.wrap('<div class="docnav__content"/>').parent();
  console.log("i now ", i);
  i.wrap('<div class="docnav-wrapper"></div>').parent().append(jQuery('<div class="docnav__nav"/>').append(o));
  o.docNav = new DocNav(o, i);
});
//# sourceMappingURL=docnav.js.map
