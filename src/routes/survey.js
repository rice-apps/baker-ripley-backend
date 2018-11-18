// https://stackoverflow.com/questions/35764792/insert-post-data-into-mongodb-using-node

const surveySchema = require('../models/answerModel').answer;

app.post('/answer', function(request, response){
  var a = new surveySchema({
    // Get that dank data here
  });

  a.save(function(err) {
    if (err)
      throw err;
    else
      console.log('saved survey answers successfully, yeeet')
  });
});
