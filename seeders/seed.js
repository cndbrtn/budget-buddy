const { Month } = require('../models')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/budgetbuddy', {
    useNewUrlParser: true,
    useFindAndModify: false
})

let monthSeed = [
    {
        month: 'January',
        items: [],
        income: []
    },
    {
        month: 'February',
        items: [],
        income: []
    },
    {
        month: 'March',
        items: [],
        income: []
    },
    {
        month: 'April',
        items: [],
        income: []
    },
    {
        month: 'May',
        items: [],
        income: []
    },
    {
        month: 'June',
        items: [],
        income: []
    },
    {
        month: 'July',
        items: [],
        income: []
    },
    {
        month: 'August',
        items: [],
        income: []
    },
    {
        month: 'September',
        items: [],
        income: []
    },
    {
        month: 'October',
        items: [],
        income: []
    },
    {
        month: 'November',
        items: [],
        income: []
    },
    {
        month: 'December',
        items: [],
        income: []
    }
]

Month.deleteMany({})
    .then(() => Month.collection.insertMany(monthSeed))
    .then(data => {
        console.log(`${data.result.n} records inserted successfully!`)
        process.exit(0)
    })
    .catch(err => {
        console.log(err)
        process.send(1)
    })

