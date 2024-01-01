const {Schema, Types, model} = require('mongoose');

const UserTopics = new Schema({
    topic: { type: Types.ObjectId, ref: 'Topic' },
    completedExercises: [{ type: Types.ObjectId, ref: 'Exercise' }],
    countOfAllExercises: {type: Number},
    courseId: {type: String}
})

module.exports = model('UserTopics', UserTopics)