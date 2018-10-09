var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/session_db");

var sessionSchema = new mongoose.Schema({
	date: new Date(),
	Student: new User(),
	Tutor: new User()

});

var session = mongoose.model("session", sessionSchema);

