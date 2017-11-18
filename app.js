var express = require("express");
var app = express();
app.set("view engine", "ejs");

// Home page route
app.get("/", function(req, res) {
  res.render("home");
})


// About page route
app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has started!")
})