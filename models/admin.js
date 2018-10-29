var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/admin_db");

var AdminSchema = new mongoose.Schema({
    username: String,
    password: String,

});

AdminSchema.plugin(passportLocalMongoose);
var Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;