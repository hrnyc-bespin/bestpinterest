var express = require('express');
var app = express();

var logger = (req, res, next) => {
  console.log(`Received ${req.method} request at ${req.originalUrl}`);
  next();
}

app.use(logger);

app.listen(process.env.port || 3000, () => console.log('now listening on 3000'));