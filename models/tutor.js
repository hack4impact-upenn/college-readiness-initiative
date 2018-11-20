var mongoose = require("mongoose");
var User = require("./user.js");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

// Define Tutor user
var Tutor = User.discriminator('Tutor',
    new mongoose.Schema({}));

// TutorSchema.plugin(passportLocalMongoose);
var Tutor = mongoose.model("Tutor");
module.exports = Tutor;

// function addFakeTutor() {
//     console.log("inside addFakeTutor()");
//     Tutor.create({
//         username: "tutor_username",
//         password: "password",
//         name: "John",
//         tutee_username: "student_username"
//     }, function (err, tutor) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Added Tutor: " + tutor.username);
//         }
//     });
// }

// function viewTutors() {
//     Tutor.find({}, function (err, tutors) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Tutors:");
//             console.log(tutors);
//         }
//     });
// }

// function removeTutor(username) {
//     Tutor.deleteOne({ username: username }, function (err) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Removed Tutor from database:");
//         }
//     });
// }

// // // addFakeTutor();
// // viewTutors();
// // removeTutor("tutor_username");