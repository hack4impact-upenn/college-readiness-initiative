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
		step: function(results) { //necessary to avoid max stack capacity
			console.log("Finished parsing!", results.data);
			arr = results.data;
			
			var MongoClient = require('mongodb').MongoClient;
			MongoClient.connect('mongodb://localhost:27017/question_db', function(err,db) { //open and connect to DB
				if(err) throw err;
				console.log("Connected successfully to " + db.databaseName);
				if(arr[0][0] != "Description") { //avoid parsing header row
					db.collection('test_questions').insertOne({ //the array will have only one row
						description: arr[0][0],
						knowledge: arr[0][1],
						test_num: arr[0][2],
						calc: arr[0][3] == 'W',
						image_link: arr[0][4],
						difficulty: Number(arr[0][5]),
						type: arr[0][6],
						question_num: Number(arr[0][7]),
						category: arr[0][8],
						subcategory: arr[0][9],
						isMC: (arr[0][10] == 'A') || (arr[0][10] == 'B') || (arr[0][10] == 'C') || (arr[0][10] == 'D'),
						answer: arr[0][10]
					}, function(err,res) {
						if(err) throw err;
						console.log("Document " + i + " inserted!");
						db.close();
					});
				}
			});
			console.log("Finished uploading!");
		},
		complete: undefined, //file too large for complete callback
		skipEmptyLines: true, //skip empty rows
		chunk: undefined, //step is being used; don't chunk (bad practice)
		fastMode: true, //there are no " characters, will speed up parse
		beforeFirstChunk: undefined, //no chunking; not defined
		transform: undefined //no need to transform; will do in loop
	});
}

//make sure the URL is set to download a CSV
//also, this is a temporary URL for testing
//var testURL = 'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';
