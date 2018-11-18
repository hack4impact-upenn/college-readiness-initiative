var uploadSchool = function uploadSchool(inName) {
        var mongoose = require('mongoose');
        var SchoolModel = require('../models/school.js');

        var sch = new SchoolModel;
            sch.name = inName;

        sch.save().catch(error => {
		console.log(error);	
	});
    	
	console.log("Finished uploading!");
}

module.exports = uploadSchool;
