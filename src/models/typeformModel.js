var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var TypeformSchema = new Schema({
    uid: String,
    url: String,
    gender: [String],
    age_range: [Number],
    ethnicity: [String],
    zipcodes: [Number]
})


var TypeformSchema = mongoose.model("Typeform", TypeformSchema, 'typeform')

exports.typeform = TypeformSchema
