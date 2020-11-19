"use strict";
exports.__esModule = true;
var webpack_1 = require("webpack");
var path = require("path");
var SharedMappings = /** @class */ (function () {
    function SharedMappings() {
        this.mappings = [];
    }
    SharedMappings.prototype.register = function (tsConfigPath, shared) {
        var _a;
        if (shared === void 0) { shared = null; }
        var tsConfig = require(tsConfigPath);
        var mappings = (_a = tsConfig === null || tsConfig === void 0 ? void 0 : tsConfig.compilerOptions) === null || _a === void 0 ? void 0 : _a.paths;
        var rootPath = path.normalize(path.dirname(tsConfigPath));
        if (!mappings) {
            console.warn('No path mappings found in registered tsConfig!');
            return;
        }
        for (var key in mappings) {
            if (!shared || shared.length === 0 || shared.includes(key)) {
                this.mappings.push({
                    key: key,
                    value: path.normalize(path.join(__dirname, rootPath, mappings[key][0]))
                });
            }
        }
    };
    SharedMappings.prototype.getPlugin = function () {
        var _this = this;
        return new webpack_1.NormalModuleReplacementPlugin(/./, function (req) {
            var from = req.context;
            var to = path.normalize(path.join(req.context, req.request));
            var log = from.includes('auth-lib') || to.includes('auth-lib');
            for (var _i = 0, _a = _this.mappings; _i < _a.length; _i++) {
                var m = _a[_i];
                var libFolder = path.normalize(path.dirname(m.value));
                if (!from.startsWith(libFolder) && to.startsWith(libFolder)) {
                    req.request = m.key;
                    console.log('remapping', { from: from, to: to, libFolder: libFolder });
                }
            }
        });
    };
    SharedMappings.prototype.getDescriptors = function () {
        var result = {};
        for (var _i = 0, _a = this.mappings; _i < _a.length; _i++) {
            var m = _a[_i];
            result[m.key] = {
                "import": m.value,
                requiredVersion: false
            };
        }
        return result;
    };
    SharedMappings.prototype.getDescriptor = function (mappedPath, requiredVersion) {
        var _a;
        if (requiredVersion === void 0) { requiredVersion = null; }
        if (!this.mappings[mappedPath]) {
            throw new Error('No mapping found for ' + mappedPath + ' in tsconfig');
        }
        return (_a = {},
            _a[mappedPath] = {
                "import": this.mappings[mappedPath],
                requiredVersion: requiredVersion !== null && requiredVersion !== void 0 ? requiredVersion : false
            },
            _a);
    };
    return SharedMappings;
}());
exports["default"] = SharedMappings;
