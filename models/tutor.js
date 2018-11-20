var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

var TutorSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    name: String,
    tutee_username: String

});

TutorSchema.plugin(passportLocalMongoose);
var Tutor = mongoose.model("Tutor", TutorSchema);
module.exports = Tutor;

function addFakeTutor() {
    console.log("inside addFakeTutor()");
    Tutor.create({
        username: "tutor_username3",
        password: "password",
        name: "Tutor3",
        tutee_username: "student_username2"
    }, function (err, tutor) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added Tutor: " + tutor.username);
        }
    });
}

function viewTutors() {
    Tutor.find({}, function (err, tutors) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Tutors:");
            console.log(tutors);
        }
    });
}

function removeTutor(username) {
    Tutor.deleteOne({ username: username }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed Tutor from database:");
        }
    });
}
module.exports.removeTutor = removeTutor;

addFakeTutor();
viewTutors();
// removeTutor("tutor_username");