
let db = [] ;
const fs = require('fs'),
    JSONStream = require('JSONStream'),
    es = require('event-stream');

const getStream = () => {
  let jsonData = 'data/domains.json',
      stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
      parser = JSONStream.parse('domains.*');
  return stream.pipe(parser);
};

getStream()
    .pipe(es.mapSync(
        (data) => db.push(data)
    ));

module.exports = db;



