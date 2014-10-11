var connect = require('connect'),
    http = require('http'),
    express = require('express'),
    app = connect();

app.use("/", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/stubs"));
app.use("/", express.static(__dirname + "/public/build"));

console.log('living history server is running on 3000 port');
http.createServer(app).listen(3000);