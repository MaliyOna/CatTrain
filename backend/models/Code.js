const {Schema, model} = require('mongoose');

const Code = new Schema({
    code: {type: String, required: true},
    language: {type: String, required: true},
})

module.exports = model('Code', Code)