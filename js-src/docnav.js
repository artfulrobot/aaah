function DocNav(outputElement, inputElements) {
  this.outputElement = outputElement;
  this.inputElements = inputElements;
  this.headings = this.inputElements.find('h1, h2, h3, h4, h5, h6');
  var last = 0;
  var l = this.headings.length;
  var baseLevel = parseInt(this.headings[0].tagName[1]);
  var currentLevel = 0;
  var map = { title: 'No title', children: [], e:null, parent:null };
  var currentParent = map;
  var flatMap = {};
  for (var i=0; i<l; i++) {
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
        var newChild = { title: 'No title', children: [], e:null, parent:currentParent };
        currentParent.children.push(newChild);
        currentLevel++;
        currentParent = newChild;
      }
    }
    else if (headingDepth < currentLevel) {
      while (headingDepth < currentLevel && currentLevel>0) {
        // This is an ancestor.
        currentParent = currentParent.parent;
        currentLevel--;
      }
    }

    // Got current Parent, create the element now and set that as the currentParent.
    var newChild = { title: e.text(), children: [], e:e, parent: currentParent };
    console.log(e[0].tagName, "currentParent: ", currentParent);
    currentParent.children.push(newChild);
    currentLevel++;
    currentParent = newChild;
    flatMap[e[0].id] = newChild;
  }
  this.map = map;
  console.log("map ", map, "output ele", this.outputElement);
  // Create Vue app.
  var selected = [map.children[0]];
  var docnavVue = new Vue({
    el: this.outputElement[0],
    data: {theMap: map, selected : selected},
    template: `<docnav
      :item="theMap"
      :selected="selected"
      depth="0" />`
  });

  for (var i=0; i<l; i++) {
    var e = this.headings.eq(i);
    var li = flatMap[e[0].id];
    console.log("setting up waypoint on ", li);
    // Set up a waypoint for this element.
    li.e.docnavWaypoint = new Waypoint({
      element: li.e[0],
      handler: function() {
        console.log("handler firing ", li);
        // Find corresponding Vue element and trigger it's clicked method?
        // selected.splice(0, selected.length-1, li);
      }
    });
  }
}

Vue.component('docnav', {
  props: ['item', 'depth', 'selected'],
  template: `<ul :class="\'depth-\' + depth">
    <li v-for="li in item.children"
      :class="getClasses(li)"
      >
      <a v-if="li.e" href @click="focus(li, $event)" >{{li.title}}</a>
      <docnav
        :selected="selected"
        :item="li"
        :depth="parseInt(depth) + 1"
        v-if="li.children.length>0"
        />
    </li></ul>`,
  methods: {
    focus: function(li, e) {
      console.log("focus", li, e);
      if (e) e.preventDefault();
      // Create a new selected array at the same ref.
      this.selected.splice(0, this.selected.length-1, li);
      var ptr = li.parent;
      while (ptr.parent) {
        this.selected.push(ptr);
        ptr = ptr.parent;
      }
      return;
      li.e.addClass('attention')[0].scrollIntoView();
      this.$emit('itemclicked', [li]);
    },
    getClasses: function(li) {
      console.log("getClasses selected:", this.selected, " this li: ", li);
      var c = {
        selected: (li.e == this.selected[0].e)
      };
      c['depth-' + this.depth] = true;
      var l = this.selected.length;
      for (var i=1; i<l; i++) {
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

jQuery(function(){
  // Sort out the wrapper stuff.
  var i = jQuery('.field-name-body .field-item');
  var o = jQuery('<div/>');
  i = i.wrap('<div class="docnav__content"/>').parent();
  console.log("i now ", i);
  i.wrap('<div class="docnav-wrapper"></div>').parent().append(jQuery('<div class="docnav__nav"/>').append(o));
  o.docNav = new DocNav(o, i);
});
