
var _ = require('lodash')
// create request object
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// the survey URL
var surveyGizmoUrl = 'https://restapi.surveygizmo.com/v5/survey/4671141/surveyresponse?api_token=2961b3c2612606c980772dfe2050bec29f027074b790ab2de2&api_token_secret=A9Z5oIhnWMFLw';

var questionDict = {
    'What is your first name?' : 'firstName',
    'What is your last name?' : 'lastName',
    'What is your home zip code?' : 'zipcode',
    'What gender do you most identify with?' : 'gender',
    'What is your ethnicity?' : 'ethnicity',
    'How many people, including yourself, live in your household?' : 'household',
    'Do you have children?' : 'children',
    'What is your Date of Birth?' : 'dob',
    'What is your email?' : 'email',
    'What is your phone number?' : 'phone'
}

const request = require('request');

request(surveyGizmoUrl, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log(body.data);
    console.log(fitSchema(getAnswers(body.data)));
});

function getAnswers(jsonData) {

    var parsedData = {};
    // console.log("jsonData", jsonData);
    // for each json response - iterates over indexes
    for (response in jsonData) {

        // user id
        var userID = response;

        // get dictionary of answers
        var singleResponse = {};

        // go through each question and answer
        for (var question in jsonData[response].survey_data) {

            var key;
            var value;
            var type = jsonData[response].survey_data[question].type;

            // only add key-value if found matching question id
            if (key != '') {
                key = jsonData[response].survey_data[question].question;

                // everything but multiple select types
                if (type != 'parent') {
                    value = jsonData[response].survey_data[question].answer;
                }

                // multiple select types
                else {
                    var answerArray = [];
                    for (optType in jsonData[response].survey_data[question].options) {
                        answerArray.push(jsonData[response].survey_data[question].options[optType].option);
                    }
                    value = answerArray;
                }
                // add key, value to single response dictionary
                singleResponse[key] = value;
            }
        }
        // add user and responses to big dictionary
        parsedData[userID] = singleResponse;
    }

    // console.log(parsedData);
    return parsedData;
}

function fitSchema(answers) {
    // console.log(answers);
    for (var response in answers) {
        // console.log("hello");
        schema = {}
        for (var question in answers[response]) {
            schema[questionDict[question]] = answers[response][question]
        }
        console.log(schema);
    }

}
// console.log(getData(surveyGizmoUrl));

module.exports = app => {
    app.get(surveyGizmoUrl, getData)
}
