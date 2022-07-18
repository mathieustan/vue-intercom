/*!
 * Vue-intercom v0.0.9
 * (c) 2019-2022 Mathieu Stanowski
 */
import t from"vue";var e=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t};var n=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r};var r=function(t){if(Array.isArray(t))return n(t)};var o=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)};var i=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}};var a=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var c=function(t){return r(t)||o(t)||i(t)||a()};var u=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f=function(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),t};function l(t,e){return t(e={exports:{}},e.exports),e.exports}var h=l((function(t){function e(n,r){return t.exports=e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},e(n,r)}t.exports=e}));var p=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)},v=l((function(t){function e(n){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=e=function(t){return typeof t}:t.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(n)}t.exports=e}));var y=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};var d=function(t,e){return!e||"object"!==v(e)&&"function"!=typeof e?y(t):e},m=l((function(t){function e(n){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},e(n)}t.exports=e}));function g(){}function w(){w.init.call(this)}function b(t){return void 0===t._maxListeners?w.defaultMaxListeners:t._maxListeners}function _(t,e,n){if(e)t.call(n);else for(var r=t.length,o=P(t,r),i=0;i<r;++i)o[i].call(n)}function L(t,e,n,r){if(e)t.call(n,r);else for(var o=t.length,i=P(t,o),a=0;a<o;++a)i[a].call(n,r)}function x(t,e,n,r,o){if(e)t.call(n,r,o);else for(var i=t.length,a=P(t,i),c=0;c<i;++c)a[c].call(n,r,o)}function O(t,e,n,r,o,i){if(e)t.call(n,r,o,i);else for(var a=t.length,c=P(t,a),u=0;u<a;++u)c[u].call(n,r,o,i)}function E(t,e,n,r){if(e)t.apply(n,r);else for(var o=t.length,i=P(t,o),a=0;a<o;++a)i[a].apply(n,r)}function j(t,e,n,r){var o,i,a,c;if("function"!=typeof n)throw new TypeError('"listener" argument must be a function');if((i=t._events)?(i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),a=i[e]):(i=t._events=new g,t._eventsCount=0),a){if("function"==typeof a?a=i[e]=r?[n,a]:[a,n]:r?a.unshift(n):a.push(n),!a.warned&&(o=b(t))&&o>0&&a.length>o){a.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+e+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=a.length,c=u,"function"==typeof console.warn?console.warn(c):console.log(c)}}else a=i[e]=n,++t._eventsCount;return t}function I(t,e,n){var r=!1;function o(){t.removeListener(e,o),r||(r=!0,n.apply(t,arguments))}return o.listener=n,o}function k(t){var e=this._events;if(e){var n=e[t];if("function"==typeof n)return 1;if(n)return n.length}return 0}function P(t,e){for(var n=new Array(e);e--;)n[e]=t[e];return n}function S(t,e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://widget.intercom.io/widget/".concat(t),n.onload=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)}function A(t,e){return!(!e||0===e.length)&&(e instanceof t||null!=e&&e.constructor===t)}function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=m(t);if(e){var o=m(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return d(this,n)}}g.prototype=Object.create(null),w.EventEmitter=w,w.usingDomains=!1,w.prototype.domain=void 0,w.prototype._events=void 0,w.prototype._maxListeners=void 0,w.defaultMaxListeners=10,w.init=function(){this.domain=null,w.usingDomains&&(void 0).active,this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new g,this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},w.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||isNaN(t))throw new TypeError('"n" argument must be a positive number');return this._maxListeners=t,this},w.prototype.getMaxListeners=function(){return b(this)},w.prototype.emit=function(t){var e,n,r,o,i,a,c,u=arguments,s="error"===t;if(a=this._events)s=s&&null==a.error;else if(!s)return!1;if(c=this.domain,s){if(e=arguments[1],!c){if(e instanceof Error)throw e;var f=new Error('Uncaught, unspecified "error" event. ('+e+")");throw f.context=e,f}return e||(e=new Error('Uncaught, unspecified "error" event')),e.domainEmitter=this,e.domain=c,e.domainThrown=!1,c.emit("error",e),!1}if(!(n=a[t]))return!1;var l="function"==typeof n;switch(r=arguments.length){case 1:_(n,l,this);break;case 2:L(n,l,this,arguments[1]);break;case 3:x(n,l,this,arguments[1],arguments[2]);break;case 4:O(n,l,this,arguments[1],arguments[2],arguments[3]);break;default:for(o=new Array(r-1),i=1;i<r;i++)o[i-1]=u[i];E(n,l,this,o)}return!0},w.prototype.addListener=function(t,e){return j(this,t,e,!1)},w.prototype.on=w.prototype.addListener,w.prototype.prependListener=function(t,e){return j(this,t,e,!0)},w.prototype.once=function(t,e){if("function"!=typeof e)throw new TypeError('"listener" argument must be a function');return this.on(t,I(this,t,e)),this},w.prototype.prependOnceListener=function(t,e){if("function"!=typeof e)throw new TypeError('"listener" argument must be a function');return this.prependListener(t,I(this,t,e)),this},w.prototype.removeListener=function(t,e){var n,r,o,i,a;if("function"!=typeof e)throw new TypeError('"listener" argument must be a function');if(!(r=this._events))return this;if(!(n=r[t]))return this;if(n===e||n.listener&&n.listener===e)0==--this._eventsCount?this._events=new g:(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(o=-1,i=n.length;i-- >0;)if(n[i]===e||n[i].listener&&n[i].listener===e){a=n[i].listener,o=i;break}if(o<0)return this;if(1===n.length){if(n[0]=void 0,0==--this._eventsCount)return this._events=new g,this;delete r[t]}else!function(t,e){for(var n=e,r=n+1,o=t.length;r<o;n+=1,r+=1)t[n]=t[r];t.pop()}(n,o);r.removeListener&&this.emit("removeListener",t,a||e)}return this},w.prototype.removeAllListeners=function(t){var e,n;if(!(n=this._events))return this;if(!n.removeListener)return 0===arguments.length?(this._events=new g,this._eventsCount=0):n[t]&&(0==--this._eventsCount?this._events=new g:delete n[t]),this;if(0===arguments.length){for(var r,o=Object.keys(n),i=0;i<o.length;++i)"removeListener"!==(r=o[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=new g,this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(e)do{this.removeListener(t,e[e.length-1])}while(e[0]);return this},w.prototype.listeners=function(t){var e,n=this._events;return n&&(e=n[t])?"function"==typeof e?[e.listener||e]:function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(e):[]},w.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):k.call(t,e)},w.prototype.listenerCount=k,w.prototype.eventNames=function(){return this._eventsCount>0?Reflect.ownKeys(this._events):[]};var T=function(t){p(n,w);var e=C(n);function n(){var t,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=r.appId;return u(this,n),t=e.call(this),A(String,o)?(t.appId=o,t.defaultOptions={app_id:o},t.ready=!1,t.isBooted=!1,t.visible=!1,t.unreadCount=0,t.load(),t):d(t)}return f(n,[{key:"load",value:function(){var t=this;if(window&&document){var e=function(){return S(t.appId,(function(){return t.init()}))};"complete"===document.readyState?S(this.appId,(function(){return t.init()})):window.attachEvent?window.attachEvent("onload",e):window.addEventListener("load",e,!1)}}},{key:"init",value:function(){var t=this;this.ready=!0,this.callIntercom("onHide",(function(){return t.visible=!1})),this.callIntercom("onShow",(function(){return t.visible=!0})),this.callIntercom("onUnreadCountChange",(function(e){return t.unreadCount=e})),this.emit("ready")}},{key:"boot",value:function(t){this.callIntercom("boot",Object.assign({},this.defaultOptions,t)),this.isBooted=!0}},{key:"callIntercom",value:function(){var t;if(window.Intercom)return(t=window).Intercom.apply(t,arguments)}},{key:"shutdown",value:function(){this.isBooted=!1,this.callIntercom("shutdown")}},{key:"update",value:function(){for(var t=arguments,e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=t[r];this.callIntercom.apply(this,["update"].concat(n))}},{key:"show",value:function(){this.callIntercom("show")}},{key:"hide",value:function(){this.callIntercom("hide")}},{key:"showMessages",value:function(){this.callIntercom("showMessages")}},{key:"showNewMessage",value:function(t){this.callIntercom.apply(this,["showNewMessage"].concat(c(A(String,t)?[t]:[])))}},{key:"trackEvent",value:function(t){for(var e=arguments,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=e[o];this.callIntercom.apply(this,["trackEvent"].concat([t].concat(r)))}},{key:"startTour",value:function(t){for(var e=arguments,n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=e[o];this.callIntercom.apply(this,["startTour"].concat([t].concat(r)))}},{key:"getVisitorId",value:function(){this.callIntercom("getVisitorId")}}]),n}(),$=l((function(t){var e=function(t){var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof l?e:l,i=Object.create(o.prototype),a=new x(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return E()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=b(a,n);if(c){if(c===f)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,a),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var f={};function l(){}function h(){}function p(){}var v={};v[o]=function(){return this};var y=Object.getPrototypeOf,d=y&&y(y(O([])));d&&d!==e&&n.call(d,o)&&(v=d);var m=p.prototype=l.prototype=Object.create(v);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){var r;this._invoke=function(o,i){function a(){return new e((function(r,a){!function r(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var f=u.arg,l=f.value;return l&&"object"==typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}(o,i,r,a)}))}return r=r?r.then(a,a):a()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return f;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,f;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function O(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:E}}function E(){return{value:void 0,done:!0}}return h.prototype=m.constructor=p,p.constructor=h,h.displayName=c(p,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),w.prototype[i]=function(){return this},t.AsyncIterator=w,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new w(u(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),m[o]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),f}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}));function N(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}var M=function(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){N(i,r,o,a,c,"next",t)}function c(t){N(i,r,o,a,c,"throw",t)}a(void 0)}))}};function R(t){var e=t.message,n=t.vm;if(n){if(n.$_alreadyWarned=n.$_alreadyWarned||[],n.$_alreadyWarned.includes(e))return;n.$_alreadyWarned.push(e)}return"[VueIntercom] ".concat(e)+(n?function(t){if(t._isVue&&t.$parent){for(var e=[],n=0;t;){if(e.length>0){var r=e[e.length-1];if(r.constructor===t.constructor){n++,t=t.$parent;continue}n>0&&(e[e.length-1]=[r,n],n=0)}e.push(t),t=t.$parent}return"\n\nfound in\n\n"+e.map((function(t,e){return"".concat(0===e?"---\x3e ":" ".repeat(5+2*e)).concat(Array.isArray(t)?"".concat(F(t[0]),"... (").concat(t[1]," recursive calls)"):F(t))})).join("\n")}return"\n\n(found in ".concat(F(t),")")}(n):"")}function D(t,e){var n=R({message:t,vm:e});null!=n&&console.warn(n)}function G(t,e){var n=R({message:t,vm:e});null!=n&&console.error(n)}var V=/(?:^|[-_])(\w)/g;function F(t,e){if(t.$root===t)return"<Root>";var n="function"==typeof t&&null!=t.cid?t.options:t._isVue?t.$options||t.constructor.options:t||{},r=n.name||n._componentTag,o=n.__file;if(!r&&o){var i=o.match(/([^/\\]+)\.vue$/);r=i&&i[1]}return(r?"<".concat(r.replace(V,(function(t){return t.toUpperCase()})).replace(/[-_]/g,""),">"):"<Anonymous>")+(o&&!1!==e?" at ".concat(o):"")}var U=!1;var B={version:"0.0.9",install:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t!==e&&G("Multiple instances of Vue detected.");var r=n.appId;if(A(String,r)){var o,i=new T({appId:r});e.mixin({beforeCreate:(o=M($.mark((function t(){var n;return $.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!U){t.next=2;break}return t.abrupt("return");case 2:"function"==typeof window.Intercom?(this.$intercom.init(),this.$intercom.callIntercom("reattach_activator"),this.$intercom.update()):((n=function t(){for(var e=arguments,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=e[o];return t.c(r)}).q=[],n.c=function(t){return n.q.push(t)},window.Intercom=n,this.$intercom=e.observable(i),e.prototype.$intercom=this.$intercom),U=!0;case 4:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})})}else D("You didn't specified Intercom appId. Please check your configuration.")}};function W(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var Y=B.install;B.install=function(t,n){Y.call(B,t,function(t){for(var n=arguments,r=1;r<arguments.length;r++){var o=null!=n[r]?n[r]:{};r%2?W(Object(o),!0).forEach((function(n){e(t,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):W(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({},n))},"undefined"!=typeof window&&window.Vue&&window.Vue.use(B);export default B;export{T as Intercom};
