import matchedRequire from 'match-require';
import {isRelative} from 'path';
import path from 'path';
import fs from 'fs';

function hasFilePath(fileName) {
	try {
		return fs.statSync(fileName).isFile();
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

function replaceRelative(source, content) {
	if (!source) {
		throw('please pass correct source or content info');
	}

	const fileCon = typeof content === 'string' ? content : readContent(source);
	const hasR = hasRelative(fileCon);
	if(!!hasR) {
		const filePath = hasFilePath(source) ? path.dirname(source) : source;
		const replaceRe = new RegExp(findRelative(fileCon).join('|'), 'g');
		const transferContent = fileCon.replace(replaceRe, item => path.join(filePath, item));
		return transferContent;
	}
	return fileCon;

}

export default {
	hasFilePath,
	readContent,
	findRelative,
	hasRelative,
	replaceRelative
}