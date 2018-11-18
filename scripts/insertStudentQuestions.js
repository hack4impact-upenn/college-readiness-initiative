var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var insertStudentQuestions = function insertStudentQuestions(student) {
	QuestionModel.find().distinct('type').then(function(questionTypes) {
		questionTypes.forEach(function(questionType) { 
			if(!(questionType in student.current_questions)) {
				student.current_questions[questionType] = [];
			}
			QuestionModel.find({type: questionType}).then(function(questions) {
				questions.forEach(function(question) {
					student.current_questions[questionType].push(question._id);
					//console.log("Student's current questions:" + JSON.stringify(student.current_questions[questionType]));
				});
			}).then(function() {
				student.save(function(err) {
					if (err) console.log(err);
					console.log("saving student");
				});	
			});
		});
	});
}

module.exports = insertStudentQuestions;
