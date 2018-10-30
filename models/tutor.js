var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/tutor_db");


var TutorSchema = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    tutee_username: String

});

TutorSchema.plugin(passportLocalMongoose);
var Tutor = mongoose.model("Tutor", TutorSchema);
module.exports = Tutor;

function addFakeTutor() {
    console.log("inside addFakeTutor()");
    Tutor.create({
        username: "johnnymith",
        password: "12345",
        first_name: "Johnny",
        last_name: "Mith",
        tutee_username: "johnsmith"
    }, function (err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added Tutor to database");
        }
    });
}

function removeUser() {
    Admin.deleteOne({ username: 'username' }, function (err) {
        if (err) {
            return handleError(err);
        }
        else {
            console.log("Removed Tutor from database:");
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

// addFakeStudent();
// viewStudents();