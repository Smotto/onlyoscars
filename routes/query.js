var express = require('express');
var router = express.Router();

/* Query String */
router.get('/', function (req, res, next) {
    console.log("GET Request Received for: Query String");
    let temp_winner = req.query.winner;
    if (temp_winner === "true") {
        temp_winner = true;
    }
    if (temp_winner === "false") {
        temp_winner = false;
    }
    let temp_year = parseInt(req.query.year);
    let temp_category = req.query.category.toUpperCase();
    console.log(req.query.year);
    console.log(req.query.category);
    console.log(req.query.winner);

    function addFindings() {
        let movieDataList = [];
        /* Everything ONLY */
        if (req.query.year !== undefined &&
            req.query.category !== undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year
                    === temp_year && req.app.locals.moviedata[element].category
                    === temp_category && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year AND Category ONLY */
        if (req.query.year !== undefined &&
            req.query.category !== undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year
                    === temp_year && req.app.locals.moviedata[element].category === temp_category) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year AND Winner ONLY */
        if (req.query.year !== undefined &&
            req.query.category === undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year
                    === temp_year && req.app.locals.moviedata[element].category) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year AND Winner ONLY */
        if (req.query.year !== undefined &&
            req.query.category === undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year
                    === temp_category && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year ONLY */
        if (req.query.year !== undefined &&
            req.query.category === undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Category AND Winner ONLY */
        if (req.query.year === undefined &&
            req.query.category !== undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].category
                    === temp_category && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Category ONLY */
        if (req.query.category !== undefined &&
            req.query.year === undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].category) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }

    }

    res.render('specificPage', {title: 'Specific Page', body: addFindings()});
});

module.exports = router;