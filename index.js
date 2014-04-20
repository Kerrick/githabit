var http = require('http');
var url = require('url');
var validateWebhook = require('./lib/validate-webhook');
var habitRpg = require('./lib/habit-rpg');

// Listen for GitHub webhooks
http.createServer(function(req, res) {
    var query = url.parse(req.url, true).query;
    res.statusCode = validateWebhook(req);
    var message = http.STATUS_CODES[res.statusCode];
    var resEnd = res.end.bind(res, message, 'utf8');

    req.on('end', function() {
        if (res.statusCode >= 400) return resEnd();
        return habitRpg({ api: query.api, user: query.user }, resEnd);
    }).resume();
}).listen(process.env.GITHABIT_PORT || 4567);
