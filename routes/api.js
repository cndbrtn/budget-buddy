const router = require('express').Router()
const { Month, BudgetItem, IncomeItem } = require('../models')

router.get('/api/budget/:month', (req, res) => {
    Month.find({ month: req.params.month }).populate('items income')
        .then(month => {
            res.json(month)
            console.log(month)
        })
})
// post route for expenses (outgoing $$$)
router.post('/api/budget/month/:id', ({ body, params }, res) => {
    // console.log('body', body)
    BudgetItem.create({ ...body })
        .then(budget => {
            res.json(budget)
            // console.log('budget response', budget)
            return Month.findOneAndUpdate({ _id: params.id }, { $push: { items: budget._id } }, { new: true })
    })
})
// post route for income (incomeing $$$)
router.post('/api/income/month/:id', ({ body, params }, res) => {
    // console.log('body', body)
    IncomeItem.create({ ...body })
        .then(income => {
            res.json(income)
            // console.log('income response', income)
            return Month.findOneAndUpdate({ _id: params.id }, { $push: { income: income._id } }, { new: true })
        })
})

router.put('/api/budget/:id', (req, res) => {
    BudgetItem.update({ _id: req.params.id }, { $push: req.body })
        .then(month => {
            console.log('updated month', month)
            res.json(month)
    })
})

module.exports = router