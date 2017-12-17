var express = require("express");
var app = express();
var fs = require('fs');
app.set("view engine", "ejs");
app.use(express.static("public"));


// Home page route
app.get("/", function(req, res) {
  res.render("home");
})


// About page route
app.get("/about", function(req, res) {
  res.render("about");
})

// SAT Prep Page
app.get("/satprep", function(req, res) {
  res.render("satprep");
})

// Full Practice Test Page
app.get("/fulltests", function(req, res) {
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
app.get("/mathpractice", function(req, res) {
  res.render("math.ejs");
})

// Reading Practice Page
app.get("/readingpractice", function(req, res) {
  res.render("reading.ejs");
})
    app.get('/files/reading/:practicenum', function (req, res) {
    var filePath = "/files/reading/" + req.params.practicenum;
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
      });
    })

// Writing and Language Practice Page
app.get("/writingpractice", function(req, res) {
  res.render("writing.ejs");
})

// SOL Prep Page
app.get("/solprep", function(req, res) {
  res.render("solprep");
})

// Algebra 1 SOL
app.get("/algebra1", function(req, res) {
  res.render("algebra1");
})
  // Algebra 1 Calculator Strategy Videos
  app.get("/algebra1calcvids", function(req, res) {
    res.render("algebra1calcvids");
  })
  // Algebra 1 Song Videos
  app.get("/algebra1songvids", function(req, res) {
    res.render("algebra1songvids");
  })

// Geometry SOL
app.get("/geometry", function(req, res) {
  res.render("geometry");
})

  // Geometry Videos
  app.get("/geometryvids", function(req, res) {
    res.render("geometryvids");
  })
  
// Algebra 2 SOL
app.get("/algebra2", function(req, res) {
  res.render("algebra2");
})
  // Algebra 2 Videos
  app.get("/algebra2vids", function(req, res) {
    res.render("algebra2vids");
  })

// Volunteer Page
app.get("/volunteer", function(req, res) {
  res.render("volunteer");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!")
})