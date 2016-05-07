'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

require('babel-polyfill');

var _matchRequire = require('match-require');

var _matchRequire2 = _interopRequireDefault(_matchRequire);

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasFilePath(fileName) {
	try {
		if (_fs2.default.realpathSync(fileName)) {
			return true;
		}
	} catch (e) {
		return false;
	}
}

function readContent(fileName) {
	var hasPath = hasPath(fileName);
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

function replaceRelative(source, dist, content, autoWrite) {
	var relativeArr = hasRelative(source);
	if (relativeArr.length) {
		var _ret = function () {
			var filePath = path.dirname(source);
			var fileName = path.basename(source);
			var distDir = path.dirname(dist);
			if (!fileName || !content || typeof content !== 'string') {
				throw 'please pass correct source or content info';
			}
			var content = typeof content === 'string' ? content : readContent(source);
			var replaceRe = new RegExp(findRelative(content).join('|'), 'g');
			var transferContent = content.replace(replaceRe, function (item) {
				return path.join(path.relative(distDir, source), item);
			});
			if (autoWrite) {
				_fs2.default.writeFileSync(dist, transferContent, 'utf-8');
			}
			return {
				v: transferContent
			};
		}();

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}
	return content;
}

exports.default = {
	readContent: readContent,
	findRelative: findRelative,
	hasRelative: hasRelative,
	replaceRelative: replaceRelative
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map