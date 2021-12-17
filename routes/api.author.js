const Author = require('../model/author')

const router = require('express').Router()
const author = require('../controllers/author')

router.post('/add-author', author.add)
router.get('/get-author', author.get)
router.put('/update-author/:id', author.update)
router.delete('/delete-author/:id', author.delete)

module.exports = router
