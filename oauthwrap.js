//	filename: oauthwrap.js

/** 
* @module oauth-wrap 
* @description Provides a function to retrieve OAuth WRAP security tokens.
*/

'use strict';

var httpRequest = require('request-promise');
var promise = require('promise');

/**
*	Get an OAuth WRAP header value from an STS.
*	@param {string} url STS url.
*	@param {string} uid WRAP name/username/user id.
*	@param {string} pwd WRAP password.
*	@param {string} scope WRAP scope.
*	@returns {function} A promise.
*		The promise will resolve with the the OAuth WRAP security token
*		formatted as an http header value.
*		Any response with a status code that is not 2xx will result in a rejected promise.
*/
module.exports.getAuthHeader = function(url, uid, pwd, scope) {

	var form = {'wrap_name': uid, 
		'wrap_password': pwd, 
		'wrap_scope': scope};

	return new promise(function(resolve, reject) {
		httpRequest.post({url: url, form: form})
			.then(function(body) {
				try {
					//console.log(body.statusCode);
					var output = body.split('&')[0];
					var start = 'wrap_access_token=';
					resolve('WRAP access_token="' + unescape(output.substring(start.length, output.length)) + '"');
				} catch (err) {
					try {
						console.log('status', err.statusCode);
					} catch(e) { 
						console.log(e); 
					}
					reject(err);
				};
			})
			.catch(function(err) {
				reject(err);
			});
	});		
}