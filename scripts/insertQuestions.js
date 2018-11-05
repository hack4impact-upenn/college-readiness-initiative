var insertQuestions = function insertQuestions(arr) {
    for (var i = 1; i < arr.length; i++) {

        Question.create({
            description: arr[i][0],
            knowledge: arr[i][1],
            test_num: arr[i][2],
            calc: arr[i][3] == 'W',
            image_link: arr[i][4],
            difficulty: Number(arr[i][5]),
            type: arr[i][6],
            question_num: Number(arr[i][7]),
            category: arr[i][8],
            subcategory: arr[i][9],
            isMC: (arr[i][10] == 'A') || (arr[i][10] == 'B') || (arr[i][10] == 'C') || (arr[i][10] == 'D'),
            answer: arr[i][10]
        }, function (err, question) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Added " + i + " question to database");
            }
        });
    }
}
module.exports = insertQuestions;