var express = require('express');
var app = express();

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('Private route hit');
        next();
    },
    logger: function (req, res, next) {
        console.log('Request @ ' + Date().toString() + ': ' + req.method + ' ' + req.originalUrl);
        next();
    }
};

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
    res.send('About us!');
})

app.use(express.static(__dirname + '/public'));

var PORT = 3000;
app.listen(PORT, function () {
    console.log('Express server started on port: ' + PORT);
});