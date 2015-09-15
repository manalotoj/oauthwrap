jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

describe("oauthwrap", function() {

	var oauthwrap = require('./index.js');
	var promise = require('promise');
	var module;
	var promiseStub;
	var httpRequestMock;

	beforeEach(function(){
		 promiseStub = new promise(function(resolve, reject){
			resolve('wrap_access_token="sometokencontent"');
		});				
	});

	it('should be defined', function() {
		expect(oauthwrap.getAuthHeader).toBeDefined();
	}),
	it('invalid credentials return 401', function(done) {
		var promise = oauthwrap.getAuthHeader(
			'https://studentverification.accesscontrol.windows.net/WRAPv0.9/', 
			'userid', 
			'password', 
			'https://localhost/');
			promise.then(function(response) {
				done(new Error('should have failed.'));
			}, function(err) {
				expect(err.statusCode).toBe(401);
				//console.log('status: ', err.statusCode, '; message: ', err.message);
				done();
			});
			
	}),
	it('non-existent url returns 404', function(done) {
		var promise = oauthwrap.getAuthHeader(
			'https://studentverification.accesscontrol.windows.net/WRAPv0.9/1', 
			'uid', 
			'pwd', 
			'wrapscope');
			promise.then(function(response) {
				done(new Error('should have failed.'));
			}, function(err) {
				expect(err.statusCode).toBe(404);
				//console.log('status: ', err.statusCode, '; message: ', err.message);
				done();
			});			
	})
});