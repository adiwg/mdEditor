/* @license
Papa Parse
v5.5.2
https://github.com/mholt/PapaParse
License: MIT
*/
(function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()})(this,(function e(){"use strict"
var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{}
var i=!t.document&&!!t.postMessage,n=t.IS_PAPA_WORKER||!1,r={},s=0,a={parse:function(i,n){var o=(n=n||{}).dynamicTyping||!1
w(o)&&(n.dynamicTypingFunction=o,o={})
if(n.dynamicTyping=o,n.transform=!!w(n.transform)&&n.transform,n.worker&&a.WORKERS_SUPPORTED){var h=function(){if(!a.WORKERS_SUPPORTED)return!1
var i=(o=t.URL||t.webkitURL||null,h=e.toString(),a.BLOB_URL||(a.BLOB_URL=o.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",h,")();"],{type:"text/javascript"})))),n=new t.Worker(i)
var o,h
return n.onmessage=m,n.id=s++,r[n.id]=n,n}()
return h.userStep=n.step,h.userChunk=n.chunk,h.userComplete=n.complete,h.userError=n.error,n.step=w(n.step),n.chunk=w(n.chunk),n.complete=w(n.complete),n.error=w(n.error),delete n.worker,void h.postMessage({input:i,config:n,workerId:h.id})}var p=null
if(i===a.NODE_STREAM_INPUT&&"undefined"==typeof PAPA_BROWSER_CONTEXT)return(p=new c(n)).getStream()
"string"==typeof i?(i=function(e){if(65279===e.charCodeAt(0))return e.slice(1)
return e}(i),p=n.download?new u(n):new d(n)):!0===i.readable&&w(i.read)&&w(i.on)?p=new l(n):(t.File&&i instanceof File||i instanceof Object)&&(p=new f(n))
return p.stream(i)},unparse:function(e,t){var i=!1,n=!0,r=",",s="\r\n",o='"',h=o+o,u=!1,f=null,d=!1;(function(){if("object"!=typeof t)return
"string"!=typeof t.delimiter||a.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(r=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes)
"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(u=t.skipEmptyLines)
"string"==typeof t.newline&&(s=t.newline)
"string"==typeof t.quoteChar&&(o=t.quoteChar)
"boolean"==typeof t.header&&(n=t.header)
if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty")
f=t.columns}void 0!==t.escapeChar&&(h=t.escapeChar+o)
t.escapeFormulae instanceof RegExp?d=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(d=/^[=+\-@\t\r].*$/)})()
var l=new RegExp(_(o),"g")
"string"==typeof e&&(e=JSON.parse(e))
if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return c(null,e,u)
if("object"==typeof e[0])return c(f||Object.keys(e[0]),e,u)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||f),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),c(e.fields||[],e.data||[],u)
throw new Error("Unable to serialize unrecognized input")
function c(e,t,i){var a=""
"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t))
var o=Array.isArray(e)&&e.length>0,h=!Array.isArray(t[0])
if(o&&n){for(var u=0;u<e.length;u++)u>0&&(a+=r),a+=p(e[u],u)
t.length>0&&(a+=s)}for(var f=0;f<t.length;f++){var d=o?e.length:t[f].length,l=!1,c=o?0===Object.keys(t[f]).length:0===t[f].length
if(i&&!o&&(l="greedy"===i?""===t[f].join("").trim():1===t[f].length&&0===t[f][0].length),"greedy"===i&&o){for(var _=[],g=0;g<d;g++){var m=h?e[g]:g
_.push(t[f][m])}l=""===_.join("").trim()}if(!l){for(var y=0;y<d;y++){y>0&&!c&&(a+=r)
var v=o&&h?e[y]:y
a+=p(t[f][v],y)}f<t.length-1&&(!i||d>0&&!c)&&(a+=s)}}return a}function p(e,t){if(null==e)return""
if(e.constructor===Date)return JSON.stringify(e).slice(1,25)
var n=!1
d&&"string"==typeof e&&d.test(e)&&(e="'"+e,n=!0)
var s=e.toString().replace(l,h)
return n=n||!0===i||"function"==typeof i&&i(e,t)||Array.isArray(i)&&i[t]||function(e,t){for(var i=0;i<t.length;i++)if(e.indexOf(t[i])>-1)return!0
return!1}(s,a.BAD_DELIMITERS)||s.indexOf(r)>-1||" "===s.charAt(0)||" "===s.charAt(s.length-1),n?o+s+o:s}}}
if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\ufeff",a.BAD_DELIMITERS=["\r","\n",'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!i&&!!t.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=g,a.ParserHandle=p,a.NetworkStreamer=u,a.FileStreamer=f,a.StringStreamer=d,a.ReadableStreamStreamer=l,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(a.DuplexStreamStreamer=c),t.jQuery){var o=t.jQuery
o.fn.parse=function(e){var i=e.config||{},n=[]
return this.each((function(e){if(!("INPUT"===o(this).prop("tagName").toUpperCase()&&"file"===o(this).attr("type").toLowerCase()&&t.FileReader)||!this.files||0===this.files.length)return!0
for(var r=0;r<this.files.length;r++)n.push({file:this.files[r],inputElem:this,instanceConfig:o.extend({},i)})})),r(),this
function r(){if(0!==n.length){var t,i,r,h,u=n[0]
if(w(e.before)){var f=e.before(u.file,u.inputElem)
if("object"==typeof f){if("abort"===f.action)return t="AbortError",i=u.file,r=u.inputElem,h=f.reason,void(w(e.error)&&e.error({name:t},i,r,h))
if("skip"===f.action)return void s()
"object"==typeof f.config&&(u.instanceConfig=o.extend(u.instanceConfig,f.config))}else if("skip"===f)return void s()}var d=u.instanceConfig.complete
u.instanceConfig.complete=function(e){w(d)&&d(e,u.file,u.inputElem),s()},a.parse(u.file,u.instanceConfig)}else w(e.complete)&&e.complete()}function s(){n.splice(0,1),r()}}}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=k(e)
t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null)
this._handle=new p(t),this._handle.streamer=this,this._config=t}.call(this,e),this.parseChunk=function(e,i){const r=parseInt(this._config.skipFirstNLines)||0
if(this.isFirstChunk&&r>0){let t=this._config.newline
if(!t){const i=this._config.quoteChar||'"'
t=this._handle.guessLineEndings(e,i)}const i=e.split(t)
e=[...i.slice(r)].join(t)}if(this.isFirstChunk&&w(this._config.beforeFirstChunk)){var s=this._config.beforeFirstChunk(e)
void 0!==s&&(e=s)}this.isFirstChunk=!1,this._halted=!1
var o=this._partialLine+e
this._partialLine=""
var h=this._handle.parse(o,this._baseIndex,!this._finished)
if(!this._handle.paused()&&!this._handle.aborted()){var u=h.meta.cursor
this._finished||(this._partialLine=o.substring(u-this._baseIndex),this._baseIndex=u),h&&h.data&&(this._rowCount+=h.data.length)
var f=this._finished||this._config.preview&&this._rowCount>=this._config.preview
if(n)t.postMessage({results:h,workerId:a.WORKER_ID,finished:f})
else if(w(this._config.chunk)&&!i){if(this._config.chunk(h,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0)
h=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(h.data),this._completeResults.errors=this._completeResults.errors.concat(h.errors),this._completeResults.meta=h.meta),this._completed||!f||!w(this._config.complete)||h&&h.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),f||h&&h.meta.paused||this._nextChunk(),h}this._halted=!0},this._sendError=function(e){w(this._config.error)?this._config.error(e):n&&this._config.error&&t.postMessage({workerId:a.WORKER_ID,error:e,finished:!1})}}function u(e){var t;(e=e||{}).chunkSize||(e.chunkSize=a.RemoteChunkSize),h.call(this,e),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded()
else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),i||(t.onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders
for(var n in e)t.setRequestHeader(n,e[n])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1
t.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{t.send(this._config.downloadRequestBody)}catch(s){this._chunkError(s.message)}i&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range")
if(null===t)return-1
return parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var i=t.statusText||e
this._sendError(new Error(i))}}function f(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=a.LocalChunkSize),h.call(this,e)
var n="undefined"!=typeof FileReader
this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,n?((t=new FileReader).onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input
if(this._config.chunkSize){var r=Math.min(this._start+this._config.chunkSize,this._input.size)
e=i.call(e,this._start,r)}var s=t.readAsText(e,this._config.encoding)
n||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function d(e){var t
e=e||{},h.call(this,e),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,i=this._config.chunkSize
return i?(e=t.substring(0,i),t=t.substring(i)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function l(e){e=e||{},h.call(this,e)
var t=[],i=!0,n=!1
this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){n&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=E((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(n){this._streamError(n)}}),this),this._streamError=E((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=E((function(){this._streamCleanUp(),n=!0,this._streamData("")}),this),this._streamCleanUp=E((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function c(e){var t=require("stream").Duplex,i=k(e),n=!0,r=!1,s=[],a=null
this._onCsvData=function(e){var t=e.data
a.push(t)||this._handle.paused()||this._handle.pause()},this._onCsvComplete=function(){a.push(null)},i.step=E(this._onCsvData,this),i.complete=E(this._onCsvComplete,this),h.call(this,i),this._nextChunk=function(){r&&1===s.length&&(this._finished=!0),s.length?s.shift()():n=!0},this._addToParseQueue=function(e,t){s.push(E((function(){if(this.parseChunk("string"==typeof e?e:e.toString(i.encoding)),w(t))return t()}),this)),n&&(n=!1,this._nextChunk())},this._onRead=function(){this._handle.paused()&&this._handle.resume()},this._onWrite=function(e,t,i){this._addToParseQueue(e,i)},this._onWriteComplete=function(){r=!0,this._addToParseQueue("")},this.getStream=function(){return a},(a=new t({readableObjectMode:!0,decodeStrings:!1,read:E(this._onRead,this),write:E(this._onWrite,this)})).once("finish",E(this._onWriteComplete,this))}function p(e){var t,i,n,r=Math.pow(2,53),s=-r,o=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,u=this,f=0,d=0,l=!1,c=!1,p=[],m={data:[],errors:[],meta:{}}
if(w(e.step)){var y=e.step
e.step=function(t){if(m=t,C())E()
else{if(E(),0===m.data.length)return
f+=t.data.length,e.preview&&f>e.preview?i.abort():(m.data=m.data[0],y(m,u))}}}function v(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function E(){return m&&n&&(R("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),n=!1),e.skipEmptyLines&&(m.data=m.data.filter((function(e){return!v(e)}))),C()&&function(){if(!m)return
function t(t,i){w(e.transformHeader)&&(t=e.transformHeader(t,i)),p.push(t)}if(Array.isArray(m.data[0])){for(var i=0;C()&&i<m.data.length;i++)m.data[i].forEach(t)
m.data.splice(0,1)}else m.data.forEach(t)}(),function(){if(!m||!e.header&&!e.dynamicTyping&&!e.transform)return m
function t(t,i){var n,r=e.header?{}:[]
for(n=0;n<t.length;n++){var s=n,a=t[n]
e.header&&(s=n>=p.length?"__parsed_extra":p[n]),e.transform&&(a=e.transform(a,s)),a=b(s,a),"__parsed_extra"===s?(r[s]=r[s]||[],r[s].push(a)):r[s]=a}return e.header&&(n>p.length?R("FieldMismatch","TooManyFields","Too many fields: expected "+p.length+" fields but parsed "+n,d+i):n<p.length&&R("FieldMismatch","TooFewFields","Too few fields: expected "+p.length+" fields but parsed "+n,d+i)),r}var i=1
!m.data.length||Array.isArray(m.data[0])?(m.data=m.data.map(t),i=m.data.length):m.data=t(m.data,0)
e.header&&m.meta&&(m.meta.fields=p)
return d+=i,m}()}function C(){return e.header&&0===p.length}function b(t,i){return function(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}(t)?"true"===i||"TRUE"===i||"false"!==i&&"FALSE"!==i&&(function(e){if(o.test(e)){var t=parseFloat(e)
if(t>s&&t<r)return!0}return!1}(i)?parseFloat(i):h.test(i)?new Date(i):""===i?null:i):i}function R(e,t,i,n){var r={type:e,code:t,message:i}
void 0!==n&&(r.row=n),m.errors.push(r)}this.parse=function(r,s,o){var h=e.quoteChar||'"'
if(e.newline||(e.newline=this.guessLineEndings(r,h)),n=!1,e.delimiter)w(e.delimiter)&&(e.delimiter=e.delimiter(r),m.meta.delimiter=e.delimiter)
else{var u=function(t,i,n,r,s){var o,h,u,f
s=s||[",","\t","|",";",a.RECORD_SEP,a.UNIT_SEP]
for(var d=0;d<s.length;d++){var l=s[d],c=0,p=0,_=0
u=void 0
for(var m=new g({comments:r,delimiter:l,newline:i,preview:10}).parse(t),y=0;y<m.data.length;y++)if(n&&v(m.data[y]))_++
else{var k=m.data[y].length
p+=k,void 0!==u?k>0&&(c+=Math.abs(k-u),u=k):u=k}m.data.length>0&&(p/=m.data.length-_),(void 0===h||c<=h)&&(void 0===f||p>f)&&p>1.99&&(h=c,o=l,f=p)}return e.delimiter=o,{successful:!!o,bestDelimiter:o}}(r,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess)
u.successful?e.delimiter=u.bestDelimiter:(n=!0,e.delimiter=a.DefaultDelimiter),m.meta.delimiter=e.delimiter}var f=k(e)
return e.preview&&e.header&&f.preview++,t=r,i=new g(f),m=i.parse(t,s,o),E(),l?{meta:{paused:!0}}:m||{meta:{paused:!1}}},this.paused=function(){return l},this.pause=function(){l=!0,i.abort(),t=w(e.chunk)?"":t.substring(i.getCharIndex())},this.resume=function(){u.streamer._halted?(l=!1,u.streamer.parseChunk(t,!0)):setTimeout(u.resume,3)},this.aborted=function(){return c},this.abort=function(){c=!0,i.abort(),m.meta.aborted=!0,w(e.complete)&&e.complete(m),t=""},this.guessLineEndings=function(e,t){e=e.substring(0,1048576)
var i=new RegExp(_(t)+"([^]*?)"+_(t),"gm"),n=(e=e.replace(i,"")).split("\r"),r=e.split("\n"),s=r.length>1&&r[0].length<n[0].length
if(1===n.length||s)return"\n"
for(var a=0,o=0;o<n.length;o++)"\n"===n[o][0]&&a++
return a>=n.length/2?"\r\n":"\r"}}function _(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function g(e){var t,i=(e=e||{}).delimiter,n=e.newline,r=e.comments,s=e.step,o=e.preview,h=e.fastMode,u=null,f=!1,d=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar
if(void 0!==e.escapeChar&&(d=e.escapeChar),("string"!=typeof i||a.BAD_DELIMITERS.indexOf(i)>-1)&&(i=","),r===i)throw new Error("Comment character same as delimiter")
!0===r?r="#":("string"!=typeof r||a.BAD_DELIMITERS.indexOf(r)>-1)&&(r=!1),"\n"!==n&&"\r"!==n&&"\r\n"!==n&&(n="\n")
var l=0,c=!1
this.parse=function(a,p,g){if("string"!=typeof a)throw new Error("Input must be a string")
var m=a.length,y=i.length,v=n.length,k=r.length,E=w(s)
l=0
var C=[],b=[],R=[],S=0
if(!a)return q()
if(h||!1!==h&&-1===a.indexOf(t)){for(var O=a.split(n),x=0;x<O.length;x++){if(R=O[x],l+=R.length,x!==O.length-1)l+=n.length
else if(g)return q()
if(!r||R.substring(0,k)!==r){if(E){if(C=[],P(R.split(i)),U(),c)return q()}else P(R.split(i))
if(o&&x>=o)return C=C.slice(0,o),q(!0)}}return q()}for(var T=a.indexOf(i,l),A=a.indexOf(n,l),I=new RegExp(_(d)+_(t),"g"),D=a.indexOf(t,l);;)if(a[l]!==t)if(r&&0===R.length&&a.substring(l,l+k)===r){if(-1===A)return q()
l=A+v,A=a.indexOf(n,l),T=a.indexOf(i,l)}else if(-1!==T&&(T<A||-1===A))R.push(a.substring(l,T)),l=T+y,T=a.indexOf(i,l)
else{if(-1===A)break
if(R.push(a.substring(l,A)),M(A+v),E&&(U(),c))return q()
if(o&&C.length>=o)return q(!0)}else for(D=l,l++;;){if(-1===(D=a.indexOf(t,D+1)))return g||b.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:C.length,index:l}),z()
if(D===m-1)return z(a.substring(l,D).replace(I,t))
if(t!==d||a[D+1]!==d){if(t===d||0===D||a[D-1]!==d){-1!==T&&T<D+1&&(T=a.indexOf(i,D+1)),-1!==A&&A<D+1&&(A=a.indexOf(n,D+1))
var L=j(-1===A?T:Math.min(T,A))
if(a.substr(D+1+L,y)===i){R.push(a.substring(l,D).replace(I,t)),l=D+1+L+y,a[D+1+L+y]!==t&&(D=a.indexOf(t,l)),T=a.indexOf(i,l),A=a.indexOf(n,l)
break}var F=j(A)
if(a.substring(D+1+F,D+1+F+v)===n){if(R.push(a.substring(l,D).replace(I,t)),M(D+1+F+v),T=a.indexOf(i,l),D=a.indexOf(t,l),E&&(U(),c))return q()
if(o&&C.length>=o)return q(!0)
break}b.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:C.length,index:l}),D++}}else D++}return z()
function P(e){C.push(e),S=l}function j(e){var t=0
if(-1!==e){var i=a.substring(D+1,e)
i&&""===i.trim()&&(t=i.length)}return t}function z(e){return g||(void 0===e&&(e=a.substring(l)),R.push(e),l=m,P(R),E&&U()),q()}function M(e){l=e,P(R),R=[],A=a.indexOf(n,l)}function q(t){if(e.header&&!p&&C.length&&!f){const t=C[0],i={},n=new Set(t)
let r=!1
for(let s=0;s<t.length;s++){let a=t[s]
if(w(e.transformHeader)&&(a=e.transformHeader(a,s)),i[a]){let e,o=i[a]
do{e=`${a}_${o}`,o++}while(n.has(e))
n.add(e),t[s]=e,i[a]++,r=!0,null===u&&(u={}),u[e]=a}else i[a]=1,t[s]=a
n.add(a)}r&&console.warn("Duplicate headers found and renamed."),f=!0}return{data:C,errors:b,meta:{delimiter:i,linebreak:n,aborted:c,truncated:!!t,cursor:S+(p||0),renamedHeaders:u}}}function U(){s(q()),C=[],b=[]}},this.abort=function(){c=!0},this.getCharIndex=function(){return l}}function m(e){var t=e.data,i=r[t.workerId],n=!1
if(t.error)i.userError(t.error,t.file)
else if(t.results&&t.results.data){var s={abort:function(){n=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v}
if(w(i.userStep)){for(var a=0;a<t.results.data.length&&(i.userStep({data:t.results.data[a],errors:t.results.errors,meta:t.results.meta},s),!n);a++);delete t.results}else w(i.userChunk)&&(i.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!n&&y(t.workerId,t.results)}function y(e,t){var i=r[e]
w(i.userComplete)&&i.userComplete(t),i.terminate(),delete r[e]}function v(){throw new Error("Not implemented.")}function k(e){if("object"!=typeof e||null===e)return e
var t=Array.isArray(e)?[]:{}
for(var i in e)t[i]=k(e[i])
return t}function E(e,t){return function(){e.apply(t,arguments)}}function w(e){return"function"==typeof e}return n&&(t.onmessage=function(e){var i=e.data
void 0===a.WORKER_ID&&i&&(a.WORKER_ID=i.workerId)
if("string"==typeof i.input)t.postMessage({workerId:a.WORKER_ID,results:a.parse(i.input,i.config),finished:!0})
else if(t.File&&i.input instanceof File||i.input instanceof Object){var n=a.parse(i.input,i.config)
n&&t.postMessage({workerId:a.WORKER_ID,results:n,finished:!0})}}),u.prototype=Object.create(h.prototype),u.prototype.constructor=u,f.prototype=Object.create(h.prototype),f.prototype.constructor=f,d.prototype=Object.create(d.prototype),d.prototype.constructor=d,l.prototype=Object.create(h.prototype),l.prototype.constructor=l,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(c.prototype=Object.create(h.prototype),c.prototype.constructor=c),a}))
