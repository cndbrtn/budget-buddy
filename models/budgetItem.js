const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BudgetSchema = new Schema(
    {
        amount: {
            type: String,
            trim: true,
            // required: "enter a number"
        },
        category: {
            type: String,
            trim: true,
            // required: "include a category"
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

const BudgetItem = mongoose.model('BudgetItem', BudgetSchema)

module.exports = BudgetItem