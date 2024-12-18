const mongoose = require('mongoose')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },

    Spenton: {
        type: String,
        required: true       
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Expense", expenseSchema)