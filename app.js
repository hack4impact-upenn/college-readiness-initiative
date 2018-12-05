var express       = require("express"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    bodyParser    = require("body-parser"),
    User          = require("./models/user"),
    Student       = require("./models/student"),
    Admin         = require("./models/admin"),
    Tutor         = require("./models/tutor"),
    Session       = require("./models/session"),
    Question      = require("./models/question")
    School        = require("./models/school"),
    TestDate      = require("./models/testdates"),
    LocalStrategy = require("passport-local"),
    parseCSV      = require("./scripts/parseCSV"),
    uploadTestDate = require("./scripts/uploadTestDate"),
    uploadSchool  = require("./scripts/uploadSchool"),
    insertStudentQs = require("./scripts/insertNewStudentQuestions"),
    moveCompletedQ = require("./scripts/moveCompletedQuestion"),
    fs            = require('fs'),
    path          = require('path'), // needed for image paths
    flash         = require('connect-flash'),
    async         = require('async');

mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

mongoose.Promise = global.Promise;

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "any string can go here",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use(express.static("/images")); //needed for express to display images

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Images
app.get('/images/:image', function (req, res, next) {
  res.sendfile(path.join(__dirname, 'images', req.params.image))
})

// Home page route
app.get("/", function (req, res) {
  if (req.user != null) {
    loggedIn = true;
    if (req.user.userType == "Student") {
      displayPractice = true;
    } 
    else {
      displayPractice = false;
    }
  } 
  else {
    loggedIn = false;
    displayPractice = true;
  }
  res.render("home", {loggedIn: loggedIn, displayPractice: displayPractice});
})

// Practice page
// Allows student to select type of question and whether with tutor
app.get("/practicetype", isLoggedIn, isStudent, function(req, res) {
  Question.find().distinct('type', function(err, questionTypes) {
    res.render("practicesessions/practicetype", {questionTypes: questionTypes});
  });
})

app.post("/practicetype", isLoggedIn, function (req, res) {
  questionType = req.body.questionType;
  withTutor = req.body.withTutor;
  if (withTutor) {
    Session.create({
      date: Date.now(),
      studentId: req.user._id
    }, function(err, session) {
      if (err) console.log(err);
      Student.findByIdAndUpdate({_id: req.user._id}, 
        {num_tutoring_sessions: (req.user.num_tutoring_sessions + 1)},
        function (err, session) {
          if (err) console.log(err);
        });
    });
  }
  res.redirect("/question/" + questionType);  
})

// About page route
app.get("/about", function (req, res) {
  res.render("about");
})
// Board members page route
app.get("/boardmembers", function (req, res) {
  res.render("boardmembers");
})

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
})

// Answer Keys page route
app.get("/answerkeys", function(req, res) {
    Question.find(function(err, questions) {
        res.render("answerkeys", {questions: questions});
    });
})

app.get("/studentlist", isAdmin, function(req, res) {
    Student.find(function(err, students) {
        res.render("admin/studentlist", {students: students});
    })
})

// Tutoring Page (Ask student whether they are with a tutor)
app.get("/tutoring", function(req, res) {
    res.render("practicesessions/tutoring");
})

// SAT Prep Page
app.get("/satprep", function (req, res) {
  res.render("basicprep/satprep");
})

// Question page
app.get("/question/:type", isLoggedIn, isStudent, function (req, res) {
  var questionType = req.params.type;
  // Replace spaces in question type from url with '_' to be able
  // to access currentquestions[questionType]
  var re = new RegExp(' ', 'g');
  questionType = questionType.replace(re, "_");
  if (req.user.current_questions[questionType].length == 0) {
    // No questions left to do of this type
    res.render("practicesessions/completedQuestionType", { type: req.params.type });
  }
  else {
    var questionId = req.user.current_questions[questionType][0];
    Question.findOne({ _id: questionId._id }, function (err, question) {
      if (err) console.log(err);
      res.render("practicesessions/question", { question: question, link: req.params.type });
    });
  }
})

// Post method that redirects to solution page
app.post("/question/:type", isLoggedIn, processAnswer, renderSolution);

function processAnswer(req, res, next) {
  req.type = req.params.type;
  // Replace spaces in question type from url with '_' to be able
  // to access currentquestions[questionType]
  var re = new RegExp(' ', 'g');
  req.type = req.type.replace(re, "_");
  if (req.body.answerMC != null) {
    req.answer = req.body.answerMC;
  }
  else {
    req.answer = req.body.answerInput;
  }
  return next();
}

function renderSolution(req, res) {
  var answer = req.answer;
  var type = req.type;
  var questionId = req.user.current_questions[type][0];
  Question.findOne({ _id: questionId }, function (err, question) {
    if (err) console.log(err);
    if (question.answer == answer) {
      res.render("practicesessions/correctSolution", { question: question, type: type, answer: answer });
    }
    else {
      res.render("practicesessions/incorrectSolution", { question: question, type: type, answer: answer });
    }
  });
} 

