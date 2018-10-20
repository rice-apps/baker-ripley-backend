// create request object
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// the survey URL
var typeFormUrl = 'https://api.typeform.com/forms/tIRk4I/responses';

function  getData(url) {
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
        } else {
            console.log('error');
        }
    };

    // sends the request out
    request.send();

}
getData(typeFormUrl);

var pretty = {};

function getAnswers(jsonData) {
    // find the items
    for (var item in jsonData) {
        // for each item

        if (jsonData.hasOwnProperty(item) && item === "items") {

            // go through each response submission
            var count = 0;
            var singleResponse = {};

            for (var x in jsonData[item]) {

                // go through each answered question
                if (jsonData[item].hasOwnProperty(x)) {
                    for (var answer in jsonData[item][x]) {
                        if (jsonData[item][x].hasOwnProperty(answer) && answer === "answers") {
                            for (var response in jsonData[item][x][answer]) {
                                // console.log("here", jsonData[item][x][answer][response]);
                                // HOME ZIP CODE
                                if (jsonData[item][x][answer][response].field.id === 'aDjQ07tEQ5lI'){
                                   singleResponse['homeZipCode'] = jsonData[item][x][answer][response].text;
                                }
                                // WORK ZIP CODE
                                if (jsonData[item][x][answer][response].field.id === 'AoijKDcSdBW0'){
                                    singleResponse['workZipCode'] = jsonData[item][x][answer][response].text;
                                }
                                // GENDER
                                if (jsonData[item][x][answer][response].field.id === 'ZwHYDfA3DuEa'){
                                    singleResponse['gender'] = jsonData[item][x][answer][response].text;
                                }
                                // DATE OF BIRTH
                                if (jsonData[item][x][answer][response].field.id === 'MNDg472D40jQ'){
                                    singleResponse['dateOfBirth'] = jsonData[item][x][answer][response].text;
                                }
                            }
                        }
                    }
                }

            }
            pretty[count] = singleResponse;
            count++;
            console.log(pretty);
        }
    }
}
