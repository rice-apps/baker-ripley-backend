
const UserBR = require('../models/userModel').userbr

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');


// GET call for our backend
// send requirements and sends back response
const getUserBR = (req, res) => {
    // need to import user model from schemas page
    const id = req.params.id
    console.log(id)
    UserBR.find({}).exec((err, user) => {
        console.log(user)
        if (err) {
            res.send('error has occured')
        } else {
            res.json(user)
        }
    })
}


// const setEmployeeAvailability = (req, res) => {
//     const employee = req.params.netid
//     const inputShifts = req.body.shifts
//     // Will need to reformat this data
//     // Now data represented like: {changed: true/false, netid: preference#}
//     const reformattedShifts = reformatShifts(inputShifts, employee)
//     // Get Schedule
//     schedule.find({}).exec((err, shifts) => {
//         // Array of already set shifts
//         let week = shifts[0].week
//         // Check if different input size; if so, stop
//         if (reformattedShifts.length != week.length) {
//             res.status(500).send("Error: Shifts Length Mismatch")
//             return
//         }
//         // Iterate through each shift in input shifts, see if anything changed
//         for (let i = 0; i < reformattedShifts.length; i++) {
//             let inputShift = reformattedShifts[i]
//             var shift = week[i]
//             // Check if shift changed
//             if (inputShift.changed) {
//                 shift.set({[employee]: inputShift[employee]})
//             }
//         }
//         // Then replace current stuff with this new one
//         schedule.replaceOne({}, {week: shifts[0].week}, (err, doc) => {
//             if (err) {
//                 console.log(err)
//             }
//             res.send(200)
//         })
//     })
// }

module.exports = app => {
    // postman - localhost:3000:/server port gateway port
    // :id? = variable
    app.get('/userbr/:id?', getUserBR)
}
