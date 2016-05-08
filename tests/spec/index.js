var expect = require('expect.js');
var refMove = require('../../src');
var fs = require('fs');
var path = require('path');
var cwd = process.cwd();
var matchedRequire = require('match-require');

const relativeStr = 'import "./import-transfer.spec.js";\nrequire("../package.json")';
const relativePath = path.join(__dirname, '../file-feature/relative-ref.js');

describe('read file content', function() {
	it('from file', function(){ 
		const filePath = path.join(cwd, '../../package.json');
		const content = refMove.readContent(filePath);
		expect(content).to.eql(fs.readFileSync(filePath, 'utf-8'))
	});

	it('from content', function() {
		const content = 'ceshi'
		expect(refMove.readContent(content)).to.eql(content);
	})
});

describe('find relative', function() {
	it('from str', function() {
		expect(refMove.findRelative(relativeStr)).to.have.length(2);
	});
	
	it('from str', function() {
		expect(refMove.findRelative(relativePath)).to.have.length(3);
	});
})

describe('test has relative', function(){
	it('from str', function() {
		expect(refMove.hasRelative(relativeStr)).to.be.ok();
	});

	it('from file', function() {
		expect(refMove.hasRelative(relativePath)).to.be.ok();
	});
})
	
describe('replace relative refrence', function() {
	it('no arguments', function() {
		expect(refMove.replaceRelative).withArgs().to.throwError(function(e){ 
			expect(e).to.be('please pass correct source or content info')
		});
	});

	it('just path', function() {
		const transferContent = refMove.replaceRelative(relativePath);
		const matchRequire = matchedRequire.findAll(transferContent);
		const matchImport = matchedRequire.findAllImports(transferContent);
		expect(matchRequire).to.have.length(2);
		matchRequire.forEach(function(item) {
			expect(path.isAbsolute(item)).to.be.ok();
			expect(path.dirname(item)).to.be(cwd);
		});
		expect(matchImport).to.have.length(1);
		matchImport.forEach(function(item){
			expect(path.isAbsolute(item)).to.be.ok();
			expect(path.dirname(item)).to.be(path.join(cwd, 'tests/file-feature'));
		})
	});

	it('split content path', function() {
		const transferContent = refMove.replaceRelative(path.join(cwd, 'tests'), relativeStr);
		const matchRequire = matchedRequire.findAll(transferContent);
		const matchImport = matchedRequire.findAllImports(transferContent);
		expect(matchRequire).to.have.length(1);
		expect(path.isAbsolute(matchRequire[0])).to.be.ok();
		expect(path.dirname(matchRequire[0])).to.be(cwd);
		expect(matchImport).to.have.length(1);
		expect(path.isAbsolute(matchImport[0])).to.be.ok();
		expect(path.dirname(matchImport[0])).to.be(path.join(cwd, 'tests'));
	});

	it('virtual path', function() {
		refMove.replaceRelative(path.join(cwd, 'test'), relativeStr);
		const transferContent = refMove.replaceRelative(path.join(cwd, 'test'), relativeStr);
		const matchRequire = matchedRequire.findAll(transferContent);
		const matchImport = matchedRequire.findAllImports(transferContent);
		expect(matchRequire).to.have.length(1);
		expect(path.isAbsolute(matchRequire[0])).to.be.ok();
		expect(path.dirname(matchRequire[0])).to.be(cwd);
		expect(matchImport).to.have.length(1);
		expect(path.isAbsolute(matchImport[0])).to.be.ok();
		expect(path.dirname(matchImport[0])).to.be(path.join(cwd, 'test'));
	})
})