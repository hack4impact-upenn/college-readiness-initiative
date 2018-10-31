window.parseCSV = function(url) {

	var arr; //array later used to insert quesitons

	Papa.parse(url, { //using Papa Parse
	//these are the configuration values for the parse
		delimiter: "", //auto detect
		newline: "", //auto detect
		download: true, //required for a URL
		header: false, //don't use headers for data array
		trimHeaders: true, //trim spaces from headers if applicable
		dynamicTyping: false, //parse everything as string; cast types later
		preview: 0, //parses all rows
		encoding: "", //not specifying a default encoding
		worker: false, //worker not necessary;
		comments: false, //there shouldn't be comments in csv
		complete: function(results) { //file shouldn't be so large as to break the site
			console.log("Finished parsing!", results.data);
			return results.data; //assign results to manipulation array
			/*
			var mongoose = require('mongoose');
			var question = require('./question.js'); //get questions schema

			for(var i = 1; i < arr.length; i++) { //avoid parsing header row
				var q = new Question({ //create question
					description: arr[i][0],
					knowledge: arr[i][1],
					test_num: arr[i][2],
					calc: arr[i][3] == 'W',
					image_link: arr[i][4],
					difficulty: Number(arr[i][5]),
					type: arr[i][6],
					question_num: Number(arr[i][7]),
					category: arr[i][8],
					subcategory: arr[i][9],
					isMC: (arr[i][10] == 'A') || (arr[i][10] == 'B') || (arr[i][10] == 'C') || (arr[i][10] == 'D'),
					answer: arr[i][10]
				});
				
				q.save(function(err,doc) { //saves question
					if(err) throw err;
					console.log("Document " + i + " inserted!");
					console.log(doc);
				});
			}
			console.log("Finished uploading!");*/
		},
		skipEmptyLines: true, //skip empty rows
		chunk: undefined, //step is being used; don't chunk (bad practice)
		fastMode: true, //there are no " characters, will speed up parse
		beforeFirstChunk: undefined, //no chunking; not defined
		transform: undefined //no need to transform; will do in loop
	});
}

//make sure the URL is set to download a CSV
//also, this is a temporary URL for testing
var testURL = 'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';
window.parseCSV(testURL);
