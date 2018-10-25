var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    homeZipCode: Number,
    workZipCode: Number,
    gender: {type: String},
    dateOfBirth: Number,
    ethnicity: {type: Array},
    householdSize: Number,
    children: {type: Boolean},
})

var User = mongoose.model("User", UserSchema)



exports.user = User
