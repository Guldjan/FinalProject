var slackTerminal = require('slack-terminalize');
var config = require('./default.js');

slackTerminal.init(config.SLACKTOKEN, {
}, {
		CONFIG_DIR: __dirname + '/config',
		COMMAND_DIR: __dirname + '/commands'
	});