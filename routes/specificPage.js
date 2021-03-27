var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:entity', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let mineNow = req.params.entity;
    console.log(mineNow);
    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].entity === mineNow)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



