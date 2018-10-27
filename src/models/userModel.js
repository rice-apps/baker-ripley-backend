var mongoose     = require('mongoose')
    , Schema       = mongoose.Schema
require('../db')

var UserSchema = new Schema({
    netid:{type: String},
    firstName: {type: String},
    lastName: {type: String},
    minHour: Number,
    maxHour: Number,
    totalHours: Number
})

var UserBRSchema = new Schema({
    demographics:{
    	dob: {type: String},
    	ethnicity: {type: String},
    	zipcode: {
    		home: {type: String},
    		work: {type: String}
    	},
    	gender: {type: String}
	},
	firstName: {type: String},
    lastName: {type: String},
    id: Number,
    email: {type: String},
    phone: {type: String},
    socialMedia: {type: String}
})

var User = mongoose.model("User", UserSchema)
// need to specify collection in order to connect
// in this case, collection is profile
var UserBR = mongoose.model("UserBR", UserBRSchema, 'profile')


exports.user = User
exports.userbr = UserBR
