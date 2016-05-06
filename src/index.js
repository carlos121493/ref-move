import 'babel-polyfill';
import matchedRequire from 'match-require';
import {isRelative} from 'path';
import fs from 'fs';

function readContent(fileName) {
	try {
		if (fs.realpathSync(fileName)) {
			return fs.readFileSync(fileName, 'utf-8');
		}	
	} catch(e) {
		return fileName;
	}
}

function findRelative(file, options) {
	const content = readContent(file);
}

export default {
	readContent
}