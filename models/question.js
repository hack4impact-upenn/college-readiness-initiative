var mongoose = require("mongoose"); // install mongoose, which allows us to write
                                    // JS that interacts with database
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

// This is a schema, a plan for what a question in our database looks like:
var questionSchema = new mongoose.Schema({
    description: String,
    knowledge: String,
    test_num: String,
    calc: Boolean,
    image_link: {
	type: String,
	unique: true,
    },
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
module.exports = QuestionModel;

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


// Method that displays questions in the database
function viewQuestions() {
    QuestionModel.find({}, function(err, questions){
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

// viewQuestions();
