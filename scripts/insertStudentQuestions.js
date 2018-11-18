var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var insertStudentQuestions = function insertStudentQuestions(StudentModel student) {
	QuestionModel.find().distinct('type', function(err, questionTypes) {
		questionTypes.forEach(function(questionType) { 
			var qArr = QuestionModel.find({type: questionType});
			if(!(questionType in student.current_questions)) {
				student.current_questions.questionType = [];
			}
			student.current_questions.questionType.insertMany(qArr);
		});
	});
}
