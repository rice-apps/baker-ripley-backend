var mongoose     = require('mongoose')
    , Schema       = mongoose.Schema
require('../db')

var AnswerSchema = new Schema({
    userid: String,
    data:{
        top3: [String],
        response1: String,
        response2: String,
        response3: String,
        bottom3: [String],
        other: [String]
    }
})

// need to specify collection in order to connect
// in this case, collection is profile
var Answer = mongoose.model("Answer", AnswerSchema, 'answer')

exports.answer = Answer;
