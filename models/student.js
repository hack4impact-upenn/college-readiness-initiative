var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/student_db");

var StudentSchema = new mongoose.Schema({
    // Login info
    username: String,
    password: String,
    user_type: String,

    // Student info
    first_name: String,
    last_name: String,
    school: String,
    year: Number,
    past_sat_score: Number,
    new_sat_score: Number,
    num_questions_completed: Number,
    test_date: Date,
    categories_completed: [String],
    // Acts as a map. Each time Student finishes a question, compare the category
    // of the question we want to save to the categories available, and if id is
    // different then replace current_question with the saved question.
    // Having a real map might be more efficient (O(1)) but it seems Mongoose
    // only has maps of <String, String>. Thoughts?
    current_questions: [{
        current_category: String,
        current_question: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }]
    }],
    correct_questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    missed_questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    to_review_questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

StudentSchema.plugin(passportLocalMongoose);
var Student = mongoose.model("Student", StudentSchema);
module.exports = Student;



// Method that populates database with a fake User
function addFakeStudent() {
    console.log("inside addFakeStudent()");
    Student.create({
        username: "student_username",
        password: "password",
        user_type: "student",
        first_name: "Bob",
        last_name: "Student",
        school: "John Marshall",
        year: 2020,
        past_sat_score: 1600,
        new_sat_score: 1600,
        num_questions_completed: 4,
        test_date: Date.now(),
        categories_completed: ["Problem Solving", "Arithmetic"],
        current_questions: [],
        correct_questions: [],
        missed_questions: [],
        to_review_questions: []
    }, function (err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added Student to database");
        }
    });
}

// Method that displays questions in the database
function viewStudents() {
    Student.find({}, function (err, students) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Students:");
            console.log(students);
        }
    });
}

function removeStudent(username) {
    Student.deleteOne({username: username}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed Student: " + username);
        }
    });
}

// addFakeStudent();
// removeStudent("student_username");
// viewStudents();
