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
    let temp_category = req.query.category;
    console.log(req.query.year);
    console.log(req.query.category);
    console.log(req.query.winner);

    function addFindings() {
        let movieDataList = [];
        /* Everything Required ONLY */
        if (req.query.year !== undefined &&
            req.query.category !== undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].category === temp_category
                    && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Nothing Required ONLY */
        if (req.query.year === undefined &&
            req.query.category === undefined &&
            req.query.winner === undefined) {
            return "";
        }
        /* Year AND Category ONLY */
        if (req.query.year !== undefined &&
            req.query.category !== undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].category === temp_category) {
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
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].winner === temp_winner) {
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
                if (req.app.locals.moviedata[element].year === temp_year) {
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
                if (req.app.locals.moviedata[element].category === temp_category
                    && req.app.locals.moviedata[element].winner === temp_winner) {
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
                if (req.app.locals.moviedata[element].category === temp_category) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Winner ONLY */
        if (req.query.winner !== undefined &&
            req.query.year === undefined &&
            req.query.category === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push(JSON.stringify(req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        return null;
    }

    /* Returns A Usable JSON STRING*/
    function fixStringListForJSONCompatibility()
    {
        let movieDataScuffedList = addFindings();
        if (movieDataScuffedList.length === 0) {
            return null;
        }
        else {
            movieDataScuffedList[0] = '[' + movieDataScuffedList[0];
            movieDataScuffedList[movieDataScuffedList.length - 1] = movieDataScuffedList[movieDataScuffedList.length - 1] + ']';
        }
        return movieDataScuffedList;
    }

    res.render('specificPage', {title: 'Specific Page', filteringFindings: fixStringListForJSONCompatibility()});
});

/* JSON ONLY Query String NO STRINGIFYING*/
// TODO: Reduce code duplication
router.get('/json/', function (req, res, next) {
    console.log("GET Request Received for: Query String");
    let temp_winner = req.query.winner;
    if (temp_winner === "true") {
        temp_winner = true;
    }
    if (temp_winner === "false") {
        temp_winner = false;
    }
    let temp_year = parseInt(req.query.year);
    let temp_category = req.query.category;

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
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].category === temp_category
                    && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Nothing ONLY */
        if (req.query.year === undefined &&
            req.query.category === undefined &&
            req.query.winner === undefined) {
            return req.app.locals.moviedata;
        }
        /* Year AND Category ONLY */
        if (req.query.year !== undefined &&
            req.query.category !== undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].category === temp_category) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year AND Winner ONLY */
        if (req.query.year !== undefined &&
            req.query.category === undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year === temp_year
                    && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Year ONLY */
        if (req.query.year !== undefined &&
            req.query.category === undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].year === temp_year) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Category AND Winner ONLY */
        if (req.query.year === undefined &&
            req.query.category !== undefined &&
            req.query.winner !== undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].category === temp_category
                    && req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Category ONLY */
        if (req.query.category !== undefined &&
            req.query.year === undefined &&
            req.query.winner === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].category === temp_category) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }
        /* Winner ONLY */
        if (req.query.winner !== undefined &&
            req.query.year === undefined &&
            req.query.category === undefined) {
            for (let element in req.app.locals.moviedata) {
                if (req.app.locals.moviedata[element].winner === temp_winner) {
                    movieDataList.push((req.app.locals.moviedata[element]));
                }
            }
            return movieDataList;
        }

        return null;
    }

    res.json(addFindings());
});


module.exports = router;