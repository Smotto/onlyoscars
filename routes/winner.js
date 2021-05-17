var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:category/year/:year/winner/:winner', function (req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let temp_winner = req.params.winner;
    if (temp_winner === "true") {
        temp_winner = true;
    }
    if (temp_winner === "false") {
        temp_winner = false;
    }
    let temp_year = parseInt(req.params.year);
    let temp_category = req.params.category;

    function addFindings() {
        let movieDataList = [];
        for (let element in req.app.locals.moviedata) {
            if (req.app.locals.moviedata[element].year
                === temp_year && req.app.locals.moviedata[element].category
                === temp_category && req.app.locals.moviedata[element].winner === temp_winner) {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        if (movieDataList.length === 0) {
            return movieDataList;
        }
        else {
            movieDataList[0] = '[' + movieDataList[0];
            movieDataList[movieDataList.length - 1] = movieDataList[movieDataList.length - 1] + ']';
        }

        return movieDataList;
    }

    res.render('specificPage', {title: 'OnlyOscars - Results', filteringFindings: addFindings()});
});

module.exports = router;



