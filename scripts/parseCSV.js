var {StringStream} = require("scramjet");
var request = require("request");
var insertQuestions = require("./insertQuestions")

var parseCSV = function parseCSV(url) {
	var qArr = []; //array that will hold question data
	request.get(url) //gets URL
		.pipe(new StringStream()) //pipes to stream
		.CSVParse() //parses CSV
		.consume(function(object){ //callback (for each row)
				qArr.push(object);
		})
		.then(function() {
			console.log("Finished parsing!");
			insertQuestions(qArr);
		});
}

module.exports = parseCSV;

//make sure the URL is set to download a CSV or is to an embedded CSV
//also, this is a temporary URL for testing
//'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';

