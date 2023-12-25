const {Schema, Types, model} = require('mongoose');

const Course = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    level: {type: String, required: true},
    progLanguage: {type: String, required: true},
    topics: [{ type: Types.ObjectId, ref: 'Topic' }],
    users: [{ type: Types.ObjectId, ref: 'User' }]
})

module.exports = model('Course', Course)