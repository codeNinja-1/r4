// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2dF6g":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "9f580d93290ff52d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aRF0v":[function(require,module,exports) {
var _joinScreenJs = require("../view/join-screen/join-screen.js");
var _clientJs = require("./client.js");
const joinScreen = new (0, _joinScreenJs.JoinScreen)();
document.body.appendChild(joinScreen.element);
const nickname = await joinScreen.whenJoined();
document.body.removeChild(joinScreen.element);
const client = new (0, _clientJs.Client)();
document.body.appendChild(client.element);
client.init();
client.join(nickname);

},{"../view/join-screen/join-screen.js":"4yPGx","./client.js":"e8eY8"}],"4yPGx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "JoinScreen", ()=>JoinScreen);
var _componentJs = require("../component.js");
var _domJs = require("../dom.js");
class JoinScreen extends (0, _componentJs.Component) {
    _element;
    _nickname = null;
    _listeners = [];
    render() {
        const joinScreen = (0, _domJs.DOM).element("div", "cubecraft-join-screen", "cubecraft-screen");
        joinScreen.appendChild((0, _domJs.DOM).element("div", "cubecraft-flex-3"));
        const joinScreenTitle = (0, _domJs.DOM).element("img", "cubecraft-join-screen-title");
        joinScreenTitle.src = "../assets/textures/joinscreen/title.png";
        joinScreen.appendChild(joinScreenTitle);
        joinScreen.appendChild((0, _domJs.DOM).element("div", "cubecraft-flex-1"));
        const optionsWrapper = (0, _domJs.DOM).element("div", "cubecraft-join-options-wrapper");
        const joinOptions = (0, _domJs.DOM).element("div", "cubecraft-join-options");
        const nameInput = (0, _domJs.DOM).element("input", "cubecraft-textbox-thick", "cubecraft-join-options-textbox");
        nameInput.placeholder = `Enter a nickname`;
        joinOptions.appendChild(nameInput);
        const joinScreenButton = (0, _domJs.DOM).element("div", "cubecraft-button-thick", "cubecraft-join-options-button");
        joinScreenButton.textContent = "Join";
        joinOptions.appendChild(joinScreenButton);
        optionsWrapper.appendChild(joinOptions);
        joinScreen.appendChild(optionsWrapper);
        joinScreen.appendChild((0, _domJs.DOM).element("div", "cubecraft-flex-3"));
        const resolve = ()=>{
            this._nickname = nameInput.value;
            for (const listener of this._listeners)listener();
        };
        joinScreenButton.addEventListener("click", ()=>{
            resolve();
        });
        nameInput.addEventListener("keydown", (event)=>{
            if (event.key === "Enter") resolve();
        });
        return joinScreen;
    }
    whenJoined() {
        return new Promise((resolve, reject)=>{
            if (this._nickname) resolve(this._nickname);
            else this._listeners.push(()=>{
                resolve(this._nickname);
            });
        });
    }
}

},{"../component.js":"90Lqu","../dom.js":"hStJX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"90Lqu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Component", ()=>Component);
class Component {
    parent;
    constructor(){
        this.parent = null;
    }
    bind(child) {
        child.parent = this;
    }
    get element() {
        if (this._element) return this._element;
        this._element = this.render();
        return this._element;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"hStJX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DOM", ()=>DOM);
var DOM;
(function(DOM) {
    function element(tag, ...classes) {
        let element1 = document.createElement(tag);
        element1.classList.add(...classes);
        return element1;
    }
    DOM.element = element;
    function text(data) {
        return document.createTextNode(data);
    }
    DOM.text = text;
})(DOM || (DOM = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e8eY8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Client", ()=>Client);
var _rendererJs = require("../render/renderer.js");
var _componentJs = require("../view/component.js");
var _domJs = require("../view/dom.js");
var _worldJs = require("../world/world.js");
class Client extends (0, _componentJs.Component) {
    _element;
    renderer;
    world;
    constructor(){
        super();
        this.world = new (0, _worldJs.World)();
        this.element;
    }
    init() {}
    render() {
        const client = (0, _domJs.DOM).element("div", "cubecraft-client", "cubecraft-layers", "cubecraft-screen");
        const canvas = (0, _domJs.DOM).element("canvas", "cubecraft-client-canvas");
        this.renderer = new (0, _rendererJs.Renderer)(this.world, canvas);
        client.appendChild(canvas);
        return client;
    }
}

},{"../view/dom.js":"hStJX","../world/world.js":"8482s","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../render/renderer.js":"dWDik","../view/component.js":"90Lqu"}],"8482s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "World", ()=>World);
var _immutableVector2DJs = require("../utils/vector2d/immutable-vector2d.js");
var _vector2DJs = require("../utils/vector2d/vector2d.js");
var _chunkDataAllocatorJs = require("./chunk-data/chunk-data-allocator.js");
var _chunkDataReferencerJs = require("./chunk-data/chunk-data-referencer.js");
var _chunkJs = require("./chunk.js");
class World {
    chunkSize = {
        chunkWidth: 16,
        chunkHeight: 64,
        chunkDepth: 16
    };
    _entityIdMapping;
    _chunks;
    _chunkDataOptions;
    constructor(){
        this._entityIdMapping = new Map();
        this._chunks = new Map();
    }
    createAllocator() {
        const referencer = new (0, _chunkDataReferencerJs.ChunkDataReferencer)(this.chunkSize);
        const allocator = new (0, _chunkDataAllocatorJs.ChunkDataAllocator)({
            referencer
        });
        return allocator;
    }
    useAllocation(allocator) {
        this._chunkDataOptions = allocator.generateOptions();
    }
    createChunk(x, z) {
        if (x instanceof (0, _vector2DJs.Vector2D)) {
            z = x.y;
            x = x.x;
        }
        const chunk = new (0, _chunkJs.Chunk)();
        chunk.world = this;
        chunk.position = new (0, _immutableVector2DJs.ImmutableVector2D)(x, z);
        chunk._setup();
        return chunk;
    }
    getChunk(x, z) {
        if (x instanceof (0, _vector2DJs.Vector2D)) {
            z = x.y;
            x = x.x;
        }
        return this._chunks.get(x + "." + z) || null;
    }
    addEntity(entity) {
        this._entityIdMapping.set(entity.id, entity);
        const chunk = this.getChunk(Math.floor(entity.position.x / this.chunkSize.chunkWidth), Math.floor(entity.position.z / this.chunkSize.chunkDepth));
        if (!chunk) throw new Error("Cannot add entity to world: Chunk does not exist");
        chunk._entities.add(entity);
        entity._joinWorld(this);
        entity._updateCurrentChunk(chunk);
        return entity;
    }
    removeEntity(entity) {
        entity._leaveWorld();
        this._entityIdMapping.delete(entity.id);
    }
}

},{"../utils/vector2d/immutable-vector2d.js":"amSYV","../utils/vector2d/vector2d.js":"jVV5b","./chunk-data/chunk-data-allocator.js":"5TrZk","./chunk-data/chunk-data-referencer.js":"33CVl","./chunk.js":"9FKMj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"amSYV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ImmutableVector2D", ()=>ImmutableVector2D);
var _vector2DJs = require("./vector2d.js");
class ImmutableVector2D extends (0, _vector2DJs.Vector2D) {
    constructor(x = 0, y = 0){
        super(x, y);
    }
    _set(x, y) {
        return new ImmutableVector2D(x, y);
    }
    set(x, y) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new ImmutableVector2D(...(0, _vector2DJs.Vector2D)._from(vector, format));
    }
}

},{"./vector2d.js":"jVV5b","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jVV5b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vector2D", ()=>Vector2D);
class Vector2D {
    x;
    y;
    constructor(x = 0, y = 0){
        if (typeof x !== "number") throw new TypeError("x must be a number");
        if (typeof y !== "number") throw new TypeError("y must be a number");
        if (isNaN(x)) throw new TypeError("x must not be NaN");
        if (isNaN(y)) throw new TypeError("y must not be NaN");
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x + x, this.y + y);
            else return this._set(this.x + x, this.y + x);
        } else return this._set(this.x + x.x, this.y + x.y);
    }
    subtract(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x - x, this.y - y);
            else return this._set(this.x - x, this.y - x);
        } else return this._set(this.x - x.x, this.y - x.y);
    }
    reverseSubtract(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x - this.x, y - this.y);
            else return this._set(x - this.x, x - this.y);
        } else return this._set(x.x - this.x, x.y - this.y);
    }
    complexMultiply(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x - this.y * y, this.x * y + this.y * x);
            else return this._set(this.x * x, this.y * x);
        } else return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x);
    }
    scalarMultiply(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x, this.y * y);
            else return this._set(this.x * x, this.y * x);
        } else return this._set(this.x * x.x, this.y * x.y);
    }
    scalarDivide(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x / x, this.y / y);
            else return this._set(this.x / x, this.y / x);
        } else return this._set(this.x / x.x, this.y / x.y);
    }
    reverseScalarDivide(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x / this.x, y / this.y);
            else return this._set(x / this.x, x / this.y);
        } else return this._set(x.x / this.x, x.y / this.y);
    }
    dot(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this.x * x + this.y * y;
            else return this.x * x + this.y * x;
        } else return this.x * x.x + this.y * x.y;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return Math.sqrt(this.distanceSquaredTo(x, y));
            else return Math.sqrt(this.distanceSquaredTo(x, x));
        } else return Math.sqrt(this.distanceSquaredTo(x.x, x.y));
    }
    distanceSquaredTo(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
            else return (this.x - x) * (this.x - x) + (this.y - x) * (this.y - x);
        } else return (this.x - x.x) * (this.x - x.x) + (this.y - x.y) * (this.y - x.y);
    }
    normalize() {
        return this.scalarDivide(this.length());
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    static *_from(vector, format) {
        yield format[0] == "x" ? vector.x : format[0] == "y" ? vector.y : format[0] == "z" ? vector.z : format[0] == "1" ? 1 : 0;
        yield format[1] == "x" ? vector.x : format[1] == "y" ? vector.y : format[1] == "z" ? vector.z : format[1] == "1" ? 1 : 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5TrZk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataAllocator", ()=>ChunkDataAllocator);
class ChunkDataAllocator {
    _referencer;
    _bitCount;
    _attributeCount;
    _buffers;
    _fields;
    _generatedOptions;
    constructor({ referencer }){
        this._referencer = referencer;
        this._bitCount = 0;
        this._attributeCount = 0;
        this._buffers = [];
        this._fields = [];
        this._generatedOptions = null;
    }
    allocate(type, label = "") {
        if (type == "b") {
            let index = this._bitCount++;
            this._fields.push({
                type: "b",
                index,
                label
            });
            return index;
        } else if (type == "a") {
            let index = this._attributeCount++;
            this._fields.push({
                type: "a",
                index: label || index,
                label: label || index.toString()
            });
            return label || index;
        } else {
            const index = this._buffers.length;
            this._buffers.push({
                type,
                label
            });
            this._fields.push({
                type,
                index,
                label
            });
            return index;
        }
    }
    generateOptions() {
        if (this._generatedOptions) return this._generatedOptions;
        this._generatedOptions = {
            bits: null,
            map: null,
            buffers: [],
            fields: this._fields
        };
        if (this._bitCount > 0) this._generatedOptions.bits = {
            count: this._bitCount,
            referencer: this._referencer
        };
        if (this._attributeCount > 0) this._generatedOptions.map = {
            referencer: this._referencer
        };
        for (const buffer of this._buffers)this._generatedOptions.buffers.push({
            type: buffer.type,
            label: buffer.label,
            referencer: this._referencer
        });
        return this._generatedOptions;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"33CVl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataReferencer", ()=>ChunkDataReferencer);
class ChunkDataReferencer {
    _chunkWidth;
    _chunkHeight;
    _chunkDepth;
    constructor({ chunkWidth = 16, chunkHeight = 16, chunkDepth = 32 } = {}){
        this._chunkWidth = chunkWidth;
        this._chunkHeight = chunkHeight;
        this._chunkDepth = chunkDepth;
    }
    get cellsInChunk() {
        return this._chunkWidth * this._chunkHeight * this._chunkDepth;
    }
    indexOfPosition(x, y, z) {
        if (x < 0 || x >= this._chunkWidth) throw new Error(`Coordinate X in chunk is out of bounds: 0 ≤ ${x} < ${this._chunkWidth}`);
        if (y < 0 || y >= this._chunkHeight) throw new Error(`Coordinate Y in chunk is out of bounds: 0 ≤ ${y} < ${this._chunkHeight}`);
        if (z < 0 || z >= this._chunkDepth) throw new Error(`Coordinate Z in chunk is out of bounds: 0 ≤ ${z} < ${this._chunkDepth}`);
        return x + y * this._chunkWidth + z * this._chunkWidth * this._chunkHeight;
    }
    xOfIndex(index) {
        return index % this._chunkWidth;
    }
    yOfIndex(index) {
        return Math.floor(index / this._chunkWidth) % this._chunkHeight;
    }
    zOfIndex(index) {
        return Math.floor(index / (this._chunkWidth * this._chunkHeight));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9FKMj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Chunk", ()=>Chunk);
var _chunkDataBitsJs = require("./chunk-data/chunk-data-bits.js");
var _chunkDataBufferJs = require("./chunk-data/chunk-data-buffer.js");
var _chunkDataFieldJs = require("./chunk-data/chunk-data-field.js");
var _chunkDataMapJs = require("./chunk-data/chunk-data-map.js");
class Chunk {
    world;
    position;
    _entities;
    _bits;
    _buffers;
    _map;
    _fields;
    constructor(){
        this.world = null;
        this.position = null;
        this._entities = new Set();
        this._bits = null;
        this._buffers = [];
        this._map = null;
        this._fields = new Map();
    }
    _unload() {
        for (const entity of this._entities)this.world._entityIdMapping.delete(entity.id);
    }
    _setup() {
        const { bits, buffers, map, fields } = this.world._chunkDataOptions;
        if (bits) this._bits = new (0, _chunkDataBitsJs.ChunkDataBits)(bits);
        if (map) this._map = new (0, _chunkDataMapJs.ChunkDataMap)(map);
        for (const buffer of buffers)this._buffers.push(new (0, _chunkDataBufferJs.ChunkDataBuffer)(buffer));
        for (const field of fields)this._fields.set(field.label, new (0, _chunkDataFieldJs.ChunkDataField)(field.index, field.label, field.type, this));
    }
    field(name) {
        return this._fields.get(name);
    }
}

},{"./chunk-data/chunk-data-bits.js":"5Gx9R","./chunk-data/chunk-data-buffer.js":"5urRi","./chunk-data/chunk-data-field.js":"1Riqp","./chunk-data/chunk-data-map.js":"dOIN3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Gx9R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataBits", ()=>ChunkDataBits);
class ChunkDataBits {
    _count;
    _referencer;
    _label;
    _arrays;
    constructor({ label = "", count, referencer, _arrays = null }){
        this._count = count;
        this._referencer = referencer;
        this._label = label;
        this._arrays = _arrays;
        if (!this._arrays) this._makeArrays();
    }
    _makeArrays() {
        this._arrays = [];
        for(let i = 0; i < this._count / 8; i++)this._arrays.push(new Uint8Array(this._referencer.cellsInChunk));
    }
    _labelString() {
        if (this._label) return `'${this._label}'`;
        else return "[ChunkDataBits]";
    }
    _array(index) {
        return this._arrays[Math.floor(index / 8)];
    }
    get(bitIndex, x, y, z) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            return this._array(bitIndex)[x] & 1 << bitIndex % 8;
        } else return this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] & 1 << bitIndex % 8;
    }
    set(bitIndex, x, y, z, value) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            if (value) this._array(bitIndex)[x] |= 1 << bitIndex;
            else this._array(bitIndex)[x] &= ~(1 << bitIndex);
        } else if (value) this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] |= 1 << bitIndex % 8;
        else this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] &= ~(1 << bitIndex % 8);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5urRi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataBuffer", ()=>ChunkDataBuffer);
