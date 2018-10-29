var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/admin_db");
//var connection = mongoose.createConnection("mongodb://localhost:27017/admin_db");
//var db = mongoose.connection;

var AdminSchema = new mongoose.Schema({
    username: String,
    password: String,

});

AdminSchema.plugin(passportLocalMongoose);
var Admin = mongoose.model("Admin", AdminSchema);
//var Admin = connection.model("Admin", AdminSchema);
module.exports = Admin;

function removeUser() {
    Admin.deleteOne({ username: 'username' }, function (err) {
        if (err) return handleError(err);
    });
}

function populateDB() {
    Admin.create({
        username: "username",
        password: "password"
    }, function (err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added test");
        }
    });
}

populateDB();
//removeUser();