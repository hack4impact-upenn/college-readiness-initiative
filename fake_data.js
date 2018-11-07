var faker = require('faker');
var Student = require('./models/student.js');
var School = require('./models/school.js');


function addFakeStudents() {
    for (var i = 0; i < 4; i++) {
        var random_school = School.findOne({}, function (err, res) {
            console.log("School:" + res);
        });
        var years = [2018, 2019, 2020, 2021];
        var random_year = years[Math.floor(Math.random() * years.length)];
        var random_sat_score = Math.floor(Math.random() * 1600);
        console.log("Score: " + random_sat_score);
        var random_num_questions_completed = Math.floor(Math.random() * 100);
        Student.create({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: faker.internet.password(),
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

addFakeStudents();

