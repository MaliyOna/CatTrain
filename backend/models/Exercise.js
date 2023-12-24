const {Schema, model} = require('mongoose');

const Exercise = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    rightCodes: [{ type: Types.ObjectId, ref: 'Code' }]
})

module.exports = model('Exercise', Exercise)