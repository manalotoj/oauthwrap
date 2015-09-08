//	filename: index.js

/** 
* @module oauthwrap 
* @description Supports function to retrieve OAuth WRAP security tokens from an STS.
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
*	@param {function} callback Data will contain authorization token formatted as required for
*		an http request header.
*	@returns {function} Returns a promise using nodejs promise module.
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