app.post("/correctsolution/:type", function(req, res) {
  var questionType = req.params.type;
  var studentId = req.user._id;
  moveCompletedQ(studentId, questionType, true);
  res.redirect("question/" + questionType);
})

app.post("/incorrectsolution/:type", function (req, res) {
  var questionType = req.params.type;
  var studentId = req.user._id;
  moveCompletedQ(studentId, questionType, false);
  res.redirect("question/" + questionType);
})

app.get("/reviewmissed", isLoggedIn, function(req, res) {
  var questionType = req.params.type;
  var missed_Ids = req.user.missed_questions;
  getQuestions(missed_Ids).then(function (missed_qArr) {
    var missed_qs = missed_qArr;
    res.render("practicesessions/review", { questionType: questionType, questions: missed_qs, correct: false });
  });
})

app.get("/reviewcorrect", isLoggedIn, function (req, res) {
  var questionType = req.params.type;
  var correct_Ids = req.user.correct_questions;
  getQuestions(correct_Ids).then(function (correct_qArr) {
    var correct_qs = correct_qArr;
    res.render("practicesessions/review", { questionType: questionType, questions: correct_qs, correct: true });
  });
})

async function getQuestions(question_Ids) {
  qs = []
  for (const id of question_Ids) {
    await Question.findById(id._id, function (err, question) {
      if (err) console.log(err);
      else {
        if (question != null) {
          qs.push(question);
        }
      }
    });
  }
  return qs;
}


// Full Practice Test Page
app.get("/fulltests", function (req, res) {
  res.render("basicprep/fulltests");
})

