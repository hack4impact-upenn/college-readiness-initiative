var uploadTestDate = function uploadTestDate(inTestDate, inScoreDate) {
    var mongoose = require('mongoose');
    var DateModel = require('../models/testdates.js');

    var date = new DateModel;
    date.testDate = inTestDate;
    date.scoreDate = inScoreDate;

    date.save().catch(error => {
        console.log(error);
    });

    console.log("Finished uploading!");
}

module.exports = uploadTestDate;
