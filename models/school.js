var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/school_db"); // creates school_db database


var schoolSchema = new mongoose.Schema({
    name: String
});
var School = mongoose.model("School", schoolSchema);
module.exports = School;

function addFakeSchools() {
    var schools = new Array();
    schools[0] = 'John Marshall';
    schools[1] = 'Huguenot';
    schools[2] = 'Thomas Jefferson';

    schools.forEach(school => {
        School.create({
            name: school
        }, function (err, school) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Added " + school + " to database");
            }
        });
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

// viewSchools();

// addFakeSchools();