var connect = require('connect'),
    http = require('http'),
    express = require('express'),
    app = connect(),
    port = process.env.PORT || 3000;

app.use("/", express.static(__dirname + "/www"));
app.use("/", express.static(__dirname + "/stubs"));
app.use("/", express.static(__dirname + "/www/build"));

console.log('living history server is running on ' + port + ' port');
http.createServer(app).listen(port);