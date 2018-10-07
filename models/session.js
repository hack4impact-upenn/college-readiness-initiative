var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/session_db");

var sessionSchema = new mongoose.Schema({
    date: Date,
    Student: Student,
    Tutor: Tutor
});