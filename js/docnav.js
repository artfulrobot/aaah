(()=>{var e,t={150:()=>{function e(e,t){this.disableWaypoints=!0,this.outputElement=e,this.headings=t;for(var n=this.headings.length,i=parseInt(this.headings[0].tagName[1]),a=0,s={title:"No title",children:[],e:null,parent:null},o=s,l={},d=0;d<n;d++){(p=this.headings.eq(d)).before('<span class="docnav__fakeanchor"/>');var r=p[0].tagName[1]-i;if(p[0].id||(p[0].id="docnav"+d),r>a)for(;r>a;){var c={title:"No title",children:[],e:null,parent:o};o.children.push(c),a++,o=c}else if(r<a)for(;r<a&&a>0;)o=o.parent,a--;c={title:p.text(),children:[],e:p,parent:o};o.children.push(c),a++,o=c,l[p[0].id]=c}this.map=s,this.selected=[s.children[0]];var h=this;for(new Vue({el:this.outputElement[0],data:{theMap:s,selected:this.selected,docNav:h},template:'<div class="docnav-wrapper"><docnav\n      :doc-nav="docNav"\n      :item="theMap"\n      :selected="selected"\n      depth="0" /></div>'}),d=0;d<n;d++){var p;!function(e){e.e.docnavWaypoint=new Waypoint({element:e.e[0],offset:"60%",handler:function(t){h.disableWaypoints||"down"!=t||(console.log(t,"bottom in view ",e.e[0]),h.selectItem(e))}}),e.e.docnavWaypoint=new Waypoint({element:e.e[0],offset:"20%",handler:function(t){h.disableWaypoints||"up"!=t||(console.log(t,"top in view ",e.e[0]),h.selectItem(e))}})}(l[(p=this.headings.eq(d))[0].id])}this.disableWaypoints=!1}var t;e.prototype.selectItem=function(e){this.selected.splice(0,this.selected.length,e);for(var t=e.parent;t.parent;)this.selected.push(t),t=t.parent},window.Vue&&Vue.component("docnav",{props:["item","depth","selected","docNav"],template:'<ul :class="\'docnav depth-\' + depth">\n    <li v-for="li in item.children"\n      :class="getClasses(li)"\n      >\n      <a v-if="li.e" href @click="focus(li, $event)" >{{li.title}}</a>\n      <docnav\n        :selected="selected"\n        :item="li"\n        :doc-nav="docNav"\n        :depth="parseInt(depth) + 1"\n        v-if="li.children.length>0"\n        />\n    </li></ul>',methods:{focus:function(e,t){t&&t.preventDefault(),this.docNav.disableWaypoints=!0,e.e.addClass("attention").prev()[0].scrollIntoView(),this.docNav.selectItem(e),window.setTimeout((function(){e.e.removeClass("attention")}),1e3);var n=this.docNav;window.setTimeout((function(){n.disableWaypoints=!1}),300)},getClasses:function(e){var t={selected:e.e==this.selected[0].e};t["depth-"+this.depth]=!0;for(var n=this.selected.length,i=1;i<n;i++)this.selected[i].e==e.e&&(t["selected-route"]=!0);return null===e.e&&(t["selected-route"]=!0),t}}}),(t="CRM"in window?CRM.$:jQuery)((function(){var n=t(".field-name-body .field-item").find("h1, h2, h3, h4, h5").not("aside h1, aside h2"),i=t("<div/>");n.length>0&&i.length>0&&(t("aside.sidebar .menu-block-1 li.active").append(i),i.docNav=new e(i,n));var a=t("#main.has-sidebar");t("#sidebar-toggle").on("click",(function(e){if(a.hasClass("sidebar-closed")){var t=(new Date).toUTCString();document.cookie="hideSidebar=; expires="+t}else{var n=new Date;n.setFullYear((new Date).getFullYear()+1),n=n.toUTCString(),document.cookie="hideSidebar=true; expires="+n}a.toggleClass("sidebar-closed")})),"true"===document.cookie.replace(/(?:(?:^|.*;\s*)hideSidebar\s*\=\s*([^;]*).*$)|^.*$/,"$1")&&a.addClass("sidebar-closed")}))},495:()=>{},681:()=>{},648:()=>{},128:()=>{}},n={};function i(e){var a=n[e];if(void 0!==a)return a.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,i),s.exports}i.m=t,e=[],i.O=(t,n,a,s)=>{if(!n){var o=1/0;for(r=0;r<e.length;r++){for(var[n,a,s]=e[r],l=!0,d=0;d<n.length;d++)(!1&s||o>=s)&&Object.keys(i.O).every((e=>i.O[e](n[d])))?n.splice(d--,1):(l=!1,s<o&&(o=s));l&&(e.splice(r--,1),t=a())}return t}s=s||0;for(var r=e.length;r>0&&e[r-1][2]>s;r--)e[r]=e[r-1];e[r]=[n,a,s]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={145:0,346:0,24:0,127:0,29:0};i.O.j=t=>0===e[t];var t=(t,n)=>{var a,s,[o,l,d]=n,r=0;for(a in l)i.o(l,a)&&(i.m[a]=l[a]);if(d)var c=d(i);for(t&&t(n);r<o.length;r++)s=o[r],i.o(e,s)&&e[s]&&e[s][0](),e[o[r]]=0;return i.O(c)},n=self.webpackChunkaaah=self.webpackChunkaaah||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),i.O(void 0,[346,24,127,29],(()=>i(150))),i.O(void 0,[346,24,127,29],(()=>i(495))),i.O(void 0,[346,24,127,29],(()=>i(681))),i.O(void 0,[346,24,127,29],(()=>i(648)));var a=i.O(void 0,[346,24,127,29],(()=>i(128)));a=i.O(a)})();