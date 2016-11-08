var slackTerminalize = require('slack-terminalize');
var webClient = slackTerminalize.getWebClient();

var getUserInfo = function (username, cb) {
	webClient.users.info(username, function (err, response) {
		if (err || (response && !response.ok)) {
			return cb(err ? err : response);
		}
		cb(response.user);
	});
};

var postMessage = function (channel, response) {
	response = '```' + response + '```';

	webClient.chat.postMessage(channel, response, {
		as_user: true
	});
};

module.exports = {
	postMessage: postMessage,
	getUserInfo: getUserInfo
};