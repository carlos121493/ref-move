'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

require('babel-polyfill');

var _matchRequire = require('match-require');

var _matchRequire2 = _interopRequireDefault(_matchRequire);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasFilePath(fileName) {
	try {
		return _fs2.default.statSync(fileName).isFile();
	} catch (e) {
		return false;
	}
}

function readContent(fileName) {
	var hasPath = hasFilePath(fileName);
	if (hasPath) {
		return _fs2.default.readFileSync(fileName, 'utf-8');
	} else {
		return fileName;
	}
}

function findRelative(file) {
	var content = readContent(file);
	return _matchRequire2.default.findAllImports(content).concat(_matchRequire2.default.findAll(content)).filter(function (item) {
		return _matchRequire2.default.isRelativeModule(item);
	}) || [];
}

function hasRelative(file) {
	return findRelative(file).length;
}

function replaceRelative(source, content) {
	if (!source) {
		throw 'please pass correct source or content info';
	}

	var fileCon = typeof content === 'string' ? content : readContent(source);
	var hasR = hasRelative(fileCon);
	if (!!hasR) {
		var _ret = function () {
			var filePath = hasFilePath(source) ? _path2.default.dirname(source) : source;
			var replaceRe = new RegExp(findRelative(fileCon).join('|'), 'g');
			var transferContent = fileCon.replace(replaceRe, function (item) {
				return _path2.default.join(filePath, item);
			});
			return {
				v: transferContent
			};
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}
	return fileCon;
}

exports.default = {
	hasFilePath: hasFilePath,
	readContent: readContent,
	findRelative: findRelative,
	hasRelative: hasRelative,
	replaceRelative: replaceRelative
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map