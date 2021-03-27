var express = require('express');
var router = express.Router();

/* GET request */
router.get('/', function(req, res, next) {
    console.log("GET Request Received for: Category.");
    console.log("This is the body of the request: " + req.body.info);

    res.render('index', { title: 'Displaying Categories', body: "category data should be in the body?"});
});

/* GET request */
router.get('/:category', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let mineNow = req.params.category.toUpperCase();
    console.log(mineNow);
    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].category === mineNow)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



