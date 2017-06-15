'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = new Schema({
    itemNo: {
        type: String,
        unique: 'This itemNo already exist.',
        required: 'Please fill itemNo'
    },
    title: {
        type: String,
        unique: 'This title already exist.',
        required: 'Please fill title'
    },
    qty: {
        type: Number,
        default: 0
    },
    desc: String,
    category: {
        brand: String,
        type: String,
        model: String

    }
});

module.exports = mongoose.model('items', ItemsSchema);