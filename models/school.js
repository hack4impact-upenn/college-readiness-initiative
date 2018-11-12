var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });


var schoolSchema = new mongoose.Schema({
    name: {type: String, unique: true}
});
var School = mongoose.model("School", schoolSchema);
module.exports = School;

// Method that inserts school in the database
function addFakeSchool() {
    School.create({
        name: "John Marshall",
    }, function (err, question) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added School to database");
        }
    });
}

// Method that displays questions in the database
function viewSchools() {
    School.find({}, function (err, schools) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Schools:");
            console.log(schools);
        }
    });
}

function removeSchool(name) {
    School.deleteOne({name: name}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed School: " + name);
        }
    });
}

// addFakeSchool();
viewSchools();
// removeSchool();
