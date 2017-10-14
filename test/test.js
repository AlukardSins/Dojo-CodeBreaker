var assert = require('assert');
var expect = require('expect.js');
var CodeBreaker = require('../CodeBreaker');
var code = new CodeBreaker();

beforeEach(function () {
	code.setSecret('1234');	
});


describe('CodeBreaker', function() {
	describe('#tryCode()', function() {
		it('Test sending secret number', function() {
			assert.equal('xxxx', code.tryCode(code.getSecret()));
		});
		it('Test sending non-valid characters', function() {
			assert.equal(null, code.tryCode('abcd'));
		});
		it('Test number size too long', function() {
			assert.equal(null, code.tryCode('12345'));
		});
		it('Test number too short', function() {
			assert.equal(null, code.tryCode('123'));
		});
		it('Test incorrect number', function() {
			assert.equal('', code.tryCode('5678'));
		});
		it('Test at least one equal same position digit', function() {
			var result = [
				'x',
				'x_',
				'x__',
				'x___',
				'xx',
				'xx_',
				'xx__',
				'xxx',
				'xxx_'
			]
			expect(result).to.contain(code.tryCode('1567'));
		});
		it('Test all different posibilities of digits position', function() {
			var result = [
				'_',
				'__',
				'___',
				'____'
			]
			expect(result).to.contain(code.tryCode('4321'));
		});
	});
});