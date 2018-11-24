var insertQuestions = function insertQuestions(arr) {
	var mongoose = require('mongoose');
	var QuestionModel = require('../models/question.js');

    for (var i = 1; i < arr.length; i++) {
        var newQ = new QuestionModel;
           newQ.description = arr[i][0];
           newQ.knowledge = arr[i][1];
           newQ.test_num = arr[i][2];
           newQ.calc = arr[i][3] == 'W';
           newQ.image_link = arr[i][4];
           newQ.difficulty = Number(arr[i][5]);
           newQ.type = arr[i][6].toLowerCase();
           newQ.question_num = Number(arr[i][7]);
           newQ.category = arr[i][8];
           newQ.subcategory = arr[i][9];
           newQ.isMC = (arr[i][10] == 'A') || (arr[i][10] == 'B') || (arr[i][10] == 'C') || (arr[i][10] == 'D');
           newQ.answer = arr[i][10];

	newQ.save().catch(error => {
		console.log(error)
	});
    }
    console.log("Finished uploading!");

}

module.exports = insertQuestions;
