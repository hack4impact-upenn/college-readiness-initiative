var mongoose = require("mongoose");
var Student = require('./student.js');
var Tutor = require('./tutor.js');
mongoose.connect("mongodb://localhost:27017/session_db");

var SessionSchema = new mongoose.Schema({
	date: Date,
	student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
	tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor'
    }
});

var Session = mongoose.model("Session", SessionSchema);
module.exports = Session;

function addFakeSession() {
    Student.findOne({}, function(err, foundStudent) {
        Tutor.findOne({}, function(err, foundTutor) {
            Session.create({
                date: new Date(),
                student: foundStudent,
                tutor: foundTutor
            }, function(err, session) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(session);
                }
            });
        });
    });
}

// Method that displays questions in the database
function viewSessions() {
    Session.find({}, function(err, sessions){
        if (err) {
            console.log(err);
        }
        else {
            console.log("Sessions:");
            console.log(sessions);
        }
    });
}

addFakeSession();
viewSessions();

module.exports = {
	addFakeSession: addFakeSession
}
