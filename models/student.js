var mongoose = require("mongoose");
var User = require("./user.js");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

// Define Student user
var Student = User.discriminator('Student',
    new mongoose.Schema({
        name: String,
        school: String,
        year: Number,
        past_sat_score: Number,
        new_sat_score: Number,
        num_questions_completed: Number,
        test_date: Date,
        current_questions: {},
        correct_questions: {},
        missed_questions: {},
        last_log_in: { type: Date, default: Date.now },
        num_tutoring_sessions: Number
    }));

// StudentSchema.plugin(passportLocalMongoose);
var Student = mongoose.model("Student");

module.exports = Student;

// function insertStudent(username, password, name, school, year, past_sat_score,
//                        new_sat_score, num_questions_completed, test_date,
//                        categories_completed, current_questions,
//                        correct_questions, missed_questions, to_review_questions, lastLogIn) {
//     Student.create({
//         username: username,
//         password: password,
//         name: name,
//         school: school,
//         year: year,
//         past_sat_score: past_sat_score,
//         new_sat_score: new_sat_score,
//         num_questions_completed: num_questions_completed,
//         test_date: test_date,
//         categories_completed: categories_completed,
//         current_questions: current_questions,
//         correct_questions: correct_questions,
//         missed_questions: missed_questions,
//         to_review_questions: to_review_questions,
//         lastLogIn: lastLogIn
//     }, function (err, student) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Added Student to database" + student);
//         }
//     });
// }

// // Method that inserts student into database
// function addFakeStudent() {
//     console.log("inside addFakeStudent()");
//     Student.create({
//         username: "student_username",
//         password: "password",
//         name: "Bob",
//         school: "John Marshall",
//         year: 2020,
//         past_sat_score: 1600,
//         new_sat_score: 1600,
//         num_questions_completed: 4,
//         test_date: Date.now(),
//         categories_completed: ["Problem Solving", "Arithmetic"],
//         current_questions: [],
//         correct_questions: [],
//         missed_questions: [],
//         to_review_questions: []
//     }, function (err, question) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Added Student to database");
//         }
//     });
// }

// // Method that displays questions in the database
// function viewStudents() {
//     Student.find({}, function (err, students) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Students:");
//             console.log(students);
//         }
//     });
// }

// function removeStudent(username) {
//     Student.deleteOne({username: username}, function(err) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Removed Student: " + username);
//         }
//     });
// }

// // addFakeStudent();
// // removeStudent("student_username");
// // viewStudents();
