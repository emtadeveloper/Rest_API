const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.use(auth)

router.get('/', userController.usersList)

router.post('/', userController.addUser)

router.get('/:id', userController.getUser)

router.delete('/:id', userController.removeUser)

router.patch('/:id', userController.updateUser)

module.exports = router
