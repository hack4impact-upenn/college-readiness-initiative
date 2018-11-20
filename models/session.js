var mongoose = require("mongoose");
var Student = require('./student.js');
var Tutor = require('./tutor.js');
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

var SessionSchema = new mongoose.Schema({
	date: Date,
	studentId: String,
});

var Session = mongoose.model("Session", SessionSchema);
module.exports = Session;

// function addFakeSession() {
//     Student.findOne({}, function(err, foundStudent) {
//         Tutor.findOne({}, function(err, foundTutor) {
//             Session.create({
//                 date: new Date(),
//                 student: foundStudent,
//                 tutor: foundTutor
//             }, function(err, session) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(session);
//                 }
//             });
//         });
//     });
// }

// // Method that displays questions in the database
// function viewSessions() {
//     Session.find({}, function(err, sessions){
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Sessions:");
//             console.log(sessions);
//         }
//     });
// }