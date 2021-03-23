var express = require('express');
var router = express.Router();

/* GRABBING MOVIE API */
const {Dataset} = require('data.js')
const data_path = 'https://datahub.io/rufuspollock/oscars-nominees-and-winners/datapackage.json';
// We're using self-invoking function here as we want to use async-await syntax:
(async () => {
  const dataset = await Dataset.load(data_path)
  // get list of all resources:
  for (const id in dataset.resources) {
    console.log(dataset.resources[id]._descriptor.name)
  }
  // get all tabular data(if exists any)
  for (const id in dataset.resources) {
    if (dataset.resources[id]._descriptor.format === "json") {
      const my_data = dataset.resources[id]
      // Get a raw stream
      const stream = await my_data.stream()
      // temporary storage for data, passed on to the process
      const buffer = await my_data.buffer
      // print data
      // console.log(buffer.toString());
      // stream.pipe(process.stdout)
      let json_raw_data = buffer.toString()
      let json_parsed_data = JSON.parse(json_raw_data);
      console.log(json_parsed_data);
    }
  }
})()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'onlyoscars :^)' });

});

module.exports = router;

