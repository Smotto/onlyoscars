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

/* Requirements for FETCH */
const fetch = require("node-fetch");

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

/* Call Function to write a custom JSON File to our server */
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

// Step 1: HAVE API KEY. http://www.omdbapi.com/?apikey=c83e29fc&
// Step 2: Use API Key to infiltrate their database
// Step 2a: Send a fetch request to the url containing movie title
// Step 2b: Returns object
// Step 3: Take values out of object
// Step 4: Store values into our server...
async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

/* create/update JSON file on server start */
async function upsertJSON()  {
  let datasetCounter = 0;
  let doWeHaveToPayCounter = 0;
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
      // The file is buffered, and once done is converted to a string (from 0's and 1's to something readable)
      let rawMovieString = buffer.toString()
      // The string gets parsed to become a JSON Object.
      let rawMovieJSON = JSON.parse(rawMovieString)

      datasetCounter++;
      // Needs to loop through once first, then we care about the data.
      if(datasetCounter === 2)
      {
        //TODO: Get version number from OMDB
        let versionNumberOMDB = 1;
        if (!fs.existsSync('./moviedata.json') && versionNumberOMDB === 1)
        {
          let omdbJSONObjectDataList = [];
          console.log('This is the length of rawMovieJSON: ' + rawMovieJSON.length)
          //TODO: Check OMDB Version Number before doing this insanely long step
          for (let element = 0; element < rawMovieJSON.length; element++)
          {
            let category = rawMovieJSON[element].category;
            if (category === 'ACTOR'
                || category === 'ACTRESS'
                || category === 'DIRECTING (Comedy Picture)'
                || category === 'DIRECTING (Dramatic Picture)'
                || category === 'ENGINEERING EFFECTS'
                || category === 'DANCE DIRECTION'
                || category === 'ACTOR IN SUPPORTING ROLE'
                || category === 'ACTRESS IN SUPPORTING ROLE'
                || category === 'IRVING G. THALBERG MEMORIAL AWARD'
                || category === 'HONORARY AWARD'
                || category === 'JEAN HERSHOLT HUMANITARIAN AWARD'
                || category === 'ACTOR IN LEADING ROLE'
                || category === 'ACTRESS IN LEADING ROLE')
            {
              continue;
            }
            else {
              doWeHaveToPayCounter++;
              let entityStringNormalized = rawMovieJSON[element].entity.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              // Squishes the string so less exception handling.
              entityStringNormalized.substring(0, 255);
              //console.log(element);
              try {
                // let jsonObjectResponse = await getData("http://www.omdbapi.com/?apikey=c83e29fc&t=" + entityStringNormalized);
                // //TODO: Link together the data.
                // // IMDB ID
                // rawMovieJSON[element].imdbID = jsonObjectResponse.imdbID;
                // rawMovieJSON[element].postSRC = jsonObjectResponse.Poster;
                // rawMovieJSON[element].type = jsonObjectResponse.Type;
                // // POSTER html
                // console.log(rawMovieJSON[element]["imdbLink"]);
                // omdbJSONObjectDataList.push(jsonObjectResponse);
              } catch (error)
              {
                console.error(error);
              }
            }
          }
          console.log("How many requests we would have to make: " + doWeHaveToPayCounter);
          fs.writeFileSync('./omdbdata.json', JSON.stringify(omdbJSONObjectDataList))
          fs.closeSync(0);
          console.log("Finished with OMDB installation")
        }
        try {
          if(!fs.existsSync('./moviedata.json')) {
            fs.writeFileSync('./moviedata.json', JSON.stringify(rawMovieJSON))
            console.log("moviedata.json - File Written Successfully")
            fs.closeSync(0);
          }
          //TODO: Figure out which path we are using.
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