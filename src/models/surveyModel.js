var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var surveySchema = new Schema({
    demographics: [String],
    url: String,
    uid: String
})


var surveySchema = mongoose.model("Survey", surveySchema, 'survey')

exports.surveySchema = surveySchema
