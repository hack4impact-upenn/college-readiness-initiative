var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/tutor_db");


var TutorSchema = new mongoose.Schema({
    username: String,
    password: String,

});

TutorSchema.plugin(passportLocalMongoose);
var Tutor = mongoose.model("Tutor", TutorSchema);
module.exports = Tutor;