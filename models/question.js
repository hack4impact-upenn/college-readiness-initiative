var mongoose = require("mongoose"); // install mongoose, which allows us to write
                                    // JS that interacts with database
mongoose.connect("mongodb://localhost/question_db"); // creates question_db database

// This is a schema, a plan for what a question in our database looks like:
var questionSchema = new mongoose.Schema({
    description: String,
    knowledge: String,
    test_num: String,   
    calc: Boolean,      
    image_link: String,
    difficulty: Number, 
    type: String,       
    question_num: Number,
    category: String,   
    subcategory: String,
    isMC: Boolean,      
    answer: String      
});

// Compile the questionSchema into a model, returning an object that
//has methods that allow us to 
var Question = mongoose.model("Question", questionSchema);

// Method that populates database with a fake question
function addFakeQuestion() {
    Question.create({
        description: "Interpreting a graph",
        knowledge: "know how to label graphs correctly",
        test_num: "Test 1",   
        calc: true,     
        image_link: "http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg",
        difficulty: 1,
        type: "Charts",       
        question_num: 7,
        category: "Problem Solving",   
        subcategory: "Key Features of Graphs",
        isMC: true,      
        answer: "C"      
    }, function(err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added question to database");
        }
    });
}

// Method that displays questions in the database
function viewQuestions() {
    Question.find({}, function(err, questions){
        if (err) {
            console.log(err);
        }
        else {
            console.log("Questions:");
            console.log(questions);
        }
    });
}

addFakeQuestion();
viewQuestions();



