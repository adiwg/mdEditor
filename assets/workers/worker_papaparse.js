(function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()})(this,function(){"use strict"
var e,t,i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==i?i:{},n=!i.document&&!!i.postMessage,r=n&&/(\?|&)papaworker(=|&|$)/.test(i.location.search),s=!1,a={},o=0,h={parse:function(t,n){var r=(n=n||{}).dynamicTyping||!1
w(r)&&(n.dynamicTypingFunction=r,r={})
if(n.dynamicTyping=r,n.worker&&h.WORKERS_SUPPORTED){var u=function(){if(!h.WORKERS_SUPPORTED)return!1
if(!s&&null===h.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.")
var t=h.SCRIPT_PATH||e
t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker"
var n=new i.Worker(t)
return n.onmessage=m,n.id=o++,a[n.id]=n,n}()
return u.userStep=n.step,u.userChunk=n.chunk,u.userComplete=n.complete,u.userError=n.error,n.step=w(n.step),n.chunk=w(n.chunk),n.complete=w(n.complete),n.error=w(n.error),delete n.worker,void u.postMessage({input:t,config:n,workerId:u.id})}var f=null
"string"==typeof t?f=n.download?new d(n):new c(n):!0===t.readable&&w(t.read)&&w(t.on)?f=new p(n):(i.File&&t instanceof File||t instanceof Object)&&(f=new l(n))
return f.stream(t)},unparse:function(e,t){var i=!1,n=!0,r=",",s="\r\n",a='"';(function(){if("object"!=typeof t)return
"string"==typeof t.delimiter&&1===t.delimiter.length&&-1===h.BAD_DELIMITERS.indexOf(t.delimiter)&&(r=t.delimiter);("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(i=t.quotes)
"string"==typeof t.newline&&(s=t.newline)
"string"==typeof t.quoteChar&&(a=t.quoteChar)
"boolean"==typeof t.header&&(n=t.header)})()
var o=new RegExp(a,"g")
"string"==typeof e&&(e=JSON.parse(e))
if(e instanceof Array){if(!e.length||e[0]instanceof Array)return f(null,e)
if("object"==typeof e[0])return f(u(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=e.data[0]instanceof Array?e.fields:u(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[])
throw"exception: Unable to serialize unrecognized input"
function u(e){if("object"!=typeof e)return[]
var t=[]
for(var i in e)t.push(i)
return t}function f(e,t){var i=""
"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t))
var a=e instanceof Array&&e.length>0,o=!(t[0]instanceof Array)
if(a&&n){for(var h=0;h<e.length;h++)h>0&&(i+=r),i+=d(e[h],h)
t.length>0&&(i+=s)}for(var u=0;u<t.length;u++){for(var f=a?e.length:t[u].length,l=0;l<f;l++){l>0&&(i+=r)
var c=a&&o?e[l]:l
i+=d(t[u][c],l)}u<t.length-1&&(i+=s)}return i}function d(e,t){if(void 0===e||null===e)return""
e=e.toString().replace(o,a+a)
var n="boolean"==typeof i&&i||i instanceof Array&&i[t]||function(e,t){for(var i=0;i<t.length;i++)if(e.indexOf(t[i])>-1)return!0
return!1}(e,h.BAD_DELIMITERS)||e.indexOf(r)>-1||" "===e.charAt(0)||" "===e.charAt(e.length-1)
return n?a+e+a:e}}}
if(h.RECORD_SEP=String.fromCharCode(30),h.UNIT_SEP=String.fromCharCode(31),h.BYTE_ORDER_MARK="\ufeff",h.BAD_DELIMITERS=["\r","\n",'"',h.BYTE_ORDER_MARK],h.WORKERS_SUPPORTED=!n&&!!i.Worker,h.SCRIPT_PATH=null,h.LocalChunkSize=10485760,h.RemoteChunkSize=5242880,h.DefaultDelimiter=",",h.Parser=g,h.ParserHandle=_,h.NetworkStreamer=d,h.FileStreamer=l,h.StringStreamer=c,h.ReadableStreamStreamer=p,i.jQuery){var u=i.jQuery
u.fn.parse=function(e){var t=e.config||{},n=[]
return this.each(function(e){if(!("INPUT"===u(this).prop("tagName").toUpperCase()&&"file"===u(this).attr("type").toLowerCase()&&i.FileReader)||!this.files||0===this.files.length)return!0
for(var r=0;r<this.files.length;r++)n.push({file:this.files[r],inputElem:this,instanceConfig:u.extend({},t)})}),r(),this
function r(){if(0!==n.length){var t,i,r,a,o=n[0]
if(w(e.before)){var f=e.before(o.file,o.inputElem)
if("object"==typeof f){if("abort"===f.action)return t="AbortError",i=o.file,r=o.inputElem,a=f.reason,void(w(e.error)&&e.error({name:t},i,r,a))
if("skip"===f.action)return void s()
"object"==typeof f.config&&(o.instanceConfig=u.extend(o.instanceConfig,f.config))}else if("skip"===f)return void s()}var d=o.instanceConfig.complete
o.instanceConfig.complete=function(e){w(d)&&d(e,o.file,o.inputElem),s()},h.parse(o.file,o.instanceConfig)}else w(e.complete)&&e.complete()}function s(){n.splice(0,1),r()}}}function f(e){this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=y(e)
t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null)
this._handle=new _(t),this._handle.streamer=this,this._config=t}.call(this,e),this.parseChunk=function(e){if(this.isFirstChunk&&w(this._config.beforeFirstChunk)){var t=this._config.beforeFirstChunk(e)
void 0!==t&&(e=t)}this.isFirstChunk=!1
var n=this._partialLine+e
this._partialLine=""
var s=this._handle.parse(n,this._baseIndex,!this._finished)
if(!this._handle.paused()&&!this._handle.aborted()){var a=s.meta.cursor
this._finished||(this._partialLine=n.substring(a-this._baseIndex),this._baseIndex=a),s&&s.data&&(this._rowCount+=s.data.length)
var o=this._finished||this._config.preview&&this._rowCount>=this._config.preview
if(r)i.postMessage({results:s,workerId:h.WORKER_ID,finished:o})
else if(w(this._config.chunk)){if(this._config.chunk(s,this._handle),this._paused)return
s=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(s.data),this._completeResults.errors=this._completeResults.errors.concat(s.errors),this._completeResults.meta=s.meta),!o||!w(this._config.complete)||s&&s.meta.aborted||this._config.complete(this._completeResults,this._input),o||s&&s.meta.paused||this._nextChunk(),s}},this._sendError=function(e){w(this._config.error)?this._config.error(e):r&&this._config.error&&i.postMessage({workerId:h.WORKER_ID,error:e,finished:!1})}}function d(e){var t;(e=e||{}).chunkSize||(e.chunkSize=h.RemoteChunkSize),f.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded()
else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),n||(t.onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)),t.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders
for(var i in e)t.setRequestHeader(i,e[i])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1
t.setRequestHeader("Range","bytes="+this._start+"-"+r),t.setRequestHeader("If-None-Match","webkit-no-cache")}try{t.send()}catch(e){this._chunkError(e.message)}n&&0===t.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4==t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range")
if(null===t)return-1
return parseInt(t.substr(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var i=t.statusText||e
this._sendError(i)}}function l(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=h.LocalChunkSize),f.call(this,e)
var n="undefined"!=typeof FileReader
this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,n?((t=new FileReader).onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input
if(this._config.chunkSize){var r=Math.min(this._start+this._config.chunkSize,this._input.size)
e=i.call(e,this._start,r)}var s=t.readAsText(e,this._config.encoding)
n||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error.message)}}function c(e){var t
e=e||{},f.call(this,e),this.stream=function(e){return e,t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,i=e?t.substr(0,e):t
return t=e?t.substr(e):"",this._finished=!t,this.parseChunk(i)}}}function p(e){e=e||{},f.call(this,e)
var t=[],i=!0
this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._nextChunk=function(){t.length?this.parseChunk(t.shift()):i=!0},this._streamData=b(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=b(function(e){this._streamCleanUp(),this._sendError(e.message)},this),this._streamEnd=b(function(){this._streamCleanUp(),this._finished=!0,this._streamData("")},this),this._streamCleanUp=b(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function _(e){var t,i,n,r=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,s=this,a=0,o=!1,u=!1,f=[],d={data:[],errors:[],meta:{}}
if(w(e.step)){var l=e.step
e.step=function(t){if(d=t,p())c()
else{if(c(),0===d.data.length)return
a+=t.data.length,e.preview&&a>e.preview?i.abort():l(d,s)}}}function c(){if(d&&n&&(m("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+h.DefaultDelimiter+"'"),n=!1),e.skipEmptyLines)for(var t=0;t<d.data.length;t++)1===d.data[t].length&&""===d.data[t][0]&&d.data.splice(t--,1)
return p()&&function(){if(!d)return
for(var e=0;p()&&e<d.data.length;e++)for(var t=0;t<d.data[e].length;t++)f.push(d.data[e][t])
d.data.splice(0,1)}(),function(){if(!d||!e.header&&!e.dynamicTyping)return d
for(var t=0;t<d.data.length;t++){for(var i=e.header?{}:[],n=0;n<d.data[t].length;n++){var r=n,s=d.data[t][n]
e.header&&(r=n>=f.length?"__parsed_extra":f[n]),s=_(r,s),"__parsed_extra"===r?(i[r]=i[r]||[],i[r].push(s)):i[r]=s}d.data[t]=i,e.header&&(n>f.length?m("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+n,t):n<f.length&&m("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+n,t))}e.header&&d.meta&&(d.meta.fields=f)
return d}()}function p(){return e.header&&0===f.length}function _(t,i){return function(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}(t)?"true"===i||"TRUE"===i||"false"!==i&&"FALSE"!==i&&(n=i,r.test(n)?parseFloat(n):n):i
var n}function m(e,t,i,n){d.errors.push({type:e,code:t,message:i,row:n})}this.parse=function(r,s,a){if(e.newline||(e.newline=function(e){var t=(e=e.substr(0,1048576)).split("\r"),i=e.split("\n"),n=i.length>1&&i[0].length<t[0].length
if(1===t.length||n)return"\n"
for(var r=0,s=0;s<t.length;s++)"\n"===t[s][0]&&r++
return r>=t.length/2?"\r\n":"\r"}(r)),n=!1,e.delimiter)w(e.delimiter)&&(e.delimiter=e.delimiter(r),d.meta.delimiter=e.delimiter)
else{var u=function(t,i,n){for(var r,s,a,o=[",","\t","|",";",h.RECORD_SEP,h.UNIT_SEP],u=0;u<o.length;u++){var f=o[u],d=0,l=0,c=0
a=void 0
for(var p=new g({delimiter:f,newline:i,preview:10}).parse(t),_=0;_<p.data.length;_++)if(n&&1===p.data[_].length&&0===p.data[_][0].length)c++
else{var m=p.data[_].length
l+=m,void 0!==a?m>1&&(d+=Math.abs(m-a),a=m):a=m}p.data.length>0&&(l/=p.data.length-c),(void 0===s||d<s)&&l>1.99&&(s=d,r=f)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}(r,e.newline,e.skipEmptyLines)
u.successful?e.delimiter=u.bestDelimiter:(n=!0,e.delimiter=h.DefaultDelimiter),d.meta.delimiter=e.delimiter}var f=y(e)
return e.preview&&e.header&&f.preview++,t=r,i=new g(f),d=i.parse(t,s,a),c(),o?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return o},this.pause=function(){o=!0,i.abort(),t=t.substr(i.getCharIndex())},this.resume=function(){o=!1,s.streamer.parseChunk(t)},this.aborted=function(){return u},this.abort=function(){u=!0,i.abort(),d.meta.aborted=!0,w(e.complete)&&e.complete(d),t=""}}function g(e){var t=(e=e||{}).delimiter,i=e.newline,n=e.comments,r=e.step,s=e.preview,a=e.fastMode
if(void 0===e.quoteChar)var o='"'
else o=e.quoteChar
if(("string"!=typeof t||h.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),n===t)throw"Comment character same as delimiter"
!0===n?n="#":("string"!=typeof n||h.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!=i&&"\r"!=i&&"\r\n"!=i&&(i="\n")
var u=0,f=!1
this.parse=function(e,h,d){if("string"!=typeof e)throw"Input must be a string"
var l=e.length,c=t.length,p=i.length,_=n.length,g=w(r)
u=0
var m=[],v=[],k=[],y=0
if(!e)return D()
if(a||!1!==a&&-1===e.indexOf(o)){for(var b=e.split(i),C=0;C<b.length;C++){k=b[C]
if(u+=k.length,C!==b.length-1)u+=i.length
else if(d)return D()
if(!n||k.substr(0,_)!==n){if(g){if(m=[],O(k.split(t)),L(),f)return D()}else O(k.split(t))
if(s&&C>=s)return m=m.slice(0,s),D(!0)}}return D()}for(var R=e.indexOf(t,u),E=e.indexOf(i,u),S=new RegExp(o+o,"g");;)if(e[u]!==o)if(n&&0===k.length&&e.substr(u,_)===n){if(-1===E)return D()
u=E+p,E=e.indexOf(i,u),R=e.indexOf(t,u)}else if(-1!==R&&(R<E||-1===E))k.push(e.substring(u,R)),u=R+c,R=e.indexOf(t,u)
else{if(-1===E)break
if(k.push(e.substring(u,E)),T(E+p),g&&(L(),f))return D()
if(s&&m.length>=s)return D(!0)}else{var x=u
for(u++;;){if(-1===(x=e.indexOf(o,x+1)))return d||v.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:m.length,index:u}),I()
if(x===l-1)return I(e.substring(u,x).replace(S,o))
if(e[x+1]!==o){if(e[x+1]===t){k.push(e.substring(u,x).replace(S,o)),u=x+1+c,R=e.indexOf(t,u),E=e.indexOf(i,u)
break}if(e.substr(x+1,p)===i){if(k.push(e.substring(u,x).replace(S,o)),T(x+1+p),R=e.indexOf(t,u),g&&(L(),f))return D()
if(s&&m.length>=s)return D(!0)
break}v.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:m.length,index:u}),x++}else x++}}return I()
function O(e){m.push(e),y=u}function I(t){return d?D():(void 0===t&&(t=e.substr(u)),k.push(t),u=l,O(k),g&&L(),D())}function T(t){u=t,O(k),k=[],E=e.indexOf(i,u)}function D(e){return{data:m,errors:v,meta:{delimiter:t,linebreak:i,aborted:f,truncated:!!e,cursor:y+(h||0)}}}function L(){r(D()),m=[],v=[]}},this.abort=function(){f=!0},this.getCharIndex=function(){return u}}function m(e){var t=e.data,i=a[t.workerId],n=!1
if(t.error)i.userError(t.error,t.file)
else if(t.results&&t.results.data){var r={abort:function(){n=!0,v(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:k,resume:k}
if(w(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},r),!n);s++);delete t.results}else w(i.userChunk)&&(i.userChunk(t.results,r,t.file),delete t.results)}t.finished&&!n&&v(t.workerId,t.results)}function v(e,t){var i=a[e]
w(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function k(){throw"Not implemented."}function y(e){if("object"!=typeof e)return e
var t=e instanceof Array?[]:{}
for(var i in e)t[i]=y(e[i])
return t}function b(e,t){return function(){e.apply(t,arguments)}}function w(e){return"function"==typeof e}return r?i.onmessage=function(e){var t=e.data
void 0===h.WORKER_ID&&t&&(h.WORKER_ID=t.workerId)
if("string"==typeof t.input)i.postMessage({workerId:h.WORKER_ID,results:h.parse(t.input,t.config),finished:!0})
else if(i.File&&t.input instanceof File||t.input instanceof Object){var n=h.parse(t.input,t.config)
n&&i.postMessage({workerId:h.WORKER_ID,results:n,finished:!0})}}:h.WORKERS_SUPPORTED&&(t=document.getElementsByTagName("script"),e=t.length?t[t.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){s=!0},!0):s=!0),d.prototype=Object.create(f.prototype),d.prototype.constructor=d,l.prototype=Object.create(f.prototype),l.prototype.constructor=l,c.prototype=Object.create(c.prototype),c.prototype.constructor=c,p.prototype=Object.create(f.prototype),p.prototype.constructor=p,h})
