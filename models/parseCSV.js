window.parseCSV = function(file) {

	var arr; //array later used to insert quesitons

	Papa.parse(file, { //using Papa Parse
	//these are the configuration values for the parse
		delimiter: "", //auto detect
		newline: "", //autonot URL
		download: false, //required for a URL
		header: false, //don't use headers for data array
		trimHeaders: true, //trim spaces from headers if applicable
		dynamicTyping: false, //parse everything as string; cast types later
		preview: 0, //parses all rows
		encoding: "", //not specifying a default encoding
		worker: false, //worker not necessary;
		comments: false, //there shouldn't be comments in csv
		complete: function(results, file) { //file shouldn't be so large as to break the site
			console.log("Finished parsing!", results.data, file);
			return results.data; //assign results to manipulation array
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
//var testURL = 'https://docs.google.com/spreadsheets/d/1vxBFJ1hNUa-FppSxs9zJObv5bPrKD-PCSFUNZ0E_XDY/export?format=csv&gid=1174560920';
//window.parseCSV(testURL);
