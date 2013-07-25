// Straight from chaplin.js

(function() {
    "use strict";

    var loader = (function() {
        var modules = {};
        var cache = {};

        var dummy = function() {
            return function() {};
        };
        var initModule = function(name, definition) {
            var module = {
                id: name,
                exports: {}
            };
            definition(module.exports, dummy(), module);
            var exports = cache[name] = module.exports;
            return exports;
        };

        var loader = function(path) {
            if (cache.hasOwnProperty(path)) return cache[path];
            if (modules.hasOwnProperty(path)) return initModule(path, modules[path]);
            throw new Error('Cannot find module "' + name + '"');
        };

        loader.register = function(bundle, fn) {
            modules[bundle] = fn;
        };
        return loader;
    })();
});
