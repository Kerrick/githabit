var https = require('https');

// Send data to the HabitRPG Simple API
module.exports = function(options, callback) {
    var name = encodeURIComponent(options.taskName || 'GitHub');
    var dir = encodeURIComponent(options.direction || 'up');

    https.request({
        hostname: 'beta.habitrpg.com',
        method: 'POST',
        path: '/api/v2/user/tasks/' + name + '/' + dir,
        headers: { 'x-api-key': options.api, 'x-api-user': options.user }
    }, callback).on('error', console.error.bind(console)).end();
};
