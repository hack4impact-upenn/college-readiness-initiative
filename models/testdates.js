var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });


var testDateSchema = new mongoose.Schema({
    testDate: { type: Date, unique: true},
    scoreDate: { type: Date}
});
var TestDate = mongoose.model("TestDate", testDateSchema);
module.exports = TestDate;

// Method that displays questions in the database
function viewTestDates() {
    TestDate.find({}, function (err, dates) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Test dates:");
            console.log(dates);
        }
    });
}

// viewTestDates();
