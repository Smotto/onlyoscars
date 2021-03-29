var express = require('express');
var router = express.Router();

/* GET request */
router.get('/:category', function(req, res, next) {
    console.log("GET Request Received for: Specific Page.");
    let temp_category = req.params.category.toUpperCase();

    function addFindings()
    {
        let movieDataList = [];
        for(let element in req.app.locals.moviedata)
        {
            if(req.app.locals.moviedata[element].category === temp_category)
            {
                movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
            }
        }
        return movieDataList;
    }

    res.render('specificPage', { title: 'Specific Page', body: addFindings()});
});

module.exports = router;



