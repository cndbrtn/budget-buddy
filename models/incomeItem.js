const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IncomeSchema = new Schema(
    {
        amount: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            trim: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        month: {
            type: Schema.Types.ObjectID,
            ref: 'Month'
        }
    }
)

const IncomeItem = mongoose.model('IncomeItem', IncomeSchema)

module.exports = IncomeItem