var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var options = { discriminatorKey: 'kind' }

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    kind: {
    	type: String,
    	required: true,
    	enum: ["Admin", "Student", "Tutor"]
    }
},
    options);

UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("User", UserSchema);
var User = mongoose.model("User", UserSchema);
module.exports = User;


// Creating a StudentSchema that inherits data fields of UserSchema. If we set
// any UserSchema's variable (username/password) in this constructor, it will
// override UserSchema's variable value.
var StudentSchema = new mongoose.Schema({
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
		currrent_question: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Question'}]
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
	}],
}, options);

// Creating an AdminSchema that inherits data fields of UserSchema. 
var AdminSchema = new mongoose.Schema({
	// Add admin data fields here
}, options);

var Student = User.discriminator('Student', StudentSchema);
var Admin = User.discriminator('Admin', AdminSchema);

// Method that populates database with a fake User
function addFakeStudent() {
    Student.create({
    	username: "melissagu",
    	password: "hack4impact",
    	first_name: "Melissa",
		last_name: "Gu",
		school: "University of Richmond",
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
    }, function(err, question) {
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
    Student.find({}, function(err, students){
        if (err) {
            console.log(err);
        }
        else {
            console.log("Students:");
            console.log(students);
        }
    });
}

function removeStudent(){
	Student.deleteOne({first_name: 'Melissa'}, function (err) {
  if (err) return handleError(err);
})
}

//addFakeStudent();
viewStudents();
removeStudent();