var mocha = require('mocha'),
	supertest = require('supertest'),
	chai = require('chai'),
	should = require('should'),
	assert = require('assert'),
	CodeBreaker = require('../CodeBreaker'),
	app = require('../App.js');;

var request = supertest(app);

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

describe('GET /getSecret', function() {
	it('should return anwser code', function(done) {
		request.get('/getSecret')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
			   done();
			});
	});
});