var uploadSchool = function uploadSchool(inName) {
        var mongoose = require('mongoose');
        var SchoolModel = require('../models/school.js');

        var sch = new SchoolModel;
            sch.name = inName;

        sch.save(function(err) {
                if(err) throw err;
        });
    	
	console.log("Finished uploading!");
}

module.exports = uploadSchool;
