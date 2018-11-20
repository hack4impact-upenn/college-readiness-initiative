var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var insertStudentQuestions = function insertStudentQuestions() {
//		QuestionModel.find().distinct('type').then( function(questionTypes) {
//			for(var i = 0; i < questionTypes.length; i++) {
//				var type = questionTypes[i];
//				StudentModel.findOne({}).then( function(student) {
//					console.log("type: " + type);
//					var temp = Object.assign({[type]: []}, student.current_questions);
//					console.log("temp: " + JSON.stringify(temp));
//					return [student, temp];
//				}).then( function(arr) {
//					return Object.assign(arr[0], {current_questions: arr[1]});
//				}).then( function(student) {
//					return student.save();
//				}).then( function(student) {
//					console.log(student + " saved");
//				});
//			}
//		}); 
//	QuestionModel.find().distinct('type').then(function(questionTypes) {
//		questionTypes.forEach(function(questionType) { 
//			if(!(questionType in student.current_questions)) {
//				student.current_questions[questionType] = [];
//				console.log("inserted " + questionType + " questions");
//			}
//		})
//		student.save();
//		console.log("finished");});
//	}).then( function(student) { 
//		student.save();
//	});
//			QuestionModel.find({type: questionType}).then(function(questions) {
//				questions.forEach(function(question) {
//					student.current_questions[questionType].push(question._id);
//					//console.log("Student's current questions:" + JSON.stringify(student.current_questions[questionType]));
//				});
//				return student;
//			}).then(function(student) {
//				student.save(function(err) {
//					if (err) console.log(err);
//					console.log("saving student");
//				});	
//			});
//		});
//	});
}

module.exports = insertStudentQuestions;
