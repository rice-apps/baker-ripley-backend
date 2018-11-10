/**
 * Created by Jeffr on 7/22/2017.
 */
const Typeform = require('../models/typeformModel').typeform;
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

const getTypeform = (req, res) => {
    const id = req.params.id
    console.log(id)
    Typeform.find({}).exec((err, typeform) => {
        console.log(typeform)
        if (err) {
            res.send('error has occured')
        } else {
            res.json(typeform)
        }
    })
}

module.exports = app => {
    app.get('/typeform', getTypeform)
}
