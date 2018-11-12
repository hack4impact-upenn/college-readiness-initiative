var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

var AdminSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
});

AdminSchema.plugin(passportLocalMongoose);
var Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;

function addFakeAdmin() {
    Admin.create({
        username: "admin_username",
        password: "password",
        name: "Admin1"
    }, function (err, admin) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added admin " + admin.username);
        }
    });
}

function viewAdmins() {
    Admin.find({}, function (err, admins) {
        console.log(admins);
    });
}

function removeAdmin(username) {
    Admin.deleteOne({ username: username }, function (err) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log("Removed Admin: " + username);
        }
    });
}

//addFakeAdmin();
viewAdmins();
//removeAdmin("admin_username");