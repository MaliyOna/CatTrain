const {Schema, Types, model} = require('mongoose');

const Example = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    codeHTML: { type: Types.ObjectId, ref: 'Code' },
    codeCSS: { type: Types.ObjectId, ref: 'Code' }
})

module.exports = model('Example', Example)