const router = require('express').Router()
const BudgetItem = require('../models/budgetItem.js')
const Month = require('../models/month')

router.get('/api/budget/:month', (req, res) => {
    Month.find({ month: req.params.month }).populate('items')
        .then(month => {
            res.json(month)
            console.log(month)
        })
})

router.post('/api/month/:id', ({body, params}, res) => {
    console.log('api/budget params.id', params.id)
    console.log('/api/budget/:id body', { body })
    BudgetItem.create({ ...body })
        .then(budget => {
            res.json(budget)
            console.log('budget response', budget)
            return Month.findOneAndUpdate({ _id: params.id }, { $push: { items: budget._id } }, { new: true })
    })
})

router.put('/api/month/:id', (req, res) => {
    console.log('update month with budget item req.body', req.body)
    console.log('update month with budget item req.params', req.params)
    Month.update({ _id: req.params.id }, { $push: req.body })
        .then(month => {
        console.log('updated month', month)
    })
})

module.exports = router