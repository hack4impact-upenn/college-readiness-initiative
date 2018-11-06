var insertQuestions = function insertQuestions(arr) {
	var mongoose = require('mongoose');
	var QuestionModel = require('../models/question');

    for (var i = 1; i < arr.length; i++) {
        let q = new QuestionModel({
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
	q.save();
        console.log("Added question " + i + " to database");
    }
    console.log("Finished uploading!");
}

module.exports = insertQuestions;
