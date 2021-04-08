var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let temp_year = req.params.year;

  function addMovieTitle()
  {
    let movieDataList = [];
    for(let element in req.app.locals.moviedata)
    {
      if(req.app.locals.moviedata[element].year === temp_year)
      {
        movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
      }
    }
    return movieDataList
  }
  res.render('index', { title: 'Only Oscars', var: addMovieTitle()});

});

module.exports = router;



