var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:winorlose', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let mineNow = req.params.winorlose;
    if (mineNow === "true")
    {
        mineNow = true;
    }
    if (mineNow === "false")
    {
        mineNow = false;
    }
    console.log(mineNow);
    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].winner === mineNow)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