app.get('/files/fulltests/:testnum', function (req, res) {
  var filePath = "/files/fulltests/" + req.params.testnum;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

// Math Practice Page
app.get("/math", function(req, res) {
  res.render("mathoptions");
});

// Basic math
app.get("/mathpractice", function (req, res) {
  res.render("basicprep/math");
})

app.get('/files/math/tutorialsandworksheets/:folder/:worksheet', function (req, res) {
  var filePath = "/files/math/tutorialsandworksheets/" + req.params.folder + "/" + req.params.worksheet;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

app.get('/files/math/:folder/:worksheetnum', function (req, res) {
  var filePath = "/files/math/" + req.params.folder + "/" + req.params.worksheetnum;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

// Reading Practice Page
app.get("/readingpractice", function (req, res) {
  res.render("basicprep/reading");
})
app.get('/files/reading/:practicenum', function (req, res) {
  var filePath = "/files/reading/" + req.params.practicenum;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

// Writing and Language Practice Page
app.get("/writingpractice", function (req, res) {
  res.render("basicprep/writing");
})
app.get('/files/writing/:practicenum', function (req, res) {
  var filePath = "/files/writing/" + req.params.practicenum;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

// SOL Prep Page
app.get("/solprep", function (req, res) {
  res.render("sol/solprep");
})
app.get('/files/sol/:pdf', function (req, res) {
  var filePath = "/files/sol/" + req.params.pdf;
  fs.readFile(__dirname + filePath, function (err, data) {
    res.contentType("application/pdf");
    res.send(data);
  });
})

// Algebra 1 SOL
app.get("/algebra1", function (req, res) {
  res.render("sol/algebra1");
})
// Algebra 1 Calculator Strategy Videos
app.get("/algebra1calcvids", function (req, res) {
  res.render("sol/algebra1calcvids");
})
// Algebra 1 Song Videos
app.get("/algebra1songvids", function (req, res) {
  res.render("sol/algebra1songvids");
})
// Algebra 1 SAT
app.get("/algebra1sat", function (req, res) {
  res.render("sol/algebra1sat");
})
// Algebra 1 Quizzes
app.get("/algebra1quizzes", function (req, res) {
  res.render("sol/algebra1quizzes");
})

// Geometry SOL
app.get("/geometry", function (req, res) {
  res.render("sol/geometry");
})

// Geometry Videos
app.get("/geometryvids", function (req, res) {
  res.render("sol/geometryvids");
})

// Algebra 2 SOL
app.get("/algebra2", function (req, res) {
  res.render("sol/algebra2");
})
// Algebra 2 Videos
app.get("/algebra2vids", function (req, res) {
  res.render("sol/algebra2vids");
})

// Volunteer Page
app.get("/volunteer", function (req, res) {
  res.render("volunteer");
})

// User profile page
app.get("/profile", isLoggedIn, function (req, res) {
  if (req.user.userType == "Student") {
    res.render("studentprofile", { user: req.user });
  }
  else {
    res.render("profile", {user: req.user, type: req.user.userType});
  }
  
})

// ============
// AUTH ROUTES
// ============

// show register forms
app.get("/register", function(req, res) {
  res.render("authentication/register");
});
app.get("/register/:userType", function(req, res) {
  if (req.params.userType == "student") {
    School.find({}, function (err, schools) {
      if (err) {
        console.log(err);
      } else {
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        TestDate.find({testDate: {$gt: today}}, function (err, testdates) {
          res.render("authentication/registerstudent", { schools: schools, dates: testdates });
        });
      }
    });
  }
  else {
    res.render("authentication/register" + req.params.userType);
  }
});

// handle sign up logic
app.post("/register/:userType", function(req, res) {
  redirectURL = "/";
  if (req.redirectURL != null) {
    redirectURL = req.redirectURL;
  }
  var type = req.params.userType;
  var newUser;
  if (type == "student") {
      newUser = new Student({
        username: req.body.username,
        name: req.body.name,
        school: req.body.school,
        test_date: req.body.testdate,
        year: req.body.year,
        past_sat_score: req.body.score,
        new_sat_score: null,
        num_questions_completed: 0,
        current_questions: {},
        correct_questions: {},
        missed_questions: {},
        num_tutoring_sessions: 0,
        last_log_in: Date.now()
      });
      User.register(newUser, req.body.password, function (err, user) {
        if (err) {
          console.log(err);
          res.redirect("register/" + type);
        }
        passport.authenticate('local')(req, res, function () {
          insertStudentQs(user._id);
          res.redirect(redirectURL);
        });
      });
  }
  else if (type == "admin") {
    newUser = new Admin({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("authentication/register" + type);
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect("/");
      });
    });
  }
  else if (type == "tutor") {
    newUser = new Tutor({ username: req.body.username,
                          name: req.body.name });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("authentication/register" + type);
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect("/");
      });
    });
  }
});

// show login forms
app.get("/login", function (req, res) {
  res.render("authentication/login");
});

app.get("/login/:userType", function(req, res) {
  res.render("authentication/login" + req.params.userType);
});

// handle login logic
app.post("/login", passport.authenticate('local',
  { failureRedirect: "/login" }),
    function (req, res) {
      redirectURL = "/";
      if (req.session.redirectURL) {
        redirectURL = req.session.redirectURL;
        req.session.redirectURL = null;
      }
      var query = {
            'username': req.user.username
        };
        var update = {
            last_log_in: Date.now()
        };
        var options = {
            new: true
        };
        Student.findOneAndUpdate( query, update, options, function(err, user) {
            if (err) {
                console.log(err);
            }
        });
        res.redirect(redirectURL);
});

// logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// permission page
app.get("/permission", function(req, res) {
  res.render("permission");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.session.redirectURL = req.url;
  res.redirect("/login");
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.userType == "Admin") {
      return next();
    }
    res.redirect("/permission");
  }
  req.session.redirectURL = req.url;
  res.redirect("/permission");
}

function isStudent(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.userType == "Student") {
      return next();
    }
    res.redirect("/permission");
  }
  req.session.redirectURL = req.url;
  res.redirect("/permission");
}


//analytics route
app.get("/analytics", isAdmin, function(req, res) {
    var today = new Date();
    var week = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
    var month = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    var year = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());

    // Retrieve number of sessions this week, month, and year
    Promise.all([
      Session.countDocuments({      
        date: {
          $gt: week,
          $lt: today
        }
      }),
      Session.countDocuments({ 
        date: {
          $gt: month,
          $lt: today
        }
      }),
      Session.countDocuments({ 
        date: {
          $gt: year,
          $lt: today
        }
      }),
      Session.distinct('studentId', {
        date: {
          $gt: week,
          $lt: today
        }}),
      Session.distinct('studentId', {
        date: {
          $gt: month,
          $lt: today
        }
      }),
      Session.distinct('studentId', {
        date: {
          $gt: year,
          $lt: today
        }
      })
  ]).then(([ weeklyOutput, monthlyOutput , yearlyOutput,
              student_weekly, student_monthly, student_yearly]) => {
    res.render("admin/analytics", {weeklyOutput: weeklyOutput, monthlyOutput: monthlyOutput, yearlyOutput:yearlyOutput,
                            student_weekly: student_weekly.length, student_monthly: student_monthly.length, student_yearly: student_yearly.length});
});

})


app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("Server has started!")
})

//Upload question page
app.get("/questionupload", isAdmin, function (req, res) {
  res.render("admin/questionupload");
})

app.post("/questionupload", bodyParser.urlencoded({extended: true}), function(req, res) {
  var url = req.body.URL;
  parseCSV(url);
  res.redirect("/");
});

//Upload school name page
app.get("/schoolupload", isAdmin,function (req, res) {
  School.find({}, function(err, schools) {
    res.render("admin/schoolupload", {schools: schools});
  })
})

//Upload test date page
app.get("/testdateupload", isAdmin, function (req, res) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  currentDate = yyyy + "-" + mm + "-" + dd;
  var today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  TestDate.find({testDate: { $gt: today }} , function(err, testdates) {
    res.render("admin/testdateupload", { currentDate: currentDate, testdates: testdates });
  });
  
})

app.post("/testdateupload", bodyParser.urlencoded({ extended: true }), function (req, res) {
  var testDate = req.body.testdate;
  var scoreDate = req.body.scoredate;
  uploadTestDate(testDate, scoreDate);
  res.redirect("/testdateupload");
});



app.post("/schoolupload", bodyParser.urlencoded({extended: true}), function(req, res) {
  var name = req.body.schoolNAME;
  uploadSchool(name);
  res.redirect("/schoolupload");
});
