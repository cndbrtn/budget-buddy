const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonthSchema = new Schema(
    {
        month: {
            type: String,
            trim: true,
            required: "choose a month first"
        },
        items: [
            {
                type: Schema.Types.ObjectID,
                ref: 'BudgetItem'
            }
        ],
        income: [
            {
                type: Schema.Types.ObjectID,
                ref: 'IncomeItem'
            }
        ]
    }
)

const Month = mongoose.model('Month', MonthSchema)
module.exports = Month