class ChunkDataBuffer {
    _arrayType;
    _referencer;
    _label;
    _data;
    constructor({ label = "", type, referencer }){
        this._arrayType = ChunkDataBuffer._typeToTypedArrayConstructor(type);
        this._referencer = referencer;
        this._label = label;
        this._data = new this._arrayType(referencer.cellsInChunk);
    }
    _labelString() {
        if (this._label) return `'${this._label}'`;
        else return `ChunkDataBuffer<${this._data.constructor.name}>`;
    }
    get(x, y, z) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            return this._data[x];
        } else return this._data[this._referencer.indexOfPosition(x, y, z)];
    }
    set(x, y, z, value) {
        if (typeof z === "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            this._data[x] = z;
        } else this._data[this._referencer.indexOfPosition(x, y, z)] = value;
    }
    static _typeToTypedArrayConstructor(type) {
        if (type == "i8") return Int8Array;
        if (type == "i16") return Int16Array;
        if (type == "i32") return Int32Array;
        if (type == "u8") return Uint8Array;
        if (type == "u16") return Uint16Array;
        if (type == "u32") return Uint32Array;
        if (type == "f32") return Float32Array;
        if (type == "f64") return Float64Array;
        throw new Error(`Unknown array type: ${type}`);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Riqp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataField", ()=>ChunkDataField);
var _vector3DJs = require("../../utils/vector3d/vector3d.js");
class ChunkDataField {
    index;
    chunk;
    type;
    label;
    constructor(index, label, type, chunk){
        this.index = index;
        this.label = label;
        this.type = type;
        this.chunk = chunk;
    }
    get(x, y, z) {
        if (x instanceof (0, _vector3DJs.Vector3D)) {
            let vector = x;
            x = vector.x;
            y = vector.y;
            z = vector.z;
        }
        if (this.type == "b") return this.chunk._bits.get(this.index, x, y, z);
        else if (this.type == "a") return this.chunk._map.get(this.index, x, y, z);
        else return this.chunk._buffers[this.index].get(x, y, z);
    }
    set(x, y, z, value) {
        if (x instanceof (0, _vector3DJs.Vector3D)) {
            let vector = x;
            x = vector.x;
            y = vector.y;
            z = vector.z;
            value = y;
        }
        if (this.type == "b") return this.chunk._bits.set(this.index, x, y, z, value);
        else if (this.type == "a") return this.chunk._map.set(this.index, x, y, z, value);
        else return this.chunk._buffers[this.index].set(x, y, z, value);
    }
}

},{"../../utils/vector3d/vector3d.js":"32Wc4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"32Wc4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vector3D", ()=>Vector3D);
var _handleableVector3DJs = require("./handleable-vector3d.js");
var _immutableVector3DJs = require("./immutable-vector3d.js");
var _mutableVector3DJs = require("./mutable-vector3d.js");
class Vector3D {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0){
        if (typeof x !== "number") throw new TypeError("x must be a number");
        if (typeof y !== "number") throw new TypeError("y must be a number");
        if (typeof z !== "number") throw new TypeError("z must be a number");
        if (isNaN(x)) throw new TypeError("x must not be NaN");
        if (isNaN(y)) throw new TypeError("y must not be NaN");
        if (isNaN(z)) throw new TypeError("z must not be NaN");
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x + x, this.y + y, this.z + z);
            else return this._set(this.x + x, this.y + x, this.z + x);
        } else return this._set(this.x + x.x, this.y + x.y, this.z + x.z);
    }
    subtract(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x - x, this.y - y, this.z - z);
            else return this._set(this.x - x, this.y - x, this.z - x);
        } else return this._set(this.x - x.x, this.y - x.y, this.z - x.z);
    }
    reverseSubtract(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x - this.x, y - this.y, z - this.z);
            else return this._set(x - this.x, x - this.y, x - this.z);
        } else return this._set(x.x - this.x, x.y - this.y, x.z - this.z);
    }
    complexMultiply(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x - this.y * y, this.x * y + this.y * x, this.z * z);
            else return this._set(this.x * x, this.y * x, this.z * x);
        } else return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x, this.z * x.z);
    }
    scalarMultiply(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x, this.y * y, this.z * z);
            else return this._set(this.x * x, this.y * x, this.z * x);
        } else return this._set(this.x * x.x, this.y * x.y, this.z * x.z);
    }
    scalarDivide(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x / x, this.y / y, this.z / z);
            else return this._set(this.x / x, this.y / x, this.z / x);
        } else return this._set(this.x / x.x, this.y / x.y, this.z / x.z);
    }
    reverseScalarDivide(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x / this.x, y / this.y, this.z / z);
            else return this._set(x / this.x, x / this.y, this.z / z);
        } else return this._set(x.x / this.x, x.y / this.y, this.z / z);
    }
    dot(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this.x * x + this.y * y + this.z * z;
            else return this.x * x + this.y * x + this.z * x;
        } else return this.x * x.x + this.y * x.y + this.z * x.z;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return Math.sqrt(this.distanceSquaredTo(x, y, z));
            else return Math.sqrt(this.distanceSquaredTo(x, x, x));
        } else return Math.sqrt(this.distanceSquaredTo(x.x, x.y, x.z));
    }
    distanceSquaredTo(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return (this.x - x) ** 2 + (this.y - y) ** 2 + (this.z - z) ** 2;
            else return (this.x - x) ** 2 + (this.y - x) ** 2 + (this.z - x) ** 2;
        } else return (this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2;
    }
    normalize() {
        return this.scalarDivide(this.length());
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }
    immutable() {
        return new (0, _immutableVector3DJs.ImmutableVector3D)(this.x, this.y, this.z);
    }
    mutable() {
        return new (0, _mutableVector3DJs.MutableVector3D)(this.x, this.y, this.z);
    }
    clone() {
        if (this instanceof (0, _mutableVector3DJs.MutableVector3D)) return new (0, _mutableVector3DJs.MutableVector3D)(this.x, this.y, this.z);
        if (this instanceof (0, _immutableVector3DJs.ImmutableVector3D)) return new (0, _immutableVector3DJs.ImmutableVector3D)(this.x, this.y, this.z);
        if (this instanceof (0, _handleableVector3DJs.HandleableVector3D)) return new (0, _handleableVector3DJs.HandleableVector3D)(this.x, this.y, this.z);
        throw new Error(`Unknown vector type: ${this.constructor.name}`);
    }
    handle() {
        return new (0, _handleableVector3DJs.HandleableVector3D)(this.x, this.y, this.z);
    }
    static *_from(vector, format) {
        yield format[0] == "x" ? vector.x : format[0] == "y" ? vector.y : format[0] == "1" ? 1 : 0;
        yield format[1] == "x" ? vector.x : format[1] == "y" ? vector.y : format[1] == "1" ? 1 : 0;
        yield format[2] == "x" ? vector.x : format[2] == "y" ? vector.y : format[2] == "1" ? 1 : 0;
    }
}

},{"./handleable-vector3d.js":"lkPU8","./immutable-vector3d.js":"bFhiH","./mutable-vector3d.js":"alfDC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lkPU8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HandleableVector3D", ()=>HandleableVector3D);
var _mutableVector3DJs = require("./mutable-vector3d.js");
var _vector3DJs = require("./vector3d.js");
class HandleableVector3D extends (0, _mutableVector3DJs.MutableVector3D) {
    _listeners;
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
        this._listeners = new Set();
    }
    on(type, handler) {
        if (type == "change") this._listeners.add(handler);
        else throw new Error("Unknown event type");
    }
    cause(type) {
        if (type == "change") for (const listener of this._listeners)listener();
        else throw new Error("Unknown event type");
    }
    _set(x, y, z) {
        this.cause("change");
        return super._set(x, y, z);
    }
    clone() {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }
    static from(vector, format) {
        return new HandleableVector3D(...(0, _vector3DJs.Vector3D)._from(vector, format));
    }
}

},{"./mutable-vector3d.js":"alfDC","./vector3d.js":"32Wc4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"alfDC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MutableVector3D", ()=>MutableVector3D);
var _vector3DJs = require("./vector3d.js");
class MutableVector3D extends (0, _vector3DJs.Vector3D) {
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
    }
    _set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    static from(vector, format) {
        return new MutableVector3D(...(0, _vector3DJs.Vector3D)._from(vector, format));
    }
}

},{"./vector3d.js":"32Wc4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bFhiH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ImmutableVector3D", ()=>ImmutableVector3D);
var _vector3DJs = require("./vector3d.js");
class ImmutableVector3D extends (0, _vector3DJs.Vector3D) {
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
    }
    _set(x, y, z) {
        return new ImmutableVector3D(x, y, z);
    }
    set(x, y, z) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new ImmutableVector3D(...(0, _vector3DJs.Vector3D)._from(vector, format));
    }
}

},{"./vector3d.js":"32Wc4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dOIN3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ChunkDataMap", ()=>ChunkDataMap);
class ChunkDataMap {
    _referencer;
    _map;
    constructor({ referencer }){
        this._referencer = referencer;
        this._map = new Map();
    }
    get(attribute, x, y, z) {
        let index = typeof y == "undefined" ? x : this._referencer.indexOfPosition(x, y, z);
        return this._map.get(attribute + "." + index);
    }
    set(attribute, x, y, z, value) {
        let index = typeof y == "undefined" ? x : this._referencer.indexOfPosition(x, y, z);
        this._map.set(attribute + "." + index, value);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dWDik":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Renderer", ()=>Renderer);
class Renderer {
    world;
    canvas;
    perspective;
    constructor(world, canvas){
        this.world = world;
        this.canvas = canvas;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["2dF6g","aRF0v"], "aRF0v", "parcelRequire94c2")

//# sourceMappingURL=main.js.map
