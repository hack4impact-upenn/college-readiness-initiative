var express = require("express");
var app = express();
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

// Math Practice Page
app.get("/mathpractice", function(req, res) {
  res.render("math.ejs");
})

// Reading Practice Page
app.get("/readingpractice", function(req, res) {
  res.render("reading.ejs");
})

// Writing and Language Practice Page
app.get("/writingpractice", function(req, res) {
  res.render("writing.ejs");
})

// SOL Prep Page
app.get("/solprep", function(req, res) {
  res.render("solprep");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!")
})