var mongoose     = require('mongoose')
//    , mongoosastic = require('mongoosastic')
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

// {
//     "_id": {
//         "$oid": "5bafe1a8e7179a358dc24cee"
//     },
//     "demographics": {
//         "dob": "03-15-1962",
//         "ethnicity": "White",
//         "zipcode": {
//             "home": "18503",
//             "work": "18503"
//         },
//         "gender": "Male"
//     },
//     "firstName": "Michael",
//     "lastName": "Scott",
//     "UID": 1,
//     "email": "michaelscott@theoffice.com",
//     "phone": "0123456789",
//     "socialMedia": "facebook"
// }


var User = mongoose.model("User", UserSchema)
// need to specify collection in order to connect
// in this case, collection is profile
var UserBR = mongoose.model("UserBR", UserBRSchema, 'profile')


exports.user = User
exports.userbr = UserBR
