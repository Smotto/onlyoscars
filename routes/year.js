var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:category/year/:year', function (req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let temp_year = parseInt(req.params.year);
    let temp_category = req.params.category;
    console.log(temp_year);

    function addFindings() {
        let movieDataList = [];
        for (let element in req.app.locals.moviedata) {
            if (req.app.locals.moviedata[element].year === temp_year && req.app.locals.moviedata[element].category === temp_category) {
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

    res.render('specificPage', {title: 'Specific Page', filteringFindings: addFindings()});
});

module.exports = router;



