var mongoose = require("mongoose"); // install mongoose, which allows us to write
                                    // JS that interacts with database
mongoose.connect("mongodb://localhost:27017/question_db"); // creates question_db database

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
//has methods that allow us to interact with Mongo database
var QuestionModel = mongoose.model('Questions', questionSchema);
module.exports = {QuestionModel};

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
    });
    Question.create({
        description: "Solving Max Flow",
        knowledge: "Learn to properly implement Ford Fulkerson",
        test_num: "Test 3",
        calc: true,
        image_link: "https://www.ptable.com/Images/periodic%20table.png",
        difficulty: 4,
        type: "Graphs",
        question_num: 3,
        category: "Algorithms",
        subcategory: "Graph Theory",
        isMC: true,
        answer: "D"
    });
    Question.create({
        description: "Divide and Conquer an Array",
        knowledge: "discover how to create subproblems",
        test_num: "Test 4",
        calc: true,
        image_link: "https://assets3.thrillist.com/v1/image/2754967/size/tmg-article_tall;jpeg_quality=20.jpg",
        difficulty: 2,
        type: "Arrays",
        question_num: 4,
        category: "Array Computing",
        subcategory: "Comp sci techniques",
        isMC: true,
        answer: "A"
    });
}

function insertQuestions(arr) {
for(var i = 1; i < arr.length; i++) {

    Question.create({
	description: arr[i][0],
        knowledge: arr[i][1],
        test_num: arr[i][2],
        calc: arr[i][3] == 'W',
        image_link: arr[i][4],
        difficulty: Number(arr[i][5]),
        type: arr[i][6],
        question_num: Number(arr[i][7]),
        category: arr[i][8],
        subcategory: arr[i][9],
        isMC: (arr[i][10] == 'A') || (arr[i][10] == 'B') || (arr[i][10] == 'C') || (arr[i][10] == 'D'),
        answer: arr[i][10]
    }, function(err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added " + i + " question to database");
        }
    });
}
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

// addFakeQuestion();

viewQuestions();
