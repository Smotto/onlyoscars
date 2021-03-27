var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:year', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let mineNow = parseInt(req.params.year);
    console.log(mineNow);
    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].year === mineNow)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



