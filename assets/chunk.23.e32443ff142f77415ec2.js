/*! For license information please see chunk.23.e32443ff142f77415ec2.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[23],{5722(e,t,n){"use strict"
function r(e){return e&&e.isDescriptor?"descriptor":null===e?"null":typeof e}function i(e,t,n,i){var o={configurable:!0,enumerable:!0}
"undefined"!==r(i)?o.get=i:(o.writable=!1,o.value=n),Object.defineProperty(e,t,o)}function o(e,t){delete e.__parentTreeNode,t&&Object.defineProperty(e,"__parentTreeNode",{value:t,configurable:!0,enumerable:!1})}function s(e,t){this.blueprint=e,this.builders=t}n.d(t,{A:()=>l}),s.prototype={builderFor:function(e){return this.builders[r(e)]||this.builders.default},build:function(e){var t,n={}
return this.processNode({root:this.blueprint},n),o(t=n.root,e),t},processNode:function(e,t,n){var i=Object.keys(e),s=this
return i.forEach(function(n){var i,o,u,l=e[n]
i=s.builderFor(l),o=a[r(l)]||a.default,(u=i(t,n,l,o))&&s.processNode(u[1],u[0],t)}),o(t,n),t}}
const a={descriptor:function(e,t,n){"function"==typeof n.setup&&n.setup(e,t),n.value?i(e,t,n.value):i(e,t,void 0,function(){return n.get.call(this,t)})},object:function(e,t,n){var r,o,s={}
return i(e,t,s),r=s,o=t,Object.defineProperty(r,"__meta",{value:{key:o,type:"node"},configurable:!1,enumerable:!1}),[s,n]},default:function(e,t,n){i(e,t,n)}},u={defineProperty:i,create:function(e,t){var n=function(){for(var e,t=arguments[0],n=Array.prototype.slice.call(arguments,1),r=0;r<n.length;r++)if(e=n[r])for(var i in e)void 0!==e[i]&&(t[i]=e[i])
return t}({},a,(t=t||{}).builder)
return new s(e,n).build(t.parent)},parent:function(e){return function(e){if("object"==typeof e&&null!==e)return e.__parentTreeNode}(e)},meta:function(e){return function(e){if("object"==typeof e&&null!==e)return e.__meta}(e)}},l=u},5402(e,t,n){"use strict"
n.d(t,{Or:()=>s,hm:()=>a,q3:()=>o,r7:()=>u})
var r=n(5722),i=n(7861)
const o="Element not found."
function s(e,t,n){const r=(0,i.y1)(e,t.selector,t)
a(e,t.pageObjectKey,n,{selector:r})}function a(e,t,n){let{selector:r}=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=n instanceof Error?n.message:n.toString()
const o=new u(i,{cause:{message:i,error:n.cause,key:t,node:e,selector:r}})
throw n instanceof Error&&"stack"in n&&(o.stack=n.stack),console.error(o.toString()),o}class u extends Error{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
const{cause:n}=t,{node:i,key:o,selector:s}=n||{},a=function(e,t,n){const i=[],o=function(e){let t,n=[]
for(t=e;t;t=r.A.parent(t))n.unshift(r.A.meta(t).key)
return n[0]="page",n}(e)
return t&&o.push(t),i.push(`\nPageObject: '${o.join(".")}'`),"string"==typeof n&&n.trim().length>0&&i.push(`  Selector: '${n}'`),i.join("\n")}(i,o,s)
for(var u=arguments.length,l=new Array(u>2?u-2:0),c=2;c<u;c++)l[c-2]=arguments[c]
super([e,a].filter(Boolean).join("\n"),t,...l)}}},3493(e,t,n){"use strict"
n.d(t,{F:()=>o,I:()=>s})
var r=n(5722),i=n(7861)
function o(e){return!(0,i.Zn)(e)._chainedTree}function s(e){if(o(e))return e
let t,n=[]
for(t=e;t;t=r.A.parent(t))n.unshift(r.A.meta(t).key)
return n.shift(),t=(0,i.Zn)(e)._chainedTree,n.forEach(e=>{t=function(e,t){let n
if(n=/\[(\d+)\]$/.exec(t)){let[r,i]=n
return e[t.slice(0,-r.length)].objectAt(parseInt(i,10))}return e[t]}(t,e)}),t}},3485(e,t,n){"use strict"
n.d(t,{Kt:()=>f,M5:()=>c,nV:()=>l,sM:()=>u})
var r=n(7861),i=n(9006),o=n(1320),s=n(5402)
function a(e,t){return t.testContainer||(0,r.sS)(e,"testContainer")||(0,i.c)().testContainer}function u(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
const i=(0,r.y1)(e,t,n),u=a(e,n),l=(0,o.$)(i,u).toArray()
return(0,r.Oz)(l,i),0===l.length&&(0,s.hm)(e,n.pageObjectKey,s.q3,{selector:i}),l[0]}function l(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
const i=(0,r.y1)(e,t,n),s=a(e,n)
return(0,o.$)(i,s).toArray()}function c(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
const i=(0,r.y1)(e,t,n),u=a(e,n)
let l=(0,o.$)(i,u)
return(0,r.Oz)(l,i,n.multiple),0===l.length&&(0,s.hm)(e,n.pageObjectKey,s.q3,{selector:i}),l}function f(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
const i=(0,r.y1)(e,t,n),s=a(e,n)
let u=(0,o.$)(i,s)
return(0,r.Oz)(u,i,n.multiple),u}n(5722),n(2076),n(8260)},7861(e,t,n){"use strict"
n.d(t,{Oz:()=>s,QL:()=>l,Zn:()=>u,iz:()=>f,sS:()=>c,y1:()=>a})
var r=n(5722)
function i(e){return void 0!==e}class o{constructor(e,t,n,r){this.targetNode=e,this.targetScope=t||"",this.targetSelector=n||"",this.targetFilters=r}toString(){let e,t
if(e=this.targetFilters.resetScope?this.targetScope:this.calculateScope(this.targetNode,this.targetScope),`${e} ${this.targetSelector}`.indexOf(",")>-1)throw new Error("Usage of comma separated selectors is not supported. Please make sure your selector targets a single selector.")
t=this.calculateFilters(this.targetFilters)
let n=`${e} ${this.targetSelector}${t}`.trim()
return n.length||(n=":first"),n}calculateFilters(){let e=[]
return this.targetFilters.visible&&e.push(":visible"),this.targetFilters.contains&&e.push(`:contains("${this.targetFilters.contains}")`),"number"==typeof this.targetFilters.at?e.push(`:eq(${this.targetFilters.at})`):this.targetFilters.last&&e.push(":last"),e.join("")}calculateScope(e,t){let n=this.getScopes(e)
return n.reverse(),n.push(t),n.join(" ").trim()}getScopes(e){let t=[]
return e.scope&&t.push(e.scope),!e.resetScope&&r.A.parent(e)&&(t=t.concat(this.calculateScope(r.A.parent(e)))),t}}function s(e,t,n){if(e.length>1&&!n)throw new Error(`"${t}" matched more than one element. If you want to select many elements, use collections instead.`)}function a(e,t,n){return new o(e,n.scope,t,n).toString()}function u(e){let t=r.A.parent(e),n=e
for(;t;)n=t,t=r.A.parent(t)
return n}function l(e){let t=function(e,t){let n=e,o=[]
for(;i(n);)i(n[t])&&o.push(n[t]),n=r.A.parent(n)
return o}(e,"scope")
return t.reverse().join(" ")}function c(e,t){if(i(e[t]))return e[t]
let n=r.A.parent(e)
return i(n)?c(n,t):void 0}function f(e,t){return Object.getOwnPropertyNames(t).forEach(n=>{const r=Object.getOwnPropertyDescriptor(t,n)
Object.defineProperty(e,n,r)}),e}},1320(e,t,n){"use strict"
n.d(t,{$:()=>i})
var r=n(1491)
let i
if(window.jQuery)i=window.jQuery
else{const e=(0,r.A)(n(3709))
i=e.default}},9006(e,t,n){"use strict"
n.d(t,{c:()=>i})
var r=n(2076)
function i(){return new r.A}n(8260)},2076(e,t,n){"use strict"
n.d(t,{A:()=>o})
var r=n(8260)
class i{get testContainer(){throw new Error("`testContainer` is not implemented for the adapter")}visit(){throw new Error("`visit` is not implemented for the adapter")}click(){throw new Error("`click` is not implemented for the adapter")}fillIn(){throw new Error("`fillIn` is not implemented for the adapter")}triggerEvent(){throw new Error("`triggerEvent` is not implemented for the adapter")}focus(){throw new Error("`focus` is not implemented for the adapter")}blur(){throw new Error("`blur` is not implemented for the adapter")}}class o extends i{get testContainer(){return(0,r.getRootElement)()}visit(e){return(0,r.visit)(e)}click(e){return(0,r.click)(e)}fillIn(e,t){return(0,r.fillIn)(e,t)}triggerEvent(e,t,n){if(void 0!==n.key||void 0!==n.keyCode){const i=n.key||n.keyCode
return(0,r.triggerKeyEvent)(e,t,i,n)}return(0,r.triggerEvent)(e,t,n)}focus(e){return(0,r.focus)(e)}blur(e){return(0,r.blur)(e)}}},8886(e,t,n){"use strict"
n.r(t),n.d(t,{buildSelector:()=>i.y1,findElement:()=>r.Kt,findElementWithAssert:()=>r.M5,findMany:()=>r.nV,findOne:()=>r.sM,fullScope:()=>i.QL})
var r=n(3485),i=n(7861)
n(9006),n(2076),n(8260),n(1320),n(5402),n(5722)},8176(e,t,n){"use strict"
n.r(t),n.d(t,{attribute:()=>M,blurrable:()=>v,buildSelector:()=>l.y1,clickOnText:()=>y,clickable:()=>m,collection:()=>I,contains:()=>b,count:()=>R,create:()=>O,default:()=>V,fillable:()=>x,findElement:()=>d.Kt,findElementWithAssert:()=>d.M5,focusable:()=>w,hasClass:()=>H,isHidden:()=>k,isPresent:()=>E,isVisible:()=>T,notHasClass:()=>P,property:()=>F,selectable:()=>W,text:()=>S,triggerable:()=>B,value:()=>A,visitable:()=>z})
var r=n(5722)
function i(e){if(e&&"object"==typeof e){let t=r.A.meta(e)
return Boolean(t&&t.__poDef__)}return!1}function o(e){if(i(e))return r.A.meta(e).__poDef__
throw new Error("cannot get the page object definition from a node that is not a page object")}var s=n(6584),a=n(5402),u=n(4421),l=n(7861),c=n(3493)
function f(e,t){if([t,e]=function(e,t){return t?[t,{...e}]:[e,{}]}(e,t),"function"!=typeof t)throw new Error("`action()` expects a function argument.")
return(0,s.o)(function(n){return function(){for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o]
return e.pageObjectKey=function(e,t){return`${e}(${t.length?`"${t.map(e=>String(e)).join('", "')}"`:""})`}(n,i),function(e,t){const n=(0,l.Zn)(e)
return(0,c.F)(e)?(n._promise=(0,u.resolve)(n._promise).then(()=>t()),e):(n._chainedTree._promise=t(),(0,c.I)(e))}(this,()=>{try{const n=t.bind(this)(...i)
return Promise.resolve(n).catch(t=>{(0,a.Or)(this,e,t)})}catch(t){(0,a.Or)(this,e,t)}})}})}var d=n(3485),p=n(9006)
function h(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function g(e){return e.textContent}function v(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return f({...t,selector:e},function(){const n=(0,d.sM)(this,e,t)
return(0,p.c)().blur(n)})}function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return f({...t,selector:e},function(){const n=(0,d.sM)(this,e,t)
return(0,p.c)().click(n)})}function y(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return f({...t,selector:e},function(n){const r={...t,contains:n,last:!0},i=`${e||""} *`,o=(0,d.nV)(this,i,r).length?i:e,s=(0,d.sM)(this,o,r)
return(0,p.c)().click(s)})}function b(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){return function(r){let i={pageObjectKey:`${n}("${r}")`,...t}
return o=r,g((0,d.sM)(this,e,i)).indexOf(o)>-1
var o}})}function x(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return f({...t,selector:e},function(n,r){let i
void 0===r?r=n:i=n
let o=e
if(i&&(o=function(e,t,n,r){return["input","textarea","select","[contenteditable]"].map(e=>[`${e}[data-test="${r}"]`,`${e}[aria-label="${r}"]`,`${e}[placeholder="${r}"]`,`${e}[name="${r}"]`,`${e}#${r}`]).reduce((e,t)=>e.concat(t),[]).find(r=>(0,d.nV)(e,`${t} ${r}`,n)[0])}(this,e,t,i),!o))throw new Error(`Can not find element by clue: "${i}".`)
const s=(0,d.sM)(this,o,t)
return(0,p.c)().fillIn(s,r)})}function w(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
const t={...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},selector:e}
return f(t,function(){const n=(0,d.sM)(this,e,t)
return(0,p.c)().focus(n)})}function k(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t},i=(0,d.nV)(this,e,r)
return(0,l.Oz)(i,e),0===i.length||!h(i[0])})}function E(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t},i=(0,d.nV)(this,e,r)
return(0,l.Oz)(i,e),1===i.length})}function T(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t},i=(0,d.nV)(this,e,r,r.multiple)
return(0,l.Oz)(i,e),1===i.length&&h(i[0])})}function C(e){return e}function S(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t}
return(!1===r.normalize?C:j)(g((0,d.sM)(this,e,r)))})}function j(e){return e.trim().replace(/\n/g," ").replace(/\s\s*/g," ")}function A(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t}
const i=(0,d.sM)(this,e,r)
return i.hasAttribute("contenteditable")?i.innerHTML:function(e){const{value:t}=e
return void 0!==t&&"select"===e.tagName.toLowerCase()?function(e){const t=Array.from(e.selectedOptions).filter(e=>!(e.disabled||"optgroup"===e.parentNode.tagName.toLowerCase()&&e.parentNode.disabled))
return e.multiple?t.map(e=>e.value):0===t.length?null:e.value}(e):e.value}(i)})}const N={isDescriptor:!0,value(){const e=(0,l.Zn)(this)
return(e._chainedTree||e)._promise.then(...arguments)}},q={as:function(e){return e(this),this},blur:v(),click:m(),clickOn:y(),contains:b(),fillIn:x(),focus:w(),isHidden:k(),isPresent:E(),isVisible:T(),select:x(),text:S(),then:N,value:A()}
function _(e,t,n,a){let u
if(Array.isArray(n))return void(e[t]=n)
i(n)?u=o(n):(Object.getOwnPropertyNames(n).forEach(e=>{const{get:t,value:r}=Object.getOwnPropertyDescriptor(n,e)
if("function"==typeof t)Object.defineProperty(n,e,{value:(0,s.o)(t)})
else if("string"==typeof r&&!["scope","testContainer"].includes(e))throw new Error(`string values are not supported in page object definitions\n\nKey: "${e}"`)}),u=n)
let l={...u}
l._chainedTree&&delete l._chainedTree,n={...q,...u}
const[c,f]=a(e,t,n,a)
return function(e,t){r.A.meta(e).__poDef__=t}(c,l),[c,f]}function O(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
if("string"==typeof e)throw new Error("Definition can not be a string")
if(e=i(e)?{...o(e)}:(0,l.iz)({},e),e.context)throw new Error('"context" key is not allowed to be passed at definition root.')
let n={object:_},a=r.A.create(e,{builder:n,...t})
e._chainedTree=(0,s.o)(function(){return a})
let u={object:_}
return r.A.create(e,{builder:u,...t})}function M(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return(0,s.o)(function(r){return function(e,t){const n=e.getAttribute(t)
if(n)return null==n?void 0:n
const r=e.getAttributeNode(t)
if(r){const{specified:e,value:n}=r
if(e&&null!==n){const e=t.toLowerCase()
return D.includes(e)?e:n}}}((0,d.sM)(this,t,{pageObjectKey:r,...n}),e)})}n(2076),n(8260),n(1320)
const D=["checked","selected","async","autofocus","autoplay","controls","defer","disabled","hidden","ismap","loop","multiple","open","readonly","required","scoped"]
function R(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,s.o)(function(n){let r={pageObjectKey:n,...t}
return(0,d.nV)(this,e,r).length})}function I(e,t){if("string"!=typeof e)throw new Error("collection requires `scope` as the first argument")
i(t)&&(t=o(t))
let n={isDescriptor:!0,setup(r,i){var o
n.value=(o=new L(e,t,r,i),window.Proxy?new window.Proxy(o,{get:function(e,t){if("number"==typeof t||"string"==typeof t){let n=parseInt(t,10)
if(!isNaN(n))return e.objectAt(n)}return e[t]}}):o)}}
return n}class L{constructor(e,t,n,r){this.scope=e,this.definition=t||{},this.parent=n,this.key=r,this._itemCounter=O({count:R(e,{resetScope:this.definition.resetScope,testContainer:this.definition.testContainer})},{parent:n}),this._items=[]}get length(){return this._itemCounter.count}objectAt(e){let{key:t}=this
if(void 0===this._items[e]){let{scope:n,definition:i,parent:o}=this,s=(0,l.y1)({},n,{at:e}),a=(0,l.iz)({},i)
a.scope=s
let u=O(a,{parent:o})
r.A.meta(u).key=`${t}[${e}]`,this._items[e]=u}return this._items[e]}filter(){return this.toArray().filter(...arguments)}filterBy(e,t){return this.toArray().filter(n=>void 0!==t?n[e]===t:Boolean(n[e]))}forEach(){return this.toArray().forEach(...arguments)}map(){return this.toArray().map(...arguments)}mapBy(e){return this.toArray().map(t=>t[e])}findOneBy(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
const r=this.filterBy(...t)
return this._assertFoundElements(r,...t),r[0]}findOne(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
const r=this.filter(...t)
return this._assertFoundElements(r,...t),r[0]}_assertFoundElements(e){const t=1==(arguments.length<=1?0:arguments.length-1)?"condition":`${arguments.length<=1?void 0:arguments[1]}: "${arguments.length<=2?void 0:arguments[2]}"`
e.length>1&&(0,a.hm)(this.parent,this.key,`${e.length} elements found by ${t}, but expected 1`),0===e.length&&(0,a.hm)(this.parent,this.key,`cannot find element by ${t}`)}toArray(){let{length:e}=this,t=[]
for(let n=0;n<e;n++)t.push(this.objectAt(n))
return t}}function H(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return(0,s.o)(function(r){let i={pageObjectKey:r,...n}
return(0,d.sM)(this,t,i).classList.contains(e)})}function P(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return(0,s.o)(function(r){let i={pageObjectKey:r,...n}
return!(0,d.sM)(this,t,i).classList.contains(e)})}function F(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
return(0,s.o)(function(r){let i={pageObjectKey:r,...n}
const o=(0,d.sM)(this,t,i),s=function(e){return $[e]??e}(e)
return o[s]})}"undefined"!=typeof Symbol&&Symbol.iterator&&(L.prototype[Symbol.iterator]=function(){let e=0,t=this.toArray()
return{next:()=>({done:e>=t.length,value:t[e++]})}})
const $={tabindex:"tabIndex",readonly:"readOnly",maxlength:"maxLength",contenteditable:"contentEditable"}
function B(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
const{eventProperties:r}=n
return f({...n,selector:t},function(){const i={...r,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}},o=(0,d.sM)(this,t,n)
return(0,p.c)().triggerEvent(o,e,i)})}function U(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=r?`${r}[${t}]`:t
return Array.isArray(n)?n.forEach(n=>U(e,t,n,r,!0)):"object"==typeof n&&null!==n?Object.keys(n).forEach(t=>U(e,t,n[t],o)):i?e.append(`${o}[]`,n):e.append(o,n),e}function Q(e,t){let n=Object.keys(t)
return n.length&&(e+=`?${n.reduce((e,n)=>U(e,n,t[n]),new URLSearchParams)}`),e}function z(e){return f(function(){let t={...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}},n=function(e,t){return e.split("/").map(function(e){let n=e.match(/^:(.+)$/)
if(n){let[,e]=n,r=t[e]
if(void 0===r)throw new Error(`Missing parameter for '${e}'`)
return delete t[e],encodeURIComponent(r)}return e}).join("/")}(e,t)
return n=Q(n,t),(0,p.c)().visit(n).catch(e=>{throw new Error(`Failed to visit URL '${n}': ${e.toString()}`,{cause:e})})})}const W=x
var V={attribute:M,blurrable:v,clickOnText:y,clickable:m,collection:I,contains:b,count:R,create:O,fillable:x,focusable:w,hasClass:H,isHidden:k,isPresent:E,isVisible:T,notHasClass:P,property:F,selectable:x,text:S,value:A,visitable:z,triggerable:B}},6584(e,t,n){"use strict"
n.d(t,{o:()=>i})
var r=n(5402)
function i(e){if("function"!=typeof e)throw new Error("Argument passed to `getter` must be a function.")
return{isDescriptor:!0,get(t){try{return e.call(this,t)}catch(e){if(e instanceof r.r7){if(!e.cause.key){const i=new r.r7(e.cause.message,{cause:{...e.cause,key:t}})
throw i.stack=e.stack,i}throw e}(0,r.hm)(this,t,e)}}}}n(5722),n(7861)},1018(e,t,n){"use strict"
n.r(t),n.d(t,{alias:()=>s,getter:()=>r.o})
var r=n(6584),i=n(5402),o=n(3493)
function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return(0,r.o)(function(n){try{const n=function(e,t){const n=t.split(".")
let r,i=e
for(;n.length>0;){const e=n.shift()
if(null===i||"object"!=typeof i||!Object.prototype.hasOwnProperty.call(i,e))throw new Error(`PageObject does not contain aliased property \`${t}\`.`)
n.length?i=i[e]:r=i[e]}return"function"==typeof r?r.bind(i):r}(this,e)
return"function"==typeof n&&t.chainable?function(){return n(...arguments),(0,o.I)(this)}:n}catch(e){(0,i.hm)(this,n,e)}})}n(5722),n(7861)},3709(e,t){var n
!function(t,n){"use strict"
"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document")
return n(e)}:n(t)}("undefined"!=typeof window?window:this,function(r,i){"use strict"
var o=[],s=Object.getPrototypeOf,a=o.slice,u=o.flat?function(e){return o.flat.call(e)}:function(e){return o.concat.apply([],e)},l=o.push,c=o.indexOf,f={},d=f.toString,p=f.hasOwnProperty,h=p.toString,g=h.call(Object),v={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType&&"function"!=typeof e.item},y=function(e){return null!=e&&e===e.window},b=r.document,x={type:!0,src:!0,nonce:!0,noModule:!0}
function w(e,t,n){var r,i,o=(n=n||b).createElement("script")
if(o.text=e,t)for(r in x)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i)
n.head.appendChild(o).parentNode.removeChild(o)}function k(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?f[d.call(e)]||"object":typeof e}var E="3.7.1",T=/HTML$/i,C=function(e,t){return new C.fn.init(e,t)}
function S(e){var t=!!e&&"length"in e&&e.length,n=k(e)
return!m(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function j(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}C.fn=C.prototype={jquery:E,constructor:C,length:0,toArray:function(){return a.call(this)},get:function(e){return null==e?a.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=C.merge(this.constructor(),e)
return t.prevObject=this,t},each:function(e){return C.each(this,e)},map:function(e){return this.pushStack(C.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(a.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(C.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(C.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0)
return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:l,sort:o.sort,splice:o.splice},C.extend=C.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1
for("boolean"==typeof s&&(l=s,s=arguments[a]||{},a++),"object"==typeof s||m(s)||(s={}),a===u&&(s=this,a--);a<u;a++)if(null!=(e=arguments[a]))for(t in e)r=e[t],"__proto__"!==t&&s!==r&&(l&&r&&(C.isPlainObject(r)||(i=Array.isArray(r)))?(n=s[t],o=i&&!Array.isArray(n)?[]:i||C.isPlainObject(n)?n:{},i=!1,s[t]=C.extend(l,o,r)):void 0!==r&&(s[t]=r))
return s},C.extend({expando:"jQuery"+(E+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n
return!(!e||"[object Object]"!==d.call(e)||(t=s(e))&&("function"!=typeof(n=p.call(t,"constructor")&&t.constructor)||h.call(n)!==g))},isEmptyObject:function(e){var t
for(t in e)return!1
return!0},globalEval:function(e,t,n){w(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0
if(S(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break
return e},text:function(e){var t,n="",r=0,i=e.nodeType
if(!i)for(;t=e[r++];)n+=C.text(t)
return 1===i||11===i?e.textContent:9===i?e.documentElement.textContent:3===i||4===i?e.nodeValue:n},makeArray:function(e,t){var n=t||[]
return null!=e&&(S(Object(e))?C.merge(n,"string"==typeof e?[e]:e):l.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:c.call(t,e,n)},isXMLDoc:function(e){var t=e&&e.namespaceURI,n=e&&(e.ownerDocument||e).documentElement
return!T.test(t||n&&n.nodeName||"HTML")},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r]
return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,s=!n;i<o;i++)!t(e[i],i)!==s&&r.push(e[i])
return r},map:function(e,t,n){var r,i,o=0,s=[]
if(S(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i)
else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i)
return u(s)},guid:1,support:v}),"function"==typeof Symbol&&(C.fn[Symbol.iterator]=o[Symbol.iterator]),C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){f["[object "+t+"]"]=t.toLowerCase()})
var A=o.pop,N=o.sort,q=o.splice,_="[\\x20\\t\\r\\n\\f]",O=new RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g")
C.contains=function(e,t){var n=t&&t.parentNode
return e===n||!(!n||1!==n.nodeType||!(e.contains?e.contains(n):e.compareDocumentPosition&&16&e.compareDocumentPosition(n)))}
var M=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g
function D(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e}C.escapeSelector=function(e){return(e+"").replace(M,D)}
var R=b,I=l
!function(){var e,t,n,i,s,u,l,f,d,h,g=I,m=C.expando,y=0,b=0,x=ee(),w=ee(),k=ee(),E=ee(),T=function(e,t){return e===t&&(s=!0),0},S="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="(?:\\\\[\\da-fA-F]{1,6}"+_+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",D="\\["+_+"*("+M+")(?:"+_+"*([*^$|!~]?=)"+_+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+_+"*\\]",L=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+D+")*)|.*)\\)|)",H=new RegExp(_+"+","g"),P=new RegExp("^"+_+"*,"+_+"*"),F=new RegExp("^"+_+"*([>+~]|"+_+")"+_+"*"),$=new RegExp(_+"|>"),B=new RegExp(L),U=new RegExp("^"+M+"$"),Q={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+D),PSEUDO:new RegExp("^"+L),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),bool:new RegExp("^(?:"+S+")$","i"),needsContext:new RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},z=/^(?:input|select|textarea|button)$/i,W=/^h\d$/i,V=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,X=new RegExp("\\\\[\\da-fA-F]{1,6}"+_+"?|\\\\([^\\r\\n\\f])","g"),G=function(e,t){var n="0x"+e.slice(1)-65536
return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},Y=function(){ue()},J=de(function(e){return!0===e.disabled&&j(e,"fieldset")},{dir:"parentNode",next:"legend"})
try{g.apply(o=a.call(R.childNodes),R.childNodes),o[R.childNodes.length].nodeType}catch(e){g={apply:function(e,t){I.apply(e,a.call(t))},call:function(e){I.apply(e,a.call(arguments,1))}}}function Z(e,t,n,r){var i,o,s,a,l,c,p,h=t&&t.ownerDocument,y=t?t.nodeType:9
if(n=n||[],"string"!=typeof e||!e||1!==y&&9!==y&&11!==y)return n
if(!r&&(ue(t),t=t||u,f)){if(11!==y&&(l=V.exec(e)))if(i=l[1]){if(9===y){if(!(s=t.getElementById(i)))return n
if(s.id===i)return g.call(n,s),n}else if(h&&(s=h.getElementById(i))&&Z.contains(t,s)&&s.id===i)return g.call(n,s),n}else{if(l[2])return g.apply(n,t.getElementsByTagName(e)),n
if((i=l[3])&&t.getElementsByClassName)return g.apply(n,t.getElementsByClassName(i)),n}if(!(E[e+" "]||d&&d.test(e))){if(p=e,h=t,1===y&&($.test(e)||F.test(e))){for((h=K.test(e)&&ae(t.parentNode)||t)==t&&v.scope||((a=t.getAttribute("id"))?a=C.escapeSelector(a):t.setAttribute("id",a=m)),o=(c=ce(e)).length;o--;)c[o]=(a?"#"+a:":scope")+" "+fe(c[o])
p=c.join(",")}try{return g.apply(n,h.querySelectorAll(p)),n}catch(t){E(e,!0)}finally{a===m&&t.removeAttribute("id")}}}return ye(e.replace(O,"$1"),t,n,r)}function ee(){var e=[]
return function n(r,i){return e.push(r+" ")>t.cacheLength&&delete n[e.shift()],n[r+" "]=i}}function te(e){return e[m]=!0,e}function ne(e){var t=u.createElement("fieldset")
try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function re(e){return function(t){return j(t,"input")&&t.type===e}}function ie(e){return function(t){return(j(t,"input")||j(t,"button"))&&t.type===e}}function oe(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&J(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function se(e){return te(function(t){return t=+t,te(function(n,r){for(var i,o=e([],n.length,t),s=o.length;s--;)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}function ae(e){return e&&void 0!==e.getElementsByTagName&&e}function ue(e){var n,r=e?e.ownerDocument||e:R
return r!=u&&9===r.nodeType&&r.documentElement?(l=(u=r).documentElement,f=!C.isXMLDoc(u),h=l.matches||l.webkitMatchesSelector||l.msMatchesSelector,l.msMatchesSelector&&R!=u&&(n=u.defaultView)&&n.top!==n&&n.addEventListener("unload",Y),v.getById=ne(function(e){return l.appendChild(e).id=C.expando,!u.getElementsByName||!u.getElementsByName(C.expando).length}),v.disconnectedMatch=ne(function(e){return h.call(e,"*")}),v.scope=ne(function(){return u.querySelectorAll(":scope")}),v.cssHas=ne(function(){try{return u.querySelector(":has(*,:jqfake)"),!1}catch(e){return!0}}),v.getById?(t.filter.ID=function(e){var t=e.replace(X,G)
return function(e){return e.getAttribute("id")===t}},t.find.ID=function(e,t){if(void 0!==t.getElementById&&f){var n=t.getElementById(e)
return n?[n]:[]}}):(t.filter.ID=function(e){var t=e.replace(X,G)
return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id")
return n&&n.value===t}},t.find.ID=function(e,t){if(void 0!==t.getElementById&&f){var n,r,i,o=t.getElementById(e)
if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o]
for(i=t.getElementsByName(e),r=0;o=i[r++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),t.find.TAG=function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):t.querySelectorAll(e)},t.find.CLASS=function(e,t){if(void 0!==t.getElementsByClassName&&f)return t.getElementsByClassName(e)},d=[],ne(function(e){var t
l.appendChild(e).innerHTML="<a id='"+m+"' href='' disabled='disabled'></a><select id='"+m+"-\r\\' disabled='disabled'><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+_+"*(?:value|"+S+")"),e.querySelectorAll("[id~="+m+"-]").length||d.push("~="),e.querySelectorAll("a#"+m+"+*").length||d.push(".#.+[+~]"),e.querySelectorAll(":checked").length||d.push(":checked"),(t=u.createElement("input")).setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),l.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&d.push(":enabled",":disabled"),(t=u.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||d.push("\\["+_+"*name"+_+"*="+_+"*(?:''|\"\")")}),v.cssHas||d.push(":has"),d=d.length&&new RegExp(d.join("|")),T=function(e,t){if(e===t)return s=!0,0
var n=!e.compareDocumentPosition-!t.compareDocumentPosition
return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!v.sortDetached&&t.compareDocumentPosition(e)===n?e===u||e.ownerDocument==R&&Z.contains(R,e)?-1:t===u||t.ownerDocument==R&&Z.contains(R,t)?1:i?c.call(i,e)-c.call(i,t):0:4&n?-1:1)},u):u}for(e in Z.matches=function(e,t){return Z(e,null,null,t)},Z.matchesSelector=function(e,t){if(ue(e),f&&!E[t+" "]&&(!d||!d.test(t)))try{var n=h.call(e,t)
if(n||v.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){E(t,!0)}return Z(t,u,null,[e]).length>0},Z.contains=function(e,t){return(e.ownerDocument||e)!=u&&ue(e),C.contains(e,t)},Z.attr=function(e,n){(e.ownerDocument||e)!=u&&ue(e)
var r=t.attrHandle[n.toLowerCase()],i=r&&p.call(t.attrHandle,n.toLowerCase())?r(e,n,!f):void 0
return void 0!==i?i:e.getAttribute(n)},Z.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},C.uniqueSort=function(e){var t,n=[],r=0,o=0
if(s=!v.sortStable,i=!v.sortStable&&a.call(e,0),N.call(e,T),s){for(;t=e[o++];)t===e[o]&&(r=n.push(o))
for(;r--;)q.call(e,n[r],1)}return i=null,e},C.fn.uniqueSort=function(){return this.pushStack(C.uniqueSort(a.apply(this)))},t=C.expr={cacheLength:50,createPseudo:te,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(X,G),e[3]=(e[3]||e[4]||e[5]||"").replace(X,G),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||Z.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&Z.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2]
return Q.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&B.test(n)&&(t=ce(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(X,G).toLowerCase()
return"*"===e?function(){return!0}:function(e){return j(e,t)}},CLASS:function(e){var t=x[e+" "]
return t||(t=new RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&x(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=Z.attr(r,e)
return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace(H," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t
return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,d,p,h=o!==s?"nextSibling":"previousSibling",g=t.parentNode,v=a&&t.nodeName.toLowerCase(),b=!u&&!a,x=!1
if(g){if(o){for(;h;){for(f=t;f=f[h];)if(a?j(f,v):1===f.nodeType)return!1
p=h="only"===e&&!p&&"nextSibling"}return!0}if(p=[s?g.firstChild:g.lastChild],s&&b){for(x=(d=(l=(c=g[m]||(g[m]={}))[e]||[])[0]===y&&l[1])&&l[2],f=d&&g.childNodes[d];f=++d&&f&&f[h]||(x=d=0)||p.pop();)if(1===f.nodeType&&++x&&f===t){c[e]=[y,d,x]
break}}else if(b&&(x=d=(l=(c=t[m]||(t[m]={}))[e]||[])[0]===y&&l[1]),!1===x)for(;(f=++d&&f&&f[h]||(x=d=0)||p.pop())&&(!(a?j(f,v):1===f.nodeType)||!++x||(b&&((c=f[m]||(f[m]={}))[e]=[y,x]),f!==t)););return(x-=i)===r||x%r===0&&x/r>=0}}},PSEUDO:function(e,n){var r,i=t.pseudos[e]||t.setFilters[e.toLowerCase()]||Z.error("unsupported pseudo: "+e)
return i[m]?i(n):i.length>1?(r=[e,e,"",n],t.setFilters.hasOwnProperty(e.toLowerCase())?te(function(e,t){for(var r,o=i(e,n),s=o.length;s--;)e[r=c.call(e,o[s])]=!(t[r]=o[s])}):function(e){return i(e,0,r)}):i}},pseudos:{not:te(function(e){var t=[],n=[],r=me(e.replace(O,"$1"))
return r[m]?te(function(e,t,n,i){for(var o,s=r(e,null,i,[]),a=e.length;a--;)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:te(function(e){return function(t){return Z(e,t).length>0}}),contains:te(function(e){return e=e.replace(X,G),function(t){return(t.textContent||C.text(t)).indexOf(e)>-1}}),lang:te(function(e){return U.test(e||"")||Z.error("unsupported lang: "+e),e=e.replace(X,G).toLowerCase(),function(t){var n
do{if(n=f?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType)
return!1}}),target:function(e){var t=r.location&&r.location.hash
return t&&t.slice(1)===e.id},root:function(e){return e===l},focus:function(e){return e===function(){try{return u.activeElement}catch(e){}}()&&u.hasFocus()&&!!(e.type||e.href||~e.tabIndex)},enabled:oe(!1),disabled:oe(!0),checked:function(e){return j(e,"input")&&!!e.checked||j(e,"option")&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1
return!0},parent:function(e){return!t.pseudos.empty(e)},header:function(e){return W.test(e.nodeName)},input:function(e){return z.test(e.nodeName)},button:function(e){return j(e,"input")&&"button"===e.type||j(e,"button")},text:function(e){var t
return j(e,"input")&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:se(function(){return[0]}),last:se(function(e,t){return[t-1]}),eq:se(function(e,t,n){return[n<0?n+t:n]}),even:se(function(e,t){for(var n=0;n<t;n+=2)e.push(n)
return e}),odd:se(function(e,t){for(var n=1;n<t;n+=2)e.push(n)
return e}),lt:se(function(e,t,n){var r
for(r=n<0?n+t:n>t?t:n;--r>=0;)e.push(r)
return e}),gt:se(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r)
return e})}},t.pseudos.nth=t.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})t.pseudos[e]=re(e)
for(e in{submit:!0,reset:!0})t.pseudos[e]=ie(e)
function le(){}function ce(e,n){var r,i,o,s,a,u,l,c=w[e+" "]
if(c)return n?0:c.slice(0)
for(a=e,u=[],l=t.preFilter;a;){for(s in r&&!(i=P.exec(a))||(i&&(a=a.slice(i[0].length)||a),u.push(o=[])),r=!1,(i=F.exec(a))&&(r=i.shift(),o.push({value:r,type:i[0].replace(O," ")}),a=a.slice(r.length)),t.filter)!(i=Q[s].exec(a))||l[s]&&!(i=l[s](i))||(r=i.shift(),o.push({value:r,type:s,matches:i}),a=a.slice(r.length))
if(!r)break}return n?a.length:a?Z.error(e):w(e,u).slice(0)}function fe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value
return r}function de(e,t,n){var r=t.dir,i=t.next,o=i||r,s=n&&"parentNode"===o,a=b++
return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||s)return e(t,n,i)
return!1}:function(t,n,u){var l,c,f=[y,a]
if(u){for(;t=t[r];)if((1===t.nodeType||s)&&e(t,n,u))return!0}else for(;t=t[r];)if(1===t.nodeType||s)if(c=t[m]||(t[m]={}),i&&j(t,i))t=t[r]||t
else{if((l=c[o])&&l[0]===y&&l[1]===a)return f[2]=l[2]
if(c[o]=f,f[2]=e(t,n,u))return!0}return!1}}function pe(e){return e.length>1?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1
return!0}:e[0]}function he(e,t,n,r,i){for(var o,s=[],a=0,u=e.length,l=null!=t;a<u;a++)(o=e[a])&&(n&&!n(o,r,i)||(s.push(o),l&&t.push(a)))
return s}function ge(e,t,n,r,i,o){return r&&!r[m]&&(r=ge(r)),i&&!i[m]&&(i=ge(i,o)),te(function(o,s,a,u){var l,f,d,p,h=[],v=[],m=s.length,y=o||function(e,t,n){for(var r=0,i=t.length;r<i;r++)Z(e,t[r],n)
return n}(t||"*",a.nodeType?[a]:a,[]),b=!e||!o&&t?y:he(y,h,e,a,u)
if(n?n(b,p=i||(o?e:m||r)?[]:s,a,u):p=b,r)for(l=he(p,v),r(l,[],a,u),f=l.length;f--;)(d=l[f])&&(p[v[f]]=!(b[v[f]]=d))
if(o){if(i||e){if(i){for(l=[],f=p.length;f--;)(d=p[f])&&l.push(b[f]=d)
i(null,p=[],l,u)}for(f=p.length;f--;)(d=p[f])&&(l=i?c.call(o,d):h[f])>-1&&(o[l]=!(s[l]=d))}}else p=he(p===s?p.splice(m,p.length):p),i?i(null,s,p,u):g.apply(s,p)})}function ve(e){for(var r,i,o,s=e.length,a=t.relative[e[0].type],u=a||t.relative[" "],l=a?1:0,f=de(function(e){return e===r},u,!0),d=de(function(e){return c.call(r,e)>-1},u,!0),p=[function(e,t,i){var o=!a&&(i||t!=n)||((r=t).nodeType?f(e,t,i):d(e,t,i))
return r=null,o}];l<s;l++)if(i=t.relative[e[l].type])p=[de(pe(p),i)]
else{if((i=t.filter[e[l].type].apply(null,e[l].matches))[m]){for(o=++l;o<s&&!t.relative[e[o].type];o++);return ge(l>1&&pe(p),l>1&&fe(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(O,"$1"),i,l<o&&ve(e.slice(l,o)),o<s&&ve(e=e.slice(o)),o<s&&fe(e))}p.push(i)}return pe(p)}function me(e,r){var i,o=[],s=[],a=k[e+" "]
if(!a){for(r||(r=ce(e)),i=r.length;i--;)(a=ve(r[i]))[m]?o.push(a):s.push(a)
a=k(e,function(e,r){var i=r.length>0,o=e.length>0,s=function(s,a,l,c,d){var p,h,v,m=0,b="0",x=s&&[],w=[],k=n,E=s||o&&t.find.TAG("*",d),T=y+=null==k?1:Math.random()||.1,S=E.length
for(d&&(n=a==u||a||d);b!==S&&null!=(p=E[b]);b++){if(o&&p){for(h=0,a||p.ownerDocument==u||(ue(p),l=!f);v=e[h++];)if(v(p,a||u,l)){g.call(c,p)
break}d&&(y=T)}i&&((p=!v&&p)&&m--,s&&x.push(p))}if(m+=b,i&&b!==m){for(h=0;v=r[h++];)v(x,w,a,l)
if(s){if(m>0)for(;b--;)x[b]||w[b]||(w[b]=A.call(c))
w=he(w)}g.apply(c,w),d&&!s&&w.length>0&&m+r.length>1&&C.uniqueSort(c)}return d&&(y=T,n=k),x}
return i?te(s):s}(s,o)),a.selector=e}return a}function ye(e,n,r,i){var o,s,a,u,l,c="function"==typeof e&&e,d=!i&&ce(e=c.selector||e)
if(r=r||[],1===d.length){if((s=d[0]=d[0].slice(0)).length>2&&"ID"===(a=s[0]).type&&9===n.nodeType&&f&&t.relative[s[1].type]){if(!(n=(t.find.ID(a.matches[0].replace(X,G),n)||[])[0]))return r
c&&(n=n.parentNode),e=e.slice(s.shift().value.length)}for(o=Q.needsContext.test(e)?0:s.length;o--&&(a=s[o],!t.relative[u=a.type]);)if((l=t.find[u])&&(i=l(a.matches[0].replace(X,G),K.test(s[0].type)&&ae(n.parentNode)||n))){if(s.splice(o,1),!(e=i.length&&fe(s)))return g.apply(r,i),r
break}}return(c||me(e,d))(i,n,!f,r,!n||K.test(e)&&ae(n.parentNode)||n),r}le.prototype=t.filters=t.pseudos,t.setFilters=new le,v.sortStable=m.split("").sort(T).join("")===m,ue(),v.sortDetached=ne(function(e){return 1&e.compareDocumentPosition(u.createElement("fieldset"))}),C.find=Z,C.expr[":"]=C.expr.pseudos,C.unique=C.uniqueSort,Z.compile=me,Z.select=ye,Z.setDocument=ue,Z.tokenize=ce,Z.escape=C.escapeSelector,Z.getText=C.text,Z.isXML=C.isXMLDoc,Z.selectors=C.expr,Z.support=C.support,Z.uniqueSort=C.uniqueSort}()
var L=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&C(e).is(n))break
r.push(e)}return r},H=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e)
return n},P=C.expr.match.needsContext,F=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
function $(e,t,n){return m(t)?C.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?C.grep(e,function(e){return e===t!==n}):"string"!=typeof t?C.grep(e,function(e){return c.call(t,e)>-1!==n}):C.filter(t,e,n)}C.filter=function(e,t,n){var r=t[0]
return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?C.find.matchesSelector(r,e)?[r]:[]:C.find.matches(e,C.grep(t,function(e){return 1===e.nodeType}))},C.fn.extend({find:function(e){var t,n,r=this.length,i=this
if("string"!=typeof e)return this.pushStack(C(e).filter(function(){for(t=0;t<r;t++)if(C.contains(i[t],this))return!0}))
for(n=this.pushStack([]),t=0;t<r;t++)C.find(e,i[t],n)
return r>1?C.uniqueSort(n):n},filter:function(e){return this.pushStack($(this,e||[],!1))},not:function(e){return this.pushStack($(this,e||[],!0))},is:function(e){return!!$(this,"string"==typeof e&&P.test(e)?C(e):e||[],!1).length}})
var B,U=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(C.fn.init=function(e,t,n){var r,i
if(!e)return this
if(n=n||B,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:U.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e)
if(r[1]){if(t=t instanceof C?t[0]:t,C.merge(this,C.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:b,!0)),F.test(r[1])&&C.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r])
return this}return(i=b.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(C):C.makeArray(e,this)}).prototype=C.fn,B=C(b)
var Q=/^(?:parents|prev(?:Until|All))/,z={children:!0,contents:!0,next:!0,prev:!0}
function W(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}C.fn.extend({has:function(e){var t=C(e,this),n=t.length
return this.filter(function(){for(var e=0;e<n;e++)if(C.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],s="string"!=typeof e&&C(e)
if(!P.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(s?s.index(n)>-1:1===n.nodeType&&C.find.matchesSelector(n,e))){o.push(n)
break}return this.pushStack(o.length>1?C.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?c.call(C(e),this[0]):c.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(C.uniqueSort(C.merge(this.get(),C(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),C.each({parent:function(e){var t=e.parentNode
return t&&11!==t.nodeType?t:null},parents:function(e){return L(e,"parentNode")},parentsUntil:function(e,t,n){return L(e,"parentNode",n)},next:function(e){return W(e,"nextSibling")},prev:function(e){return W(e,"previousSibling")},nextAll:function(e){return L(e,"nextSibling")},prevAll:function(e){return L(e,"previousSibling")},nextUntil:function(e,t,n){return L(e,"nextSibling",n)},prevUntil:function(e,t,n){return L(e,"previousSibling",n)},siblings:function(e){return H((e.parentNode||{}).firstChild,e)},children:function(e){return H(e.firstChild)},contents:function(e){return null!=e.contentDocument&&s(e.contentDocument)?e.contentDocument:(j(e,"template")&&(e=e.content||e),C.merge([],e.childNodes))}},function(e,t){C.fn[e]=function(n,r){var i=C.map(this,t,n)
return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=C.filter(r,i)),this.length>1&&(z[e]||C.uniqueSort(i),Q.test(e)&&i.reverse()),this.pushStack(i)}})
var V=/[^\x20\t\r\n\f]+/g
function K(e){return e}function X(e){throw e}function G(e,t,n,r){var i
try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}C.Callbacks=function(e){e="string"==typeof e?function(e){var t={}
return C.each(e.match(V)||[],function(e,n){t[n]=!0}),t}(e):C.extend({},e)
var t,n,r,i,o=[],s=[],a=-1,u=function(){for(i=i||e.once,r=t=!0;s.length;a=-1)for(n=s.shift();++a<o.length;)!1===o[a].apply(n[0],n[1])&&e.stopOnFalse&&(a=o.length,n=!1)
e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(a=o.length-1,s.push(n)),function t(n){C.each(n,function(n,r){m(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==k(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return C.each(arguments,function(e,t){for(var n;(n=C.inArray(t,o,n))>-1;)o.splice(n,1),n<=a&&a--}),this},has:function(e){return e?C.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=s=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=s=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],s.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}}
return l},C.extend({Deferred:function(e){var t=[["notify","progress",C.Callbacks("memory"),C.Callbacks("memory"),2],["resolve","done",C.Callbacks("once memory"),C.Callbacks("once memory"),0,"resolved"],["reject","fail",C.Callbacks("once memory"),C.Callbacks("once memory"),1,"rejected"]],n="pending",i={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return i.then(null,e)},pipe:function(){var e=arguments
return C.Deferred(function(n){C.each(t,function(t,r){var i=m(e[r[4]])&&e[r[4]]
o[r[1]](function(){var e=i&&i.apply(this,arguments)
e&&m(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(e,n,i){var o=0
function s(e,t,n,i){return function(){var a=this,u=arguments,l=function(){var r,l
if(!(e<o)){if((r=n.apply(a,u))===t.promise())throw new TypeError("Thenable self-resolution")
l=r&&("object"==typeof r||"function"==typeof r)&&r.then,m(l)?i?l.call(r,s(o,t,K,i),s(o,t,X,i)):(o++,l.call(r,s(o,t,K,i),s(o,t,X,i),s(o,t,K,t.notifyWith))):(n!==K&&(a=void 0,u=[r]),(i||t.resolveWith)(a,u))}},c=i?l:function(){try{l()}catch(r){C.Deferred.exceptionHook&&C.Deferred.exceptionHook(r,c.error),e+1>=o&&(n!==X&&(a=void 0,u=[r]),t.rejectWith(a,u))}}
e?c():(C.Deferred.getErrorHook?c.error=C.Deferred.getErrorHook():C.Deferred.getStackHook&&(c.error=C.Deferred.getStackHook()),r.setTimeout(c))}}return C.Deferred(function(r){t[0][3].add(s(0,r,m(i)?i:K,r.notifyWith)),t[1][3].add(s(0,r,m(e)?e:K)),t[2][3].add(s(0,r,m(n)?n:X))}).promise()},promise:function(e){return null!=e?C.extend(e,i):i}},o={}
return C.each(t,function(e,r){var s=r[2],a=r[5]
i[r[1]]=s.add,a&&s.add(function(){n=a},t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),s.add(r[3].fire),o[r[0]]=function(){return o[r[0]+"With"](this===o?void 0:this,arguments),this},o[r[0]+"With"]=s.fireWith}),i.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=a.call(arguments),o=C.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?a.call(arguments):n,--t||o.resolveWith(r,i)}}
if(t<=1&&(G(e,o.done(s(n)).resolve,o.reject,!t),"pending"===o.state()||m(i[n]&&i[n].then)))return o.then()
for(;n--;)G(i[n],s(n),o.reject)
return o.promise()}})
var Y=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/
C.Deferred.exceptionHook=function(e,t){r.console&&r.console.warn&&e&&Y.test(e.name)&&r.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},C.readyException=function(e){r.setTimeout(function(){throw e})}
var J=C.Deferred()
function Z(){b.removeEventListener("DOMContentLoaded",Z),r.removeEventListener("load",Z),C.ready()}C.fn.ready=function(e){return J.then(e).catch(function(e){C.readyException(e)}),this},C.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--C.readyWait:C.isReady)||(C.isReady=!0,!0!==e&&--C.readyWait>0||J.resolveWith(b,[C]))}}),C.ready.then=J.then,"complete"===b.readyState||"loading"!==b.readyState&&!b.documentElement.doScroll?r.setTimeout(C.ready):(b.addEventListener("DOMContentLoaded",Z),r.addEventListener("load",Z))
var ee=function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n
if("object"===k(n))for(a in i=!0,n)ee(e,t,a,n[a],!0,o,s)
else if(void 0!==r&&(i=!0,m(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(C(e),n)})),t))for(;a<u;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)))
return i?e:l?t.call(e):u?t(e[0],n):o},te=/^-ms-/,ne=/-([a-z])/g
function re(e,t){return t.toUpperCase()}function ie(e){return e.replace(te,"ms-").replace(ne,re)}var oe=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType}
function se(){this.expando=C.expando+se.uid++}se.uid=1,se.prototype={cache:function(e){var t=e[this.expando]
return t||(t={},oe(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e)
if("string"==typeof t)i[ie(t)]=n
else for(r in t)i[ie(r)]=t[r]
return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][ie(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando]
if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(ie):(t=ie(t))in r?[t]:t.match(V)||[]).length
for(;n--;)delete r[t[n]]}(void 0===t||C.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando]
return void 0!==t&&!C.isEmptyObject(t)}}
var ae=new se,ue=new se,le=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ce=/[A-Z]/g
function fe(e,t,n){var r
if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ce,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:le.test(e)?JSON.parse(e):e)}(n)}catch(e){}ue.set(e,t,n)}else n=void 0
return n}C.extend({hasData:function(e){return ue.hasData(e)||ae.hasData(e)},data:function(e,t,n){return ue.access(e,t,n)},removeData:function(e,t){ue.remove(e,t)},_data:function(e,t,n){return ae.access(e,t,n)},_removeData:function(e,t){ae.remove(e,t)}}),C.fn.extend({data:function(e,t){var n,r,i,o=this[0],s=o&&o.attributes
if(void 0===e){if(this.length&&(i=ue.get(o),1===o.nodeType&&!ae.get(o,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&0===(r=s[n].name).indexOf("data-")&&(r=ie(r.slice(5)),fe(o,r,i[r]))
ae.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){ue.set(this,e)}):ee(this,function(t){var n
if(o&&void 0===t)return void 0!==(n=ue.get(o,e))||void 0!==(n=fe(o,e))?n:void 0
this.each(function(){ue.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){ue.remove(this,e)})}}),C.extend({queue:function(e,t,n){var r
if(e)return t=(t||"fx")+"queue",r=ae.get(e,t),n&&(!r||Array.isArray(n)?r=ae.access(e,t,C.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx"
var n=C.queue(e,t),r=n.length,i=n.shift(),o=C._queueHooks(e,t)
"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){C.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks"
return ae.get(e,n)||ae.access(e,n,{empty:C.Callbacks("once memory").add(function(){ae.remove(e,[t+"queue",n])})})}}),C.fn.extend({queue:function(e,t){var n=2
return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?C.queue(this[0],e):void 0===t?this:this.each(function(){var n=C.queue(this,e,t)
C._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&C.dequeue(this,e)})},dequeue:function(e){return this.each(function(){C.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=C.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])}
for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";s--;)(n=ae.get(o[s],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(a))
return a(),i.promise(t)}})
var de=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,pe=new RegExp("^(?:([+-])=|)("+de+")([a-z%]*)$","i"),he=["Top","Right","Bottom","Left"],ge=b.documentElement,ve=function(e){return C.contains(e.ownerDocument,e)},me={composed:!0}
ge.getRootNode&&(ve=function(e){return C.contains(e.ownerDocument,e)||e.getRootNode(me)===e.ownerDocument})
var ye=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ve(e)&&"none"===C.css(e,"display")}
function be(e,t,n,r){var i,o,s=20,a=r?function(){return r.cur()}:function(){return C.css(e,t,"")},u=a(),l=n&&n[3]||(C.cssNumber[t]?"":"px"),c=e.nodeType&&(C.cssNumber[t]||"px"!==l&&+u)&&pe.exec(C.css(e,t))
if(c&&c[3]!==l){for(u/=2,l=l||c[3],c=+u||1;s--;)C.style(e,t,c+l),(1-o)*(1-(o=a()/u||.5))<=0&&(s=0),c/=o
c*=2,C.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var xe={}
function we(e){var t,n=e.ownerDocument,r=e.nodeName,i=xe[r]
return i||(t=n.body.appendChild(n.createElement(r)),i=C.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),xe[r]=i,i)}function ke(e,t){for(var n,r,i=[],o=0,s=e.length;o<s;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=ae.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ye(r)&&(i[o]=we(r))):"none"!==n&&(i[o]="none",ae.set(r,"display",n)))
for(o=0;o<s;o++)null!=i[o]&&(e[o].style.display=i[o])
return e}C.fn.extend({show:function(){return ke(this,!0)},hide:function(){return ke(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ye(this)?C(this).show():C(this).hide()})}})
var Ee,Te,Ce=/^(?:checkbox|radio)$/i,Se=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,je=/^$|^module$|\/(?:java|ecma)script/i
Ee=b.createDocumentFragment().appendChild(b.createElement("div")),(Te=b.createElement("input")).setAttribute("type","radio"),Te.setAttribute("checked","checked"),Te.setAttribute("name","t"),Ee.appendChild(Te),v.checkClone=Ee.cloneNode(!0).cloneNode(!0).lastChild.checked,Ee.innerHTML="<textarea>x</textarea>",v.noCloneChecked=!!Ee.cloneNode(!0).lastChild.defaultValue,Ee.innerHTML="<option></option>",v.option=!!Ee.lastChild
var Ae={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}
function Ne(e,t){var n
return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&j(e,t)?C.merge([e],n):n}function qe(e,t){for(var n=0,r=e.length;n<r;n++)ae.set(e[n],"globalEval",!t||ae.get(t[n],"globalEval"))}Ae.tbody=Ae.tfoot=Ae.colgroup=Ae.caption=Ae.thead,Ae.th=Ae.td,v.option||(Ae.optgroup=Ae.option=[1,"<select multiple='multiple'>","</select>"])
var _e=/<|&#?\w+;/
function Oe(e,t,n,r,i){for(var o,s,a,u,l,c,f=t.createDocumentFragment(),d=[],p=0,h=e.length;p<h;p++)if((o=e[p])||0===o)if("object"===k(o))C.merge(d,o.nodeType?[o]:o)
else if(_e.test(o)){for(s=s||f.appendChild(t.createElement("div")),a=(Se.exec(o)||["",""])[1].toLowerCase(),u=Ae[a]||Ae._default,s.innerHTML=u[1]+C.htmlPrefilter(o)+u[2],c=u[0];c--;)s=s.lastChild
C.merge(d,s.childNodes),(s=f.firstChild).textContent=""}else d.push(t.createTextNode(o))
for(f.textContent="",p=0;o=d[p++];)if(r&&C.inArray(o,r)>-1)i&&i.push(o)
else if(l=ve(o),s=Ne(f.appendChild(o),"script"),l&&qe(s),n)for(c=0;o=s[c++];)je.test(o.type||"")&&n.push(o)
return f}var Me=/^([^.]*)(?:\.(.+)|)/
function De(){return!0}function Re(){return!1}function Ie(e,t,n,r,i,o){var s,a
if("object"==typeof t){for(a in"string"!=typeof n&&(r=r||n,n=void 0),t)Ie(e,a,n,r,t[a],o)
return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Re
else if(!i)return e
return 1===o&&(s=i,i=function(e){return C().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=C.guid++)),e.each(function(){C.event.add(this,t,i,r,n)})}function Le(e,t,n){n?(ae.set(e,t,!1),C.event.add(e,t,{namespace:!1,handler:function(e){var n,r=ae.get(this,t)
if(1&e.isTrigger&&this[t]){if(r)(C.event.special[t]||{}).delegateType&&e.stopPropagation()
else if(r=a.call(arguments),ae.set(this,t,r),this[t](),n=ae.get(this,t),ae.set(this,t,!1),r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n}else r&&(ae.set(this,t,C.event.trigger(r[0],r.slice(1),this)),e.stopPropagation(),e.isImmediatePropagationStopped=De)}})):void 0===ae.get(e,t)&&C.event.add(e,t,De)}C.event={global:{},add:function(e,t,n,r,i){var o,s,a,u,l,c,f,d,p,h,g,v=ae.get(e)
if(oe(e))for(n.handler&&(n=(o=n).handler,i=o.selector),i&&C.find.matchesSelector(ge,i),n.guid||(n.guid=C.guid++),(u=v.events)||(u=v.events=Object.create(null)),(s=v.handle)||(s=v.handle=function(t){return void 0!==C&&C.event.triggered!==t.type?C.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(V)||[""]).length;l--;)p=g=(a=Me.exec(t[l])||[])[1],h=(a[2]||"").split(".").sort(),p&&(f=C.event.special[p]||{},p=(i?f.delegateType:f.bindType)||p,f=C.event.special[p]||{},c=C.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&C.expr.match.needsContext.test(i),namespace:h.join(".")},o),(d=u[p])||((d=u[p]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,s)||e.addEventListener&&e.addEventListener(p,s)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?d.splice(d.delegateCount++,0,c):d.push(c),C.event.global[p]=!0)},remove:function(e,t,n,r,i){var o,s,a,u,l,c,f,d,p,h,g,v=ae.hasData(e)&&ae.get(e)
if(v&&(u=v.events)){for(l=(t=(t||"").match(V)||[""]).length;l--;)if(p=g=(a=Me.exec(t[l])||[])[1],h=(a[2]||"").split(".").sort(),p){for(f=C.event.special[p]||{},d=u[p=(r?f.delegateType:f.bindType)||p]||[],a=a[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=d.length;o--;)c=d[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(d.splice(o,1),c.selector&&d.delegateCount--,f.remove&&f.remove.call(e,c))
s&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||C.removeEvent(e,p,v.handle),delete u[p])}else for(p in u)C.event.remove(e,p+t[l],n,r,!0)
C.isEmptyObject(u)&&ae.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,s,a=new Array(arguments.length),u=C.event.fix(e),l=(ae.get(this,"events")||Object.create(null))[u.type]||[],c=C.event.special[u.type]||{}
for(a[0]=u,t=1;t<arguments.length;t++)a[t]=arguments[t]
if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){for(s=C.event.handlers.call(this,u,l),t=0;(i=s[t++])&&!u.isPropagationStopped();)for(u.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!u.isImmediatePropagationStopped();)u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((C.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))
return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,s,a=[],u=t.delegateCount,l=e.target
if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],s={},n=0;n<u;n++)void 0===s[i=(r=t[n]).selector+" "]&&(s[i]=r.needsContext?C(i,this).index(l)>-1:C.find(i,this,null,[l]).length),s[i]&&o.push(r)
o.length&&a.push({elem:l,handlers:o})}return l=this,u<t.length&&a.push({elem:l,handlers:t.slice(u)}),a},addProp:function(e,t){Object.defineProperty(C.Event.prototype,e,{enumerable:!0,configurable:!0,get:m(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[C.expando]?e:new C.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e
return Ce.test(t.type)&&t.click&&j(t,"input")&&Le(t,"click",!0),!1},trigger:function(e){var t=this||e
return Ce.test(t.type)&&t.click&&j(t,"input")&&Le(t,"click"),!0},_default:function(e){var t=e.target
return Ce.test(t.type)&&t.click&&j(t,"input")&&ae.get(t,"click")||j(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},C.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},C.Event=function(e,t){if(!(this instanceof C.Event))return new C.Event(e,t)
e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?De:Re,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&C.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[C.expando]=!0},C.Event.prototype={constructor:C.Event,isDefaultPrevented:Re,isPropagationStopped:Re,isImmediatePropagationStopped:Re,isSimulated:!1,preventDefault:function(){var e=this.originalEvent
this.isDefaultPrevented=De,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent
this.isPropagationStopped=De,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent
this.isImmediatePropagationStopped=De,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},C.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},C.event.addProp),C.each({focus:"focusin",blur:"focusout"},function(e,t){function n(e){if(b.documentMode){var n=ae.get(this,"handle"),r=C.event.fix(e)
r.type="focusin"===e.type?"focus":"blur",r.isSimulated=!0,n(e),r.target===r.currentTarget&&n(r)}else C.event.simulate(t,e.target,C.event.fix(e))}C.event.special[e]={setup:function(){var r
if(Le(this,e,!0),!b.documentMode)return!1;(r=ae.get(this,t))||this.addEventListener(t,n),ae.set(this,t,(r||0)+1)},trigger:function(){return Le(this,e),!0},teardown:function(){var e
if(!b.documentMode)return!1;(e=ae.get(this,t)-1)?ae.set(this,t,e):(this.removeEventListener(t,n),ae.remove(this,t))},_default:function(t){return ae.get(t.target,e)},delegateType:t},C.event.special[t]={setup:function(){var r=this.ownerDocument||this.document||this,i=b.documentMode?this:r,o=ae.get(i,t)
o||(b.documentMode?this.addEventListener(t,n):r.addEventListener(e,n,!0)),ae.set(i,t,(o||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,i=b.documentMode?this:r,o=ae.get(i,t)-1
o?ae.set(i,t,o):(b.documentMode?this.removeEventListener(t,n):r.removeEventListener(e,n,!0),ae.remove(i,t))}}}),C.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){C.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=e.relatedTarget,i=e.handleObj
return r&&(r===this||C.contains(this,r))||(e.type=i.origType,n=i.handler.apply(this,arguments),e.type=t),n}}}),C.fn.extend({on:function(e,t,n,r){return Ie(this,e,t,n,r)},one:function(e,t,n,r){return Ie(this,e,t,n,r,1)},off:function(e,t,n){var r,i
if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,C(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this
if("object"==typeof e){for(i in e)this.off(i,t,e[i])
return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Re),this.each(function(){C.event.remove(this,e,n,t)})}})
var He=/<script|<style|<link/i,Pe=/checked\s*(?:[^=]|=\s*.checked.)/i,Fe=/^\s*<!\[CDATA\[|\]\]>\s*$/g
function $e(e,t){return j(e,"table")&&j(11!==t.nodeType?t:t.firstChild,"tr")&&C(e).children("tbody")[0]||e}function Be(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Ue(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Qe(e,t){var n,r,i,o,s,a
if(1===t.nodeType){if(ae.hasData(e)&&(a=ae.get(e).events))for(i in ae.remove(t,"handle events"),a)for(n=0,r=a[i].length;n<r;n++)C.event.add(t,i,a[i][n])
ue.hasData(e)&&(o=ue.access(e),s=C.extend({},o),ue.set(t,s))}}function ze(e,t){var n=t.nodeName.toLowerCase()
"input"===n&&Ce.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function We(e,t,n,r){t=u(t)
var i,o,s,a,l,c,f=0,d=e.length,p=d-1,h=t[0],g=m(h)
if(g||d>1&&"string"==typeof h&&!v.checkClone&&Pe.test(h))return e.each(function(i){var o=e.eq(i)
g&&(t[0]=h.call(this,i,o.html())),We(o,t,n,r)})
if(d&&(o=(i=Oe(t,e[0].ownerDocument,!1,e,r)).firstChild,1===i.childNodes.length&&(i=o),o||r)){for(a=(s=C.map(Ne(i,"script"),Be)).length;f<d;f++)l=i,f!==p&&(l=C.clone(l,!0,!0),a&&C.merge(s,Ne(l,"script"))),n.call(e[f],l,f)
if(a)for(c=s[s.length-1].ownerDocument,C.map(s,Ue),f=0;f<a;f++)l=s[f],je.test(l.type||"")&&!ae.access(l,"globalEval")&&C.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?C._evalUrl&&!l.noModule&&C._evalUrl(l.src,{nonce:l.nonce||l.getAttribute("nonce")},c):w(l.textContent.replace(Fe,""),l,c))}return e}function Ve(e,t,n){for(var r,i=t?C.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||C.cleanData(Ne(r)),r.parentNode&&(n&&ve(r)&&qe(Ne(r,"script")),r.parentNode.removeChild(r))
return e}C.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=ve(e)
if(!(v.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||C.isXMLDoc(e)))for(s=Ne(a),r=0,i=(o=Ne(e)).length;r<i;r++)ze(o[r],s[r])
if(t)if(n)for(o=o||Ne(e),s=s||Ne(a),r=0,i=o.length;r<i;r++)Qe(o[r],s[r])
else Qe(e,a)
return(s=Ne(a,"script")).length>0&&qe(s,!u&&Ne(e,"script")),a},cleanData:function(e){for(var t,n,r,i=C.event.special,o=0;void 0!==(n=e[o]);o++)if(oe(n)){if(t=n[ae.expando]){if(t.events)for(r in t.events)i[r]?C.event.remove(n,r):C.removeEvent(n,r,t.handle)
n[ae.expando]=void 0}n[ue.expando]&&(n[ue.expando]=void 0)}}}),C.fn.extend({detach:function(e){return Ve(this,e,!0)},remove:function(e){return Ve(this,e)},text:function(e){return ee(this,function(e){return void 0===e?C.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return We(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||$e(this,e).appendChild(e)})},prepend:function(){return We(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=$e(this,e)
t.insertBefore(e,t.firstChild)}})},before:function(){return We(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return We(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(C.cleanData(Ne(e,!1)),e.textContent="")
return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return C.clone(this,e,t)})},html:function(e){return ee(this,function(e){var t=this[0]||{},n=0,r=this.length
if(void 0===e&&1===t.nodeType)return t.innerHTML
if("string"==typeof e&&!He.test(e)&&!Ae[(Se.exec(e)||["",""])[1].toLowerCase()]){e=C.htmlPrefilter(e)
try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(C.cleanData(Ne(t,!1)),t.innerHTML=e)
t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[]
return We(this,arguments,function(t){var n=this.parentNode
C.inArray(this,e)<0&&(C.cleanData(Ne(this)),n&&n.replaceChild(t,this))},e)}}),C.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){C.fn[e]=function(e){for(var n,r=[],i=C(e),o=i.length-1,s=0;s<=o;s++)n=s===o?this:this.clone(!0),C(i[s])[t](n),l.apply(r,n.get())
return this.pushStack(r)}})
var Ke=new RegExp("^("+de+")(?!px)[a-z%]+$","i"),Xe=/^--/,Ge=function(e){var t=e.ownerDocument.defaultView
return t&&t.opener||(t=r),t.getComputedStyle(e)},Ye=function(e,t,n){var r,i,o={}
for(i in t)o[i]=e.style[i],e.style[i]=t[i]
for(i in r=n.call(e),t)e.style[i]=o[i]
return r},Je=new RegExp(he.join("|"),"i")
function Ze(e,t,n){var r,i,o,s,a=Xe.test(t),u=e.style
return(n=n||Ge(e))&&(s=n.getPropertyValue(t)||n[t],a&&s&&(s=s.replace(O,"$1")||void 0),""!==s||ve(e)||(s=C.style(e,t)),!v.pixelBoxStyles()&&Ke.test(s)&&Je.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=s,s=n.width,u.width=r,u.minWidth=i,u.maxWidth=o)),void 0!==s?s+"":s}function et(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments)
delete this.get}}}!function(){function e(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ge.appendChild(l).appendChild(c)
var e=r.getComputedStyle(c)
n="1%"!==e.top,u=12===t(e.marginLeft),c.style.right="60%",s=36===t(e.right),i=36===t(e.width),c.style.position="absolute",o=12===t(c.offsetWidth/3),ge.removeChild(l),c=null}}function t(e){return Math.round(parseFloat(e))}var n,i,o,s,a,u,l=b.createElement("div"),c=b.createElement("div")
c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",v.clearCloneStyle="content-box"===c.style.backgroundClip,C.extend(v,{boxSizingReliable:function(){return e(),i},pixelBoxStyles:function(){return e(),s},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),u},scrollboxSize:function(){return e(),o},reliableTrDimensions:function(){var e,t,n,i
return null==a&&(e=b.createElement("table"),t=b.createElement("tr"),n=b.createElement("div"),e.style.cssText="position:absolute;left:-11111px;border-collapse:separate",t.style.cssText="box-sizing:content-box;border:1px solid",t.style.height="1px",n.style.height="9px",n.style.display="block",ge.appendChild(e).appendChild(t).appendChild(n),i=r.getComputedStyle(t),a=parseInt(i.height,10)+parseInt(i.borderTopWidth,10)+parseInt(i.borderBottomWidth,10)===t.offsetHeight,ge.removeChild(e)),a}}))}()
var tt=["Webkit","Moz","ms"],nt=b.createElement("div").style,rt={}
function it(e){return C.cssProps[e]||rt[e]||(e in nt?e:rt[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=tt.length;n--;)if((e=tt[n]+t)in nt)return e}(e)||e)}var ot=/^(none|table(?!-c[ea]).+)/,st={position:"absolute",visibility:"hidden",display:"block"},at={letterSpacing:"0",fontWeight:"400"}
function ut(e,t,n){var r=pe.exec(t)
return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function lt(e,t,n,r,i,o){var s="width"===t?1:0,a=0,u=0,l=0
if(n===(r?"border":"content"))return 0
for(;s<4;s+=2)"margin"===n&&(l+=C.css(e,n+he[s],!0,i)),r?("content"===n&&(u-=C.css(e,"padding"+he[s],!0,i)),"margin"!==n&&(u-=C.css(e,"border"+he[s]+"Width",!0,i))):(u+=C.css(e,"padding"+he[s],!0,i),"padding"!==n?u+=C.css(e,"border"+he[s]+"Width",!0,i):a+=C.css(e,"border"+he[s]+"Width",!0,i))
return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-a-.5))||0),u+l}function ct(e,t,n){var r=Ge(e),i=(!v.boxSizingReliable()||n)&&"border-box"===C.css(e,"boxSizing",!1,r),o=i,s=Ze(e,t,r),a="offset"+t[0].toUpperCase()+t.slice(1)
if(Ke.test(s)){if(!n)return s
s="auto"}return(!v.boxSizingReliable()&&i||!v.reliableTrDimensions()&&j(e,"tr")||"auto"===s||!parseFloat(s)&&"inline"===C.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===C.css(e,"boxSizing",!1,r),(o=a in e)&&(s=e[a])),(s=parseFloat(s)||0)+lt(e,t,n||(i?"border":"content"),o,r,s)+"px"}function ft(e,t,n,r,i){return new ft.prototype.init(e,t,n,r,i)}C.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Ze(e,"opacity")
return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=ie(t),u=Xe.test(t),l=e.style
if(u||(t=it(a)),s=C.cssHooks[t]||C.cssHooks[a],void 0===n)return s&&"get"in s&&void 0!==(i=s.get(e,!1,r))?i:l[t]
"string"==(o=typeof n)&&(i=pe.exec(n))&&i[1]&&(n=be(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(C.cssNumber[a]?"":"px")),v.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,s,a=ie(t)
return Xe.test(t)||(t=it(a)),(s=C.cssHooks[t]||C.cssHooks[a])&&"get"in s&&(i=s.get(e,!0,n)),void 0===i&&(i=Ze(e,t,r)),"normal"===i&&t in at&&(i=at[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),C.each(["height","width"],function(e,t){C.cssHooks[t]={get:function(e,n,r){if(n)return!ot.test(C.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?ct(e,t,r):Ye(e,st,function(){return ct(e,t,r)})},set:function(e,n,r){var i,o=Ge(e),s=!v.scrollboxSize()&&"absolute"===o.position,a=(s||r)&&"border-box"===C.css(e,"boxSizing",!1,o),u=r?lt(e,t,r,a,o):0
return a&&s&&(u-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-lt(e,t,"border",!1,o)-.5)),u&&(i=pe.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=C.css(e,t)),ut(0,n,u)}}}),C.cssHooks.marginLeft=et(v.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Ze(e,"marginLeft"))||e.getBoundingClientRect().left-Ye(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),C.each({margin:"",padding:"",border:"Width"},function(e,t){C.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+he[r]+t]=o[r]||o[r-2]||o[0]
return i}},"margin"!==e&&(C.cssHooks[e+t].set=ut)}),C.fn.extend({css:function(e,t){return ee(this,function(e,t,n){var r,i,o={},s=0
if(Array.isArray(t)){for(r=Ge(e),i=t.length;s<i;s++)o[t[s]]=C.css(e,t[s],!1,r)
return o}return void 0!==n?C.style(e,t,n):C.css(e,t)},e,t,arguments.length>1)}}),C.Tween=ft,ft.prototype={constructor:ft,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||C.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(C.cssNumber[n]?"":"px")},cur:function(){var e=ft.propHooks[this.prop]
return e&&e.get?e.get(this):ft.propHooks._default.get(this)},run:function(e){var t,n=ft.propHooks[this.prop]
return this.options.duration?this.pos=t=C.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):ft.propHooks._default.set(this),this}},ft.prototype.init.prototype=ft.prototype,ft.propHooks={_default:{get:function(e){var t
return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=C.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){C.fx.step[e.prop]?C.fx.step[e.prop](e):1!==e.elem.nodeType||!C.cssHooks[e.prop]&&null==e.elem.style[it(e.prop)]?e.elem[e.prop]=e.now:C.style(e.elem,e.prop,e.now+e.unit)}}},ft.propHooks.scrollTop=ft.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},C.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},C.fx=ft.prototype.init,C.fx.step={}
var dt,pt,ht=/^(?:toggle|show|hide)$/,gt=/queueHooks$/
function vt(){pt&&(!1===b.hidden&&r.requestAnimationFrame?r.requestAnimationFrame(vt):r.setTimeout(vt,C.fx.interval),C.fx.tick())}function mt(){return r.setTimeout(function(){dt=void 0}),dt=Date.now()}function yt(e,t){var n,r=0,i={height:e}
for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=he[r])]=i["padding"+n]=e
return t&&(i.opacity=i.width=e),i}function bt(e,t,n){for(var r,i=(xt.tweeners[t]||[]).concat(xt.tweeners["*"]),o=0,s=i.length;o<s;o++)if(r=i[o].call(n,t,e))return r}function xt(e,t,n){var r,i,o=0,s=xt.prefilters.length,a=C.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1
for(var t=dt||mt(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,s=l.tweens.length;o<s;o++)l.tweens[o].run(r)
return a.notifyWith(e,[l,r,n]),r<1&&s?n:(s||a.notifyWith(e,[l,1,0]),a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:C.extend({},t),opts:C.extend(!0,{specialEasing:{},easing:C.easing._default},n),originalProperties:t,originalOptions:n,startTime:dt||mt(),duration:n.duration,tweens:[],createTween:function(t,n){var r=C.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing)
return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0
if(i)return this
for(i=!0;n<r;n++)l.tweens[n].run(1)
return t?(a.notifyWith(e,[l,1,0]),a.resolveWith(e,[l,t])):a.rejectWith(e,[l,t]),this}}),c=l.props
for(function(e,t){var n,r,i,o,s
for(n in e)if(i=t[r=ie(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(s=C.cssHooks[r])&&"expand"in s)for(n in o=s.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i)
else t[r]=i}(c,l.opts.specialEasing);o<s;o++)if(r=xt.prefilters[o].call(l,e,c,l.opts))return m(r.stop)&&(C._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r
return C.map(c,bt,l),m(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),C.fx.timer(C.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}C.Animation=C.extend(xt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t)
return be(n.elem,e,pe.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(V)
for(var n,r=0,i=e.length;r<i;r++)n=e[r],xt.tweeners[n]=xt.tweeners[n]||[],xt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,s,a,u,l,c,f="width"in t||"height"in t,d=this,p={},h=e.style,g=e.nodeType&&ye(e),v=ae.get(e,"fxshow")
for(r in n.queue||(null==(s=C._queueHooks(e,"fx")).unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,d.always(function(){d.always(function(){s.unqueued--,C.queue(e,"fx").length||s.empty.fire()})})),t)if(i=t[r],ht.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue
g=!0}p[r]=v&&v[r]||C.style(e,r)}if((u=!C.isEmptyObject(t))||!C.isEmptyObject(p))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=ae.get(e,"display")),"none"===(c=C.css(e,"display"))&&(l?c=l:(ke([e],!0),l=e.style.display||l,c=C.css(e,"display"),ke([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===C.css(e,"float")&&(u||(d.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",d.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,p)u||(v?"hidden"in v&&(g=v.hidden):v=ae.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&ke([e],!0),d.done(function(){for(r in g||ke([e]),ae.remove(e,"fxshow"),p)C.style(e,r,p[r])})),u=bt(g?v[r]:0,r,d),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?xt.prefilters.unshift(e):xt.prefilters.push(e)}}),C.speed=function(e,t,n){var r=e&&"object"==typeof e?C.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t}
return C.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in C.fx.speeds?r.duration=C.fx.speeds[r.duration]:r.duration=C.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&C.dequeue(this,r.queue)},r},C.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ye).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=C.isEmptyObject(e),o=C.speed(t,n,r),s=function(){var t=xt(this,C.extend({},e),o);(i||ae.get(this,"finish"))&&t.stop(!0)}
return s.finish=s,i||!1===o.queue?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop
delete e.stop,t(n)}
return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=C.timers,s=ae.get(this)
if(i)s[i]&&s[i].stop&&r(s[i])
else for(i in s)s[i]&&s[i].stop&&gt.test(i)&&r(s[i])
for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1))
!t&&n||C.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=ae.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=C.timers,s=r?r.length:0
for(n.finish=!0,C.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1))
for(t=0;t<s;t++)r[t]&&r[t].finish&&r[t].finish.call(this)
delete n.finish})}}),C.each(["toggle","show","hide"],function(e,t){var n=C.fn[t]
C.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(yt(t,!0),e,r,i)}}),C.each({slideDown:yt("show"),slideUp:yt("hide"),slideToggle:yt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){C.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),C.timers=[],C.fx.tick=function(){var e,t=0,n=C.timers
for(dt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1)
n.length||C.fx.stop(),dt=void 0},C.fx.timer=function(e){C.timers.push(e),C.fx.start()},C.fx.interval=13,C.fx.start=function(){pt||(pt=!0,vt())},C.fx.stop=function(){pt=null},C.fx.speeds={slow:600,fast:200,_default:400},C.fn.delay=function(e,t){return e=C.fx&&C.fx.speeds[e]||e,t=t||"fx",this.queue(t,function(t,n){var i=r.setTimeout(t,e)
n.stop=function(){r.clearTimeout(i)}})},function(){var e=b.createElement("input"),t=b.createElement("select").appendChild(b.createElement("option"))
e.type="checkbox",v.checkOn=""!==e.value,v.optSelected=t.selected,(e=b.createElement("input")).value="t",e.type="radio",v.radioValue="t"===e.value}()
var wt,kt=C.expr.attrHandle
C.fn.extend({attr:function(e,t){return ee(this,C.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){C.removeAttr(this,e)})}}),C.extend({attr:function(e,t,n){var r,i,o=e.nodeType
if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?C.prop(e,t,n):(1===o&&C.isXMLDoc(e)||(i=C.attrHooks[t.toLowerCase()]||(C.expr.match.bool.test(t)?wt:void 0)),void 0!==n?null===n?void C.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=C.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!v.radioValue&&"radio"===t&&j(e,"input")){var n=e.value
return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(V)
if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),wt={set:function(e,t,n){return!1===t?C.removeAttr(e,n):e.setAttribute(n,n),n}},C.each(C.expr.match.bool.source.match(/\w+/g),function(e,t){var n=kt[t]||C.find.attr
kt[t]=function(e,t,r){var i,o,s=t.toLowerCase()
return r||(o=kt[s],kt[s]=i,i=null!=n(e,t,r)?s:null,kt[s]=o),i}})
var Et=/^(?:input|select|textarea|button)$/i,Tt=/^(?:a|area)$/i
function Ct(e){return(e.match(V)||[]).join(" ")}function St(e){return e.getAttribute&&e.getAttribute("class")||""}function jt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(V)||[]}C.fn.extend({prop:function(e,t){return ee(this,C.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[C.propFix[e]||e]})}}),C.extend({prop:function(e,t,n){var r,i,o=e.nodeType
if(3!==o&&8!==o&&2!==o)return 1===o&&C.isXMLDoc(e)||(t=C.propFix[t]||t,i=C.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=C.find.attr(e,"tabindex")
return t?parseInt(t,10):Et.test(e.nodeName)||Tt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),v.optSelected||(C.propHooks.selected={get:function(e){var t=e.parentNode
return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode
t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),C.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){C.propFix[this.toLowerCase()]=this}),C.fn.extend({addClass:function(e){var t,n,r,i,o,s
return m(e)?this.each(function(t){C(this).addClass(e.call(this,t,St(this)))}):(t=jt(e)).length?this.each(function(){if(r=St(this),n=1===this.nodeType&&" "+Ct(r)+" "){for(o=0;o<t.length;o++)i=t[o],n.indexOf(" "+i+" ")<0&&(n+=i+" ")
s=Ct(n),r!==s&&this.setAttribute("class",s)}}):this},removeClass:function(e){var t,n,r,i,o,s
return m(e)?this.each(function(t){C(this).removeClass(e.call(this,t,St(this)))}):arguments.length?(t=jt(e)).length?this.each(function(){if(r=St(this),n=1===this.nodeType&&" "+Ct(r)+" "){for(o=0;o<t.length;o++)for(i=t[o];n.indexOf(" "+i+" ")>-1;)n=n.replace(" "+i+" "," ")
s=Ct(n),r!==s&&this.setAttribute("class",s)}}):this:this.attr("class","")},toggleClass:function(e,t){var n,r,i,o,s=typeof e,a="string"===s||Array.isArray(e)
return m(e)?this.each(function(n){C(this).toggleClass(e.call(this,n,St(this),t),t)}):"boolean"==typeof t&&a?t?this.addClass(e):this.removeClass(e):(n=jt(e),this.each(function(){if(a)for(o=C(this),i=0;i<n.length;i++)r=n[i],o.hasClass(r)?o.removeClass(r):o.addClass(r)
else void 0!==e&&"boolean"!==s||((r=St(this))&&ae.set(this,"__className__",r),this.setAttribute&&this.setAttribute("class",r||!1===e?"":ae.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0
for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+Ct(St(n))+" ").indexOf(t)>-1)return!0
return!1}})
var At=/\r/g
C.fn.extend({val:function(e){var t,n,r,i=this[0]
return arguments.length?(r=m(e),this.each(function(n){var i
1===this.nodeType&&(null==(i=r?e.call(this,n,C(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=C.map(i,function(e){return null==e?"":e+""})),(t=C.valHooks[this.type]||C.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))})):i?(t=C.valHooks[i.type]||C.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(At,""):null==n?"":n:void 0}}),C.extend({valHooks:{option:{get:function(e){var t=C.find.attr(e,"value")
return null!=t?t:Ct(C.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,s="select-one"===e.type,a=s?null:[],u=s?o+1:i.length
for(r=o<0?u:s?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!j(n.parentNode,"optgroup"))){if(t=C(n).val(),s)return t
a.push(t)}return a},set:function(e,t){for(var n,r,i=e.options,o=C.makeArray(t),s=i.length;s--;)((r=i[s]).selected=C.inArray(C.valHooks.option.get(r),o)>-1)&&(n=!0)
return n||(e.selectedIndex=-1),o}}}}),C.each(["radio","checkbox"],function(){C.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=C.inArray(C(e).val(),t)>-1}},v.checkOn||(C.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})
var Nt=r.location,qt={guid:Date.now()},_t=/\?/
C.parseXML=function(e){var t,n
if(!e||"string"!=typeof e)return null
try{t=(new r.DOMParser).parseFromString(e,"text/xml")}catch(e){}return n=t&&t.getElementsByTagName("parsererror")[0],t&&!n||C.error("Invalid XML: "+(n?C.map(n.childNodes,function(e){return e.textContent}).join("\n"):e)),t}
var Ot=/^(?:focusinfocus|focusoutblur)$/,Mt=function(e){e.stopPropagation()}
C.extend(C.event,{trigger:function(e,t,n,i){var o,s,a,u,l,c,f,d,h=[n||b],g=p.call(e,"type")?e.type:e,v=p.call(e,"namespace")?e.namespace.split("."):[]
if(s=d=a=n=n||b,3!==n.nodeType&&8!==n.nodeType&&!Ot.test(g+C.event.triggered)&&(g.indexOf(".")>-1&&(v=g.split("."),g=v.shift(),v.sort()),l=g.indexOf(":")<0&&"on"+g,(e=e[C.expando]?e:new C.Event(g,"object"==typeof e&&e)).isTrigger=i?2:3,e.namespace=v.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:C.makeArray(t,[e]),f=C.event.special[g]||{},i||!f.trigger||!1!==f.trigger.apply(n,t))){if(!i&&!f.noBubble&&!y(n)){for(u=f.delegateType||g,Ot.test(u+g)||(s=s.parentNode);s;s=s.parentNode)h.push(s),a=s
a===(n.ownerDocument||b)&&h.push(a.defaultView||a.parentWindow||r)}for(o=0;(s=h[o++])&&!e.isPropagationStopped();)d=s,e.type=o>1?u:f.bindType||g,(c=(ae.get(s,"events")||Object.create(null))[e.type]&&ae.get(s,"handle"))&&c.apply(s,t),(c=l&&s[l])&&c.apply&&oe(s)&&(e.result=c.apply(s,t),!1===e.result&&e.preventDefault())
return e.type=g,i||e.isDefaultPrevented()||f._default&&!1!==f._default.apply(h.pop(),t)||!oe(n)||l&&m(n[g])&&!y(n)&&((a=n[l])&&(n[l]=null),C.event.triggered=g,e.isPropagationStopped()&&d.addEventListener(g,Mt),n[g](),e.isPropagationStopped()&&d.removeEventListener(g,Mt),C.event.triggered=void 0,a&&(n[l]=a)),e.result}},simulate:function(e,t,n){var r=C.extend(new C.Event,n,{type:e,isSimulated:!0})
C.event.trigger(r,null,t)}}),C.fn.extend({trigger:function(e,t){return this.each(function(){C.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0]
if(n)return C.event.trigger(e,t,n,!0)}})
var Dt=/\[\]$/,Rt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,Lt=/^(?:input|select|textarea|keygen)/i
function Ht(e,t,n,r){var i
if(Array.isArray(t))C.each(t,function(t,i){n||Dt.test(e)?r(e,i):Ht(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)})
else if(n||"object"!==k(t))r(e,t)
else for(i in t)Ht(e+"["+i+"]",t[i],n,r)}C.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t
r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)}
if(null==e)return""
if(Array.isArray(e)||e.jquery&&!C.isPlainObject(e))C.each(e,function(){i(this.name,this.value)})
else for(n in e)Ht(n,e[n],t,i)
return r.join("&")},C.fn.extend({serialize:function(){return C.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=C.prop(this,"elements")
return e?C.makeArray(e):this}).filter(function(){var e=this.type
return this.name&&!C(this).is(":disabled")&&Lt.test(this.nodeName)&&!It.test(e)&&(this.checked||!Ce.test(e))}).map(function(e,t){var n=C(this).val()
return null==n?null:Array.isArray(n)?C.map(n,function(e){return{name:t.name,value:e.replace(Rt,"\r\n")}}):{name:t.name,value:n.replace(Rt,"\r\n")}}).get()}})
var Pt=/%20/g,Ft=/#.*$/,$t=/([?&])_=[^&]*/,Bt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ut=/^(?:GET|HEAD)$/,Qt=/^\/\//,zt={},Wt={},Vt="*/".concat("*"),Kt=b.createElement("a")
function Xt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*")
var r,i=0,o=t.toLowerCase().match(V)||[]
if(m(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function Gt(e,t,n,r){var i={},o=e===Wt
function s(a){var u
return i[a]=!0,C.each(e[a]||[],function(e,a){var l=a(t,n,r)
return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function Yt(e,t){var n,r,i=C.ajaxSettings.flatOptions||{}
for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n])
return r&&C.extend(!0,e,r),e}Kt.href=Nt.href,C.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Nt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Nt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Vt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":C.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Yt(Yt(e,C.ajaxSettings),t):Yt(C.ajaxSettings,e)},ajaxPrefilter:Xt(zt),ajaxTransport:Xt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{}
var n,i,o,s,a,u,l,c,f,d,p=C.ajaxSetup({},t),h=p.context||p,g=p.context&&(h.nodeType||h.jquery)?C(h):C.event,v=C.Deferred(),m=C.Callbacks("once memory"),y=p.statusCode||{},x={},w={},k="canceled",E={readyState:0,getResponseHeader:function(e){var t
if(l){if(!s)for(s={};t=Bt.exec(o);)s[t[1].toLowerCase()+" "]=(s[t[1].toLowerCase()+" "]||[]).concat(t[2])
t=s[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return l?o:null},setRequestHeader:function(e,t){return null==l&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,x[e]=t),this},overrideMimeType:function(e){return null==l&&(p.mimeType=e),this},statusCode:function(e){var t
if(e)if(l)E.always(e[E.status])
else for(t in e)y[t]=[y[t],e[t]]
return this},abort:function(e){var t=e||k
return n&&n.abort(t),T(0,t),this}}
if(v.promise(E),p.url=((e||p.url||Nt.href)+"").replace(Qt,Nt.protocol+"//"),p.type=t.method||t.type||p.method||p.type,p.dataTypes=(p.dataType||"*").toLowerCase().match(V)||[""],null==p.crossDomain){u=b.createElement("a")
try{u.href=p.url,u.href=u.href,p.crossDomain=Kt.protocol+"//"+Kt.host!=u.protocol+"//"+u.host}catch(e){p.crossDomain=!0}}if(p.data&&p.processData&&"string"!=typeof p.data&&(p.data=C.param(p.data,p.traditional)),Gt(zt,p,t,E),l)return E
for(f in(c=C.event&&p.global)&&0===C.active++&&C.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Ut.test(p.type),i=p.url.replace(Ft,""),p.hasContent?p.data&&p.processData&&0===(p.contentType||"").indexOf("application/x-www-form-urlencoded")&&(p.data=p.data.replace(Pt,"+")):(d=p.url.slice(i.length),p.data&&(p.processData||"string"==typeof p.data)&&(i+=(_t.test(i)?"&":"?")+p.data,delete p.data),!1===p.cache&&(i=i.replace($t,"$1"),d=(_t.test(i)?"&":"?")+"_="+qt.guid+++d),p.url=i+d),p.ifModified&&(C.lastModified[i]&&E.setRequestHeader("If-Modified-Since",C.lastModified[i]),C.etag[i]&&E.setRequestHeader("If-None-Match",C.etag[i])),(p.data&&p.hasContent&&!1!==p.contentType||t.contentType)&&E.setRequestHeader("Content-Type",p.contentType),E.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Vt+"; q=0.01":""):p.accepts["*"]),p.headers)E.setRequestHeader(f,p.headers[f])
if(p.beforeSend&&(!1===p.beforeSend.call(h,E,p)||l))return E.abort()
if(k="abort",m.add(p.complete),E.done(p.success),E.fail(p.error),n=Gt(Wt,p,t,E)){if(E.readyState=1,c&&g.trigger("ajaxSend",[E,p]),l)return E
p.async&&p.timeout>0&&(a=r.setTimeout(function(){E.abort("timeout")},p.timeout))
try{l=!1,n.send(x,T)}catch(e){if(l)throw e
T(-1,e)}}else T(-1,"No Transport")
function T(e,t,s,u){var f,d,b,x,w,k=t
l||(l=!0,a&&r.clearTimeout(a),n=void 0,o=u||"",E.readyState=e>0?4:0,f=e>=200&&e<300||304===e,s&&(x=function(e,t,n){for(var r,i,o,s,a=e.contents,u=e.dataTypes;"*"===u[0];)u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"))
if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i)
break}if(u[0]in n)o=u[0]
else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i
break}s||(s=i)}o=o||s}if(o)return o!==u[0]&&u.unshift(o),n[o]}(p,E,s)),!f&&C.inArray("script",p.dataTypes)>-1&&C.inArray("json",p.dataTypes)<0&&(p.converters["text script"]=function(){}),x=function(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice()
if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s]
for(o=c.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u
else if("*"!==u&&u!==o){if(!(s=l[u+" "+o]||l["* "+o]))for(i in l)if((a=i.split(" "))[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){!0===s?s=l[i]:!0!==l[i]&&(o=a[0],c.unshift(a[1]))
break}if(!0!==s)if(s&&e.throws)t=s(t)
else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(p,x,E,f),f?(p.ifModified&&((w=E.getResponseHeader("Last-Modified"))&&(C.lastModified[i]=w),(w=E.getResponseHeader("etag"))&&(C.etag[i]=w)),204===e||"HEAD"===p.type?k="nocontent":304===e?k="notmodified":(k=x.state,d=x.data,f=!(b=x.error))):(b=k,!e&&k||(k="error",e<0&&(e=0))),E.status=e,E.statusText=(t||k)+"",f?v.resolveWith(h,[d,k,E]):v.rejectWith(h,[E,k,b]),E.statusCode(y),y=void 0,c&&g.trigger(f?"ajaxSuccess":"ajaxError",[E,p,f?d:b]),m.fireWith(h,[E,k]),c&&(g.trigger("ajaxComplete",[E,p]),--C.active||C.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return C.get(e,t,n,"json")},getScript:function(e,t){return C.get(e,void 0,t,"script")}}),C.each(["get","post"],function(e,t){C[t]=function(e,n,r,i){return m(n)&&(i=i||r,r=n,n=void 0),C.ajax(C.extend({url:e,type:t,dataType:i,data:n,success:r},C.isPlainObject(e)&&e))}}),C.ajaxPrefilter(function(e){var t
for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),C._evalUrl=function(e,t,n){return C.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){C.globalEval(e,t,n)}})},C.fn.extend({wrapAll:function(e){var t
return this[0]&&(m(e)&&(e=e.call(this[0])),t=C(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild
return e}).append(this)),this},wrapInner:function(e){return m(e)?this.each(function(t){C(this).wrapInner(e.call(this,t))}):this.each(function(){var t=C(this),n=t.contents()
n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=m(e)
return this.each(function(n){C(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){C(this).replaceWith(this.childNodes)}),this}}),C.expr.pseudos.hidden=function(e){return!C.expr.pseudos.visible(e)},C.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},C.ajaxSettings.xhr=function(){try{return new r.XMLHttpRequest}catch(e){}}
var Jt={0:200,1223:204},Zt=C.ajaxSettings.xhr()
v.cors=!!Zt&&"withCredentials"in Zt,v.ajax=Zt=!!Zt,C.ajaxTransport(function(e){var t,n
if(v.cors||Zt&&!e.crossDomain)return{send:function(i,o){var s,a=e.xhr()
if(a.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(s in e.xhrFields)a[s]=e.xhrFields[s]
for(s in e.mimeType&&a.overrideMimeType&&a.overrideMimeType(e.mimeType),e.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),i)a.setRequestHeader(s,i[s])
t=function(e){return function(){t&&(t=n=a.onload=a.onerror=a.onabort=a.ontimeout=a.onreadystatechange=null,"abort"===e?a.abort():"error"===e?"number"!=typeof a.status?o(0,"error"):o(a.status,a.statusText):o(Jt[a.status]||a.status,a.statusText,"text"!==(a.responseType||"text")||"string"!=typeof a.responseText?{binary:a.response}:{text:a.responseText},a.getAllResponseHeaders()))}},a.onload=t(),n=a.onerror=a.ontimeout=t("error"),void 0!==a.onabort?a.onabort=n:a.onreadystatechange=function(){4===a.readyState&&r.setTimeout(function(){t&&n()})},t=t("abort")
try{a.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}}),C.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),C.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return C.globalEval(e),e}}}),C.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),C.ajaxTransport("script",function(e){var t,n
if(e.crossDomain||e.scriptAttrs)return{send:function(r,i){t=C("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),b.head.appendChild(t[0])},abort:function(){n&&n()}}})
var en,tn=[],nn=/(=)\?(?=&|$)|\?\?/
C.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=tn.pop()||C.expando+"_"+qt.guid++
return this[e]=!0,e}}),C.ajaxPrefilter("json jsonp",function(e,t,n){var i,o,s,a=!1!==e.jsonp&&(nn.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&nn.test(e.data)&&"data")
if(a||"jsonp"===e.dataTypes[0])return i=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(nn,"$1"+i):!1!==e.jsonp&&(e.url+=(_t.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return s||C.error(i+" was not called"),s[0]},e.dataTypes[0]="json",o=r[i],r[i]=function(){s=arguments},n.always(function(){void 0===o?C(r).removeProp(i):r[i]=o,e[i]&&(e.jsonpCallback=t.jsonpCallback,tn.push(i)),s&&m(o)&&o(s[0]),s=o=void 0}),"script"}),v.createHTMLDocument=((en=b.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===en.childNodes.length),C.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(v.createHTMLDocument?((r=(t=b.implementation.createHTMLDocument("")).createElement("base")).href=b.location.href,t.head.appendChild(r)):t=b),o=!n&&[],(i=F.exec(e))?[t.createElement(i[1])]:(i=Oe([e],t,o),o&&o.length&&C(o).remove(),C.merge([],i.childNodes)))
var r,i,o},C.fn.load=function(e,t,n){var r,i,o,s=this,a=e.indexOf(" ")
return a>-1&&(r=Ct(e.slice(a)),e=e.slice(0,a)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),s.length>0&&C.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?C("<div>").append(C.parseHTML(e)).find(r):e)}).always(n&&function(e,t){s.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},C.expr.pseudos.animated=function(e){return C.grep(C.timers,function(t){return e===t.elem}).length},C.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l=C.css(e,"position"),c=C(e),f={}
"static"===l&&(e.style.position="relative"),a=c.offset(),o=C.css(e,"top"),u=C.css(e,"left"),("absolute"===l||"fixed"===l)&&(o+u).indexOf("auto")>-1?(s=(r=c.position()).top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,C.extend({},a))),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):c.css(f)}},C.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){C.offset.setOffset(this,e,t)})
var t,n,r=this[0]
return r?r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0}
if("fixed"===C.css(r,"position"))t=r.getBoundingClientRect()
else{for(t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===C.css(e,"position");)e=e.parentNode
e&&e!==r&&1===e.nodeType&&((i=C(e).offset()).top+=C.css(e,"borderTopWidth",!0),i.left+=C.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-C.css(r,"marginTop",!0),left:t.left-i.left-C.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===C.css(e,"position");)e=e.offsetParent
return e||ge})}}),C.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t
C.fn[e]=function(r){return ee(this,function(e,r,i){var o
if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r]
o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),C.each(["top","left"],function(e,t){C.cssHooks[t]=et(v.pixelPosition,function(e,n){if(n)return n=Ze(e,t),Ke.test(n)?C(e).position()[t]+"px":n})}),C.each({Height:"height",Width:"width"},function(e,t){C.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){C.fn[r]=function(i,o){var s=arguments.length&&(n||"boolean"!=typeof i),a=n||(!0===i||!0===o?"margin":"border")
return ee(this,function(t,n,i){var o
return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?C.css(t,n,a):C.style(t,n,i,a)},t,s?i:void 0,s)}})}),C.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){C.fn[t]=function(e){return this.on(t,e)}}),C.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.on("mouseenter",e).on("mouseleave",t||e)}}),C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){C.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}})
var rn=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g
C.proxy=function(e,t){var n,r,i
if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=a.call(arguments,2),i=function(){return e.apply(t||this,r.concat(a.call(arguments)))},i.guid=e.guid=e.guid||C.guid++,i},C.holdReady=function(e){e?C.readyWait++:C.ready(!0)},C.isArray=Array.isArray,C.parseJSON=JSON.parse,C.nodeName=j,C.isFunction=m,C.isWindow=y,C.camelCase=ie,C.type=k,C.now=Date.now,C.isNumeric=function(e){var t=C.type(e)
return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},C.trim=function(e){return null==e?"":(e+"").replace(rn,"$1")},void 0===(n=function(){return C}.apply(t,[]))||(e.exports=n)
var on=r.jQuery,sn=r.$
return C.noConflict=function(e){return r.$===C&&(r.$=sn),e&&r.jQuery===C&&(r.jQuery=on),C},void 0===i&&(r.jQuery=r.$=C),C})},4977(e,t,n){var r
e=n.nmd(e),function(){"use strict"
function i(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=Array(t);n<t;n++)r[n]=e[n]
return r}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,c(r.key),r)}}function a(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(null!=n){var r,i,o,s,a=[],u=!0,l=!1
try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return
u=!1}else for(;!(u=(r=o.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,i=e}finally{try{if(!u&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(l)throw i}}return a}}(e,t)||d(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||d(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e){var t=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:t+""}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function d(e,t){if(e){if("string"==typeof e)return i(e,t)
var n={}.toString.call(e).slice(8,-1)
return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}var p=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if(void 0!==y)return y
if("undefined"!=typeof globalThis)return globalThis
throw new Error("Unable to locate global object")}(),h=p.console,g=p.setTimeout,v=p.clearTimeout,m=p.process,y=p.window,b=y&&y.document,x=y&&y.navigator,w=function(){var e="qunit-test-string"
try{return p.sessionStorage.setItem(e,e),p.sessionStorage.removeItem(e),p.sessionStorage}catch(e){return}}(),k="function"==typeof p.Map&&"function"==typeof p.Map.prototype.keys&&"function"==typeof p.Symbol&&"symbol"===f(p.Symbol.iterator)?p.Map:function(e){var t=this,n=Object.create(null),r=Object.prototype.hasOwnProperty
this.has=function(e){return r.call(n,e)},this.get=function(e){return n[e]},this.set=function(e,t){return r.call(n,e)||this.size++,n[e]=t,this},this.delete=function(e){r.call(n,e)&&(delete n[e],this.size--)},this.forEach=function(e){for(var t in n)e(n[t],t)},this.keys=function(){return Object.keys(n)},this.clear=function(){n=Object.create(null),this.size=0},this.size=0,e&&e.forEach(function(e,n){t.set(n,e)})},E="function"==typeof p.Set&&"function"==typeof p.Set.prototype.values?p.Set:function(e){var t=Object.create(null)
return Array.isArray(e)&&e.forEach(function(e){t[e]=!0}),{add:function(e){t[e]=!0},has:function(e){return e in t},get size(){return Object.keys(t).length}}},T=Object.prototype.toString,C=Object.prototype.hasOwnProperty,S={now:y&&y.performance&&y.performance.now?y.performance.now.bind(y.performance):Date.now}
function j(e,t){return e.filter(function(e){return-1===t.indexOf(e)})}var A=Array.prototype.includes?function(e,t){return t.includes(e)}:function(e,t){return-1!==t.indexOf(e)}
function N(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=t&&M("array",e)?[]:{}
for(var r in e)if(C.call(e,r)){var i=e[r]
n[r]=i===Object(i)?N(i,t):i}return n}function q(e,t){if(e!==Object(e))return e
var n={}
for(var r in t)C.call(t,r)&&C.call(e,r)&&(n[r]=q(e[r],t[r]))
return n}function _(e,t,n){for(var r in t)C.call(t,r)&&(void 0===t[r]?delete e[r]:n&&void 0!==e[r]||(e[r]=t[r]))
return e}function O(e){if(void 0===e)return"undefined"
if(null===e)return"null"
var t=T.call(e).match(/^\[object\s(.*)\]$/),n=t&&t[1]
switch(n){case"Number":return isNaN(e)?"nan":"number"
case"String":case"Boolean":case"Array":case"Set":case"Map":case"Date":case"RegExp":case"Function":case"Symbol":return n.toLowerCase()
default:return f(e)}}function M(e,t){return O(t)===e}function D(e,t){for(var n=e+""+t,r=0,i=0;i<n.length;i++)r=(r<<5)-r+n.charCodeAt(i),r|=0
var o=(4294967296+r).toString(16)
return o.length<8&&(o="0000000"+o),o.slice(-8)}function R(e){var t=String(e)
return"[object"===t.slice(0,7)?(e.name||"Error")+(e.message?": ".concat(e.message):""):t}function I(e){return e?(""+e).replace(/['"<>&]/g,function(e){switch(e){case"'":return"&#039;"
case'"':return"&quot;"
case"<":return"&lt;"
case">":return"&gt;"
case"&":return"&amp;"}}):""}var L=new E(["boolean","number","string"]),H=[]
function P(e,t){return e===t}function F(e,t){return e===t||e.valueOf()===t.valueOf()}function $(e){var t=Object.getPrototypeOf(e)
return t&&null!==t.constructor?e.constructor:Object}function B(e){return"flags"in e?e.flags:e.toString().match(/[gimuy]*$/)[0]}var U={undefined:P,null:P,boolean:F,number:function(e,t){return e===t||e.valueOf()===t.valueOf()||isNaN(e.valueOf())&&isNaN(t.valueOf())},string:F,symbol:P,date:F,nan:function(){return!0},regexp:function(e,t){return e.source===t.source&&B(e)===B(t)},function:P,array:function(e,t){if(e.length!==t.length)return!1
for(var n=0;n<e.length;n++)if(!z(e[n],t[n]))return!1
return!0},set:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach(function(e){if(n){var r=!1
t.forEach(function(t){if(!r){var n=H
H=[],z(t,e)&&(r=!0),H=n}}),r||(n=!1)}}),n},map:function(e,t){if(e.size!==t.size)return!1
var n=!0
return e.forEach(function(e,r){if(n){var i=!1
t.forEach(function(t,n){if(!i){var o=H
H=[],U.array([t,n],[e,r])&&(i=!0),H=o}}),i||(n=!1)}}),n}},Q={undefined:P,null:P,boolean:P,number:function(e,t){return e===t||isNaN(e)&&isNaN(t)},string:P,symbol:P,function:P,object:function(e,t){if(H.some(function(n){return n.a===e&&n.b===t}))return!0
H.push({a:e,b:t})
var n=O(e),r=O(t)
if("object"!==n||"object"!==r)return n===r&&U[n](e,t)
if(!1===function(e,t){return $(e)===$(t)}(e,t))return!1
var i=[],o=[]
for(var s in e)if(i.push(s),(e.constructor===Object||void 0===e.constructor||"function"!=typeof e[s]||"function"!=typeof t[s]||e[s].toString()!==t[s].toString())&&!z(e[s],t[s]))return!1
for(var a in t)o.push(a)
return U.array(i.sort(),o.sort())}}
function z(e,t){if(e===t)return!0
var n=f(e),r=f(t)
return n!==r?("object"===n&&L.has(O(e))?e.valueOf():e)===("object"===r&&L.has(O(t))?t.valueOf():t):Q[n](e,t)}function W(e,t){var n=z(e,t)
return H=[],n}function V(e,t){if(2===arguments.length)return e===t||W(e,t)
for(var n=arguments.length-1;n>0;){if(!W(arguments[n-1],arguments[n]))return!1
n--}return!0}var K={altertitle:!0,collapse:!0,countStepsAsOne:!1,failOnZeroTests:!0,filter:void 0,ignoreUnhandledRejections:!1,testFilter:null,maxDepth:5,module:void 0,moduleId:void 0,reorder:!0,reporters:{},requireExpects:!1,scrolltop:!0,storage:w,testId:void 0,urlConfig:[],currentModule:{name:"",tests:[],childModules:[],testsRun:0,testsIgnored:0,hooks:{before:[],beforeEach:[],afterEach:[],after:[]}},globalHooks:{},pq:null,_event_listeners:Object.create(null),_event_memory:{},_deprecated_timeout_shown:!1,_deprecated_countEachStep_shown:!1,blocking:!0,callbacks:{},modules:[],queue:[],stats:{all:0,bad:0,testCount:0}}
function X(e,t){("boolean"==typeof e||"string"==typeof e&&""!==e)&&(K[t]=!0===e||"true"===e)}function G(e,t){("number"==typeof e||"string"==typeof e&&/^[0-9]+$/.test(e))&&(K[t]=+e)}function Y(e,t){"string"==typeof e&&""!==e&&(K[t]=e)}function J(e,t){"string"==typeof e&&""!==e&&(K[t]=[e])}function Z(e){X(e.qunit_config_altertitle,"altertitle"),X(e.qunit_config_autostart,"autostart"),X(e.qunit_config_collapse,"collapse"),X(e.qunit_config_failonzerotests,"failOnZeroTests"),Y(e.qunit_config_filter,"filter"),Y(e.qunit_config_fixture,"fixture"),X(e.qunit_config_hidepassed,"hidepassed"),G(e.qunit_config_maxdepth,"maxDepth"),Y(e.qunit_config_module,"module"),J(e.qunit_config_moduleid,"moduleId"),X(e.qunit_config_noglobals,"noglobals"),X(e.qunit_config_notrycatch,"notrycatch"),X(e.qunit_config_reorder,"reorder"),X(e.qunit_config_requireexpects,"requireExpects"),X(e.qunit_config_scrolltop,"scrolltop"),function(e){("boolean"==typeof e||"string"==typeof e&&""!==e)&&(K.seed=e)}(e.qunit_config_seed),J(e.qunit_config_testid,"testId"),G(e.qunit_config_testtimeout,"testTimeout")
var t={qunit_config_reporters_console:"console",qunit_config_reporters_tap:"tap"}
for(var n in t){var r=e[n]
if("boolean"==typeof r||"string"==typeof r&&""!==r){var i=t[n]
K.reporters[i]=!0===r||"true"===r||"1"===r}}}m&&"env"in m&&Z(m.env),Z(p)
var ee=p&&p.QUnit&&!p.QUnit.version&&p.QUnit.config
ee&&_(K,ee),K.modules.push(K.currentModule),"true"!==K.seed&&!0!==K.seed||(K.seed=(Math.random().toString(36)+"0000000000").slice(2,12))
var te=function(){function e(e){return'"'+e.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'}function t(e){return e+""}function n(e,t,n){var r=o.separator(),i=o.indent(1)
return t.join&&(t=t.join(","+r+i)),t?[e,i+t,o.indent()+n].join(r):e+n}function r(e,t){if(o.maxDepth&&o.depth>o.maxDepth)return"[object Array]"
this.up()
for(var r=e.length,i=new Array(r);r--;)i[r]=this.parse(e[r],void 0,t)
return this.down(),n("[",i,"]")}var i=/^function (\w+)/,o={parse:function(e,t,n){var r=(n=n||[]).indexOf(e)
if(-1!==r)return"recursion(".concat(r-n.length,")")
t=t||this.typeOf(e)
var i=this.parsers[t],o=f(i)
if("function"===o){n.push(e)
var s=i.call(this,e,n)
return n.pop(),s}return"string"===o?i:"[ERROR: Missing QUnit.dump formatter for type "+t+"]"},typeOf:function(e){var t
return t=null===e?"null":void 0===e?"undefined":M("regexp",e)?"regexp":M("date",e)?"date":M("function",e)?"function":void 0!==e.setInterval&&void 0!==e.document&&void 0===e.nodeType?"window":9===e.nodeType?"document":e.nodeType?"node":function(e){return"[object Array]"===T.call(e)||"number"==typeof e.length&&void 0!==e.item&&(e.length?e.item(0)===e[0]:null===e.item(0)&&void 0===e[0])}(e)?"array":e.constructor===Error.prototype.constructor?"error":f(e),t},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&#160;":" "},indent:function(e){if(!this.multiline)return""
var t=this.indentChar
return this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&#160;")),new Array(this.depth+(e||0)).join(t)},up:function(e){this.depth+=e||1},down:function(e){this.depth-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:t,join:n,depth:1,maxDepth:K.maxDepth,parsers:{window:"[Window]",document:"[Document]",error:function(e){return'Error("'+e.message+'")'},unknown:"[Unknown]",null:"null",undefined:"undefined",function:function(e){var t="function",r="name"in e?e.name:(i.exec(e)||[])[1]
return r&&(t+=" "+r),n(t=[t+="(",o.parse(e,"functionArgs"),"){"].join(""),o.parse(e,"functionCode"),"}")},array:r,nodelist:r,arguments:r,object:function(e,t){var r=[]
if(o.maxDepth&&o.depth>o.maxDepth)return"[object Object]"
o.up()
var i=[]
for(var s in e)i.push(s)
var a=["message","name"]
for(var u in a){var l=a[u]
l in e&&!A(l,i)&&i.push(l)}i.sort()
for(var c=0;c<i.length;c++){var f=i[c],d=e[f]
r.push(o.parse(f,"key")+": "+o.parse(d,void 0,t))}return o.down(),n("{",r,"}")},node:function(e){var t=o.HTML?"&lt;":"<",n=o.HTML?"&gt;":">",r=e.nodeName.toLowerCase(),i=t+r,s=e.attributes
if(s)for(var a=0;a<s.length;a++){var u=s[a].nodeValue
u&&"inherit"!==u&&(i+=" "+s[a].nodeName+"="+o.parse(u,"attribute"))}return i+=n,3!==e.nodeType&&4!==e.nodeType||(i+=e.nodeValue),i+t+"/"+r+n},functionArgs:function(e){var t=e.length
if(!t)return""
for(var n=new Array(t);t--;)n[t]=String.fromCharCode(97+t)
return" "+n.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:t,number:t,boolean:t,symbol:function(e){return e.toString()}},HTML:!1,indentChar:"  ",multiline:!0}
return o}(),ne={warn:h?Function.prototype.bind.call(h.warn||h.log,h):function(){}},re=a(function e(t,n){o(this,e),this.name=t,this.fullName=n?n.fullName.concat(t):[],this.globalFailureCount=0,this.tests=[],this.childSuites=[],n&&n.pushChildSuite(this)},[{key:"start",value:function(e){return e&&(this._startTime=S.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map(function(e){return e.start()}),childSuites:this.childSuites.map(function(e){return e.start()}),testCounts:{total:this.getTestCounts().total}}}},{key:"end",value:function(e){return e&&(this._endTime=S.now()),{name:this.name,fullName:this.fullName.slice(),tests:this.tests.map(function(e){return e.end()}),childSuites:this.childSuites.map(function(e){return e.end()}),testCounts:this.getTestCounts(),runtime:this.getRuntime(),status:this.getStatus()}}},{key:"pushChildSuite",value:function(e){this.childSuites.push(e)}},{key:"pushTest",value:function(e){this.tests.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getTestCounts",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{passed:0,failed:0,skipped:0,todo:0,total:0}
return e.failed+=this.globalFailureCount,e.total+=this.globalFailureCount,e=this.tests.reduce(function(e,t){return t.valid&&(e[t.getStatus()]++,e.total++),e},e),this.childSuites.reduce(function(e,t){return t.getTestCounts(e)},e)}},{key:"getStatus",value:function(){var e=this.getTestCounts(),t=e.total,n=e.failed,r=e.skipped,i=e.todo
return n?"failed":r===t?"skipped":i===t?"todo":"passed"}}]),ie=[],oe=new re
function se(e,t,n){var r=t[n]
"function"==typeof r&&e[n].push(r),delete t[n]}function ae(e,t){return function(n){K.currentModule!==e&&ne.warn("The `"+t+"` hook was called inside the wrong module (`"+K.currentModule.name+"`). Instead, use hooks provided by the callback to the containing module (`"+e.name+"`). This will become an error in QUnit 3.0."),e.hooks[t].push(n)}}function ue(e,t,n){"function"==typeof t&&(n=t,t=void 0)
var r=function(e,t,n){var r=ie.length?ie.slice(-1)[0]:null,i=null!==r?[r.name,e].join(" > "):e,o=r?r.suiteReport:oe,s=null!==r&&r.skip||n.skip,a=null!==r&&r.todo||n.todo,u={}
r&&_(u,r.testEnvironment),_(u,t)
var l={name:i,parentModule:r,hooks:{before:[],beforeEach:[],afterEach:[],after:[]},testEnvironment:u,tests:[],moduleId:D(i),testsRun:0,testsIgnored:0,childModules:[],suiteReport:new re(e,o),stats:null,skip:s,todo:!s&&a,ignored:n.ignored||!1}
return r&&r.childModules.push(l),K.modules.push(l),l}(e,t,arguments.length>3&&void 0!==arguments[3]?arguments[3]:{}),i=r.testEnvironment,o=r.hooks
se(o,i,"before"),se(o,i,"beforeEach"),se(o,i,"afterEach"),se(o,i,"after")
var s={before:ae(r,"before"),beforeEach:ae(r,"beforeEach"),afterEach:ae(r,"afterEach"),after:ae(r,"after")},a=K.currentModule
if(K.currentModule=r,"function"==typeof n){ie.push(r)
try{var u=n.call(r.testEnvironment,s)
u&&"function"==typeof u.then&&ne.warn("Returning a promise from a module callback is not supported. Instead, use hooks for async behavior. This will become an error in QUnit 3.0.")}finally{ie.pop(),K.currentModule=r.parentModule||a}}}function le(e){for(var t=null,n=e.suiteReport;n;){n.tests.length=0
var r=n.childSuites.indexOf(t);-1===r?n.childSuites.length=0:(n.childSuites.splice(0,r),n.childSuites.splice(1)),n===oe?n=null:(t=n,n=(e=e.parentModule)&&e.suiteReport||oe)}}var ce=!1
function fe(e,t,n){var r,i=ce&&(r=K.modules.filter(function(e){return!e.ignored}).map(function(e){return e.moduleId}),!ie.some(function(e){return r.includes(e.moduleId)}))
ue(e,t,n,{ignored:i})}fe.only=function(){ce||(K.modules.length=0,K.queue.length=0,le(K.currentModule),K.currentModule.ignored=!0),ce=!0,ue.apply(void 0,arguments)},fe.skip=function(e,t,n){ce||ue(e,t,n,{skip:!0})},fe.if=function(e,t,n,r){ce||ue(e,n,r,{skip:!t})},fe.todo=function(e,t,n){ce||ue(e,t,n,{todo:!0})}
var de=function(){var e=new Error
if(!e.stack)try{throw e}catch(t){e=t}return(e.stack||"").replace(/^error$\n/im,"").split("\n")[0].replace(/(:\d+)+\)?/g,"").replace(/.+[/\\]/,"")}()
function pe(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=e.split("\n"),i=[]
n&&-1!==n.indexOf(r[0])&&i.push(r.shift())
for(var o=!0,s=0;s<r.length;s++){var a=r[s],u=de&&-1!==a.indexOf(de)||-1!==a.indexOf("node:internal/")||a.match(/^\s+at .+\(internal[^)]*\)$/)||a.match(/^\s+at .+\([a-z]+\.js[:\d]*\)$/)
u||(o=!1),o||i.push(u?t(a):a)}return i.join("\n")}function he(e,t){if(t=void 0===t?4:t,e&&e.stack){var n=e.stack.split("\n")
if(/^error$/i.test(n[0])&&n.shift(),de){for(var r=[],i=t;i<n.length&&-1===n[i].indexOf(de);i++)r.push(n[i])
if(r.length)return r.join("\n")}return n[t]}}function ge(e){var t=new Error
if(!t.stack)try{throw t}catch(e){t=e}return he(t,e)}var ve=function(){function e(t){o(this,e),this.test=t}return a(e,[{key:"timeout",value:function(e){if("number"!=typeof e)throw new Error("You must pass a number as the duration to assert.timeout")
this.test.timeout=e,K.timeout&&(v(K.timeout),K.timeout=null,K.timeoutHandler&&this.test.timeout>0&&this.test.internalResetTimeout(this.test.timeout))}},{key:"step",value:function(e){var t=e,n=!!e
this.test.steps.push(e),void 0===e||""===e?t="You must provide a message to assert.step":"string"!=typeof e&&(t="You must provide a string value to assert.step",n=!1),this.pushResult({result:n,message:t})}},{key:"verifySteps",value:function(e,t){var n=this.test.steps.slice()
this.deepEqual(n,e,t),this.test.stepsCount+=this.test.steps.length,this.test.steps.length=0}},{key:"expect",value:function(e){if(1!==arguments.length)return this.test.expected
this.test.expected=e}},{key:"async",value:function(e){if(void 0===e)e=1
else if("number"!=typeof e)throw new TypeError("async takes number as an input")
var t=e
return this.test.internalStop(t)}},{key:"closeTo",value:function(e,t,n,r){if("number"!=typeof n)throw new TypeError("closeTo() requires a delta argument")
this.pushResult({result:Math.abs(e-t)<=n,actual:e,expected:t,message:r||"value should be within ".concat(n," inclusive")})}},{key:"push",value:function(t,n,r,i,o){return(this instanceof e?this:K.current.assert).pushResult({result:t,actual:n,expected:r,message:i,negative:o})}},{key:"pushResult",value:function(t){var n=this,r=n instanceof e&&n.test||K.current
if(!r)throw new Error("assertion outside test context, in "+ge(2))
return n instanceof e||(n=r.assert),n.test.pushResult(t)}},{key:"ok",value:function(e,t){t||(t=e?"okay":"failed, expected argument to be truthy, was: ".concat(te.parse(e))),this.pushResult({result:!!e,actual:e,expected:!0,message:t})}},{key:"notOk",value:function(e,t){t||(t=e?"failed, expected argument to be falsy, was: ".concat(te.parse(e)):"okay"),this.pushResult({result:!e,actual:e,expected:!1,message:t})}},{key:"true",value:function(e,t){this.pushResult({result:!0===e,actual:e,expected:!0,message:t})}},{key:"false",value:function(e,t){this.pushResult({result:!1===e,actual:e,expected:!1,message:t})}},{key:"equal",value:function(e,t,n){this.pushResult({result:t==e,actual:e,expected:t,message:n})}},{key:"notEqual",value:function(e,t,n){this.pushResult({result:t!=e,actual:e,expected:t,message:n,negative:!0})}},{key:"propEqual",value:function(e,t,n){e=N(e),t=N(t),this.pushResult({result:V(e,t),actual:e,expected:t,message:n})}},{key:"notPropEqual",value:function(e,t,n){e=N(e),t=N(t),this.pushResult({result:!V(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"propContains",value:function(e,t,n){e=q(e,t),t=N(t,!1),this.pushResult({result:V(e,t),actual:e,expected:t,message:n})}},{key:"notPropContains",value:function(e,t,n){e=q(e,t),t=N(t),this.pushResult({result:!V(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"deepEqual",value:function(e,t,n){this.pushResult({result:V(e,t),actual:e,expected:t,message:n})}},{key:"notDeepEqual",value:function(e,t,n){this.pushResult({result:!V(e,t),actual:e,expected:t,message:n,negative:!0})}},{key:"strictEqual",value:function(e,t,n){this.pushResult({result:t===e,actual:e,expected:t,message:n})}},{key:"notStrictEqual",value:function(e,t,n){this.pushResult({result:t!==e,actual:e,expected:t,message:n,negative:!0})}},{key:"throws",value:function(t,n,r){var i=u(me(n,r,"throws"),2)
n=i[0],r=i[1]
var o=this instanceof e&&this.test||K.current
if("function"==typeof t){var s,a=!1
o.ignoreGlobalErrors=!0
try{t.call(o.testEnvironment)}catch(e){s=e}if(o.ignoreGlobalErrors=!1,s){var l=u(ye(s,n,r),3)
a=l[0],n=l[1],r=l[2]}return o.assert.pushResult({result:a,actual:s&&R(s),expected:n,message:r}),s}o.assert.pushResult({result:!1,actual:t,message:'The value provided to `assert.throws` in "'+o.testName+'" was not a function.'})}},{key:"rejects",value:function(t,n,r){var i=u(me(n,r,"rejects"),2)
n=i[0],r=i[1]
var o=this instanceof e&&this.test||K.current,s=t&&t.then
if("function"==typeof s){var a=this.async()
return s.call(t,function(){o.assert.pushResult({result:!1,message:'The promise returned by the `assert.rejects` callback in "'+o.testName+'" did not reject.',actual:t}),a()},function(e){var t,i=u(ye(e,n,r),3)
return t=i[0],n=i[1],r=i[2],o.assert.pushResult({result:t,actual:e&&R(e),expected:n,message:r}),a(),e})}o.assert.pushResult({result:!1,message:'The value provided to `assert.rejects` in "'+o.testName+'" was not a promise.',actual:t})}}])}()
function me(e,t,n){var r=O(e)
if("string"===r){if(void 0===t)return t=e,[e=void 0,t]
throw new Error("assert."+n+" does not accept a string value for the expected argument.\nUse a non-string object value (e.g. RegExp or validator function) instead if necessary.")}if(e&&"regexp"!==r&&"function"!==r&&"object"!==r)throw new Error("Invalid expected value type ("+r+") provided to assert."+n+".")
return[e,t]}function ye(e,t,n){var r=!1,i=O(t)
if(t){if("regexp"===i)r=t.test(R(e)),t=String(t)
else if("function"===i&&void 0!==t.prototype&&e instanceof t)r=!0
else if("object"===i)r=e instanceof t.constructor&&e.name===t.name&&e.message===t.message,t=R(t)
else if("function"===i)try{r=!0===t.call({},e),t=null}catch(e){t=R(e)}}else r=!0
return[r,t,n]}ve.prototype.raises=ve.prototype.throws
var be=["error","runStart","suiteStart","testStart","assertion","testEnd","suiteEnd","runEnd"],xe=["error","runEnd"]
function we(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when emitting an event")
for(var n=K._event_listeners[e],r=n?l(n):[],i=0;i<r.length;i++)r[i](t)
A(e,xe)&&(K._event_memory[e]=t)}var ke="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{}
function Ee(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Te={exports:{}}
!function(){var e=function(){if("undefined"!=typeof globalThis)return globalThis
if("undefined"!=typeof self)return self
if("undefined"!=typeof window)return window
if(void 0!==ke)return ke
throw new Error("unable to locate global object")}()
if("function"!=typeof e.Promise){var t=setTimeout
if(o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var n=new this.constructor(i)
return s(this,new c(e,t,n)),n},o.prototype.finally=function(e){var t=this.constructor
return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},o.all=function(e){return new o(function(t,n){if(!r(e))return n(new TypeError("Promise.all accepts an array"))
var i=Array.prototype.slice.call(e)
if(0===i.length)return t([])
var o=i.length
function s(e,r){try{if(r&&("object"===f(r)||"function"==typeof r)){var a=r.then
if("function"==typeof a)return void a.call(r,function(t){s(e,t)},n)}i[e]=r,0===--o&&t(i)}catch(e){n(e)}}for(var a=0;a<i.length;a++)s(a,i[a])})},o.allSettled=function(e){return new this(function(t,n){if(!e||void 0===e.length)return n(new TypeError(f(e)+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"))
var r=Array.prototype.slice.call(e)
if(0===r.length)return t([])
var i=r.length
function o(e,n){if(n&&("object"===f(n)||"function"==typeof n)){var s=n.then
if("function"==typeof s)return void s.call(n,function(t){o(e,t)},function(n){r[e]={status:"rejected",reason:n},0===--i&&t(r)})}r[e]={status:"fulfilled",value:n},0===--i&&t(r)}for(var s=0;s<r.length;s++)o(s,r[s])})},o.resolve=function(e){return e&&"object"===f(e)&&e.constructor===o?e:new o(function(t){t(e)})},o.reject=function(e){return new o(function(t,n){n(e)})},o.race=function(e){return new o(function(t,n){if(!r(e))return n(new TypeError("Promise.race accepts an array"))
for(var i=0,s=e.length;i<s;i++)o.resolve(e[i]).then(t,n)})},"function"==typeof setImmediate){var n=setImmediate
o._immediateFn=function(e){n(e)}}else o._immediateFn=function(e){t(e,0)}
o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},Te.exports=o}else Te.exports=e.Promise
function r(e){return Boolean(e&&void 0!==e.length)}function i(){}function o(e){if(!(this instanceof o))throw new TypeError("Promises must be constructed via new")
if("function"!=typeof e)throw new TypeError("not a function")
this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function s(e,t){for(;3===e._state;)e=e._value
0!==e._state?(e._handled=!0,o._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected
if(null!==n){var r
try{r=n(e._value)}catch(e){return void u(t.promise,e)}a(t.promise,r)}else(1===e._state?a:u)(t.promise,e._value)})):e._deferreds.push(t)}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.")
if(t&&("object"===f(t)||"function"==typeof t)){var n=t.then
if(t instanceof o)return e._state=3,e._value=t,void l(e)
if("function"==typeof n)return void d((r=n,i=t,function(){r.apply(i,arguments)}),e)}e._state=1,e._value=t,l(e)}catch(t){u(e,t)}var r,i}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)})
for(var t=0,n=e._deferreds.length;t<n;t++)s(e,e._deferreds[t])
e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1
try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,u(t,e))})}catch(e){if(n)return
n=!0,u(t,e)}}}()
var Ce=Te.exports
function Se(e,t){var n=K.callbacks[e]
if("log"!==e){var r=Ce.resolve()
return n.forEach(function(e){r=r.then(function(){return Ce.resolve(e(t))})}),r}n.map(function(e){return e(t)})}var je=a(function e(t,n,r){o(this,e),this.name=t,this.suiteName=n.name,this.fullName=n.fullName.concat(t),this.runtime=0,this.assertions=[],this.skipped=!!r.skip,this.todo=!!r.todo,this.valid=r.valid,this._startTime=0,this._endTime=0,n.pushTest(this)},[{key:"start",value:function(e){return e&&(this._startTime=S.now()),{name:this.name,suiteName:this.suiteName,fullName:this.fullName.slice()}}},{key:"end",value:function(e){return e&&(this._endTime=S.now()),_(this.start(),{runtime:this.getRuntime(),status:this.getStatus(),errors:this.getFailedAssertions(),assertions:this.getAssertions()})}},{key:"pushAssertion",value:function(e){this.assertions.push(e)}},{key:"getRuntime",value:function(){return Math.round(this._endTime-this._startTime)}},{key:"getStatus",value:function(){return this.skipped?"skipped":(this.getFailedAssertions().length>0?this.todo:!this.todo)?this.todo?"todo":"passed":"failed"}},{key:"getFailedAssertions",value:function(){return this.assertions.filter(function(e){return!e.passed})}},{key:"getAssertions",value:function(){return this.assertions.slice()}},{key:"slimAssertions",value:function(){this.assertions=this.assertions.map(function(e){return delete e.actual,delete e.expected,e})}}])
function Ae(e){if(this.expected=null,this.assertions=[],this.module=K.currentModule,this.steps=[],this.stepsCount=0,this.timeout=void 0,this.data=void 0,this.withData=!1,this.pauses=new k,this.nextPauseId=1,this.stackOffset=3,_(this,e),this.module.skip?(this.skip=!0,this.todo=!1):this.module.todo&&!this.skip&&(this.todo=!0),K.pq.finished)ne.warn("Unexpected test after runEnd. This is unstable and will fail in QUnit 3.0.")
else{if(!this.skip&&"function"!=typeof this.callback){var t=this.todo?"QUnit.todo":"QUnit.test"
throw new TypeError("You must provide a callback to ".concat(t,'("').concat(this.testName,'")'))}for(var n=0,r=this.module.tests;n<r.length;n++)this.module.tests[n].name===this.testName&&(this.testName+=" ")
this.testId=D(this.module.name,this.testName),++Ae.count,this.errorForStack=new Error,this.callback&&this.callback.validTest&&(this.errorForStack.stack=void 0),this.testReport=new je(this.testName,this.module.suiteReport,{todo:this.todo,skip:this.skip,valid:this.valid()}),this.module.tests.push({name:this.testName,testId:this.testId,skip:!!this.skip}),this.skip?(this.callback=function(){},this.async=!1,this.expected=0):this.assert=new ve(this)}}function Ne(){if(!K.current)throw new Error("pushFailure() assertion outside test context, in "+ge(2))
var e=K.current
return e.pushFailure.apply(e,arguments)}function qe(){if(K.pollution=[],K.noglobals)for(var e in p)if(C.call(p,e)){if(/^qunit-test-output/.test(e))continue
K.pollution.push(e)}}Ae.count=0,Ae.prototype={get stack(){return he(this.errorForStack,this.stackOffset)},before:function(){var e=this,t=this.module,n=function(e){for(var t=e,n=[];t&&0===t.testsRun;)n.push(t),t=t.parentModule
return n.reverse()}(t),r=Ce.resolve()
return n.forEach(function(e){r=r.then(function(){return e.stats={all:0,bad:0,started:S.now()},we("suiteStart",e.suiteReport.start(!0)),Se("moduleStart",{name:e.name,tests:e.tests})})}),r.then(function(){return K.current=e,e.testEnvironment=_({},t.testEnvironment),e.started=S.now(),we("testStart",e.testReport.start(!0)),Se("testStart",{name:e.testName,module:t.name,testId:e.testId,previousFailure:e.previousFailure}).then(function(){K.pollution||qe()})})},run:function(){if(K.current=this,K.notrycatch)e(this)
else try{e(this)}catch(e){this.pushFailure("Died on test #"+(this.assertions.length+1)+": "+(e.message||e)+"\n"+this.stack,he(e,0)),qe(),K.blocking&&He(this)}function e(e){var t
t=e.withData?e.callback.call(e.testEnvironment,e.assert,e.data):e.callback.call(e.testEnvironment,e.assert),e.resolvePromise(t),0===e.timeout&&e.pauses.size>0&&Ne("Test did not finish synchronously even though assert.timeout( 0 ) was used.",ge(2))}},after:function(){!function(){var e=K.pollution
qe()
var t=j(K.pollution,e)
t.length>0&&Ne("Introduced global variable(s): "+t.join(", "))
var n=j(e,K.pollution)
n.length>0&&Ne("Deleted global variable(s): "+n.join(", "))}()},queueGlobalHook:function(e,t){var n=this
return function(){var r
if(K.current=n,K.notrycatch)r=e.call(n.testEnvironment,n.assert)
else try{r=e.call(n.testEnvironment,n.assert)}catch(e){return void n.pushFailure("Global "+t+" failed on "+n.testName+": "+R(e),he(e,0))}n.resolvePromise(r,t)}},queueHook:function(e,t,n){var r=this,i=function(){var n=e.call(r.testEnvironment,r.assert)
r.resolvePromise(n,t)}
return function(){if("before"===t){if(0!==n.testsRun)return
r.preserveEnvironment=!0}if("after"!==t||function(e){return e.testsRun===Fe(e).filter(function(e){return!e.skip}).length-1}(n)||!(K.queue.length>0||K.pq.taskCount()>2))if(K.current=r,K.notrycatch)i()
else try{i()}catch(e){r.pushFailure(t+" failed on "+r.testName+": "+(e.message||e),he(e,0))}}},hooks:function(e){var t=[]
return this.skip||(function(n){if(("beforeEach"===e||"afterEach"===e)&&K.globalHooks[e])for(var r=0;r<K.globalHooks[e].length;r++)t.push(n.queueGlobalHook(K.globalHooks[e][r],e))}(this),function n(r,i){if(i.parentModule&&n(r,i.parentModule),i.hooks[e].length)for(var o=0;o<i.hooks[e].length;o++)t.push(r.queueHook(i.hooks[e][o],e,i))}(this,this.module)),t},finish:function(){if(K.current=this,g&&(v(this.timeout),K.timeoutHandler=null),this.callback=void 0,this.steps.length){var e=this.steps.join(", ")
this.pushFailure("Expected assert.verifySteps() to be called before end of test "+"after using assert.step(). Unverified steps: ".concat(e),this.stack)}K._deprecated_countEachStep_shown||K.countStepsAsOne||null===this.expected||!this.stepsCount||(K._deprecated_countEachStep_shown=!0,K.requireExpects?ne.warn("Counting each assert.step() for assert.expect() is changing in QUnit 3.0. You can enable QUnit.config.countStepsAsOne to prepare for the upgrade. https://qunitjs.com/api/assert/expect/"):ne.warn("Counting each assert.step() for assert.expect() is changing in QUnit 3.0. Omit assert.expect() from tests that use assert.step(), or enable QUnit.config.countStepsAsOne to prepare for the upgrade. https://qunitjs.com/api/assert/expect/"))
var t=K.countStepsAsOne?this.assertions.length-this.stepsCount:this.assertions.length
K.requireExpects&&null===this.expected?this.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):null!==this.expected&&this.expected!==t&&this.stepsCount&&this.expected===this.assertions.length-this.stepsCount&&!K.countStepsAsOne?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run\nIt looks like you might prefer to enable QUnit.config.countStepsAsOne, which will become the default in QUnit 3.0. https://qunitjs.com/api/assert/expect/",this.stack):null!==this.expected&&this.expected!==t&&this.stepsCount&&this.expected===this.assertions.length&&K.countStepsAsOne?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run\nRemember that with QUnit.config.countStepsAsOne and in QUnit 3.0, steps no longer count as separate assertions. https://qunitjs.com/api/assert/expect/",this.stack):null!==this.expected&&this.expected!==t?this.pushFailure("Expected "+this.expected+" assertions, but "+t+" were run",this.stack):null!==this.expected||t||this.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack)
var n=this.module,r=n.name,i=this.testName,o=!!this.skip,s=!!this.todo,a=0,u=K.storage
this.runtime=Math.round(S.now()-this.started),K.stats.all+=this.assertions.length,K.stats.testCount+=1,n.stats.all+=this.assertions.length
for(var c=0;c<this.assertions.length;c++)this.assertions[c].result||(a++,K.stats.bad++,n.stats.bad++)
o?Be(n):function(e){for(e.testsRun++;e=e.parentModule;)e.testsRun++}(n),u&&(a?u.setItem("qunit-test-"+r+"-"+i,a):u.removeItem("qunit-test-"+r+"-"+i)),we("testEnd",this.testReport.end(!0)),this.testReport.slimAssertions()
var f=this
return Se("testDone",{name:i,module:r,skipped:o,todo:s,failed:a,passed:this.assertions.length-a,total:this.assertions.length,runtime:o?0:this.runtime,assertions:this.assertions,testId:this.testId,get source(){return f.stack}}).then(function(){if($e(n)){for(var e=[n],t=n.parentModule;t&&$e(t);)e.push(t),t=t.parentModule
var r=Ce.resolve()
return e.forEach(function(e){r=r.then(function(){return function(e){for(var t=[e];t.length;){var n=t.shift()
n.hooks={},t.push.apply(t,l(n.childModules))}return we("suiteEnd",e.suiteReport.end(!0)),Se("moduleDone",{name:e.name,tests:e.tests,failed:e.stats.bad,passed:e.stats.all-e.stats.bad,total:e.stats.all,runtime:Math.round(S.now()-e.stats.started)})}(e)})}),r}}).then(function(){K.current=void 0})},preserveTestEnvironment:function(){this.preserveEnvironment&&(this.module.testEnvironment=this.testEnvironment,this.testEnvironment=_({},this.module.testEnvironment))},queue:function(){var e=this
if(this.valid()){var t=K.storage&&+K.storage.getItem("qunit-test-"+this.module.name+"-"+this.testName),n=K.reorder&&!!t
this.previousFailure=!!t,K.pq.add(function(){return[function(){return e.before()}].concat(l(e.hooks("before")),[function(){e.preserveTestEnvironment()}],l(e.hooks("beforeEach")),[function(){e.run()}],l(e.hooks("afterEach").reverse()),l(e.hooks("after").reverse()),[function(){e.after()},function(){return e.finish()}])},n)}else Be(this.module)},pushResult:function(e){if(this!==K.current){var t=e&&e.message||"",n=this&&this.testName||""
throw new Error("Assertion occurred after test finished.\n> Test: "+n+"\n> Message: "+t+"\n")}var r={module:this.module.name,name:this.testName,result:e.result,message:e.message,actual:e.actual,testId:this.testId,negative:e.negative||!1,runtime:Math.round(S.now()-this.started),todo:!!this.todo}
if(C.call(e,"expected")&&(r.expected=e.expected),!e.result){var i=e.source||ge()
i&&(r.source=i)}this.logAssertion(r),this.assertions.push({result:!!e.result,message:e.message})},pushFailure:function(e,t){if(!(this instanceof Ae))throw new Error("pushFailure() assertion outside test context, was "+ge(2))
this.pushResult({result:!1,message:e||"error",source:t})},logAssertion:function(e){Se("log",e)
var t={passed:e.result,actual:e.actual,expected:e.expected,message:e.message,stack:e.source,todo:e.todo}
this.testReport.pushAssertion(t),we("assertion",t)},internalResetTimeout:function(e){v(K.timeout),K.timeout=g(K.timeoutHandler(e),e)},internalStop:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1
K.blocking=!0
var t,n=this,r=this.nextPauseId++,i={cancelled:!1,remaining:e}
return n.pauses.set(r,i),g&&("number"==typeof n.timeout?t=n.timeout:"number"==typeof K.testTimeout&&(t=K.testTimeout),"number"==typeof t&&t>0?(K.timeoutHandler=function(e){return function(){K.timeout=null,i.cancelled=!0,n.pauses.delete(r),n.pushFailure("Test took longer than ".concat(e,"ms; test timed out."),ge(2)),He(n)}},v(K.timeout),K.timeout=g(K.timeoutHandler(t),t)):(v(K.timeout),K.timeout=g(function(){K.timeout=null,K._deprecated_timeout_shown||(K._deprecated_timeout_shown=!0,ne.warn('Test "'.concat(n.testName,'" took longer than 3000ms, but no timeout was set. Set QUnit.config.testTimeout or call assert.timeout() to avoid a timeout in QUnit 3. https://qunitjs.com/api/config/testTimeout/')))},3e3))),function(){if(!i.cancelled){if(void 0===K.current)throw new Error("Unexpected release of async pause after tests finished.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(K.current!==n)throw new Error("Unexpected release of async pause during a different test.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
if(i.remaining<=0)throw new Error("Tried to release async pause that was already released.\n"+"> Test: ".concat(n.testName," [async #").concat(r,"]"))
i.remaining--,0===i.remaining&&n.pauses.delete(r),Pe(n)}}},resolvePromise:function(e,t){if(null!=e){var n=this,r=e.then
if("function"==typeof r){var i=n.internalStop(),o=function(){i()}
K.notrycatch?r.call(e,o):r.call(e,o,function(e){var r="Promise rejected "+(t?t.replace(/Each$/,""):"during")+' "'+n.testName+'": '+(e&&e.message||e)
n.pushFailure(r,he(e,0)),qe(),He(n)})}}},valid:function(){if(this.callback&&this.callback.validTest)return!0
if(!function e(t,n){return!n||!n.length||A(t.moduleId,n)||t.parentModule&&e(t.parentModule,n)}(this.module,K.moduleId))return!1
if(K.testId&&K.testId.length&&!A(this.testId,K.testId))return!1
var e=K.module&&K.module.toLowerCase()
if(!function e(t,n){return!n||(t.name?t.name.toLowerCase():null)===n||!!t.parentModule&&e(t.parentModule,n)}(this.module,e))return!1
var t=K.filter
if(t){var n=/^(!?)\/([\w\W]*)\/(i?$)/.exec(t),r=this.module.name+": "+this.testName
if(n){if(!this.regexFilter(!!n[1],n[2],n[3],r))return!1}else if(!this.stringFilter(t,r))return!1}if("function"==typeof K.testFilter){var i={testId:this.testId,testName:this.testName,module:this.module.name,skip:!!this.skip}
try{return!!K.testFilter(i)}catch(e){return ne.warn("Error in QUnit.config.testFilter callback: ",e),!1}}return!0},regexFilter:function(e,t,n,r){return new RegExp(t,n).test(r)!==e},stringFilter:function(e,t){e=e.toLowerCase(),t=t.toLowerCase()
var n="!"!==e.charAt(0)
return n||(e=e.slice(1)),-1!==t.indexOf(e)?n:!n}}
var _e=!1
function Oe(e){_e||K.currentModule.ignored||new Ae(e).queue()}function Me(e){K.currentModule.ignored||(_e||(K.queue.length=0,le(K.currentModule),_e=!0),new Ae(e).queue())}function De(e,t){Oe({testName:e,callback:t})}function Re(e,t){return"".concat(e," [").concat(t,"]")}var Ie=/[\x00-\x1F\x7F\xA0]/
function Le(e,t){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n],i=f(r),o=n
if("string"===i&&r.length<=40&&!Ie.test(r)&&!/\s*\d+: /.test(r))o=r
else if("string"===i||"number"===i||"boolean"===i||"undefined"===i||null===r){var s=String(r)
Ie.test(s)||(o=n+": "+(s.length<=30?s:s.slice(0,29)+"…"))}t(r,o)}else{if("object"!==f(e)||null===e)throw new Error("test.each() expects an array or object as input, but\nfound ".concat(f(e)," instead."))
for(var a in e)t(e[a],a)}}function He(e){e.pauses.forEach(function(e){e.cancelled=!0}),e.pauses.clear(),Pe(e)}function Pe(e){e.pauses.size>0||(g?(v(K.timeout),K.timeout=g(function(){e.pauses.size>0||(v(K.timeout),K.timeout=null,K.blocking=!1,K.pq.advance())})):(K.blocking=!1,K.pq.advance()))}function Fe(e){for(var t=[].concat(e.tests),n=l(e.childModules);n.length;){var r=n.shift()
t.push.apply(t,r.tests),n.push.apply(n,l(r.childModules))}return t}function $e(e){return e.testsRun+e.testsIgnored===Fe(e).length}function Be(e){for(e.testsIgnored++;e=e.parentModule;)e.testsIgnored++}_(De,{todo:function(e,t){Oe({testName:e,callback:t,todo:!0})},skip:function(e){Oe({testName:e,skip:!0})},if:function(e,t,n){Oe({testName:e,callback:n,skip:!t})},only:function(e,t){Me({testName:e,callback:t})},each:function(e,t,n){Le(t,function(t,r){Oe({testName:Re(e,r),callback:n,withData:!0,stackOffset:5,data:t})})}}),De.todo.each=function(e,t,n){Le(t,function(t,r){Oe({testName:Re(e,r),callback:n,todo:!0,withData:!0,stackOffset:5,data:t})})},De.skip.each=function(e,t){Le(t,function(t,n){Oe({testName:Re(e,n),stackOffset:5,skip:!0})})},De.if.each=function(e,t,n,r){Le(n,function(n,i){Oe({testName:Re(e,i),callback:r,withData:!0,stackOffset:5,skip:!t,data:t?n:void 0})})},De.only.each=function(e,t,n){Le(t,function(t,r){Me({testName:Re(e,r),callback:n,withData:!0,stackOffset:5,data:t})})}
var Ue,Qe,ze,We,Ve=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.log=n.log||Function.prototype.bind.call(h.log,h),t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onError",value:function(e){this.log("error",e)}},{key:"onRunStart",value:function(e){this.log("runStart",e)}},{key:"onTestStart",value:function(e){this.log("testStart",e)}},{key:"onTestEnd",value:function(e){this.log("testEnd",e)}},{key:"onRunEnd",value:function(e){this.log("runEnd",e)}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),Ke=y&&void 0!==y.performance&&"function"==typeof y.performance.mark&&"function"==typeof y.performance.measure?y.performance:void 0,Xe={measure:Ke?function(e,t,n){try{Ke.measure(e,t,n)}catch(e){ne.warn("performance.measure could not be executed because of ",e.message)}}:function(){},mark:Ke?Ke.mark.bind(Ke):function(){}},Ge=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.perf=n.perf||Xe,t.on("runStart",this.onRunStart.bind(this)),t.on("runEnd",this.onRunEnd.bind(this)),t.on("suiteStart",this.onSuiteStart.bind(this)),t.on("suiteEnd",this.onSuiteEnd.bind(this)),t.on("testStart",this.onTestStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(){this.perf.mark("qunit_suite_0_start")}},{key:"onSuiteStart",value:function(e){var t=e.fullName.length
this.perf.mark("qunit_suite_".concat(t,"_start"))}},{key:"onSuiteEnd",value:function(e){var t=e.fullName.length,n=e.fullName.join(" – ")
this.perf.mark("qunit_suite_".concat(t,"_end")),this.perf.measure("QUnit Test Suite: ".concat(n),"qunit_suite_".concat(t,"_start"),"qunit_suite_".concat(t,"_end"))}},{key:"onTestStart",value:function(){this.perf.mark("qunit_test_start")}},{key:"onTestEnd",value:function(e){this.perf.mark("qunit_test_end")
var t=e.fullName.join(" – ")
this.perf.measure("QUnit Test: ".concat(t),"qunit_test_start","qunit_test_end")}},{key:"onRunEnd",value:function(){this.perf.mark("qunit_suite_0_end"),this.perf.measure("QUnit Test Run","qunit_suite_0_start","qunit_suite_0_end")}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),Ye=!0
if("undefined"!=typeof process){var Je=process.env||{}
Ue=Je.FORCE_COLOR,Qe=Je.NODE_DISABLE_COLORS,ze=Je.NO_COLOR,We=Je.TERM,Ye=process.stdout&&process.stdout.isTTY}var Ze={enabled:!Qe&&null==ze&&"dumb"!==We&&(null!=Ue&&"0"!==Ue||Ye),reset:tt(0,0),bold:tt(1,22),dim:tt(2,22),italic:tt(3,23),underline:tt(4,24),inverse:tt(7,27),hidden:tt(8,28),strikethrough:tt(9,29),black:tt(30,39),red:tt(31,39),green:tt(32,39),yellow:tt(33,39),blue:tt(34,39),magenta:tt(35,39),cyan:tt(36,39),white:tt(37,39),gray:tt(90,39),grey:tt(90,39),bgBlack:tt(40,49),bgRed:tt(41,49),bgGreen:tt(42,49),bgYellow:tt(43,49),bgBlue:tt(44,49),bgMagenta:tt(45,49),bgCyan:tt(46,49),bgWhite:tt(47,49)}
function et(e,t){for(var n,r=0,i="",o="";r<e.length;r++)i+=(n=e[r]).open,o+=n.close,~t.indexOf(n.close)&&(t=t.replace(n.rgx,n.close+n.open))
return i+t+o}function tt(e,t){var n={open:"[".concat(e,"m"),close:"[".concat(t,"m"),rgx:new RegExp("\\x1b\\[".concat(t,"m"),"g")}
return function(t){return void 0!==this&&void 0!==this.has?(~this.has.indexOf(e)||(this.has.push(e),this.keys.push(n)),void 0===t?this:Ze.enabled?et(this.keys,t+""):t+""):void 0===t?((r={has:[e],keys:[n]}).reset=Ze.reset.bind(r),r.bold=Ze.bold.bind(r),r.dim=Ze.dim.bind(r),r.italic=Ze.italic.bind(r),r.underline=Ze.underline.bind(r),r.inverse=Ze.inverse.bind(r),r.hidden=Ze.hidden.bind(r),r.strikethrough=Ze.strikethrough.bind(r),r.black=Ze.black.bind(r),r.red=Ze.red.bind(r),r.green=Ze.green.bind(r),r.yellow=Ze.yellow.bind(r),r.blue=Ze.blue.bind(r),r.magenta=Ze.magenta.bind(r),r.cyan=Ze.cyan.bind(r),r.white=Ze.white.bind(r),r.gray=Ze.gray.bind(r),r.grey=Ze.grey.bind(r),r.bgBlack=Ze.bgBlack.bind(r),r.bgRed=Ze.bgRed.bind(r),r.bgGreen=Ze.bgGreen.bind(r),r.bgYellow=Ze.bgYellow.bind(r),r.bgBlue=Ze.bgBlue.bind(r),r.bgMagenta=Ze.bgMagenta.bind(r),r.bgCyan=Ze.bgCyan.bind(r),r.bgWhite=Ze.bgWhite.bind(r),r):Ze.enabled?et([n],t+""):t+""
var r}}function nt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2
if(void 0===e&&(e=String(e)),"number"!=typeof e||isFinite(e)||(e=String(e)),"number"==typeof e)return JSON.stringify(e)
if("string"==typeof e){if(""===e||/['"\\/[{}\]\r\n|:#]/.test(e)||/[-?:,[\]{}#&*!|=>'"%@`]/.test(e[0])||/(^\s|\s$)/.test(e)||/^[\d._-]+$/.test(e)||/^(true|false|y|n|yes|no|on|off)$/i.test(e)){if(!/\n/.test(e))return JSON.stringify(e)
var n=new Array(2*t+1).join(" "),r=e.match(/\n+$/)
return 1===(r?r[0].length:0)?"|\n"+e.replace(/\n$/,"").split("\n").map(function(e){return n+e}).join("\n"):"|+\n"+e.split("\n").map(function(e){return n+e}).join("\n")}return e}var i=new Array(t+1).join(" ")
return JSON.stringify(rt(e),null,2).split("\n").map(function(e,t){return 0===t?e:i+e}).join("\n")}function rt(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
if(-1!==n.indexOf(e))return"[Circular]"
switch(Object.prototype.toString.call(e).replace(/^\[.+\s(.+?)]$/,"$1").toLowerCase()){case"array":n.push(e),t=e.map(function(e){return rt(e,n)}),n.pop()
break
case"object":n.push(e),t={},Object.keys(e).forEach(function(r){t[r]=rt(e[r],n)}),n.pop()
break
default:t=e}return t}var it=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
o(this,e),this.log=n.log||Function.prototype.bind.call(h.log,h),this.testCount=0,this.started=!1,this.ended=!1,this.bailed=!1,t.on("error",this.onError.bind(this)),t.on("runStart",this.onRunStart.bind(this)),t.on("testEnd",this.onTestEnd.bind(this)),t.on("runEnd",this.onRunEnd.bind(this))}return a(e,[{key:"onRunStart",value:function(e){this.started||(this.log("TAP version 13"),this.started=!0)}},{key:"onError",value:function(e){this.bailed||(this.bailed=!0,this.ended||(this.onRunStart(),this.testCount=this.testCount+1,this.log("not ok ".concat(this.testCount," ").concat(Ze.red("global failure"))),this.logError(e)),this.log("Bail out! "+R(e).split("\n")[0]),this.ended&&this.logError(e))}},{key:"onTestEnd",value:function(e){var t=this
this.testCount=this.testCount+1,"passed"===e.status?this.log("ok ".concat(this.testCount," ").concat(e.fullName.join(" > "))):"skipped"===e.status?this.log("ok ".concat(this.testCount," ").concat(Ze.yellow(e.fullName.join(" > "))," # SKIP")):"todo"===e.status?(this.log("not ok ".concat(this.testCount," ").concat(Ze.cyan(e.fullName.join(" > "))," # TODO")),e.errors.forEach(function(e){return t.logAssertion(e,"todo")})):(this.log("not ok ".concat(this.testCount," ").concat(Ze.red(e.fullName.join(" > ")))),e.errors.forEach(function(e){return t.logAssertion(e)}))}},{key:"onRunEnd",value:function(e){this.ended=!0,this.log("1..".concat(e.testCounts.total)),this.log("# pass ".concat(e.testCounts.passed)),this.log("# ".concat(Ze.yellow("skip ".concat(e.testCounts.skipped)))),this.log("# ".concat(Ze.cyan("todo ".concat(e.testCounts.todo)))),this.log("# ".concat(Ze.red("fail ".concat(e.testCounts.failed))))}},{key:"logAssertion",value:function(e,t){var n="  ---"
if(n+="\n  message: ".concat(nt(e.message||"failed")),n+="\n  severity: ".concat(nt(t||"failed")),(void 0!==e.expected||void 0!==e.actual)&&(n+="\n  actual  : ".concat(nt(e.actual)),n+="\n  expected: ".concat(nt(e.expected))),e.stack){var r=pe(e.stack,Ze.grey)
r.length&&(n+="\n  stack: ".concat(nt(r+"\n")))}n+="\n  ...",this.log(n)}},{key:"logError",value:function(e){var t="  ---"
if(t+="\n  message: ".concat(nt(R(e))),t+="\n  severity: ".concat(nt("failed")),e&&e.stack){var n=pe(e.stack,Ze.grey,e.toString())
n.length&&(t+="\n  stack: ".concat(nt(n+"\n")))}t+="\n  ...",this.log(t)}}],[{key:"init",value:function(t,n){return new e(t,n)}}])}(),ot={console:Ve,perf:Ge,tap:it}
function st(e){return function(t){K.globalHooks[e]||(K.globalHooks[e]=[]),K.globalHooks[e].push(t)}}var at={beforeEach:st("beforeEach"),afterEach:st("afterEach")},ut=a(function e(t){o(this,e),this.test=t,this.priorityCount=0,this.unitSampler=null,this.taskQueue=[],this.finished=!1},[{key:"advance",value:function(){this.advanceTaskQueue(),this.taskQueue.length||K.blocking||K.current||this.advanceTestQueue()}},{key:"advanceTaskQueue",value:function(){var e=S.now()
K.depth=(K.depth||0)+1,this.processTaskQueue(e),K.depth--}},{key:"processTaskQueue",value:function(e){var t=this
if(this.taskQueue.length&&!K.blocking){var n=S.now()-e
if(!g||K.updateRate<=0||n<K.updateRate){var r=this.taskQueue.shift()
Ce.resolve(r()).then(function(){t.taskQueue.length?t.processTaskQueue(e):t.advance()})}else g(function(){t.advance()})}}},{key:"advanceTestQueue",value:function(){if(K.blocking||K.queue.length||0!==K.depth){var e=K.queue.shift()
this.addToTaskQueue(e()),this.priorityCount>0&&this.priorityCount--,this.advance()}else this.done()}},{key:"addToTaskQueue",value:function(e){var t;(t=this.taskQueue).push.apply(t,l(e))}},{key:"taskCount",value:function(){return this.taskQueue.length}},{key:"add",value:function(e,t){if(t)K.queue.splice(this.priorityCount++,0,e)
else if(K.seed){this.unitSampler||(this.unitSampler=(r=K.seed,i=parseInt(D(r),16)||-1,function(){return i^=i<<13,i^=i>>>17,(i^=i<<5)<0&&(i+=4294967296),i/4294967296}))
var n=Math.floor(this.unitSampler()*(K.queue.length-this.priorityCount+1))
K.queue.splice(this.priorityCount+n,0,e)}else K.queue.push(e)
var r,i}},{key:"done",value:function(){var e
if(0===K.stats.testCount&&!0===K.failOnZeroTests)return e=K.filter&&K.filter.length?new Error('No tests matched the filter "'.concat(K.filter,'".')):K.module&&K.module.length?new Error('No tests matched the module "'.concat(K.module,'".')):K.moduleId&&K.moduleId.length?new Error('No tests matched the moduleId "'.concat(K.moduleId,'".')):K.testId&&K.testId.length?new Error('No tests matched the testId "'.concat(K.testId,'".')):new Error("No tests were run."),this.test("global failure",_(function(t){t.pushResult({result:!1,message:e.message,source:e.stack})},{validTest:!0})),void this.advance()
var t=K.storage,n=Math.round(S.now()-K.started),r=K.stats.all-K.stats.bad
this.finished=!0,we("runEnd",oe.end(!0)),Se("done",{passed:r,failed:K.stats.bad,total:K.stats.all,runtime:n}).then(function(){if(t&&0===K.stats.bad)for(var e=t.length-1;e>=0;e--){var n=t.key(e)
0===n.indexOf("qunit-test-")&&t.removeItem(n)}})}}])
function lt(e){K.current?K.current.assert.pushResult({result:!1,message:"global failure: ".concat(R(e)),source:e&&e.stack||ge(2)}):(oe.globalFailureCount++,K.stats.bad++,K.stats.all++,we("error",e))}function ct(){}var ft=-1,dt=Object.prototype.hasOwnProperty
ct.prototype.DiffMain=function(e,t,n){var r=Date.now()+1e3
if(null===e||null===t)throw new Error("Cannot diff null input.")
if(e===t)return e?[[0,e]]:[]
void 0===n&&(n=!0)
var i=this.diffCommonPrefix(e,t),o=e.substring(0,i)
e=e.substring(i),t=t.substring(i),i=this.diffCommonSuffix(e,t)
var s=e.substring(e.length-i)
e=e.substring(0,e.length-i),t=t.substring(0,t.length-i)
var a=this.diffCompute(e,t,n,r)
return o&&a.unshift([0,o]),s&&a.push([0,s]),this.diffCleanupMerge(a),a},ct.prototype.diffCleanupEfficiency=function(e){var t,n,r,i,o,s,a,u,l
for(t=!1,n=[],r=0,i=null,o=0,s=!1,a=!1,u=!1,l=!1;o<e.length;)0===e[o][0]?(e[o][1].length<4&&(u||l)?(n[r++]=o,s=u,a=l,i=e[o][1]):(r=0,i=null),u=l=!1):(e[o][0]===ft?l=!0:u=!0,i&&(s&&a&&u&&l||i.length<2&&s+a+u+l===3)&&(e.splice(n[r-1],0,[ft,i]),e[n[r-1]+1][0]=1,r--,i=null,s&&a?(u=l=!0,r=0):(o=--r>0?n[r-1]:-1,u=l=!1),t=!0)),o++
t&&this.diffCleanupMerge(e)},ct.prototype.diffPrettyHtml=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n][0],i=e[n][1]
switch(r){case 1:t[n]="<ins>"+I(i)+"</ins>"
break
case ft:t[n]="<del>"+I(i)+"</del>"
break
case 0:t[n]="<span>"+I(i)+"</span>"}}return t.join("")},ct.prototype.diffCommonPrefix=function(e,t){var n,r,i,o
if(!e||!t||e.charAt(0)!==t.charAt(0))return 0
for(i=0,n=r=Math.min(e.length,t.length),o=0;i<n;)e.substring(o,n)===t.substring(o,n)?o=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},ct.prototype.diffCommonSuffix=function(e,t){var n,r,i,o
if(!e||!t||e.charAt(e.length-1)!==t.charAt(t.length-1))return 0
for(i=0,n=r=Math.min(e.length,t.length),o=0;i<n;)e.substring(e.length-n,e.length-o)===t.substring(t.length-n,t.length-o)?o=i=n:r=n,n=Math.floor((r-i)/2+i)
return n},ct.prototype.diffCompute=function(e,t,n,r){var i,o,s,a,u,l,c,f,d,p,h,g
return e?t?(o=e.length>t.length?e:t,s=e.length>t.length?t:e,-1!==(a=o.indexOf(s))?(i=[[1,o.substring(0,a)],[0,s],[1,o.substring(a+s.length)]],e.length>t.length&&(i[0][0]=i[2][0]=ft),i):1===s.length?[[ft,e],[1,t]]:(u=this.diffHalfMatch(e,t))?(l=u[0],f=u[1],c=u[2],d=u[3],p=u[4],h=this.DiffMain(l,c,n,r),g=this.DiffMain(f,d,n,r),h.concat([[0,p]],g)):n&&e.length>100&&t.length>100?this.diffLineMode(e,t,r):this.diffBisect(e,t,r)):[[ft,e]]:[[1,t]]},ct.prototype.diffHalfMatch=function(e,t){var n,r,i,o,s,a,u,l,c,f
if(n=e.length>t.length?e:t,r=e.length>t.length?t:e,n.length<4||2*r.length<n.length)return null
function d(e,t,n){var r,o,s,a,u,l,c,f,d
for(r=e.substring(n,n+Math.floor(e.length/4)),o=-1,s="";-1!==(o=t.indexOf(r,o+1));)a=i.diffCommonPrefix(e.substring(n),t.substring(o)),u=i.diffCommonSuffix(e.substring(0,n),t.substring(0,o)),s.length<u+a&&(s=t.substring(o-u,o)+t.substring(o,o+a),l=e.substring(0,n-u),c=e.substring(n+a),f=t.substring(0,o-u),d=t.substring(o+a))
return 2*s.length>=e.length?[l,c,f,d,s]:null}return i=this,l=d(n,r,Math.ceil(n.length/4)),c=d(n,r,Math.ceil(n.length/2)),l||c?(f=c?l&&l[4].length>c[4].length?l:c:l,e.length>t.length?(o=f[0],u=f[1],a=f[2],s=f[3]):(a=f[0],s=f[1],o=f[2],u=f[3]),[o,u,a,s,f[4]]):null},ct.prototype.diffLineMode=function(e,t,n){var r,i,o,s,a,u,l,c,f
for(e=(r=this.diffLinesToChars(e,t)).chars1,t=r.chars2,o=r.lineArray,i=this.DiffMain(e,t,!1,n),this.diffCharsToLines(i,o),this.diffCleanupSemantic(i),i.push([0,""]),s=0,u=0,a=0,c="",l="";s<i.length;){switch(i[s][0]){case 1:a++,l+=i[s][1]
break
case ft:u++,c+=i[s][1]
break
case 0:if(u>=1&&a>=1){for(i.splice(s-u-a,u+a),s=s-u-a,f=(r=this.DiffMain(c,l,!1,n)).length-1;f>=0;f--)i.splice(s,0,r[f])
s+=r.length}a=0,u=0,c="",l=""}s++}return i.pop(),i},ct.prototype.diffBisect=function(e,t,n){var r,i,o,s,a,u,l,c,f,d,p,h,g,v,m,y,b,x,w,k,E,T,C
for(r=e.length,i=t.length,s=o=Math.ceil((r+i)/2),a=2*o,u=new Array(a),l=new Array(a),c=0;c<a;c++)u[c]=-1,l[c]=-1
for(u[s+1]=0,l[s+1]=0,d=(f=r-i)%2!=0,p=0,h=0,g=0,v=0,E=0;E<o&&!(Date.now()>n);E++){for(T=-E+p;T<=E-h;T+=2){for(y=s+T,w=(b=T===-E||T!==E&&u[y-1]<u[y+1]?u[y+1]:u[y-1]+1)-T;b<r&&w<i&&e.charAt(b)===t.charAt(w);)b++,w++
if(u[y]=b,b>r)h+=2
else if(w>i)p+=2
else if(d&&(m=s+f-T)>=0&&m<a&&-1!==l[m]&&b>=(x=r-l[m]))return this.diffBisectSplit(e,t,b,w,n)}for(C=-E+g;C<=E-v;C+=2){for(m=s+C,k=(x=C===-E||C!==E&&l[m-1]<l[m+1]?l[m+1]:l[m-1]+1)-C;x<r&&k<i&&e.charAt(r-x-1)===t.charAt(i-k-1);)x++,k++
if(l[m]=x,x>r)v+=2
else if(k>i)g+=2
else if(!d&&(y=s+f-C)>=0&&y<a&&-1!==u[y]&&(w=s+(b=u[y])-y,b>=(x=r-x)))return this.diffBisectSplit(e,t,b,w,n)}}return[[ft,e],[1,t]]},ct.prototype.diffBisectSplit=function(e,t,n,r,i){var o,s,a,u,l,c
return o=e.substring(0,n),a=t.substring(0,r),s=e.substring(n),u=t.substring(r),l=this.DiffMain(o,a,!1,i),c=this.DiffMain(s,u,!1,i),l.concat(c)},ct.prototype.diffCleanupSemantic=function(e){for(var t,n,r,i,o=!1,s=[],a=0,u=null,l=0,c=0,f=0,d=0,p=0;l<e.length;)0===e[l][0]?(s[a++]=l,c=d,f=p,d=0,p=0,u=e[l][1]):(1===e[l][0]?d+=e[l][1].length:p+=e[l][1].length,u&&u.length<=Math.max(c,f)&&u.length<=Math.max(d,p)&&(e.splice(s[a-1],0,[ft,u]),e[s[a-1]+1][0]=1,a--,l=--a>0?s[a-1]:-1,c=0,f=0,d=0,p=0,u=null,o=!0)),l++
for(o&&this.diffCleanupMerge(e),l=1;l<e.length;)e[l-1][0]===ft&&1===e[l][0]&&(t=e[l-1][1],n=e[l][1],(r=this.diffCommonOverlap(t,n))>=(i=this.diffCommonOverlap(n,t))?(r>=t.length/2||r>=n.length/2)&&(e.splice(l,0,[0,n.substring(0,r)]),e[l-1][1]=t.substring(0,t.length-r),e[l+1][1]=n.substring(r),l++):(i>=t.length/2||i>=n.length/2)&&(e.splice(l,0,[0,t.substring(0,i)]),e[l-1][0]=1,e[l-1][1]=n.substring(0,n.length-i),e[l+1][0]=ft,e[l+1][1]=t.substring(i),l++),l++),l++},ct.prototype.diffCommonOverlap=function(e,t){var n=e.length,r=t.length
if(0===n||0===r)return 0
n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n))
var i=Math.min(n,r)
if(e===t)return i
for(var o=0,s=1;;){var a=e.substring(i-s),u=t.indexOf(a)
if(-1===u)return o
s+=u,0!==u&&e.substring(i-s)!==t.substring(0,s)||(o=s,s++)}},ct.prototype.diffLinesToChars=function(e,t){var n=[],r={}
function i(e){for(var t="",i=0,o=-1,s=n.length;o<e.length-1;){-1===(o=e.indexOf("\n",i))&&(o=e.length-1)
var a=e.substring(i,o+1)
i=o+1,dt.call(r,a)?t+=String.fromCharCode(r[a]):(t+=String.fromCharCode(s),r[a]=s,n[s++]=a)}return t}return n[0]="",{chars1:i(e),chars2:i(t),lineArray:n}},ct.prototype.diffCharsToLines=function(e,t){for(var n=0;n<e.length;n++){for(var r=e[n][1],i=[],o=0;o<r.length;o++)i[o]=t[r.charCodeAt(o)]
e[n][1]=i.join("")}},ct.prototype.diffCleanupMerge=function(e){e.push([0,""])
for(var t=0,n=0,r=0,i="",o="";t<e.length;)switch(e[t][0]){case 1:r++,o+=e[t][1],t++
break
case ft:n++,i+=e[t][1],t++
break
case 0:if(n+r>1){if(0!==n&&0!==r){var s=this.diffCommonPrefix(o,i)
0!==s&&(t-n-r>0&&0===e[t-n-r-1][0]?e[t-n-r-1][1]+=o.substring(0,s):(e.splice(0,0,[0,o.substring(0,s)]),t++),o=o.substring(s),i=i.substring(s)),0!==(s=this.diffCommonSuffix(o,i))&&(e[t][1]=o.substring(o.length-s)+e[t][1],o=o.substring(0,o.length-s),i=i.substring(0,i.length-s))}0===n?e.splice(t-r,n+r,[1,o]):0===r?e.splice(t-n,n+r,[ft,i]):e.splice(t-n-r,n+r,[ft,i],[1,o]),t=t-n-r+(n?1:0)+(r?1:0)+1}else 0!==t&&0===e[t-1][0]?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++
r=0,n=0,i="",o=""}""===e[e.length-1][1]&&e.pop()
var a=!1
for(t=1;t<e.length-1;){if(0===e[t-1][0]&&0===e[t+1][0]){var u=e[t][1]
u.substring(u.length-e[t-1][1].length)===e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),a=!0):u.substring(0,e[t+1][1].length)===e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),a=!0)}t++}a&&this.diffCleanupMerge(e)}
var pt={}
K.currentModule.suiteReport=oe,K.pq=new ut(De)
var ht=!1,gt=!1
function vt(){gt=!0,g?g(function(){yt()}):yt()}function mt(){K.blocking=!1,K.pq.advance()}function yt(){if(K.started)mt()
else{K.reporters.console&&ot.console.init(pt),K.reporters.tap&&ot.tap.init(pt),K.started=S.now(),""===K.modules[0].name&&0===K.modules[0].tests.length&&K.modules.shift()
for(var e=[],t=0;t<K.modules.length;t++)""!==K.modules[t].name&&e.push({name:K.modules[t].name,moduleId:K.modules[t].moduleId,tests:K.modules[t].tests})
we("runStart",oe.start(!0)),Se("begin",{totalTests:Ae.count,modules:e}).then(mt)}}pt.isLocal=y&&y.location&&"file:"===y.location.protocol,pt.version="2.26.0",_(pt,{config:K,diff:function(e,t){var n,r
return r=(n=new ct).DiffMain(e,t),n.diffCleanupEfficiency(r),n.diffPrettyHtml(r)},dump:te,equiv:V,reporters:ot,hooks:at,is:M,objectType:O,on:function(e,t){if("string"!=typeof e)throw new TypeError("eventName must be a string when registering a listener")
if(!A(e,be)){var n=be.join(", ")
throw new Error('"'.concat(e,'" is not a valid event; must be one of: ').concat(n,"."))}if("function"!=typeof t)throw new TypeError("callback must be a function when registering a listener")
var r=K._event_listeners[e]||(K._event_listeners[e]=[])
A(t,r)||(r.push(t),void 0!==K._event_memory[e]&&t(K._event_memory[e]))},onError:function(e){if(ne.warn("QUnit.onError is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),K.current&&K.current.ignoreGlobalErrors)return!0
var t=new Error(e.message)
return t.stack=e.stacktrace||e.fileName+":"+e.lineNumber,lt(t),!1},onUncaughtException:lt,pushFailure:Ne,assert:ve.prototype,module:fe,test:De,todo:De.todo,skip:De.skip,only:De.only,start:function(e){if(K.current)throw new Error("QUnit.start cannot be called inside a test context.")
var t=ht
if(ht=!0,gt)throw new Error("Called start() while test already started running")
if(t||e>1)throw new Error("Called start() outside of a test context too many times")
if(K.autostart)throw new Error("Called start() outside of a test context when QUnit.config.autostart was true")
if(!K.pageLoaded)return K.autostart=!0,void(b||pt.autostart())
vt()},onUnhandledRejection:function(e){ne.warn("QUnit.onUnhandledRejection is deprecated and will be removed in QUnit 3.0. Please use QUnit.onUncaughtException instead."),lt(e)},extend:function(){ne.warn("QUnit.extend is deprecated and will be removed in QUnit 3.0. Please use Object.assign instead.")
for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return _.apply(this,t)},load:function(){ne.warn("QUnit.load is deprecated and will be removed in QUnit 3.0. https://qunitjs.com/api/QUnit/load/"),pt.autostart()},autostart:function(){K.pageLoaded=!0,_(K,{started:0,updateRate:1e3,autostart:!0,filter:""},!0),gt||(K.blocking=!1,K.autostart&&vt())},stack:function(e){return ge(e=(e||0)+2)}}),function(e){var t=["begin","done","log","testStart","testDone","moduleStart","moduleDone"]
function n(e){return function(t){if("function"!=typeof t)throw new Error("Callback parameter must be a function")
K.callbacks[e].push(t)}}for(var r=0;r<t.length;r++){var i=t[r]
void 0===K.callbacks[i]&&(K.callbacks[i]=[]),e[i]=n(i)}}(pt),function(i){if(y&&b){if(y.QUnit&&y.QUnit.version)throw new Error("QUnit has already been defined.")
y.QUnit=i}e&&e.exports&&(e.exports=i,e.exports.QUnit=i),t&&(t.QUnit=i),void 0===(r=function(){return i}.call(t,n,t,e))||(e.exports=r),i.config.autostart=!1}(pt),function(){if(y&&b){var e=pt.config,t=Object.prototype.hasOwnProperty
pt.begin(function(){if(!t.call(e,"fixture")){var n=b.getElementById("qunit-fixture")
n&&(e.fixture=n.cloneNode(!0))}}),pt.testStart(function(){if(null!=e.fixture){var t=b.getElementById("qunit-fixture")
if("string"===f(e.fixture)){var n=b.createElement("div")
n.setAttribute("id","qunit-fixture"),n.innerHTML=e.fixture,t.parentNode.replaceChild(n,t)}else{var r=e.fixture.cloneNode(!0)
t.parentNode.replaceChild(r,t)}}})}}(),function(){var e=void 0!==y&&y.location
if(e){var t=function(){for(var t=Object.create(null),r=e.search.slice(1).split("&"),i=r.length,o=0;o<i;o++)if(r[o]){var s=r[o].split("="),a=n(s[0]),u=1===s.length||n(s.slice(1).join("="))
t[a]=a in t?[].concat(t[a],u):u}return t}()
pt.urlParams=t,pt.config.filter=t.filter,/^[0-9]+$/.test(t.maxDepth)&&(pt.config.maxDepth=pt.dump.maxDepth=+t.maxDepth),pt.config.module=t.module,pt.config.moduleId=[].concat(t.moduleId||[]),pt.config.testId=[].concat(t.testId||[]),"true"===t.seed||!0===t.seed?pt.config.seed=(Math.random().toString(36)+"0000000000").slice(2,12):t.seed&&(pt.config.seed=t.seed),pt.config.urlConfig.push({id:"hidepassed",label:"Hide passed tests",tooltip:"Only show tests and assertions that fail. Stored as query-strings."},{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the global object (`window` in Browsers). Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}),pt.begin(function(){for(var e=pt.config.urlConfig,n=0;n<e.length;n++){var r=pt.config.urlConfig[n]
"string"!=typeof r&&(r=r.id),void 0===pt.config[r]&&(pt.config[r]=t[r])}})}function n(e){return decodeURIComponent(e.replace(/\+/g,"%20"))}}()
var bt={exports:{}}
!function(e){var t,n
t=ke,n=function(){var e=void 0!==Ee&&"undefined"==typeof window,t="function"==typeof Map?Map:function(){var e=Object.create(null)
this.get=function(t){return e[t]},this.set=function(t,n){return e[t]=n,this},this.clear=function(){e=Object.create(null)}},n=new t,r=new t,i=[]
i.total=0
var o=[],s=[]
function a(){n.clear(),r.clear(),o=[],s=[]}function u(e){for(var t=-9007199254740991,n=e.length-1;n>=0;--n){var r=e[n]
if(null!==r){var i=r.score
i>t&&(t=i)}}return-9007199254740991===t?null:t}function l(e,t){var n=e[t]
if(void 0!==n)return n
var r=t
Array.isArray(t)||(r=t.split("."))
for(var i=r.length,o=-1;e&&++o<i;)e=e[r[o]]
return e}function c(e){return"object"===f(e)}var d=function(){var e=[],t=0,n={}
function r(){for(var n=0,r=e[n],i=1;i<t;){var o=i+1
n=i,o<t&&e[o].score<e[i].score&&(n=o),e[n-1>>1]=e[n],i=1+(n<<1)}for(var s=n-1>>1;n>0&&r.score<e[s].score;s=(n=s)-1>>1)e[n]=e[s]
e[n]=r}return n.add=function(n){var r=t
e[t++]=n
for(var i=r-1>>1;r>0&&n.score<e[i].score;i=(r=i)-1>>1)e[r]=e[i]
e[r]=n},n.poll=function(){if(0!==t){var n=e[0]
return e[0]=e[--t],r(),n}},n.peek=function(n){if(0!==t)return e[0]},n.replaceTop=function(t){e[0]=t,r()},n},p=d()
return function t(f){var h={single:function(e,t,n){return"farzher"==e?{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6]}:e?(c(e)||(e=h.getPreparedSearch(e)),t?(c(t)||(t=h.getPrepared(t)),((n&&void 0!==n.allowTypo?n.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?h.algorithm:h.algorithmNoTypo)(e,t,e[0])):null):null},go:function(e,t,n){if("farzher"==e)return[{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:t?t[0]:null}]
if(!e)return i
var r=(e=h.prepareSearch(e))[0],o=n&&n.threshold||f&&f.threshold||-9007199254740991,s=n&&n.limit||f&&f.limit||9007199254740991,a=(n&&void 0!==n.allowTypo?n.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?h.algorithm:h.algorithmNoTypo,d=0,g=0,v=t.length
if(n&&n.keys)for(var m=n.scoreFn||u,y=n.keys,b=y.length,x=v-1;x>=0;--x){for(var w=t[x],k=new Array(b),E=b-1;E>=0;--E)(S=l(w,C=y[E]))?(c(S)||(S=h.getPrepared(S)),k[E]=a(e,S,r)):k[E]=null
k.obj=w
var T=m(k)
null!==T&&(T<o||(k.score=T,d<s?(p.add(k),++d):(++g,T>p.peek().score&&p.replaceTop(k))))}else if(n&&n.key){var C=n.key
for(x=v-1;x>=0;--x)(S=l(w=t[x],C))&&(c(S)||(S=h.getPrepared(S)),null!==(j=a(e,S,r))&&(j.score<o||(j={target:j.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:j.score,indexes:j.indexes,obj:w},d<s?(p.add(j),++d):(++g,j.score>p.peek().score&&p.replaceTop(j)))))}else for(x=v-1;x>=0;--x){var S,j;(S=t[x])&&(c(S)||(S=h.getPrepared(S)),null!==(j=a(e,S,r))&&(j.score<o||(d<s?(p.add(j),++d):(++g,j.score>p.peek().score&&p.replaceTop(j)))))}if(0===d)return i
var A=new Array(d)
for(x=d-1;x>=0;--x)A[x]=p.poll()
return A.total=d+g,A},goAsync:function(t,n,r){var o=!1,s=new Promise(function(s,a){if("farzher"==t)return s([{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:n?n[0]:null}])
if(!t)return s(i)
var p=(t=h.prepareSearch(t))[0],g=d(),v=n.length-1,m=r&&r.threshold||f&&f.threshold||-9007199254740991,y=r&&r.limit||f&&f.limit||9007199254740991,b=(r&&void 0!==r.allowTypo?r.allowTypo:!f||void 0===f.allowTypo||f.allowTypo)?h.algorithm:h.algorithmNoTypo,x=0,w=0
function k(){if(o)return a("canceled")
var f=Date.now()
if(r&&r.keys)for(var d=r.scoreFn||u,E=r.keys,T=E.length;v>=0;--v){if(v%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(k):setTimeout(k))
for(var C=n[v],S=new Array(T),j=T-1;j>=0;--j)(q=l(C,N=E[j]))?(c(q)||(q=h.getPrepared(q)),S[j]=b(t,q,p)):S[j]=null
S.obj=C
var A=d(S)
null!==A&&(A<m||(S.score=A,x<y?(g.add(S),++x):(++w,A>g.peek().score&&g.replaceTop(S))))}else if(r&&r.key)for(var N=r.key;v>=0;--v){if(v%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(k):setTimeout(k));(q=l(C=n[v],N))&&(c(q)||(q=h.getPrepared(q)),null!==(_=b(t,q,p))&&(_.score<m||(_={target:_.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:_.score,indexes:_.indexes,obj:C},x<y?(g.add(_),++x):(++w,_.score>g.peek().score&&g.replaceTop(_)))))}else for(;v>=0;--v){if(v%1e3==0&&Date.now()-f>=10)return void(e?setImmediate(k):setTimeout(k))
var q,_;(q=n[v])&&(c(q)||(q=h.getPrepared(q)),null!==(_=b(t,q,p))&&(_.score<m||(x<y?(g.add(_),++x):(++w,_.score>g.peek().score&&g.replaceTop(_)))))}if(0===x)return s(i)
for(var O=new Array(x),M=x-1;M>=0;--M)O[M]=g.poll()
O.total=x+w,s(O)}e?setImmediate(k):k()})
return s.cancel=function(){o=!0},s},highlight:function(e,t,n){if("function"==typeof t)return h.highlightCallback(e,t)
if(null===e)return null
void 0===t&&(t="<b>"),void 0===n&&(n="</b>")
for(var r="",i=0,o=!1,s=e.target,a=s.length,u=e.indexes,l=0;l<a;++l){var c=s[l]
if(u[i]===l){if(o||(o=!0,r+=t),++i===u.length){r+=c+n+s.substr(l+1)
break}}else o&&(o=!1,r+=n)
r+=c}return r},highlightCallback:function(e,t){if(null===e)return null
for(var n=e.target,r=n.length,i=e.indexes,o="",s=0,a=0,u=!1,l=(e=[],0);l<r;++l){var c=n[l]
if(i[a]===l){if(++a,u||(u=!0,e.push(o),o=""),a===i.length){o+=c,e.push(t(o,s++)),o="",e.push(n.substr(l+1))
break}}else u&&(u=!1,e.push(t(o,s++)),o="")
o+=c}return e},prepare:function(e){return e?{target:e,_targetLowerCodes:h.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){return e?{target:e,_targetLowerCodes:h.prepareLowerCodes(e),_nextBeginningIndexes:h.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}:{target:"",_targetLowerCodes:[0],_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSearch:function(e){return e||(e=""),h.prepareLowerCodes(e)},getPrepared:function(e){if(e.length>999)return h.prepare(e)
var t=n.get(e)
return void 0!==t||(t=h.prepare(e),n.set(e,t)),t},getPreparedSearch:function(e){if(e.length>999)return h.prepareSearch(e)
var t=r.get(e)
return void 0!==t||(t=h.prepareSearch(e),r.set(e,t)),t},algorithm:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,a=r.length,u=0,l=0,c=0,f=0;;){if(n===r[l]){if(o[f++]=l,++u===i)break
n=e[0===c?u:c===u?u+1:c===u-1?u-1:u]}if(++l>=a)for(;;){if(u<=1)return null
if(0===c){if(n===e[--u])continue
c=u}else{if(1===c)return null
if((n=e[1+(u=--c)])===e[u])continue}l=o[(f=u)-1]+1
break}}u=0
var d=0,p=!1,g=0,v=t._nextBeginningIndexes
null===v&&(v=t._nextBeginningIndexes=h.prepareNextBeginningIndexes(t.target))
var m=l=0===o[0]?0:v[o[0]-1]
if(l!==a)for(;;)if(l>=a){if(u<=0){if(++d>i-2)break
if(e[d]===e[d+1])continue
l=m
continue}--u,l=v[s[--g]]}else if(e[0===d?u:d===u?u+1:d===u-1?u-1:u]===r[l]){if(s[g++]=l,++u===i){p=!0
break}++l}else l=v[l]
if(p)var y=s,b=g
else y=o,b=f
for(var x=0,w=-1,k=0;k<i;++k)w!==(l=y[k])-1&&(x-=l),w=l
for(p?0!==d&&(x+=-20):(x*=1e3,0!==c&&(x+=-20)),x-=a-i,t.score=x,t.indexes=new Array(b),k=b-1;k>=0;--k)t.indexes[k]=y[k]
return t},algorithmNoTypo:function(e,t,n){for(var r=t._targetLowerCodes,i=e.length,a=r.length,u=0,l=0,c=0;;){if(n===r[l]){if(o[c++]=l,++u===i)break
n=e[u]}if(++l>=a)return null}u=0
var f=!1,d=0,p=t._nextBeginningIndexes
if(null===p&&(p=t._nextBeginningIndexes=h.prepareNextBeginningIndexes(t.target)),(l=0===o[0]?0:p[o[0]-1])!==a)for(;;)if(l>=a){if(u<=0)break;--u,l=p[s[--d]]}else if(e[u]===r[l]){if(s[d++]=l,++u===i){f=!0
break}++l}else l=p[l]
if(f)var g=s,v=d
else g=o,v=c
for(var m=0,y=-1,b=0;b<i;++b)y!==(l=g[b])-1&&(m-=l),y=l
for(f||(m*=1e3),m-=a-i,t.score=m,t.indexes=new Array(v),b=v-1;b>=0;--b)t.indexes[b]=g[b]
return t},prepareLowerCodes:function(e){for(var t=e.length,n=[],r=e.toLowerCase(),i=0;i<t;++i)n[i]=r.charCodeAt(i)
return n},prepareBeginningIndexes:function(e){for(var t=e.length,n=[],r=0,i=!1,o=!1,s=0;s<t;++s){var a=e.charCodeAt(s),u=a>=65&&a<=90,l=u||a>=97&&a<=122||a>=48&&a<=57,c=u&&!i||!o||!l
i=u,o=l,c&&(n[r++]=s)}return n},prepareNextBeginningIndexes:function(e){for(var t=e.length,n=h.prepareBeginningIndexes(e),r=[],i=n[0],o=0,s=0;s<t;++s)i>s?r[s]=i:(i=n[++o],r[s]=void 0===i?t:i)
return r},cleanup:a,new:t}
return h}()},e.exports?e.exports=n():t.fuzzysort=n()}(bt)
var xt=bt.exports,wt={failedTests:[],defined:0,completed:0}
!function(){if(y&&b){pt.reporters.perf.init(pt)
var e=pt.config,t=[],n=!1,r=Object.prototype.hasOwnProperty,i=j({filter:void 0,module:void 0,moduleId:void 0,testId:void 0}),o=null
pt.on("runStart",function(e){wt.defined=e.testCounts.total}),pt.begin(function(t){!function(t){var n,s,a,u,c,h,g,w,j=E("qunit")
j&&(j.setAttribute("role","main"),j.innerHTML="<h1 id='qunit-header'>"+I(b.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar' role='navigation'></div>"+(!(n=pt.config.testId)||n.length<=0?"":"<div id='qunit-filteredTest'>Rerunning selected tests: "+I(n.join(", "))+" <a id='qunit-clearFilter' href='"+I(i)+"'>Run all tests</a></div>")+"<h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>"),(s=E("qunit-header"))&&(s.innerHTML="<a href='"+I(i)+"'>"+s.innerHTML+"</a> "),(a=E("qunit-banner"))&&(a.className=""),g=E("qunit-tests"),(w=E("qunit-testresult"))&&w.parentNode.removeChild(w),g&&(g.innerHTML="",(w=b.createElement("p")).id="qunit-testresult",w.className="result",g.parentNode.insertBefore(w,g),w.innerHTML='<div id="qunit-testresult-display">Running...<br />&#160;</div><div id="qunit-testresult-controls"></div><div class="clearfix"></div>',c=E("qunit-testresult-controls")),c&&c.appendChild(((h=b.createElement("button")).id="qunit-abort-tests-button",h.innerHTML="Abort",f(h,"click",T),h)),(u=E("qunit-userAgent"))&&(u.innerHTML="",u.appendChild(b.createTextNode("QUnit "+pt.version+"; "+x.userAgent))),function(t){var n,i,s,a,u,c=E("qunit-testrunner-toolbar")
if(c){c.appendChild(((u=b.createElement("span")).innerHTML=function(){for(var t=!1,n=e.urlConfig,i="",o=0;o<n.length;o++){var s=e.urlConfig[o]
"string"==typeof s&&(s={id:s,label:s})
var a=I(s.id),u=I(s.tooltip)
if(s.value&&"string"!=typeof s.value){if(i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'>"+I(s.label)+": <select id='qunit-urlconfig-"+a+"' name='"+a+"' title='"+u+"'><option></option>",Array.isArray(s.value))for(var l=0;l<s.value.length;l++)i+="<option value='"+(a=I(s.value[l]))+"'"+(e[s.id]===s.value[l]?(t=!0)&&" selected='selected'":"")+">"+a+"</option>"
else for(var c in s.value)r.call(s.value,c)&&(i+="<option value='"+I(c)+"'"+(e[s.id]===c?(t=!0)&&" selected='selected'":"")+">"+I(s.value[c])+"</option>")
e[s.id]&&!t&&(i+="<option value='"+(a=I(e[s.id]))+"' selected='selected' disabled='disabled'>"+a+"</option>"),i+="</select></label>"}else i+="<label for='qunit-urlconfig-"+a+"' title='"+u+"'><input id='qunit-urlconfig-"+a+"' name='"+a+"' type='checkbox'"+(s.value?" value='"+I(s.value)+"'":"")+(e[s.id]?" checked='checked'":"")+" title='"+u+"' />"+I(s.label)+"</label>"}return i}(),v(u,"qunit-url-config"),p(u.getElementsByTagName("input"),"change",S),p(u.getElementsByTagName("select"),"change",S),u))
var h=b.createElement("span")
h.id="qunit-toolbar-filters",h.appendChild((n=b.createElement("form"),i=b.createElement("label"),s=b.createElement("input"),a=b.createElement("button"),v(n,"qunit-filter"),i.innerHTML="Filter: ",s.type="text",s.value=e.filter||"",s.name="filter",s.id="qunit-filter-input",a.innerHTML="Go",i.appendChild(s),n.appendChild(i),n.appendChild(b.createTextNode(" ")),n.appendChild(a),f(n,"submit",C),n)),h.appendChild(function(t){var n=null
if(o={options:t.modules.slice(),selectedMap:new k,isDirty:function(){return l(o.selectedMap.keys()).sort().join(",")!==l(n.keys()).sort().join(",")}},e.moduleId.length)for(var r=0;r<t.modules.length;r++){var i=t.modules[r];-1!==e.moduleId.indexOf(i.moduleId)&&o.selectedMap.set(i.moduleId,i.name)}n=new k(o.selectedMap)
var s=b.createElement("input")
s.id="qunit-modulefilter-search",s.autocomplete="off",f(s,"input",S),f(s,"input",T),f(s,"focus",T),f(s,"click",T)
var a=b.createElement("label")
a.htmlFor="qunit-modulefilter-search",a.textContent="Module:"
var u=b.createElement("span")
u.id="qunit-modulefilter-search-container",u.appendChild(s)
var c=b.createElement("button")
c.textContent="Apply",c.title="Re-run the selected test modules",f(c,"click",A)
var p=b.createElement("button")
p.textContent="Reset",p.type="reset",p.title="Restore the previous module selection"
var h=b.createElement("button")
h.textContent="Select none",h.type="button",h.title="Clear the current module selection",f(h,"click",function(){o.selectedMap.clear(),j(),S()})
var g=b.createElement("span")
g.id="qunit-modulefilter-actions",g.appendChild(c),g.appendChild(p),n.size&&g.appendChild(h)
var v=b.createElement("ul")
v.id="qunit-modulefilter-dropdown-list"
var x=b.createElement("div")
x.id="qunit-modulefilter-dropdown",x.style.display="none",x.appendChild(g),x.appendChild(v),f(x,"change",j),u.appendChild(x),j()
var w,E=b.createElement("form")
function T(){function e(t){var n=E.contains(t.target)
27!==t.keyCode&&n||(27===t.keyCode&&n&&s.focus(),x.style.display="none",d(b,"click",e),d(b,"keydown",e),s.value="",S())}"none"===x.style.display&&(S(),x.style.display="block",f(b,"click",e),f(b,"keydown",e))}function S(){y.clearTimeout(w),w=y.setTimeout(function(){v.innerHTML=function(e){return function(e){var t=""
o.selectedMap.forEach(function(e,n){t+=N(n,e,!0)})
for(var n=0;n<e.length;n++){var r=e[n].obj
o.selectedMap.has(r.moduleId)||(t+=N(r.moduleId,r.name,!1))}return t}(""===e?o.options.slice(0,20).map(function(e){return{obj:e}}):xt.go(e,o.options,{limit:20,key:"name",allowTypo:!0}))}(s.value)})}function j(e){var t=e&&e.target||null
t&&(t.checked?o.selectedMap.set(t.value,t.parentNode.textContent):o.selectedMap.delete(t.value),m(t.parentNode,"checked",t.checked))
var n=o.selectedMap.size?o.selectedMap.size+" "+(1===o.selectedMap.size?"module":"modules"):"All modules"
s.placeholder=n,s.title="Type to search through and reduce the list.",p.disabled=!o.isDirty(),h.style.display=o.selectedMap.size?"":"none"}return E.id="qunit-modulefilter",E.appendChild(a),E.appendChild(b.createTextNode(" ")),E.appendChild(u),f(E,"submit",C),f(E,"reset",function(){o.selectedMap=new k(n),j(),S()}),E}(t))
var g=b.createElement("div")
g.className="clearfix",c.appendChild(h),c.appendChild(g)}}(t)}(t)}),pt.on("runEnd",function(t){var n,r,i,o=E("qunit-banner"),s=E("qunit-tests"),a=E("qunit-abort-tests-button"),u=e.stats.all-e.stats.bad,l=[t.testCounts.total," tests completed in ",t.runtime," milliseconds, with ",t.testCounts.failed," failed, ",t.testCounts.skipped," skipped, and ",t.testCounts.todo," todo.<br />","<span class='passed'>",u,"</span> assertions of <span class='total'>",e.stats.all,"</span> passed, <span class='failed'>",e.stats.bad,"</span> failed.",O(wt.failedTests)].join("")
if(a&&a.disabled){l="Tests aborted after "+t.runtime+" milliseconds."
for(var c=0;c<s.children.length;c++)""!==(n=s.children[c]).className&&"running"!==n.className||(n.className="aborted",i=n.getElementsByTagName("ol")[0],(r=b.createElement("li")).className="fail",r.innerHTML="Test aborted.",i.appendChild(r))}!o||a&&!1!==a.disabled||(o.className="failed"===t.status?"qunit-fail":"qunit-pass"),a&&a.parentNode.removeChild(a),s&&(E("qunit-testresult-display").innerHTML=l),e.altertitle&&b.title&&(b.title=["failed"===t.status?"✖":"✔",b.title.replace(/^[\u2714\u2716] /i,"")].join(" ")),e.scrolltop&&y.scrollTo&&y.scrollTo(0,0)}),pt.testStart(function(e){var t,n
q(e.name,e.testId,e.module),(t=E("qunit-testresult-display"))&&(v(t,"running"),n=pt.config.reorder&&e.previousFailure,t.innerHTML=[D(wt),n?"Rerunning previously failed test: <br />":"Running: ",M(e.name,e.module),O(wt.failedTests)].join(""))}),pt.log(function(e){var t=E("qunit-test-output-"+e.testId)
if(t){var n,r,i,o=I(e.message)||(e.result?"okay":"failed")
o="<span class='test-message'>"+o+"</span>",o+="<span class='runtime'>@ "+e.runtime+" ms</span>"
var s=!1
e.result||void 0===e.expected&&void 0===e.actual?!e.result&&e.source&&(o+="<table><tr class='test-source'><th>Source: </th><td><pre>"+I(e.source)+"</pre></td></tr></table>"):(n=e.negative?"NOT "+pt.dump.parse(e.expected):pt.dump.parse(e.expected),r=pt.dump.parse(e.actual),o+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+I(n)+"</pre></td></tr>",r!==n?(o+="<tr class='test-actual'><th>Result: </th><td><pre>"+I(r)+"</pre></td></tr>","number"==typeof e.actual&&"number"==typeof e.expected?isNaN(e.actual)||isNaN(e.expected)||(s=!0,i=((i=e.actual-e.expected)>0?"+":"")+i):"boolean"!=typeof e.actual&&"boolean"!=typeof e.expected&&(s=L(i=pt.diff(n,r)).length!==L(n).length+L(r).length),s&&(o+="<tr class='test-diff'><th>Diff: </th><td><pre>"+i+"</pre></td></tr>")):-1!==n.indexOf("[object Array]")||-1!==n.indexOf("[object Object]")?o+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the depth of object is more than current max depth ("+pt.dump.maxDepth+").<p>Hint: Use <code>QUnit.dump.maxDepth</code> to  run with a higher max depth or <a href='"+I(j({maxDepth:0}))+"'>Rerun without max depth</a>.</p></td></tr>":o+="<tr class='test-message'><th>Message: </th><td>Diff suppressed as the expected and actual results have an equivalent serialization</td></tr>",e.source&&(o+="<tr class='test-source'><th>Source: </th><td><pre>"+I(e.source)+"</pre></td></tr>"),o+="</table>")
var a=t.getElementsByTagName("ol")[0],u=b.createElement("li")
u.className=e.result?"pass":"fail",u.innerHTML=o,a.appendChild(u)}}),pt.testDone(function(r){var i=E("qunit-tests"),o=E("qunit-test-output-"+r.testId)
if(i&&o){var s
w(o,"running"),s=r.failed>0?"failed":r.todo?"todo":r.skipped?"skipped":"passed"
var a=o.getElementsByTagName("ol")[0],u=r.passed,l=r.failed,c=r.failed>0?r.todo:!r.todo
c?v(a,"qunit-collapsed"):(wt.failedTests.push(r.testId),e.collapse&&(n?v(a,"qunit-collapsed"):n=!0))
var d=o.firstChild,p=l?"<b class='failed'>"+l+"</b>, <b class='passed'>"+u+"</b>, ":""
if(d.innerHTML+=" <b class='counts'>("+p+r.assertions.length+")</b>",wt.completed++,r.skipped){o.className="skipped"
var h=b.createElement("em")
h.className="qunit-skipped-label",h.innerHTML="skipped",o.insertBefore(h,d)}else{if(f(d,"click",function(){m(a,"qunit-collapsed")}),o.className=c?"pass":"fail",r.todo){var g=b.createElement("em")
g.className="qunit-todo-label",g.innerHTML="todo",o.className+=" todo",o.insertBefore(g,d)}var y=b.createElement("span")
y.className="runtime",y.innerHTML=r.runtime+" ms",o.insertBefore(y,a)}if(r.source){var x=b.createElement("p")
x.innerHTML="<strong>Source: </strong>"+I(r.source),v(x,"qunit-source"),c&&v(x,"qunit-collapsed"),f(d,"click",function(){m(x,"qunit-collapsed")}),o.appendChild(x)}e.hidepassed&&("passed"===s||r.skipped)&&(t.push(o),i.removeChild(o))}}),pt.on("error",function(e){var t=q("global failure")
if(t){var n=I(R(e))
n="<span class='test-message'>"+n+"</span>",e&&e.stack&&(n+="<table><tr class='test-source'><th>Source: </th><td><pre>"+I(e.stack)+"</pre></td></tr></table>")
var r=t.getElementsByTagName("ol")[0],i=b.createElement("li")
i.className="fail",i.innerHTML=n,r.appendChild(i),t.className="fail"}})
var s,a=(s=y.phantom)&&s.version&&s.version.major>0
a&&h.warn("Support for PhantomJS is deprecated and will be removed in QUnit 3.0."),a||"complete"!==b.readyState?f(y,"load",pt.autostart):pt.autostart()
var u=y.onerror
y.onerror=function(t,n,r,i,o){var s=!1
if(u){for(var a=arguments.length,l=new Array(a>5?a-5:0),c=5;c<a;c++)l[c-5]=arguments[c]
s=u.call.apply(u,[this,t,n,r,i,o].concat(l))}if(!0!==s){if(e.current&&e.current.ignoreGlobalErrors)return!0
var f=o||new Error(t)
!f.stack&&n&&r&&(f.stack="".concat(n,":").concat(r)),pt.onUncaughtException(f)}return s},y.addEventListener("unhandledrejection",function(e){pt.config.ignoreUnhandledRejections||pt.onUncaughtException(e.reason)})}function c(e){return"function"==typeof e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function f(e,t,n){e.addEventListener(t,n,!1)}function d(e,t,n){e.removeEventListener(t,n,!1)}function p(e,t,n){for(var r=e.length;r--;)f(e[r],t,n)}function g(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>=0}function v(e,t){g(e,t)||(e.className+=(e.className?" ":"")+t)}function m(e,t,n){n||void 0===n&&!g(e,t)?v(e,t):w(e,t)}function w(e,t){for(var n=" "+e.className+" ";n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ")
e.className=c(n)}function E(e){return b.getElementById&&b.getElementById(e)}function T(){var e=E("qunit-abort-tests-button")
return e&&(e.disabled=!0,e.innerHTML="Aborting..."),pt.config.queue.length=0,!1}function C(e){var t=E("qunit-filter-input")
return t.value=c(t.value),A(),e&&e.preventDefault&&e.preventDefault(),!1}function S(){var n,r=this,i={}
n="selectedIndex"in r?r.options[r.selectedIndex].value||void 0:r.checked?r.defaultValue||!0:void 0,i[r.name]=n
var o=j(i)
if("hidepassed"===r.name&&"replaceState"in y.history){pt.urlParams[r.name]=n,e[r.name]=n||!1
var s=E("qunit-tests")
if(s)if(r.checked){for(var a=s.children.length,u=s.children,l=0;l<a;l++){var c=u[l],f=c?c.className:"",d=f.indexOf("pass")>-1,p=f.indexOf("skipped")>-1;(d||p)&&t.push(c)}for(var h=0;h<t.length;h++)s.removeChild(t[h])}else{for(var g=0;g<t.length;g++)s.appendChild(t[g])
t.length=0}y.history.replaceState(null,"",o)}else y.location=o}function j(e){var t="?",n=y.location
for(var i in e=_(_({},pt.urlParams),e))if(r.call(e,i)&&void 0!==e[i])for(var o=[].concat(e[i]),s=0;s<o.length;s++)t+=encodeURIComponent(i),!0!==o[s]&&(t+="="+encodeURIComponent(o[s])),t+="&"
return n.protocol+"//"+n.host+n.pathname+t.slice(0,-1)}function A(){var e=E("qunit-filter-input").value
y.location=j({filter:""===e?void 0:e,moduleId:l(o.selectedMap.keys()),module:void 0,testId:void 0})}function N(e,t,n){return'<li><label class="clickable'+(n?" checked":"")+'"><input type="checkbox" value="'+I(e)+'"'+(n?' checked="checked"':"")+" />"+I(t)+"</label></li>"}function q(e,t,n){var r=E("qunit-tests")
if(r){var i=b.createElement("strong")
i.className="qunit-test-name",i.innerHTML=M(e,n)
var o=b.createElement("li")
if(o.appendChild(i),void 0!==t){var s=b.createElement("a")
s.innerHTML="Rerun",s.href=j({testId:t}),o.id="qunit-test-output-"+t,o.appendChild(s)}var a=b.createElement("ol")
return a.className="qunit-assert-list",o.appendChild(a),r.appendChild(o),o}}function O(e){return 0===e.length?"":["<br /><a href='"+I(j({testId:e}))+"'>",1===e.length?"Rerun 1 failed test":"Rerun "+e.length+" failed tests","</a>"].join("")}function M(e,t){var n=""
return t&&(n="<span class='module-name'>"+I(t)+"</span>: "),n+"<span class='test-name'>"+I(e)+"</span>"}function D(e){return[e.completed," / ",e.defined," tests completed.<br />"].join("")}function L(e){return e.replace(/<\/?[^>]+(>|$)/g,"").replace(/&quot;/g,"").replace(/\s+/g,"")}}()}()}}])
