var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'onlyoscars' });
  console.log(getJSON())
});

module.exports = router;
const {Dataset} = require('data.js')

const path = 'https://datahub.io/rufuspollock/oscars-nominees-and-winners/datapackage.json'
// We're using self-invoking function here as we want to use async-await syntax:
async function getJSON()  {
    const dataset = await Dataset.load(path)
    // get list of all resources:
    for (const id in dataset.resources) {
        console.log(dataset.resources[id]._descriptor.name)
    }
    // get all tabular data(if exists any)
    for (const id in dataset.resources) {
        if (dataset.resources[id]._descriptor.format === "json") {
            const file = dataset.resources[id]
            // Get a raw stream
            const stream = await file.stream()
            // entire file as a buffer (be careful with large files!)
            const buffer = await file.buffer
            // print data


            let x = buffer.toString()
            let y = JSON.parse(x)
            console.log(y)
            return y;

        }
    }
}

const https = require('https')
const jsonUrl = 'https://pkgstore.datahub.io/36661def37f62e4130670ab75e06465a/oscars-nominees-and-winners/data_json/data/d3c23178ad964c76c8ce0ed81762ed7b/data_json.json'
function get_json(url, callback) {
    https.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var response = JSON.parse(body);
            callback(response);
        });
    });
}

var data = get_json(jsonUrl, function (resp) {
    console.log(resp);
    return resp;
});





// const url = 'https://pkgstore.datahub.io/36661def37f62e4130670ab75e06465a/oscars-nominees-and-winners/data_json/data/d3c23178ad964c76c8ce0ed81762ed7b/data_json.json'
// // const { JSDOM } = require( "jsdom" );
// // const { window } = new JSDOM( "" );
// // const $ = require( "jquery" )( window );
// //
// // $.getJSON(url, function(data) {
// //     console.log(data);
// // })
// fetch('./data.json')
//     .then(response => response.json())
//     .then(data => console.log(data))




