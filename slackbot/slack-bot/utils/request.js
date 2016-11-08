var request = require('request');

var notifyHost = function (options, cb) {
	request({
		url: options.url,
		method: 'POST',
		body: options.data,
		json: true
	}, cb);
}

module.exports.notifyHost = notifyHost;