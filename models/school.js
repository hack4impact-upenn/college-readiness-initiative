var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });


var schoolSchema = new mongoose.Schema({
    name: {type: String, unique: true}
});
var School = mongoose.model("School", schoolSchema);
module.exports = School;

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
