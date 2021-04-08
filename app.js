var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/* New Routers */
var categoryRouter = require('./routes/category');
var yearRouter = require('./routes/year');
var winnerRouter = require('./routes/winner');
var queryRouter = require('./routes/query');

/* Requirements for JSON data */
const {Dataset} = require('data.js')
const fs = require('fs')
const data_path = 'https://datahub.io/rufuspollock/oscars-nominees-and-winners/datapackage.json'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/* New Router Usage */
app.use('/api/', queryRouter);
app.use('/api/category/', categoryRouter);
app.use('/api/category/', yearRouter);
app.use('/api/category/', winnerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

upsertJSON();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* create/update JSON file on server start */
async function upsertJSON()  {
  let counter = 0;
  const dataset = await Dataset.load(data_path)
  // get list of all resources:
  for (const id in dataset.resources) {
    console.log(dataset.resources[id]._descriptor.name)
  }
  // get all tabular data(if exists any)
  for (const id in dataset.resources) {
    if (dataset.resources[id]._descriptor.format === "json") {
      const file = dataset.resources[id]
      // Get a raw stream
      const stream = await file.stream()
      // entire file as a buffer (be careful with large files!)
      const buffer = await file.buffer
      // print data
      let x = buffer.toString()
      let y = JSON.parse(x)
      //console.log(y)
      counter++;
      // Needs to loop through once first, then we care about the data.
      if(counter === 2)
      {
        try {
          fs.writeFileSync('./moviedata.json', JSON.stringify(y))
          console.log("File Written Successfully")
          fs.closeSync(0);
          app.locals.moviedata = require('./bin/moviedata.json');
          //file written successfully
        } catch (err) {
          console.error(err)
          return;
        }
      }
    }
  }
}

module.exports = app;