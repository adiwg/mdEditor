Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()}(this,function(){"use strict"
var e,t,i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==i?i:{},r=!i.document&&!!i.postMessage,n=r&&/(\?|&)papaworker(=|&|$)/.test(i.location.search),s=!1,a={},o=0,h={parse:function(t,r){var n=(r=r||{}).dynamicTyping||!1
R(n)&&(r.dynamicTypingFunction=n,n={})
if(r.dynamicTyping=n,r.transform=!!R(r.transform)&&r.transform,r.worker&&h.WORKERS_SUPPORTED){var u=function(){if(!h.WORKERS_SUPPORTED)return!1
if(!s&&null===h.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.")
var t=h.SCRIPT_PATH||e
t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker"
var r=new i.Worker(t)
return r.onmessage=v,r.id=o++,a[r.id]=r,r}()
return u.userStep=r.step,u.userChunk=r.chunk,u.userComplete=r.complete,u.userError=r.error,r.step=R(r.step),r.chunk=R(r.chunk),r.complete=R(r.complete),r.error=R(r.error),delete r.worker,void u.postMessage({input:t,config:r,workerId:u.id})}var f=null
if(t===h.NODE_STREAM_INPUT&&"undefined"==typeof PAPA_BROWSER_CONTEXT)return(f=new _(r)).getStream()
"string"==typeof t?f=r.download?new d(r):new c(r):!0===t.readable&&R(t.read)&&R(t.on)?f=new p(r):(i.File&&t instanceof File||t instanceof Object)&&(f=new l(r))
return f.stream(t)},unparse:function(e,t){var i=!1,r=!0,n=",",s="\r\n",a='"',o=!1;(function(){if("object"!=typeof t)return
"string"!=typeof t.delimiter||h.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(n=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes)
"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(o=t.skipEmptyLines)
"string"==typeof t.newline&&(s=t.newline)
"string"==typeof t.quoteChar&&(a=t.quoteChar)
"boolean"==typeof t.header&&(r=t.header)})()
var u=new RegExp(g(a),"g")
"string"==typeof e&&(e=JSON.parse(e))
if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return d(null,e,o)
if("object"==typeof e[0])return d(f(e[0]),e,o)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:f(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),d(e.fields||[],e.data||[],o)
throw"exception: Unable to serialize unrecognized input"
function f(e){if("object"!=typeof e)return[]
var t=[]
for(var i in e)t.push(i)
return t}function d(e,t,i){var a=""
"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t))
var o=Array.isArray(e)&&e.length>0,h=!Array.isArray(t[0])
if(o&&r){for(var u=0;u<e.length;u++)u>0&&(a+=n),a+=l(e[u],u)
t.length>0&&(a+=s)}for(var f=0;f<t.length;f++){var d=o?e.length:t[f].length,c=!1,p=o?0===Object.keys(t[f]).length:0===t[f].length
if(i&&!o&&(c="greedy"===i?""===t[f].join("").trim():1===t[f].length&&0===t[f][0].length),"greedy"===i&&o){for(var _=[],m=0;m<d;m++){var g=h?e[m]:m
_.push(t[f][g])}c=""===_.join("").trim()}if(!c){for(var y=0;y<d;y++){y>0&&!p&&(a+=n)
var v=o&&h?e[y]:y
a+=l(t[f][v],y)}f<t.length-1&&(!i||d>0&&!p)&&(a+=s)}}return a}function l(e,t){if(null==e)return""
if(e.constructor===Date)return JSON.stringify(e).slice(1,25)
e=e.toString().replace(u,a+a)
var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var i=0;i<t.length;i++)if(e.indexOf(t[i])>-1)return!0
return!1}(e,h.BAD_DELIMITERS)||e.indexOf(n)>-1||" "===e.charAt(0)||" "===e.charAt(e.length-1)
return r?a+e+a:e}}}
if(h.RECORD_SEP=String.fromCharCode(30),h.UNIT_SEP=String.fromCharCode(31),h.BYTE_ORDER_MARK="\ufeff",h.BAD_DELIMITERS=["\r","\n",'"',h.BYTE_ORDER_MARK],h.WORKERS_SUPPORTED=!r&&!!i.Worker,h.SCRIPT_PATH=null,h.NODE_STREAM_INPUT=1,h.LocalChunkSize=10485760,h.RemoteChunkSize=5242880,h.DefaultDelimiter=",",h.Parser=y,h.ParserHandle=m,h.NetworkStreamer=d,h.FileStreamer=l,h.StringStreamer=c,h.ReadableStreamStreamer=p,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(h.DuplexStreamStreamer=_),i.jQuery){var u=i.jQuery
u.fn.parse=function(e){var t=e.config||{},r=[]
return this.each(function(e){if(!("INPUT"===u(this).prop("tagName").toUpperCase()&&"file"===u(this).attr("type").toLowerCase()&&i.FileReader)||!this.files||0===this.files.length)return!0
for(var n=0;n<this.files.length;n++)r.push({file:this.files[n],inputElem:this,instanceConfig:u.extend({},t)})}),n(),this
function n(){if(0!==r.length){var t,i,n,a,o=r[0]
if(R(e.before)){var f=e.before(o.file,o.inputElem)
if("object"==typeof f){if("abort"===f.action)return t="AbortError",i=o.file,n=o.inputElem,a=f.reason,void(R(e.error)&&e.error({name:t},i,n,a))
if("skip"===f.action)return void s()
"object"==typeof f.config&&(o.instanceConfig=u.extend(o.instanceConfig,f.config))}else if("skip"===f)return void s()}var d=o.instanceConfig.complete
o.instanceConfig.complete=function(e){R(d)&&d(e,o.file,o.inputElem),s()},h.parse(o.file,o.instanceConfig)}else R(e.complete)&&e.complete()}function s(){r.splice(0,1),n()}}}function f(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e)
t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null)
this._handle=new m(t),this._handle.streamer=this,this._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&R(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e)
void 0!==r&&(e=r)}this.isFirstChunk=!1
var s=this._partialLine+e
this._partialLine=""
var a=this._handle.parse(s,this._baseIndex,!this._finished)
if(!this._handle.paused()&&!this._handle.aborted()){var o=a.meta.cursor
this._finished||(this._partialLine=s.substring(o-this._baseIndex),this._baseIndex=o),a&&a.data&&(this._rowCount+=a.data.length)
var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview
if(n)i.postMessage({results:a,workerId:h.WORKER_ID,finished:u})
else if(R(this._config.chunk)&&!t){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return
a=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!u||!R(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),u||a&&a.meta.paused||this._nextChunk(),a}},this._sendError=function(e){R(this._config.error)?this._config.error(e):n&&this._config.error&&i.postMessage({workerId:h.WORKER_ID,error:e,finished:!1})}}function d(e){var t;(e=e||{}).chunkSize||(e.chunkSize=h.RemoteChunkSize),f.call(this,e),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded()
else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),r||(t.onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)),t.open("GET",this._input,!r),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders
for(var i in e)t.setRequestHeader(i,e[i])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1
t.setRequestHeader("Range","bytes="+this._start+"-"+n),t.setRequestHeader("If-None-Match","webkit-no-cache")}try{t.send()}catch(s){this._chunkError(s.message)}r&&0===t.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range")
if(null===t)return-1
return parseInt(t.substr(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var i=t.statusText||e
this._sendError(new Error(i))}}function l(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=h.LocalChunkSize),f.call(this,e)
var r="undefined"!=typeof FileReader
this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=b(this._chunkLoaded,this),t.onerror=b(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input
if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size)
e=i.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding)
r||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function c(e){var t
e=e||{},f.call(this,e),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,i=e?t.substr(0,e):t
return t=e?t.substr(e):"",this._finished=!t,this.parseChunk(i)}}}function p(e){e=e||{},f.call(this,e)
var t=[],i=!0,r=!1
this.pause=function(){f.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){f.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=b(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(r){this._streamError(r)}},this),this._streamError=b(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=b(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=b(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function _(e){var t=require("stream").Duplex,i=E(e),r=!0,n=!1,s=[],a=null
this._onCsvData=function(e){for(var t=e.data,i=0;i<t.length;i++)a.push(t[i])||this._handle.paused()||this._handle.pause()},this._onCsvComplete=function(){a.push(null)},i.step=b(this._onCsvData,this),i.complete=b(this._onCsvComplete,this),f.call(this,i),this._nextChunk=function(){n&&1===s.length&&(this._finished=!0),s.length?s.shift()():r=!0},this._addToParseQueue=function(e,t){s.push(b(function(){if(this.parseChunk("string"==typeof e?e:e.toString(i.encoding)),R(t))return t()},this)),r&&(r=!1,this._nextChunk())},this._onRead=function(){this._handle.paused()&&this._handle.resume()},this._onWrite=function(e,t,i){this._addToParseQueue(e,i)},this._onWriteComplete=function(){n=!0,this._addToParseQueue("")},this.getStream=function(){return a},(a=new t({readableObjectMode:!0,decodeStrings:!1,read:b(this._onRead,this),write:b(this._onWrite,this)})).once("finish",b(this._onWriteComplete,this))}function m(e){var t,i,r,n=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,s=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,a=this,o=0,u=0,f=!1,d=!1,l=[],c={data:[],errors:[],meta:{}}
if(R(e.step)){var p=e.step
e.step=function(t){if(c=t,v())m()
else{if(m(),0===c.data.length)return
o+=t.data.length,e.preview&&o>e.preview?i.abort():p(c,a)}}}function _(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function m(){if(c&&r&&(C("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+h.DefaultDelimiter+"'"),r=!1),e.skipEmptyLines)for(var t=0;t<c.data.length;t++)_(c.data[t])&&c.data.splice(t--,1)
return v()&&function(){if(!c)return
for(var t=0;v()&&t<c.data.length;t++)for(var i=0;i<c.data[t].length;i++){var r=c.data[t][i]
e.trimHeaders&&(r=r.trim()),l.push(r)}c.data.splice(0,1)}(),function(){if(!c||!e.header&&!e.dynamicTyping&&!e.transform)return c
for(var t=0;t<c.data.length;t++){var i,r=e.header?{}:[]
for(i=0;i<c.data[t].length;i++){var n=i,s=c.data[t][i]
e.header&&(n=i>=l.length?"__parsed_extra":l[i]),e.transform&&(s=e.transform(s,n)),s=k(n,s),"__parsed_extra"===n?(r[n]=r[n]||[],r[n].push(s)):r[n]=s}c.data[t]=r,e.header&&(i>l.length?C("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+i,u+t):i<l.length&&C("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+i,u+t))}e.header&&c.meta&&(c.meta.fields=l)
return u+=c.data.length,c}()}function v(){return e.header&&0===l.length}function k(t,i){return function(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}(t)?"true"===i||"TRUE"===i||"false"!==i&&"FALSE"!==i&&(n.test(i)?parseFloat(i):s.test(i)?new Date(i):""===i?null:i):i}function C(e,t,i,r){c.errors.push({type:e,code:t,message:i,row:r})}this.parse=function(n,s,a){var o=e.quoteChar||'"'
if(e.newline||(e.newline=function(e,t){e=e.substr(0,1048576)
var i=new RegExp(g(t)+"([^]*?)"+g(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n"),s=n.length>1&&n[0].length<r[0].length
if(1===r.length||s)return"\n"
for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++
return a>=r.length/2?"\r\n":"\r"}(n,o)),r=!1,e.delimiter)R(e.delimiter)&&(e.delimiter=e.delimiter(n),c.meta.delimiter=e.delimiter)
else{var u=function(t,i,r,n){for(var s,a,o,u=[",","\t","|",";",h.RECORD_SEP,h.UNIT_SEP],f=0;f<u.length;f++){var d=u[f],l=0,c=0,p=0
o=void 0
for(var m=new y({comments:n,delimiter:d,newline:i,preview:10}).parse(t),g=0;g<m.data.length;g++)if(r&&_(m.data[g]))p++
else{var v=m.data[g].length
c+=v,void 0!==o?v>1&&(l+=Math.abs(v-o),o=v):o=0}m.data.length>0&&(c/=m.data.length-p),(void 0===a||l>a)&&c>1.99&&(a=l,s=d)}return e.delimiter=s,{successful:!!s,bestDelimiter:s}}(n,e.newline,e.skipEmptyLines,e.comments)
u.successful?e.delimiter=u.bestDelimiter:(r=!0,e.delimiter=h.DefaultDelimiter),c.meta.delimiter=e.delimiter}var d=E(e)
return e.preview&&e.header&&d.preview++,t=n,i=new y(d),c=i.parse(t,s,a),m(),f?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return f},this.pause=function(){f=!0,i.abort(),t=t.substr(i.getCharIndex())},this.resume=function(){f=!1,a.streamer.parseChunk(t,!0)},this.aborted=function(){return d},this.abort=function(){d=!0,i.abort(),c.meta.aborted=!0,R(e.complete)&&e.complete(c),t=""}}function g(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function y(e){var t,i=(e=e||{}).delimiter,r=e.newline,n=e.comments,s=e.step,a=e.preview,o=e.fastMode,u=t=void 0===e.quoteChar?'"':e.quoteChar
if(void 0!==e.escapeChar&&(u=e.escapeChar),("string"!=typeof i||h.BAD_DELIMITERS.indexOf(i)>-1)&&(i=","),n===i)throw"Comment character same as delimiter"
!0===n?n="#":("string"!=typeof n||h.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n")
var f=0,d=!1
this.parse=function(e,h,l){if("string"!=typeof e)throw"Input must be a string"
var c=e.length,p=i.length,_=r.length,m=n.length,y=R(s)
f=0
var v=[],k=[],C=[],E=0
if(!e)return M()
if(o||!1!==o&&-1===e.indexOf(t)){for(var b=e.split(r),w=0;w<b.length;w++){if(C=b[w],f+=C.length,w!==b.length-1)f+=r.length
else if(l)return M()
if(!n||C.substr(0,m)!==n){if(y){if(v=[],D(C.split(i)),j(),d)return M()}else D(C.split(i))
if(a&&w>=a)return v=v.slice(0,a),M(!0)}}return M()}for(var S,O=e.indexOf(i,f),T=e.indexOf(r,f),x=new RegExp(g(u)+g(t),"g");;)if(e[f]!==t)if(n&&0===C.length&&e.substr(f,m)===n){if(-1===T)return M()
f=T+_,T=e.indexOf(r,f),O=e.indexOf(i,f)}else if(-1!==O&&(O<T||-1===T))C.push(e.substring(f,O)),f=O+p,O=e.indexOf(i,f)
else{if(-1===T)break
if(C.push(e.substring(f,T)),F(T+_),y&&(j(),d))return M()
if(a&&v.length>=a)return M(!0)}else for(S=f,f++;;){if(-1===(S=e.indexOf(t,S+1)))return l||k.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:v.length,index:f}),L()
if(S===c-1)return L(e.substring(f,S).replace(x,t))
if(t!==u||e[S+1]!==u){if(t===u||0===S||e[S-1]!==u){var A=P(-1===T?O:Math.min(O,T))
if(e[S+1+A]===i){C.push(e.substring(f,S).replace(x,t)),f=S+1+A+p,O=e.indexOf(i,f),T=e.indexOf(r,f)
break}var I=P(T)
if(e.substr(S+1+I,_)===r){if(C.push(e.substring(f,S).replace(x,t)),F(S+1+I+_),O=e.indexOf(i,f),y&&(j(),d))return M()
if(a&&v.length>=a)return M(!0)
break}k.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:v.length,index:f}),S++}}else S++}return L()
function D(e){v.push(e),E=f}function P(t){var i=0
if(-1!==t){var r=e.substring(S+1,t)
r&&""===r.trim()&&(i=r.length)}return i}function L(t){return l?M():(void 0===t&&(t=e.substr(f)),C.push(t),f=c,D(C),y&&j(),M())}function F(t){f=t,D(C),C=[],T=e.indexOf(r,f)}function M(e){return{data:v,errors:k,meta:{delimiter:i,linebreak:r,aborted:d,truncated:!!e,cursor:E+(h||0)}}}function j(){s(M()),v=[],k=[]}},this.abort=function(){d=!0},this.getCharIndex=function(){return f}}function v(e){var t=e.data,i=a[t.workerId],r=!1
if(t.error)i.userError(t.error,t.file)
else if(t.results&&t.results.data){var n={abort:function(){r=!0,k(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:C,resume:C}
if(R(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results}else R(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!r&&k(t.workerId,t.results)}function k(e,t){var i=a[e]
R(i.userComplete)&&i.userComplete(t),i.terminate(),delete a[e]}function C(){throw"Not implemented."}function E(e){if("object"!=typeof e||null===e)return e
var t=Array.isArray(e)?[]:{}
for(var i in e)t[i]=E(e[i])
return t}function b(e,t){return function(){e.apply(t,arguments)}}function R(e){return"function"==typeof e}return n?i.onmessage=function(e){var t=e.data
void 0===h.WORKER_ID&&t&&(h.WORKER_ID=t.workerId)
if("string"==typeof t.input)i.postMessage({workerId:h.WORKER_ID,results:h.parse(t.input,t.config),finished:!0})
else if(i.File&&t.input instanceof File||t.input instanceof Object){var r=h.parse(t.input,t.config)
r&&i.postMessage({workerId:h.WORKER_ID,results:r,finished:!0})}}:h.WORKERS_SUPPORTED&&(t=document.getElementsByTagName("script"),e=t.length?t[t.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){s=!0},!0):s=!0),d.prototype=Object.create(f.prototype),d.prototype.constructor=d,l.prototype=Object.create(f.prototype),l.prototype.constructor=l,c.prototype=Object.create(c.prototype),c.prototype.constructor=c,p.prototype=Object.create(f.prototype),p.prototype.constructor=p,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(_.prototype=Object.create(f.prototype),_.prototype.constructor=_),h})
