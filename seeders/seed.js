const { Month } = require('../models')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/budgetbuddy', {
    useNewUrlParser: true,
    useFindAndModify: false
})

let monthSeed = [
    {
        month: 'January',
        items: []
    },
    {
        month: 'February',
        items: []
    },
    {
        month: 'March',
        items: []
    },
    {
        month: 'April',
        items: []
    },
    {
        month: 'May',
        items: []
    },
    {
        month: 'June',
        items: []
    },
    {
        month: 'July',
        items: []
    },
    {
        month: 'August',
        items: []
    },
    {
        month: 'September',
        items: []
    },
    {
        month: 'October',
        items: []
    },
    {
        month: 'November',
        items: []
    },
    {
        month: 'December',
        items: []
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

