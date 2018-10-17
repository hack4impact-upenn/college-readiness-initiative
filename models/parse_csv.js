var mongoose = require("mongoose"); //ensures interaction with DB previously made

function parseCSV(url) {
	var parsedData; //array to contain the parsed data to turn into documents
	
	Papa.parse(url, { //using Papa Parse
		//these are the configuration values for the parse
		download: true, //required for a URL
		header: false, //don't use headers for data array
		trimHeaders: true, //trim spaces from headers if applicable
		dynamicTyping: false, //parse everything as string; cast types later
		preview: 0, //parses all rows with content
		encoding: "", //not specifying a default encoding
		worker: false, //worker not necessary; the csv won't be large
		comments: false, //there shouldn't be comments in csv
		step: undefined, //streaming not necessary, file not large enough
		complete: function(results) { //store results of parse (callback)
			parsedData = results.data;
		},
		skipEmptyLines: true, //skip empty rows
		chunk: undefined, //step is being used; don't chunk (bad practice)
		fastMode: true, //there are no " characters, will speed up parse
		beforeFirstChunk: undefined, //no chunking; not defined
		transform: undefined //no need to transform; will do in loop
	});

	var QuestionModel = require('./question')
	
	//skipping parsedData[0], as it contains headers
	for(var i = 1; i < parsedData.length; i++) {
		//create Question document
		let q = new QuestionModel({
			description: parsedData[i][0],
			knowledge: parsedData[i][1],
			test_num: parsedData[i][2],
			calc: parsedData[i][3] === 'W',
			image_link: parsedData[i][4],
			difficulty: Number(parsedData[i][5]),
			type: parsedData[i][6],
			question_num: Number(parsedData[i][7]),
			category: parsedData[i][8],
			subcategory: parsedData[i][9],
			isMC: parsedData[i][10] === 'A' || parsedData[i][10] === 'B' || parsedData[i][10] === 'C' || parsedData[i][10] === 'D',
			answer: parsedData[i][10]
		
		});

		//add new question to DB
		q.save()
		.then(doc => { //these lines are purely for testing
     			console.log(doc)
   		})
   		.catch(err => {
     			console.error(err)
   		});
	}
}

//make sure the URL is set to download a CSV
//also, this is a temporary URL for testing
var testURL = 'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';

parseCSV(testURL);
