const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    month: {
        type: String,
        required: true,
    },
    expenses: {
        type: Array,
        required: true
    },
    income: {
        type: Array,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Budget", budgetSchema)