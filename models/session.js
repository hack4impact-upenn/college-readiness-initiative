var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/session_db");

var sessionSchema = new mongoose.Schema({
	date: new Date(),
	Student: new User(),
	Tutor: new User()

});

var Session = mongoose.model("session", sessionSchema);

function addFakeSession() {
    Session.create({
        date: new Date('December 17, 1996'),
        Student: new User("student", "studentPassword"),
        Tutor: new User("tutor", "tutorPassword")
    }, function(err, session) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added session to database");
        }
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