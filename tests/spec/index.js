var expect = require('expect.js');
var refMove = require('../../src');
var fs = require('fs');

describe('test readContent', function() {
	it('read file', function(){ 
		const filePath = '../../package.json';
		const content = refMove.readContent(filePath);
		expect(content).to.eql(fs.readFileSync(filePath, 'utf-8'))
	});

	it('read content', function() {
		const content = 'ceshi'
		expect(refMove.readContent(content)).to.eql(content);
	})
});