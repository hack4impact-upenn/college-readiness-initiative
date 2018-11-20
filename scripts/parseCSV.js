var {StringStream} = require("scramjet");
var request = require("request");
var insertQuestions = require("./insertQuestions");
var insertStudentQuestions = require("./insertNewStudentQuestions");
var StudentModel = require("../models/student");

var parseCSV = function parseCSV(url) {
	var re = /edit\#/;
	url = url.replace(re, 'export?format=csv&');

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
		})
		.then(function() {
    			StudentModel.find(function(err, students) {
				students.forEach(function(student) {
					console.log("calling insertStudentQuestions");
					insertStudentQuestions(student._id);
				});
    			});
		});
}

module.exports = parseCSV;

//make sure the URL is set to download a CSV or is to an embedded CSV
//temporary URL for testing below
//https://docs.google.com/spreadsheets/d/12YFBpOGECwVmeikaaRFarIcRTZ15N3Mre1wTY-HGL2w/export?format=csv&gid=1174560920;
