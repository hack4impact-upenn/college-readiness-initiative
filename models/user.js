var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

var options = {discriminatorKey: 'userType'};

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    name: String
}, options);

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;