/**
 * Created by Jeffr on 7/22/2017.
 */
const User = require('../models/userModel').user
const UserBR = require('../models/userModel').userbr
const schedule = require('../models/scheduleModel').schedule;
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
// Calls from employee.js
const getEmployeeScheduled = require('./employee').getEmployeeScheduled

const getUsers = (req, res) => {
    User.find({}).exec((err, users) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.json(users)
        }
    })
}

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

const getNetIDs = (req, res) => {
    var netids = []
    User.find({}).exec((err, user) => {
        if (err) {
            res.send('error has occured')
        } else {
            user.map(x => netids.push(x.id))
            res.send(netids)
        }
    })
}

const getUser = (req, res) => {
    const netid = req.params.netid
    User.find({netid: netid}).exec((err, user) => {
        if (err) {
            res.send('error has occured')
        } else {
            res.json(user)
        }
    })
}

// const getTotalHours = (req, res) => {
//   const netid = req.params.netid
//   let counter = 0
//   // Get entire schedule
//   schedule.find({}).exec((err, shifts) => {
//     // Array of shifts
//     let week = shifts[0].week
//     if (err) {
//       res.send("error has occurred")
//     }
//     else {
//       // Iterate through each shift
//       for (let i = 0; i < week.length; i++) {
//         let shift = week[i]
//         // Get array of people scheduled
//         let scheduled = shift.scheduled
//         // Add to array a value of True or False; True if employee is scheduled, False otherwise
//         if (scheduled.indexOf(netid) > -1) {
//           counter += 1
//         }
//       }
//       res.send(counter)
//     }
//   })
// }

module.exports = app => {
    app.get('/users', getUsers)
    app.get('/user/:netid?', getUser)
    // postman - localhost:3000:/server port gateway port
    // :id? = variable
    app.get('/userbr/:id?', getUserBR)
    app.get('/netids', getNetIDs)
    // app.get('/user/hours/:netid', getTotalHours)
    // app.put('/user/:netid?', updateUser)
}
