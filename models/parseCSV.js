parseCSV = function(arr) {
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/question_db', function(err,db) {
		if(err) throw err;
		console.log("Connected successfully to " + db.databaseName);
		//skipping arr[0], as it contains headers
		for(var i = 1; i < arr.length; i++) {
			db.collection('test_questions').insertOne({
				description: arr[i][0],
				knowledge: arr[i][1],
				test_num: arr[i][2],
				calc: arr[i][3] === 'W',
				image_link: arr[i][4],
				difficulty: Number(arr[i][5]),
				type: arr[i][6],
				question_num: Number(arr[i][7]),
				category: arr[i][8],
				subcategory: arr[i][9],
				isMC: (arr[i][10] === 'A') || (arr[i][10] === 'B') || (arr[i][10] === 'C') || (arr[i][10] === 'D'),
				answer: arr[i][10]
		
			}, function(err,res) {
				if(err) throw err;
				console.log("Document " + i + " inserted!");
				db.close();
			});
		}
	});
}

//make sure the URL is set to download a CSV
//also, this is a temporary URL for testing
//var testURL = 'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';
