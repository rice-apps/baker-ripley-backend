// create request object
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// the survey URL
var typeFormUrl = 'https://restapi.surveygizmo.com/v5/survey/4671141/surveyresponse?api_token=2961b3c2612606c980772dfe2050bec29f027074b790ab2de2&api_token_secret=A9Z5oIhnWMFLw';

function getData(url) {
    var request = new XMLHttpRequest();

    // set up type of request, (GET request), true = synchronous
    request.open('GET', url, true);
    // web API ensure valid request
    // request.setRequestHeader('Authorization', 'Bearer FJP5o6msKCrmR3dLtxsh8bZ4pNzPU2fQKC6Dorzyt2Bm');
    // once all the data pulled in....
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(request.responseText).data;
        console.log(request.status)
        // 200 = successful request
        if (request.status >= 200 && request.status < 400) {
            // console.log(this);

            return getAnswers(data);
            // return getAnswers(data);
            // return data;
        } else {
            console.log('error');
        }

    };

    // sends the request out
    request.send();

}
getData(typeFormUrl);


var parsedData = {};

function getAnswers(jsonData) {

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
        console.log(parsedData);
    }


// function getAnswers(jsonData) {
//     // find the items
//     for (var item in jsonData) {
//         // for each item
//
//         if (jsonData.hasOwnProperty(item) && item === "items") {
//
//             // go through each response submission
//             var count = 0;
//             var singleResponse = {};
//
//             for (var x in jsonData[item]) {
//
//                 // go through each answered question
//                 if (jsonData[item].hasOwnProperty(x)) {
//                     console.log(jsonData[item]);
//                     for (var answer in jsonData[item][x]) {
//                         if (jsonData[item][x].hasOwnProperty(answer) && answer === "answers") {
//                             for (var response in jsonData[item][x][answer]) {
//                                 // console.log("here", jsonData[item][x][answer][response]);
//                                 // HOME ZIP CODE
//                                 if (jsonData[item][x][answer][response].field.id === 'aDjQ07tEQ5lI'){
//                                     singleResponse['homeZipCode'] = jsonData[item][x][answer][response].text;
//                                 }
//                                 // WORK ZIP CODE
//                                 if (jsonData[item][x][answer][response].field.id === 'AoijKDcSdBW0'){
//                                     singleResponse['workZipCode'] = jsonData[item][x][answer][response].text;
//                                 }
//                                 // GENDER
//                                 if (jsonData[item][x][answer][response].field.id === 'ZwHYDfA3DuEa'){
//                                     singleResponse['gender'] = jsonData[item][x][answer][response].text;
//                                 }
//                                 // DATE OF BIRTH
//                                 if (jsonData[item][x][answer][response].field.id === 'MNDg472D40jQ'){
//                                     singleResponse['dateOfBirth'] = jsonData[item][x][answer][response].text;
//                                 }
//                             }
//                         }
//                     }
//                 }
//
//             }
//             pretty[count] = singleResponse;
//             count++;
//             console.log(pretty);
//         }
//     }
