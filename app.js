var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const {Dataset} = require('data.js')
const fs = require('fs')
const data_path = 'https://datahub.io/rufuspollock/oscars-nominees-and-winners/datapackage.json'
// We're using self-invoking function here as we want to use async-await syntax:
async function getJSON()  {
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
      console.log(y)
      counter++;
      // Needs to run twice before we return
      // JSON.stringify(y)
      if(counter === 2) {
        fs.writeFile("./bin/moviedata.json", JSON.stringify(y), err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
        })
      }
    }
  }
}
getJSON()

// app.locals.moviedata = "./bin/moviedata.json";

module.exports = app;