var express = require('express');
var router = express.Router();

/* GET request */
router.get('/', function(req, res, next) {
    console.log("GET Request Received for: Category.");
    console.log("This is the body of the request: " + req.body.info);

    res.render('index', { title: 'Displaying Categories', body: "category data should be in the body?"});
});

module.exports = router;



