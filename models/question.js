var mongoose = require("mongoose"); // install mongoose, which allows us to write
                                    // JS that interacts with database
mongoose.connect("mongodb://localhost/question_db"); // creates question_db database

// This is a schema, a plan for what a question in our database looks like:
var questionSchema = new mongoose.Schema({
    description: String,
    knowledge: String,
    test_num: String,   // Practice test #
    calc: Boolean,      // whether calculator is allowed
    image_link: String,
    difficulty: Number, // can be 1, 2, or 3
    type: String,       // Ex: Charts, geometry
    question_num: Number,
    category: String,   // Ex: Problem Solving, Heart of Algebra
    subcategory: String,
    isMC: Boolean,      // true if MC, false if short response
    answer: String      // Either a MC answer or the exact answer
});

// Compile the questionSchema into a model, returning an object that
//has methods that allow us to 
var Question = mongoose.model("Question", questionSchema);

function addFakeQuestions() {
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
    })
}



