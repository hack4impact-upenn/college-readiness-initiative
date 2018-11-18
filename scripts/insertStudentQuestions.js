var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var insertStudentQuestions = function insertStudentQuestions(student) {
	QuestionModel.find().distinct('type', function(err, questionTypes) {
		questionTypes.forEach(function(questionType) { 
			if(!(questionType in student.current_questions)) {
				student.current_questions[questionType] = [];
			}
			QuestionModel.find({type: questionType}, function(err, questions) {
				if(err) console.log(err);
				console.log("inserting " + questionType + " questions");
				questions.forEach(function(question) {
					student.current_questions[questionType].push(question._id);
					console.log("Student's current questions:" + JSON.stringify(student.current_questions[questionType]));
				});
			});	
		});
	});
}

module.exports = insertStudentQuestions;
