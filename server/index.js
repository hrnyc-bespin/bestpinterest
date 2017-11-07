var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router.js');
var app = express();

var logger = (req, res, next) => {
  console.log(`Received ${req.method} request at ${req.originalUrl}`);
  next();
};

app.use(logger);
app.use(express.static(__dirname + '/dist'));
app.use('/', router);

app.listen(process.env.port || 3000, () =>
  console.log('now listening on 3000')
);
