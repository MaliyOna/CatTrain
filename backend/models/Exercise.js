const {Schema, Types, model} = require('mongoose');

const Exercise = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    rightCodeHTML: { type: Types.ObjectId, ref: 'Code' },
    rightCodeCSS: { type: Types.ObjectId, ref: 'Code' },
    startCodeHTML: { type: Types.ObjectId, ref: 'Code' },
    startCodeCSS: { type: Types.ObjectId, ref: 'Code' },
})

module.exports = model('Exercise', Exercise)