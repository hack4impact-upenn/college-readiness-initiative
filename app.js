var express       = require("express"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    bodyParser    = require("body-parser"),
    User          = require("./models/user"),
    LocalStrategy = require("passport-local"),
    fs            = require('fs'),
    path          = require('path'); // needed for image paths

mongoose.connect("mongodb://localhost/college_readiness_initiative", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var app = express();
var fs = require('fs');
var path = require('path'); // needed for image paths
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "any string can go here",
  resave: false,
  saveUnitialized: false
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

// Images
app.get('/images/:image', function (req, res, next) {
  res.sendfile(path.join(__dirname, 'images', req.params.image))
})

// Home page route
app.get("/", function (req, res) {
  res.render("home");
})

// Practice page
app.get("/practice", isLoggedIn, function(req, res) {
  res.render("practice");
})

// About page route
app.get("/about", function (req, res) {
  res.render("about");
})
// Board members page route
app.get("/boardmembers", function (req, res) {
  res.render("boardmembers");
})

// SAT Prep Page
app.get("/satprep", function (req, res) {
  res.render("satprep");
})

// Full Practice Test Page
app.get("/fulltests", function (req, res) {
  res.render("fulltests");
})
    app.get('/files/fulltests/:testnum', function (req, res) {
    var filePath = "/files/fulltests/" + req.params.testnum;
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
      });
    })

// Math Practice Page
app.get("/mathpractice", function (req, res) {
  res.render("math.ejs");
})
    app.get('/files/math/tutorialsandworksheets/:folder/:worksheet', function (req, res) {
    var filePath = "/files/math/tutorialsandworksheets/"+ req.params.folder + "/" + req.params.worksheet;
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
      });
    })

    app.get('/files/math/:folder/:worksheetnum', function (req, res) {
    var filePath = "/files/math/"+ req.params.folder + "/" + req.params.worksheetnum;
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
      });
    })

// Reading Practice Page
app.get("/readingpractice", function (req, res) {
  res.render("reading.ejs");
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
  res.render("writing.ejs");
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
  res.render("solprep");
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
  res.render("algebra1");
})
// Algebra 1 Calculator Strategy Videos
app.get("/algebra1calcvids", function (req, res) {
  res.render("algebra1calcvids");
})
// Algebra 1 Song Videos
app.get("/algebra1songvids", function (req, res) {
  res.render("algebra1songvids");
})
// Algebra 1 SAT
app.get("/algebra1sat", function (req, res) {
  res.render("algebra1sat");
})
// Algebra 1 Quizzes
app.get("/algebra1quizzes", function (req, res) {
  res.render("algebra1quizzes");
})

// Geometry SOL
app.get("/geometry", function (req, res) {
  res.render("geometry");
})

  // Geometry Videos
  app.get("/geometryvids", function(req, res) {
    res.render("geometryvids");
  })

// Algebra 2 SOL
app.get("/algebra2", function (req, res) {
  res.render("algebra2");
})
// Algebra 2 Videos
app.get("/algebra2vids", function (req, res) {
  res.render("algebra2vids");
})

// Volunteer Page
app.get("/volunteer", function (req, res) {
  res.render("volunteer");
})

app.get("/adminupload", function(req, res) {
    res.render("adminupload");
})

app.listen(process.env.PORT || 3000, process.env.IP, function() {
// ============
// AUTH ROUTES
// ============

// show register form
app.get("/register", function(req, res) {
  res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/");
    });
  });
});

// show login form
app.get("/login", function(req, res) {
  res.render("login");
});

// handle login logic
app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/login"

  }), function (req, res) {
});

// logout route
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(process.env.PORT || 3000, process.env.IP, function () {

  console.log("Server has started!")
})
