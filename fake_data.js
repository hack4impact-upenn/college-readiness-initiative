var mongoose = require('mongoose');
var faker = require('faker');
var Student = require('./models/student.js');
var Tutor = require('./models/tutor.js');
var Admin = require('./models/admin.js');
var Session = require('./models/session.js');
var School = require('./models/school.js');
var db = mongoose.connect('mongodb://localhost:27017/college_readiness_initiative', { useNewUrlParser: true });

// Generates 4 schools
function addFakeSchools() {
    var schools = ["John Marshall High School", "Huguenot High School",
                   "Armstrong High School", "Thomas Jefferson High School"];
    schools.forEach(school => {
        School.create({
            name: school
        }, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

// Generates 10 fake students
function addFakeStudents() {
    console.log("inside add fake students");
    for (var i = 0; i < 10; i++) {
        var random_school = School.findOne({}, function (err, res) {
            console.log("School:" + res.name);
        }).name;
        var years = [2018, 2019, 2020, 2021];
        var random_year = years[Math.floor(Math.random() * years.length)];
        var random_sat_score = Math.floor(Math.random() * 1600);
        var random_num_questions_completed = Math.floor(Math.random() * 100);
        Student.create({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: faker.name.findName(),
            school: random_school,
            year: random_year,
            past_sat_score: random_sat_score,
            new_sat_score: 1600,
            num_questions_completed: random_num_questions_completed,
            test_date: Date.now(),
            categories_completed: ["Problem Solving", "Arithmetic"],
            current_questions: [],
            correct_questions: [],
            missed_questions: [],
            to_review_questions: []
        });
    }
}

// Generates 5 fake tutors
function addFakeTutors() {
    console.log("inside add tutors");
    for (var i = 0; i < 5; i++) {
        var random_tutee = Student.findOne({}).name;
        Tutor.create({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: faker.name.findName(),
            tutee_username: random_tutee
        });
    }
}

// Generates admin account
function addAdminAccount() {
    Admin.create({
        username: "admin",
        password: "password"
    }, function(err, admin) {
        if (err) {
            console.log(err);
        } else {
            console.log(admin);
        }
    });
}

// Generates 10 tutoring sessions
function addFakeSessions() {
    console.log("inside add fake sessions");
    for (var i = 0; i < 10; i++) {
        var randomStudent = Student.findOne({}, function(err, randomStudent) {
            if (err) {
                console.log(err);
            } else {
                var randomTutor = Tutor.findOne({}, function (err, randomTutor) {
                    if (err) {
                        console.log(err);
                    } else {
                        Session.create({
                            date: Date.now(),
                            student: randomStudent._id,
                            tutor: randomTutor._id,
                        }, function (err, session) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(session);
                                console.log("Student: " + session.student.toString());
                                console.log("Tutor: " + session.tutor.toString());
                            }
                        });
                    }
                });
            }
        });
    }
}

// Generates fake schools, students, tutors, sessions, and admin
function generateFakes() {
    addFakeSchools(function(err, res) {
        addFakeStudents(function(err, res) {
            addFakeTutors(function(err, res) {
                addFakeSessions();
            });
        });
    });
    addAdminAccount();
}

// generateFakes();

function clear_db() {
    db.getCollectionNames().forEach(function(collection_name) {
        db[collection_name].remove()
    });
}

clear_db();


