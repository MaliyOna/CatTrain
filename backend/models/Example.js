const {Schema, model} = require('mongoose');

const Example = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    codes: [{ type: Types.ObjectId, ref: 'Code' }]
})

module.exports = model('Example', Example)