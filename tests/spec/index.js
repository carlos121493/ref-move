var expect = require('expect.js');
var refMove = require('../../src');
var fs = require('fs');
var path = require('path');
var cwd = process.cwd();

describe('test read file content', function() {
	it('read file', function(){ 
		const filePath = path.join(cwd, '../../package.json');
		const content = refMove.readContent(filePath);
		expect(content).to.eql(fs.readFileSync(filePath, 'utf-8'))
	});

	it('read content', function() {
		const content = 'ceshi'
		expect(refMove.readContent(content)).to.eql(content);
	})
});

describe('test find relative path', function() {
	const relativeStr = 'import "./import-transfer.spec.js";\nrequire("../package.json")';
	const relativePath = path.join(__dirname, '../file-feature/relative-ref.js');
	
	it('find relative attr from str', function() {
		expect(refMove.findRelative(relativeStr).length).to.be(2);
	});
	
	it('find relative attr from str', function() {
		expect(refMove.findRelative(relativePath).length).to.be(2);
	});

	it('test has relative str', function() {
		expect(refMove.hasRelative(relativeStr)).to.be.ok();
	});

	it('test has relative file', function() {
		expect(refMove.hasRelative(relativePath)).to.be.ok();
	});
})