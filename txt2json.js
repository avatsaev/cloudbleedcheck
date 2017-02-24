// var reader = require ("buffered-reader");
// var BinaryReader = reader.BinaryReader;
// var DataReader = reader.DataReader;
//
// if (process.argv.length < 3) {
//   console.log('Usage: node ' + process.argv[1] + ' FILENAME');
//   process.exit(1);
// }
// // Read the file and print its contents.
// var fs = require('fs'), filename = process.argv[2];
// var domains = [];
//
// new DataReader(filename, { encoding: "utf8" })
//   .on ("error", function (error){
//     console.log ("error: " + error);
//   }).on ("line", function (line){
//     domains.push(line);
//   }).on ("end", function (){
//
//     var db = JSON.stringify({
//       "domains": domains
//     });
//
//     fs.writeFile("./data/domains.json", db, function(err){
//       if(err){
//         cosole.errno("err: ", err);
//       }
//     });
//
//   }).read ();