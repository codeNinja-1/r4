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
})({"5Fxl8":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "abce44c458ada919";
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
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
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
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
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
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
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
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
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

},{}],"3SEK7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mocha = require("mocha");
var _mochaDefault = parcelHelpers.interopDefault(_mocha);
(0, _mochaDefault.default).describe("test", ()=>{
    (0, _mochaDefault.default).it("should pass", ()=>{});
});

},{"mocha":"boS33","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"boS33":[function(require,module,exports) {
var process = require("b316be85a5e11e68");
var global = arguments[3];
"use strict";
/* eslint no-unused-vars: off */ /* eslint-env commonjs */ /**
 * Shim process.stdout.
 */ process.stdout = require("3a3dd62a3af5fe91")({
    label: false
});
var parseQuery = require("9f9d6451eb4797ed");
var highlightTags = require("b70d17a0515a2dd8");
var Mocha = require("80b611538c593e31");
/**
 * Create a Mocha instance.
 *
 * @return {undefined}
 */ var mocha = new Mocha({
    reporter: "html"
});
/**
 * Save timer references to avoid Sinon interfering (see GH-237).
 */ var Date = global.Date;
var setTimeout = global.setTimeout;
var setInterval = global.setInterval;
var clearTimeout = global.clearTimeout;
var clearInterval = global.clearInterval;
var uncaughtExceptionHandlers = [];
var originalOnerrorHandler = global.onerror;
/**
 * Remove uncaughtException listener.
 * Revert to original onerror handler if previously defined.
 */ process.removeListener = function(e, fn) {
    if (e === "uncaughtException") {
        if (originalOnerrorHandler) global.onerror = originalOnerrorHandler;
        else global.onerror = function() {};
        var i = uncaughtExceptionHandlers.indexOf(fn);
        if (i !== -1) uncaughtExceptionHandlers.splice(i, 1);
    }
};
/**
 * Implements listenerCount for 'uncaughtException'.
 */ process.listenerCount = function(name) {
    if (name === "uncaughtException") return uncaughtExceptionHandlers.length;
    return 0;
};
/**
 * Implements uncaughtException listener.
 */ process.on = function(e, fn) {
    if (e === "uncaughtException") {
        global.onerror = function(err, url, line) {
            fn(new Error(err + " (" + url + ":" + line + ")"));
            return !mocha.options.allowUncaught;
        };
        uncaughtExceptionHandlers.push(fn);
    }
};
process.listeners = function(e) {
    if (e === "uncaughtException") return uncaughtExceptionHandlers;
    return [];
};
// The BDD UI is registered by default, but no UI will be functional in the
// browser without an explicit call to the overridden `mocha.ui` (see below).
// Ensure that this default UI does not expose its methods to the global scope.
mocha.suite.removeAllListeners("pre-require");
var immediateQueue = [];
var immediateTimeout;
function timeslice() {
    var immediateStart = new Date().getTime();
    while(immediateQueue.length && new Date().getTime() - immediateStart < 100)immediateQueue.shift()();
    if (immediateQueue.length) immediateTimeout = setTimeout(timeslice, 0);
    else immediateTimeout = null;
}
/**
 * High-performance override of Runner.immediately.
 */ Mocha.Runner.immediately = function(callback) {
    immediateQueue.push(callback);
    if (!immediateTimeout) immediateTimeout = setTimeout(timeslice, 0);
};
/**
 * Function to allow assertion libraries to throw errors directly into mocha.
 * This is useful when running tests in a browser because window.onerror will
 * only receive the 'message' attribute of the Error.
 */ mocha.throwError = function(err) {
    uncaughtExceptionHandlers.forEach(function(fn) {
        fn(err);
    });
    throw err;
};
/**
 * Override ui to ensure that the ui functions are initialized.
 * Normally this would happen in Mocha.prototype.loadFiles.
 */ mocha.ui = function(ui) {
    Mocha.prototype.ui.call(this, ui);
    this.suite.emit("pre-require", global, null, this);
    return this;
};
/**
 * Setup mocha with the given setting options.
 */ mocha.setup = function(opts) {
    if (typeof opts === "string") opts = {
        ui: opts
    };
    if (opts.delay === true) this.delay();
    var self = this;
    Object.keys(opts).filter(function(opt) {
        return opt !== "delay";
    }).forEach(function(opt) {
        if (Object.prototype.hasOwnProperty.call(opts, opt)) self[opt](opts[opt]);
    });
    return this;
};
/**
 * Run mocha, returning the Runner.
 */ mocha.run = function(fn) {
    var options = mocha.options;
    mocha.globals("location");
    var query = parseQuery(global.location.search || "");
    if (query.grep) mocha.grep(query.grep);
    if (query.fgrep) mocha.fgrep(query.fgrep);
    if (query.invert) mocha.invert();
    return Mocha.prototype.run.call(mocha, function(err) {
        // The DOM Document is not available in Web Workers.
        var document = global.document;
        if (document && document.getElementById("mocha") && options.noHighlighting !== true) highlightTags("code");
        if (fn) fn(err);
    });
};
/**
 * Expose the process shim.
 * https://github.com/mochajs/mocha/pull/916
 */ Mocha.process = process;
/**
 * Expose mocha.
 */ global.Mocha = Mocha;
global.mocha = mocha;
// for bundlers: enable `import {describe, it} from 'mocha'`
// `bdd` interface only
// prettier-ignore
[
    "describe",
    "context",
    "it",
    "specify",
    "xdescribe",
    "xcontext",
    "xit",
    "xspecify",
    "before",
    "beforeEach",
    "afterEach",
    "after"
].forEach(function(key) {
    mocha[key] = global[key];
});
module.exports = mocha;

},{"b316be85a5e11e68":"d5jf4","3a3dd62a3af5fe91":"iOcqH","9f9d6451eb4797ed":"LnIrx","b70d17a0515a2dd8":"b7JWn","80b611538c593e31":"a4DXv"}],"d5jf4":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"iOcqH":[function(require,module,exports) {
var process = require("76df301b832afc85");
var WritableStream = require("4fd9179d1a0cca6c").Writable;
var inherits = require("d38720d7fd3d841e").inherits;
module.exports = BrowserStdout;
inherits(BrowserStdout, WritableStream);
function BrowserStdout(opts) {
    if (!(this instanceof BrowserStdout)) return new BrowserStdout(opts);
    opts = opts || {};
    WritableStream.call(this, opts);
    this.label = opts.label !== undefined ? opts.label : "stdout";
}
BrowserStdout.prototype._write = function(chunks, encoding, cb) {
    var output = chunks.toString ? chunks.toString() : chunks;
    if (this.label === false) console.log(output);
    else console.log(this.label + ":", output);
    process.nextTick(cb);
};

},{"76df301b832afc85":"d5jf4","4fd9179d1a0cca6c":"j77ns","d38720d7fd3d841e":"cxohQ"}],"j77ns":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
module.exports = Stream;
var EE = require("96b62835346f84f0").EventEmitter;
var inherits = require("4a6ee9586f51c38d");
inherits(Stream, EE);
Stream.Readable = require("e6206e1f4d20abc7");
Stream.Writable = require("a3f1405f37e1dfb1");
Stream.Duplex = require("6691a72c5fc222fd");
Stream.Transform = require("43a905ce7ec6ac9e");
Stream.PassThrough = require("dd715550d7783885");
Stream.finished = require("d90a3520974ec96e");
Stream.pipeline = require("eb2779cfd287c5c9");
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;
// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.
function Stream() {
    EE.call(this);
}
Stream.prototype.pipe = function(dest, options) {
    var source = this;
    function ondata(chunk) {
        if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) source.pause();
        }
    }
    source.on("data", ondata);
    function ondrain() {
        if (source.readable && source.resume) source.resume();
    }
    dest.on("drain", ondrain);
    // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.
    if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
    }
    var didOnEnd = false;
    function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
    }
    function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === "function") dest.destroy();
    }
    // don't leave dangling pipes when there are errors.
    function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) throw er; // Unhandled stream error in pipe.
    }
    source.on("error", onerror);
    dest.on("error", onerror);
    // remove all the event listeners that were added.
    function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    // Allow for unix-like usage: A.pipe(B).pipe(C)
    return dest;
};

},{"96b62835346f84f0":"1VQLm","4a6ee9586f51c38d":"bRL3M","e6206e1f4d20abc7":"6NdbQ","a3f1405f37e1dfb1":"gTkcq","6691a72c5fc222fd":"kKNA3","43a905ce7ec6ac9e":"ba8Mr","dd715550d7783885":"2xP98","d90a3520974ec96e":"aOMy2","eb2779cfd287c5c9":"fyp4t"}],"1VQLm":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
        // At least give some kind of context to the user
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === "function") ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [
            listener,
            existing
        ] : [
            existing,
            listener
        ];
        else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
        }
    } else if (typeof list !== "function") {
        position = -1;
        for(i = list.length - 1; i >= 0; i--)if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") this.removeListener(type, listeners);
    else if (listeners !== undefined) // LIFO order
    for(i = listeners.length - 1; i >= 0; i--)this.removeListener(type, listeners[i]);
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === "function") return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return listenerCount.call(emitter, type);
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === "function") return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
            resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags.once) emitter.once(name, listener);
        else emitter.on(name, listener);
    } else if (typeof emitter.addEventListener === "function") // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) emitter.removeEventListener(name, wrapListener);
        listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
}

},{}],"bRL3M":[function(require,module,exports) {
if (typeof Object.create === "function") // implementation from standard node.js 'util' module
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
};
else // old school shim for old browsers
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
    }
};

},{}],"6NdbQ":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var global = arguments[3];
var process = require("896ff8d56553f7a");
"use strict";
module.exports = Readable;
/*<replacement>*/ var Duplex;
/*</replacement>*/ Readable.ReadableState = ReadableState;
/*<replacement>*/ var EE = require("16782d660ac22e0c").EventEmitter;
var EElistenerCount = function EElistenerCount(emitter, type) {
    return emitter.listeners(type).length;
};
/*</replacement>*/ /*<replacement>*/ var Stream = require("9a34f23fa53f83f7");
/*</replacement>*/ var Buffer = require("fb95ecaa88342eae").Buffer;
var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/ var debugUtil = require("a4a723b7297c7152");
var debug;
if (debugUtil && debugUtil.debuglog) debug = debugUtil.debuglog("stream");
else debug = function debug() {};
/*</replacement>*/ var BufferList = require("7a14cc1689b8c63e");
var destroyImpl = require("efa8155386cc4283");
var _require = require("994c984d08c7bbf2"), getHighWaterMark = _require.getHighWaterMark;
var _require$codes = require("8de60461b822641b").codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
// Lazy loaded to improve the startup performance.
var StringDecoder;
var createReadableStreamAsyncIterator;
var from;
require("19affa8ce41f090d")(Readable, Stream);
var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
];
function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [
        fn,
        emitter._events[event]
    ];
}
function ReadableState(options, stream, isDuplex) {
    Duplex = Duplex || require("f1c95f846e94e4eb");
    options = options || {};
    // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true;
    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false;
    // Should .destroy() be called after 'end' (and potentially 'finish')
    this.autoDestroy = !!options.autoDestroy;
    // has it been destroyed
    this.destroyed = false;
    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8";
    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;
    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!StringDecoder) StringDecoder = require("6392acd10886f115").StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}
function Readable(options) {
    Duplex = Duplex || require("f1c95f846e94e4eb");
    if (!(this instanceof Readable)) return new Readable(options);
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the ReadableState constructor, at least with V8 6.5
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
    }
    Stream.call(this);
}
Object.defineProperty(Readable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined) return false;
        return this._readableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) return;
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function(err, cb) {
    cb(err);
};
// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = "";
            }
            skipChunkCheck = true;
        }
    } else skipChunkCheck = true;
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};
// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
    } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) errorOrDestroy(stream, er);
        else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) chunk = _uint8ArrayToBuffer(chunk);
            if (addToFront) {
                if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                else addChunk(stream, state, chunk, true);
            } else if (state.ended) errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
            else if (state.destroyed) return false;
            else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                    else maybeReadMore(stream, state);
                } else addChunk(stream, state, chunk, false);
            }
        } else if (!addToFront) {
            state.reading = false;
            maybeReadMore(stream, state);
        }
    }
    // We can push more data if we are below the highWaterMark.
    // Also, if we have no data yet, we can stand some more bytes.
    // This is to work around cases where hwm=0, such as the repl.
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
    } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
    }
    maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer",
        "Uint8Array"
    ], chunk);
    return er;
}
Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
};
// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder) StringDecoder = require("6392acd10886f115").StringDecoder;
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    // If setEncoding(null), decoder.encoding equals utf8
    this._readableState.encoding = this._readableState.decoder.encoding;
    // Iterate over current buffer to convert already stored Buffers:
    var p = this._readableState.buffer.head;
    var content = "";
    while(p !== null){
        content += decoder.write(p.data);
        p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "") this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
};
// Don't raise the hwm > 1GB
var MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
    else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
}
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
}
// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false;
    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
    }
    n = howMuchToRead(n, state);
    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
    }
    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug("need readable", doRead);
    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
    }
    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
    } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0) state.needReadable = true;
        // call internal read method
        this._read(state.highWaterMark);
        state.sync = false;
        // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading) n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = fromList(n, state);
    else ret = null;
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    } else {
        state.length -= n;
        state.awaitDrain = 0;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true;
        // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended) endReadable(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
};
function onEofChunk(stream, state) {
    debug("onEofChunk");
    if (state.ended) return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
    else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;
        if (!state.emittedReadable) {
            state.emittedReadable = true;
            emitReadable_(stream);
        }
    }
}
// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
    var state = stream._readableState;
    debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
    }
}
function emitReadable_(stream) {
    var state = stream._readableState;
    debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
    }
    // The stream needs another readable event if
    // 1. It is not flowing, as the flow mechanism will take
    //    care of it.
    // 2. It is not ended.
    // 3. It is below the highWaterMark, so we can schedule
    //    another readable later.
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
}
// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
    }
}
function maybeReadMore_(stream, state) {
    // Attempt to read more data if we should.
    //
    // The conditions for reading more data are (one of):
    // - Not enough data buffered (state.length < state.highWaterMark). The loop
    //   is responsible for filling the buffer with enough data if such data
    //   is available. If highWaterMark is 0 and we are not in the flowing mode
    //   we should _not_ attempt to buffer any extra data. We'll get more data
    //   when the stream consumer calls read() instead.
    // - No data in the buffer, and the stream is in flowing mode. In this mode
    //   the loop below is responsible for ensuring read() is called. Failing to
    //   call read here would abort the flow and there's no other mechanism for
    //   continuing the flow if the stream consumer has just subscribed to the
    //   'data' event.
    //
    // In addition to the above conditions to keep reading data, the following
    // conditions prevent the data from being read:
    // - The stream has ended (state.ended).
    // - There is already a pending 'read' operation (state.reading). This is a
    //   case where the the stream has called the implementation defined _read()
    //   method, but they are processing the call asynchronously and have _not_
    //   called push() with new data. In this case we skip performing more
    //   read()s. The execution ends in this method again after the _read() ends
    //   up calling push() with more data.
    while(!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)){
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length) break;
    }
    state.readingMore = false;
}
// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
};
Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch(state.pipesCount){
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [
                state.pipes,
                dest
            ];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) process.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        debug("onend");
        dest.end();
    }
    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
        debug("cleanup");
        // cleanup event handlers once the pipe is broken
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug("false write response, pause", state.awaitDrain);
                state.awaitDrain++;
            }
            src.pause();
        }
    }
    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
    }
    // Make sure our error handler is attached before userland ones.
    prependListener(dest, "error", onerror);
    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
    }
    // tell the dest that it's being piped to
    dest.emit("pipe", src);
    // start the flow if it hasn't been started already.
    if (!state.flowing) {
        debug("pipe resume");
        src.resume();
    }
    return dest;
};
function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
        }
    };
}
Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    };
    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;
    // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
    }
    // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for(var i = 0; i < len; i++)dests[i].emit("unpipe", this, {
            hasUnpiped: false
        });
        return this;
    }
    // try to find the right one.
    var index = indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
};
// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount("readable") > 0;
        // Try start flowing on next tick if stream isn't explicitly paused
        if (state.flowing !== false) this.resume();
    } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) emitReadable(this);
            else if (!state.reading) process.nextTick(nReadingNextTick, this);
        }
    }
    return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
    return res;
};
Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === undefined) // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
    return res;
};
function updateReadableListening(self1) {
    var state = self1._readableState;
    state.readableListening = self1.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true;
    else if (self1.listenerCount("data") > 0) self1.resume();
}
function nReadingNextTick(self1) {
    debug("readable nexttick read 0");
    self1.read(0);
}
// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
        debug("resume");
        // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()
        state.flowing = !state.readableListening;
        resume(this, state);
    }
    state.paused = false;
    return this;
};
function resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
    }
}
function resume_(stream, state) {
    debug("resume", state.reading);
    if (!state.reading) stream.read(0);
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
};
function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while(state.flowing && stream.read() !== null);
}
// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    });
    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for(var i in stream)if (this[i] === undefined && typeof stream[i] === "function") this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
        };
    }(i);
    // proxy certain important events.
    for(var n = 0; n < kProxyEvents.length; n++)stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function(n) {
        debug("wrapped _read", n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};
if (typeof Symbol === "function") Readable.prototype[Symbol.asyncIterator] = function() {
    if (createReadableStreamAsyncIterator === undefined) createReadableStreamAsyncIterator = require("830c56f840811f05");
    return createReadableStreamAsyncIterator(this);
};
Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.highWaterMark;
    }
});
Object.defineProperty(Readable.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState && this._readableState.buffer;
    }
});
Object.defineProperty(Readable.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.flowing;
    },
    set: function set(state) {
        if (this._readableState) this._readableState.flowing = state;
    }
});
// exposed for testing purposes only.
Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.length;
    }
});
// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
    } else // read part of list
    ret = state.buffer.consume(n, state.decoder);
    return ret;
}
function endReadable(stream) {
    var state = stream._readableState;
    debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
    }
}
function endReadableNT(state, stream) {
    debug("endReadableNT", state.endEmitted, state.length);
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the writable side is ready for autoDestroy as well
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
        }
    }
}
if (typeof Symbol === "function") Readable.from = function(iterable, opts) {
    if (from === undefined) from = require("7451b8c4bf72370");
    return from(Readable, iterable, opts);
};
function indexOf(xs, x) {
    for(var i = 0, l = xs.length; i < l; i++){
        if (xs[i] === x) return i;
    }
    return -1;
}

},{"896ff8d56553f7a":"d5jf4","16782d660ac22e0c":"1VQLm","9a34f23fa53f83f7":"60BLS","fb95ecaa88342eae":"fCgem","a4a723b7297c7152":"jhUEF","7a14cc1689b8c63e":"hf3P2","efa8155386cc4283":"YI8DF","994c984d08c7bbf2":"61BRN","8de60461b822641b":"aJlwj","19affa8ce41f090d":"bRL3M","f1c95f846e94e4eb":"kKNA3","6392acd10886f115":"3vmkr","830c56f840811f05":"k019Y","7451b8c4bf72370":"ak0YH"}],"60BLS":[function(require,module,exports) {
module.exports = require("ed88fc9aa73f911").EventEmitter;

},{"ed88fc9aa73f911":"1VQLm"}],"fCgem":[function(require,module,exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ "use strict";
const base64 = require("9c62938f1dccc73c");
const ieee754 = require("aceacb6a4531a9d2");
const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192 // not used by this implementation
;
function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return utf8Slice(this, start, end);
        case "ascii":
            return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return latin1Slice(this, start, end);
        case "base64":
            return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(let i = 0; i < len; i += 2)swap(this, i, i + 1);
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
    if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if (numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = "";
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for(let i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) boundsError(offset, this.length - 8);
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
    else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
        received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) boundsError(offset, buf.length - (byteLength + 1));
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== "number") throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}

},{"9c62938f1dccc73c":"eIiSV","aceacb6a4531a9d2":"cO95r"}],"eIiSV":[function(require,module,exports) {
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

},{}],"cO95r":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

},{}],"jhUEF":[function(require,module,exports) {
"use strict";

},{}],"hf3P2":[function(require,module,exports) {
"use strict";
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
var _require = require("59f5d0111b7fa075"), Buffer = _require.Buffer;
var _require2 = require("eef6a677577349b8"), inspect = _require2.inspect;
var custom = inspect && inspect.custom || "inspect";
function copyBuffer(src, target, offset) {
    Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/ function() {
    function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    _createClass(BufferList, [
        {
            key: "push",
            value: function push(v) {
                var entry = {
                    data: v,
                    next: null
                };
                if (this.length > 0) this.tail.next = entry;
                else this.head = entry;
                this.tail = entry;
                ++this.length;
            }
        },
        {
            key: "unshift",
            value: function unshift(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                if (this.length === 0) this.tail = entry;
                this.head = entry;
                ++this.length;
            }
        },
        {
            key: "shift",
            value: function shift() {
                if (this.length === 0) return;
                var ret = this.head.data;
                if (this.length === 1) this.head = this.tail = null;
                else this.head = this.head.next;
                --this.length;
                return ret;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.head = this.tail = null;
                this.length = 0;
            }
        },
        {
            key: "join",
            value: function join(s) {
                if (this.length === 0) return "";
                var p = this.head;
                var ret = "" + p.data;
                while(p = p.next)ret += s + p.data;
                return ret;
            }
        },
        {
            key: "concat",
            value: function concat(n) {
                if (this.length === 0) return Buffer.alloc(0);
                var ret = Buffer.allocUnsafe(n >>> 0);
                var p = this.head;
                var i = 0;
                while(p){
                    copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                }
                return ret;
            }
        },
        {
            key: "consume",
            value: function consume(n, hasStrings) {
                var ret;
                if (n < this.head.data.length) {
                    // `slice` is the same for buffers and strings.
                    ret = this.head.data.slice(0, n);
                    this.head.data = this.head.data.slice(n);
                } else if (n === this.head.data.length) // First chunk is a perfect match.
                ret = this.shift();
                else // Result spans more than one buffer.
                ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                return ret;
            }
        },
        {
            key: "first",
            value: function first() {
                return this.head.data;
            }
        },
        {
            key: "_getString",
            value: function _getString(n) {
                var p = this.head;
                var c = 1;
                var ret = p.data;
                n -= ret.length;
                while(p = p.next){
                    var str = p.data;
                    var nb = n > str.length ? str.length : n;
                    if (nb === str.length) ret += str;
                    else ret += str.slice(0, n);
                    n -= nb;
                    if (n === 0) {
                        if (nb === str.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = str.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            }
        },
        {
            key: "_getBuffer",
            value: function _getBuffer(n) {
                var ret = Buffer.allocUnsafe(n);
                var p = this.head;
                var c = 1;
                p.data.copy(ret);
                n -= p.data.length;
                while(p = p.next){
                    var buf = p.data;
                    var nb = n > buf.length ? buf.length : n;
                    buf.copy(ret, ret.length - n, 0, nb);
                    n -= nb;
                    if (n === 0) {
                        if (nb === buf.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = buf.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            }
        },
        {
            key: custom,
            value: function value(_, options) {
                return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
                    // Only inspect one level.
                    depth: 0,
                    // It should not recurse.
                    customInspect: false
                }));
            }
        }
    ]);
    return BufferList;
}();

},{"59f5d0111b7fa075":"fCgem","eef6a677577349b8":"jhUEF"}],"YI8DF":[function(require,module,exports) {
var process = require("4284522496af5dfb");
"use strict";
// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) cb(err);
        else if (err) {
            if (!this._writableState) process.nextTick(emitErrorNT, this, err);
            else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick(emitErrorNT, this, err);
            }
        }
        return this;
    }
    // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) this._readableState.destroyed = true;
    // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) this._writableState.destroyed = true;
    this._destroy(err || null, function(err) {
        if (!cb && err) {
            if (!_this._writableState) process.nextTick(emitErrorAndCloseNT, _this, err);
            else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick(emitErrorAndCloseNT, _this, err);
            } else process.nextTick(emitCloseNT, _this);
        } else if (cb) {
            process.nextTick(emitCloseNT, _this);
            cb(err);
        } else process.nextTick(emitCloseNT, _this);
    });
    return this;
}
function emitErrorAndCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
function emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) return;
    if (self._readableState && !self._readableState.emitClose) return;
    self.emit("close");
}
function undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function emitErrorNT(self, err) {
    self.emit("error", err);
}
function errorOrDestroy(stream, err) {
    // We have tests that rely on errors being emitted
    // in the same tick, so changing this is semver major.
    // For now when you opt-in to autoDestroy we allow
    // the error to be emitted nextTick. In a future
    // semver major update we should change the default to this.
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit("error", err);
}
module.exports = {
    destroy: destroy,
    undestroy: undestroy,
    errorOrDestroy: errorOrDestroy
};

},{"4284522496af5dfb":"d5jf4"}],"61BRN":[function(require,module,exports) {
"use strict";
var ERR_INVALID_OPT_VALUE = require("4e508d569e2117ef").codes.ERR_INVALID_OPT_VALUE;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
    }
    // Default value
    return state.objectMode ? 16 : 16384;
}
module.exports = {
    getHighWaterMark: getHighWaterMark
};

},{"4e508d569e2117ef":"aJlwj"}],"aJlwj":[function(require,module,exports) {
"use strict";
function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
}
var codes = {};
function createErrorType(code, message, Base) {
    if (!Base) Base = Error;
    function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") return message;
        else return message(arg1, arg2, arg3);
    }
    var NodeError = /*#__PURE__*/ function(_Base) {
        _inheritsLoose(NodeError, _Base);
        function NodeError(arg1, arg2, arg3) {
            return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        return NodeError;
    }(Base);
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
            return String(i);
        });
        if (len > 2) return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        else if (len === 2) return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        else return "of ".concat(thing, " ").concat(expected[0]);
    } else return "of ".concat(thing, " ").concat(String(expected));
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) this_len = str.length;
    return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
    if (typeof start !== "number") start = 0;
    if (start + search.length > str.length) return false;
    else return str.indexOf(search, start) !== -1;
}
createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    // determiner: 'must be' or 'must not be'
    var determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
    } else determiner = "must be";
    var msg;
    if (endsWith(name, " argument")) // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    }
    msg += ". Received type ".concat(typeof actual);
    return msg;
}, TypeError);
createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
});
createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
});
createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
}, TypeError);
createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
module.exports.codes = codes;

},{}],"kKNA3":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
var process = require("2ab1115635c50a9f");
"use strict";
/*<replacement>*/ var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for(var key in obj)keys.push(key);
    return keys;
};
/*</replacement>*/ module.exports = Duplex;
var Readable = require("68a7582259cd5865");
var Writable = require("93d042f8bb80078e");
require("aa7b11ba5bf4defc")(Duplex, Readable);
// Allow the keys array to be GC'ed.
var keys = objectKeys(Writable.prototype);
for(var v = 0; v < keys.length; v++){
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}
function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", onend);
        }
    }
}
Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
Object.defineProperty(Duplex.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
Object.defineProperty(Duplex.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
// the no-half-open enforcer
function onend() {
    // If the writable side ended, then we're ok.
    if (this._writableState.ended) return;
    // no more data can be written.
    // But allow more writes to happen in this tick.
    process.nextTick(onEndNT, this);
}
function onEndNT(self) {
    self.end();
}
Object.defineProperty(Duplex.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) return;
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});

},{"2ab1115635c50a9f":"d5jf4","68a7582259cd5865":"6NdbQ","93d042f8bb80078e":"gTkcq","aa7b11ba5bf4defc":"bRL3M"}],"gTkcq":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
var global = arguments[3];
var process = require("f05a2a5a09d4d8b0");
"use strict";
module.exports = Writable;
/* <replacement> */ function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
}
// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
        onCorkedFinish(_this, state);
    };
}
/* </replacement> */ /*<replacement>*/ var Duplex;
/*</replacement>*/ Writable.WritableState = WritableState;
/*<replacement>*/ var internalUtil = {
    deprecate: require("dc51171b07b54af1")
};
/*</replacement>*/ /*<replacement>*/ var Stream = require("44a3cc22ec64fcd3");
/*</replacement>*/ var Buffer = require("de8f7fb7ccda8086").Buffer;
var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {};
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
var destroyImpl = require("acf48fb5d9dc6204");
var _require = require("9d146cd974da0f53"), getHighWaterMark = _require.getHighWaterMark;
var _require$codes = require("3c574b8881abcf86").codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
var errorOrDestroy = destroyImpl.errorOrDestroy;
require("10dad555ffe77dde")(Writable, Stream);
function nop() {}
function WritableState(options, stream, isDuplex) {
    Duplex = Duplex || require("c5e7171d6f58d3c0");
    options = options || {};
    // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream,
    // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    // if _final has been called
    this.finalCalled = false;
    // drain event flag.
    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;
    // has it been destroyed
    this.destroyed = false;
    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8";
    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;
    // a flag to see when we're in the middle of a write.
    this.writing = false;
    // when true all writes will be buffered until .uncork() call
    this.corked = 0;
    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;
    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;
    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
        onwrite(stream, er);
    };
    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;
    // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;
    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;
    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;
    // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false;
    // Should .destroy() be called after 'finish' (and potentially 'end')
    this.autoDestroy = !!options.autoDestroy;
    // count buffered requests
    this.bufferedRequestCount = 0;
    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while(current){
        out.push(current);
        current = current.next;
    }
    return out;
};
(function() {
    try {
        Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
    } catch (_) {}
})();
// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
            if (realHasInstance.call(this, object)) return true;
            if (this !== Writable) return false;
            return object && object._writableState instanceof WritableState;
        }
    });
} else realHasInstance = function realHasInstance(object) {
    return object instanceof this;
};
function Writable(options) {
    Duplex = Duplex || require("c5e7171d6f58d3c0");
    // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the WritableState constructor, at least with V8 6.5
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
    }
    Stream.call(this);
}
// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};
function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    // TODO: defer error events consistently everywhere, not just the cb
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
}
// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) er = new ERR_STREAM_NULL_VALUES();
    else if (typeof chunk !== "string" && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer"
    ], chunk);
    if (er) {
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
    }
    return true;
}
Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
    if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (isBuf) encoding = "buffer";
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== "function") cb = nop;
    if (state.ending) writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
Writable.prototype.cork = function() {
    this._writableState.corked++;
};
Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === "string") encoding = encoding.toLowerCase();
    if (!([
        "hex",
        "utf8",
        "utf-8",
        "ascii",
        "binary",
        "base64",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "raw"
    ].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
Object.defineProperty(Writable.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer.from(chunk, encoding);
    return chunk;
}
Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) last.next = state.lastBufferedRequest;
        else state.bufferedRequest = state.lastBufferedRequest;
        state.bufferedRequestCount += 1;
    } else doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er);
        // this can emit finish, and it will always happen
        // after error
        process.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
    } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        // this can emit finish, but finish must
        // always follow error
        finishMaybe(stream, state);
    }
}
function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state);
    if (er) onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
        if (sync) process.nextTick(afterWrite, stream, state, finished, cb);
        else afterWrite(stream, state, finished, cb);
    }
}
function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
}
// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
    }
}
// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while(entry){
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        } else state.corkedRequestsFree = new CorkedRequest(state);
        state.bufferedRequestCount = 0;
    } else {
        // Slow case, write chunks one-by-one
        while(entry){
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) break;
        }
        if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
};
Writable.prototype._writev = null;
Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
    // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    }
    // ignore unnecessary end() calls.
    if (!state.ending) endWritable(this, state, cb);
    return this;
};
Object.defineProperty(Writable.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
    stream._final(function(err) {
        state.pendingcb--;
        if (err) errorOrDestroy(stream, err);
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
    });
}
function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick(callFinal, stream, state);
        } else {
            state.prefinished = true;
            stream.emit("prefinish");
        }
    }
}
function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;
                if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
            }
        }
    }
    return need;
}
function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while(entry){
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    }
    // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._writableState === undefined) return false;
        return this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) return;
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function(err, cb) {
    cb(err);
};

},{"f05a2a5a09d4d8b0":"d5jf4","dc51171b07b54af1":"j92NQ","44a3cc22ec64fcd3":"60BLS","de8f7fb7ccda8086":"fCgem","acf48fb5d9dc6204":"YI8DF","9d146cd974da0f53":"61BRN","3c574b8881abcf86":"aJlwj","10dad555ffe77dde":"bRL3M","c5e7171d6f58d3c0":"kKNA3"}],"j92NQ":[function(require,module,exports) {
/**
 * Module exports.
 */ var global = arguments[3];
module.exports = deprecate;
/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */ function deprecate(fn, msg) {
    if (config("noDeprecation")) return fn;
    var warned = false;
    function deprecated() {
        if (!warned) {
            if (config("throwDeprecation")) throw new Error(msg);
            else if (config("traceDeprecation")) console.trace(msg);
            else console.warn(msg);
            warned = true;
        }
        return fn.apply(this, arguments);
    }
    return deprecated;
}
/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */ function config(name) {
    // accessing global.localStorage can trigger a DOMException in sandboxed iframes
    try {
        if (!global.localStorage) return false;
    } catch (_) {
        return false;
    }
    var val = global.localStorage[name];
    if (null == val) return false;
    return String(val).toLowerCase() === "true";
}

},{}],"3vmkr":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
/*<replacement>*/ var Buffer = require("2a29807c689a070a").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch(encoding && encoding.toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while(true)switch(enc){
        case "utf8":
        case "utf-8":
            return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return "utf16le";
        case "latin1":
        case "binary":
            return "latin1";
        case "base64":
        case "ascii":
        case "hex":
            return enc;
        default:
            if (retried) return; // undefined
            enc = ("" + enc).toLowerCase();
            retried = true;
    }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
    } else i = 0;
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return "\uFFFD";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return "\uFFFD";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return "\uFFFD";
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "\uFFFD";
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) this.lastChar[0] = buf[buf.length - 1];
    else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
}

},{"2a29807c689a070a":"eW7r9"}],"eW7r9":[function(require,module,exports) {
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ var buffer = require("7e0d6ecd698c3ca6");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src)dst[key] = src[key];
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) module.exports = buffer;
else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") throw new TypeError("Argument must not be a number");
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === "string") buf.fill(fill, encoding);
        else buf.fill(fill);
    } else buf.fill(0);
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return buffer.SlowBuffer(size);
};

},{"7e0d6ecd698c3ca6":"fCgem"}],"k019Y":[function(require,module,exports) {
var process = require("96b869862a96261a");
"use strict";
var _Object$setPrototypeO;
function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
var finished = require("745a3cd8f6469ed5");
var kLastResolve = Symbol("lastResolve");
var kLastReject = Symbol("lastReject");
var kError = Symbol("error");
var kEnded = Symbol("ended");
var kLastPromise = Symbol("lastPromise");
var kHandlePromise = Symbol("handlePromise");
var kStream = Symbol("stream");
function createIterResult(value, done) {
    return {
        value: value,
        done: done
    };
}
function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
        var data = iter[kStream].read();
        // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'
        if (data !== null) {
            iter[kLastPromise] = null;
            iter[kLastResolve] = null;
            iter[kLastReject] = null;
            resolve(createIterResult(data, false));
        }
    }
}
function onReadable(iter) {
    // we wait for the next tick, because it might
    // emit an error with process.nextTick
    process.nextTick(readAndResolve, iter);
}
function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
        lastPromise.then(function() {
            if (iter[kEnded]) {
                resolve(createIterResult(undefined, true));
                return;
            }
            iter[kHandlePromise](resolve, reject);
        }, reject);
    };
}
var AsyncIteratorPrototype = Object.getPrototypeOf(function() {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream () {
        return this[kStream];
    },
    next: function next() {
        var _this = this;
        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[kError];
        if (error !== null) return Promise.reject(error);
        if (this[kEnded]) return Promise.resolve(createIterResult(undefined, true));
        if (this[kStream].destroyed) // We need to defer via nextTick because if .destroy(err) is
        // called, the error will be emitted via nextTick, and
        // we cannot guarantee that there is no error lingering around
        // waiting to be emitted.
        return new Promise(function(resolve, reject) {
            process.nextTick(function() {
                if (_this[kError]) reject(_this[kError]);
                else resolve(createIterResult(undefined, true));
            });
        });
        // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) promise = new Promise(wrapForNext(lastPromise, this));
        else {
            // fast path needed to support multiple this.push()
            // without triggering the next() queue
            var data = this[kStream].read();
            if (data !== null) return Promise.resolve(createIterResult(data, false));
            promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
    }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    // destroy(err, cb) is a private API
    // we can guarantee we have that here, because we control the
    // Readable class this is attached to
    return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(createIterResult(undefined, true));
        });
    });
}), _Object$setPrototypeO), AsyncIteratorPrototype);
var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
    }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
            var data = iterator[kStream].read();
            if (data) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                resolve(createIterResult(data, false));
            } else {
                iterator[kLastResolve] = resolve;
                iterator[kLastReject] = reject;
            }
        },
        writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[kLastReject];
            // reject if we are waiting for data in the Promise
            // returned by next() and store the error
            if (reject !== null) {
                iterator[kLastPromise] = null;
                iterator[kLastResolve] = null;
                iterator[kLastReject] = null;
                reject(err);
            }
            iterator[kError] = err;
            return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(undefined, true));
        }
        iterator[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator));
    return iterator;
};
module.exports = createReadableStreamAsyncIterator;

},{"96b869862a96261a":"d5jf4","745a3cd8f6469ed5":"aOMy2"}],"aOMy2":[function(require,module,exports) {
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";
var ERR_STREAM_PREMATURE_CLOSE = require("d35458f585bdd360").codes.ERR_STREAM_PREMATURE_CLOSE;
function once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        callback.apply(this, args);
    };
}
function noop() {}
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function eos(stream, opts, callback) {
    if (typeof opts === "function") return eos(stream, null, opts);
    if (!opts) opts = {};
    callback = once(callback || noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
    };
    var onerror = function onerror(err) {
        callback.call(stream, err);
    };
    var onclose = function onclose() {
        var err;
        if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
    };
    var onrequest = function onrequest() {
        stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
}
module.exports = eos;

},{"d35458f585bdd360":"aJlwj"}],"ak0YH":[function(require,module,exports) {
module.exports = function() {
    throw new Error("Readable.from is not available in the browser");
};

},{}],"ba8Mr":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
"use strict";
module.exports = Transform;
var _require$codes = require("baab47252aa06434").codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
var Duplex = require("db11ebf938e536ed");
require("82049677fa603d40")(Transform, Duplex);
function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) return this.emit("error", new ERR_MULTIPLE_CALLBACK());
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
}
function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    };
    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;
    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
    }
    // When the writable side finishes, then flush out anything remaining.
    this.on("prefinish", prefinish);
}
function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) this._flush(function(er, data) {
        done(_this, er, data);
    });
    else done(this, null, null);
}
Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
};
// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
};
Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
};
// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
};
Transform.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
    });
};
function done(stream, er, data) {
    if (er) return stream.emit("error", er);
    if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);
    // TODO(BridgeAR): Write a test for these two error cases
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
}

},{"baab47252aa06434":"aJlwj","db11ebf938e536ed":"kKNA3","82049677fa603d40":"bRL3M"}],"2xP98":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
"use strict";
module.exports = PassThrough;
var Transform = require("7ab21291895ec3d2");
require("f24ec1883eef5e9b")(PassThrough, Transform);
function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);
    Transform.call(this, options);
}
PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};

},{"7ab21291895ec3d2":"ba8Mr","f24ec1883eef5e9b":"bRL3M"}],"fyp4t":[function(require,module,exports) {
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";
var eos;
function once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
    };
}
var _require$codes = require("6ba21bd580ac7d57").codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
function noop(err) {
    // Rethrow the error if it exists to avoid swallowing it
    if (err) throw err;
}
function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function destroyer(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
        closed = true;
    });
    if (eos === undefined) eos = require("dd7fd89dd81b8674");
    eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true;
        // request.destroy just do .end - .abort is what we want
        if (isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
}
function call(fn) {
    fn();
}
function pipe(from, to) {
    return from.pipe(to);
}
function popCallback(streams) {
    if (!streams.length) return noop;
    if (typeof streams[streams.length - 1] !== "function") return noop;
    return streams.pop();
}
function pipeline() {
    for(var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++)streams[_key] = arguments[_key];
    var callback = popCallback(streams);
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new ERR_MISSING_ARGS("streams");
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach(call);
            if (reading) return;
            destroys.forEach(call);
            callback(error);
        });
    });
    return streams.reduce(pipe);
}
module.exports = pipeline;

},{"6ba21bd580ac7d57":"aJlwj","dd7fd89dd81b8674":"aOMy2"}],"cxohQ":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var process = require("bc23a3ea4a141c0b");
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for(var i = 0; i < keys.length; i++)descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    return descriptors;
};
var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
    if (!isString(f)) {
        var objects = [];
        for(var i = 0; i < arguments.length; i++)objects.push(inspect(arguments[i]));
        return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") return "%";
        if (i >= len) return x;
        switch(x){
            case "%s":
                return String(args[i++]);
            case "%d":
                return Number(args[i++]);
            case "%j":
                try {
                    return JSON.stringify(args[i++]);
                } catch (_) {
                    return "[Circular]";
                }
            default:
                return x;
        }
    });
    for(var x = args[i]; i < len; x = args[++i])if (isNull(x) || !isObject(x)) str += " " + x;
    else str += " " + inspect(x);
    return str;
};
// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
    if (typeof process !== "undefined" && process.noDeprecation === true) return fn;
    // Allow for deprecating things in the process of starting up.
    if (typeof process === "undefined") return function() {
        return exports.deprecate(fn, msg).apply(this, arguments);
    };
    var warned = false;
    function deprecated() {
        if (!warned) {
            if (process.throwDeprecation) throw new Error(msg);
            else if (process.traceDeprecation) console.trace(msg);
            else console.error(msg);
            warned = true;
        }
        return fn.apply(this, arguments);
    }
    return deprecated;
};
var debugs = {};
var debugEnvRegex = /^$/;
var debugEnv;
exports.debuglog = function(set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
            var pid = process.pid;
            debugs[set] = function() {
                var msg = exports.format.apply(exports, arguments);
                console.error("%s %d: %s", set, pid, msg);
            };
        } else debugs[set] = function() {};
    }
    return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */ /* legacy: obj, showHidden, depth, colors*/ function inspect(obj, opts) {
    // default options
    var ctx = {
        seen: [],
        stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) // legacy...
    ctx.showHidden = opts;
    else if (opts) // got an "options" object
    exports._extend(ctx, opts);
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
    "bold": [
        1,
        22
    ],
    "italic": [
        3,
        23
    ],
    "underline": [
        4,
        24
    ],
    "inverse": [
        7,
        27
    ],
    "white": [
        37,
        39
    ],
    "grey": [
        90,
        39
    ],
    "black": [
        30,
        39
    ],
    "blue": [
        34,
        39
    ],
    "cyan": [
        36,
        39
    ],
    "green": [
        32,
        39
    ],
    "magenta": [
        35,
        39
    ],
    "red": [
        31,
        39
    ],
    "yellow": [
        33,
        39
    ]
};
// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
    "special": "cyan",
    "number": "yellow",
    "boolean": "yellow",
    "undefined": "grey",
    "null": "bold",
    "string": "green",
    "date": "magenta",
    // "name": intentionally not styling
    "regexp": "red"
};
function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) return "\x1b[" + inspect.colors[style][0] + "m" + str + "\x1b[" + inspect.colors[style][1] + "m";
    else return str;
}
function stylizeNoColor(str, styleType) {
    return str;
}
function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
        hash[val] = true;
    });
    return hash;
}
function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) ret = formatValue(ctx, ret, recurseTimes);
        return ret;
    }
    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) return primitive;
    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) keys = Object.getOwnPropertyNames(value);
    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (isFunction(value)) {
            var name = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
        if (isError(value)) return formatError(value);
    }
    var base = "", array = false, braces = [
        "{",
        "}"
    ];
    // Make Array say that they are Array
    if (isArray(value)) {
        array = true;
        braces = [
            "[",
            "]"
        ];
    }
    // Make functions say that they are functions
    if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
    }
    // Make RegExps say that they are RegExps
    if (isRegExp(value)) base = " " + RegExp.prototype.toString.call(value);
    // Make dates with properties first say the date
    if (isDate(value)) base = " " + Date.prototype.toUTCString.call(value);
    // Make error with message first say the error
    if (isError(value)) base = " " + formatError(value);
    if (keys.length === 0 && (!array || value.length == 0)) return braces[0] + base + braces[1];
    if (recurseTimes < 0) {
        if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        else return ctx.stylize("[Object]", "special");
    }
    ctx.seen.push(value);
    var output;
    if (array) output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    else output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
    }
    if (isNumber(value)) return ctx.stylize("" + value, "number");
    if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
    // For some reason typeof null is "object", so special case here.
    if (isNull(value)) return ctx.stylize("null", "null");
}
function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for(var i = 0, l = value.length; i < l; ++i)if (hasOwnProperty(value, String(i))) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    else output.push("");
    keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    });
    return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
    };
    if (desc.get) {
        if (desc.set) str = ctx.stylize("[Getter/Setter]", "special");
        else str = ctx.stylize("[Getter]", "special");
    } else if (desc.set) str = ctx.stylize("[Setter]", "special");
    if (!hasOwnProperty(visibleKeys, key)) name = "[" + key + "]";
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) str = formatValue(ctx, desc.value, null);
            else str = formatValue(ctx, desc.value, recurseTimes - 1);
            if (str.indexOf("\n") > -1) {
                if (array) str = str.split("\n").map(function(line) {
                    return "  " + line;
                }).join("\n").slice(2);
                else str = "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                }).join("\n");
            }
        } else str = ctx.stylize("[Circular]", "special");
    }
    if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) return str;
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, "name");
        } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, "string");
        }
    }
    return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require("6a1c15bae847a134");
function isArray(ar) {
    return Array.isArray(ar);
}
exports.isArray = isArray;
function isBoolean(arg) {
    return typeof arg === "boolean";
}
exports.isBoolean = isBoolean;
function isNull(arg) {
    return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
    return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
    return typeof arg === "number";
}
exports.isNumber = isNumber;
function isString(arg) {
    return typeof arg === "string";
}
exports.isString = isString;
function isSymbol(arg) {
    return typeof arg === "symbol";
}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
    return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;
function isObject(arg) {
    return typeof arg === "object" && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
}
exports.isDate = isDate;
exports.types.isDate = isDate;
function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;
function isFunction(arg) {
    return typeof arg === "function";
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
    typeof arg === "undefined";
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = require("a42137cd7fc8700d");
function objectToString(o) {
    return Object.prototype.toString.call(o);
}
function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
// 26 Feb 16:19:34
function timestamp() {
    var d = new Date();
    var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(":");
    return [
        d.getDate(),
        months[d.getMonth()],
        time
    ].join(" ");
}
// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
    console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */ exports.inherits = require("a792e8e3e2aa1973");
exports._extend = function(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while(i--)origin[keys[i]] = add[keys[i]];
    return origin;
};
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : undefined;
exports.promisify = function promisify(original) {
    if (typeof original !== "function") throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
        });
        return fn;
    }
    function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;
        });
        var args = [];
        for(var i = 0; i < arguments.length; i++)args.push(arguments[i]);
        args.push(function(err, value) {
            if (err) promiseReject(err);
            else promiseResolve(value);
        });
        try {
            original.apply(this, args);
        } catch (err) {
            promiseReject(err);
        }
        return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
    });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};
exports.promisify.custom = kCustomPromisifiedSymbol;
function callbackifyOnRejected(reason, cb) {
    // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
    // Because `null` is a special error value in callbacks which means "no error
    // occurred", we error-wrap so the callback consumer can distinguish between
    // "the promise rejected with null" or "the promise fulfilled with undefined".
    if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
    }
    return cb(reason);
}
function callbackify(original) {
    if (typeof original !== "function") throw new TypeError('The "original" argument must be of type Function');
    // We DO NOT return the promise as it gives the user a false sense that
    // the promise is actually somehow related to the callback's execution
    // and that the callback throwing will reject the promise.
    function callbackified() {
        var args = [];
        for(var i = 0; i < arguments.length; i++)args.push(arguments[i]);
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") throw new TypeError("The last argument must be of type Function");
        var self = this;
        var cb = function() {
            return maybeCb.apply(self, arguments);
        };
        // In true node style we process the callback on `nextTick` with all the
        // implications (stack, `uncaughtException`, `async_hooks`)
        original.apply(this, args).then(function(ret) {
            process.nextTick(cb.bind(null, null, ret));
        }, function(rej) {
            process.nextTick(callbackifyOnRejected.bind(null, rej, cb));
        });
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
}
exports.callbackify = callbackify;

},{"bc23a3ea4a141c0b":"d5jf4","6a1c15bae847a134":"bnQvf","a42137cd7fc8700d":"inNNy","a792e8e3e2aa1973":"bRL3M"}],"bnQvf":[function(require,module,exports) {
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9
"use strict";
var isArgumentsObject = require("6b5f9ae3e436d527");
var isGeneratorFunction = require("285c2b8081bf4b68");
var whichTypedArray = require("e95b88ccd80e1671");
var isTypedArray = require("7db151546a22c2a8");
function uncurryThis(f) {
    return f.call.bind(f);
}
var BigIntSupported = typeof BigInt !== "undefined";
var SymbolSupported = typeof Symbol !== "undefined";
var ObjectToString = uncurryThis(Object.prototype.toString);
var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);
if (BigIntSupported) var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
if (SymbolSupported) var symbolValue = uncurryThis(Symbol.prototype.valueOf);
function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") return false;
    try {
        prototypeValueOf(value);
        return true;
    } catch (e) {
        return false;
    }
}
exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;
// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
    return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
}
exports.isPromise = isPromise;
function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) return ArrayBuffer.isView(value);
    return isTypedArray(value) || isDataView(value);
}
exports.isArrayBufferView = isArrayBufferView;
function isUint8Array(value) {
    return whichTypedArray(value) === "Uint8Array";
}
exports.isUint8Array = isUint8Array;
function isUint8ClampedArray(value) {
    return whichTypedArray(value) === "Uint8ClampedArray";
}
exports.isUint8ClampedArray = isUint8ClampedArray;
function isUint16Array(value) {
    return whichTypedArray(value) === "Uint16Array";
}
exports.isUint16Array = isUint16Array;
function isUint32Array(value) {
    return whichTypedArray(value) === "Uint32Array";
}
exports.isUint32Array = isUint32Array;
function isInt8Array(value) {
    return whichTypedArray(value) === "Int8Array";
}
exports.isInt8Array = isInt8Array;
function isInt16Array(value) {
    return whichTypedArray(value) === "Int16Array";
}
exports.isInt16Array = isInt16Array;
function isInt32Array(value) {
    return whichTypedArray(value) === "Int32Array";
}
exports.isInt32Array = isInt32Array;
function isFloat32Array(value) {
    return whichTypedArray(value) === "Float32Array";
}
exports.isFloat32Array = isFloat32Array;
function isFloat64Array(value) {
    return whichTypedArray(value) === "Float64Array";
}
exports.isFloat64Array = isFloat64Array;
function isBigInt64Array(value) {
    return whichTypedArray(value) === "BigInt64Array";
}
exports.isBigInt64Array = isBigInt64Array;
function isBigUint64Array(value) {
    return whichTypedArray(value) === "BigUint64Array";
}
exports.isBigUint64Array = isBigUint64Array;
function isMapToString(value) {
    return ObjectToString(value) === "[object Map]";
}
isMapToString.working = typeof Map !== "undefined" && isMapToString(new Map());
function isMap(value) {
    if (typeof Map === "undefined") return false;
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
}
exports.isMap = isMap;
function isSetToString(value) {
    return ObjectToString(value) === "[object Set]";
}
isSetToString.working = typeof Set !== "undefined" && isSetToString(new Set());
function isSet(value) {
    if (typeof Set === "undefined") return false;
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
}
exports.isSet = isSet;
function isWeakMapToString(value) {
    return ObjectToString(value) === "[object WeakMap]";
}
isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(new WeakMap());
function isWeakMap(value) {
    if (typeof WeakMap === "undefined") return false;
    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;
function isWeakSetToString(value) {
    return ObjectToString(value) === "[object WeakSet]";
}
isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(new WeakSet());
function isWeakSet(value) {
    return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;
function isArrayBufferToString(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
}
isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
function isArrayBuffer(value) {
    if (typeof ArrayBuffer === "undefined") return false;
    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;
function isDataViewToString(value) {
    return ObjectToString(value) === "[object DataView]";
}
isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
function isDataView(value) {
    if (typeof DataView === "undefined") return false;
    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
}
exports.isDataView = isDataView;
// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
}
function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBufferCopy === "undefined") return false;
    if (typeof isSharedArrayBufferToString.working === "undefined") isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;
function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
}
exports.isAsyncFunction = isAsyncFunction;
function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
}
exports.isMapIterator = isMapIterator;
function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
}
exports.isSetIterator = isSetIterator;
function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
}
exports.isGeneratorObject = isGeneratorObject;
function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;
function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;
function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;
function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;
function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;
function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
}
exports.isBoxedPrimitive = isBoxedPrimitive;
function isAnyArrayBuffer(value) {
    return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;
[
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
].forEach(function(method) {
    Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
            throw new Error(method + " is not supported in userland");
        }
    });
});

},{"6b5f9ae3e436d527":"czr4n","285c2b8081bf4b68":"2XUdn","e95b88ccd80e1671":"lVUO7","7db151546a22c2a8":"1ihkG"}],"czr4n":[function(require,module,exports) {
"use strict";
var hasToStringTag = require("e2b01ce809f132fb")();
var callBound = require("649cbf9949986a39");
var $toString = callBound("Object.prototype.toString");
var isStandardArguments = function isArguments(value) {
    if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) return false;
    return $toString(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments(value) {
    if (isStandardArguments(value)) return true;
    return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
};
var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
}();
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"e2b01ce809f132fb":"9LdQ9","649cbf9949986a39":"5yYiF"}],"9LdQ9":[function(require,module,exports) {
"use strict";
var hasSymbols = require("2ef89576d4959bff");
module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
};

},{"2ef89576d4959bff":"euYk7"}],"euYk7":[function(require,module,exports) {
"use strict";
/* eslint complexity: [2, 18], max-statements: [2, 33] */ module.exports = function hasSymbols() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
    if (typeof Symbol.iterator === "symbol") return true;
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") return false;
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
    // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
    var symVal = 42;
    obj[sym] = symVal;
    for(sym in obj)return false;
     // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) return false;
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
    }
    return true;
};

},{}],"5yYiF":[function(require,module,exports) {
"use strict";
var GetIntrinsic = require("8b08ecb81cf4de17");
var callBind = require("266fc50410cfc4a");
var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
module.exports = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) return callBind(intrinsic);
    return intrinsic;
};

},{"8b08ecb81cf4de17":"dZb05","266fc50410cfc4a":"bfo8D"}],"dZb05":[function(require,module,exports) {
"use strict";
var undefined1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;
// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
    try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {}
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) try {
    $gOPD({}, "");
} catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
}
var throwTypeError = function() {
    throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
    try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here
        return throwTypeError;
    } catch (calleeThrows) {
        try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
            return throwTypeError;
        }
    }
}() : throwTypeError;
var hasSymbols = require("1f00f712d594ccf")();
var hasProto = require("23730654306aa64c")();
var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
    return x.__proto__;
} // eslint-disable-line no-proto
 : null);
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined : getProto(Uint8Array);
var INTRINSICS = {
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
    "%AsyncFromSyncIteratorPrototype%": undefined,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%eval%": eval,
    "%EvalError%": EvalError,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
    "%JSON%": typeof JSON === "object" ? JSON : undefined,
    "%Map%": typeof Map === "undefined" ? undefined : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
    "%RangeError%": RangeError,
    "%ReferenceError%": ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
    "%Symbol%": hasSymbols ? Symbol : undefined,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
    "%URIError%": URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet
};
if (getProto) try {
    null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
    // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
    var errorProto = getProto(getProto(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
}
var doEval = function doEval(name) {
    var value;
    if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
    else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
    else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
    else if (name === "%AsyncGenerator%") {
        var fn = doEval("%AsyncGeneratorFunction%");
        if (fn) value = fn.prototype;
    } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval("%AsyncGenerator%");
        if (gen && getProto) value = getProto(gen.prototype);
    }
    INTRINSICS[name] = value;
    return value;
};
var LEGACY_ALIASES = {
    "%ArrayBufferPrototype%": [
        "ArrayBuffer",
        "prototype"
    ],
    "%ArrayPrototype%": [
        "Array",
        "prototype"
    ],
    "%ArrayProto_entries%": [
        "Array",
        "prototype",
        "entries"
    ],
    "%ArrayProto_forEach%": [
        "Array",
        "prototype",
        "forEach"
    ],
    "%ArrayProto_keys%": [
        "Array",
        "prototype",
        "keys"
    ],
    "%ArrayProto_values%": [
        "Array",
        "prototype",
        "values"
    ],
    "%AsyncFunctionPrototype%": [
        "AsyncFunction",
        "prototype"
    ],
    "%AsyncGenerator%": [
        "AsyncGeneratorFunction",
        "prototype"
    ],
    "%AsyncGeneratorPrototype%": [
        "AsyncGeneratorFunction",
        "prototype",
        "prototype"
    ],
    "%BooleanPrototype%": [
        "Boolean",
        "prototype"
    ],
    "%DataViewPrototype%": [
        "DataView",
        "prototype"
    ],
    "%DatePrototype%": [
        "Date",
        "prototype"
    ],
    "%ErrorPrototype%": [
        "Error",
        "prototype"
    ],
    "%EvalErrorPrototype%": [
        "EvalError",
        "prototype"
    ],
    "%Float32ArrayPrototype%": [
        "Float32Array",
        "prototype"
    ],
    "%Float64ArrayPrototype%": [
        "Float64Array",
        "prototype"
    ],
    "%FunctionPrototype%": [
        "Function",
        "prototype"
    ],
    "%Generator%": [
        "GeneratorFunction",
        "prototype"
    ],
    "%GeneratorPrototype%": [
        "GeneratorFunction",
        "prototype",
        "prototype"
    ],
    "%Int8ArrayPrototype%": [
        "Int8Array",
        "prototype"
    ],
    "%Int16ArrayPrototype%": [
        "Int16Array",
        "prototype"
    ],
    "%Int32ArrayPrototype%": [
        "Int32Array",
        "prototype"
    ],
    "%JSONParse%": [
        "JSON",
        "parse"
    ],
    "%JSONStringify%": [
        "JSON",
        "stringify"
    ],
    "%MapPrototype%": [
        "Map",
        "prototype"
    ],
    "%NumberPrototype%": [
        "Number",
        "prototype"
    ],
    "%ObjectPrototype%": [
        "Object",
        "prototype"
    ],
    "%ObjProto_toString%": [
        "Object",
        "prototype",
        "toString"
    ],
    "%ObjProto_valueOf%": [
        "Object",
        "prototype",
        "valueOf"
    ],
    "%PromisePrototype%": [
        "Promise",
        "prototype"
    ],
    "%PromiseProto_then%": [
        "Promise",
        "prototype",
        "then"
    ],
    "%Promise_all%": [
        "Promise",
        "all"
    ],
    "%Promise_reject%": [
        "Promise",
        "reject"
    ],
    "%Promise_resolve%": [
        "Promise",
        "resolve"
    ],
    "%RangeErrorPrototype%": [
        "RangeError",
        "prototype"
    ],
    "%ReferenceErrorPrototype%": [
        "ReferenceError",
        "prototype"
    ],
    "%RegExpPrototype%": [
        "RegExp",
        "prototype"
    ],
    "%SetPrototype%": [
        "Set",
        "prototype"
    ],
    "%SharedArrayBufferPrototype%": [
        "SharedArrayBuffer",
        "prototype"
    ],
    "%StringPrototype%": [
        "String",
        "prototype"
    ],
    "%SymbolPrototype%": [
        "Symbol",
        "prototype"
    ],
    "%SyntaxErrorPrototype%": [
        "SyntaxError",
        "prototype"
    ],
    "%TypedArrayPrototype%": [
        "TypedArray",
        "prototype"
    ],
    "%TypeErrorPrototype%": [
        "TypeError",
        "prototype"
    ],
    "%Uint8ArrayPrototype%": [
        "Uint8Array",
        "prototype"
    ],
    "%Uint8ClampedArrayPrototype%": [
        "Uint8ClampedArray",
        "prototype"
    ],
    "%Uint16ArrayPrototype%": [
        "Uint16Array",
        "prototype"
    ],
    "%Uint32ArrayPrototype%": [
        "Uint32Array",
        "prototype"
    ],
    "%URIErrorPrototype%": [
        "URIError",
        "prototype"
    ],
    "%WeakMapPrototype%": [
        "WeakMap",
        "prototype"
    ],
    "%WeakSetPrototype%": [
        "WeakSet",
        "prototype"
    ]
};
var bind = require("7c5e688e48cd07b0");
var hasOwn = require("af36d49b4b8c6c7c");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
var stringToPath = function stringToPath(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
};
/* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) value = doEval(intrinsicName);
        if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        return {
            alias: alias,
            name: intrinsicName,
            value: value
        };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError('"allowMissing" argument must be a boolean');
    if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([
            0,
            1
        ], alias));
    }
    for(var i = 1, isOwn = true; i < parts.length; i += 1){
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
        if (part === "constructor" || !isOwn) skipFurtherCaching = true;
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
        else if (value != null) {
            if (!(part in value)) {
                if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
                return void 0;
            }
            if ($gOPD && i + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc;
                // By convention, when a data property is converted to an accessor
                // property to emulate a data property that does not suffer from
                // the override mistake, that accessor's getter is marked with
                // an `originalValue` property. Here, when we detect this, we
                // uphold the illusion by pretending to see that original data
                // property, i.e., returning the value rather than the getter
                // itself.
                if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get;
                else value = value[part];
            } else {
                isOwn = hasOwn(value, part);
                value = value[part];
            }
            if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
        }
    }
    return value;
};

},{"1f00f712d594ccf":"3dK91","23730654306aa64c":"6eZiF","7c5e688e48cd07b0":"6J4ob","af36d49b4b8c6c7c":"9Wb6f"}],"3dK91":[function(require,module,exports) {
"use strict";
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = require("3fb25678c62d2fce");
module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") return false;
    if (typeof Symbol !== "function") return false;
    if (typeof origSymbol("foo") !== "symbol") return false;
    if (typeof Symbol("bar") !== "symbol") return false;
    return hasSymbolSham();
};

},{"3fb25678c62d2fce":"euYk7"}],"6eZiF":[function(require,module,exports) {
"use strict";
var test = {
    foo: {}
};
var $Object = Object;
module.exports = function hasProto() {
    return ({
        __proto__: test
    }).foo === test.foo && !(({
        __proto__: null
    }) instanceof $Object);
};

},{}],"6J4ob":[function(require,module,exports) {
"use strict";
var implementation = require("12e173b4dbaee960");
module.exports = Function.prototype.bind || implementation;

},{"12e173b4dbaee960":"jwaxQ"}],"jwaxQ":[function(require,module,exports) {
"use strict";
/* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = "[object Function]";
var concatty = function concatty(a, b) {
    var arr = [];
    for(var i = 0; i < a.length; i += 1)arr[i] = a[i];
    for(var j = 0; j < b.length; j += 1)arr[j + a.length] = b[j];
    return arr;
};
var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1)arr[j] = arrLike[i];
    return arr;
};
var joiny = function(arr, joiner) {
    var str = "";
    for(var i = 0; i < arr.length; i += 1){
        str += arr[i];
        if (i + 1 < arr.length) str += joiner;
    }
    return str;
};
module.exports = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) return result;
            return this;
        }
        return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for(var i = 0; i < boundLength; i++)boundArgs[i] = "$" + i;
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};

},{}],"9Wb6f":[function(require,module,exports) {
"use strict";
var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require("126cb75e62f8e17b");
/** @type {(o: {}, p: PropertyKey) => p is keyof o} */ module.exports = bind.call(call, $hasOwn);

},{"126cb75e62f8e17b":"6J4ob"}],"bfo8D":[function(require,module,exports) {
"use strict";
var bind = require("4f9d84d5de4909bc");
var GetIntrinsic = require("68d2ad3775278f43");
var setFunctionLength = require("f4b53071c102d4e");
var $TypeError = GetIntrinsic("%TypeError%");
var $apply = GetIntrinsic("%Function.prototype.apply%");
var $call = GetIntrinsic("%Function.prototype.call%");
var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
var $max = GetIntrinsic("%Math.max%");
if ($defineProperty) try {
    $defineProperty({}, "a", {
        value: 1
    });
} catch (e) {
    // IE 8 has a broken defineProperty
    $defineProperty = null;
}
module.exports = function callBind(originalFunction) {
    if (typeof originalFunction !== "function") throw new $TypeError("a function is required");
    var func = $reflectApply(bind, $call, arguments);
    return setFunctionLength(func, 1 + $max(0, originalFunction.length - (arguments.length - 1)), true);
};
var applyBind = function applyBind() {
    return $reflectApply(bind, $apply, arguments);
};
if ($defineProperty) $defineProperty(module.exports, "apply", {
    value: applyBind
});
else module.exports.apply = applyBind;

},{"4f9d84d5de4909bc":"6J4ob","68d2ad3775278f43":"dZb05","f4b53071c102d4e":"9IKoX"}],"9IKoX":[function(require,module,exports) {
"use strict";
var GetIntrinsic = require("8b1c9107ef1524f2");
var define = require("37dd1486f0f556ef");
var hasDescriptors = require("6a9d2b46085df706")();
var gOPD = require("2d412b0f532d1834");
var $TypeError = GetIntrinsic("%TypeError%");
var $floor = GetIntrinsic("%Math.floor%");
/** @typedef {(...args: unknown[]) => unknown} Func */ /** @type {<T extends Func = Func>(fn: T, length: number, loose?: boolean) => T} */ module.exports = function setFunctionLength(fn, length) {
    if (typeof fn !== "function") throw new $TypeError("`fn` is not a function");
    if (typeof length !== "number" || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) throw new $TypeError("`length` must be a positive 32-bit integer");
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) functionLengthIsConfigurable = false;
        if (desc && !desc.writable) functionLengthIsWritable = false;
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) define(/** @type {Parameters<define>[0]} */ fn, "length", length, true, true);
        else define(/** @type {Parameters<define>[0]} */ fn, "length", length);
    }
    return fn;
};

},{"8b1c9107ef1524f2":"dZb05","37dd1486f0f556ef":"6cEff","6a9d2b46085df706":"esBLZ","2d412b0f532d1834":"eOTQB"}],"6cEff":[function(require,module,exports) {
"use strict";
var hasPropertyDescriptors = require("1ed580143eb408b3")();
var GetIntrinsic = require("971d0ad91a472750");
var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
if ($defineProperty) try {
    $defineProperty({}, "a", {
        value: 1
    });
} catch (e) {
    // IE 8 has a broken defineProperty
    $defineProperty = false;
}
var $SyntaxError = GetIntrinsic("%SyntaxError%");
var $TypeError = GetIntrinsic("%TypeError%");
var gopd = require("3f9bd39335781ec7");
/** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */ module.exports = function defineDataProperty(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new $TypeError("`obj` must be an object or a function`");
    if (typeof property !== "string" && typeof property !== "symbol") throw new $TypeError("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") throw new $TypeError("`loose`, if provided, must be a boolean");
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    /* @type {false | TypedPropertyDescriptor<unknown>} */ var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) $defineProperty(obj, property, {
        configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value: value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable
    });
    else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) // must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
    obj[property] = value; // eslint-disable-line no-param-reassign
    else throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
};

},{"1ed580143eb408b3":"esBLZ","971d0ad91a472750":"dZb05","3f9bd39335781ec7":"eOTQB"}],"esBLZ":[function(require,module,exports) {
"use strict";
var GetIntrinsic = require("b0bf8b8435d3abc");
var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
var hasPropertyDescriptors = function hasPropertyDescriptors() {
    if ($defineProperty) try {
        $defineProperty({}, "a", {
            value: 1
        });
        return true;
    } catch (e) {
        // IE 8 has a broken defineProperty
        return false;
    }
    return false;
};
hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    // node v0.6 has a bug where array lengths can be Set but not Defined
    if (!hasPropertyDescriptors()) return null;
    try {
        return $defineProperty([], "length", {
            value: 1
        }).length !== 1;
    } catch (e) {
        // In Firefox 4-22, defining length on an array throws an exception.
        return true;
    }
};
module.exports = hasPropertyDescriptors;

},{"b0bf8b8435d3abc":"dZb05"}],"eOTQB":[function(require,module,exports) {
"use strict";
var GetIntrinsic = require("693e651525841e04");
var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
if ($gOPD) try {
    $gOPD([], "length");
} catch (e) {
    // IE 8 has a broken gOPD
    $gOPD = null;
}
module.exports = $gOPD;

},{"693e651525841e04":"dZb05"}],"2XUdn":[function(require,module,exports) {
"use strict";
var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = require("b42ab74c25dbb155")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function() {
    if (!hasToStringTag) return false;
    try {
        return Function("return function*() {}")();
    } catch (e) {}
};
var GeneratorFunction;
module.exports = function isGeneratorFunction(fn) {
    if (typeof fn !== "function") return false;
    if (isFnRegex.test(fnToStr.call(fn))) return true;
    if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
    }
    if (!getProto) return false;
    if (typeof GeneratorFunction === "undefined") {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
    }
    return getProto(fn) === GeneratorFunction;
};

},{"b42ab74c25dbb155":"9LdQ9"}],"lVUO7":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var forEach = require("2941d48f36957e3c");
var availableTypedArrays = require("beaf5502a5823cce");
var callBind = require("e5d203a1b4c809f9");
var callBound = require("83f633f9b335db8f");
var gOPD = require("ce6b45c571ba4e3e");
var $toString = callBound("Object.prototype.toString");
var hasToStringTag = require("9e7ef6c88184c56")();
var g = typeof globalThis === "undefined" ? global : globalThis;
var typedArrays = availableTypedArrays();
var $slice = callBound("String.prototype.slice");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for(var i = 0; i < array.length; i += 1){
        if (array[i] === value) return i;
    }
    return -1;
};
var cache = {
    __proto__: null
};
if (hasToStringTag && gOPD && getPrototypeOf) forEach(typedArrays, function(typedArray) {
    var arr = new g[typedArray]();
    if (Symbol.toStringTag in arr) {
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        cache["$" + typedArray] = callBind(descriptor.get);
    }
});
else forEach(typedArrays, function(typedArray) {
    var arr = new g[typedArray]();
    var fn = arr.slice || arr.set;
    if (fn) cache["$" + typedArray] = callBind(fn);
});
var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(cache, function(getter, typedArray) {
        if (!found) try {
            if ("$" + getter(value) === typedArray) found = $slice(typedArray, 1);
        } catch (e) {}
    });
    return found;
};
var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(cache, function(getter, name) {
        if (!found) try {
            getter(value);
            found = $slice(name, 1);
        } catch (e) {}
    });
    return found;
};
module.exports = function whichTypedArray(value) {
    if (!value || typeof value !== "object") return false;
    if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) return tag;
        if (tag !== "Object") return false;
        // node < 0.6 hits here on real Typed Arrays
        return trySlices(value);
    }
    if (!gOPD) return null;
     // unknown engine
    return tryTypedArrays(value);
};

},{"2941d48f36957e3c":"1Sol9","beaf5502a5823cce":"kfela","e5d203a1b4c809f9":"bfo8D","83f633f9b335db8f":"5yYiF","ce6b45c571ba4e3e":"eOTQB","9e7ef6c88184c56":"9LdQ9"}],"1Sol9":[function(require,module,exports) {
"use strict";
var isCallable = require("e50ebc24bbb25feb");
var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var forEachArray = function forEachArray(array, iterator, receiver) {
    for(var i = 0, len = array.length; i < len; i++)if (hasOwnProperty.call(array, i)) {
        if (receiver == null) iterator(array[i], i, array);
        else iterator.call(receiver, array[i], i, array);
    }
};
var forEachString = function forEachString(string, iterator, receiver) {
    for(var i = 0, len = string.length; i < len; i++)// no such thing as a sparse string.
    if (receiver == null) iterator(string.charAt(i), i, string);
    else iterator.call(receiver, string.charAt(i), i, string);
};
var forEachObject = function forEachObject(object, iterator, receiver) {
    for(var k in object)if (hasOwnProperty.call(object, k)) {
        if (receiver == null) iterator(object[k], k, object);
        else iterator.call(receiver, object[k], k, object);
    }
};
var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) throw new TypeError("iterator must be a function");
    var receiver;
    if (arguments.length >= 3) receiver = thisArg;
    if (toStr.call(list) === "[object Array]") forEachArray(list, iterator, receiver);
    else if (typeof list === "string") forEachString(list, iterator, receiver);
    else forEachObject(list, iterator, receiver);
};
module.exports = forEach;

},{"e50ebc24bbb25feb":"9ocyk"}],"9ocyk":[function(require,module,exports) {
"use strict";
var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") try {
    badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
            throw isCallableMarker;
        }
    });
    isCallableMarker = {};
    // eslint-disable-next-line no-throw-literal
    reflectApply(function() {
        throw 42;
    }, null, badArrayLike);
} catch (_) {
    if (_ !== isCallableMarker) reflectApply = null;
}
else reflectApply = null;
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
    try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
    } catch (e) {
        return false; // not a function
    }
};
var tryFunctionObject = function tryFunctionToStr(value) {
    try {
        if (isES6ClassFn(value)) return false;
        fnToStr.call(value);
        return true;
    } catch (e) {
        return false;
    }
};
var toStr = Object.prototype.toString;
var objectClass = "[object Object]";
var fnClass = "[object Function]";
var genClass = "[object GeneratorFunction]";
var ddaClass = "[object HTMLAllCollection]"; // IE 11
var ddaClass2 = "[object HTML document.all class]";
var ddaClass3 = "[object HTMLCollection]"; // IE 9-10
var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag; // better: use `has-tostringtag`
var isIE68 = !(0 in [
    , 
]); // eslint-disable-line no-sparse-arrays, comma-spacing
var isDDA = function isDocumentDotAll() {
    return false;
};
if (typeof document === "object") {
    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) isDDA = function isDocumentDotAll(value) {
        /* globals document: false */ // in IE 6-8, typeof document.all is "object" and it's truthy
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) try {
            var str = toStr.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 // opera 12.16
             || str === objectClass // IE 6-8
            ) && value("") == null; // eslint-disable-line eqeqeq
        } catch (e) {}
        return false;
    };
}
module.exports = reflectApply ? function isCallable(value) {
    if (isDDA(value)) return true;
    if (!value) return false;
    if (typeof value !== "function" && typeof value !== "object") return false;
    try {
        reflectApply(value, null, badArrayLike);
    } catch (e) {
        if (e !== isCallableMarker) return false;
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable(value) {
    if (isDDA(value)) return true;
    if (!value) return false;
    if (typeof value !== "function" && typeof value !== "object") return false;
    if (hasToStringTag) return tryFunctionObject(value);
    if (isES6ClassFn(value)) return false;
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) return false;
    return tryFunctionObject(value);
};

},{}],"kfela":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var possibleNames = [
    "BigInt64Array",
    "BigUint64Array",
    "Float32Array",
    "Float64Array",
    "Int16Array",
    "Int32Array",
    "Int8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8Array",
    "Uint8ClampedArray"
];
var g = typeof globalThis === "undefined" ? global : globalThis;
module.exports = function availableTypedArrays() {
    var out = [];
    for(var i = 0; i < possibleNames.length; i++)if (typeof g[possibleNames[i]] === "function") out[out.length] = possibleNames[i];
    return out;
};

},{}],"1ihkG":[function(require,module,exports) {
"use strict";
var whichTypedArray = require("ccf73e5f240c2b8");
module.exports = function isTypedArray(value) {
    return !!whichTypedArray(value);
};

},{"ccf73e5f240c2b8":"lVUO7"}],"inNNy":[function(require,module,exports) {
module.exports = function isBuffer(arg) {
    return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
};

},{}],"LnIrx":[function(require,module,exports) {
"use strict";
/**
 * Parse the given `qs`.
 *
 * @private
 * @param {string} qs
 * @return {Object<string, string>}
 */ module.exports = function parseQuery(qs) {
    return qs.replace("?", "").split("&").reduce(function(obj, pair) {
        var i = pair.indexOf("=");
        var key = pair.slice(0, i);
        var val = pair.slice(++i);
        // Due to how the URLSearchParams API treats spaces
        obj[key] = decodeURIComponent(val.replace(/\+/g, "%20"));
        return obj;
    }, {});
};

},{}],"b7JWn":[function(require,module,exports) {
"use strict";
/**
 * Highlight the given string of `js`.
 *
 * @private
 * @param {string} js
 * @return {string}
 */ function highlight(js) {
    return js.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\/\/(.*)/gm, '<span class="comment">//$1</span>').replace(/('.*?')/gm, '<span class="string">$1</span>').replace(/(\d+\.\d+)/gm, '<span class="number">$1</span>').replace(/(\d+)/gm, '<span class="number">$1</span>').replace(/\bnew[ \t]+(\w+)/gm, '<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm, '<span class="keyword">$1</span>');
}
/**
 * Highlight the contents of tag `name`.
 *
 * @private
 * @param {string} name
 */ module.exports = function highlightTags(name) {
    var code = document.getElementById("mocha").getElementsByTagName(name);
    for(var i = 0, len = code.length; i < len; ++i)code[i].innerHTML = highlight(code[i].innerHTML);
};

},{}],"a4DXv":[function(require,module,exports) {
var global = arguments[3];
"use strict";
/*!
 * mocha
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */ var escapeRe = require("bff60b8c7d3e7bb1");
var path = require("b89ad3ff1df9a80e");
var builtinReporters = require("6ad045627e280bd2");
var utils = require("ed03a654a6169b2");
var mocharc = require("b5babafea0112a17");
var Suite = require("e40d791de0bd9e0b");
var esmUtils = require("2b15923606fca333");
var createStatsCollector = require("90423f6f6205c7a1");
const { createInvalidReporterError, createInvalidInterfaceError, createMochaInstanceAlreadyDisposedError, createMochaInstanceAlreadyRunningError, createUnsupportedError } = require("4674eac525889e2d");
const { EVENT_FILE_PRE_REQUIRE, EVENT_FILE_POST_REQUIRE, EVENT_FILE_REQUIRE } = Suite.constants;
var debug = require("8025e39380899f6c")("mocha:mocha");
exports = module.exports = Mocha;
/**
 * A Mocha instance is a finite state machine.
 * These are the states it can be in.
 * @private
 */ var mochaStates = utils.defineConstants({
    /**
   * Initial state of the mocha instance
   * @private
   */ INIT: "init",
    /**
   * Mocha instance is running tests
   * @private
   */ RUNNING: "running",
    /**
   * Mocha instance is done running tests and references to test functions and hooks are cleaned.
   * You can reset this state by unloading the test files.
   * @private
   */ REFERENCES_CLEANED: "referencesCleaned",
    /**
   * Mocha instance is disposed and can no longer be used.
   * @private
   */ DISPOSED: "disposed"
});
/**
 * To require local UIs and reporters when running in node.
 */ if (!utils.isBrowser() && typeof module.paths !== "undefined") {
    var cwd = utils.cwd();
    module.paths.push(cwd, path.join(cwd, "node_modules"));
}
/**
 * Expose internals.
 * @private
 */ exports.utils = utils;
exports.interfaces = require("c5fed92ed04ab896");
/**
 * @public
 * @memberof Mocha
 */ exports.reporters = builtinReporters;
exports.Runnable = require("c066335fd2f4154c");
exports.Context = require("69fbd439f6055963");
/**
 *
 * @memberof Mocha
 */ exports.Runner = require("b3e74a4dcc2ec1a7");
exports.Suite = Suite;
exports.Hook = require("5ffcd2fdb90bc96f");
exports.Test = require("af08e33753722f71");
let currentContext;
exports.afterEach = function(...args) {
    return (currentContext.afterEach || currentContext.teardown).apply(this, args);
};
exports.after = function(...args) {
    return (currentContext.after || currentContext.suiteTeardown).apply(this, args);
};
exports.beforeEach = function(...args) {
    return (currentContext.beforeEach || currentContext.setup).apply(this, args);
};
exports.before = function(...args) {
    return (currentContext.before || currentContext.suiteSetup).apply(this, args);
};
exports.describe = function(...args) {
    return (currentContext.describe || currentContext.suite).apply(this, args);
};
exports.describe.only = function(...args) {
    return (currentContext.describe || currentContext.suite).only.apply(this, args);
};
exports.describe.skip = function(...args) {
    return (currentContext.describe || currentContext.suite).skip.apply(this, args);
};
exports.it = function(...args) {
    return (currentContext.it || currentContext.test).apply(this, args);
};
exports.it.only = function(...args) {
    return (currentContext.it || currentContext.test).only.apply(this, args);
};
exports.it.skip = function(...args) {
    return (currentContext.it || currentContext.test).skip.apply(this, args);
};
exports.xdescribe = exports.describe.skip;
exports.xit = exports.it.skip;
exports.setup = exports.beforeEach;
exports.suiteSetup = exports.before;
exports.suiteTeardown = exports.after;
exports.suite = exports.describe;
exports.teardown = exports.afterEach;
exports.test = exports.it;
exports.run = function(...args) {
    return currentContext.run.apply(this, args);
};
/**
 * Constructs a new Mocha instance with `options`.
 *
 * @public
 * @class Mocha
 * @param {Object} [options] - Settings object.
 * @param {boolean} [options.allowUncaught] - Propagate uncaught errors?
 * @param {boolean} [options.asyncOnly] - Force `done` callback or promise?
 * @param {boolean} [options.bail] - Bail after first test failure?
 * @param {boolean} [options.checkLeaks] - Check for global variable leaks?
 * @param {boolean} [options.color] - Color TTY output from reporter?
 * @param {boolean} [options.delay] - Delay root suite execution?
 * @param {boolean} [options.diff] - Show diff on failure?
 * @param {boolean} [options.dryRun] - Report tests without running them?
 * @param {boolean} [options.failZero] - Fail test run if zero tests?
 * @param {string} [options.fgrep] - Test filter given string.
 * @param {boolean} [options.forbidOnly] - Tests marked `only` fail the suite?
 * @param {boolean} [options.forbidPending] - Pending tests fail the suite?
 * @param {boolean} [options.fullTrace] - Full stacktrace upon failure?
 * @param {string[]} [options.global] - Variables expected in global scope.
 * @param {RegExp|string} [options.grep] - Test filter given regular expression.
 * @param {boolean} [options.inlineDiffs] - Display inline diffs?
 * @param {boolean} [options.invert] - Invert test filter matches?
 * @param {boolean} [options.noHighlighting] - Disable syntax highlighting?
 * @param {string|constructor} [options.reporter] - Reporter name or constructor.
 * @param {Object} [options.reporterOption] - Reporter settings object.
 * @param {number} [options.retries] - Number of times to retry failed tests.
 * @param {number} [options.slow] - Slow threshold value.
 * @param {number|string} [options.timeout] - Timeout threshold value.
 * @param {string} [options.ui] - Interface name.
 * @param {boolean} [options.parallel] - Run jobs in parallel.
 * @param {number} [options.jobs] - Max number of worker processes for parallel runs.
 * @param {MochaRootHookObject} [options.rootHooks] - Hooks to bootstrap the root suite with.
 * @param {string[]} [options.require] - Pathname of `rootHooks` plugin for parallel runs.
 * @param {boolean} [options.isWorker] - Should be `true` if `Mocha` process is running in a worker process.
 */ function Mocha(options = {}) {
    options = {
        ...mocharc,
        ...options
    };
    this.files = [];
    this.options = options;
    // root suite
    this.suite = new exports.Suite("", new exports.Context(), true);
    this._cleanReferencesAfterRun = true;
    this._state = mochaStates.INIT;
    this.grep(options.grep).fgrep(options.fgrep).ui(options.ui).reporter(options.reporter, options.reporterOption || options.reporterOptions // for backwards compatibility
    ).slow(options.slow).global(options.global);
    // this guard exists because Suite#timeout does not consider `undefined` to be valid input
    if (typeof options.timeout !== "undefined") this.timeout(options.timeout === false ? 0 : options.timeout);
    if ("retries" in options) this.retries(options.retries);
    [
        "allowUncaught",
        "asyncOnly",
        "bail",
        "checkLeaks",
        "color",
        "delay",
        "diff",
        "dryRun",
        "failZero",
        "forbidOnly",
        "forbidPending",
        "fullTrace",
        "inlineDiffs",
        "invert"
    ].forEach(function(opt) {
        if (options[opt]) this[opt]();
    }, this);
    if (options.rootHooks) this.rootHooks(options.rootHooks);
    /**
   * The class which we'll instantiate in {@link Mocha#run}.  Defaults to
   * {@link Runner} in serial mode; changes in parallel mode.
   * @memberof Mocha
   * @private
   */ this._runnerClass = exports.Runner;
    /**
   * Whether or not to call {@link Mocha#loadFiles} implicitly when calling
   * {@link Mocha#run}.  If this is `true`, then it's up to the consumer to call
   * {@link Mocha#loadFiles} _or_ {@link Mocha#loadFilesAsync}.
   * @private
   * @memberof Mocha
   */ this._lazyLoadFiles = false;
    /**
   * It's useful for a Mocha instance to know if it's running in a worker process.
   * We could derive this via other means, but it's helpful to have a flag to refer to.
   * @memberof Mocha
   * @private
   */ this.isWorker = Boolean(options.isWorker);
    this.globalSetup(options.globalSetup).globalTeardown(options.globalTeardown).enableGlobalSetup(options.enableGlobalSetup).enableGlobalTeardown(options.enableGlobalTeardown);
    if (options.parallel && (typeof options.jobs === "undefined" || options.jobs > 1)) {
        debug("attempting to enable parallel mode");
        this.parallelMode(true);
    }
}
/**
 * Enables or disables bailing on the first failure.
 *
 * @public
 * @see [CLI option](../#-bail-b)
 * @param {boolean} [bail=true] - Whether to bail on first error.
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.bail = function(bail) {
    this.suite.bail(bail !== false);
    return this;
};
/**
 * @summary
 * Adds `file` to be loaded for execution.
 *
 * @description
 * Useful for generic setup code that must be included within test suite.
 *
 * @public
 * @see [CLI option](../#-file-filedirectoryglob)
 * @param {string} file - Pathname of file to be loaded.
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.addFile = function(file) {
    this.files.push(file);
    return this;
};
/**
 * Sets reporter to `reporter`, defaults to "spec".
 *
 * @public
 * @see [CLI option](../#-reporter-name-r-name)
 * @see [Reporters](../#reporters)
 * @param {String|Function} reporterName - Reporter name or constructor.
 * @param {Object} [reporterOptions] - Options used to configure the reporter.
 * @returns {Mocha} this
 * @chainable
 * @throws {Error} if requested reporter cannot be loaded
 * @example
 *
 * // Use XUnit reporter and direct its output to file
 * mocha.reporter('xunit', { output: '/path/to/testspec.xunit.xml' });
 */ Mocha.prototype.reporter = function(reporterName, reporterOptions) {
    if (typeof reporterName === "function") this._reporter = reporterName;
    else {
        reporterName = reporterName || "spec";
        var reporter;
        // Try to load a built-in reporter.
        if (builtinReporters[reporterName]) reporter = builtinReporters[reporterName];
        // Try to load reporters from process.cwd() and node_modules
        if (!reporter) {
            let foundReporter;
            try {
                foundReporter = undefined(reporterName);
                reporter = require(foundReporter);
            } catch (err) {
                if (foundReporter) throw createInvalidReporterError(err.message, foundReporter);
                // Try to load reporters from a cwd-relative path
                try {
                    reporter = require(path.resolve(reporterName));
                } catch (e) {
                    throw createInvalidReporterError(e.message, reporterName);
                }
            }
        }
        this._reporter = reporter;
    }
    this.options.reporterOption = reporterOptions;
    // alias option name is used in built-in reporters xunit/tap/progress
    this.options.reporterOptions = reporterOptions;
    return this;
};
/**
 * Sets test UI `name`, defaults to "bdd".
 *
 * @public
 * @see [CLI option](../#-ui-name-u-name)
 * @see [Interface DSLs](../#interfaces)
 * @param {string|Function} [ui=bdd] - Interface name or class.
 * @returns {Mocha} this
 * @chainable
 * @throws {Error} if requested interface cannot be loaded
 */ Mocha.prototype.ui = function(ui) {
    var bindInterface;
    if (typeof ui === "function") bindInterface = ui;
    else {
        ui = ui || "bdd";
        bindInterface = exports.interfaces[ui];
        if (!bindInterface) try {
            bindInterface = require(ui);
        } catch (err) {
            throw createInvalidInterfaceError(`invalid interface '${ui}'`, ui);
        }
    }
    bindInterface(this.suite);
    this.suite.on(EVENT_FILE_PRE_REQUIRE, function(context) {
        currentContext = context;
    });
    return this;
};
/**
 * Loads `files` prior to execution. Does not support ES Modules.
 *
 * @description
 * The implementation relies on Node's `require` to execute
 * the test interface functions and will be subject to its cache.
 * Supports only CommonJS modules. To load ES modules, use Mocha#loadFilesAsync.
 *
 * @private
 * @see {@link Mocha#addFile}
 * @see {@link Mocha#run}
 * @see {@link Mocha#unloadFiles}
 * @see {@link Mocha#loadFilesAsync}
 * @param {Function} [fn] - Callback invoked upon completion.
 */ Mocha.prototype.loadFiles = function(fn) {
    var self = this;
    var suite = this.suite;
    this.files.forEach(function(file) {
        file = path.resolve(file);
        suite.emit(EVENT_FILE_PRE_REQUIRE, global, file, self);
        suite.emit(EVENT_FILE_REQUIRE, require(file), file, self);
        suite.emit(EVENT_FILE_POST_REQUIRE, global, file, self);
    });
    fn && fn();
};
/**
 * Loads `files` prior to execution. Supports Node ES Modules.
 *
 * @description
 * The implementation relies on Node's `require` and `import` to execute
 * the test interface functions and will be subject to its cache.
 * Supports both CJS and ESM modules.
 *
 * @public
 * @see {@link Mocha#addFile}
 * @see {@link Mocha#run}
 * @see {@link Mocha#unloadFiles}
 * @param {Object} [options] - Settings object.
 * @param {Function} [options.esmDecorator] - Function invoked on esm module name right before importing it. By default will passthrough as is.
 * @returns {Promise}
 * @example
 *
 * // loads ESM (and CJS) test files asynchronously, then runs root suite
 * mocha.loadFilesAsync()
 *   .then(() => mocha.run(failures => process.exitCode = failures ? 1 : 0))
 *   .catch(() => process.exitCode = 1);
 */ Mocha.prototype.loadFilesAsync = function({ esmDecorator } = {}) {
    var self = this;
    var suite = this.suite;
    this.lazyLoadFiles(true);
    return esmUtils.loadFilesAsync(this.files, function(file) {
        suite.emit(EVENT_FILE_PRE_REQUIRE, global, file, self);
    }, function(file, resultModule) {
        suite.emit(EVENT_FILE_REQUIRE, resultModule, file, self);
        suite.emit(EVENT_FILE_POST_REQUIRE, global, file, self);
    }, esmDecorator);
};
/**
 * Removes a previously loaded file from Node's `require` cache.
 *
 * @private
 * @static
 * @see {@link Mocha#unloadFiles}
 * @param {string} file - Pathname of file to be unloaded.
 */ Mocha.unloadFile = function(file) {
    if (utils.isBrowser()) throw createUnsupportedError("unloadFile() is only supported in a Node.js environment");
    return require("b2c613f0b949cf94").unloadFile(file);
};
/**
 * Unloads `files` from Node's `require` cache.
 *
 * @description
 * This allows required files to be "freshly" reloaded, providing the ability
 * to reuse a Mocha instance programmatically.
 * Note: does not clear ESM module files from the cache
 *
 * <strong>Intended for consumers &mdash; not used internally</strong>
 *
 * @public
 * @see {@link Mocha#run}
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.unloadFiles = function() {
    if (this._state === mochaStates.DISPOSED) throw createMochaInstanceAlreadyDisposedError("Mocha instance is already disposed, it cannot be used again.", this._cleanReferencesAfterRun, this);
    this.files.forEach(function(file) {
        Mocha.unloadFile(file);
    });
    this._state = mochaStates.INIT;
    return this;
};
/**
 * Sets `grep` filter after escaping RegExp special characters.
 *
 * @public
 * @see {@link Mocha#grep}
 * @param {string} str - Value to be converted to a regexp.
 * @returns {Mocha} this
 * @chainable
 * @example
 *
 * // Select tests whose full title begins with `"foo"` followed by a period
 * mocha.fgrep('foo.');
 */ Mocha.prototype.fgrep = function(str) {
    if (!str) return this;
    return this.grep(new RegExp(escapeRe(str)));
};
/**
 * @summary
 * Sets `grep` filter used to select specific tests for execution.
 *
 * @description
 * If `re` is a regexp-like string, it will be converted to regexp.
 * The regexp is tested against the full title of each test (i.e., the
 * name of the test preceded by titles of each its ancestral suites).
 * As such, using an <em>exact-match</em> fixed pattern against the
 * test name itself will not yield any matches.
 * <br>
 * <strong>Previous filter value will be overwritten on each call!</strong>
 *
 * @public
 * @see [CLI option](../#-grep-regexp-g-regexp)
 * @see {@link Mocha#fgrep}
 * @see {@link Mocha#invert}
 * @param {RegExp|String} re - Regular expression used to select tests.
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Select tests whose full title contains `"match"`, ignoring case
 * mocha.grep(/match/i);
 * @example
 *
 * // Same as above but with regexp-like string argument
 * mocha.grep('/match/i');
 * @example
 *
 * // ## Anti-example
 * // Given embedded test `it('only-this-test')`...
 * mocha.grep('/^only-this-test$/');    // NO! Use `.only()` to do this!
 */ Mocha.prototype.grep = function(re) {
    if (utils.isString(re)) {
        // extract args if it's regex-like, i.e: [string, pattern, flag]
        var arg = re.match(/^\/(.*)\/([gimy]{0,4})$|.*/);
        this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);
    } else this.options.grep = re;
    return this;
};
/**
 * Inverts `grep` matches.
 *
 * @public
 * @see {@link Mocha#grep}
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Select tests whose full title does *not* contain `"match"`, ignoring case
 * mocha.grep(/match/i).invert();
 */ Mocha.prototype.invert = function() {
    this.options.invert = true;
    return this;
};
/**
 * Enables or disables checking for global variables leaked while running tests.
 *
 * @public
 * @see [CLI option](../#-check-leaks)
 * @param {boolean} [checkLeaks=true] - Whether to check for global variable leaks.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.checkLeaks = function(checkLeaks) {
    this.options.checkLeaks = checkLeaks !== false;
    return this;
};
/**
 * Enables or disables whether or not to dispose after each test run.
 * Disable this to ensure you can run the test suite multiple times.
 * If disabled, be sure to dispose mocha when you're done to prevent memory leaks.
 * @public
 * @see {@link Mocha#dispose}
 * @param {boolean} cleanReferencesAfterRun
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.cleanReferencesAfterRun = function(cleanReferencesAfterRun) {
    this._cleanReferencesAfterRun = cleanReferencesAfterRun !== false;
    return this;
};
/**
 * Manually dispose this mocha instance. Mark this instance as `disposed` and unable to run more tests.
 * It also removes function references to tests functions and hooks, so variables trapped in closures can be cleaned by the garbage collector.
 * @public
 */ Mocha.prototype.dispose = function() {
    if (this._state === mochaStates.RUNNING) throw createMochaInstanceAlreadyRunningError("Cannot dispose while the mocha instance is still running tests.");
    this.unloadFiles();
    this._previousRunner && this._previousRunner.dispose();
    this.suite.dispose();
    this._state = mochaStates.DISPOSED;
};
/**
 * Displays full stack trace upon test failure.
 *
 * @public
 * @see [CLI option](../#-full-trace)
 * @param {boolean} [fullTrace=true] - Whether to print full stacktrace upon failure.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.fullTrace = function(fullTrace) {
    this.options.fullTrace = fullTrace !== false;
    return this;
};
/**
 * Specifies whitelist of variable names to be expected in global scope.
 *
 * @public
 * @see [CLI option](../#-global-variable-name)
 * @see {@link Mocha#checkLeaks}
 * @param {String[]|String} global - Accepted global variable name(s).
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Specify variables to be expected in global scope
 * mocha.global(['jQuery', 'MyLib']);
 */ Mocha.prototype.global = function(global) {
    this.options.global = (this.options.global || []).concat(global).filter(Boolean).filter(function(elt, idx, arr) {
        return arr.indexOf(elt) === idx;
    });
    return this;
};
// for backwards compatibility, 'globals' is an alias of 'global'
Mocha.prototype.globals = Mocha.prototype.global;
/**
 * Enables or disables TTY color output by screen-oriented reporters.
 *
 * @public
 * @see [CLI option](../#-color-c-colors)
 * @param {boolean} [color=true] - Whether to enable color output.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.color = function(color) {
    this.options.color = color !== false;
    return this;
};
/**
 * Enables or disables reporter to use inline diffs (rather than +/-)
 * in test failure output.
 *
 * @public
 * @see [CLI option](../#-inline-diffs)
 * @param {boolean} [inlineDiffs=true] - Whether to use inline diffs.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.inlineDiffs = function(inlineDiffs) {
    this.options.inlineDiffs = inlineDiffs !== false;
    return this;
};
/**
 * Enables or disables reporter to include diff in test failure output.
 *
 * @public
 * @see [CLI option](../#-diff)
 * @param {boolean} [diff=true] - Whether to show diff on failure.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.diff = function(diff) {
    this.options.diff = diff !== false;
    return this;
};
/**
 * @summary
 * Sets timeout threshold value.
 *
 * @description
 * A string argument can use shorthand (such as "2s") and will be converted.
 * If the value is `0`, timeouts will be disabled.
 *
 * @public
 * @see [CLI option](../#-timeout-ms-t-ms)
 * @see [Timeouts](../#timeouts)
 * @param {number|string} msecs - Timeout threshold value.
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Sets timeout to one second
 * mocha.timeout(1000);
 * @example
 *
 * // Same as above but using string argument
 * mocha.timeout('1s');
 */ Mocha.prototype.timeout = function(msecs) {
    this.suite.timeout(msecs);
    return this;
};
/**
 * Sets the number of times to retry failed tests.
 *
 * @public
 * @see [CLI option](../#-retries-n)
 * @see [Retry Tests](../#retry-tests)
 * @param {number} retry - Number of times to retry failed tests.
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Allow any failed test to retry one more time
 * mocha.retries(1);
 */ Mocha.prototype.retries = function(retry) {
    this.suite.retries(retry);
    return this;
};
/**
 * Sets slowness threshold value.
 *
 * @public
 * @see [CLI option](../#-slow-ms-s-ms)
 * @param {number} msecs - Slowness threshold value.
 * @return {Mocha} this
 * @chainable
 * @example
 *
 * // Sets "slow" threshold to half a second
 * mocha.slow(500);
 * @example
 *
 * // Same as above but using string argument
 * mocha.slow('0.5s');
 */ Mocha.prototype.slow = function(msecs) {
    this.suite.slow(msecs);
    return this;
};
/**
 * Forces all tests to either accept a `done` callback or return a promise.
 *
 * @public
 * @see [CLI option](../#-async-only-a)
 * @param {boolean} [asyncOnly=true] - Whether to force `done` callback or promise.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.asyncOnly = function(asyncOnly) {
    this.options.asyncOnly = asyncOnly !== false;
    return this;
};
/**
 * Disables syntax highlighting (in browser).
 *
 * @public
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.noHighlighting = function() {
    this.options.noHighlighting = true;
    return this;
};
/**
 * Enables or disables uncaught errors to propagate.
 *
 * @public
 * @see [CLI option](../#-allow-uncaught)
 * @param {boolean} [allowUncaught=true] - Whether to propagate uncaught errors.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.allowUncaught = function(allowUncaught) {
    this.options.allowUncaught = allowUncaught !== false;
    return this;
};
/**
 * @summary
 * Delays root suite execution.
 *
 * @description
 * Used to perform async operations before any suites are run.
 *
 * @public
 * @see [delayed root suite](../#delayed-root-suite)
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.delay = function delay() {
    this.options.delay = true;
    return this;
};
/**
 * Enables or disables running tests in dry-run mode.
 *
 * @public
 * @see [CLI option](../#-dry-run)
 * @param {boolean} [dryRun=true] - Whether to activate dry-run mode.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.dryRun = function(dryRun) {
    this.options.dryRun = dryRun !== false;
    return this;
};
/**
 * Fails test run if no tests encountered with exit-code 1.
 *
 * @public
 * @see [CLI option](../#-fail-zero)
 * @param {boolean} [failZero=true] - Whether to fail test run.
 * @return {Mocha} this
 * @chainable
 */ Mocha.prototype.failZero = function(failZero) {
    this.options.failZero = failZero !== false;
    return this;
};
/**
 * Causes tests marked `only` to fail the suite.
 *
 * @public
 * @see [CLI option](../#-forbid-only)
 * @param {boolean} [forbidOnly=true] - Whether tests marked `only` fail the suite.
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.forbidOnly = function(forbidOnly) {
    this.options.forbidOnly = forbidOnly !== false;
    return this;
};
/**
 * Causes pending tests and tests marked `skip` to fail the suite.
 *
 * @public
 * @see [CLI option](../#-forbid-pending)
 * @param {boolean} [forbidPending=true] - Whether pending tests fail the suite.
 * @returns {Mocha} this
 * @chainable
 */ Mocha.prototype.forbidPending = function(forbidPending) {
    this.options.forbidPending = forbidPending !== false;
    return this;
};
/**
 * Throws an error if mocha is in the wrong state to be able to transition to a "running" state.
 * @private
 */ Mocha.prototype._guardRunningStateTransition = function() {
    if (this._state === mochaStates.RUNNING) throw createMochaInstanceAlreadyRunningError("Mocha instance is currently running tests, cannot start a next test run until this one is done", this);
    if (this._state === mochaStates.DISPOSED || this._state === mochaStates.REFERENCES_CLEANED) throw createMochaInstanceAlreadyDisposedError("Mocha instance is already disposed, cannot start a new test run. Please create a new mocha instance. Be sure to set disable `cleanReferencesAfterRun` when you want to reuse the same mocha instance for multiple test runs.", this._cleanReferencesAfterRun, this);
};
/**
 * Mocha version as specified by "package.json".
 *
 * @name Mocha#version
 * @type string
 * @readonly
 */ Object.defineProperty(Mocha.prototype, "version", {
    value: require("f91dabe3c5f3b4e7").version,
    configurable: false,
    enumerable: true,
    writable: false
});
/**
 * Callback to be invoked when test execution is complete.
 *
 * @private
 * @callback DoneCB
 * @param {number} failures - Number of failures that occurred.
 */ /**
 * Runs root suite and invokes `fn()` when complete.
 *
 * @description
 * To run tests multiple times (or to run tests in files that are
 * already in the `require` cache), make sure to clear them from
 * the cache first!
 *
 * @public
 * @see {@link Mocha#unloadFiles}
 * @see {@link Runner#run}
 * @param {DoneCB} [fn] - Callback invoked when test execution completed.
 * @returns {Runner} runner instance
 * @example
 *
 * // exit with non-zero status if there were test failures
 * mocha.run(failures => process.exitCode = failures ? 1 : 0);
 */ Mocha.prototype.run = function(fn) {
    this._guardRunningStateTransition();
    this._state = mochaStates.RUNNING;
    if (this._previousRunner) {
        this._previousRunner.dispose();
        this.suite.reset();
    }
    if (this.files.length && !this._lazyLoadFiles) this.loadFiles();
    var suite = this.suite;
    var options = this.options;
    options.files = this.files;
    const runner = new this._runnerClass(suite, {
        cleanReferencesAfterRun: this._cleanReferencesAfterRun,
        delay: options.delay,
        dryRun: options.dryRun,
        failZero: options.failZero
    });
    createStatsCollector(runner);
    var reporter = new this._reporter(runner, options);
    runner.checkLeaks = options.checkLeaks === true;
    runner.fullStackTrace = options.fullTrace;
    runner.asyncOnly = options.asyncOnly;
    runner.allowUncaught = options.allowUncaught;
    runner.forbidOnly = options.forbidOnly;
    runner.forbidPending = options.forbidPending;
    if (options.grep) runner.grep(options.grep, options.invert);
    if (options.global) runner.globals(options.global);
    if (options.color !== undefined) exports.reporters.Base.useColors = options.color;
    exports.reporters.Base.inlineDiffs = options.inlineDiffs;
    exports.reporters.Base.hideDiff = !options.diff;
    const done = (failures)=>{
        this._previousRunner = runner;
        this._state = this._cleanReferencesAfterRun ? mochaStates.REFERENCES_CLEANED : mochaStates.INIT;
        fn = fn || utils.noop;
        if (typeof reporter.done === "function") reporter.done(failures, fn);
        else fn(failures);
    };
    const runAsync = async (runner)=>{
        const context = this.options.enableGlobalSetup && this.hasGlobalSetupFixtures() ? await this.runGlobalSetup(runner) : {};
        const failureCount = await runner.runAsync({
            files: this.files,
            options
        });
        if (this.options.enableGlobalTeardown && this.hasGlobalTeardownFixtures()) await this.runGlobalTeardown(runner, {
            context
        });
        return failureCount;
    };
    // no "catch" here is intentional. errors coming out of
    // Runner#run are considered uncaught/unhandled and caught
    // by the `process` event listeners.
    // also: returning anything other than `runner` would be a breaking
    // change
    runAsync(runner).then(done);
    return runner;
};
/**
 * Assigns hooks to the root suite
 * @param {MochaRootHookObject} [hooks] - Hooks to assign to root suite
 * @chainable
 */ Mocha.prototype.rootHooks = function rootHooks({ beforeAll = [], beforeEach = [], afterAll = [], afterEach = [] } = {}) {
    beforeAll = utils.castArray(beforeAll);
    beforeEach = utils.castArray(beforeEach);
    afterAll = utils.castArray(afterAll);
    afterEach = utils.castArray(afterEach);
    beforeAll.forEach((hook)=>{
        this.suite.beforeAll(hook);
    });
    beforeEach.forEach((hook)=>{
        this.suite.beforeEach(hook);
    });
    afterAll.forEach((hook)=>{
        this.suite.afterAll(hook);
    });
    afterEach.forEach((hook)=>{
        this.suite.afterEach(hook);
    });
    return this;
};
/**
 * Toggles parallel mode.
 *
 * Must be run before calling {@link Mocha#run}. Changes the `Runner` class to
 * use; also enables lazy file loading if not already done so.
 *
 * Warning: when passed `false` and lazy loading has been enabled _via any means_ (including calling `parallelMode(true)`), this method will _not_ disable lazy loading. Lazy loading is a prerequisite for parallel
 * mode, but parallel mode is _not_ a prerequisite for lazy loading!
 * @param {boolean} [enable] - If `true`, enable; otherwise disable.
 * @throws If run in browser
 * @throws If Mocha not in `INIT` state
 * @returns {Mocha}
 * @chainable
 * @public
 */ Mocha.prototype.parallelMode = function parallelMode(enable = true) {
    if (utils.isBrowser()) throw createUnsupportedError("parallel mode is only supported in Node.js");
    const parallel = Boolean(enable);
    if (parallel === this.options.parallel && this._lazyLoadFiles && this._runnerClass !== exports.Runner) return this;
    if (this._state !== mochaStates.INIT) throw createUnsupportedError("cannot change parallel mode after having called run()");
    this.options.parallel = parallel;
    // swap Runner class
    this._runnerClass = parallel ? require("42f538be28aa1414") : exports.Runner;
    // lazyLoadFiles may have been set `true` otherwise (for ESM loading),
    // so keep `true` if so.
    return this.lazyLoadFiles(this._lazyLoadFiles || parallel);
};
/**
 * Disables implicit call to {@link Mocha#loadFiles} in {@link Mocha#run}. This
 * setting is used by watch mode, parallel mode, and for loading ESM files.
 * @todo This should throw if we've already loaded files; such behavior
 * necessitates adding a new state.
 * @param {boolean} [enable] - If `true`, disable eager loading of files in
 * {@link Mocha#run}
 * @chainable
 * @public
 */ Mocha.prototype.lazyLoadFiles = function lazyLoadFiles(enable) {
    this._lazyLoadFiles = enable === true;
    debug("set lazy load to %s", enable);
    return this;
};
/**
 * Configures one or more global setup fixtures.
 *
 * If given no parameters, _unsets_ any previously-set fixtures.
 * @chainable
 * @public
 * @param {MochaGlobalFixture|MochaGlobalFixture[]} [setupFns] - Global setup fixture(s)
 * @returns {Mocha}
 */ Mocha.prototype.globalSetup = function globalSetup(setupFns = []) {
    setupFns = utils.castArray(setupFns);
    this.options.globalSetup = setupFns;
    debug("configured %d global setup functions", setupFns.length);
    return this;
};
/**
 * Configures one or more global teardown fixtures.
 *
 * If given no parameters, _unsets_ any previously-set fixtures.
 * @chainable
 * @public
 * @param {MochaGlobalFixture|MochaGlobalFixture[]} [teardownFns] - Global teardown fixture(s)
 * @returns {Mocha}
 */ Mocha.prototype.globalTeardown = function globalTeardown(teardownFns = []) {
    teardownFns = utils.castArray(teardownFns);
    this.options.globalTeardown = teardownFns;
    debug("configured %d global teardown functions", teardownFns.length);
    return this;
};
/**
 * Run any global setup fixtures sequentially, if any.
 *
 * This is _automatically called_ by {@link Mocha#run} _unless_ the `runGlobalSetup` option is `false`; see {@link Mocha#enableGlobalSetup}.
 *
 * The context object this function resolves with should be consumed by {@link Mocha#runGlobalTeardown}.
 * @param {object} [context] - Context object if already have one
 * @public
 * @returns {Promise<object>} Context object
 */ Mocha.prototype.runGlobalSetup = async function runGlobalSetup(context = {}) {
    const { globalSetup } = this.options;
    if (globalSetup && globalSetup.length) {
        debug("run(): global setup starting");
        await this._runGlobalFixtures(globalSetup, context);
        debug("run(): global setup complete");
    }
    return context;
};
/**
 * Run any global teardown fixtures sequentially, if any.
 *
 * This is _automatically called_ by {@link Mocha#run} _unless_ the `runGlobalTeardown` option is `false`; see {@link Mocha#enableGlobalTeardown}.
 *
 * Should be called with context object returned by {@link Mocha#runGlobalSetup}, if applicable.
 * @param {object} [context] - Context object if already have one
 * @public
 * @returns {Promise<object>} Context object
 */ Mocha.prototype.runGlobalTeardown = async function runGlobalTeardown(context = {}) {
    const { globalTeardown } = this.options;
    if (globalTeardown && globalTeardown.length) {
        debug("run(): global teardown starting");
        await this._runGlobalFixtures(globalTeardown, context);
    }
    debug("run(): global teardown complete");
    return context;
};
/**
 * Run global fixtures sequentially with context `context`
 * @private
 * @param {MochaGlobalFixture[]} [fixtureFns] - Fixtures to run
 * @param {object} [context] - context object
 * @returns {Promise<object>} context object
 */ Mocha.prototype._runGlobalFixtures = async function _runGlobalFixtures(fixtureFns = [], context = {}) {
    for await (const fixtureFn of fixtureFns)await fixtureFn.call(context);
    return context;
};
/**
 * Toggle execution of any global setup fixture(s)
 *
 * @chainable
 * @public
 * @param {boolean } [enabled=true] - If `false`, do not run global setup fixture
 * @returns {Mocha}
 */ Mocha.prototype.enableGlobalSetup = function enableGlobalSetup(enabled = true) {
    this.options.enableGlobalSetup = Boolean(enabled);
    return this;
};
/**
 * Toggle execution of any global teardown fixture(s)
 *
 * @chainable
 * @public
 * @param {boolean } [enabled=true] - If `false`, do not run global teardown fixture
 * @returns {Mocha}
 */ Mocha.prototype.enableGlobalTeardown = function enableGlobalTeardown(enabled = true) {
    this.options.enableGlobalTeardown = Boolean(enabled);
    return this;
};
/**
 * Returns `true` if one or more global setup fixtures have been supplied.
 * @public
 * @returns {boolean}
 */ Mocha.prototype.hasGlobalSetupFixtures = function hasGlobalSetupFixtures() {
    return Boolean(this.options.globalSetup.length);
};
/**
 * Returns `true` if one or more global teardown fixtures have been supplied.
 * @public
 * @returns {boolean}
 */ Mocha.prototype.hasGlobalTeardownFixtures = function hasGlobalTeardownFixtures() {
    return Boolean(this.options.globalTeardown.length);
}; /**
 * An alternative way to define root hooks that works with parallel runs.
 * @typedef {Object} MochaRootHookObject
 * @property {Function|Function[]} [beforeAll] - "Before all" hook(s)
 * @property {Function|Function[]} [beforeEach] - "Before each" hook(s)
 * @property {Function|Function[]} [afterAll] - "After all" hook(s)
 * @property {Function|Function[]} [afterEach] - "After each" hook(s)
 */  /**
 * An function that returns a {@link MochaRootHookObject}, either sync or async.
   @callback MochaRootHookFunction
 * @returns {MochaRootHookObject|Promise<MochaRootHookObject>}
 */  /**
 * A function that's invoked _once_ which is either sync or async.
 * Can be a "teardown" or "setup".  These will all share the same context.
 * @callback MochaGlobalFixture
 * @returns {void|Promise<void>}
 */  /**
 * An object making up all necessary parts of a plugin loader and aggregator
 * @typedef {Object} PluginDefinition
 * @property {string} exportName - Named export to use
 * @property {string} [optionName] - Option name for Mocha constructor (use `exportName` if omitted)
 * @property {PluginValidator} [validate] - Validator function
 * @property {PluginFinalizer} [finalize] - Finalizer/aggregator function
 */  /**
 * A (sync) function to assert a user-supplied plugin implementation is valid.
 *
 * Defined in a {@link PluginDefinition}.

 * @callback PluginValidator
 * @param {*} value - Value to check
 * @this {PluginDefinition}
 * @returns {void}
 */  /**
 * A function to finalize plugins impls of a particular ilk
 * @callback PluginFinalizer
 * @param {Array<*>} impls - User-supplied implementations
 * @returns {Promise<*>|*}
 */ 

},{"bff60b8c7d3e7bb1":"kqFAt","b89ad3ff1df9a80e":"jhUEF","6ad045627e280bd2":"fYmkX","ed03a654a6169b2":"tLxDb","b5babafea0112a17":"9yC1f","e40d791de0bd9e0b":"lfZtK","2b15923606fca333":"jhUEF","90423f6f6205c7a1":"b0OKt","4674eac525889e2d":"fbJXN","8025e39380899f6c":"l0oUb","c5fed92ed04ab896":"9BLIX","c066335fd2f4154c":"dIYAm","69fbd439f6055963":"7vSKC","b3e74a4dcc2ec1a7":"9bciI","5ffcd2fdb90bc96f":"d6vXk","af08e33753722f71":"crHUQ","b2c613f0b949cf94":"jhUEF","f91dabe3c5f3b4e7":"aW19C","42f538be28aa1414":"jhUEF"}],"kqFAt":[function(require,module,exports) {
"use strict";
module.exports = (string)=>{
    if (typeof string !== "string") throw new TypeError("Expected a string");
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
};

},{}],"fYmkX":[function(require,module,exports) {
"use strict";
// Alias exports to a their normalized format Mocha#reporter to prevent a need
// for dynamic (try/catch) requires, which Browserify doesn't handle.
exports.Base = exports.base = require("5ba2dd1784899374");
exports.Dot = exports.dot = require("8e0bef71fd5543fa");
exports.Doc = exports.doc = require("a6458e6e6cb33a3a");
exports.TAP = exports.tap = require("e36db771be07dc29");
exports.JSON = exports.json = require("708d9f840ed41823");
exports.HTML = exports.html = require("58022a9e3c5632b3");
exports.List = exports.list = require("ba4269dff4a5bd85");
exports.Min = exports.min = require("350bb8ddd018b2fc");
exports.Spec = exports.spec = require("5ed2a8cbb9e02bcf");
exports.Nyan = exports.nyan = require("6ea8e20d9b73cd3a");
exports.XUnit = exports.xunit = require("de60da8453acf0d8");
exports.Markdown = exports.markdown = require("4a5a4f0c03f911bd");
exports.Progress = exports.progress = require("d27e09c588602009");
exports.Landing = exports.landing = require("66ec5edd86b93937");
exports.JSONStream = exports["json-stream"] = require("6f8521bcfb210702");

},{"5ba2dd1784899374":"hLmjX","8e0bef71fd5543fa":"1U48L","a6458e6e6cb33a3a":"iNsVl","e36db771be07dc29":"49hq1","708d9f840ed41823":"dI5He","58022a9e3c5632b3":"6LzeA","ba4269dff4a5bd85":"6wP3F","350bb8ddd018b2fc":"8oohP","5ed2a8cbb9e02bcf":"d8QwL","6ea8e20d9b73cd3a":"3WLr6","de60da8453acf0d8":"4sSiG","4a5a4f0c03f911bd":"8NF2X","d27e09c588602009":"bskcn","66ec5edd86b93937":"6kGnM","6f8521bcfb210702":"jgxFs"}],"hLmjX":[function(require,module,exports) {
var global = arguments[3];
var process = require("54b7ac4564ed1634");
"use strict";
/**
 * @module Base
 */ /**
 * Module dependencies.
 */ var diff = require("95f6d79a408a314c");
var milliseconds = require("8e3add133c95a9a1");
var utils = require("baeea3317d7378c8");
var supportsColor = require("d1533f1441e7c0e2");
var symbols = require("e518d801c6141a5e");
var constants = require("a656741dc2b13181").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
const isBrowser = utils.isBrowser();
function getBrowserWindowSize() {
    if ("innerHeight" in global) return [
        global.innerHeight,
        global.innerWidth
    ];
    // In a Web Worker, the DOM Window is not available.
    return [
        640,
        480
    ];
}
/**
 * Expose `Base`.
 */ exports = module.exports = Base;
/**
 * Check if both stdio streams are associated with a tty.
 */ var isatty = isBrowser || process.stdout.isTTY && process.stderr.isTTY;
/**
 * Save log references to avoid tests interfering (see GH-3604).
 */ var consoleLog = console.log;
/**
 * Enable coloring by default, except in the browser interface.
 */ exports.useColors = !isBrowser && (supportsColor.stdout || false);
/**
 * Inline diffs instead of +/-
 */ exports.inlineDiffs = false;
/**
 * Truncate diffs longer than this value to avoid slow performance
 */ exports.maxDiffSize = 8192;
/**
 * Default color map.
 */ exports.colors = {
    pass: 90,
    fail: 31,
    "bright pass": 92,
    "bright fail": 91,
    "bright yellow": 93,
    pending: 36,
    suite: 0,
    "error title": 0,
    "error message": 31,
    "error stack": 90,
    checkmark: 32,
    fast: 90,
    medium: 33,
    slow: 31,
    green: 32,
    light: 90,
    "diff gutter": 90,
    "diff added": 32,
    "diff removed": 31,
    "diff added inline": "30;42",
    "diff removed inline": "30;41"
};
/**
 * Default symbol map.
 */ exports.symbols = {
    ok: symbols.success,
    err: symbols.error,
    dot: ".",
    comma: ",",
    bang: "!"
};
/**
 * Color `str` with the given `type`,
 * allowing colors to be disabled,
 * as well as user-defined color
 * schemes.
 *
 * @private
 * @param {string} type
 * @param {string} str
 * @return {string}
 */ var color = exports.color = function(type, str) {
    if (!exports.useColors) return String(str);
    return "\x1b[" + exports.colors[type] + "m" + str + "\x1b[0m";
};
/**
 * Expose term window size, with some defaults for when stderr is not a tty.
 */ exports.window = {
    width: 75
};
if (isatty) {
    if (isBrowser) exports.window.width = getBrowserWindowSize()[1];
    else exports.window.width = process.stdout.getWindowSize(1)[0];
}
/**
 * Expose some basic cursor interactions that are common among reporters.
 */ exports.cursor = {
    hide: function() {
        isatty && process.stdout.write("\x1b[?25l");
    },
    show: function() {
        isatty && process.stdout.write("\x1b[?25h");
    },
    deleteLine: function() {
        isatty && process.stdout.write("\x1b[2K");
    },
    beginningOfLine: function() {
        isatty && process.stdout.write("\x1b[0G");
    },
    CR: function() {
        if (isatty) {
            exports.cursor.deleteLine();
            exports.cursor.beginningOfLine();
        } else process.stdout.write("\r");
    }
};
var showDiff = exports.showDiff = function(err) {
    return err && err.showDiff !== false && sameType(err.actual, err.expected) && err.expected !== undefined;
};
function stringifyDiffObjs(err) {
    if (!utils.isString(err.actual) || !utils.isString(err.expected)) {
        err.actual = utils.stringify(err.actual);
        err.expected = utils.stringify(err.expected);
    }
}
/**
 * Returns a diff between 2 strings with coloured ANSI output.
 *
 * @description
 * The diff will be either inline or unified dependent on the value
 * of `Base.inlineDiff`.
 *
 * @param {string} actual
 * @param {string} expected
 * @return {string} Diff
 */ var generateDiff = exports.generateDiff = function(actual, expected) {
    try {
        var maxLen = exports.maxDiffSize;
        var skipped = 0;
        if (maxLen > 0) {
            skipped = Math.max(actual.length - maxLen, expected.length - maxLen);
            actual = actual.slice(0, maxLen);
            expected = expected.slice(0, maxLen);
        }
        let result = exports.inlineDiffs ? inlineDiff(actual, expected) : unifiedDiff(actual, expected);
        if (skipped > 0) result = `${result}\n      [mocha] output truncated to ${maxLen} characters, see "maxDiffSize" reporter-option\n`;
        return result;
    } catch (err) {
        var msg = "\n      " + color("diff added", "+ expected") + " " + color("diff removed", "- actual:  failed to generate Mocha diff") + "\n";
        return msg;
    }
};
/**
 * Outputs the given `failures` as a list.
 *
 * @public
 * @memberof Mocha.reporters.Base
 * @variation 1
 * @param {Object[]} failures - Each is Test instance with corresponding
 *     Error property
 */ exports.list = function(failures) {
    var multipleErr, multipleTest;
    Base.consoleLog();
    failures.forEach(function(test, i) {
        // format
        var fmt = color("error title", "  %s) %s:\n") + color("error message", "     %s") + color("error stack", "\n%s\n");
        // msg
        var msg;
        var err;
        if (test.err && test.err.multiple) {
            if (multipleTest !== test) {
                multipleTest = test;
                multipleErr = [
                    test.err
                ].concat(test.err.multiple);
            }
            err = multipleErr.shift();
        } else err = test.err;
        var message;
        if (typeof err.inspect === "function") message = err.inspect() + "";
        else if (err.message && typeof err.message.toString === "function") message = err.message + "";
        else message = "";
        var stack = err.stack || message;
        var index = message ? stack.indexOf(message) : -1;
        if (index === -1) msg = message;
        else {
            index += message.length;
            msg = stack.slice(0, index);
            // remove msg from stack
            stack = stack.slice(index + 1);
        }
        // uncaught
        if (err.uncaught) msg = "Uncaught " + msg;
        // explicitly show diff
        if (!exports.hideDiff && showDiff(err)) {
            stringifyDiffObjs(err);
            fmt = color("error title", "  %s) %s:\n%s") + color("error stack", "\n%s\n");
            var match = message.match(/^([^:]+): expected/);
            msg = "\n      " + color("error message", match ? match[1] : msg);
            msg += generateDiff(err.actual, err.expected);
        }
        // indent stack trace
        stack = stack.replace(/^/gm, "  ");
        // indented test title
        var testTitle = "";
        test.titlePath().forEach(function(str, index) {
            if (index !== 0) testTitle += "\n     ";
            for(var i = 0; i < index; i++)testTitle += "  ";
            testTitle += str;
        });
        Base.consoleLog(fmt, i + 1, testTitle, msg, stack);
    });
};
/**
 * Constructs a new `Base` reporter instance.
 *
 * @description
 * All other reporters generally inherit from this reporter.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Base(runner, options) {
    var failures = this.failures = [];
    if (!runner) throw new TypeError("Missing runner argument");
    this.options = options || {};
    this.runner = runner;
    this.stats = runner.stats; // assigned so Reporters keep a closer reference
    var maxDiffSizeOpt = this.options.reporterOption && this.options.reporterOption.maxDiffSize;
    if (maxDiffSizeOpt !== undefined && !isNaN(Number(maxDiffSizeOpt))) exports.maxDiffSize = Number(maxDiffSizeOpt);
    runner.on(EVENT_TEST_PASS, function(test) {
        if (test.duration > test.slow()) test.speed = "slow";
        else if (test.duration > test.slow() / 2) test.speed = "medium";
        else test.speed = "fast";
    });
    runner.on(EVENT_TEST_FAIL, function(test, err) {
        if (showDiff(err)) stringifyDiffObjs(err);
        // more than one error per test
        if (test.err && err instanceof Error) test.err.multiple = (test.err.multiple || []).concat(err);
        else test.err = err;
        failures.push(test);
    });
}
/**
 * Outputs common epilogue used by many of the bundled reporters.
 *
 * @public
 * @memberof Mocha.reporters
 */ Base.prototype.epilogue = function() {
    var stats = this.stats;
    var fmt;
    Base.consoleLog();
    // passes
    fmt = color("bright pass", " ") + color("green", " %d passing") + color("light", " (%s)");
    Base.consoleLog(fmt, stats.passes || 0, milliseconds(stats.duration));
    // pending
    if (stats.pending) {
        fmt = color("pending", " ") + color("pending", " %d pending");
        Base.consoleLog(fmt, stats.pending);
    }
    // failures
    if (stats.failures) {
        fmt = color("fail", "  %d failing");
        Base.consoleLog(fmt, stats.failures);
        Base.list(this.failures);
        Base.consoleLog();
    }
    Base.consoleLog();
};
/**
 * Pads the given `str` to `len`.
 *
 * @private
 * @param {string} str
 * @param {string} len
 * @return {string}
 */ function pad(str, len) {
    str = String(str);
    return Array(len - str.length + 1).join(" ") + str;
}
/**
 * Returns inline diff between 2 strings with coloured ANSI output.
 *
 * @private
 * @param {String} actual
 * @param {String} expected
 * @return {string} Diff
 */ function inlineDiff(actual, expected) {
    var msg = errorDiff(actual, expected);
    // linenos
    var lines = msg.split("\n");
    if (lines.length > 4) {
        var width = String(lines.length).length;
        msg = lines.map(function(str, i) {
            return pad(++i, width) + " |" + " " + str;
        }).join("\n");
    }
    // legend
    msg = "\n" + color("diff removed inline", "actual") + " " + color("diff added inline", "expected") + "\n\n" + msg + "\n";
    // indent
    msg = msg.replace(/^/gm, "      ");
    return msg;
}
/**
 * Returns unified diff between two strings with coloured ANSI output.
 *
 * @private
 * @param {String} actual
 * @param {String} expected
 * @return {string} The diff.
 */ function unifiedDiff(actual, expected) {
    var indent = "      ";
    function cleanUp(line) {
        if (line[0] === "+") return indent + colorLines("diff added", line);
        if (line[0] === "-") return indent + colorLines("diff removed", line);
        if (line.match(/@@/)) return "--";
        if (line.match(/\\ No newline/)) return null;
        return indent + line;
    }
    function notBlank(line) {
        return typeof line !== "undefined" && line !== null;
    }
    var msg = diff.createPatch("string", actual, expected);
    var lines = msg.split("\n").splice(5);
    return "\n      " + colorLines("diff added", "+ expected") + " " + colorLines("diff removed", "- actual") + "\n\n" + lines.map(cleanUp).filter(notBlank).join("\n");
}
/**
 * Returns character diff for `err`.
 *
 * @private
 * @param {String} actual
 * @param {String} expected
 * @return {string} the diff
 */ function errorDiff(actual, expected) {
    return diff.diffWordsWithSpace(actual, expected).map(function(str) {
        if (str.added) return colorLines("diff added inline", str.value);
        if (str.removed) return colorLines("diff removed inline", str.value);
        return str.value;
    }).join("");
}
/**
 * Colors lines for `str`, using the color `name`.
 *
 * @private
 * @param {string} name
 * @param {string} str
 * @return {string}
 */ function colorLines(name, str) {
    return str.split("\n").map(function(str) {
        return color(name, str);
    }).join("\n");
}
/**
 * Object#toString reference.
 */ var objToString = Object.prototype.toString;
/**
 * Checks that a / b have the same type.
 *
 * @private
 * @param {Object} a
 * @param {Object} b
 * @return {boolean}
 */ function sameType(a, b) {
    return objToString.call(a) === objToString.call(b);
}
Base.consoleLog = consoleLog;
Base.abstract = true;

},{"54b7ac4564ed1634":"d5jf4","95f6d79a408a314c":"9qKc6","8e3add133c95a9a1":"jauEe","baeea3317d7378c8":"tLxDb","d1533f1441e7c0e2":"jhUEF","e518d801c6141a5e":"49Kl3","a656741dc2b13181":"9bciI"}],"9qKc6":[function(require,module,exports) {
(function(global, factory) {
    factory(exports);
})(this, function(exports1) {
    "use strict";
    function Diff() {}
    Diff.prototype = {
        diff: function diff(oldString, newString) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var callback = options.callback;
            if (typeof options === "function") {
                callback = options;
                options = {};
            }
            this.options = options;
            var self = this;
            function done(value) {
                if (callback) {
                    setTimeout(function() {
                        callback(undefined, value);
                    }, 0);
                    return true;
                } else return value;
            } // Allow subclasses to massage the input prior to running
            oldString = this.castInput(oldString);
            newString = this.castInput(newString);
            oldString = this.removeEmpty(this.tokenize(oldString));
            newString = this.removeEmpty(this.tokenize(newString));
            var newLen = newString.length, oldLen = oldString.length;
            var editLength = 1;
            var maxEditLength = newLen + oldLen;
            var bestPath = [
                {
                    newPos: -1,
                    components: []
                }
            ]; // Seed editLength = 0, i.e. the content starts with the same values
            var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
            if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) // Identity per the equality and tokenizer
            return done([
                {
                    value: this.join(newString),
                    count: newString.length
                }
            ]);
             // Main worker method. checks all permutations of a given edit length for acceptance.
            function execEditLength() {
                for(var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2){
                    var basePath = void 0;
                    var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                    if (addPath) // No one else is going to attempt to use this value, clear it
                    bestPath[diagonalPath - 1] = undefined;
                    var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
                    if (!canAdd && !canRemove) {
                        // If this path is a terminal then prune
                        bestPath[diagonalPath] = undefined;
                        continue;
                    } // Select the diagonal that we want to branch from. We select the prior
                    // path whose position in the new string is the farthest from the origin
                    // and does not pass the bounds of the diff graph
                    if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
                        basePath = clonePath(removePath);
                        self.pushComponent(basePath.components, undefined, true);
                    } else {
                        basePath = addPath; // No need to clone, we've pulled it from the list
                        basePath.newPos++;
                        self.pushComponent(basePath.components, true, undefined);
                    }
                    _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done
                    if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
                    else // Otherwise track this path as a potential candidate and continue.
                    bestPath[diagonalPath] = basePath;
                }
                editLength++;
            } // Performs the length of edit iteration. Is a bit fugly as this has to support the
            // sync and async mode which is never fun. Loops over execEditLength until a value
            // is produced.
            if (callback) (function exec() {
                setTimeout(function() {
                    // This should not happen, but we want to be safe.
                    /* istanbul ignore next */ if (editLength > maxEditLength) return callback();
                    if (!execEditLength()) exec();
                }, 0);
            })();
            else while(editLength <= maxEditLength){
                var ret = execEditLength();
                if (ret) return ret;
            }
        },
        pushComponent: function pushComponent(components, added, removed) {
            var last = components[components.length - 1];
            if (last && last.added === added && last.removed === removed) // We need to clone here as the component clone operation is just
            // as shallow array clone
            components[components.length - 1] = {
                count: last.count + 1,
                added: added,
                removed: removed
            };
            else components.push({
                count: 1,
                added: added,
                removed: removed
            });
        },
        extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
            var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
            while(newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])){
                newPos++;
                oldPos++;
                commonCount++;
            }
            if (commonCount) basePath.components.push({
                count: commonCount
            });
            basePath.newPos = newPos;
            return oldPos;
        },
        equals: function equals(left, right) {
            if (this.options.comparator) return this.options.comparator(left, right);
            else return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
        },
        removeEmpty: function removeEmpty(array) {
            var ret = [];
            for(var i = 0; i < array.length; i++)if (array[i]) ret.push(array[i]);
            return ret;
        },
        castInput: function castInput(value) {
            return value;
        },
        tokenize: function tokenize(value) {
            return value.split("");
        },
        join: function join(chars) {
            return chars.join("");
        }
    };
    function buildValues(diff, components, newString, oldString, useLongestToken) {
        var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
        for(; componentPos < componentLen; componentPos++){
            var component = components[componentPos];
            if (!component.removed) {
                if (!component.added && useLongestToken) {
                    var value = newString.slice(newPos, newPos + component.count);
                    value = value.map(function(value, i) {
                        var oldValue = oldString[oldPos + i];
                        return oldValue.length > value.length ? oldValue : value;
                    });
                    component.value = diff.join(value);
                } else component.value = diff.join(newString.slice(newPos, newPos + component.count));
                newPos += component.count; // Common case
                if (!component.added) oldPos += component.count;
            } else {
                component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
                oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
                // The diffing algorithm is tied to add then remove output and this is the simplest
                // route to get the desired output with minimal overhead.
                if (componentPos && components[componentPos - 1].added) {
                    var tmp = components[componentPos - 1];
                    components[componentPos - 1] = components[componentPos];
                    components[componentPos] = tmp;
                }
            }
        } // Special case handle for when one terminal is ignored (i.e. whitespace).
        // For this case we merge the terminal into the prior string and drop the change.
        // This is only available for string mode.
        var lastComponent = components[componentLen - 1];
        if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff.equals("", lastComponent.value)) {
            components[componentLen - 2].value += lastComponent.value;
            components.pop();
        }
        return components;
    }
    function clonePath(path) {
        return {
            newPos: path.newPos,
            components: path.components.slice(0)
        };
    }
    var characterDiff = new Diff();
    function diffChars(oldStr, newStr, options) {
        return characterDiff.diff(oldStr, newStr, options);
    }
    function generateOptions(options, defaults) {
        if (typeof options === "function") defaults.callback = options;
        else if (options) {
            for(var name in options)/* istanbul ignore else */ if (options.hasOwnProperty(name)) defaults[name] = options[name];
        }
        return defaults;
    }
    //
    // Ranges and exceptions:
    // Latin-1 Supplement, 0080–00FF
    //  - U+00D7  × Multiplication sign
    //  - U+00F7  ÷ Division sign
    // Latin Extended-A, 0100–017F
    // Latin Extended-B, 0180–024F
    // IPA Extensions, 0250–02AF
    // Spacing Modifier Letters, 02B0–02FF
    //  - U+02C7  ˇ &#711;  Caron
    //  - U+02D8  ˘ &#728;  Breve
    //  - U+02D9  ˙ &#729;  Dot Above
    //  - U+02DA  ˚ &#730;  Ring Above
    //  - U+02DB  ˛ &#731;  Ogonek
    //  - U+02DC  ˜ &#732;  Small Tilde
    //  - U+02DD  ˝ &#733;  Double Acute Accent
    // Latin Extended Additional, 1E00–1EFF
    var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
    var reWhitespace = /\S/;
    var wordDiff = new Diff();
    wordDiff.equals = function(left, right) {
        if (this.options.ignoreCase) {
            left = left.toLowerCase();
            right = right.toLowerCase();
        }
        return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
    };
    wordDiff.tokenize = function(value) {
        // All whitespace symbols except newline group into one token, each newline - in separate token
        var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
        for(var i = 0; i < tokens.length - 1; i++)// If we have an empty string in the next field and we have only word chars before and after, merge
        if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
            tokens[i] += tokens[i + 2];
            tokens.splice(i + 1, 2);
            i--;
        }
        return tokens;
    };
    function diffWords(oldStr, newStr, options) {
        options = generateOptions(options, {
            ignoreWhitespace: true
        });
        return wordDiff.diff(oldStr, newStr, options);
    }
    function diffWordsWithSpace(oldStr, newStr, options) {
        return wordDiff.diff(oldStr, newStr, options);
    }
    var lineDiff = new Diff();
    lineDiff.tokenize = function(value) {
        var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line
        if (!linesAndNewlines[linesAndNewlines.length - 1]) linesAndNewlines.pop();
         // Merge the content and line separators into single tokens
        for(var i = 0; i < linesAndNewlines.length; i++){
            var line = linesAndNewlines[i];
            if (i % 2 && !this.options.newlineIsToken) retLines[retLines.length - 1] += line;
            else {
                if (this.options.ignoreWhitespace) line = line.trim();
                retLines.push(line);
            }
        }
        return retLines;
    };
    function diffLines(oldStr, newStr, callback) {
        return lineDiff.diff(oldStr, newStr, callback);
    }
    function diffTrimmedLines(oldStr, newStr, callback) {
        var options = generateOptions(callback, {
            ignoreWhitespace: true
        });
        return lineDiff.diff(oldStr, newStr, options);
    }
    var sentenceDiff = new Diff();
    sentenceDiff.tokenize = function(value) {
        return value.split(/(\S.+?[.!?])(?=\s+|$)/);
    };
    function diffSentences(oldStr, newStr, callback) {
        return sentenceDiff.diff(oldStr, newStr, callback);
    }
    var cssDiff = new Diff();
    cssDiff.tokenize = function(value) {
        return value.split(/([{}:;,]|\s+)/);
    };
    function diffCss(oldStr, newStr, callback) {
        return cssDiff.diff(oldStr, newStr, callback);
    }
    function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function(obj) {
            return typeof obj;
        };
        else _typeof = function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        return _typeof(obj);
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
        return arr2;
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var objectPrototypeToString = Object.prototype.toString;
    var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
    // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
    jsonDiff.useLongestToken = true;
    jsonDiff.tokenize = lineDiff.tokenize;
    jsonDiff.castInput = function(value) {
        var _this$options = this.options, undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0 ? function(k, v) {
            return typeof v === "undefined" ? undefinedReplacement : v;
        } : _this$options$stringi;
        return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
    };
    jsonDiff.equals = function(left, right) {
        return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"));
    };
    function diffJson(oldObj, newObj, options) {
        return jsonDiff.diff(oldObj, newObj, options);
    } // This function handles the presence of circular references by bailing out when encountering an
    // object that is already on the "stack" of items being processed. Accepts an optional replacer
    function canonicalize(obj, stack, replacementStack, replacer, key) {
        stack = stack || [];
        replacementStack = replacementStack || [];
        if (replacer) obj = replacer(key, obj);
        var i;
        for(i = 0; i < stack.length; i += 1){
            if (stack[i] === obj) return replacementStack[i];
        }
        var canonicalizedObj;
        if ("[object Array]" === objectPrototypeToString.call(obj)) {
            stack.push(obj);
            canonicalizedObj = new Array(obj.length);
            replacementStack.push(canonicalizedObj);
            for(i = 0; i < obj.length; i += 1)canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
            stack.pop();
            replacementStack.pop();
            return canonicalizedObj;
        }
        if (obj && obj.toJSON) obj = obj.toJSON();
        if (_typeof(obj) === "object" && obj !== null) {
            stack.push(obj);
            canonicalizedObj = {};
            replacementStack.push(canonicalizedObj);
            var sortedKeys = [], _key;
            for(_key in obj)/* istanbul ignore else */ if (obj.hasOwnProperty(_key)) sortedKeys.push(_key);
            sortedKeys.sort();
            for(i = 0; i < sortedKeys.length; i += 1){
                _key = sortedKeys[i];
                canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
            }
            stack.pop();
            replacementStack.pop();
        } else canonicalizedObj = obj;
        return canonicalizedObj;
    }
    var arrayDiff = new Diff();
    arrayDiff.tokenize = function(value) {
        return value.slice();
    };
    arrayDiff.join = arrayDiff.removeEmpty = function(value) {
        return value;
    };
    function diffArrays(oldArr, newArr, callback) {
        return arrayDiff.diff(oldArr, newArr, callback);
    }
    function parsePatch(uniDiff) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/), delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [], list = [], i = 0;
        function parseIndex() {
            var index = {};
            list.push(index); // Parse diff metadata
            while(i < diffstr.length){
                var line = diffstr[i]; // File header found, end parsing diff metadata
                if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) break;
                 // Diff index
                var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
                if (header) index.index = header[1];
                i++;
            } // Parse file headers if they are defined. Unified diff requires them, but
            // there's no technical issues to have an isolated hunk without file header
            parseFileHeader(index);
            parseFileHeader(index); // Parse hunks
            index.hunks = [];
            while(i < diffstr.length){
                var _line = diffstr[i];
                if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) break;
                else if (/^@@/.test(_line)) index.hunks.push(parseHunk());
                else if (_line && options.strict) // Ignore unexpected content unless in strict mode
                throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(_line));
                else i++;
            }
        } // Parses the --- and +++ headers, if none are found, no lines
        // are consumed.
        function parseFileHeader(index) {
            var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
            if (fileHeader) {
                var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
                var data = fileHeader[2].split("	", 2);
                var fileName = data[0].replace(/\\\\/g, "\\");
                if (/^".*"$/.test(fileName)) fileName = fileName.substr(1, fileName.length - 2);
                index[keyPrefix + "FileName"] = fileName;
                index[keyPrefix + "Header"] = (data[1] || "").trim();
                i++;
            }
        } // Parses a hunk
        // This assumes that we are at the start of a hunk.
        function parseHunk() {
            var chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
            var hunk = {
                oldStart: +chunkHeader[1],
                oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
                newStart: +chunkHeader[3],
                newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
                lines: [],
                linedelimiters: []
            }; // Unified Diff Format quirk: If the chunk size is 0,
            // the first number is one lower than one would expect.
            // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
            if (hunk.oldLines === 0) hunk.oldStart += 1;
            if (hunk.newLines === 0) hunk.newStart += 1;
            var addCount = 0, removeCount = 0;
            for(; i < diffstr.length; i++){
                // Lines starting with '---' could be mistaken for the "remove line" operation
                // But they could be the header for the next file. Therefore prune such cases out.
                if (diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf("+++ ") === 0 && diffstr[i + 2].indexOf("@@") === 0) break;
                var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
                if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
                    hunk.lines.push(diffstr[i]);
                    hunk.linedelimiters.push(delimiters[i] || "\n");
                    if (operation === "+") addCount++;
                    else if (operation === "-") removeCount++;
                    else if (operation === " ") {
                        addCount++;
                        removeCount++;
                    }
                } else break;
            } // Handle the empty block count case
            if (!addCount && hunk.newLines === 1) hunk.newLines = 0;
            if (!removeCount && hunk.oldLines === 1) hunk.oldLines = 0;
             // Perform optional sanity checking
            if (options.strict) {
                if (addCount !== hunk.newLines) throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
                if (removeCount !== hunk.oldLines) throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
            }
            return hunk;
        }
        while(i < diffstr.length)parseIndex();
        return list;
    }
    // Iterator that traverses in the range of [min, max], stepping
    // by distance from a given start position. I.e. for [0, 4], with
    // start of 2, this will iterate 2, 3, 1, 4, 0.
    function distanceIterator(start, minLine, maxLine) {
        var wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
        return function iterator() {
            if (wantForward && !forwardExhausted) {
                if (backwardExhausted) localOffset++;
                else wantForward = false;
                 // Check if trying to fit beyond text length, and if not, check it fits
                // after offset location (or desired location on first iteration)
                if (start + localOffset <= maxLine) return localOffset;
                forwardExhausted = true;
            }
            if (!backwardExhausted) {
                if (!forwardExhausted) wantForward = true;
                 // Check if trying to fit before text beginning, and if not, check it fits
                // before offset location
                if (minLine <= start - localOffset) return -localOffset++;
                backwardExhausted = true;
                return iterator();
            } // We tried to fit hunk before text beginning and beyond text length, then
        // hunk can't fit on the text. Return undefined
        };
    }
    function applyPatch(source, uniDiff) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        if (typeof uniDiff === "string") uniDiff = parsePatch(uniDiff);
        if (Array.isArray(uniDiff)) {
            if (uniDiff.length > 1) throw new Error("applyPatch only works with a single input.");
            uniDiff = uniDiff[0];
        } // Apply the diff to the input
        var lines = source.split(/\r\n|[\n\v\f\r\x85]/), delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [], hunks = uniDiff.hunks, compareLine = options.compareLine || function(lineNumber, line, operation, patchContent) {
            return line === patchContent;
        }, errorCount = 0, fuzzFactor = options.fuzzFactor || 0, minLine = 0, offset = 0, removeEOFNL, addEOFNL;
        /**
     * Checks if the hunk exactly fits on the provided location
     */ function hunkFits(hunk, toPos) {
            for(var j = 0; j < hunk.lines.length; j++){
                var line = hunk.lines[j], operation = line.length > 0 ? line[0] : " ", content = line.length > 0 ? line.substr(1) : line;
                if (operation === " " || operation === "-") {
                    // Context sanity check
                    if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
                        errorCount++;
                        if (errorCount > fuzzFactor) return false;
                    }
                    toPos++;
                }
            }
            return true;
        } // Search best fit offsets for each hunk based on the previous ones
        for(var i = 0; i < hunks.length; i++){
            var hunk = hunks[i], maxLine = lines.length - hunk.oldLines, localOffset = 0, toPos = offset + hunk.oldStart - 1;
            var iterator = distanceIterator(toPos, minLine, maxLine);
            for(; localOffset !== undefined; localOffset = iterator())if (hunkFits(hunk, toPos + localOffset)) {
                hunk.offset = offset += localOffset;
                break;
            }
            if (localOffset === undefined) return false;
             // Set lower text limit to end of the current hunk, so next ones don't try
            // to fit over already patched text
            minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
        } // Apply patch hunks
        var diffOffset = 0;
        for(var _i = 0; _i < hunks.length; _i++){
            var _hunk = hunks[_i], _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
            diffOffset += _hunk.newLines - _hunk.oldLines;
            for(var j = 0; j < _hunk.lines.length; j++){
                var line = _hunk.lines[j], operation = line.length > 0 ? line[0] : " ", content = line.length > 0 ? line.substr(1) : line, delimiter = _hunk.linedelimiters[j];
                if (operation === " ") _toPos++;
                else if (operation === "-") {
                    lines.splice(_toPos, 1);
                    delimiters.splice(_toPos, 1);
                /* istanbul ignore else */ } else if (operation === "+") {
                    lines.splice(_toPos, 0, content);
                    delimiters.splice(_toPos, 0, delimiter);
                    _toPos++;
                } else if (operation === "\\") {
                    var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
                    if (previousOperation === "+") removeEOFNL = true;
                    else if (previousOperation === "-") addEOFNL = true;
                }
            }
        } // Handle EOFNL insertion/removal
        if (removeEOFNL) while(!lines[lines.length - 1]){
            lines.pop();
            delimiters.pop();
        }
        else if (addEOFNL) {
            lines.push("");
            delimiters.push("\n");
        }
        for(var _k = 0; _k < lines.length - 1; _k++)lines[_k] = lines[_k] + delimiters[_k];
        return lines.join("");
    } // Wrapper that supports multiple file patches via callbacks.
    function applyPatches(uniDiff, options) {
        if (typeof uniDiff === "string") uniDiff = parsePatch(uniDiff);
        var currentIndex = 0;
        function processIndex() {
            var index = uniDiff[currentIndex++];
            if (!index) return options.complete();
            options.loadFile(index, function(err, data) {
                if (err) return options.complete(err);
                var updatedContent = applyPatch(data, index, options);
                options.patched(index, updatedContent, function(err) {
                    if (err) return options.complete(err);
                    processIndex();
                });
            });
        }
        processIndex();
    }
    function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        if (!options) options = {};
        if (typeof options.context === "undefined") options.context = 4;
        var diff = diffLines(oldStr, newStr, options);
        diff.push({
            value: "",
            lines: []
        }); // Append an empty value to make cleanup easier
        function contextLines(lines) {
            return lines.map(function(entry) {
                return " " + entry;
            });
        }
        var hunks = [];
        var oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        var _loop = function _loop(i) {
            var current = diff[i], lines = current.lines || current.value.replace(/\n$/, "").split("\n");
            current.lines = lines;
            if (current.added || current.removed) {
                var _curRange;
                // If we have previous context, start with that
                if (!oldRangeStart) {
                    var prev = diff[i - 1];
                    oldRangeStart = oldLine;
                    newRangeStart = newLine;
                    if (prev) {
                        curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
                        oldRangeStart -= curRange.length;
                        newRangeStart -= curRange.length;
                    }
                } // Output our changes
                (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function(entry) {
                    return (current.added ? "+" : "-") + entry;
                }))); // Track the updated file position
                if (current.added) newLine += lines.length;
                else oldLine += lines.length;
            } else {
                // Identical context lines. Track line changes
                if (oldRangeStart) {
                    // Close out any changes that have been output (or join overlapping)
                    if (lines.length <= options.context * 2 && i < diff.length - 2) {
                        var _curRange2;
                        // Overlapping
                        (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
                    } else {
                        var _curRange3;
                        // end the range and output
                        var contextSize = Math.min(lines.length, options.context);
                        (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));
                        var hunk = {
                            oldStart: oldRangeStart,
                            oldLines: oldLine - oldRangeStart + contextSize,
                            newStart: newRangeStart,
                            newLines: newLine - newRangeStart + contextSize,
                            lines: curRange
                        };
                        if (i >= diff.length - 2 && lines.length <= options.context) {
                            // EOF is inside this hunk
                            var oldEOFNewline = /\n$/.test(oldStr);
                            var newEOFNewline = /\n$/.test(newStr);
                            var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;
                            if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) // special case: old has no eol and no trailing context; no-nl can end up before adds
                            // however, if the old file is empty, do not output the no-nl line
                            curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
                            if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) curRange.push("\\ No newline at end of file");
                        }
                        hunks.push(hunk);
                        oldRangeStart = 0;
                        newRangeStart = 0;
                        curRange = [];
                    }
                }
                oldLine += lines.length;
                newLine += lines.length;
            }
        };
        for(var i = 0; i < diff.length; i++)_loop(i);
        return {
            oldFileName: oldFileName,
            newFileName: newFileName,
            oldHeader: oldHeader,
            newHeader: newHeader,
            hunks: hunks
        };
    }
    function formatPatch(diff) {
        var ret = [];
        if (diff.oldFileName == diff.newFileName) ret.push("Index: " + diff.oldFileName);
        ret.push("===================================================================");
        ret.push("--- " + diff.oldFileName + (typeof diff.oldHeader === "undefined" ? "" : "	" + diff.oldHeader));
        ret.push("+++ " + diff.newFileName + (typeof diff.newHeader === "undefined" ? "" : "	" + diff.newHeader));
        for(var i = 0; i < diff.hunks.length; i++){
            var hunk = diff.hunks[i]; // Unified Diff Format quirk: If the chunk size is 0,
            // the first number is one lower than one would expect.
            // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
            if (hunk.oldLines === 0) hunk.oldStart -= 1;
            if (hunk.newLines === 0) hunk.newStart -= 1;
            ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
            ret.push.apply(ret, hunk.lines);
        }
        return ret.join("\n") + "\n";
    }
    function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
        return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
    }
    function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
        return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
    }
    function arrayEqual(a, b) {
        if (a.length !== b.length) return false;
        return arrayStartsWith(a, b);
    }
    function arrayStartsWith(array, start) {
        if (start.length > array.length) return false;
        for(var i = 0; i < start.length; i++){
            if (start[i] !== array[i]) return false;
        }
        return true;
    }
    function calcLineCount(hunk) {
        var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines), oldLines = _calcOldNewLineCount.oldLines, newLines = _calcOldNewLineCount.newLines;
        if (oldLines !== undefined) hunk.oldLines = oldLines;
        else delete hunk.oldLines;
        if (newLines !== undefined) hunk.newLines = newLines;
        else delete hunk.newLines;
    }
    function merge(mine, theirs, base) {
        mine = loadPatch(mine, base);
        theirs = loadPatch(theirs, base);
        var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
        // Leaving sanity checks on this to the API consumer that may know more about the
        // meaning in their own context.
        if (mine.index || theirs.index) ret.index = mine.index || theirs.index;
        if (mine.newFileName || theirs.newFileName) {
            if (!fileNameChanged(mine)) {
                // No header or no change in ours, use theirs (and ours if theirs does not exist)
                ret.oldFileName = theirs.oldFileName || mine.oldFileName;
                ret.newFileName = theirs.newFileName || mine.newFileName;
                ret.oldHeader = theirs.oldHeader || mine.oldHeader;
                ret.newHeader = theirs.newHeader || mine.newHeader;
            } else if (!fileNameChanged(theirs)) {
                // No header or no change in theirs, use ours
                ret.oldFileName = mine.oldFileName;
                ret.newFileName = mine.newFileName;
                ret.oldHeader = mine.oldHeader;
                ret.newHeader = mine.newHeader;
            } else {
                // Both changed... figure it out
                ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
                ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
                ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
                ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
            }
        }
        ret.hunks = [];
        var mineIndex = 0, theirsIndex = 0, mineOffset = 0, theirsOffset = 0;
        while(mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length){
            var mineCurrent = mine.hunks[mineIndex] || {
                oldStart: Infinity
            }, theirsCurrent = theirs.hunks[theirsIndex] || {
                oldStart: Infinity
            };
            if (hunkBefore(mineCurrent, theirsCurrent)) {
                // This patch does not overlap with any of the others, yay.
                ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
                mineIndex++;
                theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
            } else if (hunkBefore(theirsCurrent, mineCurrent)) {
                // This patch does not overlap with any of the others, yay.
                ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
                theirsIndex++;
                mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
            } else {
                // Overlap, merge as best we can
                var mergedHunk = {
                    oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
                    oldLines: 0,
                    newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
                    newLines: 0,
                    lines: []
                };
                mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
                theirsIndex++;
                mineIndex++;
                ret.hunks.push(mergedHunk);
            }
        }
        return ret;
    }
    function loadPatch(param, base) {
        if (typeof param === "string") {
            if (/^@@/m.test(param) || /^Index:/m.test(param)) return parsePatch(param)[0];
            if (!base) throw new Error("Must provide a base reference or pass in a patch");
            return structuredPatch(undefined, undefined, base, param);
        }
        return param;
    }
    function fileNameChanged(patch) {
        return patch.newFileName && patch.newFileName !== patch.oldFileName;
    }
    function selectField(index, mine, theirs) {
        if (mine === theirs) return mine;
        else {
            index.conflict = true;
            return {
                mine: mine,
                theirs: theirs
            };
        }
    }
    function hunkBefore(test, check) {
        return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
    }
    function cloneHunk(hunk, offset) {
        return {
            oldStart: hunk.oldStart,
            oldLines: hunk.oldLines,
            newStart: hunk.newStart + offset,
            newLines: hunk.newLines,
            lines: hunk.lines
        };
    }
    function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
        // This will generally result in a conflicted hunk, but there are cases where the context
        // is the only overlap where we can successfully merge the content here.
        var mine = {
            offset: mineOffset,
            lines: mineLines,
            index: 0
        }, their = {
            offset: theirOffset,
            lines: theirLines,
            index: 0
        }; // Handle any leading content
        insertLeading(hunk, mine, their);
        insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.
        while(mine.index < mine.lines.length && their.index < their.lines.length){
            var mineCurrent = mine.lines[mine.index], theirCurrent = their.lines[their.index];
            if ((mineCurrent[0] === "-" || mineCurrent[0] === "+") && (theirCurrent[0] === "-" || theirCurrent[0] === "+")) // Both modified ...
            mutualChange(hunk, mine, their);
            else if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
                var _hunk$lines;
                // Mine inserted
                (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
            } else if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
                var _hunk$lines2;
                // Theirs inserted
                (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
            } else if (mineCurrent[0] === "-" && theirCurrent[0] === " ") // Mine removed or edited
            removal(hunk, mine, their);
            else if (theirCurrent[0] === "-" && mineCurrent[0] === " ") // Their removed or edited
            removal(hunk, their, mine, true);
            else if (mineCurrent === theirCurrent) {
                // Context identity
                hunk.lines.push(mineCurrent);
                mine.index++;
                their.index++;
            } else // Context mismatch
            conflict(hunk, collectChange(mine), collectChange(their));
        } // Now push anything that may be remaining
        insertTrailing(hunk, mine);
        insertTrailing(hunk, their);
        calcLineCount(hunk);
    }
    function mutualChange(hunk, mine, their) {
        var myChanges = collectChange(mine), theirChanges = collectChange(their);
        if (allRemoves(myChanges) && allRemoves(theirChanges)) {
            // Special case for remove changes that are supersets of one another
            if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
                var _hunk$lines3;
                (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));
                return;
            } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
                var _hunk$lines4;
                (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));
                return;
            }
        } else if (arrayEqual(myChanges, theirChanges)) {
            var _hunk$lines5;
            (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));
            return;
        }
        conflict(hunk, myChanges, theirChanges);
    }
    function removal(hunk, mine, their, swap) {
        var myChanges = collectChange(mine), theirChanges = collectContext(their, myChanges);
        if (theirChanges.merged) {
            var _hunk$lines6;
            (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
        } else conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
    }
    function conflict(hunk, mine, their) {
        hunk.conflict = true;
        hunk.lines.push({
            conflict: true,
            mine: mine,
            theirs: their
        });
    }
    function insertLeading(hunk, insert, their) {
        while(insert.offset < their.offset && insert.index < insert.lines.length){
            var line = insert.lines[insert.index++];
            hunk.lines.push(line);
            insert.offset++;
        }
    }
    function insertTrailing(hunk, insert) {
        while(insert.index < insert.lines.length){
            var line = insert.lines[insert.index++];
            hunk.lines.push(line);
        }
    }
    function collectChange(state) {
        var ret = [], operation = state.lines[state.index][0];
        while(state.index < state.lines.length){
            var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.
            if (operation === "-" && line[0] === "+") operation = "+";
            if (operation === line[0]) {
                ret.push(line);
                state.index++;
            } else break;
        }
        return ret;
    }
    function collectContext(state, matchChanges) {
        var changes = [], merged = [], matchIndex = 0, contextChanges = false, conflicted = false;
        while(matchIndex < matchChanges.length && state.index < state.lines.length){
            var change = state.lines[state.index], match = matchChanges[matchIndex]; // Once we've hit our add, then we are done
            if (match[0] === "+") break;
            contextChanges = contextChanges || change[0] !== " ";
            merged.push(match);
            matchIndex++; // Consume any additions in the other block as a conflict to attempt
            // to pull in the remaining context after this
            if (change[0] === "+") {
                conflicted = true;
                while(change[0] === "+"){
                    changes.push(change);
                    change = state.lines[++state.index];
                }
            }
            if (match.substr(1) === change.substr(1)) {
                changes.push(change);
                state.index++;
            } else conflicted = true;
        }
        if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) conflicted = true;
        if (conflicted) return changes;
        while(matchIndex < matchChanges.length)merged.push(matchChanges[matchIndex++]);
        return {
            merged: merged,
            changes: changes
        };
    }
    function allRemoves(changes) {
        return changes.reduce(function(prev, change) {
            return prev && change[0] === "-";
        }, true);
    }
    function skipRemoveSuperset(state, removeChanges, delta) {
        for(var i = 0; i < delta; i++){
            var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);
            if (state.lines[state.index + i] !== " " + changeContent) return false;
        }
        state.index += delta;
        return true;
    }
    function calcOldNewLineCount(lines) {
        var oldLines = 0;
        var newLines = 0;
        lines.forEach(function(line) {
            if (typeof line !== "string") {
                var myCount = calcOldNewLineCount(line.mine);
                var theirCount = calcOldNewLineCount(line.theirs);
                if (oldLines !== undefined) {
                    if (myCount.oldLines === theirCount.oldLines) oldLines += myCount.oldLines;
                    else oldLines = undefined;
                }
                if (newLines !== undefined) {
                    if (myCount.newLines === theirCount.newLines) newLines += myCount.newLines;
                    else newLines = undefined;
                }
            } else {
                if (newLines !== undefined && (line[0] === "+" || line[0] === " ")) newLines++;
                if (oldLines !== undefined && (line[0] === "-" || line[0] === " ")) oldLines++;
            }
        });
        return {
            oldLines: oldLines,
            newLines: newLines
        };
    }
    // See: http://code.google.com/p/google-diff-match-patch/wiki/API
    function convertChangesToDMP(changes) {
        var ret = [], change, operation;
        for(var i = 0; i < changes.length; i++){
            change = changes[i];
            if (change.added) operation = 1;
            else if (change.removed) operation = -1;
            else operation = 0;
            ret.push([
                operation,
                change.value
            ]);
        }
        return ret;
    }
    function convertChangesToXML(changes) {
        var ret = [];
        for(var i = 0; i < changes.length; i++){
            var change = changes[i];
            if (change.added) ret.push("<ins>");
            else if (change.removed) ret.push("<del>");
            ret.push(escapeHTML(change.value));
            if (change.added) ret.push("</ins>");
            else if (change.removed) ret.push("</del>");
        }
        return ret.join("");
    }
    function escapeHTML(s) {
        var n = s;
        n = n.replace(/&/g, "&amp;");
        n = n.replace(/</g, "&lt;");
        n = n.replace(/>/g, "&gt;");
        n = n.replace(/"/g, "&quot;");
        return n;
    }
    exports1.Diff = Diff;
    exports1.applyPatch = applyPatch;
    exports1.applyPatches = applyPatches;
    exports1.canonicalize = canonicalize;
    exports1.convertChangesToDMP = convertChangesToDMP;
    exports1.convertChangesToXML = convertChangesToXML;
    exports1.createPatch = createPatch;
    exports1.createTwoFilesPatch = createTwoFilesPatch;
    exports1.diffArrays = diffArrays;
    exports1.diffChars = diffChars;
    exports1.diffCss = diffCss;
    exports1.diffJson = diffJson;
    exports1.diffLines = diffLines;
    exports1.diffSentences = diffSentences;
    exports1.diffTrimmedLines = diffTrimmedLines;
    exports1.diffWords = diffWords;
    exports1.diffWordsWithSpace = diffWordsWithSpace;
    exports1.merge = merge;
    exports1.parsePatch = parsePatch;
    exports1.structuredPatch = structuredPatch;
    Object.defineProperty(exports1, "__esModule", {
        value: true
    });
});

},{}],"jauEe":[function(require,module,exports) {
/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * y;
        case "weeks":
        case "week":
        case "w":
            return n * w;
        case "days":
        case "day":
        case "d":
            return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) return Math.round(ms / d) + "d";
    if (msAbs >= h) return Math.round(ms / h) + "h";
    if (msAbs >= m) return Math.round(ms / m) + "m";
    if (msAbs >= s) return Math.round(ms / s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) return plural(ms, msAbs, d, "day");
    if (msAbs >= h) return plural(ms, msAbs, h, "hour");
    if (msAbs >= m) return plural(ms, msAbs, m, "minute");
    if (msAbs >= s) return plural(ms, msAbs, s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

},{}],"tLxDb":[function(require,module,exports) {
var Buffer = require("985a5b389b52fda2").Buffer;
var process = require("d734d9ab3df5a048");
"use strict";
/**
 * Various utility functions used throughout Mocha's codebase.
 * @module utils
 */ /**
 * Module dependencies.
 */ const { nanoid } = require("409f5bbc94f690a1");
var path = require("82605334e95280fc");
var util = require("7d6990e93e04c112");
var he = require("5fc373df889da9c9");
const MOCHA_ID_PROP_NAME = "__mocha_id__";
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @param {function} ctor - Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor - Constructor function to inherit prototype from.
 * @throws {TypeError} if either constructor is null, or if super constructor
 *     lacks a prototype.
 */ exports.inherits = util.inherits;
/**
 * Escape special characters in the given string of html.
 *
 * @private
 * @param  {string} html
 * @return {string}
 */ exports.escape = function(html) {
    return he.encode(String(html), {
        useNamedReferences: false
    });
};
/**
 * Test if the given obj is type of string.
 *
 * @private
 * @param {Object} obj
 * @return {boolean}
 */ exports.isString = function(obj) {
    return typeof obj === "string";
};
/**
 * Compute a slug from the given `str`.
 *
 * @private
 * @param {string} str
 * @return {string}
 */ exports.slug = function(str) {
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^-\w]/g, "").replace(/-{2,}/g, "-");
};
/**
 * Strip the function definition from `str`, and re-indent for pre whitespace.
 *
 * @param {string} str
 * @return {string}
 */ exports.clean = function(str) {
    str = str.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, "")// (traditional)->  space/name     parameters    body     (lambda)-> parameters       body   multi-statement/single          keep body content
    .replace(/^function(?:\s*|\s[^(]*)\([^)]*\)\s*\{((?:.|\n)*?)\}$|^\([^)]*\)\s*=>\s*(?:\{((?:.|\n)*?)\}|((?:.|\n)*))$/, "$1$2$3");
    var spaces = str.match(/^\n?( *)/)[1].length;
    var tabs = str.match(/^\n?(\t*)/)[1].length;
    var re = new RegExp("^\n?" + (tabs ? "	" : " ") + "{" + (tabs || spaces) + "}", "gm");
    str = str.replace(re, "");
    return str.trim();
};
/**
 * If a value could have properties, and has none, this function is called,
 * which returns a string representation of the empty value.
 *
 * Functions w/ no properties return `'[Function]'`
 * Arrays w/ length === 0 return `'[]'`
 * Objects w/ no properties return `'{}'`
 * All else: return result of `value.toString()`
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} typeHint The type of the value
 * @returns {string}
 */ function emptyRepresentation(value, typeHint) {
    switch(typeHint){
        case "function":
            return "[Function]";
        case "object":
            return "{}";
        case "array":
            return "[]";
        default:
            return value.toString();
    }
}
/**
 * Takes some variable and asks `Object.prototype.toString()` what it thinks it
 * is.
 *
 * @private
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @param {*} value The value to test.
 * @returns {string} Computed type
 * @example
 * canonicalType({}) // 'object'
 * canonicalType([]) // 'array'
 * canonicalType(1) // 'number'
 * canonicalType(false) // 'boolean'
 * canonicalType(Infinity) // 'number'
 * canonicalType(null) // 'null'
 * canonicalType(new Date()) // 'date'
 * canonicalType(/foo/) // 'regexp'
 * canonicalType('type') // 'string'
 * canonicalType(global) // 'global'
 * canonicalType(new String('foo') // 'object'
 * canonicalType(async function() {}) // 'asyncfunction'
 * canonicalType(await import(name)) // 'module'
 */ var canonicalType = exports.canonicalType = function canonicalType(value) {
    if (value === undefined) return "undefined";
    else if (value === null) return "null";
    else if (Buffer.isBuffer(value)) return "buffer";
    return Object.prototype.toString.call(value).replace(/^\[.+\s(.+?)]$/, "$1").toLowerCase();
};
/**
 *
 * Returns a general type or data structure of a variable
 * @private
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
 * @param {*} value The value to test.
 * @returns {string} One of undefined, boolean, number, string, bigint, symbol, object
 * @example
 * type({}) // 'object'
 * type([]) // 'array'
 * type(1) // 'number'
 * type(false) // 'boolean'
 * type(Infinity) // 'number'
 * type(null) // 'null'
 * type(new Date()) // 'object'
 * type(/foo/) // 'object'
 * type('type') // 'string'
 * type(global) // 'object'
 * type(new String('foo') // 'string'
 */ exports.type = function type(value) {
    // Null is special
    if (value === null) return "null";
    const primitives = new Set([
        "undefined",
        "boolean",
        "number",
        "string",
        "bigint",
        "symbol"
    ]);
    const _type = typeof value;
    if (_type === "function") return _type;
    if (primitives.has(_type)) return _type;
    if (value instanceof String) return "string";
    if (value instanceof Error) return "error";
    if (Array.isArray(value)) return "array";
    return _type;
};
/**
 * Stringify `value`. Different behavior depending on type of value:
 *
 * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.
 * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.
 * - If `value` is an *empty* object, function, or array, return result of function
 *   {@link emptyRepresentation}.
 * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of
 *   JSON.stringify().
 *
 * @private
 * @see exports.type
 * @param {*} value
 * @return {string}
 */ exports.stringify = function(value) {
    var typeHint = canonicalType(value);
    if (!~[
        "object",
        "array",
        "function"
    ].indexOf(typeHint)) {
        if (typeHint === "buffer") {
            var json = Buffer.prototype.toJSON.call(value);
            // Based on the toJSON result
            return jsonStringify(json.data && json.type ? json.data : json, 2).replace(/,(\n|$)/g, "$1");
        }
        // IE7/IE8 has a bizarre String constructor; needs to be coerced
        // into an array and back to obj.
        if (typeHint === "string" && typeof value === "object") {
            value = value.split("").reduce(function(acc, char, idx) {
                acc[idx] = char;
                return acc;
            }, {});
            typeHint = "object";
        } else return jsonStringify(value);
    }
    for(var prop in value){
        if (Object.prototype.hasOwnProperty.call(value, prop)) return jsonStringify(exports.canonicalize(value, null, typeHint), 2).replace(/,(\n|$)/g, "$1");
    }
    return emptyRepresentation(value, typeHint);
};
/**
 * like JSON.stringify but more sense.
 *
 * @private
 * @param {Object}  object
 * @param {number=} spaces
 * @param {number=} depth
 * @returns {*}
 */ function jsonStringify(object, spaces, depth) {
    if (typeof spaces === "undefined") // primitive types
    return _stringify(object);
    depth = depth || 1;
    var space = spaces * depth;
    var str = Array.isArray(object) ? "[" : "{";
    var end = Array.isArray(object) ? "]" : "}";
    var length = typeof object.length === "number" ? object.length : Object.keys(object).length;
    // `.repeat()` polyfill
    function repeat(s, n) {
        return new Array(n).join(s);
    }
    function _stringify(val) {
        switch(canonicalType(val)){
            case "null":
            case "undefined":
                val = "[" + val + "]";
                break;
            case "array":
            case "object":
                val = jsonStringify(val, spaces, depth + 1);
                break;
            case "boolean":
            case "regexp":
            case "symbol":
            case "number":
                val = val === 0 && 1 / val === -Infinity // `-0`
                 ? "-0" : val.toString();
                break;
            case "bigint":
                val = val.toString() + "n";
                break;
            case "date":
                var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();
                val = "[Date: " + sDate + "]";
                break;
            case "buffer":
                var json = val.toJSON();
                // Based on the toJSON result
                json = json.data && json.type ? json.data : json;
                val = "[Buffer: " + jsonStringify(json, 2, depth + 1) + "]";
                break;
            default:
                val = val === "[Function]" || val === "[Circular]" ? val : JSON.stringify(val); // string
        }
        return val;
    }
    for(var i in object){
        if (!Object.prototype.hasOwnProperty.call(object, i)) continue; // not my business
        --length;
        str += "\n " + repeat(" ", space) + (Array.isArray(object) ? "" : '"' + i + '": ') + // key
        _stringify(object[i]) + // value
        (length ? "," : ""); // comma
    }
    return str + // [], {}
    (str.length !== 1 ? "\n" + repeat(" ", --space) + end : end);
}
/**
 * Return a new Thing that has the keys in sorted order. Recursive.
 *
 * If the Thing...
 * - has already been seen, return string `'[Circular]'`
 * - is `undefined`, return string `'[undefined]'`
 * - is `null`, return value `null`
 * - is some other primitive, return the value
 * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method
 * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.
 * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`
 *
 * @private
 * @see {@link exports.stringify}
 * @param {*} value Thing to inspect.  May or may not have properties.
 * @param {Array} [stack=[]] Stack of seen values
 * @param {string} [typeHint] Type hint
 * @return {(Object|Array|Function|string|undefined)}
 */ exports.canonicalize = function canonicalize(value, stack, typeHint) {
    var canonicalizedObj;
    /* eslint-disable no-unused-vars */ var prop;
    /* eslint-enable no-unused-vars */ typeHint = typeHint || canonicalType(value);
    function withStack(value, fn) {
        stack.push(value);
        fn();
        stack.pop();
    }
    stack = stack || [];
    if (stack.indexOf(value) !== -1) return "[Circular]";
    switch(typeHint){
        case "undefined":
        case "buffer":
        case "null":
            canonicalizedObj = value;
            break;
        case "array":
            withStack(value, function() {
                canonicalizedObj = value.map(function(item) {
                    return exports.canonicalize(item, stack);
                });
            });
            break;
        case "function":
            /* eslint-disable-next-line no-unused-vars, no-unreachable-loop */ for(prop in value){
                canonicalizedObj = {};
                break;
            }
            /* eslint-enable guard-for-in */ if (!canonicalizedObj) {
                canonicalizedObj = emptyRepresentation(value, typeHint);
                break;
            }
        /* falls through */ case "object":
            canonicalizedObj = canonicalizedObj || {};
            withStack(value, function() {
                Object.keys(value).sort().forEach(function(key) {
                    canonicalizedObj[key] = exports.canonicalize(value[key], stack);
                });
            });
            break;
        case "date":
        case "number":
        case "regexp":
        case "boolean":
        case "symbol":
            canonicalizedObj = value;
            break;
        default:
            canonicalizedObj = value + "";
    }
    return canonicalizedObj;
};
/**
 * @summary
 * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)
 * @description
 * When invoking this function you get a filter function that get the Error.stack as an input,
 * and return a prettify output.
 * (i.e: strip Mocha and internal node functions from stack trace).
 * @returns {Function}
 */ exports.stackTraceFilter = function() {
    // TODO: Replace with `process.browser`
    var is = typeof document === "undefined" ? {
        node: true
    } : {
        browser: true
    };
    var slash = path.sep;
    var cwd;
    if (is.node) cwd = exports.cwd() + slash;
    else {
        cwd = (typeof location === "undefined" ? window.location : location).href.replace(/\/[^/]*$/, "/");
        slash = "/";
    }
    function isMochaInternal(line) {
        return ~line.indexOf("node_modules" + slash + "mocha" + slash) || ~line.indexOf(slash + "mocha.js") || ~line.indexOf(slash + "mocha.min.js");
    }
    function isNodeInternal(line) {
        return ~line.indexOf("(timers.js:") || ~line.indexOf("(events.js:") || ~line.indexOf("(node.js:") || ~line.indexOf("(module.js:") || ~line.indexOf("GeneratorFunctionPrototype.next (native)") || false;
    }
    return function(stack) {
        stack = stack.split("\n");
        stack = stack.reduce(function(list, line) {
            if (isMochaInternal(line)) return list;
            if (is.node && isNodeInternal(line)) return list;
            // Clean up cwd(absolute)
            if (/:\d+:\d+\)?$/.test(line)) line = line.replace("(" + cwd, "(");
            list.push(line);
            return list;
        }, []);
        return stack.join("\n");
    };
};
/**
 * Crude, but effective.
 * @public
 * @param {*} value
 * @returns {boolean} Whether or not `value` is a Promise
 */ exports.isPromise = function isPromise(value) {
    return typeof value === "object" && value !== null && typeof value.then === "function";
};
/**
 * Clamps a numeric value to an inclusive range.
 *
 * @param {number} value - Value to be clamped.
 * @param {number[]} range - Two element array specifying [min, max] range.
 * @returns {number} clamped value
 */ exports.clamp = function clamp(value, range) {
    return Math.min(Math.max(value, range[0]), range[1]);
};
/**
 * It's a noop.
 * @public
 */ exports.noop = function() {};
/**
 * Creates a map-like object.
 *
 * @description
 * A "map" is an object with no prototype, for our purposes. In some cases
 * this would be more appropriate than a `Map`, especially if your environment
 * doesn't support it. Recommended for use in Mocha's public APIs.
 *
 * @public
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Custom_and_Null_objects|MDN:Map}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Custom_and_Null_objects|MDN:Object.create - Custom objects}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Custom_and_Null_objects|MDN:Object.assign}
 * @param {...*} [obj] - Arguments to `Object.assign()`.
 * @returns {Object} An object with no prototype, having `...obj` properties
 */ exports.createMap = function(obj) {
    return Object.assign.apply(null, [
        Object.create(null)
    ].concat(Array.prototype.slice.call(arguments)));
};
/**
 * Creates a read-only map-like object.
 *
 * @description
 * This differs from {@link module:utils.createMap createMap} only in that
 * the argument must be non-empty, because the result is frozen.
 *
 * @see {@link module:utils.createMap createMap}
 * @param {...*} [obj] - Arguments to `Object.assign()`.
 * @returns {Object} A frozen object with no prototype, having `...obj` properties
 * @throws {TypeError} if argument is not a non-empty object.
 */ exports.defineConstants = function(obj) {
    if (canonicalType(obj) !== "object" || !Object.keys(obj).length) throw new TypeError("Invalid argument; expected a non-empty object");
    return Object.freeze(exports.createMap(obj));
};
/**
 * Returns current working directory
 *
 * Wrapper around `process.cwd()` for isolation
 * @private
 */ exports.cwd = function cwd() {
    return process.cwd();
};
/**
 * Returns `true` if Mocha is running in a browser.
 * Checks for `process.browser`.
 * @returns {boolean}
 * @private
 */ exports.isBrowser = function isBrowser() {
    return Boolean(true);
};
/*
 * Casts `value` to an array; useful for optionally accepting array parameters
 *
 * It follows these rules, depending on `value`.  If `value` is...
 * 1. `undefined`: return an empty Array
 * 2. `null`: return an array with a single `null` element
 * 3. Any other object: return the value of `Array.from()` _if_ the object is iterable
 * 4. otherwise: return an array with a single element, `value`
 * @param {*} value - Something to cast to an Array
 * @returns {Array<*>}
 */ exports.castArray = function castArray(value) {
    if (value === undefined) return [];
    if (value === null) return [
        null
    ];
    if (typeof value === "object" && (typeof value[Symbol.iterator] === "function" || value.length !== undefined)) return Array.from(value);
    return [
        value
    ];
};
exports.constants = exports.defineConstants({
    MOCHA_ID_PROP_NAME
});
/**
 * Creates a new unique identifier
 * @returns {string} Unique identifier
 */ exports.uniqueID = ()=>nanoid();
exports.assignNewMochaID = (obj)=>{
    const id = exports.uniqueID();
    Object.defineProperty(obj, MOCHA_ID_PROP_NAME, {
        get () {
            return id;
        }
    });
    return obj;
};
/**
 * Retrieves a Mocha ID from an object, if present.
 * @param {*} [obj] - Object
 * @returns {string|void}
 */ exports.getMochaID = (obj)=>obj && typeof obj === "object" ? obj[MOCHA_ID_PROP_NAME] : undefined;

},{"985a5b389b52fda2":"fCgem","d734d9ab3df5a048":"d5jf4","409f5bbc94f690a1":"fO50M","82605334e95280fc":"jhUEF","7d6990e93e04c112":"cxohQ","5fc373df889da9c9":"eDqRh"}],"fO50M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nanoid", ()=>nanoid);
parcelHelpers.export(exports, "customAlphabet", ()=>customAlphabet);
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let customAlphabet = (alphabet, defaultSize = 21)=>{
    return (size = defaultSize)=>{
        let id = "";
        let i = size;
        while(i--)id += alphabet[Math.random() * alphabet.length | 0];
        return id;
    };
};
let nanoid = (size = 21)=>{
    let id = "";
    let i = size;
    while(i--)id += urlAlphabet[Math.random() * 64 | 0];
    return id;
};

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
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
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

},{}],"eDqRh":[function(require,module,exports) {
var global = arguments[3];
(function(root) {
    // Detect free variables `exports`.
    var freeExports = exports;
    // Detect free variable `module`.
    var freeModule = module && module.exports == freeExports && module;
    // Detect free variable `global`, from Node.js or Browserified code,
    // and use it as `root`.
    var freeGlobal = typeof global == "object" && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) root = freeGlobal;
    /*--------------------------------------------------------------------------*/ // All astral symbols.
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    // All ASCII symbols (not just printable ASCII) except those listed in the
    // first column of the overrides table.
    // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
    var regexAsciiWhitelist = /[\x01-\x7F]/g;
    // All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
    // code points listed in the first column of the overrides table on
    // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
    var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
    var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
    var encodeMap = {
        "\xad": "shy",
        "\u200C": "zwnj",
        "\u200D": "zwj",
        "\u200E": "lrm",
        "\u2063": "ic",
        "\u2062": "it",
        "\u2061": "af",
        "\u200F": "rlm",
        "\u200B": "ZeroWidthSpace",
        "\u2060": "NoBreak",
        "\u0311": "DownBreve",
        "\u20DB": "tdot",
        "\u20DC": "DotDot",
        "	": "Tab",
        "\n": "NewLine",
        "\u2008": "puncsp",
        "\u205F": "MediumSpace",
        "\u2009": "thinsp",
        "\u200A": "hairsp",
        "\u2004": "emsp13",
        "\u2002": "ensp",
        "\u2005": "emsp14",
        "\u2003": "emsp",
        "\u2007": "numsp",
        "\xa0": "nbsp",
        "\u205F\u200A": "ThickSpace",
        "\u203E": "oline",
        "_": "lowbar",
        "\u2010": "dash",
        "\u2013": "ndash",
        "\u2014": "mdash",
        "\u2015": "horbar",
        ",": "comma",
        ";": "semi",
        "\u204F": "bsemi",
        ":": "colon",
        "\u2A74": "Colone",
        "!": "excl",
        "\xa1": "iexcl",
        "?": "quest",
        "\xbf": "iquest",
        ".": "period",
        "\u2025": "nldr",
        "\u2026": "mldr",
        "\xb7": "middot",
        "'": "apos",
        "\u2018": "lsquo",
        "\u2019": "rsquo",
        "\u201A": "sbquo",
        "\u2039": "lsaquo",
        "\u203A": "rsaquo",
        '"': "quot",
        "\u201C": "ldquo",
        "\u201D": "rdquo",
        "\u201E": "bdquo",
        "\xab": "laquo",
        "\xbb": "raquo",
        "(": "lpar",
        ")": "rpar",
        "[": "lsqb",
        "]": "rsqb",
        "{": "lcub",
        "}": "rcub",
        "\u2308": "lceil",
        "\u2309": "rceil",
        "\u230A": "lfloor",
        "\u230B": "rfloor",
        "\u2985": "lopar",
        "\u2986": "ropar",
        "\u298B": "lbrke",
        "\u298C": "rbrke",
        "\u298D": "lbrkslu",
        "\u298E": "rbrksld",
        "\u298F": "lbrksld",
        "\u2990": "rbrkslu",
        "\u2991": "langd",
        "\u2992": "rangd",
        "\u2993": "lparlt",
        "\u2994": "rpargt",
        "\u2995": "gtlPar",
        "\u2996": "ltrPar",
        "\u27E6": "lobrk",
        "\u27E7": "robrk",
        "\u27E8": "lang",
        "\u27E9": "rang",
        "\u27EA": "Lang",
        "\u27EB": "Rang",
        "\u27EC": "loang",
        "\u27ED": "roang",
        "\u2772": "lbbrk",
        "\u2773": "rbbrk",
        "\u2016": "Vert",
        "\xa7": "sect",
        "\xb6": "para",
        "@": "commat",
        "*": "ast",
        "/": "sol",
        "undefined": null,
        "&": "amp",
        "#": "num",
        "%": "percnt",
        "\u2030": "permil",
        "\u2031": "pertenk",
        "\u2020": "dagger",
        "\u2021": "Dagger",
        "\u2022": "bull",
        "\u2043": "hybull",
        "\u2032": "prime",
        "\u2033": "Prime",
        "\u2034": "tprime",
        "\u2057": "qprime",
        "\u2035": "bprime",
        "\u2041": "caret",
        "`": "grave",
        "\xb4": "acute",
        "\u02DC": "tilde",
        "^": "Hat",
        "\xaf": "macr",
        "\u02D8": "breve",
        "\u02D9": "dot",
        "\xa8": "die",
        "\u02DA": "ring",
        "\u02DD": "dblac",
        "\xb8": "cedil",
        "\u02DB": "ogon",
        "\u02C6": "circ",
        "\u02C7": "caron",
        "\xb0": "deg",
        "\xa9": "copy",
        "\xae": "reg",
        "\u2117": "copysr",
        "\u2118": "wp",
        "\u211E": "rx",
        "\u2127": "mho",
        "\u2129": "iiota",
        "\u2190": "larr",
        "\u219A": "nlarr",
        "\u2192": "rarr",
        "\u219B": "nrarr",
        "\u2191": "uarr",
        "\u2193": "darr",
        "\u2194": "harr",
        "\u21AE": "nharr",
        "\u2195": "varr",
        "\u2196": "nwarr",
        "\u2197": "nearr",
        "\u2198": "searr",
        "\u2199": "swarr",
        "\u219D": "rarrw",
        "\u219D\u0338": "nrarrw",
        "\u219E": "Larr",
        "\u219F": "Uarr",
        "\u21A0": "Rarr",
        "\u21A1": "Darr",
        "\u21A2": "larrtl",
        "\u21A3": "rarrtl",
        "\u21A4": "mapstoleft",
        "\u21A5": "mapstoup",
        "\u21A6": "map",
        "\u21A7": "mapstodown",
        "\u21A9": "larrhk",
        "\u21AA": "rarrhk",
        "\u21AB": "larrlp",
        "\u21AC": "rarrlp",
        "\u21AD": "harrw",
        "\u21B0": "lsh",
        "\u21B1": "rsh",
        "\u21B2": "ldsh",
        "\u21B3": "rdsh",
        "\u21B5": "crarr",
        "\u21B6": "cularr",
        "\u21B7": "curarr",
        "\u21BA": "olarr",
        "\u21BB": "orarr",
        "\u21BC": "lharu",
        "\u21BD": "lhard",
        "\u21BE": "uharr",
        "\u21BF": "uharl",
        "\u21C0": "rharu",
        "\u21C1": "rhard",
        "\u21C2": "dharr",
        "\u21C3": "dharl",
        "\u21C4": "rlarr",
        "\u21C5": "udarr",
        "\u21C6": "lrarr",
        "\u21C7": "llarr",
        "\u21C8": "uuarr",
        "\u21C9": "rrarr",
        "\u21CA": "ddarr",
        "\u21CB": "lrhar",
        "\u21CC": "rlhar",
        "\u21D0": "lArr",
        "\u21CD": "nlArr",
        "\u21D1": "uArr",
        "\u21D2": "rArr",
        "\u21CF": "nrArr",
        "\u21D3": "dArr",
        "\u21D4": "iff",
        "\u21CE": "nhArr",
        "\u21D5": "vArr",
        "\u21D6": "nwArr",
        "\u21D7": "neArr",
        "\u21D8": "seArr",
        "\u21D9": "swArr",
        "\u21DA": "lAarr",
        "\u21DB": "rAarr",
        "\u21DD": "zigrarr",
        "\u21E4": "larrb",
        "\u21E5": "rarrb",
        "\u21F5": "duarr",
        "\u21FD": "loarr",
        "\u21FE": "roarr",
        "\u21FF": "hoarr",
        "\u2200": "forall",
        "\u2201": "comp",
        "\u2202": "part",
        "\u2202\u0338": "npart",
        "\u2203": "exist",
        "\u2204": "nexist",
        "\u2205": "empty",
        "\u2207": "Del",
        "\u2208": "in",
        "\u2209": "notin",
        "\u220B": "ni",
        "\u220C": "notni",
        "\u03F6": "bepsi",
        "\u220F": "prod",
        "\u2210": "coprod",
        "\u2211": "sum",
        "+": "plus",
        "\xb1": "pm",
        "\xf7": "div",
        "\xd7": "times",
        "<": "lt",
        "\u226E": "nlt",
        "<\u20D2": "nvlt",
        "=": "equals",
        "\u2260": "ne",
        "=\u20E5": "bne",
        "\u2A75": "Equal",
        ">": "gt",
        "\u226F": "ngt",
        ">\u20D2": "nvgt",
        "\xac": "not",
        "|": "vert",
        "\xa6": "brvbar",
        "\u2212": "minus",
        "\u2213": "mp",
        "\u2214": "plusdo",
        "\u2044": "frasl",
        "\u2216": "setmn",
        "\u2217": "lowast",
        "\u2218": "compfn",
        "\u221A": "Sqrt",
        "\u221D": "prop",
        "\u221E": "infin",
        "\u221F": "angrt",
        "\u2220": "ang",
        "\u2220\u20D2": "nang",
        "\u2221": "angmsd",
        "\u2222": "angsph",
        "\u2223": "mid",
        "\u2224": "nmid",
        "\u2225": "par",
        "\u2226": "npar",
        "\u2227": "and",
        "\u2228": "or",
        "\u2229": "cap",
        "\u2229\uFE00": "caps",
        "\u222A": "cup",
        "\u222A\uFE00": "cups",
        "\u222B": "int",
        "\u222C": "Int",
        "\u222D": "tint",
        "\u2A0C": "qint",
        "\u222E": "oint",
        "\u222F": "Conint",
        "\u2230": "Cconint",
        "\u2231": "cwint",
        "\u2232": "cwconint",
        "\u2233": "awconint",
        "\u2234": "there4",
        "\u2235": "becaus",
        "\u2236": "ratio",
        "\u2237": "Colon",
        "\u2238": "minusd",
        "\u223A": "mDDot",
        "\u223B": "homtht",
        "\u223C": "sim",
        "\u2241": "nsim",
        "\u223C\u20D2": "nvsim",
        "\u223D": "bsim",
        "\u223D\u0331": "race",
        "\u223E": "ac",
        "\u223E\u0333": "acE",
        "\u223F": "acd",
        "\u2240": "wr",
        "\u2242": "esim",
        "\u2242\u0338": "nesim",
        "\u2243": "sime",
        "\u2244": "nsime",
        "\u2245": "cong",
        "\u2247": "ncong",
        "\u2246": "simne",
        "\u2248": "ap",
        "\u2249": "nap",
        "\u224A": "ape",
        "\u224B": "apid",
        "\u224B\u0338": "napid",
        "\u224C": "bcong",
        "\u224D": "CupCap",
        "\u226D": "NotCupCap",
        "\u224D\u20D2": "nvap",
        "\u224E": "bump",
        "\u224E\u0338": "nbump",
        "\u224F": "bumpe",
        "\u224F\u0338": "nbumpe",
        "\u2250": "doteq",
        "\u2250\u0338": "nedot",
        "\u2251": "eDot",
        "\u2252": "efDot",
        "\u2253": "erDot",
        "\u2254": "colone",
        "\u2255": "ecolon",
        "\u2256": "ecir",
        "\u2257": "cire",
        "\u2259": "wedgeq",
        "\u225A": "veeeq",
        "\u225C": "trie",
        "\u225F": "equest",
        "\u2261": "equiv",
        "\u2262": "nequiv",
        "\u2261\u20E5": "bnequiv",
        "\u2264": "le",
        "\u2270": "nle",
        "\u2264\u20D2": "nvle",
        "\u2265": "ge",
        "\u2271": "nge",
        "\u2265\u20D2": "nvge",
        "\u2266": "lE",
        "\u2266\u0338": "nlE",
        "\u2267": "gE",
        "\u2267\u0338": "ngE",
        "\u2268\uFE00": "lvnE",
        "\u2268": "lnE",
        "\u2269": "gnE",
        "\u2269\uFE00": "gvnE",
        "\u226A": "ll",
        "\u226A\u0338": "nLtv",
        "\u226A\u20D2": "nLt",
        "\u226B": "gg",
        "\u226B\u0338": "nGtv",
        "\u226B\u20D2": "nGt",
        "\u226C": "twixt",
        "\u2272": "lsim",
        "\u2274": "nlsim",
        "\u2273": "gsim",
        "\u2275": "ngsim",
        "\u2276": "lg",
        "\u2278": "ntlg",
        "\u2277": "gl",
        "\u2279": "ntgl",
        "\u227A": "pr",
        "\u2280": "npr",
        "\u227B": "sc",
        "\u2281": "nsc",
        "\u227C": "prcue",
        "\u22E0": "nprcue",
        "\u227D": "sccue",
        "\u22E1": "nsccue",
        "\u227E": "prsim",
        "\u227F": "scsim",
        "\u227F\u0338": "NotSucceedsTilde",
        "\u2282": "sub",
        "\u2284": "nsub",
        "\u2282\u20D2": "vnsub",
        "\u2283": "sup",
        "\u2285": "nsup",
        "\u2283\u20D2": "vnsup",
        "\u2286": "sube",
        "\u2288": "nsube",
        "\u2287": "supe",
        "\u2289": "nsupe",
        "\u228A\uFE00": "vsubne",
        "\u228A": "subne",
        "\u228B\uFE00": "vsupne",
        "\u228B": "supne",
        "\u228D": "cupdot",
        "\u228E": "uplus",
        "\u228F": "sqsub",
        "\u228F\u0338": "NotSquareSubset",
        "\u2290": "sqsup",
        "\u2290\u0338": "NotSquareSuperset",
        "\u2291": "sqsube",
        "\u22E2": "nsqsube",
        "\u2292": "sqsupe",
        "\u22E3": "nsqsupe",
        "\u2293": "sqcap",
        "\u2293\uFE00": "sqcaps",
        "\u2294": "sqcup",
        "\u2294\uFE00": "sqcups",
        "\u2295": "oplus",
        "\u2296": "ominus",
        "\u2297": "otimes",
        "\u2298": "osol",
        "\u2299": "odot",
        "\u229A": "ocir",
        "\u229B": "oast",
        "\u229D": "odash",
        "\u229E": "plusb",
        "\u229F": "minusb",
        "\u22A0": "timesb",
        "\u22A1": "sdotb",
        "\u22A2": "vdash",
        "\u22AC": "nvdash",
        "\u22A3": "dashv",
        "\u22A4": "top",
        "\u22A5": "bot",
        "\u22A7": "models",
        "\u22A8": "vDash",
        "\u22AD": "nvDash",
        "\u22A9": "Vdash",
        "\u22AE": "nVdash",
        "\u22AA": "Vvdash",
        "\u22AB": "VDash",
        "\u22AF": "nVDash",
        "\u22B0": "prurel",
        "\u22B2": "vltri",
        "\u22EA": "nltri",
        "\u22B3": "vrtri",
        "\u22EB": "nrtri",
        "\u22B4": "ltrie",
        "\u22EC": "nltrie",
        "\u22B4\u20D2": "nvltrie",
        "\u22B5": "rtrie",
        "\u22ED": "nrtrie",
        "\u22B5\u20D2": "nvrtrie",
        "\u22B6": "origof",
        "\u22B7": "imof",
        "\u22B8": "mumap",
        "\u22B9": "hercon",
        "\u22BA": "intcal",
        "\u22BB": "veebar",
        "\u22BD": "barvee",
        "\u22BE": "angrtvb",
        "\u22BF": "lrtri",
        "\u22C0": "Wedge",
        "\u22C1": "Vee",
        "\u22C2": "xcap",
        "\u22C3": "xcup",
        "\u22C4": "diam",
        "\u22C5": "sdot",
        "\u22C6": "Star",
        "\u22C7": "divonx",
        "\u22C8": "bowtie",
        "\u22C9": "ltimes",
        "\u22CA": "rtimes",
        "\u22CB": "lthree",
        "\u22CC": "rthree",
        "\u22CD": "bsime",
        "\u22CE": "cuvee",
        "\u22CF": "cuwed",
        "\u22D0": "Sub",
        "\u22D1": "Sup",
        "\u22D2": "Cap",
        "\u22D3": "Cup",
        "\u22D4": "fork",
        "\u22D5": "epar",
        "\u22D6": "ltdot",
        "\u22D7": "gtdot",
        "\u22D8": "Ll",
        "\u22D8\u0338": "nLl",
        "\u22D9": "Gg",
        "\u22D9\u0338": "nGg",
        "\u22DA\uFE00": "lesg",
        "\u22DA": "leg",
        "\u22DB": "gel",
        "\u22DB\uFE00": "gesl",
        "\u22DE": "cuepr",
        "\u22DF": "cuesc",
        "\u22E6": "lnsim",
        "\u22E7": "gnsim",
        "\u22E8": "prnsim",
        "\u22E9": "scnsim",
        "\u22EE": "vellip",
        "\u22EF": "ctdot",
        "\u22F0": "utdot",
        "\u22F1": "dtdot",
        "\u22F2": "disin",
        "\u22F3": "isinsv",
        "\u22F4": "isins",
        "\u22F5": "isindot",
        "\u22F5\u0338": "notindot",
        "\u22F6": "notinvc",
        "\u22F7": "notinvb",
        "\u22F9": "isinE",
        "\u22F9\u0338": "notinE",
        "\u22FA": "nisd",
        "\u22FB": "xnis",
        "\u22FC": "nis",
        "\u22FD": "notnivc",
        "\u22FE": "notnivb",
        "\u2305": "barwed",
        "\u2306": "Barwed",
        "\u230C": "drcrop",
        "\u230D": "dlcrop",
        "\u230E": "urcrop",
        "\u230F": "ulcrop",
        "\u2310": "bnot",
        "\u2312": "profline",
        "\u2313": "profsurf",
        "\u2315": "telrec",
        "\u2316": "target",
        "\u231C": "ulcorn",
        "\u231D": "urcorn",
        "\u231E": "dlcorn",
        "\u231F": "drcorn",
        "\u2322": "frown",
        "\u2323": "smile",
        "\u232D": "cylcty",
        "\u232E": "profalar",
        "\u2336": "topbot",
        "\u233D": "ovbar",
        "\u233F": "solbar",
        "\u237C": "angzarr",
        "\u23B0": "lmoust",
        "\u23B1": "rmoust",
        "\u23B4": "tbrk",
        "\u23B5": "bbrk",
        "\u23B6": "bbrktbrk",
        "\u23DC": "OverParenthesis",
        "\u23DD": "UnderParenthesis",
        "\u23DE": "OverBrace",
        "\u23DF": "UnderBrace",
        "\u23E2": "trpezium",
        "\u23E7": "elinters",
        "\u2423": "blank",
        "\u2500": "boxh",
        "\u2502": "boxv",
        "\u250C": "boxdr",
        "\u2510": "boxdl",
        "\u2514": "boxur",
        "\u2518": "boxul",
        "\u251C": "boxvr",
        "\u2524": "boxvl",
        "\u252C": "boxhd",
        "\u2534": "boxhu",
        "\u253C": "boxvh",
        "\u2550": "boxH",
        "\u2551": "boxV",
        "\u2552": "boxdR",
        "\u2553": "boxDr",
        "\u2554": "boxDR",
        "\u2555": "boxdL",
        "\u2556": "boxDl",
        "\u2557": "boxDL",
        "\u2558": "boxuR",
        "\u2559": "boxUr",
        "\u255A": "boxUR",
        "\u255B": "boxuL",
        "\u255C": "boxUl",
        "\u255D": "boxUL",
        "\u255E": "boxvR",
        "\u255F": "boxVr",
        "\u2560": "boxVR",
        "\u2561": "boxvL",
        "\u2562": "boxVl",
        "\u2563": "boxVL",
        "\u2564": "boxHd",
        "\u2565": "boxhD",
        "\u2566": "boxHD",
        "\u2567": "boxHu",
        "\u2568": "boxhU",
        "\u2569": "boxHU",
        "\u256A": "boxvH",
        "\u256B": "boxVh",
        "\u256C": "boxVH",
        "\u2580": "uhblk",
        "\u2584": "lhblk",
        "\u2588": "block",
        "\u2591": "blk14",
        "\u2592": "blk12",
        "\u2593": "blk34",
        "\u25A1": "squ",
        "\u25AA": "squf",
        "\u25AB": "EmptyVerySmallSquare",
        "\u25AD": "rect",
        "\u25AE": "marker",
        "\u25B1": "fltns",
        "\u25B3": "xutri",
        "\u25B4": "utrif",
        "\u25B5": "utri",
        "\u25B8": "rtrif",
        "\u25B9": "rtri",
        "\u25BD": "xdtri",
        "\u25BE": "dtrif",
        "\u25BF": "dtri",
        "\u25C2": "ltrif",
        "\u25C3": "ltri",
        "\u25CA": "loz",
        "\u25CB": "cir",
        "\u25EC": "tridot",
        "\u25EF": "xcirc",
        "\u25F8": "ultri",
        "\u25F9": "urtri",
        "\u25FA": "lltri",
        "\u25FB": "EmptySmallSquare",
        "\u25FC": "FilledSmallSquare",
        "\u2605": "starf",
        "\u2606": "star",
        "\u260E": "phone",
        "\u2640": "female",
        "\u2642": "male",
        "\u2660": "spades",
        "\u2663": "clubs",
        "\u2665": "hearts",
        "\u2666": "diams",
        "\u266A": "sung",
        "\u2713": "check",
        "\u2717": "cross",
        "\u2720": "malt",
        "\u2736": "sext",
        "\u2758": "VerticalSeparator",
        "\u27C8": "bsolhsub",
        "\u27C9": "suphsol",
        "\u27F5": "xlarr",
        "\u27F6": "xrarr",
        "\u27F7": "xharr",
        "\u27F8": "xlArr",
        "\u27F9": "xrArr",
        "\u27FA": "xhArr",
        "\u27FC": "xmap",
        "\u27FF": "dzigrarr",
        "\u2902": "nvlArr",
        "\u2903": "nvrArr",
        "\u2904": "nvHarr",
        "\u2905": "Map",
        "\u290C": "lbarr",
        "\u290D": "rbarr",
        "\u290E": "lBarr",
        "\u290F": "rBarr",
        "\u2910": "RBarr",
        "\u2911": "DDotrahd",
        "\u2912": "UpArrowBar",
        "\u2913": "DownArrowBar",
        "\u2916": "Rarrtl",
        "\u2919": "latail",
        "\u291A": "ratail",
        "\u291B": "lAtail",
        "\u291C": "rAtail",
        "\u291D": "larrfs",
        "\u291E": "rarrfs",
        "\u291F": "larrbfs",
        "\u2920": "rarrbfs",
        "\u2923": "nwarhk",
        "\u2924": "nearhk",
        "\u2925": "searhk",
        "\u2926": "swarhk",
        "\u2927": "nwnear",
        "\u2928": "toea",
        "\u2929": "tosa",
        "\u292A": "swnwar",
        "\u2933": "rarrc",
        "\u2933\u0338": "nrarrc",
        "\u2935": "cudarrr",
        "\u2936": "ldca",
        "\u2937": "rdca",
        "\u2938": "cudarrl",
        "\u2939": "larrpl",
        "\u293C": "curarrm",
        "\u293D": "cularrp",
        "\u2945": "rarrpl",
        "\u2948": "harrcir",
        "\u2949": "Uarrocir",
        "\u294A": "lurdshar",
        "\u294B": "ldrushar",
        "\u294E": "LeftRightVector",
        "\u294F": "RightUpDownVector",
        "\u2950": "DownLeftRightVector",
        "\u2951": "LeftUpDownVector",
        "\u2952": "LeftVectorBar",
        "\u2953": "RightVectorBar",
        "\u2954": "RightUpVectorBar",
        "\u2955": "RightDownVectorBar",
        "\u2956": "DownLeftVectorBar",
        "\u2957": "DownRightVectorBar",
        "\u2958": "LeftUpVectorBar",
        "\u2959": "LeftDownVectorBar",
        "\u295A": "LeftTeeVector",
        "\u295B": "RightTeeVector",
        "\u295C": "RightUpTeeVector",
        "\u295D": "RightDownTeeVector",
        "\u295E": "DownLeftTeeVector",
        "\u295F": "DownRightTeeVector",
        "\u2960": "LeftUpTeeVector",
        "\u2961": "LeftDownTeeVector",
        "\u2962": "lHar",
        "\u2963": "uHar",
        "\u2964": "rHar",
        "\u2965": "dHar",
        "\u2966": "luruhar",
        "\u2967": "ldrdhar",
        "\u2968": "ruluhar",
        "\u2969": "rdldhar",
        "\u296A": "lharul",
        "\u296B": "llhard",
        "\u296C": "rharul",
        "\u296D": "lrhard",
        "\u296E": "udhar",
        "\u296F": "duhar",
        "\u2970": "RoundImplies",
        "\u2971": "erarr",
        "\u2972": "simrarr",
        "\u2973": "larrsim",
        "\u2974": "rarrsim",
        "\u2975": "rarrap",
        "\u2976": "ltlarr",
        "\u2978": "gtrarr",
        "\u2979": "subrarr",
        "\u297B": "suplarr",
        "\u297C": "lfisht",
        "\u297D": "rfisht",
        "\u297E": "ufisht",
        "\u297F": "dfisht",
        "\u299A": "vzigzag",
        "\u299C": "vangrt",
        "\u299D": "angrtvbd",
        "\u29A4": "ange",
        "\u29A5": "range",
        "\u29A6": "dwangle",
        "\u29A7": "uwangle",
        "\u29A8": "angmsdaa",
        "\u29A9": "angmsdab",
        "\u29AA": "angmsdac",
        "\u29AB": "angmsdad",
        "\u29AC": "angmsdae",
        "\u29AD": "angmsdaf",
        "\u29AE": "angmsdag",
        "\u29AF": "angmsdah",
        "\u29B0": "bemptyv",
        "\u29B1": "demptyv",
        "\u29B2": "cemptyv",
        "\u29B3": "raemptyv",
        "\u29B4": "laemptyv",
        "\u29B5": "ohbar",
        "\u29B6": "omid",
        "\u29B7": "opar",
        "\u29B9": "operp",
        "\u29BB": "olcross",
        "\u29BC": "odsold",
        "\u29BE": "olcir",
        "\u29BF": "ofcir",
        "\u29C0": "olt",
        "\u29C1": "ogt",
        "\u29C2": "cirscir",
        "\u29C3": "cirE",
        "\u29C4": "solb",
        "\u29C5": "bsolb",
        "\u29C9": "boxbox",
        "\u29CD": "trisb",
        "\u29CE": "rtriltri",
        "\u29CF": "LeftTriangleBar",
        "\u29CF\u0338": "NotLeftTriangleBar",
        "\u29D0": "RightTriangleBar",
        "\u29D0\u0338": "NotRightTriangleBar",
        "\u29DC": "iinfin",
        "\u29DD": "infintie",
        "\u29DE": "nvinfin",
        "\u29E3": "eparsl",
        "\u29E4": "smeparsl",
        "\u29E5": "eqvparsl",
        "\u29EB": "lozf",
        "\u29F4": "RuleDelayed",
        "\u29F6": "dsol",
        "\u2A00": "xodot",
        "\u2A01": "xoplus",
        "\u2A02": "xotime",
        "\u2A04": "xuplus",
        "\u2A06": "xsqcup",
        "\u2A0D": "fpartint",
        "\u2A10": "cirfnint",
        "\u2A11": "awint",
        "\u2A12": "rppolint",
        "\u2A13": "scpolint",
        "\u2A14": "npolint",
        "\u2A15": "pointint",
        "\u2A16": "quatint",
        "\u2A17": "intlarhk",
        "\u2A22": "pluscir",
        "\u2A23": "plusacir",
        "\u2A24": "simplus",
        "\u2A25": "plusdu",
        "\u2A26": "plussim",
        "\u2A27": "plustwo",
        "\u2A29": "mcomma",
        "\u2A2A": "minusdu",
        "\u2A2D": "loplus",
        "\u2A2E": "roplus",
        "\u2A2F": "Cross",
        "\u2A30": "timesd",
        "\u2A31": "timesbar",
        "\u2A33": "smashp",
        "\u2A34": "lotimes",
        "\u2A35": "rotimes",
        "\u2A36": "otimesas",
        "\u2A37": "Otimes",
        "\u2A38": "odiv",
        "\u2A39": "triplus",
        "\u2A3A": "triminus",
        "\u2A3B": "tritime",
        "\u2A3C": "iprod",
        "\u2A3F": "amalg",
        "\u2A40": "capdot",
        "\u2A42": "ncup",
        "\u2A43": "ncap",
        "\u2A44": "capand",
        "\u2A45": "cupor",
        "\u2A46": "cupcap",
        "\u2A47": "capcup",
        "\u2A48": "cupbrcap",
        "\u2A49": "capbrcup",
        "\u2A4A": "cupcup",
        "\u2A4B": "capcap",
        "\u2A4C": "ccups",
        "\u2A4D": "ccaps",
        "\u2A50": "ccupssm",
        "\u2A53": "And",
        "\u2A54": "Or",
        "\u2A55": "andand",
        "\u2A56": "oror",
        "\u2A57": "orslope",
        "\u2A58": "andslope",
        "\u2A5A": "andv",
        "\u2A5B": "orv",
        "\u2A5C": "andd",
        "\u2A5D": "ord",
        "\u2A5F": "wedbar",
        "\u2A66": "sdote",
        "\u2A6A": "simdot",
        "\u2A6D": "congdot",
        "\u2A6D\u0338": "ncongdot",
        "\u2A6E": "easter",
        "\u2A6F": "apacir",
        "\u2A70": "apE",
        "\u2A70\u0338": "napE",
        "\u2A71": "eplus",
        "\u2A72": "pluse",
        "\u2A73": "Esim",
        "\u2A77": "eDDot",
        "\u2A78": "equivDD",
        "\u2A79": "ltcir",
        "\u2A7A": "gtcir",
        "\u2A7B": "ltquest",
        "\u2A7C": "gtquest",
        "\u2A7D": "les",
        "\u2A7D\u0338": "nles",
        "\u2A7E": "ges",
        "\u2A7E\u0338": "nges",
        "\u2A7F": "lesdot",
        "\u2A80": "gesdot",
        "\u2A81": "lesdoto",
        "\u2A82": "gesdoto",
        "\u2A83": "lesdotor",
        "\u2A84": "gesdotol",
        "\u2A85": "lap",
        "\u2A86": "gap",
        "\u2A87": "lne",
        "\u2A88": "gne",
        "\u2A89": "lnap",
        "\u2A8A": "gnap",
        "\u2A8B": "lEg",
        "\u2A8C": "gEl",
        "\u2A8D": "lsime",
        "\u2A8E": "gsime",
        "\u2A8F": "lsimg",
        "\u2A90": "gsiml",
        "\u2A91": "lgE",
        "\u2A92": "glE",
        "\u2A93": "lesges",
        "\u2A94": "gesles",
        "\u2A95": "els",
        "\u2A96": "egs",
        "\u2A97": "elsdot",
        "\u2A98": "egsdot",
        "\u2A99": "el",
        "\u2A9A": "eg",
        "\u2A9D": "siml",
        "\u2A9E": "simg",
        "\u2A9F": "simlE",
        "\u2AA0": "simgE",
        "\u2AA1": "LessLess",
        "\u2AA1\u0338": "NotNestedLessLess",
        "\u2AA2": "GreaterGreater",
        "\u2AA2\u0338": "NotNestedGreaterGreater",
        "\u2AA4": "glj",
        "\u2AA5": "gla",
        "\u2AA6": "ltcc",
        "\u2AA7": "gtcc",
        "\u2AA8": "lescc",
        "\u2AA9": "gescc",
        "\u2AAA": "smt",
        "\u2AAB": "lat",
        "\u2AAC": "smte",
        "\u2AAC\uFE00": "smtes",
        "\u2AAD": "late",
        "\u2AAD\uFE00": "lates",
        "\u2AAE": "bumpE",
        "\u2AAF": "pre",
        "\u2AAF\u0338": "npre",
        "\u2AB0": "sce",
        "\u2AB0\u0338": "nsce",
        "\u2AB3": "prE",
        "\u2AB4": "scE",
        "\u2AB5": "prnE",
        "\u2AB6": "scnE",
        "\u2AB7": "prap",
        "\u2AB8": "scap",
        "\u2AB9": "prnap",
        "\u2ABA": "scnap",
        "\u2ABB": "Pr",
        "\u2ABC": "Sc",
        "\u2ABD": "subdot",
        "\u2ABE": "supdot",
        "\u2ABF": "subplus",
        "\u2AC0": "supplus",
        "\u2AC1": "submult",
        "\u2AC2": "supmult",
        "\u2AC3": "subedot",
        "\u2AC4": "supedot",
        "\u2AC5": "subE",
        "\u2AC5\u0338": "nsubE",
        "\u2AC6": "supE",
        "\u2AC6\u0338": "nsupE",
        "\u2AC7": "subsim",
        "\u2AC8": "supsim",
        "\u2ACB\uFE00": "vsubnE",
        "\u2ACB": "subnE",
        "\u2ACC\uFE00": "vsupnE",
        "\u2ACC": "supnE",
        "\u2ACF": "csub",
        "\u2AD0": "csup",
        "\u2AD1": "csube",
        "\u2AD2": "csupe",
        "\u2AD3": "subsup",
        "\u2AD4": "supsub",
        "\u2AD5": "subsub",
        "\u2AD6": "supsup",
        "\u2AD7": "suphsub",
        "\u2AD8": "supdsub",
        "\u2AD9": "forkv",
        "\u2ADA": "topfork",
        "\u2ADB": "mlcp",
        "\u2AE4": "Dashv",
        "\u2AE6": "Vdashl",
        "\u2AE7": "Barv",
        "\u2AE8": "vBar",
        "\u2AE9": "vBarv",
        "\u2AEB": "Vbar",
        "\u2AEC": "Not",
        "\u2AED": "bNot",
        "\u2AEE": "rnmid",
        "\u2AEF": "cirmid",
        "\u2AF0": "midcir",
        "\u2AF1": "topcir",
        "\u2AF2": "nhpar",
        "\u2AF3": "parsim",
        "\u2AFD": "parsl",
        "\u2AFD\u20E5": "nparsl",
        "\u266D": "flat",
        "\u266E": "natur",
        "\u266F": "sharp",
        "\xa4": "curren",
        "\xa2": "cent",
        "$": "dollar",
        "\xa3": "pound",
        "\xa5": "yen",
        "\u20AC": "euro",
        "\xb9": "sup1",
        "\xbd": "half",
        "\u2153": "frac13",
        "\xbc": "frac14",
        "\u2155": "frac15",
        "\u2159": "frac16",
        "\u215B": "frac18",
        "\xb2": "sup2",
        "\u2154": "frac23",
        "\u2156": "frac25",
        "\xb3": "sup3",
        "\xbe": "frac34",
        "\u2157": "frac35",
        "\u215C": "frac38",
        "\u2158": "frac45",
        "\u215A": "frac56",
        "\u215D": "frac58",
        "\u215E": "frac78",
        "\uD835\uDCB6": "ascr",
        "\uD835\uDD52": "aopf",
        "\uD835\uDD1E": "afr",
        "\uD835\uDD38": "Aopf",
        "\uD835\uDD04": "Afr",
        "\uD835\uDC9C": "Ascr",
        "\xaa": "ordf",
        "\xe1": "aacute",
        "\xc1": "Aacute",
        "\xe0": "agrave",
        "\xc0": "Agrave",
        "\u0103": "abreve",
        "\u0102": "Abreve",
        "\xe2": "acirc",
        "\xc2": "Acirc",
        "\xe5": "aring",
        "\xc5": "angst",
        "\xe4": "auml",
        "\xc4": "Auml",
        "\xe3": "atilde",
        "\xc3": "Atilde",
        "\u0105": "aogon",
        "\u0104": "Aogon",
        "\u0101": "amacr",
        "\u0100": "Amacr",
        "\xe6": "aelig",
        "\xc6": "AElig",
        "\uD835\uDCB7": "bscr",
        "\uD835\uDD53": "bopf",
        "\uD835\uDD1F": "bfr",
        "\uD835\uDD39": "Bopf",
        "\u212C": "Bscr",
        "\uD835\uDD05": "Bfr",
        "\uD835\uDD20": "cfr",
        "\uD835\uDCB8": "cscr",
        "\uD835\uDD54": "copf",
        "\u212D": "Cfr",
        "\uD835\uDC9E": "Cscr",
        "\u2102": "Copf",
        "\u0107": "cacute",
        "\u0106": "Cacute",
        "\u0109": "ccirc",
        "\u0108": "Ccirc",
        "\u010D": "ccaron",
        "\u010C": "Ccaron",
        "\u010B": "cdot",
        "\u010A": "Cdot",
        "\xe7": "ccedil",
        "\xc7": "Ccedil",
        "\u2105": "incare",
        "\uD835\uDD21": "dfr",
        "\u2146": "dd",
        "\uD835\uDD55": "dopf",
        "\uD835\uDCB9": "dscr",
        "\uD835\uDC9F": "Dscr",
        "\uD835\uDD07": "Dfr",
        "\u2145": "DD",
        "\uD835\uDD3B": "Dopf",
        "\u010F": "dcaron",
        "\u010E": "Dcaron",
        "\u0111": "dstrok",
        "\u0110": "Dstrok",
        "\xf0": "eth",
        "\xd0": "ETH",
        "\u2147": "ee",
        "\u212F": "escr",
        "\uD835\uDD22": "efr",
        "\uD835\uDD56": "eopf",
        "\u2130": "Escr",
        "\uD835\uDD08": "Efr",
        "\uD835\uDD3C": "Eopf",
        "\xe9": "eacute",
        "\xc9": "Eacute",
        "\xe8": "egrave",
        "\xc8": "Egrave",
        "\xea": "ecirc",
        "\xca": "Ecirc",
        "\u011B": "ecaron",
        "\u011A": "Ecaron",
        "\xeb": "euml",
        "\xcb": "Euml",
        "\u0117": "edot",
        "\u0116": "Edot",
        "\u0119": "eogon",
        "\u0118": "Eogon",
        "\u0113": "emacr",
        "\u0112": "Emacr",
        "\uD835\uDD23": "ffr",
        "\uD835\uDD57": "fopf",
        "\uD835\uDCBB": "fscr",
        "\uD835\uDD09": "Ffr",
        "\uD835\uDD3D": "Fopf",
        "\u2131": "Fscr",
        "\uFB00": "fflig",
        "\uFB03": "ffilig",
        "\uFB04": "ffllig",
        "\uFB01": "filig",
        "fj": "fjlig",
        "\uFB02": "fllig",
        "\u0192": "fnof",
        "\u210A": "gscr",
        "\uD835\uDD58": "gopf",
        "\uD835\uDD24": "gfr",
        "\uD835\uDCA2": "Gscr",
        "\uD835\uDD3E": "Gopf",
        "\uD835\uDD0A": "Gfr",
        "\u01F5": "gacute",
        "\u011F": "gbreve",
        "\u011E": "Gbreve",
        "\u011D": "gcirc",
        "\u011C": "Gcirc",
        "\u0121": "gdot",
        "\u0120": "Gdot",
        "\u0122": "Gcedil",
        "\uD835\uDD25": "hfr",
        "\u210E": "planckh",
        "\uD835\uDCBD": "hscr",
        "\uD835\uDD59": "hopf",
        "\u210B": "Hscr",
        "\u210C": "Hfr",
        "\u210D": "Hopf",
        "\u0125": "hcirc",
        "\u0124": "Hcirc",
        "\u210F": "hbar",
        "\u0127": "hstrok",
        "\u0126": "Hstrok",
        "\uD835\uDD5A": "iopf",
        "\uD835\uDD26": "ifr",
        "\uD835\uDCBE": "iscr",
        "\u2148": "ii",
        "\uD835\uDD40": "Iopf",
        "\u2110": "Iscr",
        "\u2111": "Im",
        "\xed": "iacute",
        "\xcd": "Iacute",
        "\xec": "igrave",
        "\xcc": "Igrave",
        "\xee": "icirc",
        "\xce": "Icirc",
        "\xef": "iuml",
        "\xcf": "Iuml",
        "\u0129": "itilde",
        "\u0128": "Itilde",
        "\u0130": "Idot",
        "\u012F": "iogon",
        "\u012E": "Iogon",
        "\u012B": "imacr",
        "\u012A": "Imacr",
        "\u0133": "ijlig",
        "\u0132": "IJlig",
        "\u0131": "imath",
        "\uD835\uDCBF": "jscr",
        "\uD835\uDD5B": "jopf",
        "\uD835\uDD27": "jfr",
        "\uD835\uDCA5": "Jscr",
        "\uD835\uDD0D": "Jfr",
        "\uD835\uDD41": "Jopf",
        "\u0135": "jcirc",
        "\u0134": "Jcirc",
        "\u0237": "jmath",
        "\uD835\uDD5C": "kopf",
        "\uD835\uDCC0": "kscr",
        "\uD835\uDD28": "kfr",
        "\uD835\uDCA6": "Kscr",
        "\uD835\uDD42": "Kopf",
        "\uD835\uDD0E": "Kfr",
        "\u0137": "kcedil",
        "\u0136": "Kcedil",
        "\uD835\uDD29": "lfr",
        "\uD835\uDCC1": "lscr",
        "\u2113": "ell",
        "\uD835\uDD5D": "lopf",
        "\u2112": "Lscr",
        "\uD835\uDD0F": "Lfr",
        "\uD835\uDD43": "Lopf",
        "\u013A": "lacute",
        "\u0139": "Lacute",
        "\u013E": "lcaron",
        "\u013D": "Lcaron",
        "\u013C": "lcedil",
        "\u013B": "Lcedil",
        "\u0142": "lstrok",
        "\u0141": "Lstrok",
        "\u0140": "lmidot",
        "\u013F": "Lmidot",
        "\uD835\uDD2A": "mfr",
        "\uD835\uDD5E": "mopf",
        "\uD835\uDCC2": "mscr",
        "\uD835\uDD10": "Mfr",
        "\uD835\uDD44": "Mopf",
        "\u2133": "Mscr",
        "\uD835\uDD2B": "nfr",
        "\uD835\uDD5F": "nopf",
        "\uD835\uDCC3": "nscr",
        "\u2115": "Nopf",
        "\uD835\uDCA9": "Nscr",
        "\uD835\uDD11": "Nfr",
        "\u0144": "nacute",
        "\u0143": "Nacute",
        "\u0148": "ncaron",
        "\u0147": "Ncaron",
        "\xf1": "ntilde",
        "\xd1": "Ntilde",
        "\u0146": "ncedil",
        "\u0145": "Ncedil",
        "\u2116": "numero",
        "\u014B": "eng",
        "\u014A": "ENG",
        "\uD835\uDD60": "oopf",
        "\uD835\uDD2C": "ofr",
        "\u2134": "oscr",
        "\uD835\uDCAA": "Oscr",
        "\uD835\uDD12": "Ofr",
        "\uD835\uDD46": "Oopf",
        "\xba": "ordm",
        "\xf3": "oacute",
        "\xd3": "Oacute",
        "\xf2": "ograve",
        "\xd2": "Ograve",
        "\xf4": "ocirc",
        "\xd4": "Ocirc",
        "\xf6": "ouml",
        "\xd6": "Ouml",
        "\u0151": "odblac",
        "\u0150": "Odblac",
        "\xf5": "otilde",
        "\xd5": "Otilde",
        "\xf8": "oslash",
        "\xd8": "Oslash",
        "\u014D": "omacr",
        "\u014C": "Omacr",
        "\u0153": "oelig",
        "\u0152": "OElig",
        "\uD835\uDD2D": "pfr",
        "\uD835\uDCC5": "pscr",
        "\uD835\uDD61": "popf",
        "\u2119": "Popf",
        "\uD835\uDD13": "Pfr",
        "\uD835\uDCAB": "Pscr",
        "\uD835\uDD62": "qopf",
        "\uD835\uDD2E": "qfr",
        "\uD835\uDCC6": "qscr",
        "\uD835\uDCAC": "Qscr",
        "\uD835\uDD14": "Qfr",
        "\u211A": "Qopf",
        "\u0138": "kgreen",
        "\uD835\uDD2F": "rfr",
        "\uD835\uDD63": "ropf",
        "\uD835\uDCC7": "rscr",
        "\u211B": "Rscr",
        "\u211C": "Re",
        "\u211D": "Ropf",
        "\u0155": "racute",
        "\u0154": "Racute",
        "\u0159": "rcaron",
        "\u0158": "Rcaron",
        "\u0157": "rcedil",
        "\u0156": "Rcedil",
        "\uD835\uDD64": "sopf",
        "\uD835\uDCC8": "sscr",
        "\uD835\uDD30": "sfr",
        "\uD835\uDD4A": "Sopf",
        "\uD835\uDD16": "Sfr",
        "\uD835\uDCAE": "Sscr",
        "\u24C8": "oS",
        "\u015B": "sacute",
        "\u015A": "Sacute",
        "\u015D": "scirc",
        "\u015C": "Scirc",
        "\u0161": "scaron",
        "\u0160": "Scaron",
        "\u015F": "scedil",
        "\u015E": "Scedil",
        "\xdf": "szlig",
        "\uD835\uDD31": "tfr",
        "\uD835\uDCC9": "tscr",
        "\uD835\uDD65": "topf",
        "\uD835\uDCAF": "Tscr",
        "\uD835\uDD17": "Tfr",
        "\uD835\uDD4B": "Topf",
        "\u0165": "tcaron",
        "\u0164": "Tcaron",
        "\u0163": "tcedil",
        "\u0162": "Tcedil",
        "\u2122": "trade",
        "\u0167": "tstrok",
        "\u0166": "Tstrok",
        "\uD835\uDCCA": "uscr",
        "\uD835\uDD66": "uopf",
        "\uD835\uDD32": "ufr",
        "\uD835\uDD4C": "Uopf",
        "\uD835\uDD18": "Ufr",
        "\uD835\uDCB0": "Uscr",
        "\xfa": "uacute",
        "\xda": "Uacute",
        "\xf9": "ugrave",
        "\xd9": "Ugrave",
        "\u016D": "ubreve",
        "\u016C": "Ubreve",
        "\xfb": "ucirc",
        "\xdb": "Ucirc",
        "\u016F": "uring",
        "\u016E": "Uring",
        "\xfc": "uuml",
        "\xdc": "Uuml",
        "\u0171": "udblac",
        "\u0170": "Udblac",
        "\u0169": "utilde",
        "\u0168": "Utilde",
        "\u0173": "uogon",
        "\u0172": "Uogon",
        "\u016B": "umacr",
        "\u016A": "Umacr",
        "\uD835\uDD33": "vfr",
        "\uD835\uDD67": "vopf",
        "\uD835\uDCCB": "vscr",
        "\uD835\uDD19": "Vfr",
        "\uD835\uDD4D": "Vopf",
        "\uD835\uDCB1": "Vscr",
        "\uD835\uDD68": "wopf",
        "\uD835\uDCCC": "wscr",
        "\uD835\uDD34": "wfr",
        "\uD835\uDCB2": "Wscr",
        "\uD835\uDD4E": "Wopf",
        "\uD835\uDD1A": "Wfr",
        "\u0175": "wcirc",
        "\u0174": "Wcirc",
        "\uD835\uDD35": "xfr",
        "\uD835\uDCCD": "xscr",
        "\uD835\uDD69": "xopf",
        "\uD835\uDD4F": "Xopf",
        "\uD835\uDD1B": "Xfr",
        "\uD835\uDCB3": "Xscr",
        "\uD835\uDD36": "yfr",
        "\uD835\uDCCE": "yscr",
        "\uD835\uDD6A": "yopf",
        "\uD835\uDCB4": "Yscr",
        "\uD835\uDD1C": "Yfr",
        "\uD835\uDD50": "Yopf",
        "\xfd": "yacute",
        "\xdd": "Yacute",
        "\u0177": "ycirc",
        "\u0176": "Ycirc",
        "\xff": "yuml",
        "\u0178": "Yuml",
        "\uD835\uDCCF": "zscr",
        "\uD835\uDD37": "zfr",
        "\uD835\uDD6B": "zopf",
        "\u2128": "Zfr",
        "\u2124": "Zopf",
        "\uD835\uDCB5": "Zscr",
        "\u017A": "zacute",
        "\u0179": "Zacute",
        "\u017E": "zcaron",
        "\u017D": "Zcaron",
        "\u017C": "zdot",
        "\u017B": "Zdot",
        "\u01B5": "imped",
        "\xfe": "thorn",
        "\xde": "THORN",
        "\u0149": "napos",
        "\u03B1": "alpha",
        "\u0391": "Alpha",
        "\u03B2": "beta",
        "\u0392": "Beta",
        "\u03B3": "gamma",
        "\u0393": "Gamma",
        "\u03B4": "delta",
        "\u0394": "Delta",
        "\u03B5": "epsi",
        "\u03F5": "epsiv",
        "\u0395": "Epsilon",
        "\u03DD": "gammad",
        "\u03DC": "Gammad",
        "\u03B6": "zeta",
        "\u0396": "Zeta",
        "\u03B7": "eta",
        "\u0397": "Eta",
        "\u03B8": "theta",
        "\u03D1": "thetav",
        "\u0398": "Theta",
        "\u03B9": "iota",
        "\u0399": "Iota",
        "\u03BA": "kappa",
        "\u03F0": "kappav",
        "\u039A": "Kappa",
        "\u03BB": "lambda",
        "\u039B": "Lambda",
        "\u03BC": "mu",
        "\xb5": "micro",
        "\u039C": "Mu",
        "\u03BD": "nu",
        "\u039D": "Nu",
        "\u03BE": "xi",
        "\u039E": "Xi",
        "\u03BF": "omicron",
        "\u039F": "Omicron",
        "\u03C0": "pi",
        "\u03D6": "piv",
        "\u03A0": "Pi",
        "\u03C1": "rho",
        "\u03F1": "rhov",
        "\u03A1": "Rho",
        "\u03C3": "sigma",
        "\u03A3": "Sigma",
        "\u03C2": "sigmaf",
        "\u03C4": "tau",
        "\u03A4": "Tau",
        "\u03C5": "upsi",
        "\u03A5": "Upsilon",
        "\u03D2": "Upsi",
        "\u03C6": "phi",
        "\u03D5": "phiv",
        "\u03A6": "Phi",
        "\u03C7": "chi",
        "\u03A7": "Chi",
        "\u03C8": "psi",
        "\u03A8": "Psi",
        "\u03C9": "omega",
        "\u03A9": "ohm",
        "\u0430": "acy",
        "\u0410": "Acy",
        "\u0431": "bcy",
        "\u0411": "Bcy",
        "\u0432": "vcy",
        "\u0412": "Vcy",
        "\u0433": "gcy",
        "\u0413": "Gcy",
        "\u0453": "gjcy",
        "\u0403": "GJcy",
        "\u0434": "dcy",
        "\u0414": "Dcy",
        "\u0452": "djcy",
        "\u0402": "DJcy",
        "\u0435": "iecy",
        "\u0415": "IEcy",
        "\u0451": "iocy",
        "\u0401": "IOcy",
        "\u0454": "jukcy",
        "\u0404": "Jukcy",
        "\u0436": "zhcy",
        "\u0416": "ZHcy",
        "\u0437": "zcy",
        "\u0417": "Zcy",
        "\u0455": "dscy",
        "\u0405": "DScy",
        "\u0438": "icy",
        "\u0418": "Icy",
        "\u0456": "iukcy",
        "\u0406": "Iukcy",
        "\u0457": "yicy",
        "\u0407": "YIcy",
        "\u0439": "jcy",
        "\u0419": "Jcy",
        "\u0458": "jsercy",
        "\u0408": "Jsercy",
        "\u043A": "kcy",
        "\u041A": "Kcy",
        "\u045C": "kjcy",
        "\u040C": "KJcy",
        "\u043B": "lcy",
        "\u041B": "Lcy",
        "\u0459": "ljcy",
        "\u0409": "LJcy",
        "\u043C": "mcy",
        "\u041C": "Mcy",
        "\u043D": "ncy",
        "\u041D": "Ncy",
        "\u045A": "njcy",
        "\u040A": "NJcy",
        "\u043E": "ocy",
        "\u041E": "Ocy",
        "\u043F": "pcy",
        "\u041F": "Pcy",
        "\u0440": "rcy",
        "\u0420": "Rcy",
        "\u0441": "scy",
        "\u0421": "Scy",
        "\u0442": "tcy",
        "\u0422": "Tcy",
        "\u045B": "tshcy",
        "\u040B": "TSHcy",
        "\u0443": "ucy",
        "\u0423": "Ucy",
        "\u045E": "ubrcy",
        "\u040E": "Ubrcy",
        "\u0444": "fcy",
        "\u0424": "Fcy",
        "\u0445": "khcy",
        "\u0425": "KHcy",
        "\u0446": "tscy",
        "\u0426": "TScy",
        "\u0447": "chcy",
        "\u0427": "CHcy",
        "\u045F": "dzcy",
        "\u040F": "DZcy",
        "\u0448": "shcy",
        "\u0428": "SHcy",
        "\u0449": "shchcy",
        "\u0429": "SHCHcy",
        "\u044A": "hardcy",
        "\u042A": "HARDcy",
        "\u044B": "ycy",
        "\u042B": "Ycy",
        "\u044C": "softcy",
        "\u042C": "SOFTcy",
        "\u044D": "ecy",
        "\u042D": "Ecy",
        "\u044E": "yucy",
        "\u042E": "YUcy",
        "\u044F": "yacy",
        "\u042F": "YAcy",
        "\u2135": "aleph",
        "\u2136": "beth",
        "\u2137": "gimel",
        "\u2138": "daleth"
    };
    var regexEscape = /["&'<>`]/g;
    var escapeMap = {
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#x27;",
        "<": "&lt;",
        // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
        // following is not strictly necessary unless it’s part of a tag or an
        // unquoted attribute value. We’re only escaping it to support those
        // situations, and for XML support.
        ">": "&gt;",
        // In Internet Explorer ≤ 8, the backtick character can be used
        // to break out of (un)quoted attribute values or HTML comments.
        // See http://html5sec.org/#102, http://html5sec.org/#108, and
        // http://html5sec.org/#133.
        "`": "&#x60;"
    };
    var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
    var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
    var decodeMap = {
        "aacute": "\xe1",
        "Aacute": "\xc1",
        "abreve": "\u0103",
        "Abreve": "\u0102",
        "ac": "\u223E",
        "acd": "\u223F",
        "acE": "\u223E\u0333",
        "acirc": "\xe2",
        "Acirc": "\xc2",
        "acute": "\xb4",
        "acy": "\u0430",
        "Acy": "\u0410",
        "aelig": "\xe6",
        "AElig": "\xc6",
        "af": "\u2061",
        "afr": "\uD835\uDD1E",
        "Afr": "\uD835\uDD04",
        "agrave": "\xe0",
        "Agrave": "\xc0",
        "alefsym": "\u2135",
        "aleph": "\u2135",
        "alpha": "\u03B1",
        "Alpha": "\u0391",
        "amacr": "\u0101",
        "Amacr": "\u0100",
        "amalg": "\u2A3F",
        "amp": "&",
        "AMP": "&",
        "and": "\u2227",
        "And": "\u2A53",
        "andand": "\u2A55",
        "andd": "\u2A5C",
        "andslope": "\u2A58",
        "andv": "\u2A5A",
        "ang": "\u2220",
        "ange": "\u29A4",
        "angle": "\u2220",
        "angmsd": "\u2221",
        "angmsdaa": "\u29A8",
        "angmsdab": "\u29A9",
        "angmsdac": "\u29AA",
        "angmsdad": "\u29AB",
        "angmsdae": "\u29AC",
        "angmsdaf": "\u29AD",
        "angmsdag": "\u29AE",
        "angmsdah": "\u29AF",
        "angrt": "\u221F",
        "angrtvb": "\u22BE",
        "angrtvbd": "\u299D",
        "angsph": "\u2222",
        "angst": "\xc5",
        "angzarr": "\u237C",
        "aogon": "\u0105",
        "Aogon": "\u0104",
        "aopf": "\uD835\uDD52",
        "Aopf": "\uD835\uDD38",
        "ap": "\u2248",
        "apacir": "\u2A6F",
        "ape": "\u224A",
        "apE": "\u2A70",
        "apid": "\u224B",
        "apos": "'",
        "ApplyFunction": "\u2061",
        "approx": "\u2248",
        "approxeq": "\u224A",
        "aring": "\xe5",
        "Aring": "\xc5",
        "ascr": "\uD835\uDCB6",
        "Ascr": "\uD835\uDC9C",
        "Assign": "\u2254",
        "ast": "*",
        "asymp": "\u2248",
        "asympeq": "\u224D",
        "atilde": "\xe3",
        "Atilde": "\xc3",
        "auml": "\xe4",
        "Auml": "\xc4",
        "awconint": "\u2233",
        "awint": "\u2A11",
        "backcong": "\u224C",
        "backepsilon": "\u03F6",
        "backprime": "\u2035",
        "backsim": "\u223D",
        "backsimeq": "\u22CD",
        "Backslash": "\u2216",
        "Barv": "\u2AE7",
        "barvee": "\u22BD",
        "barwed": "\u2305",
        "Barwed": "\u2306",
        "barwedge": "\u2305",
        "bbrk": "\u23B5",
        "bbrktbrk": "\u23B6",
        "bcong": "\u224C",
        "bcy": "\u0431",
        "Bcy": "\u0411",
        "bdquo": "\u201E",
        "becaus": "\u2235",
        "because": "\u2235",
        "Because": "\u2235",
        "bemptyv": "\u29B0",
        "bepsi": "\u03F6",
        "bernou": "\u212C",
        "Bernoullis": "\u212C",
        "beta": "\u03B2",
        "Beta": "\u0392",
        "beth": "\u2136",
        "between": "\u226C",
        "bfr": "\uD835\uDD1F",
        "Bfr": "\uD835\uDD05",
        "bigcap": "\u22C2",
        "bigcirc": "\u25EF",
        "bigcup": "\u22C3",
        "bigodot": "\u2A00",
        "bigoplus": "\u2A01",
        "bigotimes": "\u2A02",
        "bigsqcup": "\u2A06",
        "bigstar": "\u2605",
        "bigtriangledown": "\u25BD",
        "bigtriangleup": "\u25B3",
        "biguplus": "\u2A04",
        "bigvee": "\u22C1",
        "bigwedge": "\u22C0",
        "bkarow": "\u290D",
        "blacklozenge": "\u29EB",
        "blacksquare": "\u25AA",
        "blacktriangle": "\u25B4",
        "blacktriangledown": "\u25BE",
        "blacktriangleleft": "\u25C2",
        "blacktriangleright": "\u25B8",
        "blank": "\u2423",
        "blk12": "\u2592",
        "blk14": "\u2591",
        "blk34": "\u2593",
        "block": "\u2588",
        "bne": "=\u20E5",
        "bnequiv": "\u2261\u20E5",
        "bnot": "\u2310",
        "bNot": "\u2AED",
        "bopf": "\uD835\uDD53",
        "Bopf": "\uD835\uDD39",
        "bot": "\u22A5",
        "bottom": "\u22A5",
        "bowtie": "\u22C8",
        "boxbox": "\u29C9",
        "boxdl": "\u2510",
        "boxdL": "\u2555",
        "boxDl": "\u2556",
        "boxDL": "\u2557",
        "boxdr": "\u250C",
        "boxdR": "\u2552",
        "boxDr": "\u2553",
        "boxDR": "\u2554",
        "boxh": "\u2500",
        "boxH": "\u2550",
        "boxhd": "\u252C",
        "boxhD": "\u2565",
        "boxHd": "\u2564",
        "boxHD": "\u2566",
        "boxhu": "\u2534",
        "boxhU": "\u2568",
        "boxHu": "\u2567",
        "boxHU": "\u2569",
        "boxminus": "\u229F",
        "boxplus": "\u229E",
        "boxtimes": "\u22A0",
        "boxul": "\u2518",
        "boxuL": "\u255B",
        "boxUl": "\u255C",
        "boxUL": "\u255D",
        "boxur": "\u2514",
        "boxuR": "\u2558",
        "boxUr": "\u2559",
        "boxUR": "\u255A",
        "boxv": "\u2502",
        "boxV": "\u2551",
        "boxvh": "\u253C",
        "boxvH": "\u256A",
        "boxVh": "\u256B",
        "boxVH": "\u256C",
        "boxvl": "\u2524",
        "boxvL": "\u2561",
        "boxVl": "\u2562",
        "boxVL": "\u2563",
        "boxvr": "\u251C",
        "boxvR": "\u255E",
        "boxVr": "\u255F",
        "boxVR": "\u2560",
        "bprime": "\u2035",
        "breve": "\u02D8",
        "Breve": "\u02D8",
        "brvbar": "\xa6",
        "bscr": "\uD835\uDCB7",
        "Bscr": "\u212C",
        "bsemi": "\u204F",
        "bsim": "\u223D",
        "bsime": "\u22CD",
        "bsol": "\\",
        "bsolb": "\u29C5",
        "bsolhsub": "\u27C8",
        "bull": "\u2022",
        "bullet": "\u2022",
        "bump": "\u224E",
        "bumpe": "\u224F",
        "bumpE": "\u2AAE",
        "bumpeq": "\u224F",
        "Bumpeq": "\u224E",
        "cacute": "\u0107",
        "Cacute": "\u0106",
        "cap": "\u2229",
        "Cap": "\u22D2",
        "capand": "\u2A44",
        "capbrcup": "\u2A49",
        "capcap": "\u2A4B",
        "capcup": "\u2A47",
        "capdot": "\u2A40",
        "CapitalDifferentialD": "\u2145",
        "caps": "\u2229\uFE00",
        "caret": "\u2041",
        "caron": "\u02C7",
        "Cayleys": "\u212D",
        "ccaps": "\u2A4D",
        "ccaron": "\u010D",
        "Ccaron": "\u010C",
        "ccedil": "\xe7",
        "Ccedil": "\xc7",
        "ccirc": "\u0109",
        "Ccirc": "\u0108",
        "Cconint": "\u2230",
        "ccups": "\u2A4C",
        "ccupssm": "\u2A50",
        "cdot": "\u010B",
        "Cdot": "\u010A",
        "cedil": "\xb8",
        "Cedilla": "\xb8",
        "cemptyv": "\u29B2",
        "cent": "\xa2",
        "centerdot": "\xb7",
        "CenterDot": "\xb7",
        "cfr": "\uD835\uDD20",
        "Cfr": "\u212D",
        "chcy": "\u0447",
        "CHcy": "\u0427",
        "check": "\u2713",
        "checkmark": "\u2713",
        "chi": "\u03C7",
        "Chi": "\u03A7",
        "cir": "\u25CB",
        "circ": "\u02C6",
        "circeq": "\u2257",
        "circlearrowleft": "\u21BA",
        "circlearrowright": "\u21BB",
        "circledast": "\u229B",
        "circledcirc": "\u229A",
        "circleddash": "\u229D",
        "CircleDot": "\u2299",
        "circledR": "\xae",
        "circledS": "\u24C8",
        "CircleMinus": "\u2296",
        "CirclePlus": "\u2295",
        "CircleTimes": "\u2297",
        "cire": "\u2257",
        "cirE": "\u29C3",
        "cirfnint": "\u2A10",
        "cirmid": "\u2AEF",
        "cirscir": "\u29C2",
        "ClockwiseContourIntegral": "\u2232",
        "CloseCurlyDoubleQuote": "\u201D",
        "CloseCurlyQuote": "\u2019",
        "clubs": "\u2663",
        "clubsuit": "\u2663",
        "colon": ":",
        "Colon": "\u2237",
        "colone": "\u2254",
        "Colone": "\u2A74",
        "coloneq": "\u2254",
        "comma": ",",
        "commat": "@",
        "comp": "\u2201",
        "compfn": "\u2218",
        "complement": "\u2201",
        "complexes": "\u2102",
        "cong": "\u2245",
        "congdot": "\u2A6D",
        "Congruent": "\u2261",
        "conint": "\u222E",
        "Conint": "\u222F",
        "ContourIntegral": "\u222E",
        "copf": "\uD835\uDD54",
        "Copf": "\u2102",
        "coprod": "\u2210",
        "Coproduct": "\u2210",
        "copy": "\xa9",
        "COPY": "\xa9",
        "copysr": "\u2117",
        "CounterClockwiseContourIntegral": "\u2233",
        "crarr": "\u21B5",
        "cross": "\u2717",
        "Cross": "\u2A2F",
        "cscr": "\uD835\uDCB8",
        "Cscr": "\uD835\uDC9E",
        "csub": "\u2ACF",
        "csube": "\u2AD1",
        "csup": "\u2AD0",
        "csupe": "\u2AD2",
        "ctdot": "\u22EF",
        "cudarrl": "\u2938",
        "cudarrr": "\u2935",
        "cuepr": "\u22DE",
        "cuesc": "\u22DF",
        "cularr": "\u21B6",
        "cularrp": "\u293D",
        "cup": "\u222A",
        "Cup": "\u22D3",
        "cupbrcap": "\u2A48",
        "cupcap": "\u2A46",
        "CupCap": "\u224D",
        "cupcup": "\u2A4A",
        "cupdot": "\u228D",
        "cupor": "\u2A45",
        "cups": "\u222A\uFE00",
        "curarr": "\u21B7",
        "curarrm": "\u293C",
        "curlyeqprec": "\u22DE",
        "curlyeqsucc": "\u22DF",
        "curlyvee": "\u22CE",
        "curlywedge": "\u22CF",
        "curren": "\xa4",
        "curvearrowleft": "\u21B6",
        "curvearrowright": "\u21B7",
        "cuvee": "\u22CE",
        "cuwed": "\u22CF",
        "cwconint": "\u2232",
        "cwint": "\u2231",
        "cylcty": "\u232D",
        "dagger": "\u2020",
        "Dagger": "\u2021",
        "daleth": "\u2138",
        "darr": "\u2193",
        "dArr": "\u21D3",
        "Darr": "\u21A1",
        "dash": "\u2010",
        "dashv": "\u22A3",
        "Dashv": "\u2AE4",
        "dbkarow": "\u290F",
        "dblac": "\u02DD",
        "dcaron": "\u010F",
        "Dcaron": "\u010E",
        "dcy": "\u0434",
        "Dcy": "\u0414",
        "dd": "\u2146",
        "DD": "\u2145",
        "ddagger": "\u2021",
        "ddarr": "\u21CA",
        "DDotrahd": "\u2911",
        "ddotseq": "\u2A77",
        "deg": "\xb0",
        "Del": "\u2207",
        "delta": "\u03B4",
        "Delta": "\u0394",
        "demptyv": "\u29B1",
        "dfisht": "\u297F",
        "dfr": "\uD835\uDD21",
        "Dfr": "\uD835\uDD07",
        "dHar": "\u2965",
        "dharl": "\u21C3",
        "dharr": "\u21C2",
        "DiacriticalAcute": "\xb4",
        "DiacriticalDot": "\u02D9",
        "DiacriticalDoubleAcute": "\u02DD",
        "DiacriticalGrave": "`",
        "DiacriticalTilde": "\u02DC",
        "diam": "\u22C4",
        "diamond": "\u22C4",
        "Diamond": "\u22C4",
        "diamondsuit": "\u2666",
        "diams": "\u2666",
        "die": "\xa8",
        "DifferentialD": "\u2146",
        "digamma": "\u03DD",
        "disin": "\u22F2",
        "div": "\xf7",
        "divide": "\xf7",
        "divideontimes": "\u22C7",
        "divonx": "\u22C7",
        "djcy": "\u0452",
        "DJcy": "\u0402",
        "dlcorn": "\u231E",
        "dlcrop": "\u230D",
        "dollar": "$",
        "dopf": "\uD835\uDD55",
        "Dopf": "\uD835\uDD3B",
        "dot": "\u02D9",
        "Dot": "\xa8",
        "DotDot": "\u20DC",
        "doteq": "\u2250",
        "doteqdot": "\u2251",
        "DotEqual": "\u2250",
        "dotminus": "\u2238",
        "dotplus": "\u2214",
        "dotsquare": "\u22A1",
        "doublebarwedge": "\u2306",
        "DoubleContourIntegral": "\u222F",
        "DoubleDot": "\xa8",
        "DoubleDownArrow": "\u21D3",
        "DoubleLeftArrow": "\u21D0",
        "DoubleLeftRightArrow": "\u21D4",
        "DoubleLeftTee": "\u2AE4",
        "DoubleLongLeftArrow": "\u27F8",
        "DoubleLongLeftRightArrow": "\u27FA",
        "DoubleLongRightArrow": "\u27F9",
        "DoubleRightArrow": "\u21D2",
        "DoubleRightTee": "\u22A8",
        "DoubleUpArrow": "\u21D1",
        "DoubleUpDownArrow": "\u21D5",
        "DoubleVerticalBar": "\u2225",
        "downarrow": "\u2193",
        "Downarrow": "\u21D3",
        "DownArrow": "\u2193",
        "DownArrowBar": "\u2913",
        "DownArrowUpArrow": "\u21F5",
        "DownBreve": "\u0311",
        "downdownarrows": "\u21CA",
        "downharpoonleft": "\u21C3",
        "downharpoonright": "\u21C2",
        "DownLeftRightVector": "\u2950",
        "DownLeftTeeVector": "\u295E",
        "DownLeftVector": "\u21BD",
        "DownLeftVectorBar": "\u2956",
        "DownRightTeeVector": "\u295F",
        "DownRightVector": "\u21C1",
        "DownRightVectorBar": "\u2957",
        "DownTee": "\u22A4",
        "DownTeeArrow": "\u21A7",
        "drbkarow": "\u2910",
        "drcorn": "\u231F",
        "drcrop": "\u230C",
        "dscr": "\uD835\uDCB9",
        "Dscr": "\uD835\uDC9F",
        "dscy": "\u0455",
        "DScy": "\u0405",
        "dsol": "\u29F6",
        "dstrok": "\u0111",
        "Dstrok": "\u0110",
        "dtdot": "\u22F1",
        "dtri": "\u25BF",
        "dtrif": "\u25BE",
        "duarr": "\u21F5",
        "duhar": "\u296F",
        "dwangle": "\u29A6",
        "dzcy": "\u045F",
        "DZcy": "\u040F",
        "dzigrarr": "\u27FF",
        "eacute": "\xe9",
        "Eacute": "\xc9",
        "easter": "\u2A6E",
        "ecaron": "\u011B",
        "Ecaron": "\u011A",
        "ecir": "\u2256",
        "ecirc": "\xea",
        "Ecirc": "\xca",
        "ecolon": "\u2255",
        "ecy": "\u044D",
        "Ecy": "\u042D",
        "eDDot": "\u2A77",
        "edot": "\u0117",
        "eDot": "\u2251",
        "Edot": "\u0116",
        "ee": "\u2147",
        "efDot": "\u2252",
        "efr": "\uD835\uDD22",
        "Efr": "\uD835\uDD08",
        "eg": "\u2A9A",
        "egrave": "\xe8",
        "Egrave": "\xc8",
        "egs": "\u2A96",
        "egsdot": "\u2A98",
        "el": "\u2A99",
        "Element": "\u2208",
        "elinters": "\u23E7",
        "ell": "\u2113",
        "els": "\u2A95",
        "elsdot": "\u2A97",
        "emacr": "\u0113",
        "Emacr": "\u0112",
        "empty": "\u2205",
        "emptyset": "\u2205",
        "EmptySmallSquare": "\u25FB",
        "emptyv": "\u2205",
        "EmptyVerySmallSquare": "\u25AB",
        "emsp": "\u2003",
        "emsp13": "\u2004",
        "emsp14": "\u2005",
        "eng": "\u014B",
        "ENG": "\u014A",
        "ensp": "\u2002",
        "eogon": "\u0119",
        "Eogon": "\u0118",
        "eopf": "\uD835\uDD56",
        "Eopf": "\uD835\uDD3C",
        "epar": "\u22D5",
        "eparsl": "\u29E3",
        "eplus": "\u2A71",
        "epsi": "\u03B5",
        "epsilon": "\u03B5",
        "Epsilon": "\u0395",
        "epsiv": "\u03F5",
        "eqcirc": "\u2256",
        "eqcolon": "\u2255",
        "eqsim": "\u2242",
        "eqslantgtr": "\u2A96",
        "eqslantless": "\u2A95",
        "Equal": "\u2A75",
        "equals": "=",
        "EqualTilde": "\u2242",
        "equest": "\u225F",
        "Equilibrium": "\u21CC",
        "equiv": "\u2261",
        "equivDD": "\u2A78",
        "eqvparsl": "\u29E5",
        "erarr": "\u2971",
        "erDot": "\u2253",
        "escr": "\u212F",
        "Escr": "\u2130",
        "esdot": "\u2250",
        "esim": "\u2242",
        "Esim": "\u2A73",
        "eta": "\u03B7",
        "Eta": "\u0397",
        "eth": "\xf0",
        "ETH": "\xd0",
        "euml": "\xeb",
        "Euml": "\xcb",
        "euro": "\u20AC",
        "excl": "!",
        "exist": "\u2203",
        "Exists": "\u2203",
        "expectation": "\u2130",
        "exponentiale": "\u2147",
        "ExponentialE": "\u2147",
        "fallingdotseq": "\u2252",
        "fcy": "\u0444",
        "Fcy": "\u0424",
        "female": "\u2640",
        "ffilig": "\uFB03",
        "fflig": "\uFB00",
        "ffllig": "\uFB04",
        "ffr": "\uD835\uDD23",
        "Ffr": "\uD835\uDD09",
        "filig": "\uFB01",
        "FilledSmallSquare": "\u25FC",
        "FilledVerySmallSquare": "\u25AA",
        "fjlig": "fj",
        "flat": "\u266D",
        "fllig": "\uFB02",
        "fltns": "\u25B1",
        "fnof": "\u0192",
        "fopf": "\uD835\uDD57",
        "Fopf": "\uD835\uDD3D",
        "forall": "\u2200",
        "ForAll": "\u2200",
        "fork": "\u22D4",
        "forkv": "\u2AD9",
        "Fouriertrf": "\u2131",
        "fpartint": "\u2A0D",
        "frac12": "\xbd",
        "frac13": "\u2153",
        "frac14": "\xbc",
        "frac15": "\u2155",
        "frac16": "\u2159",
        "frac18": "\u215B",
        "frac23": "\u2154",
        "frac25": "\u2156",
        "frac34": "\xbe",
        "frac35": "\u2157",
        "frac38": "\u215C",
        "frac45": "\u2158",
        "frac56": "\u215A",
        "frac58": "\u215D",
        "frac78": "\u215E",
        "frasl": "\u2044",
        "frown": "\u2322",
        "fscr": "\uD835\uDCBB",
        "Fscr": "\u2131",
        "gacute": "\u01F5",
        "gamma": "\u03B3",
        "Gamma": "\u0393",
        "gammad": "\u03DD",
        "Gammad": "\u03DC",
        "gap": "\u2A86",
        "gbreve": "\u011F",
        "Gbreve": "\u011E",
        "Gcedil": "\u0122",
        "gcirc": "\u011D",
        "Gcirc": "\u011C",
        "gcy": "\u0433",
        "Gcy": "\u0413",
        "gdot": "\u0121",
        "Gdot": "\u0120",
        "ge": "\u2265",
        "gE": "\u2267",
        "gel": "\u22DB",
        "gEl": "\u2A8C",
        "geq": "\u2265",
        "geqq": "\u2267",
        "geqslant": "\u2A7E",
        "ges": "\u2A7E",
        "gescc": "\u2AA9",
        "gesdot": "\u2A80",
        "gesdoto": "\u2A82",
        "gesdotol": "\u2A84",
        "gesl": "\u22DB\uFE00",
        "gesles": "\u2A94",
        "gfr": "\uD835\uDD24",
        "Gfr": "\uD835\uDD0A",
        "gg": "\u226B",
        "Gg": "\u22D9",
        "ggg": "\u22D9",
        "gimel": "\u2137",
        "gjcy": "\u0453",
        "GJcy": "\u0403",
        "gl": "\u2277",
        "gla": "\u2AA5",
        "glE": "\u2A92",
        "glj": "\u2AA4",
        "gnap": "\u2A8A",
        "gnapprox": "\u2A8A",
        "gne": "\u2A88",
        "gnE": "\u2269",
        "gneq": "\u2A88",
        "gneqq": "\u2269",
        "gnsim": "\u22E7",
        "gopf": "\uD835\uDD58",
        "Gopf": "\uD835\uDD3E",
        "grave": "`",
        "GreaterEqual": "\u2265",
        "GreaterEqualLess": "\u22DB",
        "GreaterFullEqual": "\u2267",
        "GreaterGreater": "\u2AA2",
        "GreaterLess": "\u2277",
        "GreaterSlantEqual": "\u2A7E",
        "GreaterTilde": "\u2273",
        "gscr": "\u210A",
        "Gscr": "\uD835\uDCA2",
        "gsim": "\u2273",
        "gsime": "\u2A8E",
        "gsiml": "\u2A90",
        "gt": ">",
        "Gt": "\u226B",
        "GT": ">",
        "gtcc": "\u2AA7",
        "gtcir": "\u2A7A",
        "gtdot": "\u22D7",
        "gtlPar": "\u2995",
        "gtquest": "\u2A7C",
        "gtrapprox": "\u2A86",
        "gtrarr": "\u2978",
        "gtrdot": "\u22D7",
        "gtreqless": "\u22DB",
        "gtreqqless": "\u2A8C",
        "gtrless": "\u2277",
        "gtrsim": "\u2273",
        "gvertneqq": "\u2269\uFE00",
        "gvnE": "\u2269\uFE00",
        "Hacek": "\u02C7",
        "hairsp": "\u200A",
        "half": "\xbd",
        "hamilt": "\u210B",
        "hardcy": "\u044A",
        "HARDcy": "\u042A",
        "harr": "\u2194",
        "hArr": "\u21D4",
        "harrcir": "\u2948",
        "harrw": "\u21AD",
        "Hat": "^",
        "hbar": "\u210F",
        "hcirc": "\u0125",
        "Hcirc": "\u0124",
        "hearts": "\u2665",
        "heartsuit": "\u2665",
        "hellip": "\u2026",
        "hercon": "\u22B9",
        "hfr": "\uD835\uDD25",
        "Hfr": "\u210C",
        "HilbertSpace": "\u210B",
        "hksearow": "\u2925",
        "hkswarow": "\u2926",
        "hoarr": "\u21FF",
        "homtht": "\u223B",
        "hookleftarrow": "\u21A9",
        "hookrightarrow": "\u21AA",
        "hopf": "\uD835\uDD59",
        "Hopf": "\u210D",
        "horbar": "\u2015",
        "HorizontalLine": "\u2500",
        "hscr": "\uD835\uDCBD",
        "Hscr": "\u210B",
        "hslash": "\u210F",
        "hstrok": "\u0127",
        "Hstrok": "\u0126",
        "HumpDownHump": "\u224E",
        "HumpEqual": "\u224F",
        "hybull": "\u2043",
        "hyphen": "\u2010",
        "iacute": "\xed",
        "Iacute": "\xcd",
        "ic": "\u2063",
        "icirc": "\xee",
        "Icirc": "\xce",
        "icy": "\u0438",
        "Icy": "\u0418",
        "Idot": "\u0130",
        "iecy": "\u0435",
        "IEcy": "\u0415",
        "iexcl": "\xa1",
        "iff": "\u21D4",
        "ifr": "\uD835\uDD26",
        "Ifr": "\u2111",
        "igrave": "\xec",
        "Igrave": "\xcc",
        "ii": "\u2148",
        "iiiint": "\u2A0C",
        "iiint": "\u222D",
        "iinfin": "\u29DC",
        "iiota": "\u2129",
        "ijlig": "\u0133",
        "IJlig": "\u0132",
        "Im": "\u2111",
        "imacr": "\u012B",
        "Imacr": "\u012A",
        "image": "\u2111",
        "ImaginaryI": "\u2148",
        "imagline": "\u2110",
        "imagpart": "\u2111",
        "imath": "\u0131",
        "imof": "\u22B7",
        "imped": "\u01B5",
        "Implies": "\u21D2",
        "in": "\u2208",
        "incare": "\u2105",
        "infin": "\u221E",
        "infintie": "\u29DD",
        "inodot": "\u0131",
        "int": "\u222B",
        "Int": "\u222C",
        "intcal": "\u22BA",
        "integers": "\u2124",
        "Integral": "\u222B",
        "intercal": "\u22BA",
        "Intersection": "\u22C2",
        "intlarhk": "\u2A17",
        "intprod": "\u2A3C",
        "InvisibleComma": "\u2063",
        "InvisibleTimes": "\u2062",
        "iocy": "\u0451",
        "IOcy": "\u0401",
        "iogon": "\u012F",
        "Iogon": "\u012E",
        "iopf": "\uD835\uDD5A",
        "Iopf": "\uD835\uDD40",
        "iota": "\u03B9",
        "Iota": "\u0399",
        "iprod": "\u2A3C",
        "iquest": "\xbf",
        "iscr": "\uD835\uDCBE",
        "Iscr": "\u2110",
        "isin": "\u2208",
        "isindot": "\u22F5",
        "isinE": "\u22F9",
        "isins": "\u22F4",
        "isinsv": "\u22F3",
        "isinv": "\u2208",
        "it": "\u2062",
        "itilde": "\u0129",
        "Itilde": "\u0128",
        "iukcy": "\u0456",
        "Iukcy": "\u0406",
        "iuml": "\xef",
        "Iuml": "\xcf",
        "jcirc": "\u0135",
        "Jcirc": "\u0134",
        "jcy": "\u0439",
        "Jcy": "\u0419",
        "jfr": "\uD835\uDD27",
        "Jfr": "\uD835\uDD0D",
        "jmath": "\u0237",
        "jopf": "\uD835\uDD5B",
        "Jopf": "\uD835\uDD41",
        "jscr": "\uD835\uDCBF",
        "Jscr": "\uD835\uDCA5",
        "jsercy": "\u0458",
        "Jsercy": "\u0408",
        "jukcy": "\u0454",
        "Jukcy": "\u0404",
        "kappa": "\u03BA",
        "Kappa": "\u039A",
        "kappav": "\u03F0",
        "kcedil": "\u0137",
        "Kcedil": "\u0136",
        "kcy": "\u043A",
        "Kcy": "\u041A",
        "kfr": "\uD835\uDD28",
        "Kfr": "\uD835\uDD0E",
        "kgreen": "\u0138",
        "khcy": "\u0445",
        "KHcy": "\u0425",
        "kjcy": "\u045C",
        "KJcy": "\u040C",
        "kopf": "\uD835\uDD5C",
        "Kopf": "\uD835\uDD42",
        "kscr": "\uD835\uDCC0",
        "Kscr": "\uD835\uDCA6",
        "lAarr": "\u21DA",
        "lacute": "\u013A",
        "Lacute": "\u0139",
        "laemptyv": "\u29B4",
        "lagran": "\u2112",
        "lambda": "\u03BB",
        "Lambda": "\u039B",
        "lang": "\u27E8",
        "Lang": "\u27EA",
        "langd": "\u2991",
        "langle": "\u27E8",
        "lap": "\u2A85",
        "Laplacetrf": "\u2112",
        "laquo": "\xab",
        "larr": "\u2190",
        "lArr": "\u21D0",
        "Larr": "\u219E",
        "larrb": "\u21E4",
        "larrbfs": "\u291F",
        "larrfs": "\u291D",
        "larrhk": "\u21A9",
        "larrlp": "\u21AB",
        "larrpl": "\u2939",
        "larrsim": "\u2973",
        "larrtl": "\u21A2",
        "lat": "\u2AAB",
        "latail": "\u2919",
        "lAtail": "\u291B",
        "late": "\u2AAD",
        "lates": "\u2AAD\uFE00",
        "lbarr": "\u290C",
        "lBarr": "\u290E",
        "lbbrk": "\u2772",
        "lbrace": "{",
        "lbrack": "[",
        "lbrke": "\u298B",
        "lbrksld": "\u298F",
        "lbrkslu": "\u298D",
        "lcaron": "\u013E",
        "Lcaron": "\u013D",
        "lcedil": "\u013C",
        "Lcedil": "\u013B",
        "lceil": "\u2308",
        "lcub": "{",
        "lcy": "\u043B",
        "Lcy": "\u041B",
        "ldca": "\u2936",
        "ldquo": "\u201C",
        "ldquor": "\u201E",
        "ldrdhar": "\u2967",
        "ldrushar": "\u294B",
        "ldsh": "\u21B2",
        "le": "\u2264",
        "lE": "\u2266",
        "LeftAngleBracket": "\u27E8",
        "leftarrow": "\u2190",
        "Leftarrow": "\u21D0",
        "LeftArrow": "\u2190",
        "LeftArrowBar": "\u21E4",
        "LeftArrowRightArrow": "\u21C6",
        "leftarrowtail": "\u21A2",
        "LeftCeiling": "\u2308",
        "LeftDoubleBracket": "\u27E6",
        "LeftDownTeeVector": "\u2961",
        "LeftDownVector": "\u21C3",
        "LeftDownVectorBar": "\u2959",
        "LeftFloor": "\u230A",
        "leftharpoondown": "\u21BD",
        "leftharpoonup": "\u21BC",
        "leftleftarrows": "\u21C7",
        "leftrightarrow": "\u2194",
        "Leftrightarrow": "\u21D4",
        "LeftRightArrow": "\u2194",
        "leftrightarrows": "\u21C6",
        "leftrightharpoons": "\u21CB",
        "leftrightsquigarrow": "\u21AD",
        "LeftRightVector": "\u294E",
        "LeftTee": "\u22A3",
        "LeftTeeArrow": "\u21A4",
        "LeftTeeVector": "\u295A",
        "leftthreetimes": "\u22CB",
        "LeftTriangle": "\u22B2",
        "LeftTriangleBar": "\u29CF",
        "LeftTriangleEqual": "\u22B4",
        "LeftUpDownVector": "\u2951",
        "LeftUpTeeVector": "\u2960",
        "LeftUpVector": "\u21BF",
        "LeftUpVectorBar": "\u2958",
        "LeftVector": "\u21BC",
        "LeftVectorBar": "\u2952",
        "leg": "\u22DA",
        "lEg": "\u2A8B",
        "leq": "\u2264",
        "leqq": "\u2266",
        "leqslant": "\u2A7D",
        "les": "\u2A7D",
        "lescc": "\u2AA8",
        "lesdot": "\u2A7F",
        "lesdoto": "\u2A81",
        "lesdotor": "\u2A83",
        "lesg": "\u22DA\uFE00",
        "lesges": "\u2A93",
        "lessapprox": "\u2A85",
        "lessdot": "\u22D6",
        "lesseqgtr": "\u22DA",
        "lesseqqgtr": "\u2A8B",
        "LessEqualGreater": "\u22DA",
        "LessFullEqual": "\u2266",
        "LessGreater": "\u2276",
        "lessgtr": "\u2276",
        "LessLess": "\u2AA1",
        "lesssim": "\u2272",
        "LessSlantEqual": "\u2A7D",
        "LessTilde": "\u2272",
        "lfisht": "\u297C",
        "lfloor": "\u230A",
        "lfr": "\uD835\uDD29",
        "Lfr": "\uD835\uDD0F",
        "lg": "\u2276",
        "lgE": "\u2A91",
        "lHar": "\u2962",
        "lhard": "\u21BD",
        "lharu": "\u21BC",
        "lharul": "\u296A",
        "lhblk": "\u2584",
        "ljcy": "\u0459",
        "LJcy": "\u0409",
        "ll": "\u226A",
        "Ll": "\u22D8",
        "llarr": "\u21C7",
        "llcorner": "\u231E",
        "Lleftarrow": "\u21DA",
        "llhard": "\u296B",
        "lltri": "\u25FA",
        "lmidot": "\u0140",
        "Lmidot": "\u013F",
        "lmoust": "\u23B0",
        "lmoustache": "\u23B0",
        "lnap": "\u2A89",
        "lnapprox": "\u2A89",
        "lne": "\u2A87",
        "lnE": "\u2268",
        "lneq": "\u2A87",
        "lneqq": "\u2268",
        "lnsim": "\u22E6",
        "loang": "\u27EC",
        "loarr": "\u21FD",
        "lobrk": "\u27E6",
        "longleftarrow": "\u27F5",
        "Longleftarrow": "\u27F8",
        "LongLeftArrow": "\u27F5",
        "longleftrightarrow": "\u27F7",
        "Longleftrightarrow": "\u27FA",
        "LongLeftRightArrow": "\u27F7",
        "longmapsto": "\u27FC",
        "longrightarrow": "\u27F6",
        "Longrightarrow": "\u27F9",
        "LongRightArrow": "\u27F6",
        "looparrowleft": "\u21AB",
        "looparrowright": "\u21AC",
        "lopar": "\u2985",
        "lopf": "\uD835\uDD5D",
        "Lopf": "\uD835\uDD43",
        "loplus": "\u2A2D",
        "lotimes": "\u2A34",
        "lowast": "\u2217",
        "lowbar": "_",
        "LowerLeftArrow": "\u2199",
        "LowerRightArrow": "\u2198",
        "loz": "\u25CA",
        "lozenge": "\u25CA",
        "lozf": "\u29EB",
        "lpar": "(",
        "lparlt": "\u2993",
        "lrarr": "\u21C6",
        "lrcorner": "\u231F",
        "lrhar": "\u21CB",
        "lrhard": "\u296D",
        "lrm": "\u200E",
        "lrtri": "\u22BF",
        "lsaquo": "\u2039",
        "lscr": "\uD835\uDCC1",
        "Lscr": "\u2112",
        "lsh": "\u21B0",
        "Lsh": "\u21B0",
        "lsim": "\u2272",
        "lsime": "\u2A8D",
        "lsimg": "\u2A8F",
        "lsqb": "[",
        "lsquo": "\u2018",
        "lsquor": "\u201A",
        "lstrok": "\u0142",
        "Lstrok": "\u0141",
        "lt": "<",
        "Lt": "\u226A",
        "LT": "<",
        "ltcc": "\u2AA6",
        "ltcir": "\u2A79",
        "ltdot": "\u22D6",
        "lthree": "\u22CB",
        "ltimes": "\u22C9",
        "ltlarr": "\u2976",
        "ltquest": "\u2A7B",
        "ltri": "\u25C3",
        "ltrie": "\u22B4",
        "ltrif": "\u25C2",
        "ltrPar": "\u2996",
        "lurdshar": "\u294A",
        "luruhar": "\u2966",
        "lvertneqq": "\u2268\uFE00",
        "lvnE": "\u2268\uFE00",
        "macr": "\xaf",
        "male": "\u2642",
        "malt": "\u2720",
        "maltese": "\u2720",
        "map": "\u21A6",
        "Map": "\u2905",
        "mapsto": "\u21A6",
        "mapstodown": "\u21A7",
        "mapstoleft": "\u21A4",
        "mapstoup": "\u21A5",
        "marker": "\u25AE",
        "mcomma": "\u2A29",
        "mcy": "\u043C",
        "Mcy": "\u041C",
        "mdash": "\u2014",
        "mDDot": "\u223A",
        "measuredangle": "\u2221",
        "MediumSpace": "\u205F",
        "Mellintrf": "\u2133",
        "mfr": "\uD835\uDD2A",
        "Mfr": "\uD835\uDD10",
        "mho": "\u2127",
        "micro": "\xb5",
        "mid": "\u2223",
        "midast": "*",
        "midcir": "\u2AF0",
        "middot": "\xb7",
        "minus": "\u2212",
        "minusb": "\u229F",
        "minusd": "\u2238",
        "minusdu": "\u2A2A",
        "MinusPlus": "\u2213",
        "mlcp": "\u2ADB",
        "mldr": "\u2026",
        "mnplus": "\u2213",
        "models": "\u22A7",
        "mopf": "\uD835\uDD5E",
        "Mopf": "\uD835\uDD44",
        "mp": "\u2213",
        "mscr": "\uD835\uDCC2",
        "Mscr": "\u2133",
        "mstpos": "\u223E",
        "mu": "\u03BC",
        "Mu": "\u039C",
        "multimap": "\u22B8",
        "mumap": "\u22B8",
        "nabla": "\u2207",
        "nacute": "\u0144",
        "Nacute": "\u0143",
        "nang": "\u2220\u20D2",
        "nap": "\u2249",
        "napE": "\u2A70\u0338",
        "napid": "\u224B\u0338",
        "napos": "\u0149",
        "napprox": "\u2249",
        "natur": "\u266E",
        "natural": "\u266E",
        "naturals": "\u2115",
        "nbsp": "\xa0",
        "nbump": "\u224E\u0338",
        "nbumpe": "\u224F\u0338",
        "ncap": "\u2A43",
        "ncaron": "\u0148",
        "Ncaron": "\u0147",
        "ncedil": "\u0146",
        "Ncedil": "\u0145",
        "ncong": "\u2247",
        "ncongdot": "\u2A6D\u0338",
        "ncup": "\u2A42",
        "ncy": "\u043D",
        "Ncy": "\u041D",
        "ndash": "\u2013",
        "ne": "\u2260",
        "nearhk": "\u2924",
        "nearr": "\u2197",
        "neArr": "\u21D7",
        "nearrow": "\u2197",
        "nedot": "\u2250\u0338",
        "NegativeMediumSpace": "\u200B",
        "NegativeThickSpace": "\u200B",
        "NegativeThinSpace": "\u200B",
        "NegativeVeryThinSpace": "\u200B",
        "nequiv": "\u2262",
        "nesear": "\u2928",
        "nesim": "\u2242\u0338",
        "NestedGreaterGreater": "\u226B",
        "NestedLessLess": "\u226A",
        "NewLine": "\n",
        "nexist": "\u2204",
        "nexists": "\u2204",
        "nfr": "\uD835\uDD2B",
        "Nfr": "\uD835\uDD11",
        "nge": "\u2271",
        "ngE": "\u2267\u0338",
        "ngeq": "\u2271",
        "ngeqq": "\u2267\u0338",
        "ngeqslant": "\u2A7E\u0338",
        "nges": "\u2A7E\u0338",
        "nGg": "\u22D9\u0338",
        "ngsim": "\u2275",
        "ngt": "\u226F",
        "nGt": "\u226B\u20D2",
        "ngtr": "\u226F",
        "nGtv": "\u226B\u0338",
        "nharr": "\u21AE",
        "nhArr": "\u21CE",
        "nhpar": "\u2AF2",
        "ni": "\u220B",
        "nis": "\u22FC",
        "nisd": "\u22FA",
        "niv": "\u220B",
        "njcy": "\u045A",
        "NJcy": "\u040A",
        "nlarr": "\u219A",
        "nlArr": "\u21CD",
        "nldr": "\u2025",
        "nle": "\u2270",
        "nlE": "\u2266\u0338",
        "nleftarrow": "\u219A",
        "nLeftarrow": "\u21CD",
        "nleftrightarrow": "\u21AE",
        "nLeftrightarrow": "\u21CE",
        "nleq": "\u2270",
        "nleqq": "\u2266\u0338",
        "nleqslant": "\u2A7D\u0338",
        "nles": "\u2A7D\u0338",
        "nless": "\u226E",
        "nLl": "\u22D8\u0338",
        "nlsim": "\u2274",
        "nlt": "\u226E",
        "nLt": "\u226A\u20D2",
        "nltri": "\u22EA",
        "nltrie": "\u22EC",
        "nLtv": "\u226A\u0338",
        "nmid": "\u2224",
        "NoBreak": "\u2060",
        "NonBreakingSpace": "\xa0",
        "nopf": "\uD835\uDD5F",
        "Nopf": "\u2115",
        "not": "\xac",
        "Not": "\u2AEC",
        "NotCongruent": "\u2262",
        "NotCupCap": "\u226D",
        "NotDoubleVerticalBar": "\u2226",
        "NotElement": "\u2209",
        "NotEqual": "\u2260",
        "NotEqualTilde": "\u2242\u0338",
        "NotExists": "\u2204",
        "NotGreater": "\u226F",
        "NotGreaterEqual": "\u2271",
        "NotGreaterFullEqual": "\u2267\u0338",
        "NotGreaterGreater": "\u226B\u0338",
        "NotGreaterLess": "\u2279",
        "NotGreaterSlantEqual": "\u2A7E\u0338",
        "NotGreaterTilde": "\u2275",
        "NotHumpDownHump": "\u224E\u0338",
        "NotHumpEqual": "\u224F\u0338",
        "notin": "\u2209",
        "notindot": "\u22F5\u0338",
        "notinE": "\u22F9\u0338",
        "notinva": "\u2209",
        "notinvb": "\u22F7",
        "notinvc": "\u22F6",
        "NotLeftTriangle": "\u22EA",
        "NotLeftTriangleBar": "\u29CF\u0338",
        "NotLeftTriangleEqual": "\u22EC",
        "NotLess": "\u226E",
        "NotLessEqual": "\u2270",
        "NotLessGreater": "\u2278",
        "NotLessLess": "\u226A\u0338",
        "NotLessSlantEqual": "\u2A7D\u0338",
        "NotLessTilde": "\u2274",
        "NotNestedGreaterGreater": "\u2AA2\u0338",
        "NotNestedLessLess": "\u2AA1\u0338",
        "notni": "\u220C",
        "notniva": "\u220C",
        "notnivb": "\u22FE",
        "notnivc": "\u22FD",
        "NotPrecedes": "\u2280",
        "NotPrecedesEqual": "\u2AAF\u0338",
        "NotPrecedesSlantEqual": "\u22E0",
        "NotReverseElement": "\u220C",
        "NotRightTriangle": "\u22EB",
        "NotRightTriangleBar": "\u29D0\u0338",
        "NotRightTriangleEqual": "\u22ED",
        "NotSquareSubset": "\u228F\u0338",
        "NotSquareSubsetEqual": "\u22E2",
        "NotSquareSuperset": "\u2290\u0338",
        "NotSquareSupersetEqual": "\u22E3",
        "NotSubset": "\u2282\u20D2",
        "NotSubsetEqual": "\u2288",
        "NotSucceeds": "\u2281",
        "NotSucceedsEqual": "\u2AB0\u0338",
        "NotSucceedsSlantEqual": "\u22E1",
        "NotSucceedsTilde": "\u227F\u0338",
        "NotSuperset": "\u2283\u20D2",
        "NotSupersetEqual": "\u2289",
        "NotTilde": "\u2241",
        "NotTildeEqual": "\u2244",
        "NotTildeFullEqual": "\u2247",
        "NotTildeTilde": "\u2249",
        "NotVerticalBar": "\u2224",
        "npar": "\u2226",
        "nparallel": "\u2226",
        "nparsl": "\u2AFD\u20E5",
        "npart": "\u2202\u0338",
        "npolint": "\u2A14",
        "npr": "\u2280",
        "nprcue": "\u22E0",
        "npre": "\u2AAF\u0338",
        "nprec": "\u2280",
        "npreceq": "\u2AAF\u0338",
        "nrarr": "\u219B",
        "nrArr": "\u21CF",
        "nrarrc": "\u2933\u0338",
        "nrarrw": "\u219D\u0338",
        "nrightarrow": "\u219B",
        "nRightarrow": "\u21CF",
        "nrtri": "\u22EB",
        "nrtrie": "\u22ED",
        "nsc": "\u2281",
        "nsccue": "\u22E1",
        "nsce": "\u2AB0\u0338",
        "nscr": "\uD835\uDCC3",
        "Nscr": "\uD835\uDCA9",
        "nshortmid": "\u2224",
        "nshortparallel": "\u2226",
        "nsim": "\u2241",
        "nsime": "\u2244",
        "nsimeq": "\u2244",
        "nsmid": "\u2224",
        "nspar": "\u2226",
        "nsqsube": "\u22E2",
        "nsqsupe": "\u22E3",
        "nsub": "\u2284",
        "nsube": "\u2288",
        "nsubE": "\u2AC5\u0338",
        "nsubset": "\u2282\u20D2",
        "nsubseteq": "\u2288",
        "nsubseteqq": "\u2AC5\u0338",
        "nsucc": "\u2281",
        "nsucceq": "\u2AB0\u0338",
        "nsup": "\u2285",
        "nsupe": "\u2289",
        "nsupE": "\u2AC6\u0338",
        "nsupset": "\u2283\u20D2",
        "nsupseteq": "\u2289",
        "nsupseteqq": "\u2AC6\u0338",
        "ntgl": "\u2279",
        "ntilde": "\xf1",
        "Ntilde": "\xd1",
        "ntlg": "\u2278",
        "ntriangleleft": "\u22EA",
        "ntrianglelefteq": "\u22EC",
        "ntriangleright": "\u22EB",
        "ntrianglerighteq": "\u22ED",
        "nu": "\u03BD",
        "Nu": "\u039D",
        "num": "#",
        "numero": "\u2116",
        "numsp": "\u2007",
        "nvap": "\u224D\u20D2",
        "nvdash": "\u22AC",
        "nvDash": "\u22AD",
        "nVdash": "\u22AE",
        "nVDash": "\u22AF",
        "nvge": "\u2265\u20D2",
        "nvgt": ">\u20D2",
        "nvHarr": "\u2904",
        "nvinfin": "\u29DE",
        "nvlArr": "\u2902",
        "nvle": "\u2264\u20D2",
        "nvlt": "<\u20D2",
        "nvltrie": "\u22B4\u20D2",
        "nvrArr": "\u2903",
        "nvrtrie": "\u22B5\u20D2",
        "nvsim": "\u223C\u20D2",
        "nwarhk": "\u2923",
        "nwarr": "\u2196",
        "nwArr": "\u21D6",
        "nwarrow": "\u2196",
        "nwnear": "\u2927",
        "oacute": "\xf3",
        "Oacute": "\xd3",
        "oast": "\u229B",
        "ocir": "\u229A",
        "ocirc": "\xf4",
        "Ocirc": "\xd4",
        "ocy": "\u043E",
        "Ocy": "\u041E",
        "odash": "\u229D",
        "odblac": "\u0151",
        "Odblac": "\u0150",
        "odiv": "\u2A38",
        "odot": "\u2299",
        "odsold": "\u29BC",
        "oelig": "\u0153",
        "OElig": "\u0152",
        "ofcir": "\u29BF",
        "ofr": "\uD835\uDD2C",
        "Ofr": "\uD835\uDD12",
        "ogon": "\u02DB",
        "ograve": "\xf2",
        "Ograve": "\xd2",
        "ogt": "\u29C1",
        "ohbar": "\u29B5",
        "ohm": "\u03A9",
        "oint": "\u222E",
        "olarr": "\u21BA",
        "olcir": "\u29BE",
        "olcross": "\u29BB",
        "oline": "\u203E",
        "olt": "\u29C0",
        "omacr": "\u014D",
        "Omacr": "\u014C",
        "omega": "\u03C9",
        "Omega": "\u03A9",
        "omicron": "\u03BF",
        "Omicron": "\u039F",
        "omid": "\u29B6",
        "ominus": "\u2296",
        "oopf": "\uD835\uDD60",
        "Oopf": "\uD835\uDD46",
        "opar": "\u29B7",
        "OpenCurlyDoubleQuote": "\u201C",
        "OpenCurlyQuote": "\u2018",
        "operp": "\u29B9",
        "oplus": "\u2295",
        "or": "\u2228",
        "Or": "\u2A54",
        "orarr": "\u21BB",
        "ord": "\u2A5D",
        "order": "\u2134",
        "orderof": "\u2134",
        "ordf": "\xaa",
        "ordm": "\xba",
        "origof": "\u22B6",
        "oror": "\u2A56",
        "orslope": "\u2A57",
        "orv": "\u2A5B",
        "oS": "\u24C8",
        "oscr": "\u2134",
        "Oscr": "\uD835\uDCAA",
        "oslash": "\xf8",
        "Oslash": "\xd8",
        "osol": "\u2298",
        "otilde": "\xf5",
        "Otilde": "\xd5",
        "otimes": "\u2297",
        "Otimes": "\u2A37",
        "otimesas": "\u2A36",
        "ouml": "\xf6",
        "Ouml": "\xd6",
        "ovbar": "\u233D",
        "OverBar": "\u203E",
        "OverBrace": "\u23DE",
        "OverBracket": "\u23B4",
        "OverParenthesis": "\u23DC",
        "par": "\u2225",
        "para": "\xb6",
        "parallel": "\u2225",
        "parsim": "\u2AF3",
        "parsl": "\u2AFD",
        "part": "\u2202",
        "PartialD": "\u2202",
        "pcy": "\u043F",
        "Pcy": "\u041F",
        "percnt": "%",
        "period": ".",
        "permil": "\u2030",
        "perp": "\u22A5",
        "pertenk": "\u2031",
        "pfr": "\uD835\uDD2D",
        "Pfr": "\uD835\uDD13",
        "phi": "\u03C6",
        "Phi": "\u03A6",
        "phiv": "\u03D5",
        "phmmat": "\u2133",
        "phone": "\u260E",
        "pi": "\u03C0",
        "Pi": "\u03A0",
        "pitchfork": "\u22D4",
        "piv": "\u03D6",
        "planck": "\u210F",
        "planckh": "\u210E",
        "plankv": "\u210F",
        "plus": "+",
        "plusacir": "\u2A23",
        "plusb": "\u229E",
        "pluscir": "\u2A22",
        "plusdo": "\u2214",
        "plusdu": "\u2A25",
        "pluse": "\u2A72",
        "PlusMinus": "\xb1",
        "plusmn": "\xb1",
        "plussim": "\u2A26",
        "plustwo": "\u2A27",
        "pm": "\xb1",
        "Poincareplane": "\u210C",
        "pointint": "\u2A15",
        "popf": "\uD835\uDD61",
        "Popf": "\u2119",
        "pound": "\xa3",
        "pr": "\u227A",
        "Pr": "\u2ABB",
        "prap": "\u2AB7",
        "prcue": "\u227C",
        "pre": "\u2AAF",
        "prE": "\u2AB3",
        "prec": "\u227A",
        "precapprox": "\u2AB7",
        "preccurlyeq": "\u227C",
        "Precedes": "\u227A",
        "PrecedesEqual": "\u2AAF",
        "PrecedesSlantEqual": "\u227C",
        "PrecedesTilde": "\u227E",
        "preceq": "\u2AAF",
        "precnapprox": "\u2AB9",
        "precneqq": "\u2AB5",
        "precnsim": "\u22E8",
        "precsim": "\u227E",
        "prime": "\u2032",
        "Prime": "\u2033",
        "primes": "\u2119",
        "prnap": "\u2AB9",
        "prnE": "\u2AB5",
        "prnsim": "\u22E8",
        "prod": "\u220F",
        "Product": "\u220F",
        "profalar": "\u232E",
        "profline": "\u2312",
        "profsurf": "\u2313",
        "prop": "\u221D",
        "Proportion": "\u2237",
        "Proportional": "\u221D",
        "propto": "\u221D",
        "prsim": "\u227E",
        "prurel": "\u22B0",
        "pscr": "\uD835\uDCC5",
        "Pscr": "\uD835\uDCAB",
        "psi": "\u03C8",
        "Psi": "\u03A8",
        "puncsp": "\u2008",
        "qfr": "\uD835\uDD2E",
        "Qfr": "\uD835\uDD14",
        "qint": "\u2A0C",
        "qopf": "\uD835\uDD62",
        "Qopf": "\u211A",
        "qprime": "\u2057",
        "qscr": "\uD835\uDCC6",
        "Qscr": "\uD835\uDCAC",
        "quaternions": "\u210D",
        "quatint": "\u2A16",
        "quest": "?",
        "questeq": "\u225F",
        "quot": '"',
        "QUOT": '"',
        "rAarr": "\u21DB",
        "race": "\u223D\u0331",
        "racute": "\u0155",
        "Racute": "\u0154",
        "radic": "\u221A",
        "raemptyv": "\u29B3",
        "rang": "\u27E9",
        "Rang": "\u27EB",
        "rangd": "\u2992",
        "range": "\u29A5",
        "rangle": "\u27E9",
        "raquo": "\xbb",
        "rarr": "\u2192",
        "rArr": "\u21D2",
        "Rarr": "\u21A0",
        "rarrap": "\u2975",
        "rarrb": "\u21E5",
        "rarrbfs": "\u2920",
        "rarrc": "\u2933",
        "rarrfs": "\u291E",
        "rarrhk": "\u21AA",
        "rarrlp": "\u21AC",
        "rarrpl": "\u2945",
        "rarrsim": "\u2974",
        "rarrtl": "\u21A3",
        "Rarrtl": "\u2916",
        "rarrw": "\u219D",
        "ratail": "\u291A",
        "rAtail": "\u291C",
        "ratio": "\u2236",
        "rationals": "\u211A",
        "rbarr": "\u290D",
        "rBarr": "\u290F",
        "RBarr": "\u2910",
        "rbbrk": "\u2773",
        "rbrace": "}",
        "rbrack": "]",
        "rbrke": "\u298C",
        "rbrksld": "\u298E",
        "rbrkslu": "\u2990",
        "rcaron": "\u0159",
        "Rcaron": "\u0158",
        "rcedil": "\u0157",
        "Rcedil": "\u0156",
        "rceil": "\u2309",
        "rcub": "}",
        "rcy": "\u0440",
        "Rcy": "\u0420",
        "rdca": "\u2937",
        "rdldhar": "\u2969",
        "rdquo": "\u201D",
        "rdquor": "\u201D",
        "rdsh": "\u21B3",
        "Re": "\u211C",
        "real": "\u211C",
        "realine": "\u211B",
        "realpart": "\u211C",
        "reals": "\u211D",
        "rect": "\u25AD",
        "reg": "\xae",
        "REG": "\xae",
        "ReverseElement": "\u220B",
        "ReverseEquilibrium": "\u21CB",
        "ReverseUpEquilibrium": "\u296F",
        "rfisht": "\u297D",
        "rfloor": "\u230B",
        "rfr": "\uD835\uDD2F",
        "Rfr": "\u211C",
        "rHar": "\u2964",
        "rhard": "\u21C1",
        "rharu": "\u21C0",
        "rharul": "\u296C",
        "rho": "\u03C1",
        "Rho": "\u03A1",
        "rhov": "\u03F1",
        "RightAngleBracket": "\u27E9",
        "rightarrow": "\u2192",
        "Rightarrow": "\u21D2",
        "RightArrow": "\u2192",
        "RightArrowBar": "\u21E5",
        "RightArrowLeftArrow": "\u21C4",
        "rightarrowtail": "\u21A3",
        "RightCeiling": "\u2309",
        "RightDoubleBracket": "\u27E7",
        "RightDownTeeVector": "\u295D",
        "RightDownVector": "\u21C2",
        "RightDownVectorBar": "\u2955",
        "RightFloor": "\u230B",
        "rightharpoondown": "\u21C1",
        "rightharpoonup": "\u21C0",
        "rightleftarrows": "\u21C4",
        "rightleftharpoons": "\u21CC",
        "rightrightarrows": "\u21C9",
        "rightsquigarrow": "\u219D",
        "RightTee": "\u22A2",
        "RightTeeArrow": "\u21A6",
        "RightTeeVector": "\u295B",
        "rightthreetimes": "\u22CC",
        "RightTriangle": "\u22B3",
        "RightTriangleBar": "\u29D0",
        "RightTriangleEqual": "\u22B5",
        "RightUpDownVector": "\u294F",
        "RightUpTeeVector": "\u295C",
        "RightUpVector": "\u21BE",
        "RightUpVectorBar": "\u2954",
        "RightVector": "\u21C0",
        "RightVectorBar": "\u2953",
        "ring": "\u02DA",
        "risingdotseq": "\u2253",
        "rlarr": "\u21C4",
        "rlhar": "\u21CC",
        "rlm": "\u200F",
        "rmoust": "\u23B1",
        "rmoustache": "\u23B1",
        "rnmid": "\u2AEE",
        "roang": "\u27ED",
        "roarr": "\u21FE",
        "robrk": "\u27E7",
        "ropar": "\u2986",
        "ropf": "\uD835\uDD63",
        "Ropf": "\u211D",
        "roplus": "\u2A2E",
        "rotimes": "\u2A35",
        "RoundImplies": "\u2970",
        "rpar": ")",
        "rpargt": "\u2994",
        "rppolint": "\u2A12",
        "rrarr": "\u21C9",
        "Rrightarrow": "\u21DB",
        "rsaquo": "\u203A",
        "rscr": "\uD835\uDCC7",
        "Rscr": "\u211B",
        "rsh": "\u21B1",
        "Rsh": "\u21B1",
        "rsqb": "]",
        "rsquo": "\u2019",
        "rsquor": "\u2019",
        "rthree": "\u22CC",
        "rtimes": "\u22CA",
        "rtri": "\u25B9",
        "rtrie": "\u22B5",
        "rtrif": "\u25B8",
        "rtriltri": "\u29CE",
        "RuleDelayed": "\u29F4",
        "ruluhar": "\u2968",
        "rx": "\u211E",
        "sacute": "\u015B",
        "Sacute": "\u015A",
        "sbquo": "\u201A",
        "sc": "\u227B",
        "Sc": "\u2ABC",
        "scap": "\u2AB8",
        "scaron": "\u0161",
        "Scaron": "\u0160",
        "sccue": "\u227D",
        "sce": "\u2AB0",
        "scE": "\u2AB4",
        "scedil": "\u015F",
        "Scedil": "\u015E",
        "scirc": "\u015D",
        "Scirc": "\u015C",
        "scnap": "\u2ABA",
        "scnE": "\u2AB6",
        "scnsim": "\u22E9",
        "scpolint": "\u2A13",
        "scsim": "\u227F",
        "scy": "\u0441",
        "Scy": "\u0421",
        "sdot": "\u22C5",
        "sdotb": "\u22A1",
        "sdote": "\u2A66",
        "searhk": "\u2925",
        "searr": "\u2198",
        "seArr": "\u21D8",
        "searrow": "\u2198",
        "sect": "\xa7",
        "semi": ";",
        "seswar": "\u2929",
        "setminus": "\u2216",
        "setmn": "\u2216",
        "sext": "\u2736",
        "sfr": "\uD835\uDD30",
        "Sfr": "\uD835\uDD16",
        "sfrown": "\u2322",
        "sharp": "\u266F",
        "shchcy": "\u0449",
        "SHCHcy": "\u0429",
        "shcy": "\u0448",
        "SHcy": "\u0428",
        "ShortDownArrow": "\u2193",
        "ShortLeftArrow": "\u2190",
        "shortmid": "\u2223",
        "shortparallel": "\u2225",
        "ShortRightArrow": "\u2192",
        "ShortUpArrow": "\u2191",
        "shy": "\xad",
        "sigma": "\u03C3",
        "Sigma": "\u03A3",
        "sigmaf": "\u03C2",
        "sigmav": "\u03C2",
        "sim": "\u223C",
        "simdot": "\u2A6A",
        "sime": "\u2243",
        "simeq": "\u2243",
        "simg": "\u2A9E",
        "simgE": "\u2AA0",
        "siml": "\u2A9D",
        "simlE": "\u2A9F",
        "simne": "\u2246",
        "simplus": "\u2A24",
        "simrarr": "\u2972",
        "slarr": "\u2190",
        "SmallCircle": "\u2218",
        "smallsetminus": "\u2216",
        "smashp": "\u2A33",
        "smeparsl": "\u29E4",
        "smid": "\u2223",
        "smile": "\u2323",
        "smt": "\u2AAA",
        "smte": "\u2AAC",
        "smtes": "\u2AAC\uFE00",
        "softcy": "\u044C",
        "SOFTcy": "\u042C",
        "sol": "/",
        "solb": "\u29C4",
        "solbar": "\u233F",
        "sopf": "\uD835\uDD64",
        "Sopf": "\uD835\uDD4A",
        "spades": "\u2660",
        "spadesuit": "\u2660",
        "spar": "\u2225",
        "sqcap": "\u2293",
        "sqcaps": "\u2293\uFE00",
        "sqcup": "\u2294",
        "sqcups": "\u2294\uFE00",
        "Sqrt": "\u221A",
        "sqsub": "\u228F",
        "sqsube": "\u2291",
        "sqsubset": "\u228F",
        "sqsubseteq": "\u2291",
        "sqsup": "\u2290",
        "sqsupe": "\u2292",
        "sqsupset": "\u2290",
        "sqsupseteq": "\u2292",
        "squ": "\u25A1",
        "square": "\u25A1",
        "Square": "\u25A1",
        "SquareIntersection": "\u2293",
        "SquareSubset": "\u228F",
        "SquareSubsetEqual": "\u2291",
        "SquareSuperset": "\u2290",
        "SquareSupersetEqual": "\u2292",
        "SquareUnion": "\u2294",
        "squarf": "\u25AA",
        "squf": "\u25AA",
        "srarr": "\u2192",
        "sscr": "\uD835\uDCC8",
        "Sscr": "\uD835\uDCAE",
        "ssetmn": "\u2216",
        "ssmile": "\u2323",
        "sstarf": "\u22C6",
        "star": "\u2606",
        "Star": "\u22C6",
        "starf": "\u2605",
        "straightepsilon": "\u03F5",
        "straightphi": "\u03D5",
        "strns": "\xaf",
        "sub": "\u2282",
        "Sub": "\u22D0",
        "subdot": "\u2ABD",
        "sube": "\u2286",
        "subE": "\u2AC5",
        "subedot": "\u2AC3",
        "submult": "\u2AC1",
        "subne": "\u228A",
        "subnE": "\u2ACB",
        "subplus": "\u2ABF",
        "subrarr": "\u2979",
        "subset": "\u2282",
        "Subset": "\u22D0",
        "subseteq": "\u2286",
        "subseteqq": "\u2AC5",
        "SubsetEqual": "\u2286",
        "subsetneq": "\u228A",
        "subsetneqq": "\u2ACB",
        "subsim": "\u2AC7",
        "subsub": "\u2AD5",
        "subsup": "\u2AD3",
        "succ": "\u227B",
        "succapprox": "\u2AB8",
        "succcurlyeq": "\u227D",
        "Succeeds": "\u227B",
        "SucceedsEqual": "\u2AB0",
        "SucceedsSlantEqual": "\u227D",
        "SucceedsTilde": "\u227F",
        "succeq": "\u2AB0",
        "succnapprox": "\u2ABA",
        "succneqq": "\u2AB6",
        "succnsim": "\u22E9",
        "succsim": "\u227F",
        "SuchThat": "\u220B",
        "sum": "\u2211",
        "Sum": "\u2211",
        "sung": "\u266A",
        "sup": "\u2283",
        "Sup": "\u22D1",
        "sup1": "\xb9",
        "sup2": "\xb2",
        "sup3": "\xb3",
        "supdot": "\u2ABE",
        "supdsub": "\u2AD8",
        "supe": "\u2287",
        "supE": "\u2AC6",
        "supedot": "\u2AC4",
        "Superset": "\u2283",
        "SupersetEqual": "\u2287",
        "suphsol": "\u27C9",
        "suphsub": "\u2AD7",
        "suplarr": "\u297B",
        "supmult": "\u2AC2",
        "supne": "\u228B",
        "supnE": "\u2ACC",
        "supplus": "\u2AC0",
        "supset": "\u2283",
        "Supset": "\u22D1",
        "supseteq": "\u2287",
        "supseteqq": "\u2AC6",
        "supsetneq": "\u228B",
        "supsetneqq": "\u2ACC",
        "supsim": "\u2AC8",
        "supsub": "\u2AD4",
        "supsup": "\u2AD6",
        "swarhk": "\u2926",
        "swarr": "\u2199",
        "swArr": "\u21D9",
        "swarrow": "\u2199",
        "swnwar": "\u292A",
        "szlig": "\xdf",
        "Tab": "	",
        "target": "\u2316",
        "tau": "\u03C4",
        "Tau": "\u03A4",
        "tbrk": "\u23B4",
        "tcaron": "\u0165",
        "Tcaron": "\u0164",
        "tcedil": "\u0163",
        "Tcedil": "\u0162",
        "tcy": "\u0442",
        "Tcy": "\u0422",
        "tdot": "\u20DB",
        "telrec": "\u2315",
        "tfr": "\uD835\uDD31",
        "Tfr": "\uD835\uDD17",
        "there4": "\u2234",
        "therefore": "\u2234",
        "Therefore": "\u2234",
        "theta": "\u03B8",
        "Theta": "\u0398",
        "thetasym": "\u03D1",
        "thetav": "\u03D1",
        "thickapprox": "\u2248",
        "thicksim": "\u223C",
        "ThickSpace": "\u205F\u200A",
        "thinsp": "\u2009",
        "ThinSpace": "\u2009",
        "thkap": "\u2248",
        "thksim": "\u223C",
        "thorn": "\xfe",
        "THORN": "\xde",
        "tilde": "\u02DC",
        "Tilde": "\u223C",
        "TildeEqual": "\u2243",
        "TildeFullEqual": "\u2245",
        "TildeTilde": "\u2248",
        "times": "\xd7",
        "timesb": "\u22A0",
        "timesbar": "\u2A31",
        "timesd": "\u2A30",
        "tint": "\u222D",
        "toea": "\u2928",
        "top": "\u22A4",
        "topbot": "\u2336",
        "topcir": "\u2AF1",
        "topf": "\uD835\uDD65",
        "Topf": "\uD835\uDD4B",
        "topfork": "\u2ADA",
        "tosa": "\u2929",
        "tprime": "\u2034",
        "trade": "\u2122",
        "TRADE": "\u2122",
        "triangle": "\u25B5",
        "triangledown": "\u25BF",
        "triangleleft": "\u25C3",
        "trianglelefteq": "\u22B4",
        "triangleq": "\u225C",
        "triangleright": "\u25B9",
        "trianglerighteq": "\u22B5",
        "tridot": "\u25EC",
        "trie": "\u225C",
        "triminus": "\u2A3A",
        "TripleDot": "\u20DB",
        "triplus": "\u2A39",
        "trisb": "\u29CD",
        "tritime": "\u2A3B",
        "trpezium": "\u23E2",
        "tscr": "\uD835\uDCC9",
        "Tscr": "\uD835\uDCAF",
        "tscy": "\u0446",
        "TScy": "\u0426",
        "tshcy": "\u045B",
        "TSHcy": "\u040B",
        "tstrok": "\u0167",
        "Tstrok": "\u0166",
        "twixt": "\u226C",
        "twoheadleftarrow": "\u219E",
        "twoheadrightarrow": "\u21A0",
        "uacute": "\xfa",
        "Uacute": "\xda",
        "uarr": "\u2191",
        "uArr": "\u21D1",
        "Uarr": "\u219F",
        "Uarrocir": "\u2949",
        "ubrcy": "\u045E",
        "Ubrcy": "\u040E",
        "ubreve": "\u016D",
        "Ubreve": "\u016C",
        "ucirc": "\xfb",
        "Ucirc": "\xdb",
        "ucy": "\u0443",
        "Ucy": "\u0423",
        "udarr": "\u21C5",
        "udblac": "\u0171",
        "Udblac": "\u0170",
        "udhar": "\u296E",
        "ufisht": "\u297E",
        "ufr": "\uD835\uDD32",
        "Ufr": "\uD835\uDD18",
        "ugrave": "\xf9",
        "Ugrave": "\xd9",
        "uHar": "\u2963",
        "uharl": "\u21BF",
        "uharr": "\u21BE",
        "uhblk": "\u2580",
        "ulcorn": "\u231C",
        "ulcorner": "\u231C",
        "ulcrop": "\u230F",
        "ultri": "\u25F8",
        "umacr": "\u016B",
        "Umacr": "\u016A",
        "uml": "\xa8",
        "UnderBar": "_",
        "UnderBrace": "\u23DF",
        "UnderBracket": "\u23B5",
        "UnderParenthesis": "\u23DD",
        "Union": "\u22C3",
        "UnionPlus": "\u228E",
        "uogon": "\u0173",
        "Uogon": "\u0172",
        "uopf": "\uD835\uDD66",
        "Uopf": "\uD835\uDD4C",
        "uparrow": "\u2191",
        "Uparrow": "\u21D1",
        "UpArrow": "\u2191",
        "UpArrowBar": "\u2912",
        "UpArrowDownArrow": "\u21C5",
        "updownarrow": "\u2195",
        "Updownarrow": "\u21D5",
        "UpDownArrow": "\u2195",
        "UpEquilibrium": "\u296E",
        "upharpoonleft": "\u21BF",
        "upharpoonright": "\u21BE",
        "uplus": "\u228E",
        "UpperLeftArrow": "\u2196",
        "UpperRightArrow": "\u2197",
        "upsi": "\u03C5",
        "Upsi": "\u03D2",
        "upsih": "\u03D2",
        "upsilon": "\u03C5",
        "Upsilon": "\u03A5",
        "UpTee": "\u22A5",
        "UpTeeArrow": "\u21A5",
        "upuparrows": "\u21C8",
        "urcorn": "\u231D",
        "urcorner": "\u231D",
        "urcrop": "\u230E",
        "uring": "\u016F",
        "Uring": "\u016E",
        "urtri": "\u25F9",
        "uscr": "\uD835\uDCCA",
        "Uscr": "\uD835\uDCB0",
        "utdot": "\u22F0",
        "utilde": "\u0169",
        "Utilde": "\u0168",
        "utri": "\u25B5",
        "utrif": "\u25B4",
        "uuarr": "\u21C8",
        "uuml": "\xfc",
        "Uuml": "\xdc",
        "uwangle": "\u29A7",
        "vangrt": "\u299C",
        "varepsilon": "\u03F5",
        "varkappa": "\u03F0",
        "varnothing": "\u2205",
        "varphi": "\u03D5",
        "varpi": "\u03D6",
        "varpropto": "\u221D",
        "varr": "\u2195",
        "vArr": "\u21D5",
        "varrho": "\u03F1",
        "varsigma": "\u03C2",
        "varsubsetneq": "\u228A\uFE00",
        "varsubsetneqq": "\u2ACB\uFE00",
        "varsupsetneq": "\u228B\uFE00",
        "varsupsetneqq": "\u2ACC\uFE00",
        "vartheta": "\u03D1",
        "vartriangleleft": "\u22B2",
        "vartriangleright": "\u22B3",
        "vBar": "\u2AE8",
        "Vbar": "\u2AEB",
        "vBarv": "\u2AE9",
        "vcy": "\u0432",
        "Vcy": "\u0412",
        "vdash": "\u22A2",
        "vDash": "\u22A8",
        "Vdash": "\u22A9",
        "VDash": "\u22AB",
        "Vdashl": "\u2AE6",
        "vee": "\u2228",
        "Vee": "\u22C1",
        "veebar": "\u22BB",
        "veeeq": "\u225A",
        "vellip": "\u22EE",
        "verbar": "|",
        "Verbar": "\u2016",
        "vert": "|",
        "Vert": "\u2016",
        "VerticalBar": "\u2223",
        "VerticalLine": "|",
        "VerticalSeparator": "\u2758",
        "VerticalTilde": "\u2240",
        "VeryThinSpace": "\u200A",
        "vfr": "\uD835\uDD33",
        "Vfr": "\uD835\uDD19",
        "vltri": "\u22B2",
        "vnsub": "\u2282\u20D2",
        "vnsup": "\u2283\u20D2",
        "vopf": "\uD835\uDD67",
        "Vopf": "\uD835\uDD4D",
        "vprop": "\u221D",
        "vrtri": "\u22B3",
        "vscr": "\uD835\uDCCB",
        "Vscr": "\uD835\uDCB1",
        "vsubne": "\u228A\uFE00",
        "vsubnE": "\u2ACB\uFE00",
        "vsupne": "\u228B\uFE00",
        "vsupnE": "\u2ACC\uFE00",
        "Vvdash": "\u22AA",
        "vzigzag": "\u299A",
        "wcirc": "\u0175",
        "Wcirc": "\u0174",
        "wedbar": "\u2A5F",
        "wedge": "\u2227",
        "Wedge": "\u22C0",
        "wedgeq": "\u2259",
        "weierp": "\u2118",
        "wfr": "\uD835\uDD34",
        "Wfr": "\uD835\uDD1A",
        "wopf": "\uD835\uDD68",
        "Wopf": "\uD835\uDD4E",
        "wp": "\u2118",
        "wr": "\u2240",
        "wreath": "\u2240",
        "wscr": "\uD835\uDCCC",
        "Wscr": "\uD835\uDCB2",
        "xcap": "\u22C2",
        "xcirc": "\u25EF",
        "xcup": "\u22C3",
        "xdtri": "\u25BD",
        "xfr": "\uD835\uDD35",
        "Xfr": "\uD835\uDD1B",
        "xharr": "\u27F7",
        "xhArr": "\u27FA",
        "xi": "\u03BE",
        "Xi": "\u039E",
        "xlarr": "\u27F5",
        "xlArr": "\u27F8",
        "xmap": "\u27FC",
        "xnis": "\u22FB",
        "xodot": "\u2A00",
        "xopf": "\uD835\uDD69",
        "Xopf": "\uD835\uDD4F",
        "xoplus": "\u2A01",
        "xotime": "\u2A02",
        "xrarr": "\u27F6",
        "xrArr": "\u27F9",
        "xscr": "\uD835\uDCCD",
        "Xscr": "\uD835\uDCB3",
        "xsqcup": "\u2A06",
        "xuplus": "\u2A04",
        "xutri": "\u25B3",
        "xvee": "\u22C1",
        "xwedge": "\u22C0",
        "yacute": "\xfd",
        "Yacute": "\xdd",
        "yacy": "\u044F",
        "YAcy": "\u042F",
        "ycirc": "\u0177",
        "Ycirc": "\u0176",
        "ycy": "\u044B",
        "Ycy": "\u042B",
        "yen": "\xa5",
        "yfr": "\uD835\uDD36",
        "Yfr": "\uD835\uDD1C",
        "yicy": "\u0457",
        "YIcy": "\u0407",
        "yopf": "\uD835\uDD6A",
        "Yopf": "\uD835\uDD50",
        "yscr": "\uD835\uDCCE",
        "Yscr": "\uD835\uDCB4",
        "yucy": "\u044E",
        "YUcy": "\u042E",
        "yuml": "\xff",
        "Yuml": "\u0178",
        "zacute": "\u017A",
        "Zacute": "\u0179",
        "zcaron": "\u017E",
        "Zcaron": "\u017D",
        "zcy": "\u0437",
        "Zcy": "\u0417",
        "zdot": "\u017C",
        "Zdot": "\u017B",
        "zeetrf": "\u2128",
        "ZeroWidthSpace": "\u200B",
        "zeta": "\u03B6",
        "Zeta": "\u0396",
        "zfr": "\uD835\uDD37",
        "Zfr": "\u2128",
        "zhcy": "\u0436",
        "ZHcy": "\u0416",
        "zigrarr": "\u21DD",
        "zopf": "\uD835\uDD6B",
        "Zopf": "\u2124",
        "zscr": "\uD835\uDCCF",
        "Zscr": "\uD835\uDCB5",
        "zwj": "\u200D",
        "zwnj": "\u200C"
    };
    var decodeMapLegacy = {
        "aacute": "\xe1",
        "Aacute": "\xc1",
        "acirc": "\xe2",
        "Acirc": "\xc2",
        "acute": "\xb4",
        "aelig": "\xe6",
        "AElig": "\xc6",
        "agrave": "\xe0",
        "Agrave": "\xc0",
        "amp": "&",
        "AMP": "&",
        "aring": "\xe5",
        "Aring": "\xc5",
        "atilde": "\xe3",
        "Atilde": "\xc3",
        "auml": "\xe4",
        "Auml": "\xc4",
        "brvbar": "\xa6",
        "ccedil": "\xe7",
        "Ccedil": "\xc7",
        "cedil": "\xb8",
        "cent": "\xa2",
        "copy": "\xa9",
        "COPY": "\xa9",
        "curren": "\xa4",
        "deg": "\xb0",
        "divide": "\xf7",
        "eacute": "\xe9",
        "Eacute": "\xc9",
        "ecirc": "\xea",
        "Ecirc": "\xca",
        "egrave": "\xe8",
        "Egrave": "\xc8",
        "eth": "\xf0",
        "ETH": "\xd0",
        "euml": "\xeb",
        "Euml": "\xcb",
        "frac12": "\xbd",
        "frac14": "\xbc",
        "frac34": "\xbe",
        "gt": ">",
        "GT": ">",
        "iacute": "\xed",
        "Iacute": "\xcd",
        "icirc": "\xee",
        "Icirc": "\xce",
        "iexcl": "\xa1",
        "igrave": "\xec",
        "Igrave": "\xcc",
        "iquest": "\xbf",
        "iuml": "\xef",
        "Iuml": "\xcf",
        "laquo": "\xab",
        "lt": "<",
        "LT": "<",
        "macr": "\xaf",
        "micro": "\xb5",
        "middot": "\xb7",
        "nbsp": "\xa0",
        "not": "\xac",
        "ntilde": "\xf1",
        "Ntilde": "\xd1",
        "oacute": "\xf3",
        "Oacute": "\xd3",
        "ocirc": "\xf4",
        "Ocirc": "\xd4",
        "ograve": "\xf2",
        "Ograve": "\xd2",
        "ordf": "\xaa",
        "ordm": "\xba",
        "oslash": "\xf8",
        "Oslash": "\xd8",
        "otilde": "\xf5",
        "Otilde": "\xd5",
        "ouml": "\xf6",
        "Ouml": "\xd6",
        "para": "\xb6",
        "plusmn": "\xb1",
        "pound": "\xa3",
        "quot": '"',
        "QUOT": '"',
        "raquo": "\xbb",
        "reg": "\xae",
        "REG": "\xae",
        "sect": "\xa7",
        "shy": "\xad",
        "sup1": "\xb9",
        "sup2": "\xb2",
        "sup3": "\xb3",
        "szlig": "\xdf",
        "thorn": "\xfe",
        "THORN": "\xde",
        "times": "\xd7",
        "uacute": "\xfa",
        "Uacute": "\xda",
        "ucirc": "\xfb",
        "Ucirc": "\xdb",
        "ugrave": "\xf9",
        "Ugrave": "\xd9",
        "uml": "\xa8",
        "uuml": "\xfc",
        "Uuml": "\xdc",
        "yacute": "\xfd",
        "Yacute": "\xdd",
        "yen": "\xa5",
        "yuml": "\xff"
    };
    var decodeMapNumeric = {
        "0": "\uFFFD",
        "128": "\u20AC",
        "130": "\u201A",
        "131": "\u0192",
        "132": "\u201E",
        "133": "\u2026",
        "134": "\u2020",
        "135": "\u2021",
        "136": "\u02C6",
        "137": "\u2030",
        "138": "\u0160",
        "139": "\u2039",
        "140": "\u0152",
        "142": "\u017D",
        "145": "\u2018",
        "146": "\u2019",
        "147": "\u201C",
        "148": "\u201D",
        "149": "\u2022",
        "150": "\u2013",
        "151": "\u2014",
        "152": "\u02DC",
        "153": "\u2122",
        "154": "\u0161",
        "155": "\u203A",
        "156": "\u0153",
        "158": "\u017E",
        "159": "\u0178"
    };
    var invalidReferenceCodePoints = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        11,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        127,
        128,
        129,
        130,
        131,
        132,
        133,
        134,
        135,
        136,
        137,
        138,
        139,
        140,
        141,
        142,
        143,
        144,
        145,
        146,
        147,
        148,
        149,
        150,
        151,
        152,
        153,
        154,
        155,
        156,
        157,
        158,
        159,
        64976,
        64977,
        64978,
        64979,
        64980,
        64981,
        64982,
        64983,
        64984,
        64985,
        64986,
        64987,
        64988,
        64989,
        64990,
        64991,
        64992,
        64993,
        64994,
        64995,
        64996,
        64997,
        64998,
        64999,
        65000,
        65001,
        65002,
        65003,
        65004,
        65005,
        65006,
        65007,
        65534,
        65535,
        131070,
        131071,
        196606,
        196607,
        262142,
        262143,
        327678,
        327679,
        393214,
        393215,
        458750,
        458751,
        524286,
        524287,
        589822,
        589823,
        655358,
        655359,
        720894,
        720895,
        786430,
        786431,
        851966,
        851967,
        917502,
        917503,
        983038,
        983039,
        1048574,
        1048575,
        1114110,
        1114111
    ];
    /*--------------------------------------------------------------------------*/ var stringFromCharCode = String.fromCharCode;
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var has = function(object, propertyName) {
        return hasOwnProperty.call(object, propertyName);
    };
    var contains = function(array, value) {
        var index = -1;
        var length = array.length;
        while(++index < length){
            if (array[index] == value) return true;
        }
        return false;
    };
    var merge = function(options, defaults) {
        if (!options) return defaults;
        var result = {};
        var key;
        for(key in defaults)// A `hasOwnProperty` check is not needed here, since only recognized
        // option names are used anyway. Any others are ignored.
        result[key] = has(options, key) ? options[key] : defaults[key];
        return result;
    };
    // Modified version of `ucs2encode`; see https://mths.be/punycode.
    var codePointToSymbol = function(codePoint, strict) {
        var output = "";
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF || codePoint > 0x10FFFF) {
            // See issue #4:
            // “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
            // greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
            // REPLACEMENT CHARACTER.”
            if (strict) parseError("character reference outside the permissible Unicode range");
            return "\uFFFD";
        }
        if (has(decodeMapNumeric, codePoint)) {
            if (strict) parseError("disallowed character reference");
            return decodeMapNumeric[codePoint];
        }
        if (strict && contains(invalidReferenceCodePoints, codePoint)) parseError("disallowed character reference");
        if (codePoint > 0xFFFF) {
            codePoint -= 0x10000;
            output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        output += stringFromCharCode(codePoint);
        return output;
    };
    var hexEscape = function(codePoint) {
        return "&#x" + codePoint.toString(16).toUpperCase() + ";";
    };
    var decEscape = function(codePoint) {
        return "&#" + codePoint + ";";
    };
    var parseError = function(message) {
        throw Error("Parse error: " + message);
    };
    /*--------------------------------------------------------------------------*/ var encode = function(string, options) {
        options = merge(options, encode.options);
        var strict = options.strict;
        if (strict && regexInvalidRawCodePoint.test(string)) parseError("forbidden code point");
        var encodeEverything = options.encodeEverything;
        var useNamedReferences = options.useNamedReferences;
        var allowUnsafeSymbols = options.allowUnsafeSymbols;
        var escapeCodePoint = options.decimal ? decEscape : hexEscape;
        var escapeBmpSymbol = function(symbol) {
            return escapeCodePoint(symbol.charCodeAt(0));
        };
        if (encodeEverything) {
            // Encode ASCII symbols.
            string = string.replace(regexAsciiWhitelist, function(symbol) {
                // Use named references if requested & possible.
                if (useNamedReferences && has(encodeMap, symbol)) return "&" + encodeMap[symbol] + ";";
                return escapeBmpSymbol(symbol);
            });
            // Shorten a few escapes that represent two symbols, of which at least one
            // is within the ASCII range.
            if (useNamedReferences) string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
            // Encode non-ASCII symbols.
            if (useNamedReferences) // Encode non-ASCII symbols that can be replaced with a named reference.
            string = string.replace(regexEncodeNonAscii, function(string) {
                // Note: there is no need to check `has(encodeMap, string)` here.
                return "&" + encodeMap[string] + ";";
            });
        // Note: any remaining non-ASCII symbols are handled outside of the `if`.
        } else if (useNamedReferences) {
            // Apply named character references.
            // Encode `<>"'&` using named character references.
            if (!allowUnsafeSymbols) string = string.replace(regexEscape, function(string) {
                return "&" + encodeMap[string] + ";"; // no need to check `has()` here
            });
            // Shorten escapes that represent two symbols, of which at least one is
            // `<>"'&`.
            string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
            // Encode non-ASCII symbols that can be replaced with a named reference.
            string = string.replace(regexEncodeNonAscii, function(string) {
                // Note: there is no need to check `has(encodeMap, string)` here.
                return "&" + encodeMap[string] + ";";
            });
        } else if (!allowUnsafeSymbols) // Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
        // using named character references.
        string = string.replace(regexEscape, escapeBmpSymbol);
        return string// Encode astral symbols.
        .replace(regexAstralSymbols, function($0) {
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            var high = $0.charCodeAt(0);
            var low = $0.charCodeAt(1);
            var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
            return escapeCodePoint(codePoint);
        })// Encode any remaining BMP symbols that are not printable ASCII symbols
        // using a hexadecimal escape.
        .replace(regexBmpWhitelist, escapeBmpSymbol);
    };
    // Expose default options (so they can be overridden globally).
    encode.options = {
        "allowUnsafeSymbols": false,
        "encodeEverything": false,
        "strict": false,
        "useNamedReferences": false,
        "decimal": false
    };
    var decode = function(html, options) {
        options = merge(options, decode.options);
        var strict = options.strict;
        if (strict && regexInvalidEntity.test(html)) parseError("malformed character reference");
        return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
            var codePoint;
            var semicolon;
            var decDigits;
            var hexDigits;
            var reference;
            var next;
            if ($1) {
                reference = $1;
                // Note: there is no need to check `has(decodeMap, reference)`.
                return decodeMap[reference];
            }
            if ($2) {
                // Decode named character references without trailing `;`, e.g. `&amp`.
                // This is only a parse error if it gets converted to `&`, or if it is
                // followed by `=` in an attribute context.
                reference = $2;
                next = $3;
                if (next && options.isAttributeValue) {
                    if (strict && next == "=") parseError("`&` did not start a character reference");
                    return $0;
                } else {
                    if (strict) parseError("named character reference was not terminated by a semicolon");
                    // Note: there is no need to check `has(decodeMapLegacy, reference)`.
                    return decodeMapLegacy[reference] + (next || "");
                }
            }
            if ($4) {
                // Decode decimal escapes, e.g. `&#119558;`.
                decDigits = $4;
                semicolon = $5;
                if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
                codePoint = parseInt(decDigits, 10);
                return codePointToSymbol(codePoint, strict);
            }
            if ($6) {
                // Decode hexadecimal escapes, e.g. `&#x1D306;`.
                hexDigits = $6;
                semicolon = $7;
                if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
                codePoint = parseInt(hexDigits, 16);
                return codePointToSymbol(codePoint, strict);
            }
            // If we’re still here, `if ($7)` is implied; it’s an ambiguous
            // ampersand for sure. https://mths.be/notes/ambiguous-ampersands
            if (strict) parseError("named character reference was not terminated by a semicolon");
            return $0;
        });
    };
    // Expose default options (so they can be overridden globally).
    decode.options = {
        "isAttributeValue": false,
        "strict": false
    };
    var escape = function(string) {
        return string.replace(regexEscape, function($0) {
            // Note: there is no need to check `has(escapeMap, $0)` here.
            return escapeMap[$0];
        });
    };
    /*--------------------------------------------------------------------------*/ var he = {
        "version": "1.2.0",
        "encode": encode,
        "decode": decode,
        "escape": escape,
        "unescape": decode
    };
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) define(function() {
        return he;
    });
    else if (freeExports && !freeExports.nodeType) {
        if (freeModule) freeModule.exports = he;
        else for(var key in he)has(he, key) && (freeExports[key] = he[key]);
    } else root.he = he;
})(this);

},{}],"49Kl3":[function(require,module,exports) {
"use strict";
module.exports = {
    info: "\u2139\uFE0F",
    success: "\u2705",
    warning: "\u26A0\uFE0F",
    error: "\u274C\uFE0F"
};

},{}],"9bciI":[function(require,module,exports) {
var process = require("2acc79e3e85d2232");
var global = arguments[3];
"use strict";
/**
 * Module dependencies.
 * @private
 */ var EventEmitter = require("1e371680cbe1f078").EventEmitter;
var Pending = require("6fb17809506655e1");
var utils = require("9e88117b21a95fc4");
var debug = require("b763c0e26fcc02c4")("mocha:runner");
var Runnable = require("545d8d7008797cea");
var Suite = require("22f9d9296ffc1e64");
var HOOK_TYPE_BEFORE_EACH = Suite.constants.HOOK_TYPE_BEFORE_EACH;
var HOOK_TYPE_AFTER_EACH = Suite.constants.HOOK_TYPE_AFTER_EACH;
var HOOK_TYPE_AFTER_ALL = Suite.constants.HOOK_TYPE_AFTER_ALL;
var HOOK_TYPE_BEFORE_ALL = Suite.constants.HOOK_TYPE_BEFORE_ALL;
var EVENT_ROOT_SUITE_RUN = Suite.constants.EVENT_ROOT_SUITE_RUN;
var STATE_FAILED = Runnable.constants.STATE_FAILED;
var STATE_PASSED = Runnable.constants.STATE_PASSED;
var STATE_PENDING = Runnable.constants.STATE_PENDING;
var stackFilter = utils.stackTraceFilter();
var stringify = utils.stringify;
const { createInvalidExceptionError, createUnsupportedError, createFatalError, isMochaError, constants: errorConstants } = require("8d95770d13d08306");
/**
 * Non-enumerable globals.
 * @private
 * @readonly
 */ var globals = [
    "setTimeout",
    "clearTimeout",
    "setInterval",
    "clearInterval",
    "XMLHttpRequest",
    "Date",
    "setImmediate",
    "clearImmediate"
];
var constants = utils.defineConstants(/**
   * {@link Runner}-related constants.
   * @public
   * @memberof Runner
   * @readonly
   * @alias constants
   * @static
   * @enum {string}
   */ {
    /**
     * Emitted when {@link Hook} execution begins
     */ EVENT_HOOK_BEGIN: "hook",
    /**
     * Emitted when {@link Hook} execution ends
     */ EVENT_HOOK_END: "hook end",
    /**
     * Emitted when Root {@link Suite} execution begins (all files have been parsed and hooks/tests are ready for execution)
     */ EVENT_RUN_BEGIN: "start",
    /**
     * Emitted when Root {@link Suite} execution has been delayed via `delay` option
     */ EVENT_DELAY_BEGIN: "waiting",
    /**
     * Emitted when delayed Root {@link Suite} execution is triggered by user via `global.run()`
     */ EVENT_DELAY_END: "ready",
    /**
     * Emitted when Root {@link Suite} execution ends
     */ EVENT_RUN_END: "end",
    /**
     * Emitted when {@link Suite} execution begins
     */ EVENT_SUITE_BEGIN: "suite",
    /**
     * Emitted when {@link Suite} execution ends
     */ EVENT_SUITE_END: "suite end",
    /**
     * Emitted when {@link Test} execution begins
     */ EVENT_TEST_BEGIN: "test",
    /**
     * Emitted when {@link Test} execution ends
     */ EVENT_TEST_END: "test end",
    /**
     * Emitted when {@link Test} execution fails
     */ EVENT_TEST_FAIL: "fail",
    /**
     * Emitted when {@link Test} execution succeeds
     */ EVENT_TEST_PASS: "pass",
    /**
     * Emitted when {@link Test} becomes pending
     */ EVENT_TEST_PENDING: "pending",
    /**
     * Emitted when {@link Test} execution has failed, but will retry
     */ EVENT_TEST_RETRY: "retry",
    /**
     * Initial state of Runner
     */ STATE_IDLE: "idle",
    /**
     * State set to this value when the Runner has started running
     */ STATE_RUNNING: "running",
    /**
     * State set to this value when the Runner has stopped
     */ STATE_STOPPED: "stopped"
});
class Runner extends EventEmitter {
    /**
   * Initialize a `Runner` at the Root {@link Suite}, which represents a hierarchy of {@link Suite|Suites} and {@link Test|Tests}.
   *
   * @extends external:EventEmitter
   * @public
   * @class
   * @param {Suite} suite - Root suite
   * @param {Object} [opts] - Settings object
   * @param {boolean} [opts.cleanReferencesAfterRun] - Whether to clean references to test fns and hooks when a suite is done.
   * @param {boolean} [opts.delay] - Whether to delay execution of root suite until ready.
   * @param {boolean} [opts.dryRun] - Whether to report tests without running them.
   * @param {boolean} [opts.failZero] - Whether to fail test run if zero tests encountered.
   */ constructor(suite, opts = {}){
        super();
        var self = this;
        this._globals = [];
        this._abort = false;
        this.suite = suite;
        this._opts = opts;
        this.state = constants.STATE_IDLE;
        this.total = suite.total();
        this.failures = 0;
        /**
     * @type {Map<EventEmitter,Map<string,Set<EventListener>>>}
     */ this._eventListeners = new Map();
        this.on(constants.EVENT_TEST_END, function(test) {
            if (test.type === "test" && test.retriedTest() && test.parent) {
                var idx = test.parent.tests && test.parent.tests.indexOf(test.retriedTest());
                if (idx > -1) test.parent.tests[idx] = test;
            }
            self.checkGlobals(test);
        });
        this.on(constants.EVENT_HOOK_END, function(hook) {
            self.checkGlobals(hook);
        });
        this._defaultGrep = /.*/;
        this.grep(this._defaultGrep);
        this.globals(this.globalProps());
        this.uncaught = this._uncaught.bind(this);
        this.unhandled = (reason, promise)=>{
            if (isMochaError(reason)) {
                debug("trapped unhandled rejection coming out of Mocha; forwarding to uncaught handler:", reason);
                this.uncaught(reason);
            } else {
                debug("trapped unhandled rejection from (probably) user code; re-emitting on process");
                this._removeEventListener(process, "unhandledRejection", this.unhandled);
                try {
                    process.emit("unhandledRejection", reason, promise);
                } finally{
                    this._addEventListener(process, "unhandledRejection", this.unhandled);
                }
            }
        };
    }
}
/**
 * Wrapper for setImmediate, process.nextTick, or browser polyfill.
 *
 * @param {Function} fn
 * @private
 */ Runner.immediately = global.setImmediate || process.nextTick;
/**
 * Replacement for `target.on(eventName, listener)` that does bookkeeping to remove them when this runner instance is disposed.
 * @param {EventEmitter} target - The `EventEmitter`
 * @param {string} eventName - The event name
 * @param {string} fn - Listener function
 * @private
 */ Runner.prototype._addEventListener = function(target, eventName, listener) {
    debug("_addEventListener(): adding for event %s; %d current listeners", eventName, target.listenerCount(eventName));
    /* istanbul ignore next */ if (this._eventListeners.has(target) && this._eventListeners.get(target).has(eventName) && this._eventListeners.get(target).get(eventName).has(listener)) {
        debug("warning: tried to attach duplicate event listener for %s", eventName);
        return;
    }
    target.on(eventName, listener);
    const targetListeners = this._eventListeners.has(target) ? this._eventListeners.get(target) : new Map();
    const targetEventListeners = targetListeners.has(eventName) ? targetListeners.get(eventName) : new Set();
    targetEventListeners.add(listener);
    targetListeners.set(eventName, targetEventListeners);
    this._eventListeners.set(target, targetListeners);
};
/**
 * Replacement for `target.removeListener(eventName, listener)` that also updates the bookkeeping.
 * @param {EventEmitter} target - The `EventEmitter`
 * @param {string} eventName - The event name
 * @param {function} listener - Listener function
 * @private
 */ Runner.prototype._removeEventListener = function(target, eventName, listener) {
    target.removeListener(eventName, listener);
    if (this._eventListeners.has(target)) {
        const targetListeners = this._eventListeners.get(target);
        if (targetListeners.has(eventName)) {
            const targetEventListeners = targetListeners.get(eventName);
            targetEventListeners.delete(listener);
            if (!targetEventListeners.size) targetListeners.delete(eventName);
        }
        if (!targetListeners.size) this._eventListeners.delete(target);
    } else debug("trying to remove listener for untracked object %s", target);
};
/**
 * Removes all event handlers set during a run on this instance.
 * Remark: this does _not_ clean/dispose the tests or suites themselves.
 */ Runner.prototype.dispose = function() {
    this.removeAllListeners();
    this._eventListeners.forEach((targetListeners, target)=>{
        targetListeners.forEach((targetEventListeners, eventName)=>{
            targetEventListeners.forEach((listener)=>{
                target.removeListener(eventName, listener);
            });
        });
    });
    this._eventListeners.clear();
};
/**
 * Run tests with full titles matching `re`. Updates runner.total
 * with number of tests matched.
 *
 * @public
 * @memberof Runner
 * @param {RegExp} re
 * @param {boolean} invert
 * @return {Runner} Runner instance.
 */ Runner.prototype.grep = function(re, invert) {
    debug("grep(): setting to %s", re);
    this._grep = re;
    this._invert = invert;
    this.total = this.grepTotal(this.suite);
    return this;
};
/**
 * Returns the number of tests matching the grep search for the
 * given suite.
 *
 * @memberof Runner
 * @public
 * @param {Suite} suite
 * @return {number}
 */ Runner.prototype.grepTotal = function(suite) {
    var self = this;
    var total = 0;
    suite.eachTest(function(test) {
        var match = self._grep.test(test.fullTitle());
        if (self._invert) match = !match;
        if (match) total++;
    });
    return total;
};
/**
 * Return a list of global properties.
 *
 * @return {Array}
 * @private
 */ Runner.prototype.globalProps = function() {
    var props = Object.keys(global);
    // non-enumerables
    for(var i = 0; i < globals.length; ++i){
        if (~props.indexOf(globals[i])) continue;
        props.push(globals[i]);
    }
    return props;
};
/**
 * Allow the given `arr` of globals.
 *
 * @public
 * @memberof Runner
 * @param {Array} arr
 * @return {Runner} Runner instance.
 */ Runner.prototype.globals = function(arr) {
    if (!arguments.length) return this._globals;
    debug("globals(): setting to %O", arr);
    this._globals = this._globals.concat(arr);
    return this;
};
/**
 * Check for global variable leaks.
 *
 * @private
 */ Runner.prototype.checkGlobals = function(test) {
    if (!this.checkLeaks) return;
    var ok = this._globals;
    var globals = this.globalProps();
    var leaks;
    if (test) ok = ok.concat(test._allowedGlobals || []);
    if (this.prevGlobalsLength === globals.length) return;
    this.prevGlobalsLength = globals.length;
    leaks = filterLeaks(ok, globals);
    this._globals = this._globals.concat(leaks);
    if (leaks.length) {
        var msg = `global leak(s) detected: ${leaks.map((e)=>`'${e}'`).join(", ")}`;
        this.fail(test, new Error(msg));
    }
};
/**
 * Fail the given `test`.
 *
 * If `test` is a hook, failures work in the following pattern:
 * - If bail, run corresponding `after each` and `after` hooks,
 *   then exit
 * - Failed `before` hook skips all tests in a suite and subsuites,
 *   but jumps to corresponding `after` hook
 * - Failed `before each` hook skips remaining tests in a
 *   suite and jumps to corresponding `after each` hook,
 *   which is run only once
 * - Failed `after` hook does not alter execution order
 * - Failed `after each` hook skips remaining tests in a
 *   suite and subsuites, but executes other `after each`
 *   hooks
 *
 * @private
 * @param {Runnable} test
 * @param {Error} err
 * @param {boolean} [force=false] - Whether to fail a pending test.
 */ Runner.prototype.fail = function(test, err, force) {
    force = force === true;
    if (test.isPending() && !force) return;
    if (this.state === constants.STATE_STOPPED) {
        if (err.code === errorConstants.MULTIPLE_DONE) throw err;
        throw createFatalError("Test failed after root suite execution completed!", err);
    }
    ++this.failures;
    debug("total number of failures: %d", this.failures);
    test.state = STATE_FAILED;
    if (!isError(err)) err = thrown2Error(err);
    try {
        err.stack = this.fullStackTrace || !err.stack ? err.stack : stackFilter(err.stack);
    } catch (ignore) {
    // some environments do not take kindly to monkeying with the stack
    }
    this.emit(constants.EVENT_TEST_FAIL, test, err);
};
/**
 * Run hook `name` callbacks and then invoke `fn()`.
 *
 * @private
 * @param {string} name
 * @param {Function} fn
 */ Runner.prototype.hook = function(name, fn) {
    if (this._opts.dryRun) return fn();
    var suite = this.suite;
    var hooks = suite.getHooks(name);
    var self = this;
    function next(i) {
        var hook = hooks[i];
        if (!hook) return fn();
        self.currentRunnable = hook;
        if (name === HOOK_TYPE_BEFORE_ALL) hook.ctx.currentTest = hook.parent.tests[0];
        else if (name === HOOK_TYPE_AFTER_ALL) hook.ctx.currentTest = hook.parent.tests[hook.parent.tests.length - 1];
        else hook.ctx.currentTest = self.test;
        setHookTitle(hook);
        hook.allowUncaught = self.allowUncaught;
        self.emit(constants.EVENT_HOOK_BEGIN, hook);
        if (!hook.listeners("error").length) self._addEventListener(hook, "error", function(err) {
            self.fail(hook, err);
        });
        hook.run(function cbHookRun(err) {
            var testError = hook.error();
            if (testError) self.fail(self.test, testError);
            // conditional skip
            if (hook.pending) {
                if (name === HOOK_TYPE_AFTER_EACH) // TODO define and implement use case
                {
                    if (self.test) self.test.pending = true;
                } else if (name === HOOK_TYPE_BEFORE_EACH) {
                    if (self.test) self.test.pending = true;
                    self.emit(constants.EVENT_HOOK_END, hook);
                    hook.pending = false; // activates hook for next test
                    return fn(new Error("abort hookDown"));
                } else if (name === HOOK_TYPE_BEFORE_ALL) {
                    suite.tests.forEach(function(test) {
                        test.pending = true;
                    });
                    suite.suites.forEach(function(suite) {
                        suite.pending = true;
                    });
                    hooks = [];
                } else {
                    hook.pending = false;
                    var errForbid = createUnsupportedError("`this.skip` forbidden");
                    self.fail(hook, errForbid);
                    return fn(errForbid);
                }
            } else if (err) {
                self.fail(hook, err);
                // stop executing hooks, notify callee of hook err
                return fn(err);
            }
            self.emit(constants.EVENT_HOOK_END, hook);
            delete hook.ctx.currentTest;
            setHookTitle(hook);
            next(++i);
        });
        function setHookTitle(hook) {
            hook.originalTitle = hook.originalTitle || hook.title;
            if (hook.ctx && hook.ctx.currentTest) hook.title = `${hook.originalTitle} for "${hook.ctx.currentTest.title}"`;
            else {
                var parentTitle;
                if (hook.parent.title) parentTitle = hook.parent.title;
                else parentTitle = hook.parent.root ? "{root}" : "";
                hook.title = `${hook.originalTitle} in "${parentTitle}"`;
            }
        }
    }
    Runner.immediately(function() {
        next(0);
    });
};
/**
 * Run hook `name` for the given array of `suites`
 * in order, and callback `fn(err, errSuite)`.
 *
 * @private
 * @param {string} name
 * @param {Array} suites
 * @param {Function} fn
 */ Runner.prototype.hooks = function(name, suites, fn) {
    var self = this;
    var orig = this.suite;
    function next(suite) {
        self.suite = suite;
        if (!suite) {
            self.suite = orig;
            return fn();
        }
        self.hook(name, function(err) {
            if (err) {
                var errSuite = self.suite;
                self.suite = orig;
                return fn(err, errSuite);
            }
            next(suites.pop());
        });
    }
    next(suites.pop());
};
/**
 * Run 'afterEach' hooks from bottom up.
 *
 * @param {String} name
 * @param {Function} fn
 * @private
 */ Runner.prototype.hookUp = function(name, fn) {
    var suites = [
        this.suite
    ].concat(this.parents()).reverse();
    this.hooks(name, suites, fn);
};
/**
 * Run 'beforeEach' hooks from top level down.
 *
 * @param {String} name
 * @param {Function} fn
 * @private
 */ Runner.prototype.hookDown = function(name, fn) {
    var suites = [
        this.suite
    ].concat(this.parents());
    this.hooks(name, suites, fn);
};
/**
 * Return an array of parent Suites from
 * closest to furthest.
 *
 * @return {Array}
 * @private
 */ Runner.prototype.parents = function() {
    var suite = this.suite;
    var suites = [];
    while(suite.parent){
        suite = suite.parent;
        suites.push(suite);
    }
    return suites;
};
/**
 * Run the current test and callback `fn(err)`.
 *
 * @param {Function} fn
 * @private
 */ Runner.prototype.runTest = function(fn) {
    if (this._opts.dryRun) return Runner.immediately(fn);
    var self = this;
    var test = this.test;
    if (!test) return;
    if (this.asyncOnly) test.asyncOnly = true;
    this._addEventListener(test, "error", function(err) {
        self.fail(test, err);
    });
    if (this.allowUncaught) {
        test.allowUncaught = true;
        return test.run(fn);
    }
    try {
        test.run(fn);
    } catch (err) {
        fn(err);
    }
};
/**
 * Run tests in the given `suite` and invoke the callback `fn()` when complete.
 *
 * @private
 * @param {Suite} suite
 * @param {Function} fn
 */ Runner.prototype.runTests = function(suite, fn) {
    var self = this;
    var tests = suite.tests.slice();
    var test;
    function hookErr(_, errSuite, after) {
        // before/after Each hook for errSuite failed:
        var orig = self.suite;
        // for failed 'after each' hook start from errSuite parent,
        // otherwise start from errSuite itself
        self.suite = after ? errSuite.parent : errSuite;
        if (self.suite) self.hookUp(HOOK_TYPE_AFTER_EACH, function(err2, errSuite2) {
            self.suite = orig;
            // some hooks may fail even now
            if (err2) return hookErr(err2, errSuite2, true);
            // report error suite
            fn(errSuite);
        });
        else {
            // there is no need calling other 'after each' hooks
            self.suite = orig;
            fn(errSuite);
        }
    }
    function next(err, errSuite) {
        // if we bail after first err
        if (self.failures && suite._bail) tests = [];
        if (self._abort) return fn();
        if (err) return hookErr(err, errSuite, true);
        // next test
        test = tests.shift();
        // all done
        if (!test) return fn();
        // grep
        var match = self._grep.test(test.fullTitle());
        if (self._invert) match = !match;
        if (!match) {
            // Run immediately only if we have defined a grep. When we
            // define a grep — It can cause maximum callstack error if
            // the grep is doing a large recursive loop by neglecting
            // all tests. The run immediately function also comes with
            // a performance cost. So we don't want to run immediately
            // if we run the whole test suite, because running the whole
            // test suite don't do any immediate recursive loops. Thus,
            // allowing a JS runtime to breathe.
            if (self._grep !== self._defaultGrep) Runner.immediately(next);
            else next();
            return;
        }
        // static skip, no hooks are executed
        if (test.isPending()) {
            if (self.forbidPending) self.fail(test, new Error("Pending test forbidden"), true);
            else {
                test.state = STATE_PENDING;
                self.emit(constants.EVENT_TEST_PENDING, test);
            }
            self.emit(constants.EVENT_TEST_END, test);
            return next();
        }
        // execute test and hook(s)
        self.emit(constants.EVENT_TEST_BEGIN, self.test = test);
        self.hookDown(HOOK_TYPE_BEFORE_EACH, function(err, errSuite) {
            // conditional skip within beforeEach
            if (test.isPending()) {
                if (self.forbidPending) self.fail(test, new Error("Pending test forbidden"), true);
                else {
                    test.state = STATE_PENDING;
                    self.emit(constants.EVENT_TEST_PENDING, test);
                }
                self.emit(constants.EVENT_TEST_END, test);
                // skip inner afterEach hooks below errSuite level
                var origSuite = self.suite;
                self.suite = errSuite || self.suite;
                return self.hookUp(HOOK_TYPE_AFTER_EACH, function(e, eSuite) {
                    self.suite = origSuite;
                    next(e, eSuite);
                });
            }
            if (err) return hookErr(err, errSuite, false);
            self.currentRunnable = self.test;
            self.runTest(function(err) {
                test = self.test;
                // conditional skip within it
                if (test.pending) {
                    if (self.forbidPending) self.fail(test, new Error("Pending test forbidden"), true);
                    else {
                        test.state = STATE_PENDING;
                        self.emit(constants.EVENT_TEST_PENDING, test);
                    }
                    self.emit(constants.EVENT_TEST_END, test);
                    return self.hookUp(HOOK_TYPE_AFTER_EACH, next);
                } else if (err) {
                    var retry = test.currentRetry();
                    if (retry < test.retries()) {
                        var clonedTest = test.clone();
                        clonedTest.currentRetry(retry + 1);
                        tests.unshift(clonedTest);
                        self.emit(constants.EVENT_TEST_RETRY, test, err);
                        // Early return + hook trigger so that it doesn't
                        // increment the count wrong
                        return self.hookUp(HOOK_TYPE_AFTER_EACH, next);
                    } else self.fail(test, err);
                    self.emit(constants.EVENT_TEST_END, test);
                    return self.hookUp(HOOK_TYPE_AFTER_EACH, next);
                }
                test.state = STATE_PASSED;
                self.emit(constants.EVENT_TEST_PASS, test);
                self.emit(constants.EVENT_TEST_END, test);
                self.hookUp(HOOK_TYPE_AFTER_EACH, next);
            });
        });
    }
    this.next = next;
    this.hookErr = hookErr;
    next();
};
/**
 * Run the given `suite` and invoke the callback `fn()` when complete.
 *
 * @private
 * @param {Suite} suite
 * @param {Function} fn
 */ Runner.prototype.runSuite = function(suite, fn) {
    var i = 0;
    var self = this;
    var total = this.grepTotal(suite);
    debug("runSuite(): running %s", suite.fullTitle());
    if (!total || self.failures && suite._bail) {
        debug("runSuite(): bailing");
        return fn();
    }
    this.emit(constants.EVENT_SUITE_BEGIN, this.suite = suite);
    function next(errSuite) {
        if (errSuite) {
            // current suite failed on a hook from errSuite
            if (errSuite === suite) // if errSuite is current suite
            // continue to the next sibling suite
            return done();
            // errSuite is among the parents of current suite
            // stop execution of errSuite and all sub-suites
            return done(errSuite);
        }
        if (self._abort) return done();
        var curr = suite.suites[i++];
        if (!curr) return done();
        // Avoid grep neglecting large number of tests causing a
        // huge recursive loop and thus a maximum call stack error.
        // See comment in `this.runTests()` for more information.
        if (self._grep !== self._defaultGrep) Runner.immediately(function() {
            self.runSuite(curr, next);
        });
        else self.runSuite(curr, next);
    }
    function done(errSuite) {
        self.suite = suite;
        self.nextSuite = next;
        // remove reference to test
        delete self.test;
        self.hook(HOOK_TYPE_AFTER_ALL, function() {
            self.emit(constants.EVENT_SUITE_END, suite);
            fn(errSuite);
        });
    }
    this.nextSuite = next;
    this.hook(HOOK_TYPE_BEFORE_ALL, function(err) {
        if (err) return done();
        self.runTests(suite, next);
    });
};
/**
 * Handle uncaught exceptions within runner.
 *
 * This function is bound to the instance as `Runner#uncaught` at instantiation
 * time. It's intended to be listening on the `Process.uncaughtException` event.
 * In order to not leak EE listeners, we need to ensure no more than a single
 * `uncaughtException` listener exists per `Runner`.  The only way to do
 * this--because this function needs the context (and we don't have lambdas)--is
 * to use `Function.prototype.bind`. We need strict equality to unregister and
 * _only_ unregister the _one_ listener we set from the
 * `Process.uncaughtException` event; would be poor form to just remove
 * everything. See {@link Runner#run} for where the event listener is registered
 * and unregistered.
 * @param {Error} err - Some uncaught error
 * @private
 */ Runner.prototype._uncaught = function(err) {
    // this is defensive to prevent future developers from mis-calling this function.
    // it's more likely that it'd be called with the incorrect context--say, the global
    // `process` object--than it would to be called with a context that is not a "subclass"
    // of `Runner`.
    if (!(this instanceof Runner)) throw createFatalError("Runner#uncaught() called with invalid context", this);
    if (err instanceof Pending) {
        debug("uncaught(): caught a Pending");
        return;
    }
    // browser does not exit script when throwing in global.onerror()
    if (this.allowUncaught && !utils.isBrowser()) {
        debug("uncaught(): bubbling exception due to --allow-uncaught");
        throw err;
    }
    if (this.state === constants.STATE_STOPPED) {
        debug("uncaught(): throwing after run has completed!");
        throw err;
    }
    if (err) debug("uncaught(): got truthy exception %O", err);
    else {
        debug("uncaught(): undefined/falsy exception");
        err = createInvalidExceptionError("Caught falsy/undefined exception which would otherwise be uncaught. No stack trace found; try a debugger", err);
    }
    if (!isError(err)) {
        err = thrown2Error(err);
        debug('uncaught(): converted "error" %o to Error', err);
    }
    err.uncaught = true;
    var runnable = this.currentRunnable;
    if (!runnable) {
        runnable = new Runnable("Uncaught error outside test suite");
        debug("uncaught(): no current Runnable; created a phony one");
        runnable.parent = this.suite;
        if (this.state === constants.STATE_RUNNING) {
            debug("uncaught(): failing gracefully");
            this.fail(runnable, err);
        } else {
            // Can't recover from this failure
            debug("uncaught(): test run has not yet started; unrecoverable");
            this.emit(constants.EVENT_RUN_BEGIN);
            this.fail(runnable, err);
            this.emit(constants.EVENT_RUN_END);
        }
        return;
    }
    runnable.clearTimeout();
    if (runnable.isFailed()) {
        debug("uncaught(): Runnable has already failed");
        // Ignore error if already failed
        return;
    } else if (runnable.isPending()) {
        debug("uncaught(): pending Runnable wound up failing!");
        // report 'pending test' retrospectively as failed
        this.fail(runnable, err, true);
        return;
    }
    // we cannot recover gracefully if a Runnable has already passed
    // then fails asynchronously
    if (runnable.isPassed()) {
        debug("uncaught(): Runnable has already passed; bailing gracefully");
        this.fail(runnable, err);
        this.abort();
    } else {
        debug("uncaught(): forcing Runnable to complete with Error");
        return runnable.callback(err);
    }
};
/**
 * Run the root suite and invoke `fn(failures)`
 * on completion.
 *
 * @public
 * @memberof Runner
 * @param {Function} fn - Callback when finished
 * @param {Object} [opts] - For subclasses
 * @param {string[]} opts.files - Files to run
 * @param {Options} opts.options - command-line options
 * @returns {Runner} Runner instance.
 */ Runner.prototype.run = function(fn, opts = {}) {
    var rootSuite = this.suite;
    var options = opts.options || {};
    debug("run(): got options: %O", options);
    fn = fn || function() {};
    const end = ()=>{
        if (!this.total && this._opts.failZero) this.failures = 1;
        debug("run(): root suite completed; emitting %s", constants.EVENT_RUN_END);
        this.emit(constants.EVENT_RUN_END);
    };
    const begin = ()=>{
        debug("run(): emitting %s", constants.EVENT_RUN_BEGIN);
        this.emit(constants.EVENT_RUN_BEGIN);
        debug("run(): emitted %s", constants.EVENT_RUN_BEGIN);
        this.runSuite(rootSuite, end);
    };
    const prepare = ()=>{
        debug("run(): starting");
        // If there is an `only` filter
        if (rootSuite.hasOnly()) {
            rootSuite.filterOnly();
            debug("run(): filtered exclusive Runnables");
        }
        this.state = constants.STATE_RUNNING;
        if (this._opts.delay) {
            this.emit(constants.EVENT_DELAY_END);
            debug('run(): "delay" ended');
        }
        return begin();
    };
    // references cleanup to avoid memory leaks
    if (this._opts.cleanReferencesAfterRun) this.on(constants.EVENT_SUITE_END, (suite)=>{
        suite.cleanReferences();
    });
    // callback
    this.on(constants.EVENT_RUN_END, function() {
        this.state = constants.STATE_STOPPED;
        debug("run(): emitted %s", constants.EVENT_RUN_END);
        fn(this.failures);
    });
    this._removeEventListener(process, "uncaughtException", this.uncaught);
    this._removeEventListener(process, "unhandledRejection", this.unhandled);
    this._addEventListener(process, "uncaughtException", this.uncaught);
    this._addEventListener(process, "unhandledRejection", this.unhandled);
    if (this._opts.delay) {
        // for reporters, I guess.
        // might be nice to debounce some dots while we wait.
        this.emit(constants.EVENT_DELAY_BEGIN, rootSuite);
        rootSuite.once(EVENT_ROOT_SUITE_RUN, prepare);
        debug("run(): waiting for green light due to --delay");
    } else Runner.immediately(prepare);
    return this;
};
/**
 * Toggle partial object linking behavior; used for building object references from
 * unique ID's. Does nothing in serial mode, because the object references already exist.
 * Subclasses can implement this (e.g., `ParallelBufferedRunner`)
 * @abstract
 * @param {boolean} [value] - If `true`, enable partial object linking, otherwise disable
 * @returns {Runner}
 * @chainable
 * @public
 * @example
 * // this reporter needs proper object references when run in parallel mode
 * class MyReporter() {
 *   constructor(runner) {
 *     this.runner.linkPartialObjects(true)
 *       .on(EVENT_SUITE_BEGIN, suite => {
           // this Suite may be the same object...
 *       })
 *       .on(EVENT_TEST_BEGIN, test => {
 *         // ...as the `test.parent` property
 *       });
 *   }
 * }
 */ Runner.prototype.linkPartialObjects = function(value) {
    return this;
};
/*
 * Like {@link Runner#run}, but does not accept a callback and returns a `Promise` instead of a `Runner`.
 * This function cannot reject; an `unhandledRejection` event will bubble up to the `process` object instead.
 * @public
 * @memberof Runner
 * @param {Object} [opts] - Options for {@link Runner#run}
 * @returns {Promise<number>} Failure count
 */ Runner.prototype.runAsync = async function runAsync(opts = {}) {
    return new Promise((resolve)=>{
        this.run(resolve, opts);
    });
};
/**
 * Cleanly abort execution.
 *
 * @memberof Runner
 * @public
 * @return {Runner} Runner instance.
 */ Runner.prototype.abort = function() {
    debug("abort(): aborting");
    this._abort = true;
    return this;
};
/**
 * Returns `true` if Mocha is running in parallel mode.  For reporters.
 *
 * Subclasses should return an appropriate value.
 * @public
 * @returns {false}
 */ Runner.prototype.isParallelMode = function isParallelMode() {
    return false;
};
/**
 * Configures an alternate reporter for worker processes to use. Subclasses
 * using worker processes should implement this.
 * @public
 * @param {string} path - Absolute path to alternate reporter for worker processes to use
 * @returns {Runner}
 * @throws When in serial mode
 * @chainable
 * @abstract
 */ Runner.prototype.workerReporter = function() {
    throw createUnsupportedError("workerReporter() not supported in serial mode");
};
/**
 * Filter leaks with the given globals flagged as `ok`.
 *
 * @private
 * @param {Array} ok
 * @param {Array} globals
 * @return {Array}
 */ function filterLeaks(ok, globals) {
    return globals.filter(function(key) {
        // Firefox and Chrome exposes iframes as index inside the window object
        if (/^\d+/.test(key)) return false;
        // in firefox
        // if runner runs in an iframe, this iframe's window.getInterface method
        // not init at first it is assigned in some seconds
        if (global.navigator && /^getInterface/.test(key)) return false;
        // an iframe could be approached by window[iframeIndex]
        // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak
        if (global.navigator && /^\d+/.test(key)) return false;
        // Opera and IE expose global variables for HTML element IDs (issue #243)
        if (/^mocha-/.test(key)) return false;
        var matched = ok.filter(function(ok) {
            if (~ok.indexOf("*")) return key.indexOf(ok.split("*")[0]) === 0;
            return key === ok;
        });
        return !matched.length && (!global.navigator || key !== "onerror");
    });
}
/**
 * Check if argument is an instance of Error object or a duck-typed equivalent.
 *
 * @private
 * @param {Object} err - object to check
 * @param {string} err.message - error message
 * @returns {boolean}
 */ function isError(err) {
    return err instanceof Error || err && typeof err.message === "string";
}
/**
 *
 * Converts thrown non-extensible type into proper Error.
 *
 * @private
 * @param {*} thrown - Non-extensible type thrown by code
 * @return {Error}
 */ function thrown2Error(err) {
    return new Error(`the ${utils.canonicalType(err)} ${stringify(err)} was thrown, throw an Error :)`);
}
Runner.constants = constants;
/**
 * Node.js' `EventEmitter`
 * @external EventEmitter
 * @see {@link https://nodejs.org/api/events.html#events_class_eventemitter}
 */ module.exports = Runner;

},{"2acc79e3e85d2232":"d5jf4","1e371680cbe1f078":"1VQLm","6fb17809506655e1":"jPj8y","9e88117b21a95fc4":"tLxDb","b763c0e26fcc02c4":"l0oUb","545d8d7008797cea":"dIYAm","22f9d9296ffc1e64":"lfZtK","8d95770d13d08306":"fbJXN"}],"jPj8y":[function(require,module,exports) {
"use strict";
/**
 @module Pending
*/ module.exports = Pending;
/**
 * Initialize a new `Pending` error with the given message.
 *
 * @param {string} message
 */ function Pending(message) {
    this.message = message;
}

},{}],"l0oUb":[function(require,module,exports) {
/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ var process = require("12edbb1af7d8bd3b");
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
    if (!this.useColors) return;
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === "%%") return;
        index++;
        if (match === "%c") // We only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) exports.storage.setItem("debug", namespaces);
        else exports.storage.removeItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem("debug");
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== "undefined" && "env" in process) r = undefined;
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = require("d9172905aa5ed6c")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
    }
};

},{"12edbb1af7d8bd3b":"d5jf4","d9172905aa5ed6c":"6Yq2n"}],"6Yq2n":[function(require,module,exports) {
/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require("5c5c8c8b1996f88f");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) return;
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") // Anything else let's inspect with %O
            args.unshift("%O");
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === "%%") return "%";
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === "function") {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) return enableOverride;
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === "function") createDebug.init(debug);
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for(i = 0; i < len; i++){
            if (!split[i]) continue;
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
            else createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace)=>"-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        if (name[name.length - 1] === "*") return true;
        let i;
        let len;
        for(i = 0, len = createDebug.skips.length; i < len; i++){
            if (createDebug.skips[i].test(name)) return false;
        }
        for(i = 0, len = createDebug.names.length; i < len; i++){
            if (createDebug.names[i].test(name)) return true;
        }
        return false;
    }
    /**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/ function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;

},{"5c5c8c8b1996f88f":"2FEgr"}],"2FEgr":[function(require,module,exports) {
/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * y;
        case "weeks":
        case "week":
        case "w":
            return n * w;
        case "days":
        case "day":
        case "d":
            return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) return Math.round(ms / d) + "d";
    if (msAbs >= h) return Math.round(ms / h) + "h";
    if (msAbs >= m) return Math.round(ms / m) + "m";
    if (msAbs >= s) return Math.round(ms / s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) return plural(ms, msAbs, d, "day");
    if (msAbs >= h) return plural(ms, msAbs, h, "hour");
    if (msAbs >= m) return plural(ms, msAbs, m, "minute");
    if (msAbs >= s) return plural(ms, msAbs, s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

},{}],"dIYAm":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var EventEmitter = require("f19053b860cd1687").EventEmitter;
var Pending = require("b0963fcdd293b71");
var debug = require("79ea78c36317a160")("mocha:runnable");
var milliseconds = require("7dc09271c93bb135");
var utils = require("c93fa875ebfc611f");
const { createInvalidExceptionError, createMultipleDoneError, createTimeoutError } = require("cd199eed02e82b7c");
/**
 * Save timer references to avoid Sinon interfering (see GH-237).
 * @private
 */ var Date = global.Date;
var setTimeout = global.setTimeout;
var clearTimeout = global.clearTimeout;
var toString = Object.prototype.toString;
module.exports = Runnable;
/**
 * Initialize a new `Runnable` with the given `title` and callback `fn`.
 *
 * @class
 * @extends external:EventEmitter
 * @public
 * @param {String} title
 * @param {Function} fn
 */ function Runnable(title, fn) {
    this.title = title;
    this.fn = fn;
    this.body = (fn || "").toString();
    this.async = fn && fn.length;
    this.sync = !this.async;
    this._timeout = 2000;
    this._slow = 75;
    this._retries = -1;
    utils.assignNewMochaID(this);
    Object.defineProperty(this, "id", {
        get () {
            return utils.getMochaID(this);
        }
    });
    this.reset();
}
/**
 * Inherit from `EventEmitter.prototype`.
 */ utils.inherits(Runnable, EventEmitter);
/**
 * Resets the state initially or for a next run.
 */ Runnable.prototype.reset = function() {
    this.timedOut = false;
    this._currentRetry = 0;
    this.pending = false;
    delete this.state;
    delete this.err;
};
/**
 * Get current timeout value in msecs.
 *
 * @private
 * @returns {number} current timeout threshold value
 */ /**
 * @summary
 * Set timeout threshold value (msecs).
 *
 * @description
 * A string argument can use shorthand (e.g., "2s") and will be converted.
 * The value will be clamped to range [<code>0</code>, <code>2^<sup>31</sup>-1</code>].
 * If clamped value matches either range endpoint, timeouts will be disabled.
 *
 * @private
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Maximum_delay_value}
 * @param {number|string} ms - Timeout threshold value.
 * @returns {Runnable} this
 * @chainable
 */ Runnable.prototype.timeout = function(ms) {
    if (!arguments.length) return this._timeout;
    if (typeof ms === "string") ms = milliseconds(ms);
    // Clamp to range
    var INT_MAX = Math.pow(2, 31) - 1;
    var range = [
        0,
        INT_MAX
    ];
    ms = utils.clamp(ms, range);
    // see #1652 for reasoning
    if (ms === range[0] || ms === range[1]) this._timeout = 0;
    else this._timeout = ms;
    debug("timeout %d", this._timeout);
    if (this.timer) this.resetTimeout();
    return this;
};
/**
 * Set or get slow `ms`.
 *
 * @private
 * @param {number|string} ms
 * @return {Runnable|number} ms or Runnable instance.
 */ Runnable.prototype.slow = function(ms) {
    if (!arguments.length || typeof ms === "undefined") return this._slow;
    if (typeof ms === "string") ms = milliseconds(ms);
    debug("slow %d", ms);
    this._slow = ms;
    return this;
};
/**
 * Halt and mark as pending.
 *
 * @memberof Mocha.Runnable
 * @public
 */ Runnable.prototype.skip = function() {
    this.pending = true;
    throw new Pending("sync skip; aborting execution");
};
/**
 * Check if this runnable or its parent suite is marked as pending.
 *
 * @private
 */ Runnable.prototype.isPending = function() {
    return this.pending || this.parent && this.parent.isPending();
};
/**
 * Return `true` if this Runnable has failed.
 * @return {boolean}
 * @private
 */ Runnable.prototype.isFailed = function() {
    return !this.isPending() && this.state === constants.STATE_FAILED;
};
/**
 * Return `true` if this Runnable has passed.
 * @return {boolean}
 * @private
 */ Runnable.prototype.isPassed = function() {
    return !this.isPending() && this.state === constants.STATE_PASSED;
};
/**
 * Set or get number of retries.
 *
 * @private
 */ Runnable.prototype.retries = function(n) {
    if (!arguments.length) return this._retries;
    this._retries = n;
};
/**
 * Set or get current retry
 *
 * @private
 */ Runnable.prototype.currentRetry = function(n) {
    if (!arguments.length) return this._currentRetry;
    this._currentRetry = n;
};
/**
 * Return the full title generated by recursively concatenating the parent's
 * full title.
 *
 * @memberof Mocha.Runnable
 * @public
 * @return {string}
 */ Runnable.prototype.fullTitle = function() {
    return this.titlePath().join(" ");
};
/**
 * Return the title path generated by concatenating the parent's title path with the title.
 *
 * @memberof Mocha.Runnable
 * @public
 * @return {string}
 */ Runnable.prototype.titlePath = function() {
    return this.parent.titlePath().concat([
        this.title
    ]);
};
/**
 * Clear the timeout.
 *
 * @private
 */ Runnable.prototype.clearTimeout = function() {
    clearTimeout(this.timer);
};
/**
 * Reset the timeout.
 *
 * @private
 */ Runnable.prototype.resetTimeout = function() {
    var self = this;
    var ms = this.timeout();
    if (ms === 0) return;
    this.clearTimeout();
    this.timer = setTimeout(function() {
        if (self.timeout() === 0) return;
        self.callback(self._timeoutError(ms));
        self.timedOut = true;
    }, ms);
};
/**
 * Set or get a list of whitelisted globals for this test run.
 *
 * @private
 * @param {string[]} globals
 */ Runnable.prototype.globals = function(globals) {
    if (!arguments.length) return this._allowedGlobals;
    this._allowedGlobals = globals;
};
/**
 * Run the test and invoke `fn(err)`.
 *
 * @param {Function} fn
 * @private
 */ Runnable.prototype.run = function(fn) {
    var self = this;
    var start = new Date();
    var ctx = this.ctx;
    var finished;
    var errorWasHandled = false;
    if (this.isPending()) return fn();
    // Sometimes the ctx exists, but it is not runnable
    if (ctx && ctx.runnable) ctx.runnable(this);
    // called multiple times
    function multiple(err) {
        if (errorWasHandled) return;
        errorWasHandled = true;
        self.emit("error", createMultipleDoneError(self, err));
    }
    // finished
    function done(err) {
        var ms = self.timeout();
        if (self.timedOut) return;
        if (finished) return multiple(err);
        self.clearTimeout();
        self.duration = new Date() - start;
        finished = true;
        if (!err && self.duration > ms && ms > 0) err = self._timeoutError(ms);
        fn(err);
    }
    // for .resetTimeout() and Runner#uncaught()
    this.callback = done;
    if (this.fn && typeof this.fn.call !== "function") {
        done(new TypeError("A runnable must be passed a function as its second argument."));
        return;
    }
    // explicit async with `done` argument
    if (this.async) {
        this.resetTimeout();
        // allows skip() to be used in an explicit async context
        this.skip = function asyncSkip() {
            this.pending = true;
            done();
            // halt execution, the uncaught handler will ignore the failure.
            throw new Pending("async skip; aborting execution");
        };
        try {
            callFnAsync(this.fn);
        } catch (err) {
            // handles async runnables which actually run synchronously
            errorWasHandled = true;
            if (err instanceof Pending) return; // done() is already called in this.skip()
            else if (this.allowUncaught) throw err;
            done(Runnable.toValueOrError(err));
        }
        return;
    }
    // sync or promise-returning
    try {
        callFn(this.fn);
    } catch (err) {
        errorWasHandled = true;
        if (err instanceof Pending) return done();
        else if (this.allowUncaught) throw err;
        done(Runnable.toValueOrError(err));
    }
    function callFn(fn) {
        var result = fn.call(ctx);
        if (result && typeof result.then === "function") {
            self.resetTimeout();
            result.then(function() {
                done();
                // Return null so libraries like bluebird do not warn about
                // subsequently constructed Promises.
                return null;
            }, function(reason) {
                done(reason || new Error("Promise rejected with no or falsy reason"));
            });
        } else {
            if (self.asyncOnly) return done(new Error("--async-only option in use without declaring `done()` or returning a promise"));
            done();
        }
    }
    function callFnAsync(fn) {
        var result = fn.call(ctx, function(err) {
            if (err instanceof Error || toString.call(err) === "[object Error]") return done(err);
            if (err) {
                if (Object.prototype.toString.call(err) === "[object Object]") return done(new Error("done() invoked with non-Error: " + JSON.stringify(err)));
                return done(new Error("done() invoked with non-Error: " + err));
            }
            if (result && utils.isPromise(result)) return done(new Error("Resolution method is overspecified. Specify a callback *or* return a Promise; not both."));
            done();
        });
    }
};
/**
 * Instantiates a "timeout" error
 *
 * @param {number} ms - Timeout (in milliseconds)
 * @returns {Error} a "timeout" error
 * @private
 */ Runnable.prototype._timeoutError = function(ms) {
    let msg = `Timeout of ${ms}ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.`;
    if (this.file) msg += " (" + this.file + ")";
    return createTimeoutError(msg, ms, this.file);
};
var constants = utils.defineConstants(/**
   * {@link Runnable}-related constants.
   * @public
   * @memberof Runnable
   * @readonly
   * @static
   * @alias constants
   * @enum {string}
   */ {
    /**
     * Value of `state` prop when a `Runnable` has failed
     */ STATE_FAILED: "failed",
    /**
     * Value of `state` prop when a `Runnable` has passed
     */ STATE_PASSED: "passed",
    /**
     * Value of `state` prop when a `Runnable` has been skipped by user
     */ STATE_PENDING: "pending"
});
/**
 * Given `value`, return identity if truthy, otherwise create an "invalid exception" error and return that.
 * @param {*} [value] - Value to return, if present
 * @returns {*|Error} `value`, otherwise an `Error`
 * @private
 */ Runnable.toValueOrError = function(value) {
    return value || createInvalidExceptionError("Runnable failed with falsy or undefined exception. Please throw an Error instead.", value);
};
Runnable.constants = constants;

},{"f19053b860cd1687":"1VQLm","b0963fcdd293b71":"jPj8y","79ea78c36317a160":"l0oUb","7dc09271c93bb135":"jauEe","c93fa875ebfc611f":"tLxDb","cd199eed02e82b7c":"fbJXN"}],"fbJXN":[function(require,module,exports) {
var process = require("4b203f5c55881ecd");
"use strict";
const { format } = require("4e8f1b9548688548");
/**
 * Contains error codes, factory functions to create throwable error objects,
 * and warning/deprecation functions.
 * @module
 */ /**
 * process.emitWarning or a polyfill
 * @see https://nodejs.org/api/process.html#process_process_emitwarning_warning_options
 * @ignore
 */ const emitWarning = (msg, type)=>{
    if (process.emitWarning) process.emitWarning(msg, type);
    else /* istanbul ignore next */ process.nextTick(function() {
        console.warn(type + ": " + msg);
    });
};
/**
 * Show a deprecation warning. Each distinct message is only displayed once.
 * Ignores empty messages.
 *
 * @param {string} [msg] - Warning to print
 * @private
 */ const deprecate = (msg)=>{
    msg = String(msg);
    if (msg && !deprecate.cache[msg]) {
        deprecate.cache[msg] = true;
        emitWarning(msg, "DeprecationWarning");
    }
};
deprecate.cache = {};
/**
 * Show a generic warning.
 * Ignores empty messages.
 *
 * @param {string} [msg] - Warning to print
 * @private
 */ const warn = (msg)=>{
    if (msg) emitWarning(msg);
};
/**
 * When Mocha throws exceptions (or rejects `Promise`s), it attempts to assign a `code` property to the `Error` object, for easier handling. These are the potential values of `code`.
 * @public
 * @namespace
 * @memberof module:lib/errors
 */ var constants = {
    /**
   * An unrecoverable error.
   * @constant
   * @default
   */ FATAL: "ERR_MOCHA_FATAL",
    /**
   * The type of an argument to a function call is invalid
   * @constant
   * @default
   */ INVALID_ARG_TYPE: "ERR_MOCHA_INVALID_ARG_TYPE",
    /**
   * The value of an argument to a function call is invalid
   * @constant
   * @default
   */ INVALID_ARG_VALUE: "ERR_MOCHA_INVALID_ARG_VALUE",
    /**
   * Something was thrown, but it wasn't an `Error`
   * @constant
   * @default
   */ INVALID_EXCEPTION: "ERR_MOCHA_INVALID_EXCEPTION",
    /**
   * An interface (e.g., `Mocha.interfaces`) is unknown or invalid
   * @constant
   * @default
   */ INVALID_INTERFACE: "ERR_MOCHA_INVALID_INTERFACE",
    /**
   * A reporter (.e.g, `Mocha.reporters`) is unknown or invalid
   * @constant
   * @default
   */ INVALID_REPORTER: "ERR_MOCHA_INVALID_REPORTER",
    /**
   * `done()` was called twice in a `Test` or `Hook` callback
   * @constant
   * @default
   */ MULTIPLE_DONE: "ERR_MOCHA_MULTIPLE_DONE",
    /**
   * No files matched the pattern provided by the user
   * @constant
   * @default
   */ NO_FILES_MATCH_PATTERN: "ERR_MOCHA_NO_FILES_MATCH_PATTERN",
    /**
   * Known, but unsupported behavior of some kind
   * @constant
   * @default
   */ UNSUPPORTED: "ERR_MOCHA_UNSUPPORTED",
    /**
   * Invalid state transition occurring in `Mocha` instance
   * @constant
   * @default
   */ INSTANCE_ALREADY_RUNNING: "ERR_MOCHA_INSTANCE_ALREADY_RUNNING",
    /**
   * Invalid state transition occurring in `Mocha` instance
   * @constant
   * @default
   */ INSTANCE_ALREADY_DISPOSED: "ERR_MOCHA_INSTANCE_ALREADY_DISPOSED",
    /**
   * Use of `only()` w/ `--forbid-only` results in this error.
   * @constant
   * @default
   */ FORBIDDEN_EXCLUSIVITY: "ERR_MOCHA_FORBIDDEN_EXCLUSIVITY",
    /**
   * To be thrown when a user-defined plugin implementation (e.g., `mochaHooks`) is invalid
   * @constant
   * @default
   */ INVALID_PLUGIN_IMPLEMENTATION: "ERR_MOCHA_INVALID_PLUGIN_IMPLEMENTATION",
    /**
   * To be thrown when a builtin or third-party plugin definition (the _definition_ of `mochaHooks`) is invalid
   * @constant
   * @default
   */ INVALID_PLUGIN_DEFINITION: "ERR_MOCHA_INVALID_PLUGIN_DEFINITION",
    /**
   * When a runnable exceeds its allowed run time.
   * @constant
   * @default
   */ TIMEOUT: "ERR_MOCHA_TIMEOUT",
    /**
   * Input file is not able to be parsed
   * @constant
   * @default
   */ UNPARSABLE_FILE: "ERR_MOCHA_UNPARSABLE_FILE"
};
/**
 * A set containing all string values of all Mocha error constants, for use by {@link isMochaError}.
 * @private
 */ const MOCHA_ERRORS = new Set(Object.values(constants));
/**
 * Creates an error object to be thrown when no files to be tested could be found using specified pattern.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} pattern - User-specified argument value.
 * @returns {Error} instance detailing the error condition
 */ function createNoFilesMatchPatternError(message, pattern) {
    var err = new Error(message);
    err.code = constants.NO_FILES_MATCH_PATTERN;
    err.pattern = pattern;
    return err;
}
/**
 * Creates an error object to be thrown when the reporter specified in the options was not found.
 *
 * @public
 * @param {string} message - Error message to be displayed.
 * @param {string} reporter - User-specified reporter value.
 * @returns {Error} instance detailing the error condition
 */ function createInvalidReporterError(message, reporter) {
    var err = new TypeError(message);
    err.code = constants.INVALID_REPORTER;
    err.reporter = reporter;
    return err;
}
/**
 * Creates an error object to be thrown when the interface specified in the options was not found.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} ui - User-specified interface value.
 * @returns {Error} instance detailing the error condition
 */ function createInvalidInterfaceError(message, ui) {
    var err = new Error(message);
    err.code = constants.INVALID_INTERFACE;
    err.interface = ui;
    return err;
}
/**
 * Creates an error object to be thrown when a behavior, option, or parameter is unsupported.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */ function createUnsupportedError(message) {
    var err = new Error(message);
    err.code = constants.UNSUPPORTED;
    return err;
}
/**
 * Creates an error object to be thrown when an argument is missing.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */ function createMissingArgumentError(message, argument, expected) {
    return createInvalidArgumentTypeError(message, argument, expected);
}
/**
 * Creates an error object to be thrown when an argument did not use the supported type
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} expected - Expected argument datatype.
 * @returns {Error} instance detailing the error condition
 */ function createInvalidArgumentTypeError(message, argument, expected) {
    var err = new TypeError(message);
    err.code = constants.INVALID_ARG_TYPE;
    err.argument = argument;
    err.expected = expected;
    err.actual = typeof argument;
    return err;
}
/**
 * Creates an error object to be thrown when an argument did not use the supported value
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} argument - Argument name.
 * @param {string} value - Argument value.
 * @param {string} [reason] - Why value is invalid.
 * @returns {Error} instance detailing the error condition
 */ function createInvalidArgumentValueError(message, argument, value, reason) {
    var err = new TypeError(message);
    err.code = constants.INVALID_ARG_VALUE;
    err.argument = argument;
    err.value = value;
    err.reason = typeof reason !== "undefined" ? reason : "is invalid";
    return err;
}
/**
 * Creates an error object to be thrown when an exception was caught, but the `Error` is falsy or undefined.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */ function createInvalidExceptionError(message, value) {
    var err = new Error(message);
    err.code = constants.INVALID_EXCEPTION;
    err.valueType = typeof value;
    err.value = value;
    return err;
}
/**
 * Creates an error object to be thrown when an unrecoverable error occurs.
 *
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @returns {Error} instance detailing the error condition
 */ function createFatalError(message, value) {
    var err = new Error(message);
    err.code = constants.FATAL;
    err.valueType = typeof value;
    err.value = value;
    return err;
}
/**
 * Dynamically creates a plugin-type-specific error based on plugin type
 * @param {string} message - Error message
 * @param {"reporter"|"ui"} pluginType - Plugin type. Future: expand as needed
 * @param {string} [pluginId] - Name/path of plugin, if any
 * @throws When `pluginType` is not known
 * @public
 * @static
 * @returns {Error}
 */ function createInvalidLegacyPluginError(message, pluginType, pluginId) {
    switch(pluginType){
        case "reporter":
            return createInvalidReporterError(message, pluginId);
        case "ui":
            return createInvalidInterfaceError(message, pluginId);
        default:
            throw new Error('unknown pluginType "' + pluginType + '"');
    }
}
/**
 * **DEPRECATED**.  Use {@link createInvalidLegacyPluginError} instead  Dynamically creates a plugin-type-specific error based on plugin type
 * @deprecated
 * @param {string} message - Error message
 * @param {"reporter"|"interface"} pluginType - Plugin type. Future: expand as needed
 * @param {string} [pluginId] - Name/path of plugin, if any
 * @throws When `pluginType` is not known
 * @public
 * @static
 * @returns {Error}
 */ function createInvalidPluginError(...args) {
    deprecate("Use createInvalidLegacyPluginError() instead");
    return createInvalidLegacyPluginError(...args);
}
/**
 * Creates an error object to be thrown when a mocha object's `run` method is executed while it is already disposed.
 * @param {string} message The error message to be displayed.
 * @param {boolean} cleanReferencesAfterRun the value of `cleanReferencesAfterRun`
 * @param {Mocha} instance the mocha instance that throw this error
 * @static
 */ function createMochaInstanceAlreadyDisposedError(message, cleanReferencesAfterRun, instance) {
    var err = new Error(message);
    err.code = constants.INSTANCE_ALREADY_DISPOSED;
    err.cleanReferencesAfterRun = cleanReferencesAfterRun;
    err.instance = instance;
    return err;
}
/**
 * Creates an error object to be thrown when a mocha object's `run` method is called while a test run is in progress.
 * @param {string} message The error message to be displayed.
 * @static
 * @public
 */ function createMochaInstanceAlreadyRunningError(message, instance) {
    var err = new Error(message);
    err.code = constants.INSTANCE_ALREADY_RUNNING;
    err.instance = instance;
    return err;
}
/**
 * Creates an error object to be thrown when done() is called multiple times in a test
 *
 * @public
 * @param {Runnable} runnable - Original runnable
 * @param {Error} [originalErr] - Original error, if any
 * @returns {Error} instance detailing the error condition
 * @static
 */ function createMultipleDoneError(runnable, originalErr) {
    var title;
    try {
        title = format("<%s>", runnable.fullTitle());
        if (runnable.parent.root) title += " (of root suite)";
    } catch (ignored) {
        title = format("<%s> (of unknown suite)", runnable.title);
    }
    var message = format("done() called multiple times in %s %s", runnable.type ? runnable.type : "unknown runnable", title);
    if (runnable.file) message += format(" of file %s", runnable.file);
    if (originalErr) message += format("; in addition, done() received error: %s", originalErr);
    var err = new Error(message);
    err.code = constants.MULTIPLE_DONE;
    err.valueType = typeof originalErr;
    err.value = originalErr;
    return err;
}
/**
 * Creates an error object to be thrown when `.only()` is used with
 * `--forbid-only`.
 * @static
 * @public
 * @param {Mocha} mocha - Mocha instance
 * @returns {Error} Error with code {@link constants.FORBIDDEN_EXCLUSIVITY}
 */ function createForbiddenExclusivityError(mocha) {
    var err = new Error(mocha.isWorker ? "`.only` is not supported in parallel mode" : "`.only` forbidden by --forbid-only");
    err.code = constants.FORBIDDEN_EXCLUSIVITY;
    return err;
}
/**
 * Creates an error object to be thrown when a plugin definition is invalid
 * @static
 * @param {string} msg - Error message
 * @param {PluginDefinition} [pluginDef] - Problematic plugin definition
 * @public
 * @returns {Error} Error with code {@link constants.INVALID_PLUGIN_DEFINITION}
 */ function createInvalidPluginDefinitionError(msg, pluginDef) {
    const err = new Error(msg);
    err.code = constants.INVALID_PLUGIN_DEFINITION;
    err.pluginDef = pluginDef;
    return err;
}
/**
 * Creates an error object to be thrown when a plugin implementation (user code) is invalid
 * @static
 * @param {string} msg - Error message
 * @param {Object} [opts] - Plugin definition and user-supplied implementation
 * @param {PluginDefinition} [opts.pluginDef] - Plugin Definition
 * @param {*} [opts.pluginImpl] - Plugin Implementation (user-supplied)
 * @public
 * @returns {Error} Error with code {@link constants.INVALID_PLUGIN_DEFINITION}
 */ function createInvalidPluginImplementationError(msg, { pluginDef, pluginImpl } = {}) {
    const err = new Error(msg);
    err.code = constants.INVALID_PLUGIN_IMPLEMENTATION;
    err.pluginDef = pluginDef;
    err.pluginImpl = pluginImpl;
    return err;
}
/**
 * Creates an error object to be thrown when a runnable exceeds its allowed run time.
 * @static
 * @param {string} msg - Error message
 * @param {number} [timeout] - Timeout in ms
 * @param {string} [file] - File, if given
 * @returns {MochaTimeoutError}
 */ function createTimeoutError(msg, timeout, file) {
    const err = new Error(msg);
    err.code = constants.TIMEOUT;
    err.timeout = timeout;
    err.file = file;
    return err;
}
/**
 * Creates an error object to be thrown when file is unparsable
 * @public
 * @static
 * @param {string} message - Error message to be displayed.
 * @param {string} filename - File name
 * @returns {Error} Error with code {@link constants.UNPARSABLE_FILE}
 */ function createUnparsableFileError(message, filename) {
    var err = new Error(message);
    err.code = constants.UNPARSABLE_FILE;
    return err;
}
/**
 * Returns `true` if an error came out of Mocha.
 * _Can suffer from false negatives, but not false positives._
 * @static
 * @public
 * @param {*} err - Error, or anything
 * @returns {boolean}
 */ const isMochaError = (err)=>Boolean(err && typeof err === "object" && MOCHA_ERRORS.has(err.code));
module.exports = {
    constants,
    createFatalError,
    createForbiddenExclusivityError,
    createInvalidArgumentTypeError,
    createInvalidArgumentValueError,
    createInvalidExceptionError,
    createInvalidInterfaceError,
    createInvalidLegacyPluginError,
    createInvalidPluginDefinitionError,
    createInvalidPluginError,
    createInvalidPluginImplementationError,
    createInvalidReporterError,
    createMissingArgumentError,
    createMochaInstanceAlreadyDisposedError,
    createMochaInstanceAlreadyRunningError,
    createMultipleDoneError,
    createNoFilesMatchPatternError,
    createTimeoutError,
    createUnparsableFileError,
    createUnsupportedError,
    deprecate,
    isMochaError,
    warn
}; /**
 * The error thrown when a Runnable times out
 * @memberof module:lib/errors
 * @typedef {Error} MochaTimeoutError
 * @property {constants.TIMEOUT} code - Error code
 * @property {number?} timeout Timeout in ms
 * @property {string?} file Filepath, if given
 */ 

},{"4b203f5c55881ecd":"d5jf4","4e8f1b9548688548":"cxohQ"}],"lfZtK":[function(require,module,exports) {
"use strict";
/**
 * Module dependencies.
 * @private
 */ const { EventEmitter } = require("5c417f37629d927f");
const Hook = require("547a929ff3f4f4bc");
var { assignNewMochaID, clamp, constants: utilsConstants, defineConstants, getMochaID, inherits, isString } = require("34489d4e5cf887af");
const debug = require("1e24ca37e007b2ab")("mocha:suite");
const milliseconds = require("1a1b3ffb905305f1");
const errors = require("b37e5b344b74ebf2");
const { MOCHA_ID_PROP_NAME } = utilsConstants;
/**
 * Expose `Suite`.
 */ exports = module.exports = Suite;
/**
 * Create a new `Suite` with the given `title` and parent `Suite`.
 *
 * @public
 * @param {Suite} parent - Parent suite (required!)
 * @param {string} title - Title
 * @return {Suite}
 */ Suite.create = function(parent, title) {
    var suite = new Suite(title, parent.ctx);
    suite.parent = parent;
    title = suite.fullTitle();
    parent.addSuite(suite);
    return suite;
};
/**
 * Constructs a new `Suite` instance with the given `title`, `ctx`, and `isRoot`.
 *
 * @public
 * @class
 * @extends EventEmitter
 * @see {@link https://nodejs.org/api/events.html#events_class_eventemitter|EventEmitter}
 * @param {string} title - Suite title.
 * @param {Context} parentContext - Parent context instance.
 * @param {boolean} [isRoot=false] - Whether this is the root suite.
 */ function Suite(title, parentContext, isRoot) {
    if (!isString(title)) throw errors.createInvalidArgumentTypeError('Suite argument "title" must be a string. Received type "' + typeof title + '"', "title", "string");
    this.title = title;
    function Context() {}
    Context.prototype = parentContext;
    this.ctx = new Context();
    this.suites = [];
    this.tests = [];
    this.root = isRoot === true;
    this.pending = false;
    this._retries = -1;
    this._beforeEach = [];
    this._beforeAll = [];
    this._afterEach = [];
    this._afterAll = [];
    this._timeout = 2000;
    this._slow = 75;
    this._bail = false;
    this._onlyTests = [];
    this._onlySuites = [];
    assignNewMochaID(this);
    Object.defineProperty(this, "id", {
        get () {
            return getMochaID(this);
        }
    });
    this.reset();
}
/**
 * Inherit from `EventEmitter.prototype`.
 */ inherits(Suite, EventEmitter);
/**
 * Resets the state initially or for a next run.
 */ Suite.prototype.reset = function() {
    this.delayed = false;
    function doReset(thingToReset) {
        thingToReset.reset();
    }
    this.suites.forEach(doReset);
    this.tests.forEach(doReset);
    this._beforeEach.forEach(doReset);
    this._afterEach.forEach(doReset);
    this._beforeAll.forEach(doReset);
    this._afterAll.forEach(doReset);
};
/**
 * Return a clone of this `Suite`.
 *
 * @private
 * @return {Suite}
 */ Suite.prototype.clone = function() {
    var suite = new Suite(this.title);
    debug("clone");
    suite.ctx = this.ctx;
    suite.root = this.root;
    suite.timeout(this.timeout());
    suite.retries(this.retries());
    suite.slow(this.slow());
    suite.bail(this.bail());
    return suite;
};
/**
 * Set or get timeout `ms` or short-hand such as "2s".
 *
 * @private
 * @todo Do not attempt to set value if `ms` is undefined
 * @param {number|string} ms
 * @return {Suite|number} for chaining
 */ Suite.prototype.timeout = function(ms) {
    if (!arguments.length) return this._timeout;
    if (typeof ms === "string") ms = milliseconds(ms);
    // Clamp to range
    var INT_MAX = Math.pow(2, 31) - 1;
    var range = [
        0,
        INT_MAX
    ];
    ms = clamp(ms, range);
    debug("timeout %d", ms);
    this._timeout = parseInt(ms, 10);
    return this;
};
/**
 * Set or get number of times to retry a failed test.
 *
 * @private
 * @param {number|string} n
 * @return {Suite|number} for chaining
 */ Suite.prototype.retries = function(n) {
    if (!arguments.length) return this._retries;
    debug("retries %d", n);
    this._retries = parseInt(n, 10) || 0;
    return this;
};
/**
 * Set or get slow `ms` or short-hand such as "2s".
 *
 * @private
 * @param {number|string} ms
 * @return {Suite|number} for chaining
 */ Suite.prototype.slow = function(ms) {
    if (!arguments.length) return this._slow;
    if (typeof ms === "string") ms = milliseconds(ms);
    debug("slow %d", ms);
    this._slow = ms;
    return this;
};
/**
 * Set or get whether to bail after first error.
 *
 * @private
 * @param {boolean} bail
 * @return {Suite|number} for chaining
 */ Suite.prototype.bail = function(bail) {
    if (!arguments.length) return this._bail;
    debug("bail %s", bail);
    this._bail = bail;
    return this;
};
/**
 * Check if this suite or its parent suite is marked as pending.
 *
 * @private
 */ Suite.prototype.isPending = function() {
    return this.pending || this.parent && this.parent.isPending();
};
/**
 * Generic hook-creator.
 * @private
 * @param {string} title - Title of hook
 * @param {Function} fn - Hook callback
 * @returns {Hook} A new hook
 */ Suite.prototype._createHook = function(title, fn) {
    var hook = new Hook(title, fn);
    hook.parent = this;
    hook.timeout(this.timeout());
    hook.retries(this.retries());
    hook.slow(this.slow());
    hook.ctx = this.ctx;
    hook.file = this.file;
    return hook;
};
/**
 * Run `fn(test[, done])` before running tests.
 *
 * @private
 * @param {string} title
 * @param {Function} fn
 * @return {Suite} for chaining
 */ Suite.prototype.beforeAll = function(title, fn) {
    if (this.isPending()) return this;
    if (typeof title === "function") {
        fn = title;
        title = fn.name;
    }
    title = '"before all" hook' + (title ? ": " + title : "");
    var hook = this._createHook(title, fn);
    this._beforeAll.push(hook);
    this.emit(constants.EVENT_SUITE_ADD_HOOK_BEFORE_ALL, hook);
    return this;
};
/**
 * Run `fn(test[, done])` after running tests.
 *
 * @private
 * @param {string} title
 * @param {Function} fn
 * @return {Suite} for chaining
 */ Suite.prototype.afterAll = function(title, fn) {
    if (this.isPending()) return this;
    if (typeof title === "function") {
        fn = title;
        title = fn.name;
    }
    title = '"after all" hook' + (title ? ": " + title : "");
    var hook = this._createHook(title, fn);
    this._afterAll.push(hook);
    this.emit(constants.EVENT_SUITE_ADD_HOOK_AFTER_ALL, hook);
    return this;
};
/**
 * Run `fn(test[, done])` before each test case.
 *
 * @private
 * @param {string} title
 * @param {Function} fn
 * @return {Suite} for chaining
 */ Suite.prototype.beforeEach = function(title, fn) {
    if (this.isPending()) return this;
    if (typeof title === "function") {
        fn = title;
        title = fn.name;
    }
    title = '"before each" hook' + (title ? ": " + title : "");
    var hook = this._createHook(title, fn);
    this._beforeEach.push(hook);
    this.emit(constants.EVENT_SUITE_ADD_HOOK_BEFORE_EACH, hook);
    return this;
};
/**
 * Run `fn(test[, done])` after each test case.
 *
 * @private
 * @param {string} title
 * @param {Function} fn
 * @return {Suite} for chaining
 */ Suite.prototype.afterEach = function(title, fn) {
    if (this.isPending()) return this;
    if (typeof title === "function") {
        fn = title;
        title = fn.name;
    }
    title = '"after each" hook' + (title ? ": " + title : "");
    var hook = this._createHook(title, fn);
    this._afterEach.push(hook);
    this.emit(constants.EVENT_SUITE_ADD_HOOK_AFTER_EACH, hook);
    return this;
};
/**
 * Add a test `suite`.
 *
 * @private
 * @param {Suite} suite
 * @return {Suite} for chaining
 */ Suite.prototype.addSuite = function(suite) {
    suite.parent = this;
    suite.root = false;
    suite.timeout(this.timeout());
    suite.retries(this.retries());
    suite.slow(this.slow());
    suite.bail(this.bail());
    this.suites.push(suite);
    this.emit(constants.EVENT_SUITE_ADD_SUITE, suite);
    return this;
};
/**
 * Add a `test` to this suite.
 *
 * @private
 * @param {Test} test
 * @return {Suite} for chaining
 */ Suite.prototype.addTest = function(test) {
    test.parent = this;
    test.timeout(this.timeout());
    test.retries(this.retries());
    test.slow(this.slow());
    test.ctx = this.ctx;
    this.tests.push(test);
    this.emit(constants.EVENT_SUITE_ADD_TEST, test);
    return this;
};
/**
 * Return the full title generated by recursively concatenating the parent's
 * full title.
 *
 * @memberof Suite
 * @public
 * @return {string}
 */ Suite.prototype.fullTitle = function() {
    return this.titlePath().join(" ");
};
/**
 * Return the title path generated by recursively concatenating the parent's
 * title path.
 *
 * @memberof Suite
 * @public
 * @return {string}
 */ Suite.prototype.titlePath = function() {
    var result = [];
    if (this.parent) result = result.concat(this.parent.titlePath());
    if (!this.root) result.push(this.title);
    return result;
};
/**
 * Return the total number of tests.
 *
 * @memberof Suite
 * @public
 * @return {number}
 */ Suite.prototype.total = function() {
    return this.suites.reduce(function(sum, suite) {
        return sum + suite.total();
    }, 0) + this.tests.length;
};
/**
 * Iterates through each suite recursively to find all tests. Applies a
 * function in the format `fn(test)`.
 *
 * @private
 * @param {Function} fn
 * @return {Suite}
 */ Suite.prototype.eachTest = function(fn) {
    this.tests.forEach(fn);
    this.suites.forEach(function(suite) {
        suite.eachTest(fn);
    });
    return this;
};
/**
 * This will run the root suite if we happen to be running in delayed mode.
 * @private
 */ Suite.prototype.run = function run() {
    if (this.root) this.emit(constants.EVENT_ROOT_SUITE_RUN);
};
/**
 * Determines whether a suite has an `only` test or suite as a descendant.
 *
 * @private
 * @returns {Boolean}
 */ Suite.prototype.hasOnly = function hasOnly() {
    return this._onlyTests.length > 0 || this._onlySuites.length > 0 || this.suites.some(function(suite) {
        return suite.hasOnly();
    });
};
/**
 * Filter suites based on `isOnly` logic.
 *
 * @private
 * @returns {Boolean}
 */ Suite.prototype.filterOnly = function filterOnly() {
    if (this._onlyTests.length) {
        // If the suite contains `only` tests, run those and ignore any nested suites.
        this.tests = this._onlyTests;
        this.suites = [];
    } else {
        // Otherwise, do not run any of the tests in this suite.
        this.tests = [];
        this._onlySuites.forEach(function(onlySuite) {
            // If there are other `only` tests/suites nested in the current `only` suite, then filter that `only` suite.
            // Otherwise, all of the tests on this `only` suite should be run, so don't filter it.
            if (onlySuite.hasOnly()) onlySuite.filterOnly();
        });
        // Run the `only` suites, as well as any other suites that have `only` tests/suites as descendants.
        var onlySuites = this._onlySuites;
        this.suites = this.suites.filter(function(childSuite) {
            return onlySuites.indexOf(childSuite) !== -1 || childSuite.filterOnly();
        });
    }
    // Keep the suite only if there is something to run
    return this.tests.length > 0 || this.suites.length > 0;
};
/**
 * Adds a suite to the list of subsuites marked `only`.
 *
 * @private
 * @param {Suite} suite
 */ Suite.prototype.appendOnlySuite = function(suite) {
    this._onlySuites.push(suite);
};
/**
 * Marks a suite to be `only`.
 *
 * @private
 */ Suite.prototype.markOnly = function() {
    this.parent && this.parent.appendOnlySuite(this);
};
/**
 * Adds a test to the list of tests marked `only`.
 *
 * @private
 * @param {Test} test
 */ Suite.prototype.appendOnlyTest = function(test) {
    this._onlyTests.push(test);
};
/**
 * Returns the array of hooks by hook name; see `HOOK_TYPE_*` constants.
 * @private
 */ Suite.prototype.getHooks = function getHooks(name) {
    return this["_" + name];
};
/**
 * cleans all references from this suite and all child suites.
 */ Suite.prototype.dispose = function() {
    this.suites.forEach(function(suite) {
        suite.dispose();
    });
    this.cleanReferences();
};
/**
 * Cleans up the references to all the deferred functions
 * (before/after/beforeEach/afterEach) and tests of a Suite.
 * These must be deleted otherwise a memory leak can happen,
 * as those functions may reference variables from closures,
 * thus those variables can never be garbage collected as long
 * as the deferred functions exist.
 *
 * @private
 */ Suite.prototype.cleanReferences = function cleanReferences() {
    function cleanArrReferences(arr) {
        for(var i = 0; i < arr.length; i++)delete arr[i].fn;
    }
    if (Array.isArray(this._beforeAll)) cleanArrReferences(this._beforeAll);
    if (Array.isArray(this._beforeEach)) cleanArrReferences(this._beforeEach);
    if (Array.isArray(this._afterAll)) cleanArrReferences(this._afterAll);
    if (Array.isArray(this._afterEach)) cleanArrReferences(this._afterEach);
    for(var i = 0; i < this.tests.length; i++)delete this.tests[i].fn;
};
/**
 * Returns an object suitable for IPC.
 * Functions are represented by keys beginning with `$$`.
 * @private
 * @returns {Object}
 */ Suite.prototype.serialize = function serialize() {
    return {
        _bail: this._bail,
        $$fullTitle: this.fullTitle(),
        $$isPending: Boolean(this.isPending()),
        root: this.root,
        title: this.title,
        [MOCHA_ID_PROP_NAME]: this.id,
        parent: this.parent ? {
            [MOCHA_ID_PROP_NAME]: this.parent.id
        } : null
    };
};
var constants = defineConstants(/**
   * {@link Suite}-related constants.
   * @public
   * @memberof Suite
   * @alias constants
   * @readonly
   * @static
   * @enum {string}
   */ {
    /**
     * Event emitted after a test file has been loaded. Not emitted in browser.
     */ EVENT_FILE_POST_REQUIRE: "post-require",
    /**
     * Event emitted before a test file has been loaded. In browser, this is emitted once an interface has been selected.
     */ EVENT_FILE_PRE_REQUIRE: "pre-require",
    /**
     * Event emitted immediately after a test file has been loaded. Not emitted in browser.
     */ EVENT_FILE_REQUIRE: "require",
    /**
     * Event emitted when `global.run()` is called (use with `delay` option).
     */ EVENT_ROOT_SUITE_RUN: "run",
    /**
     * Namespace for collection of a `Suite`'s "after all" hooks.
     */ HOOK_TYPE_AFTER_ALL: "afterAll",
    /**
     * Namespace for collection of a `Suite`'s "after each" hooks.
     */ HOOK_TYPE_AFTER_EACH: "afterEach",
    /**
     * Namespace for collection of a `Suite`'s "before all" hooks.
     */ HOOK_TYPE_BEFORE_ALL: "beforeAll",
    /**
     * Namespace for collection of a `Suite`'s "before each" hooks.
     */ HOOK_TYPE_BEFORE_EACH: "beforeEach",
    /**
     * Emitted after a child `Suite` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_SUITE: "suite",
    /**
     * Emitted after an "after all" `Hook` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_HOOK_AFTER_ALL: "afterAll",
    /**
     * Emitted after an "after each" `Hook` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_HOOK_AFTER_EACH: "afterEach",
    /**
     * Emitted after an "before all" `Hook` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_HOOK_BEFORE_ALL: "beforeAll",
    /**
     * Emitted after an "before each" `Hook` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_HOOK_BEFORE_EACH: "beforeEach",
    /**
     * Emitted after a `Test` has been added to a `Suite`.
     */ EVENT_SUITE_ADD_TEST: "test"
});
Suite.constants = constants;

},{"5c417f37629d927f":"1VQLm","547a929ff3f4f4bc":"d6vXk","34489d4e5cf887af":"tLxDb","1e24ca37e007b2ab":"l0oUb","1a1b3ffb905305f1":"jauEe","b37e5b344b74ebf2":"fbJXN"}],"d6vXk":[function(require,module,exports) {
"use strict";
var Runnable = require("857d86af7ee3946a");
const { inherits, constants } = require("f596bd26710b0714");
const { MOCHA_ID_PROP_NAME } = constants;
/**
 * Expose `Hook`.
 */ module.exports = Hook;
/**
 * Initialize a new `Hook` with the given `title` and callback `fn`
 *
 * @class
 * @extends Runnable
 * @param {String} title
 * @param {Function} fn
 */ function Hook(title, fn) {
    Runnable.call(this, title, fn);
    this.type = "hook";
}
/**
 * Inherit from `Runnable.prototype`.
 */ inherits(Hook, Runnable);
/**
 * Resets the state for a next run.
 */ Hook.prototype.reset = function() {
    Runnable.prototype.reset.call(this);
    delete this._error;
};
/**
 * Get or set the test `err`.
 *
 * @memberof Hook
 * @public
 * @param {Error} err
 * @return {Error}
 */ Hook.prototype.error = function(err) {
    if (!arguments.length) {
        err = this._error;
        this._error = null;
        return err;
    }
    this._error = err;
};
/**
 * Returns an object suitable for IPC.
 * Functions are represented by keys beginning with `$$`.
 * @private
 * @returns {Object}
 */ Hook.prototype.serialize = function serialize() {
    return {
        $$currentRetry: this.currentRetry(),
        $$fullTitle: this.fullTitle(),
        $$isPending: Boolean(this.isPending()),
        $$titlePath: this.titlePath(),
        ctx: this.ctx && this.ctx.currentTest ? {
            currentTest: {
                title: this.ctx.currentTest.title,
                [MOCHA_ID_PROP_NAME]: this.ctx.currentTest.id
            }
        } : {},
        duration: this.duration,
        file: this.file,
        parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME]: this.parent.id
        },
        state: this.state,
        title: this.title,
        type: this.type,
        [MOCHA_ID_PROP_NAME]: this.id
    };
};

},{"857d86af7ee3946a":"dIYAm","f596bd26710b0714":"tLxDb"}],"1U48L":[function(require,module,exports) {
var process = require("1301fa3bcf03de50");
"use strict";
/**
 * @module Dot
 */ /**
 * Module dependencies.
 */ var Base = require("60908aa81a4230f");
var inherits = require("702ba2915f2a929f").inherits;
var constants = require("79252aac6f68427c").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_RUN_END = constants.EVENT_RUN_END;
/**
 * Expose `Dot`.
 */ exports = module.exports = Dot;
/**
 * Constructs a new `Dot` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Dot(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var width = Base.window.width * 0.75 | 0;
    var n = -1;
    runner.on(EVENT_RUN_BEGIN, function() {
        process.stdout.write("\n");
    });
    runner.on(EVENT_TEST_PENDING, function() {
        if (++n % width === 0) process.stdout.write("\n  ");
        process.stdout.write(Base.color("pending", Base.symbols.comma));
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        if (++n % width === 0) process.stdout.write("\n  ");
        if (test.speed === "slow") process.stdout.write(Base.color("bright yellow", Base.symbols.dot));
        else process.stdout.write(Base.color(test.speed, Base.symbols.dot));
    });
    runner.on(EVENT_TEST_FAIL, function() {
        if (++n % width === 0) process.stdout.write("\n  ");
        process.stdout.write(Base.color("fail", Base.symbols.bang));
    });
    runner.once(EVENT_RUN_END, function() {
        process.stdout.write("\n");
        self.epilogue();
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(Dot, Base);
Dot.description = "dot matrix representation";

},{"1301fa3bcf03de50":"d5jf4","60908aa81a4230f":"hLmjX","702ba2915f2a929f":"tLxDb","79252aac6f68427c":"9bciI"}],"iNsVl":[function(require,module,exports) {
"use strict";
/**
 * @module Doc
 */ /**
 * Module dependencies.
 */ var Base = require("b5e64f00445a8bc2");
var utils = require("28f22d8809eba407");
var constants = require("99500bc5edf9b72").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
var EVENT_SUITE_END = constants.EVENT_SUITE_END;
/**
 * Expose `Doc`.
 */ exports = module.exports = Doc;
/**
 * Constructs a new `Doc` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Doc(runner, options) {
    Base.call(this, runner, options);
    var indents = 2;
    function indent() {
        return Array(indents).join("  ");
    }
    runner.on(EVENT_SUITE_BEGIN, function(suite) {
        if (suite.root) return;
        ++indents;
        Base.consoleLog('%s<section class="suite">', indent());
        ++indents;
        Base.consoleLog("%s<h1>%s</h1>", indent(), utils.escape(suite.title));
        Base.consoleLog("%s<dl>", indent());
    });
    runner.on(EVENT_SUITE_END, function(suite) {
        if (suite.root) return;
        Base.consoleLog("%s</dl>", indent());
        --indents;
        Base.consoleLog("%s</section>", indent());
        --indents;
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        Base.consoleLog("%s  <dt>%s</dt>", indent(), utils.escape(test.title));
        Base.consoleLog("%s  <dt>%s</dt>", indent(), utils.escape(test.file));
        var code = utils.escape(utils.clean(test.body));
        Base.consoleLog("%s  <dd><pre><code>%s</code></pre></dd>", indent(), code);
    });
    runner.on(EVENT_TEST_FAIL, function(test, err) {
        Base.consoleLog('%s  <dt class="error">%s</dt>', indent(), utils.escape(test.title));
        Base.consoleLog('%s  <dt class="error">%s</dt>', indent(), utils.escape(test.file));
        var code = utils.escape(utils.clean(test.body));
        Base.consoleLog('%s  <dd class="error"><pre><code>%s</code></pre></dd>', indent(), code);
        Base.consoleLog('%s  <dd class="error">%s</dd>', indent(), utils.escape(err));
    });
}
Doc.description = "HTML documentation";

},{"b5e64f00445a8bc2":"hLmjX","28f22d8809eba407":"tLxDb","99500bc5edf9b72":"9bciI"}],"49hq1":[function(require,module,exports) {
var process = require("70e538ec628baceb");
"use strict";
/**
 * @module TAP
 */ /**
 * Module dependencies.
 */ var util = require("6510cd0766a7ad11");
var Base = require("b770c192a27e39d8");
var constants = require("6efb3e328d6eb0e8").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var inherits = require("b2059822cac0d6c5").inherits;
var sprintf = util.format;
/**
 * Expose `TAP`.
 */ exports = module.exports = TAP;
/**
 * Constructs a new `TAP` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function TAP(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var n = 1;
    var tapVersion = "12";
    if (options && options.reporterOptions) {
        if (options.reporterOptions.tapVersion) tapVersion = options.reporterOptions.tapVersion.toString();
    }
    this._producer = createProducer(tapVersion);
    runner.once(EVENT_RUN_BEGIN, function() {
        self._producer.writeVersion();
    });
    runner.on(EVENT_TEST_END, function() {
        ++n;
    });
    runner.on(EVENT_TEST_PENDING, function(test) {
        self._producer.writePending(n, test);
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        self._producer.writePass(n, test);
    });
    runner.on(EVENT_TEST_FAIL, function(test, err) {
        self._producer.writeFail(n, test, err);
    });
    runner.once(EVENT_RUN_END, function() {
        self._producer.writeEpilogue(runner.stats);
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(TAP, Base);
/**
 * Returns a TAP-safe title of `test`.
 *
 * @private
 * @param {Test} test - Test instance.
 * @return {String} title with any hash character removed
 */ function title(test) {
    return test.fullTitle().replace(/#/g, "");
}
/**
 * Writes newline-terminated formatted string to reporter output stream.
 *
 * @private
 * @param {string} format - `printf`-like format string
 * @param {...*} [varArgs] - Format string arguments
 */ function println(format, varArgs) {
    var vargs = Array.from(arguments);
    vargs[0] += "\n";
    process.stdout.write(sprintf.apply(null, vargs));
}
/**
 * Returns a `tapVersion`-appropriate TAP producer instance, if possible.
 *
 * @private
 * @param {string} tapVersion - Version of TAP specification to produce.
 * @returns {TAPProducer} specification-appropriate instance
 * @throws {Error} if specification version has no associated producer.
 */ function createProducer(tapVersion) {
    var producers = {
        12: new TAP12Producer(),
        13: new TAP13Producer()
    };
    var producer = producers[tapVersion];
    if (!producer) throw new Error("invalid or unsupported TAP version: " + JSON.stringify(tapVersion));
    return producer;
}
/**
 * @summary
 * Constructs a new TAPProducer.
 *
 * @description
 * <em>Only</em> to be used as an abstract base class.
 *
 * @private
 * @constructor
 */ function TAPProducer() {}
/**
 * Writes the TAP version to reporter output stream.
 *
 * @abstract
 */ TAPProducer.prototype.writeVersion = function() {};
/**
 * Writes the plan to reporter output stream.
 *
 * @abstract
 * @param {number} ntests - Number of tests that are planned to run.
 */ TAPProducer.prototype.writePlan = function(ntests) {
    println("%d..%d", 1, ntests);
};
/**
 * Writes that test passed to reporter output stream.
 *
 * @abstract
 * @param {number} n - Index of test that passed.
 * @param {Test} test - Instance containing test information.
 */ TAPProducer.prototype.writePass = function(n, test) {
    println("ok %d %s", n, title(test));
};
/**
 * Writes that test was skipped to reporter output stream.
 *
 * @abstract
 * @param {number} n - Index of test that was skipped.
 * @param {Test} test - Instance containing test information.
 */ TAPProducer.prototype.writePending = function(n, test) {
    println("ok %d %s # SKIP -", n, title(test));
};
/**
 * Writes that test failed to reporter output stream.
 *
 * @abstract
 * @param {number} n - Index of test that failed.
 * @param {Test} test - Instance containing test information.
 * @param {Error} err - Reason the test failed.
 */ TAPProducer.prototype.writeFail = function(n, test, err) {
    println("not ok %d %s", n, title(test));
};
/**
 * Writes the summary epilogue to reporter output stream.
 *
 * @abstract
 * @param {Object} stats - Object containing run statistics.
 */ TAPProducer.prototype.writeEpilogue = function(stats) {
    // :TBD: Why is this not counting pending tests?
    println("# tests " + (stats.passes + stats.failures));
    println("# pass " + stats.passes);
    // :TBD: Why are we not showing pending results?
    println("# fail " + stats.failures);
    this.writePlan(stats.passes + stats.failures + stats.pending);
};
/**
 * @summary
 * Constructs a new TAP12Producer.
 *
 * @description
 * Produces output conforming to the TAP12 specification.
 *
 * @private
 * @constructor
 * @extends TAPProducer
 * @see {@link https://testanything.org/tap-specification.html|Specification}
 */ function TAP12Producer() {
    /**
   * Writes that test failed to reporter output stream, with error formatting.
   * @override
   */ this.writeFail = function(n, test, err) {
        TAPProducer.prototype.writeFail.call(this, n, test, err);
        if (err.message) println(err.message.replace(/^/gm, "  "));
        if (err.stack) println(err.stack.replace(/^/gm, "  "));
    };
}
/**
 * Inherit from `TAPProducer.prototype`.
 */ inherits(TAP12Producer, TAPProducer);
/**
 * @summary
 * Constructs a new TAP13Producer.
 *
 * @description
 * Produces output conforming to the TAP13 specification.
 *
 * @private
 * @constructor
 * @extends TAPProducer
 * @see {@link https://testanything.org/tap-version-13-specification.html|Specification}
 */ function TAP13Producer() {
    /**
   * Writes the TAP version to reporter output stream.
   * @override
   */ this.writeVersion = function() {
        println("TAP version 13");
    };
    /**
   * Writes that test failed to reporter output stream, with error formatting.
   * @override
   */ this.writeFail = function(n, test, err) {
        TAPProducer.prototype.writeFail.call(this, n, test, err);
        var emitYamlBlock = err.message != null || err.stack != null;
        if (emitYamlBlock) {
            println(indent(1) + "---");
            if (err.message) {
                println(indent(2) + "message: |-");
                println(err.message.replace(/^/gm, indent(3)));
            }
            if (err.stack) {
                println(indent(2) + "stack: |-");
                println(err.stack.replace(/^/gm, indent(3)));
            }
            println(indent(1) + "...");
        }
    };
    function indent(level) {
        return Array(level + 1).join("  ");
    }
}
/**
 * Inherit from `TAPProducer.prototype`.
 */ inherits(TAP13Producer, TAPProducer);
TAP.description = "TAP-compatible output";

},{"70e538ec628baceb":"d5jf4","6510cd0766a7ad11":"cxohQ","b770c192a27e39d8":"hLmjX","6efb3e328d6eb0e8":"9bciI","b2059822cac0d6c5":"tLxDb"}],"dI5He":[function(require,module,exports) {
var process = require("118d2f9306ce51de");
"use strict";
/**
 * @module JSON
 */ /**
 * Module dependencies.
 */ var Base = require("2d82b3f477347d06");
var fs = require("804cc9a05fad6098");
var path = require("afc318c575aaba07");
const createUnsupportedError = require("734d09a07bce4aa7").createUnsupportedError;
const utils = require("b01b4b37b69993e1");
var constants = require("cfa5a210cb26a341").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var EVENT_RUN_END = constants.EVENT_RUN_END;
/**
 * Expose `JSON`.
 */ exports = module.exports = JSONReporter;
/**
 * Constructs a new `JSON` reporter instance.
 *
 * @public
 * @class JSON
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function JSONReporter(runner, options = {}) {
    Base.call(this, runner, options);
    var self = this;
    var tests = [];
    var pending = [];
    var failures = [];
    var passes = [];
    var output;
    if (options.reporterOption && options.reporterOption.output) {
        if (utils.isBrowser()) throw createUnsupportedError("file output not supported in browser");
        output = options.reporterOption.output;
    }
    runner.on(EVENT_TEST_END, function(test) {
        tests.push(test);
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        passes.push(test);
    });
    runner.on(EVENT_TEST_FAIL, function(test) {
        failures.push(test);
    });
    runner.on(EVENT_TEST_PENDING, function(test) {
        pending.push(test);
    });
    runner.once(EVENT_RUN_END, function() {
        var obj = {
            stats: self.stats,
            tests: tests.map(clean),
            pending: pending.map(clean),
            failures: failures.map(clean),
            passes: passes.map(clean)
        };
        runner.testResults = obj;
        var json = JSON.stringify(obj, null, 2);
        if (output) try {
            fs.mkdirSync(path.dirname(output), {
                recursive: true
            });
            fs.writeFileSync(output, json);
        } catch (err) {
            console.error(`${Base.symbols.err} [mocha] writing output to "${output}" failed: ${err.message}\n`);
            process.stdout.write(json);
        }
        else process.stdout.write(json);
    });
}
/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @private
 * @param {Object} test
 * @return {Object}
 */ function clean(test) {
    var err = test.err || {};
    if (err instanceof Error) err = errorJSON(err);
    return {
        title: test.title,
        fullTitle: test.fullTitle(),
        file: test.file,
        duration: test.duration,
        currentRetry: test.currentRetry(),
        speed: test.speed,
        err: cleanCycles(err)
    };
}
/**
 * Replaces any circular references inside `obj` with '[object Object]'
 *
 * @private
 * @param {Object} obj
 * @return {Object}
 */ function cleanCycles(obj) {
    var cache = [];
    return JSON.parse(JSON.stringify(obj, function(key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) // Instead of going in a circle, we'll print [object Object]
            return "" + value;
            cache.push(value);
        }
        return value;
    }));
}
/**
 * Transform an Error object into a JSON object.
 *
 * @private
 * @param {Error} err
 * @return {Object}
 */ function errorJSON(err) {
    var res = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
        res[key] = err[key];
    }, err);
    return res;
}
JSONReporter.description = "single JSON object";

},{"118d2f9306ce51de":"d5jf4","2d82b3f477347d06":"hLmjX","804cc9a05fad6098":"jhUEF","afc318c575aaba07":"jhUEF","734d09a07bce4aa7":"fbJXN","b01b4b37b69993e1":"tLxDb","cfa5a210cb26a341":"9bciI"}],"6LzeA":[function(require,module,exports) {
var global = arguments[3];
"use strict";
/* eslint-env browser */ /**
 * @module HTML
 */ /**
 * Module dependencies.
 */ var Base = require("30563f410732836e");
var utils = require("69c944ac821f65df");
var Progress = require("a589a2ce259e9267");
var escapeRe = require("aece9ccbb6a4ca2d");
var constants = require("dae62579f274391e").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
var EVENT_SUITE_END = constants.EVENT_SUITE_END;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var escape = utils.escape;
/**
 * Save timer references to avoid Sinon interfering (see GH-237).
 */ var Date = global.Date;
/**
 * Expose `HTML`.
 */ exports = module.exports = HTML;
/**
 * Stats template.
 */ var statsTemplate = '<ul id="mocha-stats"><li class="progress"><canvas width="40" height="40"></canvas></li><li class="passes"><a href="javascript:void(0);">passes:</a> <em>0</em></li><li class="failures"><a href="javascript:void(0);">failures:</a> <em>0</em></li><li class="duration">duration: <em>0</em>s</li></ul>';
var playIcon = "&#x2023;";
/**
 * Constructs a new `HTML` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function HTML(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var stats = this.stats;
    var stat = fragment(statsTemplate);
    var items = stat.getElementsByTagName("li");
    var passes = items[1].getElementsByTagName("em")[0];
    var passesLink = items[1].getElementsByTagName("a")[0];
    var failures = items[2].getElementsByTagName("em")[0];
    var failuresLink = items[2].getElementsByTagName("a")[0];
    var duration = items[3].getElementsByTagName("em")[0];
    var canvas = stat.getElementsByTagName("canvas")[0];
    var report = fragment('<ul id="mocha-report"></ul>');
    var stack = [
        report
    ];
    var progress;
    var ctx;
    var root = document.getElementById("mocha");
    if (canvas.getContext) {
        var ratio = window.devicePixelRatio || 1;
        canvas.style.width = canvas.width;
        canvas.style.height = canvas.height;
        canvas.width *= ratio;
        canvas.height *= ratio;
        ctx = canvas.getContext("2d");
        ctx.scale(ratio, ratio);
        progress = new Progress();
    }
    if (!root) return error("#mocha div missing, add it to your document");
    // pass toggle
    on(passesLink, "click", function(evt) {
        evt.preventDefault();
        unhide();
        var name = /pass/.test(report.className) ? "" : " pass";
        report.className = report.className.replace(/fail|pass/g, "") + name;
        if (report.className.trim()) hideSuitesWithout("test pass");
    });
    // failure toggle
    on(failuresLink, "click", function(evt) {
        evt.preventDefault();
        unhide();
        var name = /fail/.test(report.className) ? "" : " fail";
        report.className = report.className.replace(/fail|pass/g, "") + name;
        if (report.className.trim()) hideSuitesWithout("test fail");
    });
    root.appendChild(stat);
    root.appendChild(report);
    if (progress) progress.size(40);
    runner.on(EVENT_SUITE_BEGIN, function(suite) {
        if (suite.root) return;
        // suite
        var url = self.suiteURL(suite);
        var el = fragment('<li class="suite"><h1><a href="%s">%s</a></h1></li>', url, escape(suite.title));
        // container
        stack[0].appendChild(el);
        stack.unshift(document.createElement("ul"));
        el.appendChild(stack[0]);
    });
    runner.on(EVENT_SUITE_END, function(suite) {
        if (suite.root) {
            updateStats();
            return;
        }
        stack.shift();
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        var url = self.testURL(test);
        var markup = '<li class="test pass %e"><h2>%e<span class="duration">%ems</span> <a href="%s" class="replay">' + playIcon + "</a></h2></li>";
        var el = fragment(markup, test.speed, test.title, test.duration, url);
        self.addCodeToggle(el, test.body);
        appendToStack(el);
        updateStats();
    });
    runner.on(EVENT_TEST_FAIL, function(test) {
        var el = fragment('<li class="test fail"><h2>%e <a href="%e" class="replay">' + playIcon + "</a></h2></li>", test.title, self.testURL(test));
        var stackString; // Note: Includes leading newline
        var message = test.err.toString();
        // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
        // check for the result of the stringifying.
        if (message === "[object Error]") message = test.err.message;
        if (test.err.stack) {
            var indexOfMessage = test.err.stack.indexOf(test.err.message);
            if (indexOfMessage === -1) stackString = test.err.stack;
            else stackString = test.err.stack.slice(test.err.message.length + indexOfMessage);
        } else if (test.err.sourceURL && test.err.line !== undefined) // Safari doesn't give you a stack. Let's at least provide a source line.
        stackString = "\n(" + test.err.sourceURL + ":" + test.err.line + ")";
        stackString = stackString || "";
        if (test.err.htmlMessage && stackString) el.appendChild(fragment('<div class="html-error">%s\n<pre class="error">%e</pre></div>', test.err.htmlMessage, stackString));
        else if (test.err.htmlMessage) el.appendChild(fragment('<div class="html-error">%s</div>', test.err.htmlMessage));
        else el.appendChild(fragment('<pre class="error">%e%e</pre>', message, stackString));
        self.addCodeToggle(el, test.body);
        appendToStack(el);
        updateStats();
    });
    runner.on(EVENT_TEST_PENDING, function(test) {
        var el = fragment('<li class="test pass pending"><h2>%e</h2></li>', test.title);
        appendToStack(el);
        updateStats();
    });
    function appendToStack(el) {
        // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.
        if (stack[0]) stack[0].appendChild(el);
    }
    function updateStats() {
        // TODO: add to stats
        var percent = stats.tests / runner.total * 100 | 0;
        if (progress) progress.update(percent).draw(ctx);
        // update stats
        var ms = new Date() - stats.start;
        text(passes, stats.passes);
        text(failures, stats.failures);
        text(duration, (ms / 1000).toFixed(2));
    }
}
/**
 * Makes a URL, preserving querystring ("search") parameters.
 *
 * @param {string} s
 * @return {string} A new URL.
 */ function makeUrl(s) {
    var search = window.location.search;
    // Remove previous grep query parameter if present
    if (search) search = search.replace(/[?&]grep=[^&\s]*/g, "").replace(/^&/, "?");
    return window.location.pathname + (search ? search + "&" : "?") + "grep=" + encodeURIComponent(escapeRe(s));
}
/**
 * Provide suite URL.
 *
 * @param {Object} [suite]
 */ HTML.prototype.suiteURL = function(suite) {
    return makeUrl(suite.fullTitle());
};
/**
 * Provide test URL.
 *
 * @param {Object} [test]
 */ HTML.prototype.testURL = function(test) {
    return makeUrl(test.fullTitle());
};
/**
 * Adds code toggle functionality for the provided test's list element.
 *
 * @param {HTMLLIElement} el
 * @param {string} contents
 */ HTML.prototype.addCodeToggle = function(el, contents) {
    var h2 = el.getElementsByTagName("h2")[0];
    on(h2, "click", function() {
        pre.style.display = pre.style.display === "none" ? "block" : "none";
    });
    var pre = fragment("<pre><code>%e</code></pre>", utils.clean(contents));
    el.appendChild(pre);
    pre.style.display = "none";
};
/**
 * Display error `msg`.
 *
 * @param {string} msg
 */ function error(msg) {
    document.body.appendChild(fragment('<div id="mocha-error">%s</div>', msg));
}
/**
 * Return a DOM fragment from `html`.
 *
 * @param {string} html
 */ function fragment(html) {
    var args = arguments;
    var div = document.createElement("div");
    var i = 1;
    div.innerHTML = html.replace(/%([se])/g, function(_, type) {
        switch(type){
            case "s":
                return String(args[i++]);
            case "e":
                return escape(args[i++]);
        }
    });
    return div.firstChild;
}
/**
 * Check for suites that do not have elements
 * with `classname`, and hide them.
 *
 * @param {text} classname
 */ function hideSuitesWithout(classname) {
    var suites = document.getElementsByClassName("suite");
    for(var i = 0; i < suites.length; i++){
        var els = suites[i].getElementsByClassName(classname);
        if (!els.length) suites[i].className += " hidden";
    }
}
/**
 * Unhide .hidden suites.
 */ function unhide() {
    var els = document.getElementsByClassName("suite hidden");
    while(els.length > 0)els[0].className = els[0].className.replace("suite hidden", "suite");
}
/**
 * Set an element's text contents.
 *
 * @param {HTMLElement} el
 * @param {string} contents
 */ function text(el, contents) {
    if (el.textContent) el.textContent = contents;
    else el.innerText = contents;
}
/**
 * Listen on `event` with callback `fn`.
 */ function on(el, event, fn) {
    if (el.addEventListener) el.addEventListener(event, fn, false);
    else el.attachEvent("on" + event, fn);
}
HTML.browserOnly = true;

},{"30563f410732836e":"hLmjX","69c944ac821f65df":"tLxDb","a589a2ce259e9267":"2LZr6","aece9ccbb6a4ca2d":"kqFAt","dae62579f274391e":"9bciI"}],"2LZr6":[function(require,module,exports) {
"use strict";
/**
 @module browser/Progress
*/ /**
 * Expose `Progress`.
 */ module.exports = Progress;
/**
 * Initialize a new `Progress` indicator.
 */ function Progress() {
    this.percent = 0;
    this.size(0);
    this.fontSize(11);
    this.font("helvetica, arial, sans-serif");
}
/**
 * Set progress size to `size`.
 *
 * @public
 * @param {number} size
 * @return {Progress} Progress instance.
 */ Progress.prototype.size = function(size) {
    this._size = size;
    return this;
};
/**
 * Set text to `text`.
 *
 * @public
 * @param {string} text
 * @return {Progress} Progress instance.
 */ Progress.prototype.text = function(text) {
    this._text = text;
    return this;
};
/**
 * Set font size to `size`.
 *
 * @public
 * @param {number} size
 * @return {Progress} Progress instance.
 */ Progress.prototype.fontSize = function(size) {
    this._fontSize = size;
    return this;
};
/**
 * Set font to `family`.
 *
 * @param {string} family
 * @return {Progress} Progress instance.
 */ Progress.prototype.font = function(family) {
    this._font = family;
    return this;
};
/**
 * Update percentage to `n`.
 *
 * @param {number} n
 * @return {Progress} Progress instance.
 */ Progress.prototype.update = function(n) {
    this.percent = n;
    return this;
};
/**
 * Draw on `ctx`.
 *
 * @param {CanvasRenderingContext2d} ctx
 * @return {Progress} Progress instance.
 */ Progress.prototype.draw = function(ctx) {
    try {
        var darkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
        var isDarkMode = !!darkMatcher.matches;
        var lightColors = {
            outerCircle: "#9f9f9f",
            innerCircle: "#eee",
            text: "#000"
        };
        var darkColors = {
            outerCircle: "#888",
            innerCircle: "#444",
            text: "#fff"
        };
        var colors = isDarkMode ? darkColors : lightColors;
        var percent = Math.min(this.percent, 100);
        var size = this._size;
        var half = size / 2;
        var x = half;
        var y = half;
        var rad = half - 1;
        var fontSize = this._fontSize;
        ctx.font = fontSize + "px " + this._font;
        var angle = Math.PI * 2 * (percent / 100);
        ctx.clearRect(0, 0, size, size);
        // outer circle
        ctx.strokeStyle = colors.outerCircle;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, angle, false);
        ctx.stroke();
        // inner circle
        ctx.strokeStyle = colors.innerCircle;
        ctx.beginPath();
        ctx.arc(x, y, rad - 1, 0, angle, true);
        ctx.stroke();
        // text
        var text = this._text || (percent | 0) + "%";
        var w = ctx.measureText(text).width;
        ctx.fillStyle = colors.text;
        ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);
    } catch (ignore) {
    // don't fail if we can't render progress
    }
    return this;
};

},{}],"6wP3F":[function(require,module,exports) {
var process = require("79f277efa3e7c392");
"use strict";
/**
 * @module List
 */ /**
 * Module dependencies.
 */ var Base = require("517675ab0873980c");
var inherits = require("6fa498031e940687").inherits;
var constants = require("8874942e44246f4").constants;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_BEGIN = constants.EVENT_TEST_BEGIN;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var color = Base.color;
var cursor = Base.cursor;
/**
 * Expose `List`.
 */ exports = module.exports = List;
/**
 * Constructs a new `List` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function List(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var n = 0;
    runner.on(EVENT_RUN_BEGIN, function() {
        Base.consoleLog();
    });
    runner.on(EVENT_TEST_BEGIN, function(test) {
        process.stdout.write(color("pass", "    " + test.fullTitle() + ": "));
    });
    runner.on(EVENT_TEST_PENDING, function(test) {
        var fmt = color("checkmark", "  -") + color("pending", " %s");
        Base.consoleLog(fmt, test.fullTitle());
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        var fmt = color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s: ") + color(test.speed, "%dms");
        cursor.CR();
        Base.consoleLog(fmt, test.fullTitle(), test.duration);
    });
    runner.on(EVENT_TEST_FAIL, function(test) {
        cursor.CR();
        Base.consoleLog(color("fail", "  %d) %s"), ++n, test.fullTitle());
    });
    runner.once(EVENT_RUN_END, self.epilogue.bind(self));
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(List, Base);
List.description = 'like "spec" reporter but flat';

},{"79f277efa3e7c392":"d5jf4","517675ab0873980c":"hLmjX","6fa498031e940687":"tLxDb","8874942e44246f4":"9bciI"}],"8oohP":[function(require,module,exports) {
var process = require("11fb1ba602771d31");
"use strict";
/**
 * @module Min
 */ /**
 * Module dependencies.
 */ var Base = require("4512ed1dec1ce1a");
var inherits = require("fb201e7aaf8361eb").inherits;
var constants = require("53c9c3aad0169495").constants;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
/**
 * Expose `Min`.
 */ exports = module.exports = Min;
/**
 * Constructs a new `Min` reporter instance.
 *
 * @description
 * This minimal test reporter is best used with '--watch'.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Min(runner, options) {
    Base.call(this, runner, options);
    runner.on(EVENT_RUN_BEGIN, function() {
        // clear screen
        process.stdout.write("\x1b[2J");
        // set cursor position
        process.stdout.write("\x1b[1;3H");
    });
    runner.once(EVENT_RUN_END, this.epilogue.bind(this));
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(Min, Base);
Min.description = "essentially just a summary";

},{"11fb1ba602771d31":"d5jf4","4512ed1dec1ce1a":"hLmjX","fb201e7aaf8361eb":"tLxDb","53c9c3aad0169495":"9bciI"}],"d8QwL":[function(require,module,exports) {
"use strict";
/**
 * @module Spec
 */ /**
 * Module dependencies.
 */ var Base = require("5ab5416cf5dc1d68");
var constants = require("e15d2f756f965222").constants;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
var EVENT_SUITE_END = constants.EVENT_SUITE_END;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var inherits = require("c0c2fb68e60d8d32").inherits;
var color = Base.color;
/**
 * Expose `Spec`.
 */ exports = module.exports = Spec;
/**
 * Constructs a new `Spec` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Spec(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var indents = 0;
    var n = 0;
    function indent() {
        return Array(indents).join("  ");
    }
    runner.on(EVENT_RUN_BEGIN, function() {
        Base.consoleLog();
    });
    runner.on(EVENT_SUITE_BEGIN, function(suite) {
        ++indents;
        Base.consoleLog(color("suite", "%s%s"), indent(), suite.title);
    });
    runner.on(EVENT_SUITE_END, function() {
        --indents;
        if (indents === 1) Base.consoleLog();
    });
    runner.on(EVENT_TEST_PENDING, function(test) {
        var fmt = indent() + color("pending", "  - %s");
        Base.consoleLog(fmt, test.title);
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        var fmt;
        if (test.speed === "fast") {
            fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s");
            Base.consoleLog(fmt, test.title);
        } else {
            fmt = indent() + color("checkmark", "  " + Base.symbols.ok) + color("pass", " %s") + color(test.speed, " (%dms)");
            Base.consoleLog(fmt, test.title, test.duration);
        }
    });
    runner.on(EVENT_TEST_FAIL, function(test) {
        Base.consoleLog(indent() + color("fail", "  %d) %s"), ++n, test.title);
    });
    runner.once(EVENT_RUN_END, self.epilogue.bind(self));
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(Spec, Base);
Spec.description = "hierarchical & verbose [default]";

},{"5ab5416cf5dc1d68":"hLmjX","e15d2f756f965222":"9bciI","c0c2fb68e60d8d32":"tLxDb"}],"3WLr6":[function(require,module,exports) {
var process = require("5c2fe66088f60bed");
"use strict";
/**
 * @module Nyan
 */ /**
 * Module dependencies.
 */ var Base = require("b7250ce7c202df5c");
var constants = require("1897c8e17f2ee22e").constants;
var inherits = require("7244d9aa37ce222e").inherits;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
/**
 * Expose `Dot`.
 */ exports = module.exports = NyanCat;
/**
 * Constructs a new `Nyan` reporter instance.
 *
 * @public
 * @class Nyan
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function NyanCat(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var width = Base.window.width * 0.75 | 0;
    var nyanCatWidth = this.nyanCatWidth = 11;
    this.colorIndex = 0;
    this.numberOfLines = 4;
    this.rainbowColors = self.generateColors();
    this.scoreboardWidth = 5;
    this.tick = 0;
    this.trajectories = [
        [],
        [],
        [],
        []
    ];
    this.trajectoryWidthMax = width - nyanCatWidth;
    runner.on(EVENT_RUN_BEGIN, function() {
        Base.cursor.hide();
        self.draw();
    });
    runner.on(EVENT_TEST_PENDING, function() {
        self.draw();
    });
    runner.on(EVENT_TEST_PASS, function() {
        self.draw();
    });
    runner.on(EVENT_TEST_FAIL, function() {
        self.draw();
    });
    runner.once(EVENT_RUN_END, function() {
        Base.cursor.show();
        for(var i = 0; i < self.numberOfLines; i++)write("\n");
        self.epilogue();
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(NyanCat, Base);
/**
 * Draw the nyan cat
 *
 * @private
 */ NyanCat.prototype.draw = function() {
    this.appendRainbow();
    this.drawScoreboard();
    this.drawRainbow();
    this.drawNyanCat();
    this.tick = !this.tick;
};
/**
 * Draw the "scoreboard" showing the number
 * of passes, failures and pending tests.
 *
 * @private
 */ NyanCat.prototype.drawScoreboard = function() {
    var stats = this.stats;
    function draw(type, n) {
        write(" ");
        write(Base.color(type, n));
        write("\n");
    }
    draw("green", stats.passes);
    draw("fail", stats.failures);
    draw("pending", stats.pending);
    write("\n");
    this.cursorUp(this.numberOfLines);
};
/**
 * Append the rainbow.
 *
 * @private
 */ NyanCat.prototype.appendRainbow = function() {
    var segment = this.tick ? "_" : "-";
    var rainbowified = this.rainbowify(segment);
    for(var index = 0; index < this.numberOfLines; index++){
        var trajectory = this.trajectories[index];
        if (trajectory.length >= this.trajectoryWidthMax) trajectory.shift();
        trajectory.push(rainbowified);
    }
};
/**
 * Draw the rainbow.
 *
 * @private
 */ NyanCat.prototype.drawRainbow = function() {
    var self = this;
    this.trajectories.forEach(function(line) {
        write("\x1b[" + self.scoreboardWidth + "C");
        write(line.join(""));
        write("\n");
    });
    this.cursorUp(this.numberOfLines);
};
/**
 * Draw the nyan cat
 *
 * @private
 */ NyanCat.prototype.drawNyanCat = function() {
    var self = this;
    var startWidth = this.scoreboardWidth + this.trajectories[0].length;
    var dist = "\x1b[" + startWidth + "C";
    var padding = "";
    write(dist);
    write("_,------,");
    write("\n");
    write(dist);
    padding = self.tick ? "  " : "   ";
    write("_|" + padding + "/\\_/\\ ");
    write("\n");
    write(dist);
    padding = self.tick ? "_" : "__";
    var tail = self.tick ? "~" : "^";
    write(tail + "|" + padding + this.face() + " ");
    write("\n");
    write(dist);
    padding = self.tick ? " " : "  ";
    write(padding + '""  "" ');
    write("\n");
    this.cursorUp(this.numberOfLines);
};
/**
 * Draw nyan cat face.
 *
 * @private
 * @return {string}
 */ NyanCat.prototype.face = function() {
    var stats = this.stats;
    if (stats.failures) return "( x .x)";
    else if (stats.pending) return "( o .o)";
    else if (stats.passes) return "( ^ .^)";
    return "( - .-)";
};
/**
 * Move cursor up `n`.
 *
 * @private
 * @param {number} n
 */ NyanCat.prototype.cursorUp = function(n) {
    write("\x1b[" + n + "A");
};
/**
 * Move cursor down `n`.
 *
 * @private
 * @param {number} n
 */ NyanCat.prototype.cursorDown = function(n) {
    write("\x1b[" + n + "B");
};
/**
 * Generate rainbow colors.
 *
 * @private
 * @return {Array}
 */ NyanCat.prototype.generateColors = function() {
    var colors = [];
    for(var i = 0; i < 42; i++){
        var pi3 = Math.floor(Math.PI / 3);
        var n = i * (1.0 / 6);
        var r = Math.floor(3 * Math.sin(n) + 3);
        var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
        var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
        colors.push(36 * r + 6 * g + b + 16);
    }
    return colors;
};
/**
 * Apply rainbow to the given `str`.
 *
 * @private
 * @param {string} str
 * @return {string}
 */ NyanCat.prototype.rainbowify = function(str) {
    if (!Base.useColors) return str;
    var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];
    this.colorIndex += 1;
    return "\x1b[38;5;" + color + "m" + str + "\x1b[0m";
};
/**
 * Stdout helper.
 *
 * @param {string} string A message to write to stdout.
 */ function write(string) {
    process.stdout.write(string);
}
NyanCat.description = '"nyan cat"';

},{"5c2fe66088f60bed":"d5jf4","b7250ce7c202df5c":"hLmjX","1897c8e17f2ee22e":"9bciI","7244d9aa37ce222e":"tLxDb"}],"4sSiG":[function(require,module,exports) {
var global = arguments[3];
var process = require("dce42cb6ebdcc702");
"use strict";
/**
 * @module XUnit
 */ /**
 * Module dependencies.
 */ var Base = require("90b59cf2f020033d");
var utils = require("b3a691741ec33256");
var fs = require("22118a9b879ad1fd");
var path = require("f8d7d63f057f1b23");
var errors = require("af3aef437f578525");
var createUnsupportedError = errors.createUnsupportedError;
var constants = require("dee0c1bb072dc1ef").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var STATE_FAILED = require("779008c395f62586").constants.STATE_FAILED;
var inherits = utils.inherits;
var escape = utils.escape;
/**
 * Save timer references to avoid Sinon interfering (see GH-237).
 */ var Date = global.Date;
/**
 * Expose `XUnit`.
 */ exports = module.exports = XUnit;
/**
 * Constructs a new `XUnit` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function XUnit(runner, options) {
    Base.call(this, runner, options);
    var stats = this.stats;
    var tests = [];
    var self = this;
    // the name of the test suite, as it will appear in the resulting XML file
    var suiteName;
    // the default name of the test suite if none is provided
    var DEFAULT_SUITE_NAME = "Mocha Tests";
    if (options && options.reporterOptions) {
        if (options.reporterOptions.output) {
            if (!fs.createWriteStream) throw createUnsupportedError("file output not supported in browser");
            fs.mkdirSync(path.dirname(options.reporterOptions.output), {
                recursive: true
            });
            self.fileStream = fs.createWriteStream(options.reporterOptions.output);
        }
        // get the suite name from the reporter options (if provided)
        suiteName = options.reporterOptions.suiteName;
    }
    // fall back to the default suite name
    suiteName = suiteName || DEFAULT_SUITE_NAME;
    runner.on(EVENT_TEST_PENDING, function(test) {
        tests.push(test);
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        tests.push(test);
    });
    runner.on(EVENT_TEST_FAIL, function(test) {
        tests.push(test);
    });
    runner.once(EVENT_RUN_END, function() {
        self.write(tag("testsuite", {
            name: suiteName,
            tests: stats.tests,
            failures: 0,
            errors: stats.failures,
            skipped: stats.tests - stats.failures - stats.passes,
            timestamp: new Date().toUTCString(),
            time: stats.duration / 1000 || 0
        }, false));
        tests.forEach(function(t) {
            self.test(t);
        });
        self.write("</testsuite>");
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(XUnit, Base);
/**
 * Override done to close the stream (if it's a file).
 *
 * @param failures
 * @param {Function} fn
 */ XUnit.prototype.done = function(failures, fn) {
    if (this.fileStream) this.fileStream.end(function() {
        fn(failures);
    });
    else fn(failures);
};
/**
 * Write out the given line.
 *
 * @param {string} line
 */ XUnit.prototype.write = function(line) {
    if (this.fileStream) this.fileStream.write(line + "\n");
    else if (typeof process === "object" && process.stdout) process.stdout.write(line + "\n");
    else Base.consoleLog(line);
};
/**
 * Output tag for the given `test.`
 *
 * @param {Test} test
 */ XUnit.prototype.test = function(test) {
    Base.useColors = false;
    var attrs = {
        classname: test.parent.fullTitle(),
        name: test.title,
        time: test.duration / 1000 || 0
    };
    if (test.state === STATE_FAILED) {
        var err = test.err;
        var diff = !Base.hideDiff && Base.showDiff(err) ? "\n" + Base.generateDiff(err.actual, err.expected) : "";
        this.write(tag("testcase", attrs, false, tag("failure", {}, false, escape(err.message) + escape(diff) + "\n" + escape(err.stack))));
    } else if (test.isPending()) this.write(tag("testcase", attrs, false, tag("skipped", {}, true)));
    else this.write(tag("testcase", attrs, true));
};
/**
 * HTML tag helper.
 *
 * @param name
 * @param attrs
 * @param close
 * @param content
 * @return {string}
 */ function tag(name, attrs, close, content) {
    var end = close ? "/>" : ">";
    var pairs = [];
    var tag;
    for(var key in attrs)if (Object.prototype.hasOwnProperty.call(attrs, key)) pairs.push(key + '="' + escape(attrs[key]) + '"');
    tag = "<" + name + (pairs.length ? " " + pairs.join(" ") : "") + end;
    if (content) tag += content + "</" + name + end;
    return tag;
}
XUnit.description = "XUnit-compatible XML output";

},{"dce42cb6ebdcc702":"d5jf4","90b59cf2f020033d":"hLmjX","b3a691741ec33256":"tLxDb","22118a9b879ad1fd":"jhUEF","f8d7d63f057f1b23":"jhUEF","af3aef437f578525":"fbJXN","dee0c1bb072dc1ef":"9bciI","779008c395f62586":"dIYAm"}],"8NF2X":[function(require,module,exports) {
var process = require("13cf4199308a9c1e");
"use strict";
/**
 * @module Markdown
 */ /**
 * Module dependencies.
 */ var Base = require("fce3f42c8ac1edc3");
var utils = require("f7391896398cf7d7");
var constants = require("f8ac9653b45eb144").constants;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
var EVENT_SUITE_END = constants.EVENT_SUITE_END;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
/**
 * Constants
 */ var SUITE_PREFIX = "$";
/**
 * Expose `Markdown`.
 */ exports = module.exports = Markdown;
/**
 * Constructs a new `Markdown` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Markdown(runner, options) {
    Base.call(this, runner, options);
    var level = 0;
    var buf = "";
    function title(str) {
        return Array(level).join("#") + " " + str;
    }
    function mapTOC(suite, obj) {
        var ret = obj;
        var key = SUITE_PREFIX + suite.title;
        obj = obj[key] = obj[key] || {
            suite
        };
        suite.suites.forEach(function(suite) {
            mapTOC(suite, obj);
        });
        return ret;
    }
    function stringifyTOC(obj, level) {
        ++level;
        var buf = "";
        var link;
        for(var key in obj){
            if (key === "suite") continue;
            if (key !== SUITE_PREFIX) {
                link = " - [" + key.substring(1) + "]";
                link += "(#" + utils.slug(obj[key].suite.fullTitle()) + ")\n";
                buf += Array(level).join("  ") + link;
            }
            buf += stringifyTOC(obj[key], level);
        }
        return buf;
    }
    function generateTOC(suite) {
        var obj = mapTOC(suite, {});
        return stringifyTOC(obj, 0);
    }
    generateTOC(runner.suite);
    runner.on(EVENT_SUITE_BEGIN, function(suite) {
        ++level;
        var slug = utils.slug(suite.fullTitle());
        buf += '<a name="' + slug + '"></a>' + "\n";
        buf += title(suite.title) + "\n";
    });
    runner.on(EVENT_SUITE_END, function() {
        --level;
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        var code = utils.clean(test.body);
        buf += test.title + ".\n";
        buf += "\n```js\n";
        buf += code + "\n";
        buf += "```\n\n";
    });
    runner.once(EVENT_RUN_END, function() {
        process.stdout.write("# TOC\n");
        process.stdout.write(generateTOC(runner.suite));
        process.stdout.write(buf);
    });
}
Markdown.description = "GitHub Flavored Markdown";

},{"13cf4199308a9c1e":"d5jf4","fce3f42c8ac1edc3":"hLmjX","f7391896398cf7d7":"tLxDb","f8ac9653b45eb144":"9bciI"}],"bskcn":[function(require,module,exports) {
var process = require("812213c7d7a1a7fb");
"use strict";
/**
 * @module Progress
 */ /**
 * Module dependencies.
 */ var Base = require("9927661fc12d7b72");
var constants = require("8b2e43c8f40bb7b0").constants;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var inherits = require("4ff6d403b9467d14").inherits;
var color = Base.color;
var cursor = Base.cursor;
/**
 * Expose `Progress`.
 */ exports = module.exports = Progress;
/**
 * General progress bar color.
 */ Base.colors.progress = 90;
/**
 * Constructs a new `Progress` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Progress(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var width = Base.window.width * 0.5 | 0;
    var total = runner.total;
    var complete = 0;
    var lastN = -1;
    // default chars
    options = options || {};
    var reporterOptions = options.reporterOptions || {};
    options.open = reporterOptions.open || "[";
    options.complete = reporterOptions.complete || "\u25AC";
    options.incomplete = reporterOptions.incomplete || Base.symbols.dot;
    options.close = reporterOptions.close || "]";
    options.verbose = reporterOptions.verbose || false;
    // tests started
    runner.on(EVENT_RUN_BEGIN, function() {
        process.stdout.write("\n");
        cursor.hide();
    });
    // tests complete
    runner.on(EVENT_TEST_END, function() {
        complete++;
        var percent = complete / total;
        var n = width * percent | 0;
        var i = width - n;
        if (n === lastN && !options.verbose) // Don't re-render the line if it hasn't changed
        return;
        lastN = n;
        cursor.CR();
        process.stdout.write("\x1b[J");
        process.stdout.write(color("progress", "  " + options.open));
        process.stdout.write(Array(n).join(options.complete));
        process.stdout.write(Array(i).join(options.incomplete));
        process.stdout.write(color("progress", options.close));
        if (options.verbose) process.stdout.write(color("progress", " " + complete + " of " + total));
    });
    // tests are complete, output some stats
    // and the failures if any
    runner.once(EVENT_RUN_END, function() {
        cursor.show();
        process.stdout.write("\n");
        self.epilogue();
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(Progress, Base);
Progress.description = "a progress bar";

},{"812213c7d7a1a7fb":"d5jf4","9927661fc12d7b72":"hLmjX","8b2e43c8f40bb7b0":"9bciI","4ff6d403b9467d14":"tLxDb"}],"6kGnM":[function(require,module,exports) {
var process = require("f1aa699e6b0f9bf1");
"use strict";
/**
 * @module Landing
 */ /**
 * Module dependencies.
 */ var Base = require("884544f6525ad783");
var inherits = require("9753109f62e9dfc8").inherits;
var constants = require("7737d7e8223347c9").constants;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_END = constants.EVENT_TEST_END;
var STATE_FAILED = require("a05a25fa45f78c74").constants.STATE_FAILED;
var cursor = Base.cursor;
var color = Base.color;
/**
 * Expose `Landing`.
 */ exports = module.exports = Landing;
/**
 * Airplane color.
 */ Base.colors.plane = 0;
/**
 * Airplane crash color.
 */ Base.colors["plane crash"] = 31;
/**
 * Runway color.
 */ Base.colors.runway = 90;
/**
 * Constructs a new `Landing` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function Landing(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var width = Base.window.width * 0.75 | 0;
    var stream = process.stdout;
    var plane = color("plane", "\u2708");
    var crashed = -1;
    var n = 0;
    var total = 0;
    function runway() {
        var buf = Array(width).join("-");
        return "  " + color("runway", buf);
    }
    runner.on(EVENT_RUN_BEGIN, function() {
        stream.write("\n\n\n  ");
        cursor.hide();
    });
    runner.on(EVENT_TEST_END, function(test) {
        // check if the plane crashed
        var col = crashed === -1 ? width * ++n / ++total | 0 : crashed;
        // show the crash
        if (test.state === STATE_FAILED) {
            plane = color("plane crash", "\u2708");
            crashed = col;
        }
        // render landing strip
        stream.write("\x1b[" + (width + 1) + "D\x1b[2A");
        stream.write(runway());
        stream.write("\n  ");
        stream.write(color("runway", Array(col).join("\u22C5")));
        stream.write(plane);
        stream.write(color("runway", Array(width - col).join("\u22C5") + "\n"));
        stream.write(runway());
        stream.write("\x1b[0m");
    });
    runner.once(EVENT_RUN_END, function() {
        cursor.show();
        process.stdout.write("\n");
        self.epilogue();
    });
    // if cursor is hidden when we ctrl-C, then it will remain hidden unless...
    process.once("SIGINT", function() {
        cursor.show();
        process.nextTick(function() {
            process.kill(process.pid, "SIGINT");
        });
    });
}
/**
 * Inherit from `Base.prototype`.
 */ inherits(Landing, Base);
Landing.description = "Unicode landing strip";

},{"f1aa699e6b0f9bf1":"d5jf4","884544f6525ad783":"hLmjX","9753109f62e9dfc8":"tLxDb","7737d7e8223347c9":"9bciI","a05a25fa45f78c74":"dIYAm"}],"jgxFs":[function(require,module,exports) {
var process = require("4a61f96d966d5dfc");
"use strict";
/**
 * @module JSONStream
 */ /**
 * Module dependencies.
 */ var Base = require("50f7484a7d3fe227");
var constants = require("2d79571576c71af2").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;
/**
 * Expose `JSONStream`.
 */ exports = module.exports = JSONStream;
/**
 * Constructs a new `JSONStream` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */ function JSONStream(runner, options) {
    Base.call(this, runner, options);
    var self = this;
    var total = runner.total;
    runner.once(EVENT_RUN_BEGIN, function() {
        writeEvent([
            "start",
            {
                total
            }
        ]);
    });
    runner.on(EVENT_TEST_PASS, function(test) {
        writeEvent([
            "pass",
            clean(test)
        ]);
    });
    runner.on(EVENT_TEST_FAIL, function(test, err) {
        test = clean(test);
        test.err = err.message;
        test.stack = err.stack || null;
        writeEvent([
            "fail",
            test
        ]);
    });
    runner.once(EVENT_RUN_END, function() {
        writeEvent([
            "end",
            self.stats
        ]);
    });
}
/**
 * Mocha event to be written to the output stream.
 * @typedef {Array} JSONStream~MochaEvent
 */ /**
 * Writes Mocha event to reporter output stream.
 *
 * @private
 * @param {JSONStream~MochaEvent} event - Mocha event to be output.
 */ function writeEvent(event) {
    process.stdout.write(JSON.stringify(event) + "\n");
}
/**
 * Returns an object literal representation of `test`
 * free of cyclic properties, etc.
 *
 * @private
 * @param {Test} test - Instance used as data source.
 * @return {Object} object containing pared-down test instance data
 */ function clean(test) {
    return {
        title: test.title,
        fullTitle: test.fullTitle(),
        file: test.file,
        duration: test.duration,
        currentRetry: test.currentRetry(),
        speed: test.speed
    };
}
JSONStream.description = "newline delimited JSON events";

},{"4a61f96d966d5dfc":"d5jf4","50f7484a7d3fe227":"hLmjX","2d79571576c71af2":"9bciI"}],"9yC1f":[function(require,module,exports) {
module.exports = JSON.parse('{"diff":true,"extension":["js","cjs","mjs"],"package":"./package.json","reporter":"spec","slow":75,"timeout":2000,"ui":"bdd","watch-ignore":["node_modules",".git"]}');

},{}],"b0OKt":[function(require,module,exports) {
var global = arguments[3];
"use strict";
/**
 * Provides a factory function for a {@link StatsCollector} object.
 * @module
 */ var constants = require("84596605d0f767d7").constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_SUITE_BEGIN = constants.EVENT_SUITE_BEGIN;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_TEST_PENDING = constants.EVENT_TEST_PENDING;
var EVENT_RUN_END = constants.EVENT_RUN_END;
var EVENT_TEST_END = constants.EVENT_TEST_END;
/**
 * Test statistics collector.
 *
 * @public
 * @typedef {Object} StatsCollector
 * @property {number} suites - integer count of suites run.
 * @property {number} tests - integer count of tests run.
 * @property {number} passes - integer count of passing tests.
 * @property {number} pending - integer count of pending tests.
 * @property {number} failures - integer count of failed tests.
 * @property {Date} start - time when testing began.
 * @property {Date} end - time when testing concluded.
 * @property {number} duration - number of msecs that testing took.
 */ var Date = global.Date;
/**
 * Provides stats such as test duration, number of tests passed / failed etc., by listening for events emitted by `runner`.
 *
 * @private
 * @param {Runner} runner - Runner instance
 * @throws {TypeError} If falsy `runner`
 */ function createStatsCollector(runner) {
    /**
   * @type StatsCollector
   */ var stats = {
        suites: 0,
        tests: 0,
        passes: 0,
        pending: 0,
        failures: 0
    };
    if (!runner) throw new TypeError("Missing runner argument");
    runner.stats = stats;
    runner.once(EVENT_RUN_BEGIN, function() {
        stats.start = new Date();
    });
    runner.on(EVENT_SUITE_BEGIN, function(suite) {
        suite.root || stats.suites++;
    });
    runner.on(EVENT_TEST_PASS, function() {
        stats.passes++;
    });
    runner.on(EVENT_TEST_FAIL, function() {
        stats.failures++;
    });
    runner.on(EVENT_TEST_PENDING, function() {
        stats.pending++;
    });
    runner.on(EVENT_TEST_END, function() {
        stats.tests++;
    });
    runner.once(EVENT_RUN_END, function() {
        stats.end = new Date();
        stats.duration = stats.end - stats.start;
    });
}
module.exports = createStatsCollector;

},{"84596605d0f767d7":"9bciI"}],"9BLIX":[function(require,module,exports) {
"use strict";
exports.bdd = require("35d52b6a1fae34ad");
exports.tdd = require("73006bbf3b9beb38");
exports.qunit = require("577492e900d0cac3");
exports.exports = require("ee6a91dbc1902595");

},{"35d52b6a1fae34ad":"kGG06","73006bbf3b9beb38":"g7RzH","577492e900d0cac3":"7TVpK","ee6a91dbc1902595":"93SGi"}],"kGG06":[function(require,module,exports) {
"use strict";
var Test = require("13ae7878423e96c6");
var EVENT_FILE_PRE_REQUIRE = require("252ea12022d8e34").constants.EVENT_FILE_PRE_REQUIRE;
/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */ module.exports = function bddInterface(suite) {
    var suites = [
        suite
    ];
    suite.on(EVENT_FILE_PRE_REQUIRE, function(context, file, mocha) {
        var common = require("e3e32b886396699f")(suites, context, mocha);
        context.before = common.before;
        context.after = common.after;
        context.beforeEach = common.beforeEach;
        context.afterEach = common.afterEach;
        context.run = mocha.options.delay && common.runWithSuite(suite);
        /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */ context.describe = context.context = function(title, fn) {
            return common.suite.create({
                title,
                file,
                fn
            });
        };
        /**
     * Pending describe.
     */ context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {
            return common.suite.skip({
                title,
                file,
                fn
            });
        };
        /**
     * Exclusive suite.
     */ context.describe.only = function(title, fn) {
            return common.suite.only({
                title,
                file,
                fn
            });
        };
        /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */ context.it = context.specify = function(title, fn) {
            var suite = suites[0];
            if (suite.isPending()) fn = null;
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };
        /**
     * Exclusive test-case.
     */ context.it.only = function(title, fn) {
            return common.test.only(mocha, context.it(title, fn));
        };
        /**
     * Pending test case.
     */ context.xit = context.xspecify = context.it.skip = function(title) {
            return context.it(title);
        };
    });
};
module.exports.description = "BDD or RSpec style [default]";

},{"13ae7878423e96c6":"crHUQ","252ea12022d8e34":"lfZtK","e3e32b886396699f":"lnKDt"}],"crHUQ":[function(require,module,exports) {
"use strict";
var Runnable = require("89a209f1b5b570b2");
var utils = require("167d008704c5d6a5");
var errors = require("5f8dc1a4c20f1d6a");
var createInvalidArgumentTypeError = errors.createInvalidArgumentTypeError;
var isString = utils.isString;
const { MOCHA_ID_PROP_NAME } = utils.constants;
module.exports = Test;
/**
 * Initialize a new `Test` with the given `title` and callback `fn`.
 *
 * @public
 * @class
 * @extends Runnable
 * @param {String} title - Test title (required)
 * @param {Function} [fn] - Test callback.  If omitted, the Test is considered "pending"
 */ function Test(title, fn) {
    if (!isString(title)) throw createInvalidArgumentTypeError('Test argument "title" should be a string. Received type "' + typeof title + '"', "title", "string");
    this.type = "test";
    Runnable.call(this, title, fn);
    this.reset();
}
/**
 * Inherit from `Runnable.prototype`.
 */ utils.inherits(Test, Runnable);
/**
 * Resets the state initially or for a next run.
 */ Test.prototype.reset = function() {
    Runnable.prototype.reset.call(this);
    this.pending = !this.fn;
    delete this.state;
};
/**
 * Set or get retried test
 *
 * @private
 */ Test.prototype.retriedTest = function(n) {
    if (!arguments.length) return this._retriedTest;
    this._retriedTest = n;
};
/**
 * Add test to the list of tests marked `only`.
 *
 * @private
 */ Test.prototype.markOnly = function() {
    this.parent.appendOnlyTest(this);
};
Test.prototype.clone = function() {
    var test = new Test(this.title, this.fn);
    test.timeout(this.timeout());
    test.slow(this.slow());
    test.retries(this.retries());
    test.currentRetry(this.currentRetry());
    test.retriedTest(this.retriedTest() || this);
    test.globals(this.globals());
    test.parent = this.parent;
    test.file = this.file;
    test.ctx = this.ctx;
    return test;
};
/**
 * Returns an minimal object suitable for transmission over IPC.
 * Functions are represented by keys beginning with `$$`.
 * @private
 * @returns {Object}
 */ Test.prototype.serialize = function serialize() {
    return {
        $$currentRetry: this._currentRetry,
        $$fullTitle: this.fullTitle(),
        $$isPending: Boolean(this.pending),
        $$retriedTest: this._retriedTest || null,
        $$slow: this._slow,
        $$titlePath: this.titlePath(),
        body: this.body,
        duration: this.duration,
        err: this.err,
        parent: {
            $$fullTitle: this.parent.fullTitle(),
            [MOCHA_ID_PROP_NAME]: this.parent.id
        },
        speed: this.speed,
        state: this.state,
        title: this.title,
        type: this.type,
        file: this.file,
        [MOCHA_ID_PROP_NAME]: this.id
    };
};

},{"89a209f1b5b570b2":"dIYAm","167d008704c5d6a5":"tLxDb","5f8dc1a4c20f1d6a":"fbJXN"}],"lnKDt":[function(require,module,exports) {
"use strict";
/**
 @module interfaces/common
*/ var Suite = require("506074d43ba6bd01");
var errors = require("ebcb6840a2ca0593");
var createMissingArgumentError = errors.createMissingArgumentError;
var createUnsupportedError = errors.createUnsupportedError;
var createForbiddenExclusivityError = errors.createForbiddenExclusivityError;
/**
 * Functions common to more than one interface.
 *
 * @private
 * @param {Suite[]} suites
 * @param {Context} context
 * @param {Mocha} mocha
 * @return {Object} An object containing common functions.
 */ module.exports = function(suites, context, mocha) {
    /**
   * Check if the suite should be tested.
   *
   * @private
   * @param {Suite} suite - suite to check
   * @returns {boolean}
   */ function shouldBeTested(suite) {
        return !mocha.options.grep || mocha.options.grep && mocha.options.grep.test(suite.fullTitle()) && !mocha.options.invert;
    }
    return {
        /**
     * This is only present if flag --delay is passed into Mocha. It triggers
     * root suite execution.
     *
     * @param {Suite} suite The root suite.
     * @return {Function} A function which runs the root suite
     */ runWithSuite: function runWithSuite(suite) {
            return function run() {
                suite.run();
            };
        },
        /**
     * Execute before running tests.
     *
     * @param {string} name
     * @param {Function} fn
     */ before: function(name, fn) {
            suites[0].beforeAll(name, fn);
        },
        /**
     * Execute after running tests.
     *
     * @param {string} name
     * @param {Function} fn
     */ after: function(name, fn) {
            suites[0].afterAll(name, fn);
        },
        /**
     * Execute before each test case.
     *
     * @param {string} name
     * @param {Function} fn
     */ beforeEach: function(name, fn) {
            suites[0].beforeEach(name, fn);
        },
        /**
     * Execute after each test case.
     *
     * @param {string} name
     * @param {Function} fn
     */ afterEach: function(name, fn) {
            suites[0].afterEach(name, fn);
        },
        suite: {
            /**
       * Create an exclusive Suite; convenience function
       * See docstring for create() below.
       *
       * @param {Object} opts
       * @returns {Suite}
       */ only: function only(opts) {
                if (mocha.options.forbidOnly) throw createForbiddenExclusivityError(mocha);
                opts.isOnly = true;
                return this.create(opts);
            },
            /**
       * Create a Suite, but skip it; convenience function
       * See docstring for create() below.
       *
       * @param {Object} opts
       * @returns {Suite}
       */ skip: function skip(opts) {
                opts.pending = true;
                return this.create(opts);
            },
            /**
       * Creates a suite.
       *
       * @param {Object} opts Options
       * @param {string} opts.title Title of Suite
       * @param {Function} [opts.fn] Suite Function (not always applicable)
       * @param {boolean} [opts.pending] Is Suite pending?
       * @param {string} [opts.file] Filepath where this Suite resides
       * @param {boolean} [opts.isOnly] Is Suite exclusive?
       * @returns {Suite}
       */ create: function create(opts) {
                var suite = Suite.create(suites[0], opts.title);
                suite.pending = Boolean(opts.pending);
                suite.file = opts.file;
                suites.unshift(suite);
                if (opts.isOnly) suite.markOnly();
                if (suite.pending && mocha.options.forbidPending && shouldBeTested(suite)) throw createUnsupportedError("Pending test forbidden");
                if (typeof opts.fn === "function") {
                    opts.fn.call(suite);
                    suites.shift();
                } else if (typeof opts.fn === "undefined" && !suite.pending) throw createMissingArgumentError('Suite "' + suite.fullTitle() + '" was defined but no callback was supplied. ' + "Supply a callback or explicitly skip the suite.", "callback", "function");
                else if (!opts.fn && suite.pending) suites.shift();
                return suite;
            }
        },
        test: {
            /**
       * Exclusive test-case.
       *
       * @param {Object} mocha
       * @param {Function} test
       * @returns {*}
       */ only: function(mocha, test) {
                if (mocha.options.forbidOnly) throw createForbiddenExclusivityError(mocha);
                test.markOnly();
                return test;
            },
            /**
       * Pending test case.
       *
       * @param {string} title
       */ skip: function(title) {
                context.test(title);
            }
        }
    };
};

},{"506074d43ba6bd01":"lfZtK","ebcb6840a2ca0593":"fbJXN"}],"g7RzH":[function(require,module,exports) {
"use strict";
var Test = require("4bc7b3bc743c049f");
var EVENT_FILE_PRE_REQUIRE = require("e79e10817b85738b").constants.EVENT_FILE_PRE_REQUIRE;
/**
 * TDD-style interface:
 *
 *      suite('Array', function() {
 *        suite('#indexOf()', function() {
 *          suiteSetup(function() {
 *
 *          });
 *
 *          test('should return -1 when not present', function() {
 *
 *          });
 *
 *          test('should return the index when present', function() {
 *
 *          });
 *
 *          suiteTeardown(function() {
 *
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */ module.exports = function(suite) {
    var suites = [
        suite
    ];
    suite.on(EVENT_FILE_PRE_REQUIRE, function(context, file, mocha) {
        var common = require("919bd88b716a8623")(suites, context, mocha);
        context.setup = common.beforeEach;
        context.teardown = common.afterEach;
        context.suiteSetup = common.before;
        context.suiteTeardown = common.after;
        context.run = mocha.options.delay && common.runWithSuite(suite);
        /**
     * Describe a "suite" with the given `title` and callback `fn` containing
     * nested suites and/or tests.
     */ context.suite = function(title, fn) {
            return common.suite.create({
                title,
                file,
                fn
            });
        };
        /**
     * Pending suite.
     */ context.suite.skip = function(title, fn) {
            return common.suite.skip({
                title,
                file,
                fn
            });
        };
        /**
     * Exclusive test-case.
     */ context.suite.only = function(title, fn) {
            return common.suite.only({
                title,
                file,
                fn
            });
        };
        /**
     * Describe a specification or test-case with the given `title` and
     * callback `fn` acting as a thunk.
     */ context.test = function(title, fn) {
            var suite = suites[0];
            if (suite.isPending()) fn = null;
            var test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };
        /**
     * Exclusive test-case.
     */ context.test.only = function(title, fn) {
            return common.test.only(mocha, context.test(title, fn));
        };
        context.test.skip = common.test.skip;
    });
};
module.exports.description = 'traditional "suite"/"test" instead of BDD\'s "describe"/"it"';

},{"4bc7b3bc743c049f":"crHUQ","e79e10817b85738b":"lfZtK","919bd88b716a8623":"lnKDt"}],"7TVpK":[function(require,module,exports) {
"use strict";
var Test = require("2ed4d1cd633f044a");
var EVENT_FILE_PRE_REQUIRE = require("3cda10eff1e18b31").constants.EVENT_FILE_PRE_REQUIRE;
/**
 * QUnit-style interface:
 *
 *     suite('Array');
 *
 *     test('#length', function() {
 *       var arr = [1,2,3];
 *       ok(arr.length == 3);
 *     });
 *
 *     test('#indexOf()', function() {
 *       var arr = [1,2,3];
 *       ok(arr.indexOf(1) == 0);
 *       ok(arr.indexOf(2) == 1);
 *       ok(arr.indexOf(3) == 2);
 *     });
 *
 *     suite('String');
 *
 *     test('#length', function() {
 *       ok('foo'.length == 3);
 *     });
 *
 * @param {Suite} suite Root suite.
 */ module.exports = function qUnitInterface(suite) {
    var suites = [
        suite
    ];
    suite.on(EVENT_FILE_PRE_REQUIRE, function(context, file, mocha) {
        var common = require("9446f7ff93bf540a")(suites, context, mocha);
        context.before = common.before;
        context.after = common.after;
        context.beforeEach = common.beforeEach;
        context.afterEach = common.afterEach;
        context.run = mocha.options.delay && common.runWithSuite(suite);
        /**
     * Describe a "suite" with the given `title`.
     */ context.suite = function(title) {
            if (suites.length > 1) suites.shift();
            return common.suite.create({
                title,
                file,
                fn: false
            });
        };
        /**
     * Exclusive Suite.
     */ context.suite.only = function(title) {
            if (suites.length > 1) suites.shift();
            return common.suite.only({
                title,
                file,
                fn: false
            });
        };
        /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */ context.test = function(title, fn) {
            var test = new Test(title, fn);
            test.file = file;
            suites[0].addTest(test);
            return test;
        };
        /**
     * Exclusive test-case.
     */ context.test.only = function(title, fn) {
            return common.test.only(mocha, context.test(title, fn));
        };
        context.test.skip = common.test.skip;
    });
};
module.exports.description = "QUnit style";

},{"2ed4d1cd633f044a":"crHUQ","3cda10eff1e18b31":"lfZtK","9446f7ff93bf540a":"lnKDt"}],"93SGi":[function(require,module,exports) {
"use strict";
var Suite = require("a71fd13f96f1d72d");
var Test = require("f3c7c4fb23480dcf");
/**
 * Exports-style (as Node.js module) interface:
 *
 *     exports.Array = {
 *       '#indexOf()': {
 *         'should return -1 when the value is not present': function() {
 *
 *         },
 *
 *         'should return the correct index when the value is present': function() {
 *
 *         }
 *       }
 *     };
 *
 * @param {Suite} suite Root suite.
 */ module.exports = function(suite) {
    var suites = [
        suite
    ];
    suite.on(Suite.constants.EVENT_FILE_REQUIRE, visit);
    function visit(obj, file) {
        var suite;
        for(var key in obj)if (typeof obj[key] === "function") {
            var fn = obj[key];
            switch(key){
                case "before":
                    suites[0].beforeAll(fn);
                    break;
                case "after":
                    suites[0].afterAll(fn);
                    break;
                case "beforeEach":
                    suites[0].beforeEach(fn);
                    break;
                case "afterEach":
                    suites[0].afterEach(fn);
                    break;
                default:
                    var test = new Test(key, fn);
                    test.file = file;
                    suites[0].addTest(test);
            }
        } else {
            suite = Suite.create(suites[0], key);
            suites.unshift(suite);
            visit(obj[key], file);
            suites.shift();
        }
    }
};
module.exports.description = 'Node.js module ("exports") style';

},{"a71fd13f96f1d72d":"lfZtK","f3c7c4fb23480dcf":"crHUQ"}],"7vSKC":[function(require,module,exports) {
"use strict";
/**
 * @module Context
 */ /**
 * Expose `Context`.
 */ module.exports = Context;
/**
 * Initialize a new `Context`.
 *
 * @private
 */ function Context() {}
/**
 * Set or get the context `Runnable` to `runnable`.
 *
 * @private
 * @param {Runnable} runnable
 * @return {Context} context
 */ Context.prototype.runnable = function(runnable) {
    if (!arguments.length) return this._runnable;
    this.test = this._runnable = runnable;
    return this;
};
/**
 * Set or get test timeout `ms`.
 *
 * @private
 * @param {number} ms
 * @return {Context} self
 */ Context.prototype.timeout = function(ms) {
    if (!arguments.length) return this.runnable().timeout();
    this.runnable().timeout(ms);
    return this;
};
/**
 * Set or get test slowness threshold `ms`.
 *
 * @private
 * @param {number} ms
 * @return {Context} self
 */ Context.prototype.slow = function(ms) {
    if (!arguments.length) return this.runnable().slow();
    this.runnable().slow(ms);
    return this;
};
/**
 * Mark a test as skipped.
 *
 * @private
 * @throws Pending
 */ Context.prototype.skip = function() {
    this.runnable().skip();
};
/**
 * Set or get a number of allowed retries on failed tests
 *
 * @private
 * @param {number} n
 * @return {Context} self
 */ Context.prototype.retries = function(n) {
    if (!arguments.length) return this.runnable().retries();
    this.runnable().retries(n);
    return this;
};

},{}],"aW19C":[function(require,module,exports) {
module.exports = JSON.parse('{"name":"mocha","version":"10.2.0","type":"commonjs","description":"simple, flexible, fun test framework","keywords":["mocha","test","bdd","tdd","tap","testing","chai","assertion","ava","jest","tape","jasmine","karma"],"author":"TJ Holowaychuk <tj@vision-media.ca>","license":"MIT","repository":{"type":"git","url":"https://github.com/mochajs/mocha.git"},"bugs":{"url":"https://github.com/mochajs/mocha/issues/"},"funding":{"type":"opencollective","url":"https://opencollective.com/mochajs"},"gitter":"https://gitter.im/mochajs/mocha","homepage":"https://mochajs.org/","logo":"https://cldup.com/S9uQ-cOLYz.svg","notifyLogo":"https://ibin.co/4QuRuGjXvl36.png","bin":{"mocha":"./bin/mocha.js","_mocha":"./bin/_mocha"},"directories":{"lib":"./lib","test":"./test"},"engines":{"node":">= 14.0.0"},"scripts":{"prepublishOnly":"nps test clean build","start":"nps","test":"nps test","version":"nps version","test:smoke":"node ./bin/mocha --no-config test/smoke/smoke.spec.js"},"dependencies":{"ansi-colors":"4.1.1","browser-stdout":"1.3.1","chokidar":"3.5.3","debug":"4.3.4","diff":"5.0.0","escape-string-regexp":"4.0.0","find-up":"5.0.0","glob":"7.2.0","he":"1.2.0","js-yaml":"4.1.0","log-symbols":"4.1.0","minimatch":"5.0.1","ms":"2.1.3","nanoid":"3.3.3","serialize-javascript":"6.0.0","strip-json-comments":"3.1.1","supports-color":"8.1.1","workerpool":"6.2.1","yargs":"16.2.0","yargs-parser":"20.2.4","yargs-unparser":"2.0.0"},"devDependencies":{"@11ty/eleventy":"^1.0.0","@11ty/eleventy-plugin-inclusive-language":"^1.0.3","@babel/eslint-parser":"^7.19.1","@mocha/docdash":"^4.0.1","@rollup/plugin-commonjs":"^21.0.2","@rollup/plugin-json":"^4.1.0","@rollup/plugin-multi-entry":"^4.0.1","@rollup/plugin-node-resolve":"^13.1.3","assetgraph-builder":"^9.0.0","autoprefixer":"^9.8.6","canvas":"^2.9.0","chai":"^4.3.4","coffeescript":"^2.6.1","coveralls":"^3.1.1","cross-env":"^7.0.2","eslint":"^8.24.0","eslint-config-prettier":"^8.3.0","eslint-config-semistandard":"^17.0.0","eslint-config-standard":"^17.0.0","eslint-plugin-import":"^2.24.2","eslint-plugin-node":"^11.1.0","eslint-plugin-prettier":"^4.2.1","eslint-plugin-promise":"^6.0.1","fail-on-errors-webpack-plugin":"^3.0.0","fs-extra":"^10.0.0","husky":"^4.2.5","hyperlink":"^5.0.4","jsdoc":"^3.6.7","jsdoc-ts-utils":"^2.0.1","karma":"^6.3.11","karma-chrome-launcher":"^3.1.0","karma-mocha":"^2.0.1","karma-mocha-reporter":"^2.2.5","karma-sauce-launcher":"^4.3.6","lint-staged":"^10.2.11","markdown-it":"^12.3.2","markdown-it-anchor":"^8.4.1","markdown-it-attrs":"^4.1.3","markdown-it-emoji":"^2.0.0","markdown-it-prism":"^2.2.2","markdown-toc":"^1.2.0","markdownlint-cli":"^0.30.0","needle":"^2.5.0","nps":"^5.10.0","nyc":"^15.1.0","pidtree":"^0.5.0","prettier":"^2.4.1","remark":"^14.0.2","remark-github":"^11.2.2","remark-inline-links":"^6.0.1","rewiremock":"^3.14.3","rimraf":"^3.0.2","rollup":"^2.70.1","rollup-plugin-node-globals":"^1.4.0","rollup-plugin-polyfill-node":"^0.8.0","rollup-plugin-visualizer":"^5.6.0","sinon":"^9.0.3","strip-ansi":"^6.0.0","svgo":"^1.3.2","touch":"^3.1.0","unexpected":"^11.14.0","unexpected-eventemitter":"^2.2.0","unexpected-map":"^2.0.0","unexpected-set":"^3.0.0","unexpected-sinon":"^10.11.2","update-notifier":"^4.1.0","uslug":"^1.0.4","uuid":"^8.3.0","webpack":"^5.67.0","webpack-cli":"^4.9.1"},"files":["bin/*mocha*","lib/**/*.{js,html,json}","index.js","mocha.css","mocha.js","mocha.js.map","browser-entry.js"],"browser":{"./index.js":"./browser-entry.js","fs":false,"path":false,"supports-color":false,"./lib/nodejs/buffered-worker-pool.js":false,"./lib/nodejs/esm-utils.js":false,"./lib/nodejs/file-unloader.js":false,"./lib/nodejs/parallel-buffered-runner.js":false,"./lib/nodejs/serializer.js":false,"./lib/nodejs/worker.js":false,"./lib/nodejs/reporters/parallel-buffered.js":false,"./lib/cli/index.js":false},"prettier":{"arrowParens":"avoid","bracketSpacing":false,"endOfLine":"auto","singleQuote":true,"trailingComma":"none"},"husky":{"hooks":{"pre-commit":"lint-staged"}}}');

},{}]},["5Fxl8","3SEK7"], "3SEK7", "parcelRequire94c2")

//# sourceMappingURL=main.js.map
