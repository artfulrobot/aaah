!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){n(1),n(2),n(7),n(9),e.exports=n(11)},function(e,t){function n(e,t){this.disableWaypoints=!0,this.outputElement=e,this.headings=t;for(var n=this.headings.length,i=parseInt(this.headings[0].tagName[1]),o=0,a={title:"No title",children:[],e:null,parent:null},l=a,s={},d=0;d<n;d++){(h=this.headings.eq(d)).before('<span class="docnav__fakeanchor"/>');var r=h[0].tagName[1]-i;if(h[0].id||(h[0].id="docnav"+d),r>o)for(;r>o;){var c={title:"No title",children:[],e:null,parent:l};l.children.push(c),o++,l=c}else if(r<o)for(;r<o&&o>0;)l=l.parent,o--;c={title:h.text(),children:[],e:h,parent:l};l.children.push(c),o++,l=c,s[h[0].id]=c}this.map=a,this.selected=[a.children[0]];var u=this;for(new Vue({el:this.outputElement[0],data:{theMap:a,selected:this.selected,docNav:u},template:'<div class="docnav-wrapper"><docnav\n      :doc-nav="docNav"\n      :item="theMap"\n      :selected="selected"\n      depth="0" /></div>'}),d=0;d<n;d++){var h;!function(e){e.e.docnavWaypoint=new Waypoint({element:e.e[0],offset:"60%",handler:function(t){u.disableWaypoints||"down"!=t||(console.log(t,"bottom in view ",e.e[0]),u.selectItem(e))}}),e.e.docnavWaypoint=new Waypoint({element:e.e[0],offset:"20%",handler:function(t){u.disableWaypoints||"up"!=t||(console.log(t,"top in view ",e.e[0]),u.selectItem(e))}})}(s[(h=this.headings.eq(d))[0].id])}this.disableWaypoints=!1}var i;n.prototype.selectItem=function(e){this.selected.splice(0,this.selected.length,e);for(var t=e.parent;t.parent;)this.selected.push(t),t=t.parent},window.Vue&&Vue.component("docnav",{props:["item","depth","selected","docNav"],template:'<ul :class="\'docnav depth-\' + depth">\n    <li v-for="li in item.children"\n      :class="getClasses(li)"\n      >\n      <a v-if="li.e" href @click="focus(li, $event)" >{{li.title}}</a>\n      <docnav\n        :selected="selected"\n        :item="li"\n        :doc-nav="docNav"\n        :depth="parseInt(depth) + 1"\n        v-if="li.children.length>0"\n        />\n    </li></ul>',methods:{focus:function(e,t){t&&t.preventDefault(),this.docNav.disableWaypoints=!0,e.e.addClass("attention").prev()[0].scrollIntoView(),this.docNav.selectItem(e),window.setTimeout((function(){e.e.removeClass("attention")}),1e3);var n=this.docNav;window.setTimeout((function(){n.disableWaypoints=!1}),300)},getClasses:function(e){var t={selected:e.e==this.selected[0].e};t["depth-"+this.depth]=!0;for(var n=this.selected.length,i=1;i<n;i++)this.selected[i].e==e.e&&(t["selected-route"]=!0);return null===e.e&&(t["selected-route"]=!0),t}}}),i="CRM"in window?CRM.$:jQuery,console.log("dollar ",i),i((function(){var e=i(".field-name-body .field-item").find("h1, h2, h3, h4, h5").not("aside h1, aside h2"),t=i("<div/>");e.length>0&&t.length>0&&(i("aside.sidebar .menu-block-1 li.active").append(t),t.docNav=new n(t,e));var o=i("#main.has-sidebar");i("#sidebar-toggle").on("click",(function(e){if(o.hasClass("sidebar-closed")){var t=(new Date).toUTCString();document.cookie="hideSidebar=; expires="+t}else{var n=new Date;n.setFullYear((new Date).getFullYear()+1),n=n.toUTCString(),document.cookie="hideSidebar=true; expires="+n}o.toggleClass("sidebar-closed")})),"true"===document.cookie.replace(/(?:(?:^|.*;\s*)hideSidebar\s*\=\s*([^;]*).*$)|^.*$/,"$1")&&o.addClass("sidebar-closed")}))},function(e,t){},,,,,function(e,t){},,function(e,t){},,function(e,t){}]);
