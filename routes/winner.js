var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:category/year/:year/winner/:winorlose', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let winorlose = req.params.winorlose;
    if (winorlose === "true") {
        winorlose = true;
    }
    if (winorlose === "false") {
        winorlose = false;
    }
    let temp_year = parseInt(req.params.year);
    let temp_category = req.params.category.toUpperCase();
    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].year
                === temp_year && req.app.locals.moviedata[element].category
                === temp_category && req.app.locals.moviedata[element].winner === winorlose)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



