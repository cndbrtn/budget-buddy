const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/budgetbuddy',
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

app.use(require('./routes/api'))
app.use(require('./routes/html'))

app.listen(PORT, () => {
    console.log(`listening on PORT http://localhost:${PORT}`)
})