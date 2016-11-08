var slackUtils = require('../utils/slack');
var requestUtils = require('../utils/request');

module.exports = function (param) {
    var usernames = param.args;

    if (!usernames || !usernames.length || !/^<@(.+)>$/.test(usernames[0])) {
        return slackUtils.postMessage(param.channel, 'Missing or wrong username!');
    }

    var usernameParsed = usernames[0].slice(2).slice(0,-1);

    slackUtils.getUserInfo(usernameParsed, function (user) {
        requestUtils.notifyHost({
            url: 'http://localhost:8080/api/users',
            data: {
                user: user.real_name,
                email: user.profile.email
            }
        }, function (err) {
            if(err) {
                slackUtils.postMessage(param.channel, 'Internal server error');
                return console.dir(err);
            }

            setImmediate(function () {
                slackUtils.postMessage(param.channel, 'The user: {name: ' + user.real_name + ', email: ' + user.profile.email + '} was exported!');
            });
        });
    });
};