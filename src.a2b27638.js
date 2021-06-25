// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/mapper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telexConverter = telexConverter;
exports.telexReverter = telexReverter;
exports.textToEmoji = textToEmoji;
exports.emojiToText = emojiToText;
exports.default = void 0;
var mapper = {
  a: '😀',
  b: '😃',
  c: '😄',
  d: '😁',
  e: '😆',
  f: '😅',
  g: '😂',
  h: '🤣',
  i: '🥲',
  j: '☺️',
  k: '😊',
  l: '😇',
  m: '🙂',
  n: '🙃',
  o: '😉',
  p: '😌',
  q: '😍',
  r: '🥰',
  s: '😘',
  t: '😗',
  u: '😙',
  v: '😚',
  w: '😋',
  x: '😛',
  y: '😝',
  z: '😜',
  ' ': '.'
};
var TelexType = ['aws', 'awf', 'awr', 'awx', 'awj', 'aas', 'aaf', 'aar', 'aax', 'aaj', 'ees', 'eef', 'eer', 'eex', 'eej', 'oos', 'oof', 'oor', 'oox', 'ooj', 'ows', 'owf', 'owr', 'owx', 'owj', 'uws', 'uwf', 'uwr', 'uwx', 'uwj', 'as', 'af', 'ar', 'ax', 'aj', 'aw', 'aa', 'dd', 'es', 'ef', 'er', 'ex', 'ej', 'ee', 'is', 'if', 'ir', 'ix', 'ij', 'os', 'of', 'or', 'ox', 'oj', 'oo', 'ow', 'us', 'uf', 'ur', 'ux', 'uj', 'uw', 'ys', 'yf', 'yr', 'yx', 'yj'];
var CharCode = [7855, 7857, 7859, 7861, 7863, 7845, 7847, 7849, 7851, 7853, 7871, 7873, 7875, 7877, 7879, 7889, 7891, 7893, 7895, 7897, 7899, 7901, 7903, 7905, 7907, 7913, 7915, 7917, 7919, 7921, 225, 224, 7843, 227, 7841, 259, 226, 273, 233, 232, 7867, 7869, 7865, 234, 237, 236, 7881, 297, 7883, 243, 242, 7887, 245, 7885, 244, 417, 250, 249, 7911, 361, 7909, 432, 253, 7923, 7927, 7929, 7925];

function telexConverter(text) {
  var textArr = text.split('');
  return textArr.map(function (word) {
    var code = word.charCodeAt(0);

    if (CharCode.indexOf(code) !== -1) {
      return TelexType[CharCode.indexOf(code)];
    }

    return word;
  }).join('');
}

function telexReverter(text) {
  var result = text;
  TelexType.map(function (telex, index) {
    result = result.replaceAll(telex, String.fromCharCode(CharCode[index]));
  });
  return result;
}

function textToEmoji(text) {
  var textAreaValue = telexConverter(text).toLowerCase(); // TODO: case sensitive

  return textAreaValue.split('').map(function (char) {
    return mapper[char];
  }).join('');
}

function emojiToText(emoji) {
  var textAreaValue = emoji;
  var value = textAreaValue;
  Object.values(mapper).forEach(function (emoji, index) {
    var character = Object.keys(mapper)[index];
    value = value.replaceAll(emoji, character);
  });
  return telexReverter(value);
}

var _default = mapper;
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _mapper = require("./mapper");

document.addEventListener('DOMContentLoaded', function () {
  var resultArea = document.getElementById('result');
  var textAreaText = document.getElementById('text');
  var buttonT2E = document.getElementById('translateText');
  var buttonE2T = document.getElementById('translateEmoji');
  var buttonCopy = document.getElementById('copyToClipboard');
  var spinner = document.getElementById('spinner'); // Handle click button [Text to Emoji]

  buttonT2E.addEventListener('click', function () {
    resultArea.value = ''; // const textAreaValue = telexConverter(textAreaText.value).toLowerCase(); // TODO: case sensitive
    // const result = textAreaValue
    //   .split('')
    //   .map((char) => mapper[char])
    //   .join('');

    resultArea.value = (0, _mapper.textToEmoji)(textAreaText.value);
  }); // Handle click button [Emoji to Text]

  buttonE2T.addEventListener('click', function () {
    resultArea.value = ''; // const textAreaValue = textAreaText.value;
    // let value = textAreaValue;
    // Object.values(mapper).forEach((emoji, index) => {
    //   const character = Object.keys(mapper)[index];
    //   value = value.replaceAll(emoji, character);
    // });

    resultArea.value = (0, _mapper.emojiToText)(textAreaText.value);
  }); // Copy to clipboard

  var copyToClipboard = function copyToClipboard() {
    buttonCopy.style.display = 'none';
    spinner.style.display = 'block';
    /* Get the text field */

    var copyText = resultArea;
    /* Select the text field */

    copyText.select();
    copyText.setSelectionRange(0, 99999);
    /* For mobile devices */

    /* Copy the text inside the text field */

    document.execCommand('copy');
    setTimeout(function () {
      buttonCopy.style.display = 'block';
      spinner.style.display = 'none';
      buttonCopy.setAttribute('uk-icon', 'icon: check');
    }, 500);
    setTimeout(function () {
      buttonCopy.setAttribute('uk-icon', 'icon: copy');
    }, 3000);
  };

  buttonCopy.addEventListener('click', copyToClipboard);
});
},{"./styles.css":"src/styles.css","./mapper":"src/mapper.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61880" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map