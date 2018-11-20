var mongoose = require('mongoose');
var QuestionModel = require('../models/question');
var StudentModel = require('../models/student');

var deleteStudentQuestion = function deleteStudentQuestion(studentId, questionType) {
    StudentModel.findById(studentId, function(err, student) {
        if (err) console.log(err);
        else {
            var temp = student.current_questions;
            temp[questionType].shift(); // remove fist question of correct type
            StudentModel.findByIdAndUpdate(studentId, { current_questions: temp }, function (err) {
                if (err) console.log(err);
                else {
                    console.log("removed question probably");
                }
            });
        }
    });
}

module.exports = deleteStudentQuestion;
