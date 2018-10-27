var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var SchoolSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("School", SchoolSchema);