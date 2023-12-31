const {Schema, Types, model} = require('mongoose');

const User = new Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    userTopics: [{ type: Types.ObjectId, ref: 'UserTopics' }],
    courses: [{ type: Types.ObjectId, ref: 'Courses' }]
})

module.exports = model('User', User)