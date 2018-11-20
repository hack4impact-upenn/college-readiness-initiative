var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var moveCompletedQuestion = function moveCompletedQuestion(studentId, questionType, isCorrect) {
    StudentModel.findById(studentId, function(err, student) {
        if (err) console.log(err);
        else {
            var curr_q = student.current_questions;
            questionId = curr_q[questionType].shift(); // remove fist question of correct type
            if (isCorrect) {
                if (student.correct_questions != null) {
                    var correct_q = student.correct_questions;
                }
                else {
                    var correct_q = [];
                }
                
                correct_q.push(questionId);
                StudentModel.findByIdAndUpdate(studentId, { current_questions: curr_q, correct_questions: correct_q }, function (err) {
                    if (err) console.log(err);
                });
            }
            else {
                var missed_q = student.missed_questions;
                if (student.missed_questions != null) {
                    var missed_q = student.missed_questions;
                }
                else {
                    var missed_q = [];
                }
                missed_q.push(questionId);
                StudentModel.findByIdAndUpdate(studentId, { current_questions: curr_q, missed_questions: missed_q }, function (err) {
                    if (err) console.log(err);
                });
            }
            
        }
    });
}

module.exports = moveCompletedQuestion;
