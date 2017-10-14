var mocha = require('mocha'),
	supertest = require('supertest'),
	chai = require('chai'),
	should = require('should'),
	assert = require('assert'),
	CodeBreaker = require('../CodeBreaker'),
	app = require('../App.js');;

var request = supertest(app);
var expect = chai.expect;

var code = new CodeBreaker();

beforeEach(function () {
	code.setSecret('1234');	
});

describe('CodeBreaker', function() {
	it('Test sending secret number', function() {
		assert.equal('XXXX', code.tryCode(code.getSecret()));
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
	it('Test between 1 to 3 exact position digit', function() {
		var result = [
			'X',
			'X_',
			'X__',
			'X___',
			'XX',
			'XX_',
			'XX__',
			'XXX',
			'XXX_'
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

describe('GET /setSecret/:number', function() {
	it('should return code 200', function(done) {
		request.get('/setSecret/1234')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return a Content-Type application/json', function(done) {
		request.get('/setSecret/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if (err) return done(err);
				done();
			});
	});

	it('should return a correct message Json Object', function(done) {
		request.get('/setsecret/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if (err) return done(err);
				should.not.exist(err);
				should.exist(res);
				res.body.should.be.an.Object;
				should.exist(res.body.message);
				done();
			});
	});
});

describe('GET /tryCode/:number', function() {
	it('should return code 200', function(done) {
		request.get('/tryCode/1234')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
			   done();
			});
	});

	it('should return a Content-Type application/json', function(done) {
		request.get('/tryCode/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if (err) return done(err);
			   done();
			});
	});

	it('should return a correct result Json Object', function(done) {
		request.get('/tryCode/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if (err) return done(err);
				should.not.exist(err);
				should.exist(res);
				res.body.should.be.an.Object;
				should.exist(res.body.result);
				done();
			});
	});

	it('should guess the correct number', function(done) {
		request.get('/tryCode/1234')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res){
				if (err) return done(err);
				should.not.exist(err);
				should.exist(res);
				res.body.should.be.an.Object;
				should.exist(res.body.result);
				assert.equal('XXXX',res.body.result);
				done();
			});
	});
});