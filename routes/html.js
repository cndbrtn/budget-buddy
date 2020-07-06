const router = require('express').Router()
const path = require('path')

router.get('/:month/budget/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/budget.html'))
})

module.exports = router