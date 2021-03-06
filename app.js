const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
