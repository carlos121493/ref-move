import 'babel-polyfill';
import matchedRequire from 'match-require';
import {isRelative} from 'path';
import path from 'path';
import fs from 'fs';

function hasFilePath(fileName) {
	try {
		return fs.realpathSync(fileName);
	} catch(e) {
		return false;
	}
}

function readContent(fileName) {
	const hasPath = hasFilePath(fileName);
	if(hasPath) {
		return fs.readFileSync(fileName, 'utf-8');
	} else {
		return fileName;
	}
}

function findRelative(file) {
	const content = readContent(file);
	return matchedRequire.findAllImports(content).concat(matchedRequire.findAll(content)).filter(item => matchedRequire.isRelativeModule(item)) || [];
}

function hasRelative(file) {
	return findRelative(file).length;
}

function replaceRelative(source, dist, content, autoWrite) {
	const fileCon = typeof content === 'string' ? content : readContent(source);
	const hasR = hasRelative(fileCon);
	if(!!hasR) {
		const filePath = path.dirname(source);
		const fileName = path.basename(source);
		if (!fileName || !fileCon) {
			throw('please pass correct source or content info');
		}

		if (!dist) {
			throw('please pass correct dist');
		}

		const distDir = path.dirname(dist);
		const replaceRe = new RegExp(findRelative(fileCon).join('|'), 'g');
		return replaceRe;
		const transferContent = fileCon.replace(replaceRe, item => path.join(path.relative(distDir, source), item));
		if (autoWrite) {
			fs.writeFileSync(distDir, transferContent, 'utf-8');
		}
		return transferContent;
	}
	return fileCon;

}

export default {
	readContent,
	findRelative,
	hasRelative,
	replaceRelative
}