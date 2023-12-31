const {Schema, Types, model} = require('mongoose');

const Topic = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    examples: [{ type: Types.ObjectId, ref: 'Example' }],
    exercises: [{ type: Types.ObjectId, ref: 'Exercise' }]
})

module.exports = model('Topic', Topic)