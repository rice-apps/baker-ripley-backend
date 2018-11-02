// create request object
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// the survey URL
var typeFormUrl = 'https://api.typeform.com/forms/tIRk4I/responses';

function getData(url) {
    var request = new XMLHttpRequest();

    // set up type of request, (GET request), true = synchronous
    request.open('GET', url, true);
    // web API ensure valid request
    request.setRequestHeader('Authorization', 'Bearer FJP5o6msKCrmR3dLtxsh8bZ4pNzPU2fQKC6Dorzyt2Bm');
    // once all the data pulled in....
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(request.responseText);

        // 200 = successful request
        if (request.status >= 200 && request.status < 400) {
            // console.log(this);
            // console.log(data);
            return getAnswers(data);
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
    // find items field
    var item = "items";
        if (jsonData.hasOwnProperty(item)) {

            // go through each visit
            for (var resp in jsonData.items) {

                var answers = "answers";

                // check if the response has an answers
                if (jsonData.items[resp].hasOwnProperty(answers)) {

                    // get user token ID
                    var token = jsonData.items[resp].token;
                    var singleResponse = {};

                    // go through each answer
                    for (var ans in jsonData.items[resp][answers]) {
                        // console.log(jsonData.items[resp][answers][ans]);

                        var key = '';
                        var value;
                        var type = jsonData.items[resp][answers][ans].type;

                        switch (jsonData.items[resp][answers][ans].field.ref) {

                            // first name
                            case '7bc3283f-c333-40b4-9355-793ff8e111eb': {
                                key = 'firstName';
                                value = jsonData.items[resp][answers][ans][type];
                                break; }

                            // last name
                            case '804b5794-ef46-4839-acd1-d7ab677b68ee': {
                                key = 'lastName';
                                value = jsonData.items[resp][answers][ans][type];
                                break; }

                            // home zip code
                            case '0c98779d-4bae-49e7-8e2b-181b412d541e': {
                                key = 'homeZipCode';
                                value = jsonData.items[resp][answers][ans][type];
                                break;
                            }

                            // gender
                            case 'b1ad70149feb733d': {
                                key = 'gender';
                                value = jsonData.items[resp][answers][ans][type].label;
                                break;
                            }

                            // date of birth
                            case '5141bc63cf253fdc': {
                                key = 'dateOfBirth';
                                value = jsonData.items[resp][answers][ans][type];
                                break; }

                            // ethnicity
                            case '118c0e504a1bf193': {
                                key = 'ethnicity';
                                value = jsonData.items[resp][answers][ans][type].labels;
                                break; }

                            // household size
                            case 'c035a1a45ae4a8a1': {
                                key = 'householdSize';
                                value = jsonData.items[resp][answers][ans][type];
                                break;
                            }

                            // children [] check if empty or not
                            case 'd3525433e80ab223': {
                                key = 'children';
                                if (jsonData.items[resp][answers][ans][type] == false)
                                    value = [];
                                    break;
                                }

                            case '499d1080-7b6d-4a8f-9e44-1db369b1ccab': {
                                key = 'children';
                                value =  jsonData.items[resp][answers][ans][type].label;
                                break;
                            }

                        }

                        // only add key-value if found matching question id
                        if (key != '') {
                            singleResponse[key] = value;
                        }
                    }
                    parsedData[token] = singleResponse;
                }
            }
            console.log(parsedData);
        }
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
