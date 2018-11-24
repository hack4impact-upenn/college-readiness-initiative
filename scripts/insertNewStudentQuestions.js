var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var insertNewStudentQuestions = function insertNewStudentQuestions(studentId) {
	var allQ = {
		charts: [],
		graphs: [],
		geometry: [],
		word_problem: [],
		solving_equation_expression: []
	};

	QuestionModel.find({type: 'charts'}).select('._id').then(function(chartQs) {
		allQ.charts = chartQs;
		console.log('charts: ' + allQ.charts);
		QuestionModel.find({type: 'graphs'}).select('._id').then(function(graphQs) {
			allQ.graphs = graphQs;
			console.log('graphs: ' + allQ.graphs);
			QuestionModel.find({type: 'geometry'}).select('._id').then(function(geometryQs) {
				allQ.geometry = geometryQs;
				console.log('geometry: ' + allQ.geometry);
				QuestionModel.find({type: 'word problem'}).select('._id').then(function(wordQs) {
					allQ.word_problem = wordQs;
					console.log('word problem: ' + allQ.word_problem);
					QuestionModel.find({type: 'solving equation/expression'}).select('._id').then(function(solvingQs) {
						allQ.solving_equation_expression = solvingQs;
						console.log('solving equation/expression: ' + allQ.solving_equation_expression);
						StudentModel.findByIdAndUpdate(studentId, {current_questions: allQ}, function(err, student) {
							if(err) console.log(err);
							console.log(student);
						});
					});
				});
			});
		});
		
	});

}

module.exports = insertNewStudentQuestions;
